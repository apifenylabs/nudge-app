# Nudge Salvage — Key Components Saved May 28, 2026

## What's here (reusable for LifeOS or any agent project)

### Telegram Integration (fully working)
- `app/api/telegram/webhook/` — incoming webhook handler
- `app/api/telegram/followup/` — clarifying follow-up flow
- `app/api/telegram/connect/` — user linking
- `app/api/telegram/inline/` — inline queries

### Notification Pipeline
- `app/api/notifications/` — CRUD, preferences, test, check-reminders
- `lib/notifications/` — preference logic & types

### Task Engine
- `app/api/tasks/` — create, parse, list, complete, update, delete, batch
- `lib/task-memory.ts` — memory-backed task tracking
- `lib/recurrence.ts` — recurring task pattern parser
- `lib/nlp-parser.ts` — natural language task input

### Email
- `app/api/email/send-reminder/`
- `lib/email/` — config, templates, send

### Life Check-in
- `lib/life-checkin/` — trackers, storage (closest to LifeOS DNA)

### Supabase
- `lib/supabase/` — client, server, admin, migrate, types
- `supabase-schema.sql` — full schema (users, families, tasks, etc.)

### Offline
- `lib/offline-queue.ts` — offline fallback queue

## What was NOT saved
- Stripe/billing code — too coupled to Nudge's specific subscription model
- Dashboard pages — UI is Nudge-specific
- Onboarding flow — same reason
- Auth pages — same

## Source
https://github.com/apifenylabs/nudge-app (PARKED)
Nudge production: deleted from Vercel 2026-05-28
