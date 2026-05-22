-- LifeOS Plugin State Schema — run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro/sql/new

-- ─── LifeOS Plugin Store ────────────────────────────────────────────────
-- Persists plugin state server-side so it syncs across devices.
-- Falls back to localStorage when offline.

CREATE TABLE IF NOT EXISTS lifeos_plugins (
  id TEXT PRIMARY KEY,                          -- matches LifeOSPlugin.id
  user_id TEXT NOT NULL DEFAULT 'demo',
  category TEXT NOT NULL,                       -- LifeCategory
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '🧩',
  description TEXT DEFAULT '',
  color TEXT DEFAULT '#14B8A6',
  state JSONB NOT NULL DEFAULT '{}'::jsonb,     -- full plugin state (phases, progress, tasks)
  total_actions INT DEFAULT 0,
  overall_progress INT DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lifeos_plugins_user ON lifeos_plugins(user_id);
CREATE INDEX IF NOT EXISTS idx_lifeos_plugins_category ON lifeos_plugins(category);

-- ─── LifeOS Actions Log ─────────────────────────────────────────────────
-- Every task completion is logged for XP/achievement tracking.

CREATE TABLE IF NOT EXISTS lifeos_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'demo',
  plugin_id TEXT REFERENCES lifeos_plugins(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  action_type TEXT NOT NULL DEFAULT 'complete_task',
  task_label TEXT NOT NULL DEFAULT '',
  phase_name TEXT NOT NULL DEFAULT '',
  xp_earned INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lifeos_actions_user ON lifeos_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_lifeos_actions_plugin ON lifeos_actions(plugin_id);
CREATE INDEX IF NOT EXISTS idx_lifeos_actions_created ON lifeos_actions(created_at);

-- ─── RLS ────────────────────────────────────────────────────────────────
ALTER TABLE lifeos_plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all_lifeos_plugins" ON lifeos_plugins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_lifeos_actions" ON lifeos_actions FOR ALL USING (true) WITH CHECK (true);
