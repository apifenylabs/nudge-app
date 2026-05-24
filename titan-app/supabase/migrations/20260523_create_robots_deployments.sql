-- Migration: Create robots_deployments table for Phase 6c Robotics Backend
-- Timestamp: 2026-05-23

create table if not exists public.robots_deployments (
  id          uuid primary key default gen_random_uuid(),
  platform    text not null check (platform in ('ros2', 'arduino', 'raspberry-pi', 'custom')),
  agent_id    text not null,
  agent_name  text not null default '',
  status      text not null default 'pending' check (status in ('pending', 'active', 'error', 'disconnected')),
  endpoint    text,
  deployed_at timestamptz not null default now(),
  last_heartbeat timestamptz not null default now(),
  config      jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Indexes
create index if not exists idx_robots_deployments_agent_id on public.robots_deployments(agent_id);
create index if not exists idx_robots_deployments_status on public.robots_deployments(status);
create index if not exists idx_robots_deployments_platform on public.robots_deployments(platform);

-- Row-Level Security
alter table public.robots_deployments enable row level security;

-- Default policies: allow all authenticated users (adjust for production)
create policy "Enable all for authenticated users" on public.robots_deployments
  for all
  to authenticated
  using (true)
  with check (true);

-- Allow service_role / anon access for API routes
create policy "Enable all for service_role" on public.robots_deployments
  for all
  to service_role
  using (true)
  with check (true);

create policy "Enable all for anon" on public.robots_deployments
  for all
  to anon
  using (true)
  with check (true);

-- Trigger to auto-update updated_at
create or replace function public.update_robots_deployments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_robots_deployments_updated_at on public.robots_deployments;
create trigger trg_robots_deployments_updated_at
  before update on public.robots_deployments
  for each row
  execute function public.update_robots_deployments_updated_at();
