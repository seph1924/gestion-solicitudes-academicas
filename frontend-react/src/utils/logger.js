// Logger del frontend: reemplaza a console.* para controlar qué se muestra según el entorno.
// Niveles: debug < info < warn < error < silent
const NIVELES = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };

// Por defecto: todo en desarrollo, solo warn y error en producción.
const nivelPorDefecto = import.meta.env.PROD ? 'warn' : 'debug';
const nivelConfigurado = import.meta.env.VITE_LOG_LEVEL || nivelPorDefecto;
const umbral = NIVELES[nivelConfigurado] ?? NIVELES[nivelPorDefecto];

// Últimos eventos en memoria: sirven como evidencia y para adjuntarlos a un reporte de error
const MAX_HISTORIAL = 50;
const historial = [];

function emitir(nivel, mensaje, datos) {
  if (NIVELES[nivel] < umbral) return;

  const fecha = new Date().toISOString();
  historial.push({ fecha, nivel, mensaje, datos });
  if (historial.length > MAX_HISTORIAL) historial.shift();

  const metodo = nivel === 'debug' ? 'log' : nivel;
  const prefijo = `[${fecha}] [${nivel.toUpperCase()}]`;
  if (datos === undefined) console[metodo](prefijo, mensaje);
  else console[metodo](prefijo, mensaje, datos);
}

export const logger = {
  debug: (mensaje, datos) => emitir('debug', mensaje, datos),
  info: (mensaje, datos) => emitir('info', mensaje, datos),
  warn: (mensaje, datos) => emitir('warn', mensaje, datos),
  error: (mensaje, datos) => emitir('error', mensaje, datos),
  obtenerHistorial: () => [...historial]
};

export default logger;
