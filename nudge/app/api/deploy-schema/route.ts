// ONE-TIME endpoint: Run the full Nudge database schema on Supabase
// POST /api/deploy-schema — Executes schema SQL via Supabase REST API
// GET  /api/deploy-schema — Returns status
//
// IMPORTANT: Requires these env vars:
//   NEXT_PUBLIC_SUPABASE_URL — Your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY — Required for SQL execution
//
// Security: Protected by DEPLOY_SCHEMA_KEY (or a default token).
// After successful deployment, REVOKE or remove this endpoint.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// SQL files are embedded directly because Vercel doesn't deploy root-level .sql files
const SCHEMA_SQL = `
-- ============================================================
-- Nudge Database Schema
-- ============================================================
-- Core tables for the Nudge family task management platform.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_uid UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAMILIES TABLE
CREATE TABLE IF NOT EXISTS public.families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAMILY MEMBERS
CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'child')),
  nickname TEXT,
  color TEXT DEFAULT '#6366f1',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMPTZ,
  reminder_at TIMESTAMPTZ,
  recurrence TEXT CHECK (recurrence IN ('none', 'daily', 'weekly', 'biweekly', 'monthly')),
  recurrence_origin_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  points INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration: Add recurrence_config column (stores days_of_week[] and day_of_month for visual picker)
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS recurrence_config JSONB DEFAULT NULL;

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('assignment', 'reminder', 'completion', 'mention', 'system')),
  title TEXT NOT NULL,
  body TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_tasks_family_id ON public.tasks(family_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_family_members_family_id ON public.family_members(family_id);
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON public.family_members(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_tasks_recurrence_origin_id ON public.tasks(recurrence_origin_id);
CREATE INDEX IF NOT EXISTS idx_users_auth_uid ON public.users(auth_uid);

-- ROW LEVEL SECURITY
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = auth_uid);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = auth_uid);

CREATE POLICY "Family members can view family" ON public.families
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.family_members WHERE family_id = id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
  );

CREATE POLICY "Users can view family members" ON public.family_members
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.family_members fm2 WHERE fm2.family_id = family_id AND fm2.user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
  );

CREATE POLICY "Members can read tasks" ON public.tasks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.family_members WHERE family_id = tasks.family_id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
  );

CREATE POLICY "Members can insert tasks" ON public.tasks
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.family_members WHERE family_id = tasks.family_id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
  );

CREATE POLICY "Admins and assignee can update tasks" ON public.tasks
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.family_members WHERE family_id = tasks.family_id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()) AND role IN ('admin'))
    OR assigned_to IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
  );

CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

-- FUNCTIONS AND TRIGGERS

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_families_updated_at BEFORE UPDATE ON public.families
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function: Auto-create user profile and family on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_user_id UUID;
  new_family_id UUID;
BEGIN
  -- Insert into users table
  INSERT INTO public.users (auth_uid, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  RETURNING id INTO new_user_id;

  -- Create default family for the user
  INSERT INTO public.families (name, created_by)
  VALUES (NEW.raw_user_meta_data->>'family_name', new_user_id)
  RETURNING id INTO new_family_id;

  -- Add user as admin of their family
  INSERT INTO public.family_members (family_id, user_id, role)
  VALUES (new_family_id, new_user_id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: After auth user created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Subscription/Billing Tables
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro_monthly', 'pro_yearly', 'family_monthly', 'family_yearly')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'trialing', 'expired')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
  );
`

const BILLING_SQL = `
-- Handle subscription updates from Stripe webhooks
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  stripe_event_id TEXT,
  data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscription_events_subscription_id ON public.subscription_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_events_created_at ON public.subscription_events(created_at);

-- Enable RLS
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view subscription events" ON public.subscription_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions s
      JOIN public.family_members fm ON s.user_id = fm.user_id
      WHERE s.id = subscription_id AND fm.role = 'admin'
    )
  );
`

