import EstadoBadge from './EstadoBadge';
import { formatearFecha } from '../../utils/formato';
import './ui.css';

// Tarjeta que muestra el resumen de una solicitud.
// "acciones" es opcional: permite que otras vistas agreguen botones (ver detalle, cambiar estado, etc.).
function SolicitudCard({ solicitud, acciones }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__cabecera">
        <span className="tarjeta__tipo">{solicitud.tipoSolicitud}</span>
        <EstadoBadge estado={solicitud.estado} />
      </div>

      <h3 className="tarjeta__titulo">{solicitud.nombreEstudiante}</h3>
      <p className="tarjeta__codigo">{solicitud.codigoEstudiante}</p>
      <p className="tarjeta__motivo">{solicitud.motivo}</p>

      <div className="tarjeta__pie">
        <span>{formatearFecha(solicitud.fechaCreacion)}</span>
        {acciones && <div className="tarjeta__acciones">{acciones}</div>}
      </div>
    </article>
  );
}

export default SolicitudCard;
