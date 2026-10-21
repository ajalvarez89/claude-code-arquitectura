# reservas-api — proyecto de ejemplo

Proyecto de demostración del video **"Claude Code sin romper tu arquitectura"** (Ajá Code · @ajaa.code).

Video: https://youtu.be/L9MO7i-zzXM

Muestra un setup de Claude Code para proyectos reales:
- `CLAUDE.md` con comandos, capas y **glosario del dominio**.
- **Reglas de arquitectura medibles** (fitness functions) con dependency-cruiser: `npm run arch:check`.
- **Hooks** en `.claude/settings.json`:
  - `PreToolUse` → bloquea leer o editar `.env` (también por comandos de terminal) y editar `package-lock.json` y `.git/`.
  - `PostToolUse` → corre el chequeo de arquitectura después de cada edición.
  - `Stop` → si los tests fallan, Claude no puede cerrar y vuelve a trabajar (hasta 3 intentos por sesión).
- Un **subagente** `investigador` en `.claude/agents/`.

## Probarlo
```bash
npm install
npm test
npm run arch:check
claude   # abre Claude Code en esta carpeta
```
Los hooks usan Node (no requieren jq). Probado con Node 22.
