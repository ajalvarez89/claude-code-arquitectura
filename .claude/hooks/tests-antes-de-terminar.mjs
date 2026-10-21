// Stop: si los tests fallan, Claude no puede cerrar y vuelve a trabajar.
// Límite de 3 intentos por sesión para no quedar en bucle (Claude Code además corta tras 8 bloqueos seguidos).
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { leerEntrada } from "./leer-entrada.mjs";

const MAX_INTENTOS = 3;
const entrada = await leerEntrada();
const contador = join(tmpdir(), `reservas-stop-${entrada?.session_id ?? "local"}`);
let intentos = 0;
try { intentos = Number(readFileSync(contador, "utf8")) || 0; } catch {}

try {
  execSync("npm test --silent", { cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(), stdio: "pipe" });
  rmSync(contador, { force: true });
  process.exit(0);
} catch (e) {
  if (intentos >= MAX_INTENTOS) { rmSync(contador, { force: true }); process.exit(0); }
  writeFileSync(contador, String(intentos + 1));
  const salida = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim().split("\n").slice(-30).join("\n");
  console.error(`Los tests no pasan, todavía no está listo:\n${salida}`);
  process.exit(2);
}
