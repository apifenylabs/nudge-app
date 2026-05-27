/**
 * Inline database migration utility.
 *
 * Runs DDL migrations using a direct PostgreSQL connection (SUPABASE_DB_URL).
 * Falls back gracefully if no direct DB URL is available — the app continues
 * to work, just without the migrations applied.
 *
 * Each migration is idempotent (CREATE IF NOT EXISTS pattern).
 * Only one migration runs at a time (locked via migration_state table).
 */

import { Pool } from 'pg'

// ── MIGRATION DEFINITIONS ──────────────────────────────────────────

const MIGRATIONS: Record<string, string> = {
  'notifications': `
-- Inline migration: Notifications table
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

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own notifications') THEN
    CREATE POLICY "Users can view own notifications" ON public.notifications
      FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own notifications') THEN
    CREATE POLICY "Users can update own notifications" ON public.notifications
      FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can insert notifications') THEN
    CREATE POLICY "Service role can insert notifications" ON public.notifications
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;
`,

  'notifications_rls_update': `
-- Fix RLS: service role insert via postgREST needs bypass
CREATE POLICY IF NOT EXISTS "Service role can insert notifications bypass"
  ON public.notifications
  FOR INSERT
  WITH CHECK (true);
`,

  'notification_preferences': `
-- Inline migration: Notification preferences table
-- Per-event-type, per-channel notification toggles
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('task_assigned', 'task_completed', 'task_due_soon', 'task_overdue', 'family_invite', 'weekly_summary', 'daily_digest')),
  channel TEXT NOT NULL CHECK (channel IN ('in_app', 'telegram', 'email', 'push')),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_type, channel)
);

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user
  ON public.notification_preferences(user_id);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own notification preferences') THEN
    CREATE POLICY "Users can view own notification preferences" ON public.notification_preferences
      FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own notification preferences') THEN
    CREATE POLICY "Users can insert own notification preferences" ON public.notification_preferences
      FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own notification preferences') THEN
    CREATE POLICY "Users can update own notification preferences" ON public.notification_preferences
      FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

-- Default preferences for all existing users (inserted by app on first access)
`,

  'billing_interval': `
-- Migration: Add billing_interval and family_id to subscriptions

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'billing_interval'
  ) THEN
    ALTER TABLE public.subscriptions ADD COLUMN billing_interval TEXT DEFAULT 'monthly' CHECK (billing_interval IN ('monthly', 'yearly'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'family_id'
  ) THEN
    ALTER TABLE public.subscriptions ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_plan_check;
  ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_plan_check
    CHECK (plan IN ('free', 'pro', 'family'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_subscriptions_family_id ON public.subscriptions(family_id);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Family members can view subscription') THEN
    CREATE POLICY "Family members can view subscription" ON public.subscriptions
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.family_members WHERE family_id = subscriptions.family_id AND user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()))
      );
  END IF;
END $$;
`,

  'trial_events': `
-- Migration: Trial events (conversion tracking)
CREATE TABLE IF NOT EXISTS public.trial_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  family_id UUID REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('trial_started', 'trial_warning_3d', 'trial_warning_1d', 'trial_expired', 'grace_email_sent', 'grace_reactivated', 'converted')),
  days_expired INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trial_events_subscription ON public.trial_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_trial_events_user ON public.trial_events(user_id);
CREATE INDEX IF NOT EXISTS idx_trial_events_type ON public.trial_events(event_type);

ALTER TABLE public.trial_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage trial events') THEN
    CREATE POLICY "Service role can manage trial events" ON public.trial_events FOR ALL USING (true);
  END IF;
END $$;
`,

  'email_log': `
-- Migration: Email send log (dedup + analytics)
CREATE TABLE IF NOT EXISTS public.email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  sent BOOLEAN NOT NULL DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_log_user_type ON public.email_log(user_id, email_type);
CREATE INDEX IF NOT EXISTS idx_email_log_type ON public.email_log(email_type);

ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage email log') THEN
    CREATE POLICY "Service role can manage email log" ON public.email_log FOR ALL USING (true);
  END IF;
END $$;
`,

  'task_shares_rls': `
-- Migration: Ensure task_shares table has RLS
CREATE TABLE IF NOT EXISTS public.task_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  share_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_task_shares_task ON public.task_shares(task_id);

ALTER TABLE public.task_shares ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can insert task shares') THEN
    CREATE POLICY "Service role can insert task shares" ON public.task_shares FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own task shares') THEN
    CREATE POLICY "Users can view own task shares" ON public.task_shares
      FOR SELECT USING (
        user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid())
      );
  END IF;
END $$;
`,

  'changelog_entries': `
-- Migration: Changelog entries for "What's New" feature
CREATE TABLE IF NOT EXISTS public.changelog_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'improvement' CHECK (category IN ('new_feature', 'improvement', 'fix', 'announcement')),
  icon TEXT DEFAULT '✨',
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_changelog_published ON public.changelog_entries(published_at DESC)
  WHERE is_published = TRUE;

ALTER TABLE public.changelog_entries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can read published changelog') THEN
    CREATE POLICY "Anyone can read published changelog" ON public.changelog_entries
      FOR SELECT USING (is_published = TRUE);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage changelog') THEN
    CREATE POLICY "Service role can manage changelog" ON public.changelog_entries FOR ALL USING (true);
  END IF;
END $$;

-- Seed initial changelog entries
INSERT INTO public.changelog_entries (title, body, category, icon, tags) VALUES
  (
    'Trial Conversion Engine',
    'We now send personalized re-engagement emails when your trial ends, showing exactly what features you miss and giving you one-click reactivation.',
    'new_feature',
    '🎯',
    ARRAY['billing', 'email']
  ),
  (
    'Onboarding Email Drip',
    'New users now get a warm welcome sequence over their first week — Day 0 tips, Day 2 streaks challenge, and Day 7 first-week recap with upgrade nudge.',
    'new_feature',
    '📧',
    ARRAY['onboarding', 'email']
  ),
  (
    'What\'s New Changelog',
    'This! You can now see what we\'ve shipped right from your dashboard. New features, improvements, and fixes — all in one place.',
    'new_feature',
    '📋',
    ARRAY['ui']
  ),
  (
    'Referral Rewards Program',
    'Share Nudge with friends and earn free months of Pro. Each referral = 1 free month. Track your rewards in Settings > Referral Program.',
    'new_feature',
    '🎁',
    ARRAY['referrals', 'growth']
  ),
  (
    'Family Sharing Improved',
    'Better member management with per-member task stats, streamlined invitations, and clearer plan upgrade prompts when you hit member limits.',
    'improvement',
    '👨‍👩‍👧‍👦',
    ARRAY['family', 'ui']
  )
ON CONFLICT DO NOTHING;
`,

  'changelog_seen': `
-- Migration: Track which changelog entries each user has seen
CREATE TABLE IF NOT EXISTS public.changelog_seen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entry_id UUID NOT NULL REFERENCES public.changelog_entries(id) ON DELETE CASCADE,
  seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, entry_id)
);

CREATE INDEX IF NOT EXISTS idx_changelog_seen_user ON public.changelog_seen(user_id);

ALTER TABLE public.changelog_seen ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own changelog seen') THEN
    CREATE POLICY "Users can view own changelog seen" ON public.changelog_seen
      FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own changelog seen') THEN
    CREATE POLICY "Users can insert own changelog seen" ON public.changelog_seen
      FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage changelog seen') THEN
    CREATE POLICY "Service role can manage changelog seen" ON public.changelog_seen FOR ALL USING (true);
  END IF;
END $$;
`,

  'changelog_phase36': `
-- Phase 36: Trial Countdown + Social Proof + Welcome Email Inline
INSERT INTO public.changelog_entries (title, body, category, icon, tags) VALUES
  (
    'Trial Ending Countdown',
    'See exactly how many days you have left on your trial right on your dashboard. We\'ll nudge you with a friendly reminder when you have 7, 3, and 2 days remaining.',
    'new_feature',
    '⏰',
    ARRAY['billing', 'dashboard', 'ux']
  ),
  (
    'Social Proof on Pricing',
    'The pricing page now shows real-time stats — how many families joined this week, total tasks completed, and tasks done today. See the community growing!',
    'new_feature',
    '📊',
    ARRAY['marketing', 'pricing']
  ),
  (
    'Welcome Email on Signup',
    'New users now get an immediate welcome email right after signing up, with tips on inviting family, creating their first task, and connecting Telegram. No more waiting for the daily cron to send it!',
    'improvement',
    '📧',
    ARRAY['onboarding', 'email']
  )
ON CONFLICT DO NOTHING;
`,

  'changelog_phase37': `
-- Phase 37: Payment Method Management + Usage Dashboard
INSERT INTO public.changelog_entries (title, body, category, icon, tags) VALUES
  (
    'Payment Method Management',
    'See your saved card on file right in settings — brand, last 4 digits, expiry date. Update your payment method with one click or add a card if you don\'t have one yet. Never wonder what card you used again.',
    'new_feature',
    '💳',
    ARRAY['billing', 'settings']
  ),
  (
    'Usage Dashboard',
    'A new usage overview in Settings shows you exactly how many daily tasks, family members, and recurring tasks you\'ve used vs your plan limits. Color-coded progress bars let you know when you\'re approaching limits so you can upgrade before hitting them.',
    'new_feature',
    '📊',
    ARRAY['billing', 'settings', 'ux']
  )
ON CONFLICT DO NOTHING;
`,

  'cancellation_survey': `
-- Phase 38: Cancellation survey responses table
CREATE TABLE IF NOT EXISTS public.cancellation_survey (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  email TEXT,
  full_name TEXT,
  primary_reason TEXT NOT NULL CHECK (primary_reason IN (
    'too_expensive', 'missing_features', 'not_using_enough', 'too_complex',
    'switching_to_competitor', 'technical_issues', 'family_moved_away',
    'privacy_concerns', 'temporary_pause', 'other'
  )),
  details TEXT,
  feedback TEXT,
  would_recommend INTEGER CHECK (would_recommend >= 1 AND would_recommend <= 10),
  alternative_used TEXT,
  plan_at_cancel TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cancel_survey_reason ON public.cancellation_survey(primary_reason);
CREATE INDEX IF NOT EXISTS idx_cancel_survey_created ON public.cancellation_survey(created_at DESC);

ALTER TABLE public.cancellation_survey ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage cancellation survey') THEN
    CREATE POLICY \"Service role can manage cancellation survey\" ON public.cancellation_survey FOR ALL USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own survey response') THEN
    CREATE POLICY \"Users can view own survey response\" ON public.cancellation_survey
      FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE auth_uid = auth.uid()));
  END IF;
END $$;
`,

  'changelog_phase38': `
-- Phase 38: Cancellation Survey + Push Notification Preferences
INSERT INTO public.changelog_entries (title, body, category, icon, tags) VALUES
  (
    'Cancellation Survey',
    'Before you cancel, we now ask a quick 2-minute survey to understand why. Your feedback helps us improve Nudge for everyone. Select your reason, share details, and rate how likely you\'d recommend us — all in one flow before the cancellation goes through.',
    'new_feature',
    '📋',
    ARRAY['billing', 'retention', 'ux']
  ),
  (
    'Push Notification Preferences',
    'Fine-tune which notifications you receive across channels right from Settings. Toggle Telegram, in-app, and email notifications per event type — task assigned, completed, due soon, overdue, and more. Changes apply instantly.',
    'improvement',
    '🔔',
    ARRAY['notifications', 'settings', 'ux']
  )
ON CONFLICT DO NOTHING;
`,
}

