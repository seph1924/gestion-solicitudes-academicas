import { Component, OnInit } from '@angular/core';

import { EstadoSolicitud, SolicitudAcademica } from '../../models/solicitud.model';
import { SolicitudApiService } from '../../services/solicitud-api.service';
import { claseEstado, contarPorEstado, etiquetaEstado, formatearFecha } from '../../utils/helpers';

@Component({
  selector: 'app-estudiantes-api',
  templateUrl: './estudiantes-api.component.html',
  styleUrls: ['./estudiantes-api.component.css']
})
export class EstudiantesApiComponent implements OnInit {
  solicitudes: SolicitudAcademica[] = [];
  cargando = false;
  error = '';

  constructor(private api: SolicitudApiService) {}

  ngOnInit(): void {
    this.cargar();
  }

  // Banderas de estado para dar retroalimentacion mientras llega
  // la respuesta o si la peticion falla.
  cargar(): void {
    this.cargando = true;
    this.error = '';

    this.api.getSolicitudesExternas().subscribe({
      next: (solicitudes) => {
        this.solicitudes = solicitudes;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo obtener la informacion de la API externa.';
        this.cargando = false;
      }
    });
  }

  get totalAprobadas(): number {
    return contarPorEstado(this.solicitudes)[EstadoSolicitud.APROBADO];
  }

  etiqueta(estado: EstadoSolicitud): string {
    return etiquetaEstado(estado);
  }

  clase(estado: EstadoSolicitud): string {
    return claseEstado(estado);
  }

  fecha(solicitud: SolicitudAcademica): string {
    return formatearFecha(solicitud.fechaCreacion);
  }
}
