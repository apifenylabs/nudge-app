/**
 * GET/POST /api/notifications/preferences
 *
 * GET: Returns user's notification preferences. Returns defaults for any
 *      missing preferences so the frontend always has a complete set.
 *
 * POST: Save one or more notification preference toggles.
 *
 * Body (POST): {
 *   userId: string
 *   preferences: Array<{
 *     eventType: 'task_assigned' | 'task_completed' | 'task_due_soon' | 'task_overdue' | 'family_invite' | 'weekly_summary' | 'daily_digest'
 *     channel: 'in_app' | 'telegram' | 'email' | 'push'
 *     enabled: boolean
 *   }>
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'
import { clearPreferenceCache } from '@/lib/notifications/preferences'

// ── DEFAULT PREFERENCES ─────────────────────────────────────────
// These defaults are applied when no saved preference exists for a
// given (event_type, channel) combination.

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
  daily_digest:    { in_app: true, telegram: false, email: true, push: false },
}

const DEFAULT_ENABLED: Record<Channel, boolean> = {
  in_app: true,
  telegram: true,
  email: false,
  push: false,
}

// ── HELPERS ──────────────────────────────────────────────────────

function generateDefaults(): Array<{
  eventType: EventType
  channel: Channel
  enabled: boolean
}> {
  const prefs: Array<{ eventType: EventType; channel: Channel; enabled: boolean }> = []
  for (const eventType of EVENT_TYPES) {
    for (const channel of CHANNELS) {
      const enabled =
        DEFAULTS[eventType][channel] ?? DEFAULT_ENABLED[channel]
      prefs.push({ eventType, channel, enabled })
    }
  }
  return prefs
}

function mergeWithDefaults(
  saved: Array<{
    event_type: string
    channel: string
    enabled: boolean
  }>
): Array<{ eventType: EventType; channel: Channel; enabled: boolean }> {
  const defaults = generateDefaults()
  const savedMap = new Map(
    saved.map((p) => [`${p.event_type}:${p.channel}`, p.enabled])
  )

  return defaults.map((d) => ({
    ...d,
    enabled: savedMap.get(`${d.eventType}:${d.channel}`) ?? d.enabled,
  }))
}

// ── GET ─────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId query param' }, { status: 400 })
    }

    const supabase = createAdminClient()
    await ensureMigration('notification_preferences')

    // Fetch saved preferences
    const { data: saved, error } = await supabase
      .from('notification_preferences')
      .select('event_type, channel, enabled')
      .eq('user_id', userId)

    if (error && !error.message?.includes('does not exist')) {
      console.error('[Notification Preferences GET] Error:', error)
      return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 })
    }

    // Merge saved with defaults — client always gets a complete set
    const preferences = mergeWithDefaults(saved || [])

    return NextResponse.json({ success: true, preferences })
  } catch (err: any) {
    console.error('[Notification Preferences GET] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── POST ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { userId, preferences } = await req.json()

    if (!userId || !Array.isArray(preferences) || preferences.length === 0) {
      return NextResponse.json(
        { error: 'Missing userId or preferences array' },
        { status: 400 }
      )
    }

    // Validate each preference
    for (const pref of preferences) {
      if (!EVENT_TYPES.includes(pref.eventType)) {
        return NextResponse.json(
          { error: `Invalid eventType: ${pref.eventType}` },
          { status: 400 }
        )
      }
      if (!CHANNELS.includes(pref.channel)) {
        return NextResponse.json(
          { error: `Invalid channel: ${pref.channel}` },
          { status: 400 }
        )
      }
      if (typeof pref.enabled !== 'boolean') {
        return NextResponse.json(
          { error: 'enabled must be a boolean' },
          { status: 400 }
        )
      }
    }

    const supabase = createAdminClient()
    await ensureMigration('notification_preferences')

    // Upsert each preference using the unique constraint
    const errors: string[] = []
    for (const pref of preferences) {
      const { error } = await supabase.from('notification_preferences').upsert(
        {
          user_id: userId,
          event_type: pref.eventType,
          channel: pref.channel,
          enabled: pref.enabled,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id, event_type, channel',
          ignoreDuplicates: false,
        }
      )
      if (error) {
        console.warn('[Notification Preferences POST] Upsert error:', error.message)
        errors.push(`${pref.eventType}:${pref.channel} — ${error.message}`)
      }
    }

    // Clear in-memory cache so the next notification respects the new settings
    clearPreferenceCache(userId)

    return NextResponse.json({
      success: errors.length === 0,
      saved: preferences.length - errors.length,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (err: any) {
    console.error('[Notification Preferences POST] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