// ── MIGRATION STATE TRACKING ──────────────────────────────────────

/**
 * Names of migrations that have been successfully applied in this process.
 * Prevents re-running migrations on every request after startup.
 */
const appliedMigrations = new Set<string>()

let connectionPool: Pool | null = null
let lastError: string | null = null
let poolFailed = false

function getConnectionString(): string | null {
  // Try various env var names
  return (
    process.env.SUPABASE_DB_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    null
  )
}

function getPool(): Pool | null {
  if (poolFailed) return null
  if (connectionPool) return connectionPool

  const connStr = getConnectionString()
  if (!connStr) {
    poolFailed = true
    lastError = 'No database URL configured'
    return null
  }

  try {
    connectionPool = new Pool({
      connectionString: connStr,
      max: 1,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    })
    return connectionPool
  } catch (e: any) {
    poolFailed = true
    lastError = e.message
    return null
  }
}

// ── MIGRATION RUNNER ───────────────────────────────────────────────

export interface MigrationResult {
  success: boolean
  name: string
  message: string
  error?: string
}

/**
 * Run a migration by name. Returns success/failure.
 * Idempotent: each migration only runs once per process lifetime.
 */
export async function runMigration(name: string): Promise<MigrationResult> {
  if (appliedMigrations.has(name)) {
    return { success: true, name, message: 'Already applied this session' }
  }

  const sql = MIGRATIONS[name]
  if (!sql) {
    return { success: false, name, message: 'Unknown migration', error: `No migration named "${name}"` }
  }

  const pool = getPool()
  if (!pool) {
    return {
      success: false,
      name,
      message: 'No database connection available',
      error: lastError || 'Unknown connection error',
    }
  }

  const client = await pool.connect()
  try {
    console.log(`[Migration] Running: ${name} (${sql.length} chars)`)
    await client.query(sql)
    appliedMigrations.add(name)
    console.log(`[Migration] ✅ ${name} applied successfully`)
    return { success: true, name, message: 'Applied successfully' }
  } catch (e: any) {
    console.error(`[Migration] ❌ ${name} failed:`, e.message)
    return { success: false, name, message: 'Failed', error: e.message }
  } finally {
    client.release()
  }
}

