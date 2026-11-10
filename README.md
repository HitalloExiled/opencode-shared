# opencode-shared

Shared SolidJS GUI kit for the OpenCode plugin side panels
(`opencode-memory`, `opencode-notes`, `opencode-plans`, `opencode-stats`).

Package: `@hitalloexiled/opencode-shared`, entry `@hitalloexiled/opencode-shared/gui`.

## What lives here

| Module | Exports |
|---|---|
| `gui/scroll` | `createScrollNav`, `ScrollNav`, `scrollStep` |
| `gui/states` | `EmptyState`, `ErrorBanner`, `LoadingRow`, `EndMarker` |
| `gui/chip` | `StatusChip` (`neutral`, `info`, `success`, `warning`, `danger`) |
| `gui/i18n` | `createI18n`, `supportedLocale`, `useLocale`/`useT` factory, `intlTag`, `formatNumber`, `formatDate` |
| `gui/panel` | `registerSidePanel`, `createPanelTab`, `panelText` |
| `gui` | `SHARED_CSS` with every style the components need |

## Rules

- Styles are exported as strings (`SHARED_CSS`); components never import `.css`
  files, because the app loads a single CJS bundle. Classes use the `os-` prefix.
- `solid-js`, `solid-js/web` and `@opencode/plugin` are peer dependencies and
  externals: the consuming plugin shares the app's instances.
- Colors and metrics come from the app tokens (`--v2-*`). No hardcoded palette.

## Build

```bash
npm install --legacy-peer-deps
npm run typecheck
npm test
npm run build     # dist/gui/index.js + dist/gui/index.d.ts
npm run dev       # rebuild on change (for the linked local setup)
```

`dist/` is committed: plugins consume this package through a git dependency, so
an install must not need a build toolchain.

## Consuming it

```json
"dependencies": {
  "@hitalloexiled/opencode-shared": "github:HitalloExiled/opencode-shared#<sha>"
}
```

Local development (opencode-tools `setup.sh` does this):

```bash
# in this repo
npm link
# in each plugin
npm link @hitalloexiled/opencode-shared
```

Then edit `src/`, run `npm run build` (or `npm run dev`), and rebuild the
plugin's GUI (`npm run gui:build`).
