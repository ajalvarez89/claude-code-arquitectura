import { describe, expect, it } from "vitest";
import { crearReserva } from "../src/application/crear-reserva.ts";
import { cancelarReserva } from "../src/application/cancelar-reserva.ts";
import { ReservasEnMemoria } from "../src/infra/db/reservas-en-memoria.ts";

const franja = (h1: number, h2: number) => ({
  inicio: new Date(`2026-11-02T${String(h1).padStart(2, "0")}:00:00Z`),
  fin: new Date(`2026-11-02T${String(h2).padStart(2, "0")}:00:00Z`),
});

describe("crear reserva", () => {
  it("crea una reserva confirmada", async () => {
    const r = await crearReserva(new ReservasEnMemoria(), { cliente: "Ana", personas: 4, franja: franja(19, 21) });
    expect(r.estado).toBe("confirmada");
  });

  it("rechaza más personas que el aforo por reserva", async () => {
    await expect(
      crearReserva(new ReservasEnMemoria(), { cliente: "Ana", personas: 9, franja: franja(19, 21) }),
    ).rejects.toThrow("entre 1 y 8");
  });

  it("rechaza franjas que se solapan", async () => {
    const repo = new ReservasEnMemoria();
    await crearReserva(repo, { cliente: "Ana", personas: 2, franja: franja(19, 21) });
    await expect(crearReserva(repo, { cliente: "Luis", personas: 2, franja: franja(20, 22) })).rejects.toThrow("franja");
  });

  it("permite reservar una franja que quedó libre por cancelación", async () => {
    const repo = new ReservasEnMemoria();
    const r = await crearReserva(repo, { cliente: "Ana", personas: 2, franja: franja(19, 21) });
    await cancelarReserva(repo, r.id);
    const otra = await crearReserva(repo, { cliente: "Luis", personas: 2, franja: franja(19, 21) });
    expect(otra.estado).toBe("confirmada");
  });
});
