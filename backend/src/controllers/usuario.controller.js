const service = require('../services/usuario.service');

const opcionesCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 1000
};

// REGISTRAR USUARIO
exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La contraseña debe tener al menos 8 caracteres'
      });
    }

    const usuarioExistente = await service.buscarPorEmail(email);

    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        mensaje: 'El correo ya está registrado'
      });
    }

    const usuario = await service.registrar({
      nombre,
      email,
      password
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    next(error);
  }
};

// INICIAR SESIÓN
exports.iniciarSesion = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Correo y contraseña son obligatorios'
      });
    }

    const usuario = await service.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    const passwordCorrecta = await service.compararPassword(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    const token = service.generarToken(usuario);

    res.cookie('access_token', token, opcionesCookie);

    res.status(200).json({
      ok: true,
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    next(error);
  }
};

// OBTENER SESIÓN ACTUAL
exports.obtenerSesion = async (req, res, next) => {
  try {
    const usuario = await service.buscarPorId(req.usuario.id);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      autenticado: true,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    next(error);
  }
};

// CERRAR SESIÓN
exports.cerrarSesion = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return res.status(200).json({
    ok: true,
    mensaje: 'Sesión cerrada correctamente'
  });
};