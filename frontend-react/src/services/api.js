
import axios from 'axios';

// URL base del backend
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Error uniforme para las peticiones
export class ApiError extends Error {
  constructor({ mensaje, status = null, tipo = 'HTTP', errores = [] }) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.tipo = tipo;
    this.errores = errores;
  }
}

// Mensajes según el código HTTP
const MENSAJES_HTTP = {
  400: 'La solicitud enviada no es válida.',
  401: 'Debe iniciar sesión para continuar.',
  403: 'No tiene permisos para realizar esta acción.',
  404: 'El recurso solicitado no existe.',
  409: 'El registro ya existe.',
  500: 'Error interno del servidor. Intente nuevamente más tarde.'
};

// Instancia única de Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitudes
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.info(
      `[API] -> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
  }

  return config;
});

// Interceptor de respuestas
api.interceptors.response.use(
  (respuesta) => {
    if (import.meta.env.DEV) {
      console.info(
        `[API] <- ${respuesta.status} ${respuesta.config.url}`
      );
    }

    return respuesta;
  },

  (error) => {
    // Tiempo de espera agotado
    if (
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT'
    ) {
      return Promise.reject(
        new ApiError({
          tipo: 'TIMEOUT',
          mensaje: 'El servidor tardó demasiado en responder. Intente nuevamente.'
        })
      );
    }

    // Error de conexión
    if (!error.response) {
      return Promise.reject(
        new ApiError({
          tipo: 'RED',
          mensaje: 'No se pudo conectar con el servidor. Verifique que la API esté en ejecución.'
        })
      );
    }

    // Error HTTP
    const { status, data } = error.response;

    console.error(
      `[API] <- ${status} ${error.config?.url}`,
      data
    );

    return Promise.reject(
      new ApiError({
        status,
        tipo: 'HTTP',
        mensaje:
          data?.mensaje ||
          MENSAJES_HTTP[status] ||
          `Error inesperado (${status}).`,
        errores: Array.isArray(data?.errores)
          ? data.errores
          : []
      })
    );
  }
);

export default api;