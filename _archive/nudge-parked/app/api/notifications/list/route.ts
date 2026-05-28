/**
 * GET /api/notifications/list
 * Returns unread notifications for the specified user.
 * Notifications are created by other parts of the system (task creation, completion, etc.)
 *
 * Query params: userId (required), limit (optional, default 20)
 *
 * GET /api/notifications/list?userId=xxx&limit=5
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId query param' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Try to fetch notifications — if table doesn't exist, run migration
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      // If table doesn't exist, try migration and return empty
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        console.log('[Notifications List] Table missing, attempting migration...')
        await ensureMigration('notifications')
        return NextResponse.json({
          success: true,
          notifications: [],
          migrated: true,
        })
      }
      console.error('[Notifications List] Error:', error)
      return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      notifications: notifications || [],
    })
  } catch (err: any) {
    console.error('[Notifications List] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
