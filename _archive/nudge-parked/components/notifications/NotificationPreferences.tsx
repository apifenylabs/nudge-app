'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Bell,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle,
  Loader2,
  Info,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Send,
} from 'lucide-react'

// ── TYPES ───────────────────────────────────────────────────────

type EventType =
  | 'task_assigned'
  | 'task_completed'
  | 'task_due_soon'
  | 'task_overdue'
  | 'family_invite'
  | 'weekly_summary'
  | 'daily_digest'

type Channel = 'in_app' | 'telegram' | 'email' | 'push'

interface Preference {
  eventType: EventType
  channel: Channel
  enabled: boolean
}

// ── DISPLAY CONFIG ──────────────────────────────────────────────

const EVENT_LABELS: Record<EventType, { label: string; desc: string; icon: string }> = {
  task_assigned:   { label: 'Task Assigned',    desc: 'When someone assigns a task to you',          icon: '📋' },
  task_completed:  { label: 'Task Completed',   desc: 'When someone completes your task',           icon: '✅' },
  task_due_soon:   { label: 'Due Soon',         desc: 'When a task is due within 2 hours',          icon: '⏰' },
  task_overdue:    { label: 'Overdue',          desc: 'When a task has passed its due date',         icon: '🔴' },
  family_invite:   { label: 'Family Invite',    desc: 'When invited to a new family group',          icon: '👋' },
  weekly_summary:  { label: 'Weekly Summary',   desc: 'End-of-week task completion recap',           icon: '📊' },
  daily_digest:    { label: 'Daily Digest',     desc: 'Morning summary of today\'s tasks',           icon: '🌅' },
}

const CHANNEL_ICONS: Record<Channel, { icon: typeof Bell; label: string }> = {
  in_app:   { icon: Bell,        label: 'In-App' },
  telegram: { icon: MessageSquare, label: 'Telegram' },
  email:    { icon: Mail,        label: 'Email' },
  push:     { icon: Smartphone,   label: 'Push' },
}

// ── COMPONENT ───────────────────────────────────────────────────

interface NotificationPreferencesProps {
  userId: string
}

