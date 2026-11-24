const { Router } = require('express');
const solicitudesRoutes = require('./solicitudes.routes');
const usuariosRoutes = require('./usuarios.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API de Gestión de Solicitudes Académicas en línea'
  });
});

router.use('/solicitudes', solicitudesRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;