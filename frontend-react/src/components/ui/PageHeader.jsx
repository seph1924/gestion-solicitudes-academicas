import './ui.css';

// Encabezado estándar de cada página: título, subtítulo y una acción opcional a la derecha
function PageHeader({ titulo, subtitulo, accion }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header__titulo">{titulo}</h1>
        {subtitulo && <p className="page-header__subtitulo">{subtitulo}</p>}
      </div>
      {accion}
    </div>
  );
}

export default PageHeader;
