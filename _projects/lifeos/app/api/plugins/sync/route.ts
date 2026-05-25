// GET /api/plugins/sync — Get full plugin state (for agents)
// POST /api/plugins/sync — Upsert plugin state from agent

import { loadState } from '../../../lib/plugins';

const actionLog: any[] = [];

export async function GET() {
  const state = loadState();
  return Response.json({
    ok: true,
    plugins: state.plugins,
    totalActions: state.totalActions,
    actionLog: actionLog.slice(-50),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, agentId } = body;

    if (action === 'log' && agentId) {
      actionLog.push({
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        pluginId: body.plugin?.id || '',
        category: body.plugin?.category || '',
        action: 'agent_run',
        detail: body.detail || 'Agent action',
        xp: body.xp || 0,
        createdAt: new Date().toISOString(),
        agentId,
      });
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
