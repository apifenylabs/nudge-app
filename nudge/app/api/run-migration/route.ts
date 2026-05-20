/**
 * POST /api/run-migration
 * One-time endpoint: applies database migrations from within Vercel.
 * Uses direct PostgreSQL connection via pg module.
 *
 * Security: Protected by X-Migration-Key header.
 *
 * Usage:
 *   curl -X POST https://nudge-sigma-liart.vercel.app/api/run-migration \
 *     -H "X-Migration-Key: nudge-migrate-2026" \
 *     -H "Content-Type: application/json" \
 *     -d '{"name":"notifications"}'
 *
 * Or for custom SQL:
 *   -d '{"sql":"CREATE TABLE IF NOT EXISTS ..."}'
 */

import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const MIGRATIONS: Record<string, string> = {
  'notifications': `
-- Notifications table (Phase 15.5)
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

-- Create exec_sql utility function for future use
CREATE OR REPLACE FUNCTION public.exec_sql(query text)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  EXECUTE query;
END;
$$;
  `,
}

function getPool(): Pool | null {
  const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
  if (!connectionString) return null

  // Pool with a single connection (for one-shot migrations)
  return new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  })
}

export async function POST(req: NextRequest) {
  try {
    const migrationKey = req.headers.get('x-migration-key')
    const expectedKey = process.env.MIGRATION_KEY || 'nudge-migrate-2026'

    if (migrationKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pool = getPool()
    if (!pool) {
      return NextResponse.json({
        error: 'No DATABASE_URL configured',
        help: 'Set SUPABASE_DB_URL env var: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres',
        or: 'Run this SQL manually in Supabase Dashboard > SQL Editor',
        project: 'yrvnkepndpjmlrewecro',
        sql_preview: MIGRATIONS['notifications'].substring(0, 300) + '...',
      }, { status: 500 })
    }

    const { name, sql: customSql } = await req.json()
    const sqlToRun = customSql || (name ? MIGRATIONS[name] : null)

    if (!sqlToRun) {
      return NextResponse.json({
        error: 'Specify a migration name or provide custom SQL',
        available: Object.keys(MIGRATIONS),
      }, { status: 400 })
    }

    console.log(`[Migration] Executing: ${name || 'custom'} (${sqlToRun.length} chars)`)

    const client = await pool.connect()
    let results: { statement: number; status: string; duration: number; detail?: string }[] = []

    try {
      // Split SQL into individual statements
      // Execute the whole SQL as a single string
      // Individual statement splitting is unnecessary for pg.query()
      console.time('migration-exec')
      await client.query(sqlToRun)
      console.timeEnd('migration-exec')

      results.push({
        statement: 0,
        status: 'success',
        duration: 0,
        detail: `Executed ${sqlToRun.length} chars`,
      })
    } catch (e: any) {
      results.push({
        statement: 0,
        status: 'error',
        duration: 0,
        detail: e.message,
      })
    } finally {
      client.release()
      await pool.end()
    }

    const hasErrors = results.some(r => r.status === 'error')
    return NextResponse.json({
      success: !hasErrors,
      name: name || 'custom',
      results,
      errors: hasErrors ? results.filter(r => r.status === 'error').map(r => r.detail) : undefined,
    })
  } catch (err: any) {
    console.error('[Migration] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    available_migrations: Object.keys(MIGRATIONS),
    note: 'Requires SUPABASE_DB_URL or DATABASE_URL env var to be set.',
    alternative: 'Manually run the SQL in Supabase Dashboard > SQL Editor',
    dashboard_url: 'https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro/sql/new',
  })
}
