const express = require('express');
const cors = require('cors');
const { corsOrigin } = require('./config/env');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// 1. Middlewares globales: se ejecutan en este orden para cada solicitud
app.use(logger);                          // Registra cada solicitud en consola
app.use(cors({ origin: corsOrigin }));    // Permite que Angular (localhost:4200) consuma la API
app.use(express.json());                  // Convierte el body JSON en req.body

// 2. Rutas de la API, todas bajo el prefijo /api
app.use('/api', routes);

// 3. Si ninguna ruta respondió, 404
app.use(notFound);

// 4. Manejador de errores: siempre al final
app.use(errorHandler);

module.exports = app;
