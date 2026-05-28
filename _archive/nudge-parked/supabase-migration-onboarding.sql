-- Migration: Onboarding Enhancements Phase 12
-- Adds family_invite_codes table for shareable invite links

-- Create invite codes table
CREATE TABLE IF NOT EXISTS public.family_invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 12),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  max_uses INTEGER DEFAULT 0,
  use_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for lookups
CREATE INDEX IF NOT EXISTS idx_family_invite_codes_code ON public.family_invite_codes(code);
CREATE INDEX IF NOT EXISTS idx_family_invite_codes_family ON public.family_invite_codes(family_id);

-- Enable RLS
ALTER TABLE public.family_invite_codes ENABLE ROW LEVEL SECURITY;

-- RLS: anyone can read by code (for join flow)
CREATE POLICY "Anyone can read invite by code"
  ON public.family_invite_codes
  FOR SELECT
  USING (true);

-- RLS: family owners can insert
CREATE POLICY "Family owners can create invites"
  ON public.family_invite_codes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.family_members
      WHERE family_id = family_invite_codes.family_id
        AND user_id = (SELECT id FROM public.users WHERE auth_uid = auth.uid())
        AND role = 'owner'
    )
  );

-- RLS: family owners can manage invites
CREATE POLICY "Family owners can manage invites"
  ON public.family_invite_codes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.family_members
      WHERE family_id = family_invite_codes.family_id
        AND user_id = (SELECT id FROM public.users WHERE auth_uid = auth.uid())
        AND role = 'owner'
    )
  );
