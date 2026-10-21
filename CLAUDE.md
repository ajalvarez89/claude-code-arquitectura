# reservas-api

API de reservas para restaurantes. TypeScript + Node 22, sin framework web.

## Comandos
- Instalar: `npm install`
- Tests: `npm test`
- Chequeo de arquitectura: `npm run arch:check`
- Tipos: `npm run typecheck`
- Levantar en local: `npm run dev` (http://localhost:3000)

## Arquitectura (capas)
- `src/domain/` — entidades y reglas de negocio. **No importa nada de `application/` ni de `infra/`.**
- `src/application/` — casos de uso. Hablan con puertos (interfaces del dominio), nunca con la base de datos directo.
- `src/infra/` — adaptadores: base de datos (`db/`) y HTTP (`http/`).
- Para persistir algo nuevo: define el puerto en `domain/` e impleméntalo en `infra/db/`.

## Glosario del dominio (un término = un significado)
- **Reserva** — un cliente aparta una franja para N personas. Estados: `confirmada`, `cancelada`.
- **Franja** — intervalo `inicio`–`fin` de una reserva. Dos franjas se **solapan** si se cruzan aunque sea un minuto.
- **Aforo por reserva** — máximo de personas en una sola reserva (8). No es el aforo del local.
- **Cancelación** — pasa una reserva a `cancelada`; la franja queda libre. No se borra el registro.
- **Cliente** — quien hace la reserva. No es un usuario con login.

## Reglas
- Antes de dar algo por terminado: `npm test` y `npm run arch:check` en verde.
- No toques `.env` (hay un hook que lo bloquea). Las variables nuevas van en `.env.example`.
- Pregunta antes de agregar dependencias.
- Usa los nombres del glosario en código, tests y mensajes.
