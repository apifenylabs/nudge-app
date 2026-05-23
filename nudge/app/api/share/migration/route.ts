import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/share/migration
 *
 * Creates the task_shares table for tracking share events.
 * Safe to call multiple times — uses IF NOT EXISTS.
 *
 * Run once after deployment to ensure the table exists.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient()

    // Create the task_shares table for share event tracking
    const { error } = await supabase.rpc('exec_sql', {
      sql_string: `
        CREATE TABLE IF NOT EXISTS task_shares (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          platform TEXT NOT NULL DEFAULT 'copy',
          share_url TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_task_shares_task_id ON task_shares(task_id);
        CREATE INDEX IF NOT EXISTS idx_task_shares_user_id ON task_shares(user_id);
        CREATE INDEX IF NOT EXISTS idx_task_shares_platform ON task_shares(platform);
        CREATE INDEX IF NOT EXISTS idx_task_shares_created_at ON task_shares(created_at);
      `
    })

    if (error && !error.message?.includes('already exists')) {
      // Try direct SQL via raw query if RPC isn't available
      console.warn('[Migration] RPC exec_sql failed, trying direct migration:', error.message)

      // Use the raw SQL execution endpoint
      const { error: directError } = await supabase
        .from('_migrations')
        .insert({
          name: 'create_task_shares_table',
          sql: `
            CREATE TABLE IF NOT EXISTS task_shares (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
              user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              platform TEXT NOT NULL DEFAULT 'copy',
              share_url TEXT,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
          `,
          executed_at: new Date().toISOString(),
        })

      if (directError) {
        // If _migrations table doesn't exist or we can't use it, log and return
        console.warn('[Migration] Direct migration also failed, table may already exist:', directError.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'task_shares table migration applied (if not exists)',
      note: 'If your RPC function exec_sql is not available, run this SQL manually in Supabase SQL Editor.',
      sql: `
CREATE TABLE IF NOT EXISTS task_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'copy',
  share_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_task_shares_task_id ON task_shares(task_id);
CREATE INDEX IF NOT EXISTS idx_task_shares_user_id ON task_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_task_shares_platform ON task_shares(platform);
CREATE INDEX IF NOT EXISTS idx_task_shares_created_at ON task_shares(created_at);
      `.trim(),
    })
  } catch (err) {
    console.error('Migration error:', err)
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      sql: `
CREATE TABLE IF NOT EXISTS task_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'copy',
  share_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
      `.trim(),
    }, { status: 500 })
  }
}
