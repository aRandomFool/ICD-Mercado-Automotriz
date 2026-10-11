# Journal 004 — Handoff roto por el mensaje `idle` de OpenCode 2.0.26 (parche local)

- **Fecha:** 2026-10-11
- **Proyecto:** Mercado Automotriz de La Habana (`D:\Dany\ProyectoCD`)
- **Sesión:** `ses_f3a69397dffeGusRm7zPXMha76`

## Síntoma

Tras actualizar OpenCode a **2.0.26**, el handoff volvió a fallar con:

```
handoff stopped: the transfer data did not serialize
```

Era **intermitente**: funcionó a las 06:59 y dejó de funcionar minutos después. El
mensaje de la herramienta corresponde, según `receipt.ts`, a un `RenderFailed` con
razón **`encode`** (no `stash`/`create`/`deliver`).

## Causa raíz

El `Stash` del plugin `@hadronomy/opencode-handoff-plugin` v0.7.0 incluye
`messages: Array<SessionMessage.Info>`. El plugin trae su propio
`@opencode-ai/schema@0.0.0-beta-19271`, cuyo *union* `SessionMessage.Info` **no
conoce el tipo `idle`** que **OpenCode 2.0.26 comenzó a emitir** (mensaje de ciclo de
vida con claves `id`, `time`, `type`, `outcome`). Al codificar el `Stash` falla:

```
SchemaError: Expected Session.Message.Info
  at ["messages"][4]
```

El `idle` aparece en el contexto capturado cuando la sesión pasa a inactiva; de ahí
la intermitencia (antes de ese mensaje el handoff serializaba; después, no).

## Diagnóstico (cómo se encontró)

Parche temporal de `render.ts` (caché del plugin) para registrar el `Cause` real
antes del `orStageFailure` que lo enmascara:

```ts
Schema.encodeEffect(Stash)({...}).pipe(
  Effect.tapCause((cause) => Effect.logError("HANDOFF_STASH_ERR " + Cause.pretty(cause))),
)
```

El log reveló `at ["messages"][4]` y el volcado mostró:

```
HANDOFF_OVERVIEW 0:compaction 1:assistant 2:assistant 3:assistant 4:idle 5:user ...
HANDOFF_M4 {"type":"idle","keys":["id","time","type","outcome"],...}
```

## Corrección aplicada (parche local)

En `render.ts` del plugin (caché
`~/.cache/opencode/npm/@hadronomy/opencode-handoff-plugin@latest/1791701785360/...`),
antes de construir el `Stash`/`Envelope`, se filtran los marcadores desconocidos:

```ts
;(captured as any).messages = (captured.messages as unknown as any[]).filter(
  (m) => m?.type !== "idle",
)
```

El `render.ts` original está respaldado en
`~/.config/opencode/backup_2026-10-11/plugin-cache-handoff-new/...` y solo se le
añadió ese filtro (los parches de diagnóstico se revirtieron). Reinicio del servicio
para recargar el plugin.

## Verificación

```json
{"kind":"fork-local","key":"handoff/ses_f3a69397dffeGusRm7zPXMha76",
 "nextSessionID":"ses_ed62e5417ffeZWZhgQzACb4s5L","messages":32}
```

La sesión destino se creó y **arrancó** (`start: true`), versión 2.0.26, y se
renombró a **"Reorganizando el proyecto"**. El brief quedó entregado.

## Advertencias / seguimiento

- **El parche es local y frágil:** se pierde si se borra/actualiza el caché del
  plugin. La solución correcta es **upstream**: subir la dependencia
  `@opencode-ai/schema` del plugin (repo `github.com/hadronomy/skills`, carpeta
  `plugins/handoff`) a una versión que incluya el mensaje `idle`. Conviene **abrir un
  issue** reportándolo.
- Alternativa provisional si el parche se pierde: volver a aplicar el filtro, o
  refrescar el plugin cuando publique una versión compatible.

## Referencias

- `~/.cache/opencode/npm/@hadronomy/opencode-handoff-plugin@latest/1791701785360/node_modules/@hadronomy/opencode-handoff-plugin/src/{render,rpc,capture,receipt}.ts`
- `~/.local/share/opencode/log/opencode.log` (evidencia `HANDOFF_STASH_ERR` / `messages[4]`)
- `~/.config/opencode/backup_2026-10-11/plugin-cache-handoff-new/` (render.ts original)
- `opencode/journals/003_2026-10-11_fix_handoff_opencode_2.0.26.md` (actualización previa)
