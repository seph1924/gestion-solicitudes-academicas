// Carga las variables del archivo .env en process.env
require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

// En producción no se aceptan valores por defecto: si falta una variable, el servidor no arranca.
if (nodeEnv === 'production') {
  const obligatorias = ['MONGODB_URI', 'CORS_ORIGIN', 'JWT_SECRET'];
  const faltantes = obligatorias.filter((nombre) => !process.env[nombre]);
  if (faltantes.length > 0) {
    console.error(`Faltan variables de entorno obligatorias en producción: ${faltantes.join(', ')}`);
    process.exit(1);
  }
}

// CORS_ORIGIN admite varios orígenes separados por coma
// (ej. Angular en :4200 y React/Vite en :5173).
const corsOrigin = (process.env.CORS_ORIGIN || 'http://localhost:4200,http://localhost:5173')
  .split(',')
  .map((origen) => origen.trim())
  .filter(Boolean);

// Nivel mínimo de logs: debug | info | warn | error
const nivelesValidos = ['debug', 'info', 'warn', 'error'];
const logLevelEnv = (process.env.LOG_LEVEL || '').toLowerCase();
const logLevel = nivelesValidos.includes(logLevelEnv)
  ? logLevelEnv
  : (nodeEnv === 'production' ? 'info' : 'debug');

// Centraliza la configuración para no leer process.env en todo el proyecto
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv,
  corsOrigin,
  logLevel,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_solicitudes'
};
