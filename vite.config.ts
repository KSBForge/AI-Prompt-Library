import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Freebuff runs the dev server in a managed workspace: bind to 0.0.0.0 and
// honor the injected PORT. HMR stays disabled per Freebuff requirements.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    hmr: false,
  },
});
