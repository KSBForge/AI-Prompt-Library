import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Freebuff runs the dev server in a managed workspace: bind to 0.0.0.0 and
// honor the injected PORT. HMR stays disabled per Freebuff requirements.
//
// allowedHosts: the Freebuff preview proxies the dev server through its
// sandbox hostname (e.g. `5174-<workspace>.e2b.app`), which Vite's host check
// blocks by default. Allowing only the sandbox provider's domains keeps the
// DNS-rebinding protection for everything else. This applies to the dev and
// preview servers only — `vite build` output and production hosting are
// unaffected.
const freebuffPreviewHosts = [".e2b.app", ".e2b.dev"];

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    hmr: false,
    allowedHosts: freebuffPreviewHosts,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: freebuffPreviewHosts,
  },
});
