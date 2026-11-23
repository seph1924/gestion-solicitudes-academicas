// Carga las variables del archivo .env en process.env
require('dotenv').config();

// CORS_ORIGIN admite varios orígenes separados por coma
// (ej. Angular en :4200 y React/Vite en :5173).
const corsOrigin = (process.env.CORS_ORIGIN || 'http://localhost:4200,http://localhost:5173')
  .split(',')
  .map((origen) => origen.trim())
  .filter(Boolean);

// Centraliza la configuración para no leer process.env en todo el proyecto
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_solicitudes'
};
