// Carga las variables del archivo .env en process.env
require('dotenv').config();

// Centraliza la configuración para no leer process.env en todo el proyecto
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_solicitudes'
};
