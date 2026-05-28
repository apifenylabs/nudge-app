-- ============================================================
-- Nudge: Soft-delete support for tasks (Phase 15)
-- ============================================================
-- Adds deleted_at column to tasks table for soft-deletion,
-- so tasks can be restored (undo) after deletion.

ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

-- Index for filtering out deleted tasks
CREATE INDEX IF NOT EXISTS idx_tasks_deleted_at ON tasks(deleted_at);
