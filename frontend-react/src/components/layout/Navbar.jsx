import { useState } from 'react';
import './Navbar.css';

// Opciones del menú principal.
// Persona 3 (React Router): reemplazar <a href> por <NavLink to> usando estas mismas rutas.
const OPCIONES_MENU = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/solicitudes', texto: 'Solicitudes' },
  { ruta: '/nueva-solicitud', texto: 'Nueva solicitud' },
  { ruta: '/resumen', texto: 'Resumen' }
];

function Navbar({ onNavegar, vistaActual }) {
  // Controla el menú desplegable en pantallas pequeñas
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__contenido">
        <a href="/" className="navbar__marca">
          <span className="navbar__logo">SA</span>
          <span>Solicitudes Académicas</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>

        <nav className={`navbar__menu ${menuAbierto ? 'navbar__menu--abierto' : ''}`}>
          {OPCIONES_MENU.map((opcion) => (
            <button
              key={opcion.ruta}
              type="button"
              className={`navbar__enlace ${
                vistaActual === opcion.ruta ? 'activo' : ''
              }`}
              onClick={() => {
                onNavegar(opcion.ruta);
                setMenuAbierto(false);
              }}
            >
              {opcion.texto}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
