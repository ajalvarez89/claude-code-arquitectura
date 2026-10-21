// Entidad Reserva y sus reglas de negocio. Sin dependencias externas.

export const AFORO_MAXIMO_POR_RESERVA = 8;

export type EstadoReserva = "confirmada" | "cancelada";

export interface Franja {
  inicio: Date;
  fin: Date;
}

export interface Reserva {
  id: string;
  cliente: string;
  personas: number;
  franja: Franja;
  estado: EstadoReserva;
}

export class ReglaDeNegocioError extends Error {}

export function validarReserva(personas: number, franja: Franja): void {
  if (personas < 1 || personas > AFORO_MAXIMO_POR_RESERVA) {
    throw new ReglaDeNegocioError(`Una reserva admite entre 1 y ${AFORO_MAXIMO_POR_RESERVA} personas`);
  }
  if (franja.fin <= franja.inicio) {
    throw new ReglaDeNegocioError("La franja debe terminar después de empezar");
  }
}

export function seSolapan(a: Franja, b: Franja): boolean {
  return a.inicio < b.fin && b.inicio < a.fin;
}

export function cancelar(reserva: Reserva): Reserva {
  if (reserva.estado === "cancelada") {
    throw new ReglaDeNegocioError("La reserva ya estaba cancelada");
  }
  return { ...reserva, estado: "cancelada" };
}
