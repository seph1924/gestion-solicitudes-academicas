const service = require('../services/solicitud.service');

exports.crearSolicitud = async (req, res) => {
  try {
    const nuevaSolicitud = await service.crear(req.body);

    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await service.listar();

    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerSolicitud = async (req, res) => {
  try {
    const solicitud = await service.obtenerPorId(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.status(200).json(solicitud);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.actualizarSolicitud = async (req, res) => {
  try {
    const solicitud = await service.actualizar(
      req.params.id,
      req.body
    );

    if (!solicitud) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.status(200).json(solicitud);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.eliminarSolicitud = async (req, res) => {
  try {
    const solicitud = await service.eliminar(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.status(200).json({
      mensaje: 'Solicitud eliminada correctamente'
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};