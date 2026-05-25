// POST /api/plugins/:category/tasks/:taskId — Complete a task
// Agent-friendly: POST /api/plugins/travel/tasks/task-travel-research-set-destination-criteria
// Body: { phase: "research" } (optional, auto-detected)

import { completeTask, loadState, saveState, type PluginPhase, type LifeOSPlugin } from '../../../../../lib/plugins';

export async function POST(
  req: Request,
  { params }: { params: { category: string; taskId: string } }
) {
  try {
    const { category, taskId } = params;
    const body = await req.json().catch(() => ({}));
    const phaseName = body.phase as PluginPhase | undefined;

    let phase: PluginPhase | undefined = phaseName;
    if (!phase) {
      const state = loadState();
      const plugin = state.plugins.find((p: any) => p.category === category);
      if (!plugin) {
        return Response.json({ ok: false, error: 'Plugin not found' }, { status: 404 });
      }
      for (const p of plugin.phases) {
        if (p.tasks.some((t: any) => t.id === taskId)) {
          phase = p.phase;
          break;
        }
      }
      if (!phase) {
        return Response.json({ ok: false, error: 'Task not found in any phase' }, { status: 404 });
      }
    }

    const result = completeTask(category as any, phase as PluginPhase, taskId);
    saveState(loadState());

    if (!result) {
      return Response.json({ ok: false, error: 'Task already done or not found' }, { status: 400 });
    }

    return Response.json({ ok: true, plugin: result });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
