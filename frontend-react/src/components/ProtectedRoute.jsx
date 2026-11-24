import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';

function ProtectedRoute() {
  const { autenticado, cargando } = useUsuario();
  const location = useLocation();

  // Esperar a que termine la comprobación de la sesión
  if (cargando) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--color-texto-suave)'
        }}
        role="status"
      >
        Comprobando sesión...
      </div>
    );
  }

  // Si no está autenticado, regresar al Login
  if (!autenticado) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Si está autenticado, permitir el acceso
  return <Outlet />;
}

export default ProtectedRoute;