const { Router } = require('express');
const router = Router();

const solicitudController = require('../controllers/solicitud.controller');

// Listar todas las solicitudes
router.get('/', solicitudController.listarSolicitudes);
// Obtener una solicitud por ID
router.get('/:id', solicitudController.obtenerSolicitud);
// Registrar una solicitud
router.post('/', solicitudController.crearSolicitud);
// Parchar una solicitud
router.patch('/:id', solicitudController.parcharSolicitud);
// Actualizar una solicitud
router.put('/:id', solicitudController.actualizarSolicitud);
// Eliminar una solicitud
router.delete('/:id', solicitudController.eliminarSolicitud);

module.exports = router;