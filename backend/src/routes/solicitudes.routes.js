const { Router } = require('express');

const router = Router();

// Rutas de la entidad principal. El CRUD lo implementa el integrante 2;
// mientras tanto responden 501 (Not Implemented) para que la estructura ya sea demostrable.
const pendiente = (req, res) => {
  res.status(501).json({ ok: false, mensaje: `${req.method} ${req.originalUrl} aún no implementado` });
};

router.get('/', pendiente);       // Listar solicitudes
router.get('/:id', pendiente);    // Obtener una solicitud por ID
router.post('/', pendiente);      // Registrar una solicitud
router.put('/:id', pendiente);    // Actualizar una solicitud
router.delete('/:id', pendiente); // Eliminar una solicitud

module.exports = router;
