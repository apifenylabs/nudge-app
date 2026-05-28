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
