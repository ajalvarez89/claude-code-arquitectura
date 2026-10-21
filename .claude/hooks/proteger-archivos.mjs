// PreToolUse: bloquea leer o editar archivos sensibles. exit 2 = la acción no se ejecuta.
// Cubre Read/Edit/Write (por ruta) y Bash (por el comando: cat .env, echo >> .env, etc.).
import { leerEntrada } from "./leer-entrada.mjs";

const entrada = await leerEntrada();
const herramienta = entrada?.tool_name ?? "";
const input = entrada?.tool_input ?? {};

function bloquear(motivo) {
  console.error(`Bloqueado: ${motivo}. Usa .env.example para variables nuevas.`);
  process.exit(2);
}

if (herramienta === "Bash") {
  const cmd = String(input.command ?? "");
  // .env o .env.local, .env.production... pero no .env.example
  if (/(^|[\s"'=\/<>|;&])\.env(\.(?!example)[\w-]+)?(?=$|[\s"';|&>)])/.test(cmd)) bloquear("el comando toca un archivo .env");
  if (/(^|[\s"'\/])\.git\//.test(cmd) && /(>|rm |mv |sed -i)/.test(cmd)) bloquear("el comando modifica .git/");
  process.exit(0);
}

const ruta = String(input.file_path ?? "").replaceAll("\\", "/");
const nombre = ruta.split("/").pop();
if (/^\.env(\..+)?$/.test(nombre) && nombre !== ".env.example") bloquear(`${ruta} está protegido`);
if (herramienta !== "Read" && (nombre === "package-lock.json" || ruta.includes(".git/"))) bloquear(`${ruta} está protegido`);
process.exit(0);
