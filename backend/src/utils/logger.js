const { nodeEnv, logLevel } = require('../config/env');

const NIVELES = { debug: 0, info: 1, warn: 2, error: 3 };

// Escribe un registro por línea: JSON en producción (fácil de filtrar) y texto legible en desarrollo
function escribir(nivel, mensaje, meta = {}) {
  if (NIVELES[nivel] < NIVELES[logLevel]) return;

  const fecha = new Date().toISOString();
  const salida = nivel === 'error' ? console.error : console.log;

  if (nodeEnv === 'production') {
    salida(JSON.stringify({ fecha, nivel, mensaje, ...meta }));
    return;
  }

  const detalle = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  salida(`[${fecha}] ${nivel.toUpperCase()} ${mensaje}${detalle}`);
}

module.exports = {
  debug: (mensaje, meta) => escribir('debug', mensaje, meta),
  info: (mensaje, meta) => escribir('info', mensaje, meta),
  warn: (mensaje, meta) => escribir('warn', mensaje, meta),
  error: (mensaje, meta) => escribir('error', mensaje, meta)
};
