/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ORIGIN?: string;
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
