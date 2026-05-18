-- Nudge Database Schema
-- Week 1: Foundation

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  telegram_username TEXT,
  telegram_chat_id BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Families table
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members (junction table)
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  recurrence_pattern TEXT CHECK (recurrence_pattern IN ('daily', 'weekly', 'monthly')),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task reminders
CREATE TABLE task_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('initial', 'follow_up', 'escalation')),
  sent_via TEXT NOT NULL CHECK (sent_via IN ('telegram', 'email', 'push')),
  message TEXT NOT NULL
);



-- Row Level Security Policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Families policies
CREATE POLICY "Family members can view their families" ON families
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = families.id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Family owners can update their families" ON families
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = families.id
      AND family_members.user_id = auth.uid()
      AND family_members.role = 'owner'
    )
  );

CREATE POLICY "Users can create families" ON families
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Family members policies
CREATE POLICY "Family members can view family members" ON family_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM family_members fm
      WHERE fm.family_id = family_members.family_id
      AND fm.user_id = auth.uid()
    )
  );

-- Tasks policies
CREATE POLICY "Family members can view tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = tasks.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = tasks.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Task creator or assignee can update tasks" ON tasks
  FOR UPDATE USING (
    auth.uid() = created_by OR auth.uid() = assigned_to
  );

-- Indexes for performance
CREATE INDEX idx_tasks_family_id ON tasks(family_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_family_members_user_id ON family_members(user_id);
CREATE INDEX idx_family_members_family_id ON family_members(family_id);
CREATE INDEX idx_telegram_messages_chat_id ON telegram_messages(chat_id);
CREATE INDEX idx_telegram_messages_user_id ON telegram_messages(user_id);

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_families_updated_at BEFORE UPDATE ON families
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get user's families
CREATE OR REPLACE FUNCTION get_user_families(user_uuid UUID)
RETURNS TABLE (
  family_id UUID,
  family_name TEXT,
  user_role TEXT,
  member_count BIGINT,
  pending_tasks BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.name,
    fm.role,
    (SELECT COUNT(*) FROM family_members WHERE family_id = f.id) as member_count,
    (SELECT COUNT(*) FROM tasks WHERE family_id = f.id AND status = 'pending') as pending_tasks
  FROM families f
  JOIN family_members fm ON f.id = fm.family_id
  WHERE fm.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to get family tasks
CREATE OR REPLACE FUNCTION get_family_tasks(family_uuid UUID)
RETURNS TABLE (
  task_id UUID,
  title TEXT,
  description TEXT,
  status TEXT,
  priority TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  created_by_name TEXT,
  assigned_to_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.due_date,
    uc.full_name as created_by_name,
    ua.full_name as assigned_to_name,
    t.created_at
  FROM tasks t
  LEFT JOIN users uc ON t.created_by = uc.id
  LEFT JOIN users ua ON t.assigned_to = ua.id
  WHERE t.family_id = family_uuid
  ORDER BY 
    CASE t.priority 
      WHEN 'urgent' THEN 1
      WHEN 'high' THEN 2
      WHEN 'medium' THEN 3
      WHEN 'low' THEN 4
    END,
    t.due_date NULLS LAST,
    t.created_at DESC;
END;
$$ LANGUAGE plpgsql;
-- Telegram messages log (updated with NLP fields)
CREATE TABLE telegram_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id BIGINT NOT NULL,
  message_id BIGINT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  message_text TEXT NOT NULL,
  parsed_task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  is_bot_response BOOLEAN NOT NULL DEFAULT false,
  nlp_used BOOLEAN DEFAULT false,
  parsed_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chat_id, message_id)
);

-- Pending tasks (awaiting clarification)
CREATE TABLE pending_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  chat_id BIGINT NOT NULL,
  original_message TEXT NOT NULL,
  parsed_data JSONB NOT NULL,
  missing_info TEXT[] NOT NULL,
  follow_up_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 hour'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for new tables
ALTER TABLE telegram_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_tasks ENABLE ROW LEVEL SECURITY;

-- Policies for telegram_messages
CREATE POLICY "Users can view their own telegram messages"
  ON telegram_messages FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can insert telegram messages"
  ON telegram_messages FOR INSERT
  WITH CHECK (true);

-- Policies for pending_tasks
CREATE POLICY "Users can view their own pending tasks"
  ON pending_tasks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own pending tasks"
  ON pending_tasks FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own pending tasks"
  ON pending_tasks FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own pending tasks"
  ON pending_tasks FOR DELETE
  USING (user_id = auth.uid());

-- Indexes for performance
CREATE INDEX idx_telegram_messages_user_id ON telegram_messages(user_id);
CREATE INDEX idx_telegram_messages_chat_id ON telegram_messages(chat_id);
CREATE INDEX idx_pending_tasks_user_id ON pending_tasks(user_id);
CREATE INDEX idx_pending_tasks_expires_at ON pending_tasks(expires_at);
CREATE INDEX idx_pending_tasks_family_id ON pending_tasks(family_id);

-- Function to clean up expired pending tasks
CREATE OR REPLACE FUNCTION cleanup_expired_pending_tasks()
RETURNS void AS $$
BEGIN
  DELETE FROM pending_tasks 
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job (run every hour)
-- Note: Requires pg_cron extension enabled in Supabase
-- SELECT cron.schedule('cleanup-pending-tasks', '0 * * * *', 'SELECT cleanup_expired_pending_tasks()');

-- ===== MIGRATION: billing =====
-- Nudge: Stripe Billing Migration
-- Adds subscriptions table and related columns

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'family')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'incomplete_expired')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(family_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_family_id ON subscriptions(family_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies: family members can view their subscription
CREATE POLICY "Family members can view their subscription" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = subscriptions.family_id
      AND family_members.user_id = auth.uid()
    )
  );

