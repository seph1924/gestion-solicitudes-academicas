import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useUsuario } from '../context/UsuarioContext';
import Boton from '../components/ui/Boton';
import Aviso from '../components/ui/Aviso';

import './Register.css';

function Register() {
  const { registro } = useUsuario();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState(null);

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

    const { nombre, email, password, confirmarPassword } = formulario;

    if (!nombre.trim() || !email.trim() || !password || !confirmarPassword) {
      setAviso({
        ok: false,
        mensaje: 'Todos los campos son obligatorios.'
      });
      return;
    }

    if (password.length < 8) {
      setAviso({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 8 caracteres.'
      });
      return;
    }

    if (password !== confirmarPassword) {
      setAviso({
        ok: false,
        mensaje: 'Las contraseñas no coinciden.'
      });
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await registro({
        nombre,
        email,
        password
      });

      setAviso({
        ok: true,
        mensaje: respuesta.mensaje || 'Usuario registrado correctamente.'
      });

      setFormulario({
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: ''
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);

    } catch (error) {
      setAviso({
        ok: false,
        mensaje: error.message || 'No se pudo registrar el usuario.'
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="registro">
      <section className="registro__tarjeta">

        <header className="registro__encabezado">
          <div className="registro__logo">SA</div>

          <h1>Crear cuenta</h1>

          <p>Gestión de Solicitudes Académicas</p>
        </header>

        <div className="registro__contenido">

          <h2>Registro de usuario</h2>

          <p className="registro__descripcion">
            Completa tus datos para crear una cuenta.
          </p>

          <Aviso
            aviso={aviso}
            onCerrar={() => setAviso(null)}
          />

          <form onSubmit={manejarEnvio} noValidate>

            <div className="formulario-grupo">
              <label htmlFor="nombre">Nombre completo</label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese su nombre completo"
                value={formulario.nombre}
                onChange={manejarCambio}
                autoComplete="name"
                disabled={enviando}
              />
            </div>

            <div className="formulario-grupo">
              <label htmlFor="email">Correo electrónico</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formulario.email}
                onChange={manejarCambio}
                autoComplete="email"
                disabled={enviando}
              />
            </div>

            <div className="formulario-grupo">
              <label htmlFor="password">Contraseña</label>

              <div className="registro__password">
                <input
                  id="password"
                  name="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={formulario.password}
                  onChange={manejarCambio}
                  autoComplete="new-password"
                  disabled={enviando}
                />

                <button
                  type="button"
                  className="registro__mostrar"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="formulario-grupo">
              <label htmlFor="confirmarPassword">
                Confirmar contraseña
              </label>

              <div className="registro__password">
                <input
                  id="confirmarPassword"
                  name="confirmarPassword"
                  type={mostrarConfirmacion ? 'text' : 'password'}
                  placeholder="Repita su contraseña"
                  value={formulario.confirmarPassword}
                  onChange={manejarCambio}
                  autoComplete="new-password"
                  disabled={enviando}
                />

                <button
                  type="button"
                  className="registro__mostrar"
                  onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
                >
                  {mostrarConfirmacion ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <Boton type="submit" disabled={enviando}>
              {enviando ? 'Registrando...' : 'Crear cuenta'}
            </Boton>

          </form>

          <div className="registro__login">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login">Inicia sesión</Link>
          </div>

        </div>
      </section>

      <footer className="registro__footer">
        Gestión de Solicitudes Académicas
      </footer>
    </main>
  );
}

export default Register;