// GET /api/state — Full LifeOS state (for dashboard sync)
// POST /api/state — Replace state (agent bulk sync)

import { loadState, saveState } from '../../lib/plugins';

export async function GET() {
  const state = loadState();
  return Response.json({ state, ok: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body && body.plugins) {
      saveState(body);
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