-- System (admin) can insert/update
CREATE POLICY "System can manage subscriptions" ON subscriptions
  FOR ALL USING (true)
  WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add stripe_customer_id to users table for convenience
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Function: Get a user's current subscription plan (for rate limiting)
CREATE OR REPLACE FUNCTION get_user_plan(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  user_plan TEXT;
BEGIN
  SELECT COALESCE(s.plan, 'free') INTO user_plan
  FROM subscriptions s
  JOIN family_members fm ON fm.family_id = s.family_id
  WHERE fm.user_id = user_uuid
  AND s.status IN ('active', 'trialing')
  LIMIT 1;

  RETURN COALESCE(user_plan, 'free');
END;
$$ LANGUAGE plpgsql;

-- Function: Check if user has exceeded free plan task limit
CREATE OR REPLACE FUNCTION check_daily_task_limit(user_uuid UUID)
RETURNS TABLE (
  within_limit BOOLEAN,
  tasks_today BIGINT,
  max_tasks BIGINT
) AS $$
DECLARE
  user_plan TEXT;
BEGIN
  user_plan := get_user_plan(user_uuid);

  IF user_plan != 'free' THEN
    -- Paid plans: unlimited
    RETURN QUERY SELECT true::BOOLEAN, 0::BIGINT, -1::BIGINT;
    RETURN;
  END IF;

  -- Free plan: 5 tasks per day
  RETURN QUERY
  SELECT
    (COUNT(*) < 5)::BOOLEAN AS within_limit,
    COUNT(*)::BIGINT AS tasks_today,
    5::BIGINT AS max_tasks
  FROM tasks
  WHERE created_by = user_uuid
    AND created_at::DATE = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- ===== MIGRATION: onboarding =====
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

-- ===== MIGRATION: soft-delete =====
-- ============================================================
-- Nudge: Soft-delete support for tasks (Phase 15)
-- ============================================================
-- Adds deleted_at column to tasks table for soft-deletion,
-- so tasks can be restored (undo) after deletion.

ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

-- Index for filtering out deleted tasks
CREATE INDEX IF NOT EXISTS idx_tasks_deleted_at ON tasks(deleted_at);

-- ===== MIGRATION: notifications =====
-- Migration: Notifications table for Phase 15.5
-- Run this in Supabase Dashboard > SQL Editor
-- Project: yrvnkepndpjmlrewecro (from NEXT_PUBLIC_SUPABASE_URL)

-- Create notifications table
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

-- Index for fast unread queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON public.notifications(user_id, read, created_at DESC);

-- Index for cleanup (old read notifications)
CREATE INDEX IF NOT EXISTS idx_notifications_cleanup
  ON public.notifications(read, created_at)
  WHERE read = TRUE;

-- Ensure completed_by column exists on tasks (may have been added earlier)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'completed_by'
  ) THEN
    ALTER TABLE public.tasks ADD COLUMN completed_by UUID REFERENCES public.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS: Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

-- RLS: Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

-- RLS: Service role can insert for any user
CREATE POLICY "Service role can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- ===== MIGRATION: referral-gamification =====
-- Nudge: Referral Program & Gamification Migration (Phase 13)
-- Adds referral tracking, streak tracking, and leaderboard tables

