const log = require('../utils/logger');

// Middleware que registra cada solicitud HTTP: método, ruta, código y duración.
// El nivel del registro depende del código: 5xx = error, 4xx = warn, resto = info.
function logger(req, res, next) {
  const inicio = Date.now();

  // 'finish' se emite cuando la respuesta ya fue enviada al cliente
  res.on('finish', () => {
    const nivel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    log[nivel](`${req.method} ${req.originalUrl} -> ${res.statusCode}`, {
      metodo: req.method,
      ruta: req.originalUrl,
      estado: res.statusCode,
      duracionMs: Date.now() - inicio
    });
  });

  next();
}

module.exports = logger;
