'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Zap, Users, Loader2, AlertTriangle, ArrowUp,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UsageData {
  plan: string
  tasksToday: number
  maxTasksPerDay: number
  unlimited: boolean
  remaining: number
}

interface UsageMeterProps {
  userId: string
  dismissible?: boolean
  compact?: boolean
}

export default function UsageMeter({ userId, dismissible = true, compact = false }: UsageMeterProps) {
  const router = useRouter()
  const [data, setData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch('/api/stripe/task-usage')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsage()
  }, [fetchUsage])

  if (loading || dismissed || !data) return null

  // Only show for free plan users
  if (data.plan !== 'free') return null

  const percentage = data.maxTasksPerDay > 0
    ? Math.round((data.tasksToday / data.maxTasksPerDay) * 100)
    : 0

  const isNearLimit = percentage >= 80
  const isAtLimit = data.remaining === 0

  if (compact && !isNearLimit) return null

  return (
    <div className={`rounded-xl border transition-all ${
      isAtLimit
        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
        : isNearLimit
          ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
          : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }`}>
      <div className="px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isAtLimit ? 'bg-red-100 dark:bg-red-900/40' :
              isNearLimit ? 'bg-amber-100 dark:bg-amber-900/40' :
              'bg-gray-100 dark:bg-gray-800'
            }`}>
              <Zap className={`w-3.5 h-3.5 ${
                isAtLimit ? 'text-red-500' :
                isNearLimit ? 'text-amber-500' :
                'text-gray-400'
              }`} />
            </div>
            <span className="text-xs font-semibold text-foreground">
              {isAtLimit ? 'Task limit reached' : isNearLimit ? 'Almost at limit' : 'Free plan usage'}
            </span>
          </div>
          {dismissible && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {data.tasksToday} / {data.maxTasksPerDay} tasks today
            </span>
            <span className={`font-semibold ${
              isAtLimit ? 'text-red-500' :
              isNearLimit ? 'text-amber-500' :
              'text-muted-foreground'
            }`}>
              {data.remaining > 0 ? `${data.remaining} left` : 'Full'}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isAtLimit ? 'bg-red-500' :
                isNearLimit ? 'bg-amber-500' :
                'bg-indigo-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Upgrade CTA for near-limit or at-limit */}
        {(isNearLimit || isAtLimit) && (
          <button
            onClick={() => router.push('/dashboard/settings')}
            className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg
              bg-gradient-to-r from-indigo-500 to-indigo-600 text-white
              hover:from-indigo-600 hover:to-indigo-700
              active:scale-[0.98] transition-all"
          >
            <ArrowUp className="w-3 h-3" />
            Upgrade for unlimited tasks
          </button>
        )}
      </div>
    </div>
  )
}
