import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUsuario } from '../../context/UsuarioContext';
import { logger } from '../../utils/logger';
import './Navbar.css';

const OPCIONES_MENU = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/solicitudes', texto: 'Solicitudes' },
  { ruta: '/nueva-solicitud', texto: 'Nueva solicitud' },
  { ruta: '/resumen', texto: 'Resumen' }
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  const { usuario, logout } = useUsuario();
  const navigate = useNavigate();

  const manejarLogout = async () => {
    if (cerrandoSesion) return;

    setCerrandoSesion(true);
    setMenuAbierto(false);

    try {
      await logout();
    } catch (error) {
      logger.error('Error al cerrar sesión', { mensaje: error.message });
    } finally {
      // El contexto limpia el usuario incluso si falla el servidor.
      navigate('/login', { replace: true });
      setCerrandoSesion(false);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <NavLink
          to="/"
          end
          className="navbar__marca"
        >
          <span className="navbar__logo">SA</span>
          <span>Solicitudes Académicas</span>
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>

        <nav
          className={`navbar__menu ${
            menuAbierto ? 'navbar__menu--abierto' : ''
          }`}
        >
          {OPCIONES_MENU.map((opcion) => (
            <NavLink
              key={opcion.ruta}
              to={opcion.ruta}
              end={opcion.ruta === '/'}
              className="navbar__enlace"
              onClick={() => setMenuAbierto(false)}
            >
              {opcion.texto}
            </NavLink>
          ))}

          {usuario && (
            <button
              type="button"
              className="navbar__logout"
              onClick={manejarLogout}
              disabled={cerrandoSesion}
            >
              {cerrandoSesion ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;