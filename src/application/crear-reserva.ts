// Caso de uso: crear una reserva sin solapes en la misma franja.
import { randomUUID } from "node:crypto";
import { ReglaDeNegocioError, seSolapan, validarReserva, type Franja, type Reserva } from "../domain/reserva.ts";
import type { ReservaRepositorio } from "../domain/reserva-repositorio.ts";

export interface CrearReservaInput {
  cliente: string;
  personas: number;
  franja: Franja;
}

export async function crearReserva(repo: ReservaRepositorio, input: CrearReservaInput): Promise<Reserva> {
  validarReserva(input.personas, input.franja);

  const delDia = await repo.confirmadasDelDia(input.franja.inicio);
  if (delDia.some((r) => seSolapan(r.franja, input.franja))) {
    throw new ReglaDeNegocioError("Ya hay una reserva confirmada en esa franja");
  }

  const reserva: Reserva = { id: randomUUID(), estado: "confirmada", ...input };
  await repo.guardar(reserva);
  return reserva;
}
