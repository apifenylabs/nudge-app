/**
 * LifeOS — Supabase Client Adapter (titan-app)
 *
 * Wraps the titan-app's Supabase client for LifeOS module use.
 * Falls back gracefully when env vars aren't configured.
 */

import { supabase as titanSupabase } from '@/lib/db/supabase-client';

let configured: boolean | null = null;

export function isSupabaseConfigured(): boolean {
  if (configured !== null) return configured;
  configured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return configured;
}

export function getClient() {
  return titanSupabase;
}

const supabase = titanSupabase;
export default supabase;
