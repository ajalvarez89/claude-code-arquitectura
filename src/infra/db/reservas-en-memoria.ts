// Adaptador de infraestructura. En producción sería Postgres; para la demo, memoria.
import type { Reserva } from "../../domain/reserva.ts";
import type { ReservaRepositorio } from "../../domain/reserva-repositorio.ts";

export class ReservasEnMemoria implements ReservaRepositorio {
  private reservas = new Map<string, Reserva>();

  async guardar(reserva: Reserva): Promise<void> {
    this.reservas.set(reserva.id, reserva);
  }

  async buscarPorId(id: string): Promise<Reserva | undefined> {
    return this.reservas.get(id);
  }

  async confirmadasDelDia(fecha: Date): Promise<Reserva[]> {
    const dia = fecha.toISOString().slice(0, 10);
    return [...this.reservas.values()].filter(
      (r) => r.estado === "confirmada" && r.franja.inicio.toISOString().slice(0, 10) === dia,
    );
  }
}
