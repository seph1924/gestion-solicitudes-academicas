// ============================================================
// Actividad 4: consumo de una API REST con HttpClient.
// Se usa JSONPlaceholder (/users): API publica y gratuita, sin
// registro ni credenciales, asi no se publica ningun token.
// El servicio devuelve Observable<SolicitudAcademica[]>: el
// componente no sabe de donde vienen los datos.
// ============================================================

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuarioApi } from '../models/solicitud-api.model';
import { EstadoSolicitud, SolicitudAcademica, TipoSolicitud } from '../models/solicitud.model';
import { ESTADOS_SOLICITUD, TIPOS_SOLICITUD } from '../utils/helpers';

@Injectable({ providedIn: 'root' })
export class SolicitudApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getSolicitudesExternas(): Observable<SolicitudAcademica[]> {
    return this.http
      .get<UsuarioApi[]>(this.url)
      .pipe(map((usuarios) => usuarios.map((usuario) => this.aSolicitud(usuario))));
  }

  // Adapta el registro generico de la API al modelo tipado del caso,
  // para que la tabla sea coherente con el resto de la aplicacion.
  private aSolicitud(usuario: UsuarioApi): SolicitudAcademica {
    const tipoSolicitud: TipoSolicitud = TIPOS_SOLICITUD[usuario.id % TIPOS_SOLICITUD.length];
    const estado: EstadoSolicitud = ESTADOS_SOLICITUD[usuario.id % ESTADOS_SOLICITUD.length];

    return {
      id: usuario.id,
      codigoEstudiante: `EXT-${String(usuario.id).padStart(6, '0')}`,
      nombreEstudiante: usuario.name,
      correoEstudiante: usuario.email.toLowerCase(),
      tipoSolicitud,
      motivo: usuario.company?.catchPhrase ?? 'Solicitud importada desde la API externa.',
      fechaCreacion: new Date().toISOString().split('T')[0],
      estado
    };
  }
}
