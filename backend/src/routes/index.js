const { Router } = require('express');
const mongoose = require('mongoose');
const solicitudesRoutes = require('./solicitudes.routes');
const usuariosRoutes = require('./usuarios.routes');
const { nodeEnv } = require('../config/env');

const router = Router();

const ESTADOS_MONGO = ['desconectado', 'conectado', 'conectando', 'desconectando'];

// Ruta de verificación y monitoreo: confirma que la API y la base de datos están en línea
router.get('/health', (req, res) => {
  const estadoDb = mongoose.connection.readyState;
  const ok = estadoDb === 1;

  res.status(ok ? 200 : 503).json({
    ok,
    mensaje: 'API de Gestión de Solicitudes Académicas en línea',
    entorno: nodeEnv,
    uptimeSegundos: Math.round(process.uptime()),
    memoriaMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    baseDeDatos: ESTADOS_MONGO[estadoDb] ?? 'desconocido',
    fecha: new Date().toISOString()
  });
});

// Cada entidad tiene su propio archivo de rutas
router.use('/solicitudes', solicitudesRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;
