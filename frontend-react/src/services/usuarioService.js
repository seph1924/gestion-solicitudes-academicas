import api from './api';

// POST /api/usuarios/registro
export async function registrarUsuario(datos) {
  const { data } = await api.post('/usuarios/registro', {
    nombre: datos.nombre.trim(),
    email: datos.email.trim().toLowerCase(),
    password: datos.password
  });

  return data;
}

// POST /api/usuarios/login
export async function iniciarSesion(datos) {
  const { data } = await api.post('/usuarios/login', {
    email: datos.email.trim().toLowerCase(),
    password: datos.password
  });

  return data;
}

// GET /api/usuarios/me
export async function obtenerSesion() {
  const { data } = await api.get('/usuarios/me');
  return data;
}

// POST /api/usuarios/logout
export async function cerrarSesion() {
  const { data } = await api.post('/usuarios/logout');
  return data;
}