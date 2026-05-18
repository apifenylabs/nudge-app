-- ═══════════════════════════════════════════════════════
-- APIFENY.AI — Database Schema
-- Supabase SQL Migration
-- ═══════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TOOLS TABLE ───
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  website_url TEXT,
  logo_url TEXT,
  category TEXT,
  subcategories TEXT[],
  pricing_tier TEXT CHECK (pricing_tier IN ('Free', 'Freemium', 'Paid', 'Enterprise', 'Open Source')),
  pricing_min_usd NUMERIC,
  pricing_max_usd NUMERIC,
  use_cases TEXT[],
  agent_roles TEXT[],
  is_agentic BOOLEAN DEFAULT FALSE,
  is_multimodal BOOLEAN DEFAULT FALSE,
  has_api BOOLEAN DEFAULT FALSE,
  platform TEXT[],

  -- Asia-specific enrichment
  asia_score INTEGER DEFAULT 0 CHECK (asia_score >= 0 AND asia_score <= 10),
  asia_ready BOOLEAN DEFAULT FALSE,
  supports_languages TEXT[],
  data_residency TEXT,
  local_pricing_asia BOOLEAN DEFAULT FALSE,
  best_for_asia_use_case TEXT,

  -- Rankings & engagement
  avg_rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  trending_score INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,

  -- Playbook
  how_to_use_guide TEXT,
  playbook_use_cases TEXT[],
  playbook_steps JSONB,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'manual'
);

-- ─── REVIEWS TABLE ───
CREATE TABLE tool_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── USER SAVES TABLE ───
CREATE TABLE tool_saves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tool_id)
);

-- ─── INDEXES ───
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_pricing_tier ON tools(pricing_tier);
CREATE INDEX idx_tools_asia_ready ON tools(asia_ready);
CREATE INDEX idx_tools_is_agentic ON tools(is_agentic);
CREATE INDEX idx_tools_trending ON tools(trending_score DESC);
CREATE INDEX idx_tools_avg_rating ON tools(avg_rating DESC);
CREATE INDEX idx_tools_slug ON tools(slug);

-- ─── AUTO-UPDATE updated_at ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
