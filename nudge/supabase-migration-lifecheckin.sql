-- Migration: Add daily_checkins table for the LifeOS-style Daily Check-in feature
-- This stores per-user, per-date daily life tracking data

CREATE TABLE IF NOT EXISTS public.daily_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique constraint: one check-in per user per day
CREATE UNIQUE INDEX IF NOT EXISTS daily_checkins_user_date_idx
  ON public.daily_checkins (user_id, date);

-- Index for fast lookups by user (sorted by date)
CREATE INDEX IF NOT EXISTS daily_checkins_user_id_idx
  ON public.daily_checkins (user_id, date DESC);

-- Enable Row Level Security
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;

-- Users can only see their own check-ins
CREATE POLICY "Users can view their own check-ins"
  ON public.daily_checkins
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own check-ins (upsert)
CREATE POLICY "Users can insert their own check-ins"
  ON public.daily_checkins
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own check-ins
CREATE POLICY "Users can update their own check-ins"
  ON public.daily_checkins
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own check-ins
CREATE POLICY "Users can delete their own check-ins"
  ON public.daily_checkins
  FOR DELETE
  USING (auth.uid() = user_id);
