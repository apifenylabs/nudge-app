'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { TRACKERS, type TrackerDef } from '@/lib/life-checkin/trackers'
import {
  getToday,
  getRelativeDate,
  formatDateLabel,
  getScore,
  computeStreak,
  loadDayFromStorage,
  saveDayEntry,
  loadFromSupabase,
  syncDayToSupabase,
  loadFromLocalStorage,
  type DayEntry,
  type LifeCheckinData,
} from '@/lib/life-checkin/storage'

interface DailyCheckinProps {
  userId?: string
  familyId?: string
}

export default function DailyCheckin({ userId }: DailyCheckinProps) {
  const today = getToday()
  const [selectedDate, setSelectedDate] = useState(today)
  const [data, setData] = useState<LifeCheckinData>({ days: {} })
  const [values, setValues] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)
  const [loadingSupabase, setLoadingSupabase] = useState(false)

  // Load data on mount — merge localStorage + Supabase
  useEffect(() => {
    const local = loadFromLocalStorage()

    if (userId) {
      setLoadingSupabase(true)
      loadFromSupabase(userId).then((remote) => {
        if (remote && remote.days) {
          // Merge: localStorage (latest writes) takes precedence for today,
          // but Supabase fills in missing days
          const merged: Record<string, DayEntry> = { ...(remote.days || {}) }
          for (const [key, val] of Object.entries(local.days || {})) {
            merged[key] = val
          }
          setData({ days: merged })
        } else {
          setData(local)
        }
        setLoadingSupabase(false)
      })
    } else {
      setData(local)
    }
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  // When selected date changes, populate values
  useEffect(() => {
    const entry = data.days?.[selectedDate] || {}
    const init: Record<string, number> = {}
    TRACKERS.forEach((tk) => {
      init[tk.id] = entry[tk.id as keyof DayEntry] !== undefined
        ? (entry[tk.id as keyof DayEntry] as number)
        : tk.def
    })
    setValues(init)
    setNotes(entry.notes || '')
    setSaved(false)
  }, [selectedDate, data])

  const hasChanges = useCallback(() => {
    const entry = data.days?.[selectedDate] || {}
    return TRACKERS.some(
      (tk) =>
        values[tk.id] !==
        (entry[tk.id as keyof DayEntry] !== undefined
          ? entry[tk.id as keyof DayEntry]
          : tk.def)
    ) || notes !== (entry.notes || '')
  }, [values, notes, data.days, selectedDate])

  const handleSave = useCallback(() => {
    const newEntry: DayEntry = { ...values, notes } as DayEntry
    const updated = saveDayEntry(selectedDate, newEntry)
    setData(updated)
    setSaved(true)
    // Fire-and-forget Supabase sync
    if (userId) {
      syncDayToSupabase(selectedDate, newEntry, userId)
    }
  }, [values, notes, selectedDate, userId])

  const goYesterday = () => setSelectedDate(getRelativeDate(selectedDate, -1))
  const goTomorrow = () => {
    const next = getRelativeDate(selectedDate, 1)
    if (next <= today) setSelectedDate(next)
  }

  const canSave = hasChanges()
  const score = getScore(data.days?.[selectedDate])
  const streak = computeStreak(data.days || {})
  const isToday = selectedDate === today
  const canGoForward = selectedDate < today

  // Compact view: last 7 scores
  const recentDays = Object.entries(data.days || {})
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7)

  return (
    <div className="space-y-4">
      {/* Header: streak + score preview */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Daily Check-in</h3>
          {streak > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              🔥 {streak} day{streak !== 1 ? 's' : ''} streak
            </p>
          )}
        </div>
        {recentDays.length > 0 && (
          <div className="text-right">
            <span className="text-sm font-semibold text-foreground">
              Today: <span className={score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'}>{score}%</span>
            </span>
          </div>
        )}
      </div>

      {/* Date navigation */}
      <div className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2">
        <button onClick={goYesterday} className="btn-ghost p-1" aria-label="Previous day">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">{formatDateLabel(selectedDate)}</span>
        <button
          onClick={goTomorrow}
          className={`btn-ghost p-1 ${canGoForward ? '' : 'opacity-40 cursor-not-allowed'}`}
          disabled={!canGoForward}
          aria-label="Next day"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Loading indicator for Supabase */}
      {loadingSupabase && (
        <p className="text-xs text-muted-foreground text-center">Syncing...</p>
      )}

      {isToday && (
        <p className="text-xs text-muted-foreground text-center -mt-2">
          {data.days?.[today] ? '✓ Already checked in today — update below' : 'How was your day?'}
        </p>
      )}

      {/* Tracker grid */}
      <div className="grid gap-2">
        {TRACKERS.map((tk) => (
          <TrackerRow
            key={tk.id}
            tracker={tk}
            value={values[tk.id] ?? tk.def}
            onChange={(v) => {
              setValues((prev) => ({ ...prev, [tk.id]: v }))
              setSaved(false)
            }}
          />
        ))}
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1">
          Notes / Reflect
        </label>
        <textarea
          className="input-field resize-none h-20 text-sm"
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setSaved(false) }}
          placeholder="What went well? What to improve?"
          maxLength={1000}
        />
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!canSave}
        className={`btn-primary w-full flex items-center justify-center gap-2 text-sm ${
          !canSave ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Check className="w-4 h-4" />
        {saved && !canSave ? 'Saved ✓' : 'Save Check-in'}
      </button>

      {/* Recent scores strip */}
      {recentDays.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Recent
          </h4>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {recentDays.map(([d, entry]) => {
              const s = getScore(entry)
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    d === selectedDate
                      ? 'bg-primary text-primary-foreground border-primary'
                      : s >= 80
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : s >= 50
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  <span className="block leading-none">{s}%</span>
                  <span className="block text-[9px] opacity-70 mt-0.5">
                    {formatDateLabel(d)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function TrackerRow({
  tracker,
  value,
  onChange,
}: {
  tracker: TrackerDef
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-2 bg-muted/30 rounded-xl px-3 py-2.5">
      <span className="text-sm font-medium text-foreground flex-shrink-0 w-28 truncate">
        {tracker.label}
      </span>
      <div className="flex gap-1 flex-wrap justify-end">
        {tracker.options.map((o) => {
          const active = o.v === value
          return (
            <button
              key={o.v}
              onClick={() => onChange(o.v)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {o.l}
            </button>
          )
        })}
      </div>
    </div>
  )
}
