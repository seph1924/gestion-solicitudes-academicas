// Responde 404 cuando ninguna ruta coincide con la solicitud
function notFound(req, res) {
  res.status(404).json({
    ok: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
}

module.exports = notFound;
