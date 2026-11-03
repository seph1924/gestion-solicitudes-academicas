import './ui.css';

// Tarjeta pequeña con un indicador numérico (ej. total de solicitudes pendientes)
function StatCard({ titulo, valor, variante = 'neutral' }) {
  return (
    <div className={`stat stat--${variante}`}>
      <span className="stat__valor">{valor}</span>
      <span className="stat__titulo">{titulo}</span>
    </div>
  );
}

export default StatCard;
