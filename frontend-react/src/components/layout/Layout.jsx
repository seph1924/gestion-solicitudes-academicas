
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

// Estructura común de todas las vistas
function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__contenido">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
