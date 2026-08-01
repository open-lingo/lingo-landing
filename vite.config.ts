import path from "path";
// From `vitest/config`, not `vite` — Vitest 4 no longer augments Vite's
// UserConfig type, so `defineConfig` from `vite` rejects the `test` key.
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Origins are pinned here rather than read from `.env`, which is
    // gitignored — tests must produce the same URLs on a fresh clone and in CI.
    env: {
      VITE_APP_ORIGIN: "http://localhost:5173",
      VITE_SITE_ORIGIN: "http://localhost:5175",
    },
  },
});
