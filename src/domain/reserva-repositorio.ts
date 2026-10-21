// Puerto: el dominio define QUÉ necesita; la infraestructura decide CÓMO.
import type { Reserva } from "./reserva.ts";

export interface ReservaRepositorio {
  guardar(reserva: Reserva): Promise<void>;
  buscarPorId(id: string): Promise<Reserva | undefined>;
  confirmadasDelDia(fecha: Date): Promise<Reserva[]>;
}
