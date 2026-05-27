import { NextResponse } from 'next/server';
import { PLUGINS } from '../../lib/plugin-registry';

/**
 * GET /api/plugins — Returns all plugin definitions for the frontend.
 *
 * Strips system prompts from the response to keep payload lean.
 * Frontend loads plugin metadata, phases, and feature lists.
 */
export async function GET() {
  // Strip system prompts to keep response lean — they're large strings
  const plugins = PLUGINS.map(({ systemPrompt, ...rest }) => rest);
  return NextResponse.json({ plugins });
}
