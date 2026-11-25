import { logger } from './logger';

const URL_MONITOREO = import.meta.env.VITE_MONITOREO_URL;

// Envía el error a un servicio externo (si se configuró) sin bloquear la interfaz
export function reportarError(tipo, detalle) {
  logger.error(tipo, detalle);
  if (!URL_MONITOREO || !navigator.sendBeacon) return;
  const cuerpo = JSON.stringify({
    tipo,
    detalle,
    version: __APP_VERSION__,
    url: window.location.href,
    fecha: new Date().toISOString()
  });
  navigator.sendBeacon(URL_MONITOREO, cuerpo);
}

// Mide LCP (carga visual) y el tiempo total de carga de la página
function medirRendimiento() {
  if (!('PerformanceObserver' in window)) return;
  try {
    new PerformanceObserver((lista) => {
      const ultimo = lista.getEntries().at(-1);
      if (ultimo) logger.info(`LCP: ${Math.round(ultimo.startTime)} ms`);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    logger.debug('El navegador no soporta la métrica LCP.');
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) logger.info(`Página cargada en ${Math.round(nav.loadEventEnd)} ms`);
    }, 0);
  });
}

// Se llama una sola vez al arrancar la aplicación (main.jsx)
export function iniciarMonitoreo() {
  logger.info(`Aplicación iniciada · versión ${__APP_VERSION__} · compilada ${__BUILD_DATE__}`);

  window.addEventListener('error', (e) =>
    reportarError('Error global no capturado', {
      mensaje: e.message, archivo: e.filename, linea: e.lineno
    })
  );

  window.addEventListener('unhandledrejection', (e) =>
    reportarError('Promesa rechazada sin manejar', {
      motivo: String(e.reason?.message ?? e.reason)
    })
  );

  medirRendimiento();
}
