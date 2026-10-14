const { nodeEnv } = require('../config/env');

// Middleware de errores: Express lo reconoce porque recibe 4 parámetros (err, req, res, next).
// Cualquier error lanzado en una ruta (o pasado con next(err)) termina aquí.
function errorHandler(err, req, res, next) {
  // JSON mal formado en el body de la solicitud
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, mensaje: 'El cuerpo de la solicitud no es un JSON válido' });
  }

  const status = err.status || 500;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    ok: false,
    mensaje: status === 500 ? 'Error interno del servidor' : err.message,
    // El detalle técnico solo se muestra en desarrollo, nunca en producción
    ...(nodeEnv === 'development' && status === 500 && { detalle: err.message })
  });
}

module.exports = errorHandler;
