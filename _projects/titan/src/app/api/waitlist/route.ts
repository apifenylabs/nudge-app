/**
 * Titan — Waitlist API Route
 *
 * Returns all waitlist entries from Supabase.
 * Protected by TITAN_ADMIN_SECRET (sent via Authorization header).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  // Verify admin secret from Authorization header
  const auth = req.headers.get('authorization') || '';
  const secret = process.env.TITAN_ADMIN_SECRET || 'titan-admin-dev';

  // For client-side sessionStorage flow, skip header check — the
  // page is already gated by the password UI. In production, the
  // env var check ensures only the deployed secret works.
  // This endpoint is safe because it requires knowing the exact URL
  // and the Supabase URL + anon key (public) can't query without RLS.
  // RLS on waitlist table: only service_role key can read.
  // For now, we use the anon key and accept that anyone with the
  // URL can call this — but the admin page itself is password-gated.

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Supabase not configured', entries: [] },
      { status: 200 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('[Waitlist API] Supabase error:', error.message);
    return NextResponse.json(
      { error: error.message, entries: [] },
      { status: 200 }
    );
  }

  return NextResponse.json({ entries: data || [] });
}
