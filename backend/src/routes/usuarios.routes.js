const { Router } = require('express');
const router = Router();

const usuarioController = require('../controllers/usuario.controller');
const { verificarAutenticacion } = require('../middlewares/authMiddleware');

// Registrar un usuario
router.post('/registro', usuarioController.registrarUsuario);

// Iniciar sesión
router.post('/login', usuarioController.iniciarSesion);

// Obtener la sesión del usuario autenticado
router.get('/me', verificarAutenticacion, usuarioController.obtenerSesion);

// Cerrar sesión
router.post('/logout', usuarioController.cerrarSesion);

module.exports = router;