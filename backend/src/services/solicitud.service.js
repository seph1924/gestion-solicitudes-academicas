const Solicitud = require('../models/Solicitud');

const crear = (datos) => Solicitud.create(datos);
const listar = () => Solicitud.find().sort({ fechaCreacion: -1 });
const obtenerPorId = (id) => Solicitud.findById(id);
const parchar = (id, datos = {}) => Solicitud.findByIdAndUpdate(id, { $set: datos }, { returnDocument: 'after', runValidators: true });
const actualizar = (id, datos) => Solicitud.findByIdAndUpdate(id, datos, { returnDocument: 'after', runValidators: true });
const eliminar = (id) => Solicitud.findByIdAndDelete(id);

module.exports = { crear, listar, obtenerPorId, parchar, actualizar, eliminar };