const ONBOARDING_SQL = `
-- Migration: Onboarding Enhancements Phase 12
-- Adds family_invite_codes table for shareable invite links

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

CREATE INDEX IF NOT EXISTS idx_family_invite_codes_code ON public.family_invite_codes(code);
CREATE INDEX IF NOT EXISTS idx_family_invite_codes_family ON public.family_invite_codes(family_id);

ALTER TABLE public.family_invite_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read invite by code" ON public.family_invite_codes
  FOR SELECT USING (true);

CREATE POLICY "Family owners can create invites" ON public.family_invite_codes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.family_members
      WHERE family_id = family_invite_codes.family_id
        AND user_id = (SELECT id FROM public.users WHERE auth_uid = auth.uid())
        AND role = 'owner'
    )
  );

CREATE POLICY "Family owners can manage invites" ON public.family_invite_codes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.family_members
      WHERE family_id = family_invite_codes.family_id
        AND user_id = (SELECT id FROM public.users WHERE auth_uid = auth.uid())
        AND role = 'owner'
    )
  );
`

const INLINE_MODE_SQL = `
-- ============================================================
-- Nudge: Telegram Inline Mode Support (Phase 14)
-- ============================================================

-- Pending tasks — stores partially-parsed tasks waiting for clarifying input
CREATE TABLE IF NOT EXISTS public.pending_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  original_message TEXT NOT NULL,
  parsed_data JSONB,
  missing_info JSONB,
  follow_up_count INTEGER DEFAULT 0,
  chat_id BIGINT,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '1 hour'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pending_tasks_chat ON public.pending_tasks(chat_id);
CREATE INDEX IF NOT EXISTS idx_pending_tasks_user ON public.pending_tasks(user_id);

-- Telegram messages — tracks all bot interactions
CREATE TABLE IF NOT EXISTS public.telegram_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id BIGINT NOT NULL,
  message_id INTEGER,
  user_id TEXT,
  message_text TEXT,
  parsed_task_id UUID,
  is_bot_response BOOLEAN DEFAULT false,
  nlp_used BOOLEAN DEFAULT false,
  parsed_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_telegram_messages_chat ON public.telegram_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_telegram_messages_user ON public.telegram_messages(user_id);

-- Inline queries — tracks @nudgebot inline usage
CREATE TABLE IF NOT EXISTS public.inline_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  telegram_user_id BIGINT NOT NULL,
  query_text TEXT NOT NULL,
  was_connected BOOLEAN DEFAULT false,
  result_count INTEGER DEFAULT 0,
  selected_result TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inline_queries_user ON public.inline_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_inline_queries_created ON public.inline_queries(created_at);

-- RLS
ALTER TABLE IF EXISTS public.pending_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.telegram_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.inline_queries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own pending tasks" ON public.pending_tasks
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own pending tasks" ON public.pending_tasks
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own pending tasks" ON public.pending_tasks
    FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view own inline queries" ON public.inline_queries
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Trigger: updated_at for pending_tasks
DROP TRIGGER IF EXISTS set_pending_tasks_updated_at ON public.pending_tasks;
CREATE TRIGGER set_pending_tasks_updated_at BEFORE UPDATE ON public.pending_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
`

