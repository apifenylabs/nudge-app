-- ============================================================
-- Titan — Progression Schema (002)
-- Tracks user rank, XP, abilities, and tutorial state.
-- Applied after base waitlist schema (001).
-- ============================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT DEFAULT '',
  avatar_url    TEXT DEFAULT '',

  -- Progression
  current_rank  TEXT NOT NULL DEFAULT 'E' CHECK (current_rank IN ('E','D','C','B','A','S')),
  total_xp      INTEGER NOT NULL DEFAULT 0,
  tier          TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free','starter','pro','enterprise')),

  -- Tutorial state
  tutorial_seen      BOOLEAN NOT NULL DEFAULT false,
  tutorial_completed_at TIMESTAMPTZ,

  -- Agent stats
  agents_created     INTEGER NOT NULL DEFAULT 0,
  agents_deployed    INTEGER NOT NULL DEFAULT 0,
  sandbox_sessions   INTEGER NOT NULL DEFAULT 0,

  -- Unlocked abilities (comma-separated slugs)
  unlocked_abilities TEXT[] NOT NULL DEFAULT '{}',

  -- Milestone flags
  first_agent_created   BOOLEAN NOT NULL DEFAULT false,
  first_deploy          BOOLEAN NOT NULL DEFAULT false,
  completed_tutorial    BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- XP history log (for audit and rollbacks)
CREATE TABLE IF NOT EXISTS public.xp_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL,
  reason      TEXT NOT NULL,       -- e.g. 'agent_created', 'deploy', 'tutorial_completed', 'daily_login'
  metadata    JSONB DEFAULT '{}',  -- e.g. { "agent_id": "...", "rank_at_time": "E" }
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_xp_events_profile ON public.xp_events(profile_id, created_at DESC);

-- Rank thresholds (server-side source of truth)
CREATE TABLE IF NOT EXISTS public.rank_thresholds (
  rank       TEXT PRIMARY KEY CHECK (rank IN ('E','D','C','B','A','S')),
  xp_required INTEGER NOT NULL,
  title      TEXT NOT NULL,
  abilities  TEXT[] NOT NULL DEFAULT '{}'
);

-- Seed rank thresholds
INSERT INTO public.rank_thresholds (rank, xp_required, title, abilities) VALUES
  ('E', 0,    'Novice',     ARRAY['basic-prompting', 'single-agent-slot', 'text-only']),
  ('D', 100,  'Recruit',    ARRAY['tool-integration', 'web-search', 'file-handling', 'basic-memory']),
  ('C', 350,  'Veteran',    ARRAY['advanced-memory', 'custom-knowledge-bases', '3-agent-slots', 'skill-specialization']),
  ('B', 850,  'Hunter',     ARRAY['multi-agent-orchestration', 'parallel-execution', '5-agent-slots', 'api-webhook-access', 'custom-skill-trees']),
  ('A', 1850, 'Elite',      ARRAY['tool-synthesis-planning', 'custom-training-pipelines', 'unlimited-agent-variants', 'private-deployment', 'real-time-strategy']),
  ('S', 3850, 'Sovereign',  ARRAY['autonomous-agent-army', 'unlimited-orchestration', 'self-improving-pipelines', 'full-api-sovereignty', 'priority-infrastructure', 'god-tier-support'])
ON CONFLICT (rank) DO NOTHING;

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- RLS: users can only read/write their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "xp_events_select_own" ON public.xp_events
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "xp_events_insert_own" ON public.xp_events
  FOR INSERT WITH CHECK (auth.uid() = profile_id);
