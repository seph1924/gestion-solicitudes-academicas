import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  registrarUsuario,
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from '../services/usuarioService';

// Crear contexto
const UsuarioContext = createContext(null);

// Proveedor de autenticación
export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Comprobar la sesión al iniciar la aplicación
  useEffect(() => {
    const comprobarSesion = async () => {
      try {
        const respuesta = await obtenerSesion();

        setUsuario(
          respuesta.autenticado ? respuesta.usuario : null
        );
      } catch (error) {
        setUsuario(null);

        // Un 401 significa que no existe una sesión válida.
        // Otros errores pueden indicar que el servidor no está disponible.
        if (error.status !== 401) {
          setError(error.message);
        }
      } finally {
        setCargando(false);
      }
    };

    comprobarSesion();
  }, []);

  // Registrar usuario
  const registro = async (datos) => {
    setError(null);

    try {
      const respuesta = await registrarUsuario(datos);
      return respuesta;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Iniciar sesión
  const login = async (datos) => {
    setError(null);

    try {
      const respuesta = await iniciarSesion(datos);

      setUsuario(respuesta.usuario);

      return respuesta;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    setError(null);

    try {
      const respuesta = await cerrarSesion();
      setUsuario(null);

      return respuesta;
    } catch (error) {
      // Si el servidor no responde, se limpia el estado local.
      setUsuario(null);
      setError(error.message);

      throw error;
    }
  };

  const valor = {
    usuario,
    autenticado: Boolean(usuario),
    cargando,
    error,
    login,
    registro,
    logout
  };

  return (
    <UsuarioContext.Provider value={valor}>
      {children}
    </UsuarioContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
export function useUsuario() {
  const contexto = useContext(UsuarioContext);

  if (!contexto) {
    throw new Error(
      'useUsuario debe utilizarse dentro de UsuarioProvider'
    );
  }

  return contexto;
}