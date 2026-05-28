'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Mic, Check, ArrowRight, Sparkles, User, Calendar, AlertCircle } from 'lucide-react'

const QUICK_SUGGESTIONS = [
  'Remind Jake to take out trash tonight',
  'Pick up milk and eggs after work',
  'Sarah has soccer practice at 4pm tomorrow',
  'Mom — doctor appointment at 10am on Friday',
  'Water the plants every morning',
  'Vacuum the living room this weekend',
]

// Enhanced suggestions with varied patterns
const MORE_SUGGESTIONS = [
  '@Jake take out trash at 8pm',
  '@Sarah study math every weekday',
  'Grocery shopping on Saturday morning',
  'Dad — call dentist at 2pm tomorrow',
]

// Simple NLP parser for task input
interface ParsedTaskInfo {
  assignee: string | null
  dueDate: string | null
  time: string | null
  isRecurring: boolean
  recurrencePattern: string | null
  priority: string | null
  cleanTitle: string
}

function parseTaskInput(text: string): ParsedTaskInfo {
  let clean = text.trim()
  let assignee: string | null = null
  let dueDate: string | null = null
  let time: string | null = null
  let isRecurring = false
  let recurrencePattern: string | null = null
  let priority: string | null = null

  // Extract @mention for assignee (at start or after a word)
  const mentionMatch = clean.match(/(?:^|\s)@(\w[\w\s'-]{0,20}?)(?=\s|$)/)
  if (mentionMatch) {
    assignee = mentionMatch[1].trim()
    // Remove @mention from title, preserving the @ for visual
  }

  // Check for recurrence keywords
  const recurringKeywords = [
    { pattern: /\bevery\s+(day|morning|evening|night|weekday|weekend)\b/i, label: '$1' },
    { pattern: /\bevery\s+\w+day\b/i, label: null }, // every Monday, every Tuesday etc
    { pattern: /\bdaily\b/i, label: 'day' },
    { pattern: /\bweekly\b/i, label: 'week' },
    { pattern: /\bmonthly\b/i, label: 'month' },
  ]

  for (const rk of recurringKeywords) {
    if (rk.pattern.test(clean)) {
      isRecurring = true
      const match = clean.match(rk.pattern)
      recurrencePattern = match ? match[0] : rk.label || 'custom'
      break
    }
  }

  // Check for time patterns
  const timeMatch = clean.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i)
  if (timeMatch) {
    time = timeMatch[0]
  }

  // Check for day references
  const dayMap: Record<string, string> = {
    today: 'today',
    tonight: 'today',
    tomorrow: 'tomorrow',
    'this weekend': 'this weekend',
  }

  for (const [key, val] of Object.entries(dayMap)) {
    if (clean.toLowerCase().includes(key)) {
      dueDate = val
      break
    }
  }

  // Check for "this Saturday" etc
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const dayNameMatch = clean.toLowerCase().match(new RegExp(`\\b(${dayNames.join('|')})\\b`))
  if (dayNameMatch && !dueDate) {
    dueDate = `this ${dayNameMatch[1]}`
  }

  // Priority detection
  if (/\burgent\b|\basap\b|\bcritical\b/i.test(clean)) {
    priority = 'urgent'
  } else if (/\bhigh\b|\bimportant\b|\bpriority\b/i.test(clean)) {
    priority = 'high'
  }

  // Clean assignee from title for clean display
  if (assignee) {
    clean = clean.replace(new RegExp(`@${assignee.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`), '').trim()
  }

  return {
    assignee,
    dueDate,
    time,
    isRecurring,
    recurrencePattern,
    priority,
    cleanTitle: clean || text.trim(),
  }
}

export default function StepCreateTask({
  onComplete,
}: {
  onComplete: (taskText: string) => Promise<void>
}) {
  const [taskText, setTaskText] = useState('')
  const [loading, setLoading] = useState(false)
  const [taskCreated, setTaskCreated] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const parsed = useMemo(() => parseTaskInput(taskText), [taskText])

  const handleCreate = async (text?: string) => {
    const content = text || taskText
    setLoading(true)
    try {
      await onComplete(content.trim() || '')
      setTaskCreated(true)
    } catch {
      setTaskCreated(true)
      setTimeout(() => onComplete(content.trim() || ''), 300)
    }
    // Don't set loading false — we navigate away
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setTaskText(suggestion)
    handleCreate(suggestion)
  }

  if (taskCreated) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-500" />
        </div>
        <p className="text-xl font-bold text-foreground mb-1">Task created! 🎉</p>
        <p className="text-sm text-muted-foreground">Moving to next step...</p>
      </div>
    )
  }

  const hasTaskText = taskText.trim().length > 0
  const showParsed = hasTaskText && (parsed.assignee || parsed.dueDate || parsed.isRecurring || parsed.priority)

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Create Your First Nudge</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Type naturally — Nudge parses assignee, dates, and priority automatically.
      </p>

      {/* Voice input hint */}
      <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 mb-6">
        <Mic className="w-5 h-5 text-indigo-500 shrink-0" />
        <div>
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Speak naturally
          </p>
          <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">
            &ldquo;@Jake take out trash at 8pm&rdquo;
          </p>
        </div>
      </div>

      <div className="relative mb-3">
        <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
          parsed.assignee ? 'text-indigo-500' : 'text-muted-foreground'
        }`} />
        <input
          ref={inputRef}
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className={`input-field pl-10 ${
            showParsed ? 'ring-2 ring-indigo-200 dark:ring-indigo-800/50' : ''
          }`}
          placeholder="e.g. @Jake take out trash at 8pm"
          autoComplete="off"
          enterKeyHint="go"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleCreate()
            }
          }}
        />
      </div>

      {/* NLP preview */}
      {showParsed && (
        <div className="mb-4 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 animate-fade-in">
          <p className="text-2xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
            Nudge parsed:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {parsed.assignee && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                <User className="w-3 h-3" />
                {parsed.assignee}
              </span>
            )}
            {parsed.dueDate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                <Calendar className="w-3 h-3" />
                {parsed.dueDate}{parsed.time ? ` ${parsed.time}` : ''}
              </span>
            )}
            {parsed.isRecurring && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                🔁 Recurring
              </span>
            )}
            {parsed.priority && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                parsed.priority === 'urgent'
                  ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                  : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'
              }`}>
                <AlertCircle className="w-3 h-3" />
                {parsed.priority}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Quick suggestions */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-xs text-muted-foreground">Quick examples</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(showMore ? MORE_SUGGESTIONS : QUICK_SUGGESTIONS.slice(0, 4)).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleQuickSuggestion(suggestion)}
              className="px-3 py-2 text-xs rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors text-left leading-relaxed max-w-full"
            >
              {suggestion}
            </button>
          ))}
          {!showMore && (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="px-3 py-2 text-xs rounded-xl bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
            >
              +{QUICK_SUGGESTIONS.length + MORE_SUGGESTIONS.length - 4} more
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleCreate()}
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : hasTaskText ? (
            <>
              Create Task
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Skip for now
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