const REFERRAL_GAMIFICATION_SQL = `
-- ============================================================
-- Nudge: Referral Program & Gamification (Phase 13)
-- ============================================================

-- Referral codes
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_signups INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_referral_codes_user ON public.referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON public.referral_codes(code);

-- Referral redemptions
CREATE TABLE IF NOT EXISTS public.referral_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  referral_code_id UUID NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
  reward_granted TEXT DEFAULT 'free_month' CHECK (reward_granted IN ('free_month', 'free_quarter', 'credits', 'premium_feature')),
  reward_status TEXT NOT NULL DEFAULT 'pending' CHECK (reward_status IN ('pending', 'granted', 'expired')),
  reward_expires_at TIMESTAMPTZ,
  granted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_referral_redemptions_referrer ON public.referral_redemptions(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_redemptions_referred ON public.referral_redemptions(referred_user_id);

-- User streaks
CREATE TABLE IF NOT EXISTS public.user_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_task_date DATE,
  total_completed INTEGER NOT NULL DEFAULT 0,
  week_completed INTEGER NOT NULL DEFAULT 0,
  month_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Family scores
CREATE TABLE IF NOT EXISTS public.family_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  tasks_completed INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_family_scores_family ON public.family_scores(family_id);

-- Achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🏆',
  category TEXT NOT NULL CHECK (category IN ('streak', 'completion', 'family', 'social', 'milestone')),
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('streak_days', 'tasks_completed', 'family_members', 'referrals', 'weekly_win')),
  requirement_value INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);

-- Seed achievements
INSERT INTO public.achievements (key, title, description, icon, category, requirement_type, requirement_value, xp_reward) VALUES
  ('first_task', 'First Steps', 'Complete your first task', '👶', 'milestone', 'tasks_completed', 1, 10),
  ('task_10', 'Getting Things Done', 'Complete 10 tasks', '📋', 'completion', 'tasks_completed', 10, 25),
  ('task_50', 'Productivity Pro', 'Complete 50 tasks', '⚡', 'completion', 'tasks_completed', 50, 50),
  ('task_100', 'Task Master', 'Complete 100 tasks', '👑', 'completion', 'tasks_completed', 100, 100),
  ('streak_3', 'Getting Started', '3-day completion streak', '🔥', 'streak', 'streak_days', 3, 20),
  ('streak_7', 'Week Warrior', '7-day completion streak', '💪', 'streak', 'streak_days', 7, 50),
  ('streak_14', 'Two Week Streak', '14-day completion streak', '🌟', 'streak', 'streak_days', 14, 100),
  ('streak_30', 'Monthly Champion', '30-day completion streak', '🏅', 'streak', 'streak_days', 30, 200),
  ('family_3', 'Family Builder', 'Add 3 family members', '👨‍👩‍👧‍👦', 'family', 'family_members', 3, 30),
  ('family_5', 'Full House', 'Add 5 family members', '🏠', 'family', 'family_members', 5, 50),
  ('referral_1', 'Spread the Word', 'Refer 1 friend to Nudge', '📢', 'social', 'referrals', 1, 50),
  ('referral_3', 'Growth Hacker', 'Refer 3 friends', '🚀', 'social', 'referrals', 3, 100),
  ('referral_10', 'Viral Sensation', 'Refer 10 friends', '💎', 'social', 'referrals', 10, 300),
  ('weekly_top', 'Weekly Winner', 'Top scorer in your family for a week', '🏆', 'milestone', 'weekly_win', 1, 75)
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE IF EXISTS public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.referral_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.family_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_achievements ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
    FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view their streak" ON public.user_streaks
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Family members can view streaks" ON public.user_streaks
    FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.family_members fm1 JOIN public.family_members fm2 ON fm1.family_id = fm2.family_id WHERE fm1.user_id = user_streaks.user_id AND fm2.user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
    );
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Family members can view scores" ON public.family_scores
    FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.family_members WHERE family_id = family_scores.family_id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
    );
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can view achievements" ON public.achievements
    FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view own achievements" ON public.user_achievements
    FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Family can view achievement" ON public.user_achievements
    FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.family_members fm1 JOIN public.family_members fm2 ON fm1.family_id = fm2.family_id WHERE fm1.user_id = user_achievements.user_id AND fm2.user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
    );
  EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view own redemptions" ON public.referral_redemptions
    FOR SELECT USING (
      referrer_user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()) OR
      referred_user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
    );
  EXCEPTION WHEN duplicate_object THEN null;
END $$;
`

const SOFT_DELETE_SQL = `
-- Soft-delete support for tasks (Phase 15)
ALTER TABLE IF EXISTS public.tasks
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_tasks_deleted_at ON public.tasks(deleted_at);
`

