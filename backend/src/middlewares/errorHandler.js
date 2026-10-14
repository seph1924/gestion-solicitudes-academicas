const { nodeEnv } = require('../config/env');

// Middleware de errores: Express lo reconoce porque recibe 4 parámetros (err, req, res, next).
// Cualquier error lanzado en una ruta (o pasado con next(err)) termina aquí.
function errorHandler(err, req, res, next) {
  // JSON mal formado en el body de la solicitud
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, mensaje: 'El cuerpo de la solicitud no es un JSON válido' });
  }

  // Errores de validación del esquema Mongoose (campos faltantes, enum inválido, etc.)
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ ok: false, mensaje: 'Datos no válidos', errores: mensajes });
  }

  // ID con formato inválido (CastError)
  if (err.name === 'CastError') {
    return res.status(400).json({ ok: false, mensaje: 'El ID proporcionado no es válido' });
  }

  // Clave duplicada
  if (err.code === 11000) {
    return res.status(409).json({ ok: false, mensaje: 'Ya existe un registro con esos datos' });
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