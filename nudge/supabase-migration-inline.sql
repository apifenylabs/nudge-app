-- ============================================================
-- Nudge: Telegram Inline Mode Support (Phase 14)
-- ============================================================
-- Adds:
-- 1. pending_tasks table (for follow-up task creation flow)
-- 2. inline_queries table (tracking inline mode usage)
-- 3. telegram_messages table (if not exists)

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
