/**
 * recurrence.ts — Recurrence engine for Nudge
 *
 * Computes the next due date for recurring tasks.
 * Supports: daily, weekly, biweekly, monthly
 *
 * Edge cases handled:
 * - Monthly: Jan 31 → Feb 28 (non-leap) / Feb 29 (leap)
 * - Weekly with specific days: finds next selected day
 * - No due date: uses today as reference
 * - Invalid/unknown patterns: returns null
 */

export type RecurrencePattern = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'none'

const VALID_PATTERNS: ReadonlySet<string> = new Set([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
])

export const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type DayOfWeek = typeof DAYS_OF_WEEK[number]

const DAY_ABBREVIATIONS: Record<DayOfWeek, string> = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
}

const DAY_LETTERS: Record<DayOfWeek, string> = {
  sunday: 'S',
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'T',
  friday: 'F',
  saturday: 'S',
}

export function dayAbbreviation(day: DayOfWeek): string {
  return DAY_ABBREVIATIONS[day]
}

export function dayLetter(day: DayOfWeek): string {
  return DAY_LETTERS[day]
}

const DAY_INDEX: Record<DayOfWeek, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

export const RECURRENCE_OPTIONS = [
  { value: 'none' as const, label: "Doesn't repeat", icon: '❌', description: 'One-time task' },
  { value: 'daily' as const, label: 'Daily', icon: '🔄', description: 'Every day' },
  { value: 'weekly' as const, label: 'Weekly', icon: '📆', description: 'On selected days of the week' },
  { value: 'biweekly' as const, label: 'Bi-weekly', icon: '📅', description: 'Every two weeks' },
  { value: 'monthly' as const, label: 'Monthly', icon: '🗓️', description: 'Same date every month' },
] as const

/**
 * Build a human-readable description of the recurrence schedule.
 * e.g. "Repeats every Mon, Wed, Fri" or "Repeats monthly on the 15th"
 */
export function recurrenceDescription(
  pattern: string | null | undefined,
  daysOfWeek?: DayOfWeek[] | null,
  dayOfMonth?: number | null
): string {
  if (!pattern || pattern === 'none' || pattern === '') return ''

  switch (pattern) {
    case 'daily':
      return 'Repeats every day'
    case 'weekly':
      if (daysOfWeek && daysOfWeek.length > 0) {
        const labels = daysOfWeek.map(d => DAY_ABBREVIATIONS[d])
        return `Repeats every ${labels.join(', ')}`
      }
      return 'Repeats weekly'
    case 'biweekly':
      return 'Repeats every two weeks'
    case 'monthly':
      if (dayOfMonth && dayOfMonth >= 1 && dayOfMonth <= 31) {
        const suffix = dayOfMonth === 1 ? 'st' : dayOfMonth === 2 ? 'nd' : dayOfMonth === 3 ? 'rd' : 'th'
        return `Repeats monthly on the ${dayOfMonth}${suffix}`
      }
      return 'Repeats monthly'
    default:
      return ''
  }
}

/**
 * Compute the next due date for a recurring task.
 *
 * For weekly with specific days, finds the next selected day.
 * For monthly, preserves day-of-month with month-end clamping.
 *
 * @param currentDueDate — ISO date string of the current/just-completed due date, or null/empty
 * @param pattern — recurrence pattern
 * @param daysOfWeek — selected days for weekly recurrence (null = use +7 days)
 * @param dayOfMonth — selected day for monthly recurrence (null = use same day)
 * @returns ISO date string for the next instance, or null if not recurring
 */
export function computeNextDueDate(
  currentDueDate: string | null | undefined,
  pattern: string | null | undefined,
  daysOfWeek?: DayOfWeek[] | null,
  dayOfMonth?: number | null
): string | null {
  if (!pattern || pattern === 'none' || pattern === '') {
    return null
  }

  if (!VALID_PATTERNS.has(pattern)) {
    return null
  }

  let referenceDate: Date

  if (currentDueDate) {
    referenceDate = new Date(currentDueDate)
    if (isNaN(referenceDate.getTime())) {
      referenceDate = new Date()
    }
  } else {
    referenceDate = new Date()
  }

  // Normalize to start of day (local timezone)
  referenceDate.setHours(0, 0, 0, 0)

  const nextDate = new Date(referenceDate)

  switch (pattern) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1)
      break

    case 'weekly':
      if (daysOfWeek && daysOfWeek.length > 0) {
        const currentDayIndex = referenceDate.getDay()
        const selectedIndices = daysOfWeek.map(d => DAY_INDEX[d]).sort()

        let nextDayIndex: number | null = null
        for (const idx of selectedIndices) {
          if (idx > currentDayIndex) {
            nextDayIndex = idx
            break
          }
        }

        if (nextDayIndex !== null) {
          nextDate.setDate(nextDate.getDate() + (nextDayIndex - currentDayIndex))
        } else {
          nextDate.setDate(nextDate.getDate() + (7 - currentDayIndex + selectedIndices[0]))
        }
      } else {
        nextDate.setDate(nextDate.getDate() + 7)
      }
      break

    case 'biweekly':
      nextDate.setDate(nextDate.getDate() + 14)
      break

    case 'monthly': {
      let targetDay: number
      if (dayOfMonth && dayOfMonth >= 1 && dayOfMonth <= 28) {
        targetDay = dayOfMonth
      } else {
        targetDay = referenceDate.getDate()
      }
      nextDate.setMonth(nextDate.getMonth() + 1)
      nextDate.setDate(targetDay)

      if (nextDate.getDate() !== targetDay) {
        nextDate.setDate(0)
      }
      break
    }

    default:
      return null
  }

  return nextDate.toISOString().split('T')[0]
}

/**
 * Human-readable label for a recurrence pattern.
 */
export function recurrenceLabel(pattern: string | null | undefined): string {
  switch (pattern) {
    case 'daily':
      return 'Daily'
    case 'weekly':
      return 'Weekly'
    case 'biweekly':
      return 'Bi-weekly'
    case 'monthly':
      return 'Monthly'
    default:
      return ''
  }
}

/**
 * Check if a pattern represents a repeating schedule.
 */
export function isRecurring(pattern: string | null | undefined): boolean {
  if (!pattern) return false
  return VALID_PATTERNS.has(pattern)
}
