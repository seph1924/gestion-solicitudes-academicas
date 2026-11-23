import axios from 'axios';

// URL base de la API Node.js/Express. Se define en el archivo .env de Vite
// (VITE_API_URL). Si no existe, se usa el backend local por defecto.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Error uniforme que reciben los hooks y componentes, sin importar
// si el fallo fue de red, de tiempo de espera o una respuesta HTTP de error.
export class ApiError extends Error {
  constructor({ mensaje, status = null, tipo = 'HTTP', errores = [] }) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;   // código HTTP (null si no hubo respuesta)
    this.tipo = tipo;       // 'HTTP' | 'RED' | 'TIMEOUT' | 'VALIDACION'
    this.errores = errores; // detalle de validación enviado por el backend
  }
}

// Mensajes por defecto según el código HTTP, por si el backend no envía uno
const MENSAJES_HTTP = {
  400: 'La solicitud enviada no es válida.',
  401: 'Debe iniciar sesión para continuar.',
  403: 'No tiene permisos para realizar esta acción.',
  404: 'El recurso solicitado no existe.',
  409: 'El registro ya existe.',
  500: 'Error interno del servidor. Intente nuevamente más tarde.'
};

// Instancia única de Axios: todas las peticiones comparten URL base, cabeceras y timeout
const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
});

// --- Punto de integración con la autenticación JWT (Integrante 2) ---
// El módulo de sesión registra aquí una función que devuelve el token actual.
// Si existe token, se envía en la cabecera Authorization de cada petición.
let obtenerToken = () => null;
export function registrarProveedorToken(fn) {
  obtenerToken = typeof fn === 'function' ? fn : () => null;
}

// Interceptor de solicitud
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (import.meta.env.DEV) {
    console.info(`[API] -> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  }
  return config;
});

// --- Punto de integración para respuestas 401 (sesión expirada) ---
let alNoAutorizado = () => {};
export function registrarManejadorNoAutorizado(fn) {
  alNoAutorizado = typeof fn === 'function' ? fn : () => {};
}

// Interceptor de respuesta: normaliza todos los errores a ApiError
api.interceptors.response.use(
  (respuesta) => {
    if (import.meta.env.DEV) {
      console.info(`[API] <- ${respuesta.status} ${respuesta.config.url}`);
    }
    return respuesta;
  },
  (error) => {
    // 1. Tiempo de espera agotado
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return Promise.reject(new ApiError({
        tipo: 'TIMEOUT',
        mensaje: 'El servidor tardó demasiado en responder. Intente nuevamente.'
      }));
    }

    // 2. Sin respuesta: servidor apagado, sin conexión o bloqueo por CORS
    if (!error.response) {
      return Promise.reject(new ApiError({
        tipo: 'RED',
        mensaje: 'No se pudo conectar con el servidor. Verifique que la API esté en ejecución.'
      }));
    }

    // 3. El servidor respondió con un código de error (4xx / 5xx)
    const { status, data } = error.response;
    if (status === 401) alNoAutorizado();

    console.error(`[API] <- ${status} ${error.config?.url}`, data);

    return Promise.reject(new ApiError({
      status,
      tipo: 'HTTP',
      mensaje: data?.mensaje || MENSAJES_HTTP[status] || `Error inesperado (${status}).`,
      errores: Array.isArray(data?.errores) ? data.errores : []
    }));
  }
);

export default api;
