import { createClient } from '@supabase/supabase-js';

// instance supabase
export const supabase = createClient(
  import.meta.env.VITE_URL_SUPABASE,
  import.meta.env.VITE_TOKEN_PUBLIC_SUPABASE
);
