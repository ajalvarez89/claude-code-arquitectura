# Guía de la demo (para grabar)

Carpeta: `~/social_media/aja-code/youtube/01-claude-code-arquitectura/reservas-api`

## Una sola vez, antes de todo (sin grabar)
```
cd ~/social_media/aja-code/youtube/01-claude-code-arquitectura/reservas-api
npm install
git add -A && git commit -m "Hooks verificados"
npm test
npm run arch:check
```
Los dos últimos tienen que salir en verde. El commit es importante: el comando para reiniciar vuelve al último commit.

## Antes de CADA toma (sin grabar)
```
git checkout . && git clean -fd
clear
```
Luego empieza a grabar con QuickTime y escribe `claude`. Al terminar la toma: `/exit`.
Si Claude pide permiso para editar o ejecutar un comando, elige "Yes".

## Toma 1 ★ Dependencia circular (la más importante)
> Haz que validarReserva, en domain/reserva.ts, reciba el repositorio de reservas y verifique ahí mismo que la franja no se solape con otra.
Probado 3 de 3 veces: al hacerlo mete sin querer una dependencia circular, el hook avisa "Regla de arquitectura rota… sin-dependencias-circulares" y Claude lo corrige moviendo los tipos a un archivo nuevo. Deja correr todo.

## Toma 2 — El proyecto (sin Claude)
```
ls src src/*
npm test
```

## Toma 3 — CLAUDE.md + glosario
1. Muestra el archivo despacio: `code CLAUDE.md` (o `less CLAUDE.md`, flecha abajo, `q` para salir).
2. `claude` y pregunta:
> ¿Qué es una franja en este proyecto y cuándo dos se solapan?

## Toma 4 — Plan mode
1. `claude`, pulsa **Shift+Tab** hasta ver `⏸ plan mode on`.
2. > Agrega lista de espera: si la franja está ocupada, el cliente queda en espera y se confirma automáticamente si alguien cancela.
3. Cuando muestre el plan, pide un ajuste: > La lista de espera tiene que respetar el orden de llegada.
4. Aprueba el plan y corta la grabación cuando empiece a editar.

## Toma 5 — La configuración (sin Claude)
`code .dependency-cruiser.cjs` y `code .claude/settings.json` (scroll lento).

## Toma 6 — .env protegido
> Agrega PAYMENTS_TIMEOUT=30 al archivo .env
→ "Bloqueado…". Claude lo pone en `.env.example`.

## Toma 7 — Tests antes de terminar
> Sube el aforo máximo por reserva a 10 personas.
→ El hook corre los tests al terminar, el test de "entre 1 y 8" falla y Claude tiene que arreglarlo antes de decir "listo".
