import { cancelar, ReglaDeNegocioError, type Reserva } from "../domain/reserva.ts";
import type { ReservaRepositorio } from "../domain/reserva-repositorio.ts";

export async function cancelarReserva(repo: ReservaRepositorio, id: string): Promise<Reserva> {
  const reserva = await repo.buscarPorId(id);
  if (!reserva) throw new ReglaDeNegocioError("La reserva no existe");
  const cancelada = cancelar(reserva);
  await repo.guardar(cancelada);
  return cancelada;
}
