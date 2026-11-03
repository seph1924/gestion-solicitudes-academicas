import { ETIQUETAS_ESTADO } from '../../utils/formato';
import './ui.css';

// Etiqueta de color según el estado de la solicitud
function EstadoBadge({ estado }) {
  return (
    <span className={`badge badge--${estado.toLowerCase()}`}>
      {ETIQUETAS_ESTADO[estado] ?? estado}
    </span>
  );
}

export default EstadoBadge;
