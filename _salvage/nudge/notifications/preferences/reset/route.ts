/**
 * POST /api/notifications/preferences/reset
 * Resets all notification preferences for a user to defaults.
 * Deletes all saved preferences for the user, then the GET endpoint
 * naturally returns defaults.
 *
 * Body: { userId: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'
import { clearPreferenceCache } from '@/lib/notifications/preferences'

// ── DEFAULT PREFERENCES (must match preferences/route.ts) ───────

const EVENT_TYPES = [
  'task_assigned',
  'task_completed',
  'task_due_soon',
  'task_overdue',
  'family_invite',
  'weekly_summary',
  'daily_digest',
] as const

const CHANNELS = ['in_app', 'telegram', 'email', 'push'] as const

type EventType = (typeof EVENT_TYPES)[number]
type Channel = (typeof CHANNELS)[number]

const DEFAULTS: Record<EventType, Partial<Record<Channel, boolean>>> = {
  task_assigned:   { in_app: true, telegram: true, email: false, push: false },
  task_completed:  { in_app: true, telegram: true, email: false, push: false },
  task_due_soon:   { in_app: true, telegram: true, email: true, push: true },
  task_overdue:    { in_app: true, telegram: true, email: true, push: true },
  family_invite:   { in_app: true, telegram: true, email: true, push: false },
  weekly_summary:  { in_app: true, telegram: false, email: true, push: false },
  daily_digest:    { in_app: true, telegram: false, email: false, push: false },
}

const DEFAULT_ENABLED: Record<Channel, boolean> = {
  in_app: true,
  telegram: true,
  email: false,
  push: false,
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = createAdminClient()
    await ensureMigration('notification_preferences')

    // Delete all saved preferences for this user
    const { error: deleteError } = await supabase
      .from('notification_preferences')
      .delete()
      .eq('user_id', userId)

    if (deleteError) {
      console.error('[Preferences Reset] Error:', deleteError)
      return NextResponse.json({ error: 'Failed to reset preferences' }, { status: 500 })
    }

    // Clear in-memory cache so notifications use defaults again
    clearPreferenceCache(userId)

    // Return the default preferences (so the client can update its state)
    const defaults = []
    for (const eventType of EVENT_TYPES) {
      for (const channel of CHANNELS) {
        const enabled =
          DEFAULTS[eventType][channel] ?? DEFAULT_ENABLED[channel]
        defaults.push({ eventType, channel, enabled })
      }
    }

    return NextResponse.json({
      success: true,
      preferences: defaults,
      message: 'Preferences reset to defaults',
    })
  } catch (err: any) {
    console.error('[Preferences Reset] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
