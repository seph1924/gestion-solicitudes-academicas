import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

// Estructura común de todas las vistas: navbar arriba, contenido al centro y footer abajo.
// Persona 3 (React Router): puede reemplazar {children} por <Outlet /> en una ruta padre.
function Layout({ children, onNavegar, vistaActual }) {
  return (
    <div className="layout">
      <Navbar
        onNavegar={onNavegar}
        vistaActual={vistaActual}
      />
      <main className="layout__contenido">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