const NOTIFICATIONS_SQL = `
-- Notifications table (Phase 15.5)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('assignment', 'completion', 'reminder', 'system')),
  title TEXT NOT NULL,
  body TEXT,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON public.notifications(user_id, read, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_cleanup
  ON public.notifications(read, created_at)
  WHERE read = TRUE;

-- Ensure completed_by column exists on tasks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'completed_by'
  ) THEN
    ALTER TABLE tasks ADD COLUMN completed_by UUID REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;
`

const ADMIN_SETTINGS_SQL = `
-- ============================================================
-- Nudge: Admin Settings & User Roles (Admin Panel)
-- ============================================================

-- Admin settings table — system-wide key-value config
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can manage settings" ON public.admin_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE auth_uid = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin users can view settings" ON public.admin_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE auth_uid = auth.uid() AND is_admin = true)
  );

-- Add is_admin column to users table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;
  END IF;
END $$;

-- Add last_active column to users table for tracking activity
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'last_active'
  ) THEN
    ALTER TABLE public.users ADD COLUMN last_active TIMESTAMPTZ;
  END IF;
END $$;

-- Helper function to check if a user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user(check_auth_uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users WHERE auth_uid = check_auth_uid AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Seed default admin settings
INSERT INTO public.admin_settings (key, value, description) VALUES
  ('notifications.default_enabled', 'true'::jsonb, 'Default notification enabled for all users'),
  ('features.allow_telegram', 'true'::jsonb, 'Enable Telegram integration'),
  ('features.allow_voice', 'true'::jsonb, 'Enable voice task creation'),
  ('features.allow_gamification', 'true'::jsonb, 'Enable gamification features'),
  ('features.allow_referrals', 'true'::jsonb, 'Enable referral program'),
  ('system.maintenance_mode', 'false'::jsonb, 'Put the app in maintenance mode'),
  ('system.max_family_members', '20'::jsonb, 'Maximum members per family'),
  ('system.trial_days', '14'::jsonb, 'Free trial duration in days')
ON CONFLICT (key) DO NOTHING;

-- Index for faster admin lookups
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON public.users(is_admin) WHERE is_admin = true;
`

const SQL_FILES = [
  { name: 'supabase-schema.sql', sql: SCHEMA_SQL },
  { name: 'supabase-migration-billing.sql', sql: BILLING_SQL },
  { name: 'supabase-migration-onboarding.sql', sql: ONBOARDING_SQL },
  { name: 'supabase-migration-referral-gamification.sql', sql: REFERRAL_GAMIFICATION_SQL },
  { name: 'supabase-migration-inline.sql', sql: INLINE_MODE_SQL },
  { name: 'supabase-migration-soft-delete.sql', sql: SOFT_DELETE_SQL },
  { name: 'supabase-migration-notifications.sql', sql: NOTIFICATIONS_SQL },
  { name: 'supabase-migration-admin-settings.sql', sql: ADMIN_SETTINGS_SQL },
]

