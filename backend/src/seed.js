// Carga solicitudes de ejemplo en MongoDB para probar la integración con el frontend.
// Uso: npm run seed   (borra las solicitudes existentes y vuelve a insertarlas)
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Solicitud = require('./models/Solicitud');

const solicitudes = [
  {
    codigoEstudiante: 'U20230145',
    nombreEstudiante: 'María Fernández Quispe',
    tipoSolicitud: 'Rectificación de Nota',
    motivo: 'La nota del examen parcial de Programación Web II no coincide con la publicada en el aula virtual.',
    estado: 'PENDIENTE'
  },
  {
    codigoEstudiante: 'U20221187',
    nombreEstudiante: 'Jorge Ramírez Torres',
    tipoSolicitud: 'Reserva de Matrícula',
    motivo: 'Solicito reservar la matrícula del siguiente ciclo por motivos laborales.',
    estado: 'EN_PROCESO'
  },
  {
    codigoEstudiante: 'U20240032',
    nombreEstudiante: 'Lucía Mendoza Rojas',
    tipoSolicitud: 'Carta de Presentación',
    motivo: 'Requiero carta de presentación para iniciar prácticas preprofesionales en una empresa de software.',
    estado: 'APROBADO'
  },
  {
    codigoEstudiante: 'U20230876',
    nombreEstudiante: 'Diego Salazar Huamán',
    tipoSolicitud: 'Examen Extemporáneo',
    motivo: 'No pude rendir el examen final por un problema de salud, adjunto certificado médico.',
    estado: 'RECHAZADO'
  },
  {
    codigoEstudiante: 'U20220459',
    nombreEstudiante: 'Valeria Chávez Paredes',
    tipoSolicitud: 'Rectificación de Nota',
    motivo: 'La nota de la PA2 aparece como cero aunque el trabajo fue entregado a tiempo.',
    estado: 'PENDIENTE'
  },
  {
    codigoEstudiante: 'U20241210',
    nombreEstudiante: 'Andrés Castillo Vega',
    tipoSolicitud: 'Carta de Presentación',
    motivo: 'Necesito carta de presentación para un proyecto de voluntariado tecnológico.',
    estado: 'EN_PROCESO'
  }
];

connectDB()
  .then(async () => {
    await Solicitud.deleteMany({});
    const creadas = await Solicitud.insertMany(solicitudes);
    console.log(`Seed completado: ${creadas.length} solicitudes insertadas.`);
  })
  .catch((error) => {
    console.error('Error en el seed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
