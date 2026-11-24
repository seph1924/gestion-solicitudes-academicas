import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useUsuario } from '../context/UsuarioContext';
import Boton from '../components/ui/Boton';
import Aviso from '../components/ui/Aviso';

import './Login.css';

function Login() {
  const { login, autenticado, cargando } = useUsuario();

  const navigate = useNavigate();
  const location = useLocation();

  const [formulario, setFormulario] = useState({
    email: '',
    password: ''
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState(null);

  // Si ya existe una sesión, evitar mostrar el login
  if (cargando) {
    return <div className="login__cargando">Comprobando sesión...</div>;
  }

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setAviso(null);

    if (!formulario.email.trim() || !formulario.password) {
      setAviso({
        ok: false,
        mensaje: 'Complete el correo electrónico y la contraseña.'
      });
      return;
    }

    setEnviando(true);

    try {
      await login(formulario);

      const destino = location.state?.from;

      navigate(
        destino
          ? `${destino.pathname}${destino.search || ''}${destino.hash || ''}`
          : '/',
        { replace: true }
      );
    } catch (error) {
      setAviso({
        ok: false,
        mensaje: error.message || 'No se pudo iniciar sesión.'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="login">
      <section className="login__tarjeta">

        <header className="login__encabezado">
          <div className="login__logo">SA</div>

          <h1>Bienvenido</h1>

          <p>
            Gestión de Solicitudes Académicas
          </p>
        </header>

        <div className="login__contenido">

          <h2>Iniciar sesión</h2>

          <p className="login__descripcion">
            Ingresa tus credenciales para continuar.
          </p>

          <Aviso
            aviso={aviso}
            onCerrar={() => setAviso(null)}
          />

          <form onSubmit={manejarEnvio} noValidate>

            <div className="formulario-grupo">
              <label htmlFor="email">
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formulario.email}
                onChange={manejarCambio}
                autoComplete="username"
                required
                disabled={enviando}
              />
            </div>

            <div className="formulario-grupo">
              <label htmlFor="password">
                Contraseña
              </label>

              <div className="login__password">
                <input
                  id="password"
                  name="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={formulario.password}
                  onChange={manejarCambio}
                  autoComplete="current-password"
                  required
                  disabled={enviando}
                />

                <button
                  type="button"
                  className="login__mostrar"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  aria-label={
                    mostrarPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <Boton
              type="submit"
              disabled={enviando}
            >
              {enviando ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Boton>

          </form>

          <div className="login__registro">
            <span>¿No tienes una cuenta?</span>
            {' '}
            <Link to="/registro">
              Regístrate aquí
            </Link>
          </div>

        </div>
      </section>

      <footer className="login__footer">
        Gestión de Solicitudes Académicas
      </footer>
    </main>
  );
}

export default Login;