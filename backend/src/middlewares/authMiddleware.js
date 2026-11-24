const service = require('../services/usuario.service');

exports.verificarAutenticacion = (req, res, next) => {
  try {
    // Obtener el JWT desde la cookie
    const token = req.cookies?.access_token;

    // Comprobar que exista el token
    if (!token) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No existe una sesión activa. Inicia sesión.'
      });
    }

    // Verificar la validez del JWT
    const datosToken = service.verificarToken(token);

    // Guardar los datos del usuario autenticado
    req.usuario = datosToken;

    // Continuar con el controlador
    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token inválido o sesión expirada.'
    });
  }
};