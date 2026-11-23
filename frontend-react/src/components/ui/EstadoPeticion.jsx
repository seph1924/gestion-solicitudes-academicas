import Boton from './Boton';
import './ui.css';

// Muestra el estado de una petición a la API:
//  - cargando: indicador de carga
//  - error: mensaje con botón para reintentar
// Si no hay carga ni error, renderiza el contenido (children).
function EstadoPeticion({ cargando, error, onReintentar, children }) {
  if (cargando) {
    return (
      <div className="peticion peticion--cargando" role="status">
        <span className="peticion__spinner" aria-hidden="true" />
        Cargando solicitudes desde el servidor…
      </div>
    );
  }

  if (error) {
    return (
      <div className="peticion peticion--error" role="alert">
        <div>
          <strong>No se pudieron cargar las solicitudes.</strong>
          <p className="peticion__detalle">{error}</p>
        </div>
        {onReintentar && (
          <Boton variante="secundario" onClick={onReintentar}>
            Reintentar
          </Boton>
        )}
      </div>
    );
  }

  return children;
}

export default EstadoPeticion;
