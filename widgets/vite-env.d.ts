/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_ASSET_URL: string;
  // ... add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
