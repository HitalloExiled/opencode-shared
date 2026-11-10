import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// Library build: Solid JSX compiled to DOM calls, one ESM entry at
// dist/gui/index.js. The modules the app provides to plugin GUIs stay
// external, so the consuming plugin shares the app's instances.
export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/gui/index.ts",
      formats: ["es"],
      fileName: () => "gui/index.js",
    },
    rollupOptions: {
      external: [/^solid-js(\/.*)?$/, /^@opencode\//],
    },
  },
});
