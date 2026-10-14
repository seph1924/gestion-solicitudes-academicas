const Solicitud = require('../models/Solicitud');

const crear = (datos) => Solicitud.create(datos);
const listar = () => Solicitud.find().sort({ fechaCreacion: -1 });
const obtenerPorId = (id) => Solicitud.findById(id);
const actualizar = (id, datos) =>
  Solicitud.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
const eliminar = (id) => Solicitud.findByIdAndDelete(id);

module.exports = { crear, listar, obtenerPorId, actualizar, eliminar };