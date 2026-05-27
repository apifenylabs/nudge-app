-- LifeOS — Supabase Schema v2 (Plugin Architecture)
-- Run this in your Supabase project SQL editor

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_entries (Daily Tracker)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT DEFAULT 'anonymous',
  date TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_lifeos_entries_user_date
  ON lifeos_entries (user_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_lifeos_entries_data
  ON lifeos_entries USING GIN (data);

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_chats (Conversation Sessions)
-- Now includes plugin_id and current_phase for v2 plugin system
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT DEFAULT 'anonymous',
  title TEXT NOT NULL DEFAULT 'New Conversation',
  mode TEXT NOT NULL DEFAULT 'life',
  -- v2 Plugin fields
  plugin_id TEXT,              -- e.g. 'travel', 'finance', 'health'
  current_phase TEXT,          -- e.g. 'discover', 'assess', 'plan'
  is_active BOOLEAN NOT NULL DEFAULT true,
  message_count INTEGER NOT NULL DEFAULT 0,
  canvas_sections JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lifeos_chats_user
  ON lifeos_chats (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_lifeos_chats_plugin
  ON lifeos_chats (plugin_id);

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_messages (Individual Messages in a Chat)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES lifeos_chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  token_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lifeos_messages_chat
  ON lifeos_messages (chat_id, created_at ASC);

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_plugin_sessions (PRD §10.2)
-- Per-plugin conversation state, canvas, and personality data
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_plugin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES lifeos_chats(id) ON DELETE CASCADE,
  user_id TEXT DEFAULT 'anonymous',
  plugin_id TEXT NOT NULL,       -- 'travel', 'finance', etc.
  current_phase TEXT NOT NULL,
  phase_state JSONB DEFAULT '{}',  -- Per-phase conversation state
  canvas_state JSONB DEFAULT '[]',  -- Canvas items for this plugin
  personality_events JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lifeos_plugin_sessions_plugin
  ON lifeos_plugin_sessions (user_id, plugin_id);

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_categories (metadata for plugin categories)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT DEFAULT '📊',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO lifeos_categories (slug, name, description, emoji, sort_order) VALUES
  ('health', 'Health', 'Physical well-being, exercise, sleep', '💪', 1),
  ('productivity', 'Productivity', 'Work output, focus, task completion', '⚡', 2),
  ('social', 'Social', 'Social connections, relationships, family', '👥', 3),
  ('mindfulness', 'Mindfulness', 'Meditation, reflection, gratitude', '🧘', 4),
  ('work', 'Work Quality', 'Work quality, creativity, Deep Work', '💼', 5),
  ('learning', 'Learning', 'Learning, reading, skill development', '📚', 6),
  ('energy', 'Energy', 'Energy levels, motivation, mood', '🔋', 7),
  ('finance', 'Finance', 'Financial health, spending, saving', '💰', 8),
  ('growth', 'Personal Growth', 'Growth mindset, goals, habits', '🌱', 9)
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- TRIGGERS: Auto-update updated_at
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_lifeos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lifeos_entries_updated_at ON lifeos_entries;
CREATE TRIGGER trg_lifeos_entries_updated_at
  BEFORE UPDATE ON lifeos_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_lifeos_updated_at();

DROP TRIGGER IF EXISTS trg_lifeos_chats_updated_at ON lifeos_chats;
CREATE TRIGGER trg_lifeos_chats_updated_at
  BEFORE UPDATE ON lifeos_chats
  FOR EACH ROW
  EXECUTE FUNCTION update_lifeos_updated_at();

DROP TRIGGER IF EXISTS trg_lifeos_plugin_sessions_updated_at ON lifeos_plugin_sessions;
CREATE TRIGGER trg_lifeos_plugin_sessions_updated_at
  BEFORE UPDATE ON lifeos_plugin_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_lifeos_updated_at();

-- ────────────────────────────────────────────────────────────
-- FUNCTION: increment_chat_message_count (atomic)
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_chat_message_count(chat_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE lifeos_chats
  SET message_count = message_count + 1, updated_at = now()
  WHERE id = chat_id;
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────
-- RLS (Row-Level Security) — anonymous access for MVP
-- ────────────────────────────────────────────────────────────
ALTER TABLE lifeos_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_plugin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous all on lifeos_entries"
  ON lifeos_entries FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous all on lifeos_chats"
  ON lifeos_chats FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous all on lifeos_messages"
  ON lifeos_messages FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous all on lifeos_plugin_sessions"
  ON lifeos_plugin_sessions FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous select on lifeos_categories"
  ON lifeos_categories FOR SELECT
  USING (true);
