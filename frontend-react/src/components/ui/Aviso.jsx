import './ui.css';

// Mensaje de resultado de una operación (éxito o error).
// "errores" es la lista de detalles de validación devuelta por el backend.
function Aviso({ aviso, onCerrar }) {
  if (!aviso) return null;

  const tipo = aviso.ok ? 'exito' : 'error';

  return (
    <div className={`aviso aviso--${tipo}`} role={aviso.ok ? 'status' : 'alert'}>
      <div>
        <strong>{aviso.mensaje}</strong>
        {aviso.errores?.length > 0 && (
          <ul className="aviso__lista">
            {aviso.errores.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
      {onCerrar && (
        <button type="button" className="aviso__cerrar" aria-label="Cerrar aviso" onClick={onCerrar}>
          ×
        </button>
      )}
    </div>
  );
}

export default Aviso;