-- ============================================================
-- REFERRAL SYSTEM
-- ============================================================

-- Referral codes table
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_signups INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referral redemptions table
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

CREATE INDEX IF NOT EXISTS idx_referral_codes_user ON public.referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_redemptions_referrer ON public.referral_redemptions(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_redemptions_referred ON public.referral_redemptions(referred_user_id);

-- ============================================================
-- GAMIFICATION SYSTEM
-- ============================================================

-- User streaks table
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

-- Family points/leaderboard
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

-- Achievement definitions
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

-- User achievements (earned)
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON public.user_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_family_scores_family ON public.family_scores(family_id);
CREATE INDEX IF NOT EXISTS idx_family_scores_family_user ON public.family_scores(family_id, user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);

-- ============================================================
-- SEED ACHIEVEMENTS
-- ============================================================

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

-- ============================================================
-- RLS POLICIES
-- ============================================================

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Referral codes: owners can manage, family members can read
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
  FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

CREATE POLICY "Users can update their own referral codes" ON public.referral_codes
  FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

-- Referral redemptions: users can see their own
CREATE POLICY "Users can view their redemptions" ON public.referral_redemptions
  FOR SELECT USING (
    referrer_user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()) OR
    referred_user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
  );

-- User streaks: users can view own, family can view family members'
CREATE POLICY "Users can view their own streaks" ON public.user_streaks
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

CREATE POLICY "Family members can view each other streaks" ON public.user_streaks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.family_members fm1
      JOIN public.family_members fm2 ON fm1.family_id = fm2.family_id
      WHERE fm1.user_id = user_streaks.user_id
        AND fm2.user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
    )
  );

-- Family scores: family members can view
CREATE POLICY "Family members can view scores" ON public.family_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.family_members
      WHERE family_id = family_scores.family_id
        AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
    )
  );

-- Achievements: everyone can view
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- User achievements: users can view own, family can view
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));

CREATE POLICY "Family can view each other achievements" ON public.user_achievements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.family_members fm1
      JOIN public.family_members fm2 ON fm1.family_id = fm2.family_id
      WHERE fm1.user_id = user_achievements.user_id
        AND fm2.user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
    )
  );

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Update streak when a task is completed
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  yesterday_date DATE := CURRENT_DATE - 1;
begin
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update or insert streak record
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_task_date, total_completed, week_completed, month_completed)
    VALUES (
      NEW.completed_by,
      1,
      1,
      today_date,
      1,
      1,
      1
    )
    ON CONFLICT (user_id) DO UPDATE SET
      current_streak = CASE
        WHEN user_streaks.last_task_date = yesterday_date THEN user_streaks.current_streak + 1
        WHEN user_streaks.last_task_date = today_date THEN user_streaks.current_streak
        ELSE 1
      END,
      longest_streak = GREATEST(
        user_streaks.longest_streak,
        CASE
          WHEN user_streaks.last_task_date = yesterday_date THEN user_streaks.current_streak + 1
          WHEN user_streaks.last_task_date = today_date THEN user_streaks.current_streak
          ELSE 1
        END
      ),
      last_task_date = today_date,
      total_completed = user_streaks.total_completed + 1,
      week_completed = CASE
        WHEN user_streaks.last_task_date >= date_trunc('week', today_date) THEN user_streaks.week_completed + 1
        ELSE 1
      END,
      month_completed = CASE
        WHEN user_streaks.last_task_date >= date_trunc('month', today_date) THEN user_streaks.month_completed + 1
        ELSE 1
      END,
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: after task completion
DROP TRIGGER IF EXISTS on_task_completed_streak ON public.tasks;
CREATE TRIGGER on_task_completed_streak
  AFTER UPDATE OF status ON public.tasks
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed'))
  EXECUTE FUNCTION public.update_user_streak();

-- Update family scores when task completed
CREATE OR REPLACE FUNCTION public.update_family_score()
RETURNS TRIGGER AS $$
DECLARE
  priority_points INTEGER;
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    priority_points := CASE NEW.priority
      WHEN 'urgent' THEN 30
      WHEN 'high' THEN 20
      WHEN 'medium' THEN 10
      WHEN 'low' THEN 5
      ELSE 10
    END;

    INSERT INTO public.family_scores (family_id, user_id, points, tasks_completed)
    VALUES (NEW.family_id, NEW.completed_by, priority_points, 1)
    ON CONFLICT (family_id, user_id) DO UPDATE SET
      points = family_scores.points + priority_points,
      tasks_completed = family_scores.tasks_completed + 1,
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: after task completion for points
DROP TRIGGER IF EXISTS on_task_completed_points ON public.tasks;
CREATE TRIGGER on_task_completed_points
  AFTER UPDATE OF status ON public.tasks
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed'))
  EXECUTE FUNCTION public.update_family_score();

