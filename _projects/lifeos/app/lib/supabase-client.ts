/**
 * LifeOS — Supabase Client
 *
 * Provides a thin wrapper around @supabase/supabase-js.
 * Falls back gracefully when env vars aren't configured.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export function isSupabaseConfigured(): boolean {
  return !!supabase;
}

export function getClient() {
  return supabase;
}

export default supabase;
