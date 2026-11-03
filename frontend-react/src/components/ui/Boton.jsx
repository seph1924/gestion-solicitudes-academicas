import './ui.css';

// Botón reutilizable. variante: "primario" | "secundario" | "peligro"
function Boton({ children, variante = 'primario', type = 'button', ...props }) {
  return (
    <button type={type} className={`boton boton--${variante}`} {...props}>
      {children}
    </button>
  );
}

export default Boton;
