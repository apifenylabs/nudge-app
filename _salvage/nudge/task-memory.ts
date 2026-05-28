/**
 * task-memory.ts
 *
 * A lightweight localStorage-based memory layer for task patterns.
 * Helps Nudge learn from user behavior over time: recurring tasks,
 * common assignments, and efficiency stats.
 */

const STORAGE_KEY = 'nudge_task_memory'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StoredTask {
  id: string
  text: string
  userName: string
  recurrence: string | null // e.g. "daily", "weekly", "every monday"
  created: number          // unix ms
  completed: boolean
}

export interface RecurringTask {
  original: string
  userName: string
  pattern: string
  count: number
  lastCreated: number
}

export interface EfficiencyStats {
  totalTasks: number
  completedTasks: number
  completionRate: number
  mostCommonHour: number
  topUserAssignments: Array<{ user: string; count: number }>
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readStore(): StoredTask[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredTask[]) : []
  } catch {
    return []
  }
}

function writeStore(tasks: StoredTask[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // localStorage full or unavailable – silently ignore
  }
}

// Simple pattern detection for recurrence phrases
const RECURRENCE_PATTERNS: Array<[RegExp, string]> = [
  [/\bdaily\b/i, 'daily'],
  [/\bevery day\b/i, 'daily'],
  [/\bweekly\b/i, 'weekly'],
  [/\bevery week\b/i, 'weekly'],
  [/\bmonthly\b/i, 'monthly'],
  [/\bevery month\b/i, 'monthly'],
  [/\bevery (\w+day)\b/i, 'every {1}'],    // e.g. "every monday"
  [/\beach (\w+day)\b/i, 'each {1}'],
  [/\b(each|every) morning\b/i, 'daily (morning)'],
  [/\b(each|every) (afternoon|evening|night)\b/i, 'daily ({2})'],
]

function detectRecurrence(text: string): string | null {
  for (const [pattern, label] of RECURRENCE_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      // Replace numbered groups
      let resolved = label
      for (let i = 1; i < match.length; i++) {
        resolved = resolved.replace(`{${i}}`, match[i].toLowerCase())
      }
      return resolved
    }
  }
  return null
}

// Days of the week
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

function extractDayOfWeek(text: string): string | null {
  const lower = text.toLowerCase()
  for (const day of DAYS) {
    if (lower.includes(day)) return day
  }
  return null
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * rememberTask: Save a newly created task to local memory.
 */
export function rememberTask(
  taskText: string,
  userName: string,
  recurrence?: string | null
): void {
  const store = readStore()
  const recurrenceDetected = recurrence ?? detectRecurrence(taskText)

  const stored: StoredTask = {
    id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    text: taskText,
    userName,
    recurrence: recurrenceDetected,
    created: Date.now(),
    completed: false,
  }

  writeStore([...store, stored])
}

/**
 * markTaskCompleted: Mark a stored task as done by its ID.
 */
export function markTaskCompleted(taskId: string): void {
  const store = readStore()
  const updated = store.map((t) =>
    t.id === taskId ? { ...t, completed: true } : t
  )
  writeStore(updated)
}

/**
 * getRecurringTasks: Return tasks that have a detected recurrence pattern,
 * grouped by their pattern, with counts.
 */
export function getRecurringTasks(): RecurringTask[] {
  const store = readStore()
  const recurring = store.filter((t) => t.recurrence !== null)

  // Aggregate by (original + pattern + user)
  const map = new Map<string, { original: string; userName: string; pattern: string; times: number[] }>()

  for (const t of recurring) {
    const key = `${t.recurrence}::${t.userName}::${t.text.toLowerCase().trim()}`
    const entry = map.get(key)
    if (entry) {
      entry.times.push(t.created)
    } else {
      map.set(key, {
        original: t.text,
        userName: t.userName,
        pattern: t.recurrence!,
        times: [t.created],
      })
    }
  }

  return Array.from(map.values())
    .map((entry) => ({
      original: entry.original,
      userName: entry.userName,
      pattern: entry.pattern,
      count: entry.times.length,
      lastCreated: Math.max(...entry.times),
    }))
    .sort((a, b) => b.count - a.count) // most frequent first
}

/**
 * suggestImprovements: Based on past task patterns, return suggestion strings
 * to help the user refine their current task description.
 */
export function suggestImprovements(taskText: string): string[] {
  const suggestions: string[] = []
  const lower = taskText.toLowerCase()

  // Check day-of-week usage
  if (extractDayOfWeek(lower)) {
    const day = extractDayOfWeek(lower)
    if (day) {
      suggestions.push(`Set to repeat every ${day}?`)
    }
  }

  // Suggest recurrence if not already set
  if (!detectRecurrence(lower)) {
    const store = readStore()
    const similar = store.filter(
      (t) => t.text.toLowerCase().includes(taskText.slice(0, 5).toLowerCase()) && t.recurrence
    )
    if (similar.length > 0) {
      const patterns = Array.from(new Set(similar.map((t) => t.recurrence)))
      suggestions.push(`Similar past tasks were ${patterns.join(', ')}. Set recurrence?`)
    }
  }

  // Suggest assignment if user name is missing
  if (!lower.match(/remind\s+\w+/i) && !lower.match(/tell\s+\w+/i)) {
    suggestions.push('No person assigned. Try "Remind [name]..."')
  }

  return suggestions
}

/**
 * getTaskEfficiency: Return aggregate stats for a given user (or all if empty).
 */
export function getTaskEfficiency(userName?: string): EfficiencyStats {
  let store = readStore()

  if (userName) {
    store = store.filter((t) => t.userName.toLowerCase() === userName.toLowerCase())
  }

  const total = store.length
  const completed = store.filter((t) => t.completed).length

  // Most common hour of day
  const hourBuckets = new Array(24).fill(0)
  for (const t of store) {
    const hour = new Date(t.created).getHours()
    hourBuckets[hour]++
  }
  const mostCommonHour = hourBuckets.indexOf(Math.max(...hourBuckets))

  // Top assigned users
  const userMap = new Map<string, number>()
  for (const t of store) {
    userMap.set(t.userName, (userMap.get(t.userName) ?? 0) + 1)
  }
  const topUserAssignments = Array.from(userMap.entries())
    .map(([user, count]) => ({ user, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totalTasks: total,
    completedTasks: completed,
    completionRate: total > 0 ? completed / total : 0,
    mostCommonHour,
    topUserAssignments,
  }
}
