import { Component, OnInit } from '@angular/core';
import { SolicitudAcademica, EstadoSolicitud } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-filtro-solicitudes',
  templateUrl: './filtro-solicitudes.component.html',
  styleUrls: ['./filtro-solicitudes.component.css']
})
export class FiltroSolicitudesComponent implements OnInit {

  solicitudes: SolicitudAcademica[] = [];
  solicitudesFiltradas: SolicitudAcademica[] = [];

  textoBusqueda = '';
  estadoSeleccionado = '';

  estados = Object.values(EstadoSolicitud);

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudes = this.solicitudService.getSolicitudes();
    this.solicitudesFiltradas = this.solicitudes;
  }

  filtrar(): void {
    const texto = this.textoBusqueda.toLowerCase().trim();

    this.solicitudesFiltradas = this.solicitudes.filter(solicitud => {

      const coincideTexto =
        solicitud.nombreEstudiante.toLowerCase().includes(texto) ||
        solicitud.codigoEstudiante.toLowerCase().includes(texto);

      const coincideEstado =
        !this.estadoSeleccionado ||
        solicitud.estado === this.estadoSeleccionado;

      return coincideTexto && coincideEstado;
    });
  }

  limpiar(): void {
    this.textoBusqueda = '';
    this.estadoSeleccionado = '';
    this.solicitudesFiltradas = this.solicitudes;
  }
}