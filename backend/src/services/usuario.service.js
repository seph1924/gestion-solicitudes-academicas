const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Buscar usuario por correo
const buscarPorEmail = (email) =>
  Usuario.findOne({
    email: email.toLowerCase().trim()
  }).select('+password');

// Buscar usuario por ID
const buscarPorId = (id) =>
  Usuario.findById(id);

// Crear usuario con contraseña protegida
const registrar = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.password, 12);

  return Usuario.create({
    nombre: datos.nombre,
    email: datos.email.toLowerCase().trim(),
    password: passwordHash
  });
};

// Comparar contraseñas
const compararPassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);

// Generar JWT
const generarToken = (usuario) =>
  jwt.sign(
    {
      id: usuario._id.toString(),
      email: usuario.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      algorithm: 'HS256'
    }
  );

// Validar JWT
const verificarToken = (token) =>
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      algorithms: ['HS256']
    }
  );

module.exports = {
  buscarPorEmail,
  buscarPorId,
  registrar,
  compararPassword,
  generarToken,
  verificarToken
};