import { Injectable } from '@angular/core';
import { SolicitudAcademica, EstadoSolicitud, TipoSolicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  // Lista inicial de solicitudes de prueba (Mocks)
  private solicitudes: SolicitudAcademica[] = [
    {
      id: 1,
      codigoEstudiante: 'I20231001',
      nombreEstudiante: 'Josep Palacios',
      tipoSolicitud: TipoSolicitud.RECTIFICACION_NOTA,
      motivo: 'Error de digitación en la nota de la Evaluación Continua 1.',
      fechaCreacion: '2026-09-22',
      estado: EstadoSolicitud.EN_PROCESO
    },
    {
      id: 2,
      codigoEstudiante: 'I20231002',
      nombreEstudiante: 'Camila Rodriguez',
      tipoSolicitud: TipoSolicitud.CARTA_PRESENTACION,
      motivo: 'Requerida para inicio de prácticas preprofesionales.',
      fechaCreacion: '2026-09-20',
      estado: EstadoSolicitud.APROBADO
    }
  ];

  constructor() {}

  // Método para obtener la lista de solicitudes (usando ES6 Spread Operator para inmutabilidad)
  getSolicitudes(): SolicitudAcademica[] {
    return [...this.solicitudes];
  }

  // Método para registrar una nueva solicitud
  agregarSolicitud(solicitudData: Omit<SolicitudAcademica, 'id' | 'fechaCreacion' | 'estado'>): SolicitudAcademica {
    const nuevaSolicitud: SolicitudAcademica = {
      ...solicitudData,
      id: this.solicitudes.length + 1,
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado: EstadoSolicitud.PENDIENTE
    };

    this.solicitudes.unshift(nuevaSolicitud);
    return nuevaSolicitud;
  }
}