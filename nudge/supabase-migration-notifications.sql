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
