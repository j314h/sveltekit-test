import { createClient } from '@supabase/supabase-js'

// config supabase
const supabaseUrl = import.meta.env.VITE_URL_SUPABASE
const supabaseKey = import.meta.env.VITE_TOKEN_PUBLIC_SUPABASE

// instance supabase
export const supabase = createClient(supabaseUrl, supabaseKey)