-- Function: Get family leaderboard
CREATE OR REPLACE FUNCTION public.get_family_leaderboard(family_uuid UUID)
RETURNS TABLE (
  user_id UUID,
  display_name TEXT,
  points INTEGER,
  tasks_completed INTEGER,
  streak INTEGER,
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    fs.user_id,
    u.display_name,
    fs.points,
    fs.tasks_completed,
    COALESCE(us.current_streak, 0),
    u.avatar_url
  FROM public.family_scores fs
  JOIN public.users u ON u.id = fs.user_id
  LEFT JOIN public.user_streaks us ON us.user_id = fs.user_id
  WHERE fs.family_id = family_uuid
  ORDER BY fs.points DESC;
END;
$$ LANGUAGE plpgsql;

-- Function: Check and award achievements
CREATE OR REPLACE FUNCTION public.check_achievements(user_uuid UUID)
RETURNS TABLE (
  achievement_key TEXT,
  achievement_title TEXT,
  achievement_icon TEXT,
  new_earned BOOLEAN
) AS $$
DECLARE
  streak_record RECORD;
  tasks_total INTEGER;
  referrals_total INTEGER;
  family_count INTEGER;
  achievement RECORD;
BEGIN
  -- Get user stats
  SELECT current_streak, total_completed INTO streak_record
  FROM public.user_streaks WHERE user_id = user_uuid;

  IF streak_record IS NULL THEN
    streak_record.current_streak := 0;
    streak_record.total_completed := 0;
  END IF;

  tasks_total := COALESCE(streak_record.total_completed, 0);
  referrals_total := (SELECT COUNT(*) FROM public.referral_redemptions WHERE referrer_user_id = user_uuid AND reward_status = 'granted');
  family_count := (SELECT COUNT(*) FROM public.family_members WHERE family_id IN (SELECT family_id FROM public.family_members WHERE user_id = user_uuid));

  -- Check each achievement
  FOR achievement IN SELECT * FROM public.achievements LOOP
    DECLARE
      qualifies BOOLEAN := false;
      already_earned BOOLEAN;
    BEGIN
      qualifies := CASE achievement.requirement_type
        WHEN 'tasks_completed' THEN tasks_total >= achievement.requirement_value
        WHEN 'streak_days' THEN streak_record.current_streak >= achievement.requirement_value
        WHEN 'family_members' THEN family_count >= achievement.requirement_value
        WHEN 'referrals' THEN referrals_total >= achievement.requirement_value
        WHEN 'weekly_win' THEN EXISTS (
          SELECT 1 FROM public.family_scores fs1
          WHERE fs1.user_id = user_uuid
            AND fs1.rank = 1
            AND fs1.updated_at >= date_trunc('week', CURRENT_DATE)
        )
        ELSE false
      END;

      IF qualifies THEN
        INSERT INTO public.user_achievements (user_id, achievement_id)
        VALUES (user_uuid, achievement.id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING
        RETURNING true INTO already_earned;

        achievement_key := achievement.key;
        achievement_title := achievement.title;
        achievement_icon := achievement.icon;
        new_earned := already_earned IS NULL OR NOT already_earned;
        RETURN NEXT;

        -- If it was already earned, don't return it
        IF NOT new_earned THEN
          CONTINUE;
        END IF;
      END IF;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ===== MIGRATION: inline =====
-- ============================================================
-- Nudge: Telegram Inline Mode Support (Phase 14)
-- ============================================================
-- Adds:
-- 1. pending_tasks table (for follow-up task creation flow)
-- 2. inline_queries table (tracking inline mode usage)
-- 3. telegram_messages table (if not exists)

-- Pending tasks — stores partially-parsed tasks waiting for clarifying input


CREATE INDEX IF NOT EXISTS idx_pending_tasks_chat ON public.pending_tasks(chat_id);
CREATE INDEX IF NOT EXISTS idx_pending_tasks_user ON public.pending_tasks(user_id);

-- Telegram messages — tracks all bot interactions


CREATE INDEX IF NOT EXISTS idx_telegram_messages_chat ON public.telegram_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_telegram_messages_user ON public.telegram_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_telegram_messages_created ON public.telegram_messages(created_at);

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
