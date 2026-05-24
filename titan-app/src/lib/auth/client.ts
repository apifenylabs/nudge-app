/**
 * Titan Auth — Supabase Client
 *
 * Browser-side singleton for authentication operations.
 */

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function createAuthClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
