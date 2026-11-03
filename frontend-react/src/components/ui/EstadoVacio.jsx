import './ui.css';

// Mensaje para cuando una lista no tiene resultados (ej. un filtro sin coincidencias)
function EstadoVacio({ mensaje = 'No hay solicitudes para mostrar.' }) {
  return <div className="estado-vacio">{mensaje}</div>;
}

export default EstadoVacio;
