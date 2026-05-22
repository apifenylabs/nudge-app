-- Titan Supabase Schema — Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro/sql/new

-- ─── Agents ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'demo',
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '🤖',
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  xp_to_next INT DEFAULT 1000,
  color TEXT DEFAULT '#14B8A6',
  specialty TEXT DEFAULT '',
  mood TEXT DEFAULT 'happy',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Skills ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  skill_md TEXT DEFAULT '',
  certified BOOLEAN DEFAULT false,
  audit_score INT DEFAULT NULL,
  audit_tier TEXT DEFAULT 'uncertified',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Orchestrations (swarm config) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS orchestrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'demo',
  name TEXT NOT NULL,
  agent_ids JSONB DEFAULT '[]'::jsonb,
  connection_map JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Audit Logs ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  auditor_version TEXT DEFAULT 'v1.0',
  scan_results JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Memory Graph ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS memory_graph (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  entity TEXT NOT NULL,
  value JSONB DEFAULT '{}'::jsonb,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- ─── Heartbeats ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS heartbeats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'healthy',
  last_ping TIMESTAMPTZ DEFAULT now(),
  fail_count INT DEFAULT 0
);

-- ─── Seed data (demo agents) ──────────────────────────────────────────
INSERT INTO agents (user_id, name, emoji, level, xp, xp_to_next, color, specialty, mood) VALUES
  ('demo', 'Titan Core', '🌀', 24, 7800, 10000, '#14B8A6', 'Swarm Commander', 'happy'),
  ('demo', 'Travel Guide', '🌍', 12, 3400, 5000, '#14B8A6', 'Destinations', 'happy'),
  ('demo', 'Budget Keeper', '💰', 8, 2100, 4000, '#10B981', 'Finance', 'neutral'),
  ('demo', 'Research Bot', '🔬', 15, 5200, 6000, '#14B8A6', 'Deep Research', 'excited'),
  ('demo', 'Crypto Trader', '🧠', 6, 900, 3000, '#F59E0B', 'Markets', 'focused'),
  ('demo', 'Data Analyst', '📊', 10, 2800, 4500, '#14B8A6', 'Analytics', 'happy')
ON CONFLICT DO NOTHING;

-- ─── RLS (open for demo) ──────────────────────────────────────────────
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE orchestrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_graph ENABLE ROW LEVEL SECURITY;
ALTER TABLE heartbeats ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon key (demo mode)
CREATE POLICY "anon_all_agents" ON agents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_skills" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_orchs" ON orchestrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_audit" ON audit_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_memory" ON memory_graph FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_heartbeats" ON heartbeats FOR ALL USING (true) WITH CHECK (true);
