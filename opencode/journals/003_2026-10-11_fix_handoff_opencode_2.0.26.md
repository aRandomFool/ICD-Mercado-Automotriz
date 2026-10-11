# Journal 003 — Corrección del fallo de handoff (OpenCode 2.0.6 → 2.0.26)

- **Fecha:** 2026-10-11
- **Proyecto:** Mercado Automotriz de La Habana (`D:\Dany\ProyectoCD`)
- **Sesión:** `ses_f3a69397dffeGusRm7zPXMha76`

## Síntoma

Al intentar transferir la sesión, OpenCode mostraba `handoff stopped: the transfer
data did not serialize`. En el log del servicio aparecía:

```
command=handoff error=RenderFailed   (HTTP 500)
```

y cada intento caía antes a transcripción porque el *condense* del brief no está
disponible en el free tier:

```
WARN "handoff: the brief fell back to the transcript"
     cause="Generate.UnavailableError: OpenCode's free tier can only be used from within OpenCode"
```

Ese WARN es **no fatal** (el plugin usa el transcript como respaldo). El fallo real
era el `ERROR ... RenderFailed`.

## Diagnóstico (causa raíz)

El handoff no lo hace OpenCode nativo, sino el plugin de terceros
**`@hadronomy/opencode-handoff-plugin` v0.7.0** (config global en
`~/.config/opencode/opencode.jsonc`).

En `src/render.ts` del plugin, el render del `Stash` falla con razón `encode`:

```ts
const stash = yield* orStageFailure(
  Schema.encodeEffect(Stash)({ key, sessionID, intent, brief, messages, info }),
  renderFailed("encode"),
)
```

El plugin compila contra **su propio** `@opencode-ai/schema@0.0.0-beta-19271`
(empaquetado en su `node_modules`), mientras el servicio corría **OpenCode 2.0.6**.
El desajuste entre la forma de `Session.Info` / `SessionMessage.Info` que entrega el
host y el schema del plugin hacía que la codificación del `Stash` (que incluye los
mensajes de la sesión) fallara. El plugin **no crea sesión nueva** cuando falla
(verificado: la tabla `session_v2` no ganaba forks en los intentos fallidos).

## Solución aplicada (Opción A)

Actualizar OpenCode de **2.0.6 → 2.0.26** y recargar el plugin:

1. **Backup** (en `~/.config/opencode/backup_2026-10-11/`): `opencode.jsonc`,
   `cli.json`, `package.json`, los binarios v2.0.6 y v2.0.11, el `.zip` de 2.0.26 y
   el caché npm del plugin.
2. **Descarga** del binario oficial (el `opencode upgrade` no sirve en Windows: el
   método `curl` exige `bash` y `npm`/`vp` no están disponibles). Endpoint de
   actualización real: `https://opencode.ai/update/api/latest`.
   - URL: `https://opencode.ai/files/bin/2.0.26/opencode-windows-x64.zip`
   - SHA-256 verificado: `83562488e23c3f893989d915ef664841bf2745da81b4fa57c5572b72c25456dc` ✅
3. **Reemplazo** de los binarios:
   - `D:\Dany\opencode.exe` (el que corría el servicio → renombrado a
     `opencode-2.0.6.exe.bak`) y `C:\Users\Manu-Dany\.opencode\bin\opencode.exe`.
4. **Borrado del caché** npm del plugin
   (`~/.cache/opencode/npm/@hadronomy/opencode-handoff-plugin@latest/`) para forzar
   su re-resolución al reiniciar.
5. **Reinicio del servicio** (`opencode service restart`, puerto 127.0.0.1:49374).
   El log confirmó `cli starting version=2.0.26`, el plugin recargado desde un caché
   nuevo (`.../1791701785360/...`) y `plugin reconciliation completed ... plugins=12`
   **sin ERROR**.

## Verificación

`handoff_transfer` ejecutado tras la actualización:

```json
{"kind":"fork-local","key":"handoff/ses_f3a69397dffeGusRm7zPXMha76",
 "nextSessionID":"ses_ed63e010bffe5UqxJgDeVbM6lz","messages":34}
```

Ya **no** aparece "the transfer data did not serialize". La sesión destino
`ses_ed63e010bffe5UqxJgDeVbM6lz` quedó creada (total de sesiones pasó de 9 a 10).

## Lecciones / notas de entorno

- En Windows, `opencode upgrade` **no funciona** por defecto (curl→bash, npm ausente).
  Alternativa: descargar el `.zip` desde `https://opencode.ai/files/bin/<versión>/opencode-windows-x64.zip`.
- El repositorio público del V2 es **`github.com/anomalyco/opencode`** (tags `v1.x`),
  pero los binarios se publican por número `2.0.x` en `opencode.ai/files/bin/`.
- El fallo del plugin se debe a un **desajuste de schema** entre el plugin
  (beta-19271) y un host desactualizado; mantener OpenCode al día evita el problema.
- Windows permite **renombrar** un `.exe` en ejecución (pero no sobrescribirlo): útil
  para actualizar el binario del servicio sin detenerlo primero.

## Referencias

- `~/.config/opencode/opencode.jsonc` (lista de plugins)
- `~/.cache/opencode/npm/@hadronomy/opencode-handoff-plugin@latest/.../src/render.ts`, `rpc.ts`, `host.ts` (código del plugin)
- `~/.local/share/opencode/log/opencode.log` (evidencia del fallo y del arranque 2.0.26)
- `~/.local/share/opencode/opencode.db` (`session_v2`: sesión destino creada)
- `opencode/handoffs/002_2026-10-11_fix_handoff_sesion.md` (traspaso a la sesión nueva)
