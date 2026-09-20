/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional endpoint that receives reservations via POST. Falls back to a local simulation. */
  readonly VITE_RESERVATION_API_URL?: string;
  /** Optional LLM/workflow endpoint for the concierge. Falls back to the built-in concierge engine. */
  readonly VITE_CONCIERGE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
