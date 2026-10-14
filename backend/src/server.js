const app = require('./app');
const { port, nodeEnv } = require('./config/env');

// Punto de entrada: levanta el servidor HTTP.
// Aquí el integrante 3 agregará la conexión a MongoDB antes de app.listen.
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port} (${nodeEnv})`);
});
