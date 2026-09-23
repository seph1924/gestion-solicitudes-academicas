// ============================================================
// Actividad 1: reglas de validacion en un solo lugar, para que
// el formulario reactivo de la Actividad 3 las reutilice en vez
// de reescribirlas.
// ============================================================

import { NuevaSolicitud } from './helpers';

export const LONGITUD_MINIMA_MOTIVO = 10;

const PATRON_CODIGO = /^[A-Za-z]?\d{6,10}$/;
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validarNombre = (nombre: string): boolean => nombre.trim().length >= 3;

export const validarCodigo = (codigo: string): boolean => PATRON_CODIGO.test(codigo.trim());

export const validarCorreo = (correo: string): boolean => PATRON_CORREO.test(correo.trim());

export const validarMotivo = (
  motivo: string,
  minimo: number = LONGITUD_MINIMA_MOTIVO
): boolean => motivo.trim().length >= minimo;

// Devuelve la lista de errores; vacia significa que la solicitud es valida
export const validarSolicitud = ({
  nombreEstudiante,
  codigoEstudiante,
  motivo
}: NuevaSolicitud): string[] => {
  const errores: string[] = [];

  if (!validarNombre(nombreEstudiante)) {
    errores.push('El nombre debe tener al menos 3 caracteres.');
  }
  if (!validarCodigo(codigoEstudiante)) {
    errores.push('El codigo de estudiante no tiene un formato valido.');
  }
  if (!validarMotivo(motivo)) {
    errores.push(`El motivo debe tener al menos ${LONGITUD_MINIMA_MOTIVO} caracteres.`);
  }

  return errores;
};

export const esSolicitudValida = (solicitud: NuevaSolicitud): boolean =>
  validarSolicitud(solicitud).length === 0;