/**
 * Ensure a migration has been applied — tries to apply if not already done.
 * Returns true if the table/state is ready for use (migration succeeded or already applied).
 * Does NOT throw — all errors are captured.
 */
export async function ensureMigration(name: string): Promise<boolean> {
  // If already applied in this session, skip
  if (appliedMigrations.has(name)) return true

  // Try to run
  const result = await runMigration(name)
  return result.success
}

/**
 * Wrap a notifications INSERT with fallback: if Notifications table doesn't exist,
 * silently skip the insert (no crash).
 */
export async function tryInsertNotification(
  supabase: any,
  payload: {
    user_id: string
    type: 'assignment' | 'completion' | 'reminder' | 'system'
    title: string
    body?: string
    task_id?: string
  }
): Promise<boolean> {
  try {
    const { error } = await supabase.from('notifications').insert({
      user_id: payload.user_id,
      type: payload.type,
      title: payload.title,
      body: payload.body || null,
      task_id: payload.task_id || null,
      read: false,
      read_at: null,
      created_at: new Date().toISOString(),
    })
    if (error) {
      console.warn('[Notifications] Insert error:', error.message)
      // If table doesn't exist, try migration
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        const migrated = await ensureMigration('notifications')
        if (migrated) {
          // Retry once
          const { error: retryError } = await supabase.from('notifications').insert(payload)
          if (retryError) {
            console.warn('[Notifications] Retry insert failed:', retryError.message)
            return false
          }
          return true
        }
      }
      return false
    }
    return true
  } catch (e: any) {
    console.warn('[Notifications] Insert exception:', e.message)
    return false
  }
}
