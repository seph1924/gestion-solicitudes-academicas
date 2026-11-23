import { TIPOS_SOLICITUD, ESTADOS_SOLICITUD } from '../data/solicitudes';

// ---------------------------------------------------------------------------
// 1. Validación del formulario (antes de enviar a la API)
//    Replica las reglas del modelo Mongoose (backend/src/models/Solicitud.js)
//    para avisar al usuario sin esperar la respuesta del servidor.
// ---------------------------------------------------------------------------
export function validarFormularioSolicitud(datos) {
  const errores = {};
  const codigo = datos.codigoEstudiante?.trim() ?? '';
  const nombre = datos.nombreEstudiante?.trim() ?? '';
  const motivo = datos.motivo?.trim() ?? '';

  if (!codigo) {
    errores.codigoEstudiante = 'El código del estudiante es obligatorio.';
  } else if (!/^U\d{8}$/i.test(codigo)) {
    errores.codigoEstudiante = 'El código debe tener el formato U seguido de 8 dígitos (ej. U20230145).';
  }

  if (!nombre) {
    errores.nombreEstudiante = 'El nombre del estudiante es obligatorio.';
  } else if (nombre.length < 3) {
    errores.nombreEstudiante = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!TIPOS_SOLICITUD.includes(datos.tipoSolicitud)) {
    errores.tipoSolicitud = 'Seleccione un tipo de solicitud válido.';
  }

  if (!motivo) {
    errores.motivo = 'El motivo es obligatorio.';
  } else if (motivo.length > 500) {
    errores.motivo = 'El motivo no puede superar 500 caracteres.';
  }

  return errores; // objeto vacío = formulario válido
}

// ---------------------------------------------------------------------------
// 2. Validación de las respuestas del servidor
//    Antes de usar los datos en la interfaz se comprueba que tengan la forma
//    esperada. Si no la tienen, se lanza un error en lugar de pintar datos rotos.
// ---------------------------------------------------------------------------
export function esSolicitudValida(obj) {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    typeof obj._id === 'string' &&
    typeof obj.codigoEstudiante === 'string' &&
    typeof obj.nombreEstudiante === 'string' &&
    typeof obj.tipoSolicitud === 'string' &&
    typeof obj.motivo === 'string' &&
    ESTADOS_SOLICITUD.includes(obj.estado)
  );
}

// Adapta el documento de MongoDB al formato que usan los componentes React:
// MongoDB identifica con "_id"; la interfaz trabaja con "id".
export function normalizarSolicitud(obj) {
  return {
    id: obj._id,
    codigoEstudiante: obj.codigoEstudiante,
    nombreEstudiante: obj.nombreEstudiante,
    tipoSolicitud: obj.tipoSolicitud,
    motivo: obj.motivo,
    estado: obj.estado,
    fechaCreacion: obj.fechaCreacion,
    fechaActualizacion: obj.fechaActualizacion
  };
}
