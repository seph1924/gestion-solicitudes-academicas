import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { SolicitudAcademica } from '../../models/solicitud.model';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {
  solicitudes: SolicitudAcademica[] = [];

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudes = this.solicitudService.getSolicitudes();
  }
}