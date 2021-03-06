// nos variable du .env
interface ImportMetaEnv {
  readonly VITE_URL_SUPABASE: string;
  readonly VITE_TOKEN_PUBLIC_SUPABASE: string;
  readonly VITE_SECRET: string;
  readonly VITE_URL: string;
  readonly VITE_URL_SUPABASE_AVATAR: string;
}

// ajoute notre interface qui contiendra nos variable dans le meta de import
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
