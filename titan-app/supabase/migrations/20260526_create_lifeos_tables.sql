-- LifeOS Plugin State
create table if not exists lifeos_plugins (
  id text primary key,
  user_id text not null default 'demo',
  category text not null,
  name text not null,
  emoji text default '🧩',
  description text default '',
  color text default '#14B8A6',
  state jsonb default '{"phases":[]}'::jsonb,
  total_actions integer default 0,
  overall_progress real default 0,
  last_active_at timestamptz default now(),
  created_at timestamptz default now()
);

create index if not exists idx_lifeos_plugins_user on lifeos_plugins(user_id);

-- LifeOS Action / XP Log
create table if not exists lifeos_actions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default 'demo',
  plugin_id text references lifeos_plugins(id) on delete cascade,
  category text not null,
  action_type text not null default 'complete_task',
  task_label text not null,
  phase_name text,
  xp_earned integer default 10,
  created_at timestamptz default now()
);

create index if not exists idx_lifeos_actions_user on lifeos_actions(user_id);
create index if not exists idx_lifeos_actions_plugin on lifeos_actions(plugin_id);
create index if not exists idx_lifeos_actions_created on lifeos_actions(created_at desc);

-- Enable RLS (default deny)
alter table lifeos_plugins enable row level security;
alter table lifeos_actions enable row level security;

-- ─── Auth-aware RLS Policies ───────────────────────────────────────
-- Users can only read/write their own records.
-- Falls back to auth.uid() for Supabase Auth users.
-- `user_id` defaults to 'anonymous' but is set by middleware/auth context.

-- LifeOS Plugins: user-owned access
create policy "Users can read own plugins"
  on lifeos_plugins for select
  using (user_id = coalesce(auth.uid()::text, 'anonymous'));

create policy "Users can create own plugins"
  on lifeos_plugins for insert
  with check (user_id = coalesce(auth.uid()::text, 'anonymous'));

create policy "Users can update own plugins"
  on lifeos_plugins for update
  using (user_id = coalesce(auth.uid()::text, 'anonymous'));

create policy "Users can delete own plugins"
  on lifeos_plugins for delete
  using (user_id = coalesce(auth.uid()::text, 'anonymous'));

-- LifeOS Actions: user-owned access
create policy "Users can read own actions"
  on lifeos_actions for select
  using (user_id = coalesce(auth.uid()::text, 'anonymous'));

create policy "Users can create own actions"
  on lifeos_actions for insert
  with check (user_id = coalesce(auth.uid()::text, 'anonymous'));

-- ─── Waitlist Table ─────────────────────────────────────────────────
create table if not exists lifeos_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  reason text,
  referrer text default 'direct',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  invited_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_lifeos_waitlist_email on lifeos_waitlist(email);
create index if not exists idx_lifeos_waitlist_status on lifeos_waitlist(status);

alter table lifeos_waitlist enable row level security;

-- Everyone can insert to waitlist (public signup)
create policy "Anyone can join waitlist"
  on lifeos_waitlist for insert
  with check (true);

-- Only authenticated users can read waitlist status
create policy "Users can check own waitlist status"
  on lifeos_waitlist for select
  using (auth.email() = email);
