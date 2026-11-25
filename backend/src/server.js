const mongoose = require('mongoose');
const app = require('./app');
const { port, nodeEnv } = require('./config/env');
const connectDB = require('./config/db');
const log = require('./utils/logger');

// Errores que nadie capturó: se registran antes de cerrar el proceso
process.on('unhandledRejection', (motivo) => {
  log.error('Promesa rechazada sin manejar', { motivo: String(motivo?.message ?? motivo) });
});
process.on('uncaughtException', (error) => {
  log.error('Excepción no capturada', { mensaje: error.message, pila: error.stack });
  process.exit(1);
});

connectDB().then(() => {
  const servidor = app.listen(port, () => {
    log.info(`Servidor escuchando en http://localhost:${port}`, { entorno: nodeEnv });
  });

  // Cierre ordenado: deja de aceptar conexiones y cierra MongoDB
  const cerrar = (senal) => {
    log.info(`Señal ${senal} recibida: cerrando el servidor`);
    servidor.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };
  process.on('SIGTERM', () => cerrar('SIGTERM'));
  process.on('SIGINT', () => cerrar('SIGINT'));
});
