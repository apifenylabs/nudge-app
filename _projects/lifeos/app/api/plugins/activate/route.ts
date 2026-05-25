// POST /api/plugins/activate — Activate a plugin by category
// Agent: POST /api/plugins/activate { "category": "travel" }

import { activatePlugin, loadState, saveState } from '../../../lib/plugins';

export async function POST(req: Request) {
  try {
    const { category } = await req.json();
    if (!category) {
      return Response.json({ ok: false, error: 'Missing category' }, { status: 400 });
    }

    const plugin = activatePlugin(category);
    saveState(loadState());

    return Response.json({ ok: true, plugin });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
