// Middleware que registra en consola cada solicitud HTTP: método, ruta, código y duración
function logger(req, res, next) {
  const inicio = Date.now();

  // 'finish' se emite cuando la respuesta ya fue enviada al cliente
  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracion} ms)`);
  });

  next();
}

module.exports = logger;
