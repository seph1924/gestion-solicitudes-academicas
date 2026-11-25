import { Component } from 'react';
import { reportarError } from '../../utils/monitoreo';

// Captura errores de renderizado para que un fallo en un componente no deje la pantalla en blanco
class ErrorBoundary extends Component {
  state = { huboError: false };

  static getDerivedStateFromError() {
    return { huboError: true };
  }

  componentDidCatch(error, info) {
    reportarError('Error de renderizado en React', {
      mensaje: error.message,
      pila: info.componentStack
    });
  }

  render() {
    if (!this.state.huboError) return this.props.children;
    return (
      <section className="estado-vacio" role="alert">
        <h2>Algo salió mal</h2>
        <p>Ocurrió un error inesperado. Intente recargar la página.</p>
        <button type="button" onClick={() => window.location.reload()}>Recargar</button>
      </section>
    );
  }
}

export default ErrorBoundary;
