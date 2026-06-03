/**
 * GET /api/plugins/manifest — Returns the full plugin manifest object.
 *
 * Serves the same data that the static /plugin-manifest.json provides,
 * but via the API so the client can fetch it programmatically.
 * When Supabase is configured, can be extended to include user-specific
 * plugin states or preferences.
 */

import { NextResponse } from 'next/server';
import { buildManifest } from '@/app/lib/plugin-manifest-schema';

export const revalidate = 300; // Cache for 5 minutes (ISR)

export async function GET() {
  try {
    const manifest = buildManifest();

    return NextResponse.json(manifest, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('Failed to build plugin manifest:', err);
    return NextResponse.json(
      { error: 'Failed to generate manifest' },
      { status: 500 }
    );
  }
}
