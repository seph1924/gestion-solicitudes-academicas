const service = require('../services/solicitud.service');

// Los errores se delegan con next(error) al middleware errorHandler, que responde
// con un formato uniforme { ok: false, mensaje, errores? } y el código HTTP adecuado:
//  - ValidationError (Mongoose) -> 400 con la lista de errores de cada campo
//  - CastError (ID mal formado)  -> 400
//  - Cualquier otro error         -> 500
// Así el frontend React puede validar y mostrar las respuestas de error de forma consistente.

const noEncontrada = (res) =>
  res.status(404).json({ ok: false, mensaje: 'Solicitud no encontrada' });

exports.crearSolicitud = async (req, res, next) => {
  try {
    const nuevaSolicitud = await service.crear(req.body);
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    next(error);
  }
};

exports.listarSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await service.listar();
    res.status(200).json(solicitudes);
  } catch (error) {
    next(error);
  }
};

exports.obtenerSolicitud = async (req, res, next) => {
  try {
    const solicitud = await service.obtenerPorId(req.params.id);
    if (!solicitud) return noEncontrada(res);
    res.status(200).json(solicitud);
  } catch (error) {
    next(error);
  }
};

exports.parcharSolicitud = async (req, res, next) => {
  try {
    const solicitud = await service.parchar(req.params.id, req.body);
    if (!solicitud) return noEncontrada(res);
    res.status(200).json(solicitud);
  } catch (error) {
    next(error);
  }
};

exports.actualizarSolicitud = async (req, res, next) => {
  try {
    const solicitud = await service.actualizar(req.params.id, req.body);
    if (!solicitud) return noEncontrada(res);
    res.status(200).json(solicitud);
  } catch (error) {
    next(error);
  }
};

exports.eliminarSolicitud = async (req, res, next) => {
  try {
    const solicitud = await service.eliminar(req.params.id);
    if (!solicitud) return noEncontrada(res);
    res.status(200).json({ ok: true, mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};
