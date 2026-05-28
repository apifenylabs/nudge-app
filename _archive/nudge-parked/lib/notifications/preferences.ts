/**
 * Notification Preference Checker
 *
 * Central utility to check whether a user wants a given event type sent
 * over a given channel. All notification dispatch code should use this
 * instead of sending unconditionally.
 */

import { createAdminClient } from '@/lib/supabase/admin'

// ── Types ────────────────────────────────────────────────────────

export type EventType =
  | 'task_assigned'
  | 'task_completed'
  | 'task_due_soon'
  | 'task_overdue'
  | 'family_invite'
  | 'weekly_summary'
  | 'daily_digest'

export type Channel = 'in_app' | 'telegram' | 'email' | 'push'

/**
 * Map from a coarse event name (used in the task-event dispatcher)
 * to the fine-grained event_type stored in notification_preferences.
 */
export const EVENT_TYPE_MAP: Record<string, EventType> = {
  created: 'task_assigned',
  completed: 'task_completed',
  assigned: 'task_assigned',
  due_soon: 'task_due_soon',
  overdue: 'task_overdue',
  family_invite: 'family_invite',
  weekly_summary: 'weekly_summary',
  daily_digest: 'daily_digest',
}

// ── Defaults (mirror the ones in the preferences API) ────────────

const EVENT_TYPES: EventType[] = [
  'task_assigned',
  'task_completed',
  'task_due_soon',
  'task_overdue',
  'family_invite',
  'weekly_summary',
  'daily_digest',
]

const CHANNELS: Channel[] = ['in_app', 'telegram', 'email', 'push']

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

// ── Preference Cache ─────────────────────────────────────────────
// Cache loaded preferences per-user to avoid DB hits on every dispatch.
// Clears after 60 seconds.

interface CacheEntry {
  prefs: Map<string, boolean> // key = "eventType:channel"
  loadedAt: number
}

const preferenceCache = new Map<string, CacheEntry>()
const CACHE_TTL_MS = 60_000

function cacheKey(userId: string, eventType: string, channel: string): string {
  return `${userId}:${eventType}:${channel}`
}

function getDefault(eventType: string, channel: string): boolean {
  const et = eventType as EventType
  if (DEFAULTS[et] && DEFAULTS[et][channel as Channel] !== undefined) {
    return DEFAULTS[et][channel as Channel]!
  }
  return DEFAULT_ENABLED[channel as Channel] ?? true
}

// ── Public API ───────────────────────────────────────────────────

/**
 * Check if a user wants notifications for a given event+channel.
 * Uses defaults if the user has never set preferences.
 *
 * @returns boolean — true means "send this notification"
 */
export async function shouldNotify(
  userId: string,
  eventType: EventType | string,
  channel: Channel
): Promise<boolean> {
  const ck = cacheKey(userId, eventType, channel)

  // Check cache first
  const cached = preferenceCache.get(userId)
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) {
    const val = cached.prefs.get(`${eventType}:${channel}`)
    if (val !== undefined) return val
    return getDefault(eventType, channel)
  }

  // Cache miss — load from DB
  try {
    const supabase = createAdminClient()
    const { data: saved } = await supabase
      .from('notification_preferences')
      .select('event_type, channel, enabled')
      .eq('user_id', userId)

    const prefs = new Map<string, boolean>()
    if (saved) {
      for (const p of saved) {
        prefs.set(`${p.event_type}:${p.channel}`, p.enabled)
      }
    }

    preferenceCache.set(userId, { prefs, loadedAt: Date.now() })

    const val = prefs.get(`${eventType}:${channel}`)
    if (val !== undefined) return val
    return getDefault(eventType, channel)
  } catch (err) {
    console.warn(`[Prefs] Could not load preferences for ${userId}:`, err)
    // On error, use defaults (send notification)
    return getDefault(eventType, channel)
  }
}

/**
 * Bulk check multiple event/channel combinations for a single user.
 * More efficient than calling shouldNotify() repeatedly — only loads preferences once.
 */
export async function getEnabledChannels(
  userId: string,
  eventType: EventType | string
): Promise<Record<Channel, boolean>> {
  const result: Record<Channel, boolean> = {
    in_app: false,
    telegram: false,
    email: false,
    push: false,
  }

  for (const channel of CHANNELS) {
    result[channel] = await shouldNotify(userId, eventType, channel)
  }

  return result
}

/**
 * Clear the preference cache for a specific user (or all users).
 * Call this when a user updates their preferences so the next check
 * reflects the latest settings.
 */
export function clearPreferenceCache(userId?: string): void {
  if (userId) {
    preferenceCache.delete(userId)
  } else {
    preferenceCache.clear()
  }
}

/**
 * Get the default preference for a given event+channel (no DB lookup).
 */
export function getDefaultPreference(eventType: string, channel: string): boolean {
  return getDefault(eventType, channel)
}