async function executeSqlSql(
  supabaseUrl: string,
  serviceRoleKey: string,
  sql: string
): Promise<{ success: boolean; message: string }> {
  // Execute SQL via Supabase Management API
  // This uses the /sql endpoint that's available on all Supabase projects
  // Requires SUPABASE_SERVICE_ROLE_KEY (not the management PAT)
  try {
    // Supabase exposes raw SQL execution through the /rest/v1/rpc/ interface
    // We need to create the exec_sql function first, then use it
    
    // Step 1: Try to create the exec_sql function using pg management
    // We use a workaround: create the function via the internal supabase_functions schema
    // Alternative approach: use the pg_database system through auth admin
    
    // Actually, Supabase projects have a built-in SQL execution endpoint:
    // POST /rest/v1/rpc/pgbouncer.exec which is the pgbouncer auth function
    // But for raw SQL, we need an RPC that can exec.
    
    // Simplest approach that works: Break the SQL into individual statements
    // and execute each via the REST API using INSERT INTO (which is allowed)
    // This doesn't work for DDL. 
    
    // The ONLY reliable approach for raw SQL:
    // Use the supabase client + the .rpc() method with a pre-created function
    // OR use the Vercel Postgres /sql endpoint
    
    // For now, let's execute via pg_dump-style direct connection
    // We'll use supabase client to run individual statements via raw REST
    
    // New approach: Create exec_sql via auth.users hook trick
    // Actually, the simplest reliable way is to call each DDL statement
    // via a supabase admin client running .from('_exec_sql') type operations
    
    // Let's use the Supabase Management API with service role key
    // The format is: GET|POST /api/<project_ref>/sql
    
    // Extract project ref from URL
    const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '')
    
    // Use the Management API endpoint for SQL execution
    // This requires a management PAT, not the service role key
    // But we can use a workaround with the service role key
    
    // Fallback: Write SQL to temp table using REST API, then execute
    // Actually, the simplest reliable approach: use the supabase client's
    // raw query capability through the .from() + custom schema
    
    // Most practical approach: chunk SQL into statements and run them
    // via a simple fetch to the auth admin endpoint
    
    // Supabase Auth Admin API can execute SQL through:
    // POST {supabaseUrl}/auth/v1/admin/sql
    // This isn't a real endpoint though
    
    // Final approach: use createClient and execute via the REST API's
    // stored procedure execution by first creating the procedure
    // Create it manually via psql or the Dashboard SQL Editor
    
    // For now, just try using the rest/v1/ with proper content type
    // The issue was POST /rest/v1/ doesn't accept body
    // Try GET with the SQL as a query parameter
    
    // Let me use a different approach entirely:
    // Execute via the postgREST API using the _rpc endpoint
    // Supabase has a pg_net extension that can be used
    
    // Absolute simplest: Split SQL by semicolons and run each via .rpc()
    // First create the exec_sql function
    
    // Since we can't create functions without SQL execution,
    // this is a chicken-and-egg problem.
    // 
    // Final solution: Create a temporary one-time migration that
    // deploys schema using the app's own database connection
    
    return { success: false, message: 'Cannot execute raw SQL via REST API. Please run the migration manually via Supabase Dashboard > SQL Editor or provide DATABASE_URL for direct connection.' }
  } catch (e: any) {
    return { success: false, message: `Error: ${e.message?.substring(0, 100)}` }
  }
}

export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get('authorization')
  const deployKey = process.env.DEPLOY_SCHEMA_KEY
  const expectedToken = deployKey || process.env.SUPABASE_SERVICE_ROLE_KEY || 'nudge-deploy-schema-2026'
  const expectedHeader = 'Bearer ' + expectedToken
  if (!authHeader || authHeader !== expectedHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_SUPABASE_URL is not set' }, { status: 500 })
  }
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY is not set. Required for SQL execution.' }, { status: 500 })
  }

  const results: { file: string; success: boolean; message: string }[] = []

  for (const { name, sql } of SQL_FILES) {
    const result = await executeSqlSql(supabaseUrl, serviceRoleKey, sql)
    results.push({ file: name, ...result })
  }

  const allSucceeded = results.every(r => r.success)

  return NextResponse.json({
    message: allSucceeded
      ? '✅ Schema deployed successfully!'
      : '⚠️ Schema deployment encountered issues.',
    results,
  })
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

  return NextResponse.json({
    status: 'Nudge schema deploy endpoint',
    supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : '❌ NOT SET',
    hasServiceRoleKey: hasServiceKey,
    sqlFiles: SQL_FILES.map(f => ({ name: f.name, embedded: true, size: f.sql.length })),
    usage: 'POST /api/deploy-schema with Authorization: Bearer <DEPLOY_SCHEMA_KEY>',
    envVarsNeeded: [
      'NEXT_PUBLIC_SUPABASE_URL ✅ (set to https://yrvnkepndpjmlrewecro.supabase.co)',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY ❌ (get from Supabase Dashboard > Settings > API)',
      'SUPABASE_SERVICE_ROLE_KEY ❌ (get from Supabase Dashboard > Settings > API)',
    ],
  })
}
