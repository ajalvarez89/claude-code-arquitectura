// Lee el JSON que Claude Code envía al hook por stdin.
export async function leerEntrada() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  try { return JSON.parse(raw || "{}"); } catch { return {}; }
}