export default function NotificationPreferences({ userId }: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState<Preference[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [error, setError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [expandedEvents, setExpandedEvents] = useState<Set<EventType>>(new Set())
  const [batchSaving, setBatchSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [sendingTest, setSendingTest] = useState<Record<string, boolean>>({})
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; detail: string }>>({})

  // Fetch preferences on mount
  const fetchPreferences = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/notifications/preferences?userId=${userId}`)
      const data = await res.json()
      if (data.success) {
        setPreferences(data.preferences)
        // Auto-expand events that have something toggled off
        const disabled = new Set<EventType>()
        for (const pref of data.preferences) {
          if (!pref.enabled) {
            disabled.add(pref.eventType)
          }
        }
        setExpandedEvents(disabled)
      } else {
        setError('Failed to load preferences')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load preferences')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchPreferences()
  }, [fetchPreferences])

  // Toggle a single preference
  const togglePref = useCallback(
    async (eventType: EventType, channel: Channel, newValue: boolean) => {
      const key = `${eventType}:${channel}`
      setSaving((prev) => ({ ...prev, [key]: true }))
      setSaveError('')

      // Optimistic update
      setPreferences((prev) =>
        prev.map((p) =>
          p.eventType === eventType && p.channel === channel
            ? { ...p, enabled: newValue }
            : p
        )
      )

      try {
        const res = await fetch('/api/notifications/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            preferences: [{ eventType, channel, enabled: newValue }],
          }),
        })
        const data = await res.json()
        if (!data.success) {
          // Revert on failure
          setPreferences((prev) =>
            prev.map((p) =>
              p.eventType === eventType && p.channel === channel
                ? { ...p, enabled: !newValue }
                : p
            )
          )
          setSaveError('Failed to save preference')
        }
        setLastSaved(new Date())
      } catch (err: any) {
        // Revert on failure
        setPreferences((prev) =>
          prev.map((p) =>
            p.eventType === eventType && p.channel === channel
              ? { ...p, enabled: !newValue }
              : p
          )
        )
        setSaveError(err.message || 'Failed to save')
      } finally {
        setSaving((prev) => ({ ...prev, [key]: false }))
      }
    },
    [userId]
  )

  // Reset all to defaults
  const resetToDefaults = useCallback(async () => {
    setBatchSaving(true)
    setSaveError('')
    try {
      const res = await fetch('/api/notifications/preferences/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const data = await res.json()
      if (data.success) {
        setPreferences(data.preferences)
        setExpandedEvents(new Set())
        setLastSaved(new Date())
      } else {
        setSaveError('Failed to reset preferences')
      }
    } catch (err: any) {
      setSaveError(err.message || 'Failed to reset')
    } finally {
      setBatchSaving(false)
    }
  }, [userId])

  // Send a test notification for a channel
  const sendTest = useCallback(async (channel: Channel) => {
    setSendingTest((prev) => ({ ...prev, [channel]: true }))
    setTestResults((prev) => {
      const next = { ...prev }
      delete next[channel]
      return next
    })
    try {
      const res = await fetch('/api/notifications/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, channel }),
      })
      const data = await res.json()
      setTestResults((prev) => ({
        ...prev,
        [channel]: { success: data.success, detail: data.detail || data.error || 'Sent!' },
      }))
    } catch (err: any) {
      setTestResults((prev) => ({
        ...prev,
        [channel]: { success: false, detail: err.message || 'Request failed' },
      }))
    } finally {
      setSendingTest((prev) => ({ ...prev, [channel]: false }))
    }
  }, [userId])

  // Get preference value
  const getPref = (eventType: EventType, channel: Channel): boolean => {
    const pref = preferences.find(
      (p) => p.eventType === eventType && p.channel === channel
    )
    return pref?.enabled ?? true
  }

  const toggleEventExpanded = (eventType: EventType) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev)
      if (next.has(eventType)) {
        next.delete(eventType)
      } else {
        next.add(eventType)
      }
      return next
    })
  }

  // ── LOADING STATE ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading preferences...</span>
      </div>
    )
  }

  // ── ERROR STATE ───────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <AlertTriangle className="w-8 h-8 text-amber-500" />
        <p className="text-sm text-muted-foreground">{error}</p>
        <button
          onClick={fetchPreferences}
          className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    )
  }

  // ── MAIN UI ───────────────────────────────────────────────────
  const eventTypes: EventType[] = [
    'task_assigned',
    'task_completed',
    'task_due_soon',
    'task_overdue',
    'family_invite',
    'weekly_summary',
    'daily_digest',
  ]

  // Available test channels (exclude push for now)
  const testChannels: Channel[] = ['in_app', 'telegram', 'email']

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Choose how you receive each type of notification
        </p>
        <button
          onClick={resetToDefaults}
          disabled={batchSaving}
          className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors disabled:opacity-50"
        >
          {batchSaving ? 'Resetting...' : 'Reset to defaults'}
        </button>
      </div>

      {/* Test results banner */}
      {Object.keys(testResults).length > 0 && (
        <div className="space-y-1.5">
          {Object.entries(testResults).map(([ch, res]) => (
            <div
              key={ch}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                res.success
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                  : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
              }`}
            >
              {res.success ? (
                <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              )}
              <span>{res.detail}</span>
            </div>
          ))}
        </div>
      )}

      {/* Save error banner */}
      {saveError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <Info className="w-3 h-3 flex-shrink-0" />
          {saveError}
        </div>
      )}

      {/* Channel header row (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-[1fr_repeat(4,56px)] md:gap-2 md:px-4 md:mb-1">
        <div />
        {(['in_app', 'telegram', 'email', 'push'] as Channel[]).map((channel) => {
          const ChanIcon = CHANNEL_ICONS[channel].icon
          return (
            <div key={channel} className="flex flex-col items-center gap-0.5">
              <ChanIcon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {CHANNEL_ICONS[channel].label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Event rows */}
      <div className="divide-y divide-border/40 rounded-2xl overflow-hidden glass-card">
        {eventTypes.map((eventType) => {
          const info = EVENT_LABELS[eventType]
          const isExpanded = expandedEvents.has(eventType)
          const allOn =
            (['in_app', 'telegram', 'email', 'push'] as Channel[]).every(
              (ch) => getPref(eventType, ch)
            )

          return (
            <div key={eventType} className="transition-colors">
              {/* Event header row — always visible */}
              <button
                onClick={() => toggleEventExpanded(eventType)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base flex-shrink-0">{info.icon}</span>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {info.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                      {info.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Channel indicators (mobile: show on left, desktop: hidden — shown in expanded grid) */}
                  <div className="flex items-center gap-1 md:hidden">
                    {(['in_app', 'telegram', 'email'] as Channel[]).map((ch) => {
                      const enabled = getPref(eventType, ch)
                      const ChanIcon = CHANNEL_ICONS[ch].icon
                      return (
                        <span
                          key={ch}
                          className={`p-1 rounded-md transition-colors ${
                            enabled
                              ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'text-muted-foreground/30 bg-muted/20'
                          }`}
                        >
                          <ChanIcon className="w-3 h-3" />
                        </span>
                      )
                    })}
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Desktop channel toggles — visible inline */}
              <div
                className={`${
                  isExpanded ? 'max-h-80' : 'max-h-0'
                } overflow-hidden transition-all duration-200`}
              >
                <div className="px-4 pb-3 pt-0">
                  {/* Mobile channel labels (shown in expanded) */}
                  <p className="text-xs text-muted-foreground mb-2 md:hidden">
                    {info.desc}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['in_app', 'telegram', 'email', 'push'] as Channel[]).map(
                      (channel) => {
                        const enabled = getPref(eventType, channel)
                        const key = `${eventType}:${channel}`
                        const isSaving = saving[key] || false
                        const ChanIcon = CHANNEL_ICONS[channel].icon

                        return (
                          <button
                            key={channel}
                            onClick={() => togglePref(eventType, channel, !enabled)}
                            disabled={isSaving}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                              enabled
                                ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                : 'border-border text-muted-foreground hover:border-muted-foreground/30'
                            } disabled:opacity-50`}
                          >
                            {isSaving ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
                            ) : (
                              <ChanIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            )}
                            <span className="truncate">
                              {CHANNEL_ICONS[channel].label}
                            </span>
                          </button>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Test notification buttons */}
      <div className="pt-1">
        <p className="text-xs text-muted-foreground mb-2">
          Test your notification setup
        </p>
        <div className="flex flex-wrap gap-2">
          {testChannels.map((channel) => {
            const ChanIcon = CHANNEL_ICONS[channel].icon
            const isSending = sendingTest[channel] || false
            const result = testResults[channel]
            return (
              <button
                key={channel}
                onClick={() => sendTest(channel)}
                disabled={isSending}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  result?.success
                    ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : result && !result.success
                    ? 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/30'
                } disabled:opacity-50`}
              >
                {isSending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                Test {CHANNEL_ICONS[channel].label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Last saved indicator */}
      {lastSaved && (
        <p className="text-[10px] text-muted-foreground/60 text-center pt-1">
          Last saved {lastSaved.toLocaleTimeString()}
        </p>
      )}
    </div>
  )
}
