/**
 * Titan — Verify Admin Password API Route
 *
 * Simple shared-secret gate for the waitlist admin panel.
 * Set TITAN_ADMIN_SECRET env var in Vercel for production.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const secret = process.env.TITAN_ADMIN_SECRET || '';

    if (!secret) {
      // Dev: accept a known default so we can test locally
      if (password === 'titan-admin-dev') {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    if (password === secret) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
