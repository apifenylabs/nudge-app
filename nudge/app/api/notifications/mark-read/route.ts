/**
 * POST /api/notifications/mark-read
 * Marks one or all notifications as read for the specified user.
 *
 * Body: { userId: string, notificationId?: string }
 * - If notificationId is provided, marks only that notification as read.
 * - If notificationId is omitted, marks ALL unread notifications for that user as read.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'

export async function POST(req: NextRequest) {
  try {
    const { userId, notificationId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Ensure table exists before mutating
    await ensureMigration('notifications')

    let query = supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .is('read', false)

    if (notificationId) {
      query = query.eq('id', notificationId)
    }

    const { error } = await query

    if (error) {
      console.error('[Mark Read] Error:', error)
      return NextResponse.json({ error: 'Failed to mark notifications as read' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[Mark Read] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
