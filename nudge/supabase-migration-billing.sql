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
