// PostToolUse: después de cada edición corre las reglas de arquitectura (fitness functions).
// Si se rompe una regla, exit 2 y el detalle le llega a Claude para que lo corrija.
import { execSync } from "node:child_process";
import { leerEntrada } from "./leer-entrada.mjs";

const entrada = await leerEntrada();
const ruta = String(entrada?.tool_input?.file_path ?? "");
if (!/\.(ts|tsx|js|mjs|cjs)$/.test(ruta)) process.exit(0);

try {
  execSync("npm run -s arch:check", { cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(), stdio: "pipe" });
  process.exit(0);
} catch (e) {
  const salida = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim();
  console.error(`Regla de arquitectura rota tras editar ${ruta}:\n${salida}\nCorrígelo respetando las capas de CLAUDE.md.`);
  process.exit(2);
}
