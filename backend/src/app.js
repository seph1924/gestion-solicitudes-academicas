const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { corsOrigin } = require('./config/env');

const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const app = express();

// 1. Middlewares globales
app.use(logger);

// 2. Configuración CORS para permitir cookies desde React
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

// 3. Procesamiento de solicitudes
app.use(express.json());
app.use(cookieParser());

// 4. Rutas de la API
app.use('/api', routes);

// 5. Ruta no encontrada
app.use(notFound);

// 6. Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;