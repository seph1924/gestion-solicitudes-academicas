const { Router } = require('express');
const solicitudesRoutes = require('./solicitudes.routes');

const router = Router();

// Ruta de verificación: confirma que la API está en línea
router.get('/health', (req, res) => {
  res.json({ ok: true, mensaje: 'API de Gestión de Solicitudes Académicas en línea' });
});

// Cada entidad tiene su propio archivo de rutas
router.use('/solicitudes', solicitudesRoutes);

module.exports = router;
