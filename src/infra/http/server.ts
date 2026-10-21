// Servidor HTTP mínimo (sin frameworks) para probar a mano.
import { createServer } from "node:http";
import { crearReserva } from "../../application/crear-reserva.ts";
import { cancelarReserva } from "../../application/cancelar-reserva.ts";
import { ReglaDeNegocioError } from "../../domain/reserva.ts";
import { ReservasEnMemoria } from "../db/reservas-en-memoria.ts";

const repo = new ReservasEnMemoria();

async function leerJson(req: import("node:http").IncomingMessage): Promise<any> {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/reservas") {
      const b = await leerJson(req);
      const reserva = await crearReserva(repo, {
        cliente: b.cliente,
        personas: b.personas,
        franja: { inicio: new Date(b.inicio), fin: new Date(b.fin) },
      });
      res.writeHead(201, { "content-type": "application/json" }).end(JSON.stringify(reserva));
      return;
    }
    const m = req.url?.match(/^\/reservas\/([\w-]+)\/cancelar$/);
    if (req.method === "POST" && m) {
      const reserva = await cancelarReserva(repo, m[1]);
      res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(reserva));
      return;
    }
    res.writeHead(404).end();
  } catch (e) {
    const status = e instanceof ReglaDeNegocioError ? 422 : 500;
    res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify({ error: (e as Error).message }));
  }
});

server.listen(3000, () => console.log("reservas-api en http://localhost:3000"));
