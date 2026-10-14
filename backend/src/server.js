const app = require('./app');
const { port, nodeEnv } = require('./config/env');
const connectDB = require('./config/db');

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port} (${nodeEnv})`);
  });
});