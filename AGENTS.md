# AGENTS.md — working on `opencode-shared`

Shared GUI code for the OpenCode plugins. Read `README.md` for the product
surface.

## Hard rules

- **Only UI code that at least two plugins use.** Data access, copy tables,
  domain formatting and chart/gauge SVGs stay in the plugin.
- **No `.css` imports.** Export CSS strings (`SHARED_CSS`) so the plugin bundle
  stays a single CJS file. Prefix every class with `os-`.
- **Only tokens that exist** in `packages/ui/src/styles/tokens/theme.css` of the
  OpenCode app. Status colors use `--v2-state-{fg,bg,border}-*`.
- **Keep `solid-js` and `@opencode/plugin` external** in the build; they are
  the app's instances.
- **`dist/` is committed.** Plugins install this repo as a git dependency and
  must not need a build toolchain.
- **No user-facing strings.** Components take translated props (`label`,
  `title`, `hint`); translation tables live in the plugins.

## Build / test

```bash
npm install --legacy-peer-deps
npm run typecheck
npm test
npm run build
```

## Consuming repos

`opencode-memory`, `opencode-notes`, `opencode-plans` and `opencode-stats`
depend on `opencode-shared` pinned by commit. The parent
`opencode-tools` vendors this repo as the `shared/` submodule and its
`setup.sh` runs `npm link` so the plugins use the working tree.

Three-level commit protocol:

1. Commit + push here (tag when the API changes).
2. Bump the SHA in each affected plugin, commit + push.
3. Bump the `shared/` pointer in `opencode-tools`, commit + push.
