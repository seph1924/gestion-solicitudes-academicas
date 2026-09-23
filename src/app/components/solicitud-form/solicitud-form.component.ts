// ============================================================
// Actividad 3: formulario reactivo con validaciones y navegacion.
// Las reglas propias se reutilizan desde utils/validaciones.ts
// envueltas como validadores de Angular.
// ============================================================

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TipoSolicitud } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { NuevaSolicitud, TIPOS_SOLICITUD } from '../../utils/helpers';
import { LONGITUD_MINIMA_MOTIVO, validarCodigo } from '../../utils/validaciones';

// Validador propio: reutiliza la regla definida en la Actividad 1
const codigoValidator = (control: AbstractControl): ValidationErrors | null => {
  const valor = (control.value ?? '') as string;
  if (!valor) {
    return null; // de eso se encarga Validators.required
  }
  return validarCodigo(valor) ? null : { codigoInvalido: true };
};

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css']
})
export class SolicitudFormComponent implements OnInit {
  formulario!: FormGroup;
  enviado = false;
  mensajeExito = '';

  tipos: TipoSolicitud[] = TIPOS_SOLICITUD;
  minimoMotivo = LONGITUD_MINIMA_MOTIVO;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombreEstudiante: ['', [Validators.required, Validators.minLength(3)]],
      codigoEstudiante: ['', [Validators.required, codigoValidator]],
      correoEstudiante: ['', [Validators.required, Validators.email]],
      tipoSolicitud: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(LONGITUD_MINIMA_MOTIVO)]]
    });
  }

  // Acceso corto a los controles desde la plantilla
  get f() {
    return this.formulario.controls;
  }

  invalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.invalid && (control.touched || this.enviado);
  }

  registrar(): void {
    this.enviado = true;
    this.mensajeExito = '';

    if (this.formulario.invalid) {
      // Marca todo como tocado para que se muestren las validaciones pendientes
      this.formulario.markAllAsTouched();
      return;
    }

    const nueva = this.formulario.value as NuevaSolicitud;
    const solicitud = this.solicitudService.agregarSolicitud(nueva);

    this.mensajeExito = `Solicitud #${solicitud.id} registrada correctamente.`;
    this.formulario.reset({ tipoSolicitud: '' });
    this.enviado = false;

    // Navegacion por codigo hacia el listado de la Actividad 2
    setTimeout(() => this.router.navigate(['/solicitudes']), 1200);
  }

  limpiar(): void {
    this.formulario.reset({ tipoSolicitud: '' });
    this.enviado = false;
    this.mensajeExito = '';
  }
}
