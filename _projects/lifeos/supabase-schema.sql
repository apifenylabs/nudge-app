-- LifeOS Daily Tracker — Supabase Schema
-- Run this in your Supabase project SQL editor
-- Created: 2026-05-23

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_entries
-- Stores one row per day per user
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lifeos_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT DEFAULT 'anonymous',
  date TEXT NOT NULL,          -- ISO date string e.g. "2026-05-23"
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Index for fast date-range queries
CREATE INDEX IF NOT EXISTS idx_lifeos_entries_user_date
  ON lifeos_entries (user_id, date DESC);

-- Index for JSONB queries on categories
CREATE INDEX IF NOT EXISTS idx_lifeos_entries_data
  ON lifeos_entries USING GIN (data);

-- Auto-update updated_at on row modification
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

-- ────────────────────────────────────────────────────────────
-- TABLE: lifeos_categories (optional metadata)
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
-- RLS (Row-Level Security) — optional, enable when auth is added
-- ────────────────────────────────────────────────────────────
ALTER TABLE lifeos_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifeos_categories ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read/write for now (fine for personal app)
CREATE POLICY "Allow anonymous all on lifeos_entries"
  ON lifeos_entries FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous select on lifeos_categories"
  ON lifeos_categories FOR SELECT
  USING (true);
