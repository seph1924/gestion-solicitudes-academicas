const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema(
  {
    codigoEstudiante: {
      type: String,
      required: [true, 'El código del estudiante es obligatorio'],
      trim: true
    },
    nombreEstudiante: {
      type: String,
      required: [true, 'El nombre del estudiante es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    tipoSolicitud: {
      type: String,
      required: [true, 'El tipo de solicitud es obligatorio'],
      enum: {
        values: ['Rectificación de Nota', 'Reserva de Matrícula', 'Carta de Presentación', 'Examen Extemporáneo'],
        message: 'Tipo de solicitud no válido'
      }
    },
    motivo: {
      type: String,
      required: [true, 'El motivo es obligatorio'],
      trim: true,
      maxlength: [500, 'El motivo no puede superar 500 caracteres']
    },
    estado: {
      type: String,
      enum: {
        values: ['PENDIENTE', 'EN_PROCESO', 'APROBADO', 'RECHAZADO'],
        message: 'Estado no válido'
      },
      default: 'PENDIENTE'
    }
  },
  {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
  }
);

module.exports = mongoose.model('Solicitud', solicitudSchema);