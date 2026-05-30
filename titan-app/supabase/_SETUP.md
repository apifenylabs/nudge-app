# LifeOS Supabase Setup

## 1. Create the tables

1. Go to https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro/sql/new
2. Open `migrations/20260526_create_lifeos_tables.sql`
3. Copy entire file → paste → **Run** (Ctrl+Enter)

## 2. Get API keys

In Supabase Dashboard:
- **Project Settings → API** → Copy `Project URL` + `anon public key`
- Add to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://yrvnkepndpjmlrewecro.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

## 3. The migration covers:

### lifeos_plugins table
- One row per plugin (health, finance, travel, etc.)
- Full JSONB state for phases, tasks, progress
- `overall_progress` as REAL (0-100)

### lifeos_actions table
- Every task completion logged with XP
- Foreign key to plugin with CASCADE delete

### lifeos_waitlist table
- Public signup (no auth required to insert)
- Users can check own status by email

### RLS
- Authenticated users see only their own data
- Waitlist: anyone can insert, only matching email can read
- Uses `auth.uid()` and `auth.email()` from Supabase Auth
- Falls back to `'anonymous'` when no auth (for MVP)

## 4. Verify

Run this in SQL Editor after migration:

```sql
SELECT * FROM lifeos_plugins LIMIT 5;
SELECT * FROM lifeos_actions LIMIT 5;
SELECT * FROM lifeos_waitlist LIMIT 5;
```
