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
