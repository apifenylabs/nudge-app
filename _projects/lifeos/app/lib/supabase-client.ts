import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when both env vars are set — otherwise we fall back to localStorage only. */
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseConfigured) return null;
  if (!_client) {
    _client = createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return _client;
}
