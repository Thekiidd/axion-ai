import { createClient } from "@supabase/supabase-js";

// Variables de entorno requeridas en .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente público — para uso desde el frontend y Server Components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
