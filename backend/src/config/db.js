const mongoose = require('mongoose');
const log = require('../utils/logger');
const { mongodbUri } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri);
    log.info('MongoDB conectado', { host: mongoose.connection.host, base: mongoose.connection.name });
  } catch (error) {
    log.error('Error al conectar con MongoDB', { mensaje: error.message });
    process.exit(1);
  }
};

module.exports = connectDB;