/**
 * LifeOS Supabase Client
 *
 * Persists plugin state server-side so it syncs across devices.
 * Primary store with localStorage as offline fallback.
 *
 * Tables:
 *   - lifeos_plugins     — full plugin state (JSONB)
 *   - lifeos_actions     — action/XP log
 */

import { supabase } from './supabase-client';
import type { LifeOSPlugin, LifeOSState, PluginPhase } from '@/lib/lifeos/plugins';

const DEFAULT_USER = 'demo';

// ─── LifeOS Plugin CRUD ─────────────────────────────────────────────────

export async function getLifeOSState(): Promise<LifeOSState | null> {
  const { data, error } = await supabase
    .from('lifeos_plugins')
    .select('*')
    .eq('user_id', DEFAULT_USER);

  if (error || !data || data.length === 0) return null;

  const totalActions = data.reduce((sum, p) => sum + (p.total_actions || 0), 0);
  const unlockedCategories = data.map((p) => p.category);

  const plugins: LifeOSPlugin[] = data.map((row) => ({
    id: row.id,
    category: row.category,
    name: row.name,
    emoji: row.emoji || '🧩',
    description: row.description || '',
    color: row.color || '#14B8A6',
    phases: (row.state as any)?.phases || [],
    overallProgress: row.overall_progress || 0,
    lastActiveAt: row.last_active_at || row.created_at,
    createdAt: row.created_at,
  }));

  return { plugins, totalActions, unlockedCategories };
}

export async function upsertPlugin(plugin: LifeOSPlugin): Promise<boolean> {
  const { error } = await supabase.from('lifeos_plugins').upsert(
    {
      id: plugin.id,
      user_id: DEFAULT_USER,
      category: plugin.category,
      name: plugin.name,
      emoji: plugin.emoji,
      description: plugin.description,
      color: plugin.color,
      state: { phases: plugin.phases },
      total_actions: plugin.phases.flatMap((p) => p.tasks.filter((t) => t.done)).length,
      overall_progress: plugin.overallProgress,
      last_active_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  return !error;
}

export async function logAction(
  pluginId: string,
  category: string,
  taskLabel: string,
  phaseName: string,
  xpEarned: number = 10
): Promise<boolean> {
  const { error } = await supabase.from('lifeos_actions').insert({
    user_id: DEFAULT_USER,
    plugin_id: pluginId,
    category,
    action_type: 'complete_task',
    task_label: taskLabel,
    phase_name: phaseName,
    xp_earned: xpEarned,
  });

  return !error;
}

export async function getActionCount(): Promise<number> {
  const { count, error } = await supabase
    .from('lifeos_actions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', DEFAULT_USER);

  if (error) return 0;
  return count || 0;
}

export async function getRecentActions(limit = 20): Promise<
  { task_label: string; category: string; xp_earned: number; created_at: string }[]
> {
  const { data, error } = await supabase
    .from('lifeos_actions')
    .select('task_label, category, xp_earned, created_at')
    .eq('user_id', DEFAULT_USER)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

export async function deletePlugin(pluginId: string): Promise<boolean> {
  const { error } = await supabase
    .from('lifeos_plugins')
    .delete()
    .eq('id', pluginId);

  return !error;
}

export async function syncPluginToServer(plugin: LifeOSPlugin): Promise<void> {
  await upsertPlugin(plugin);
  // Calculate XP for any completed tasks since last sync
  const doneTasks = plugin.phases.flatMap((p) =>
    p.tasks.filter((t) => t.done).map((t) => ({ phase: p.phase, task: t }))
  );
  for (const { phase, task } of doneTasks) {
    await logAction(plugin.id, plugin.category, task.label, phase);
  }
}
