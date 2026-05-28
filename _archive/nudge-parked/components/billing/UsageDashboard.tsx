'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Zap, Users, Repeat, Loader2, CheckCircle, AlertTriangle,
  ArrowUp, Clock, BarChart3,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UsageStats {
  plan: string
  tasksToday: number
  maxTasksPerDay: number
  unlimited: boolean
  remaining: number
  familyMembers: number
  maxFamilyMembers: number
  recurringTasks: number
  maxRecurringTasks: number
  isFree: boolean
}

export default function UsageDashboard() {
  const router = useRouter()
  const [data, setData] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsage = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      // Fetch task usage
      const taskRes = await fetch('/api/stripe/task-usage')
      const taskData = await taskRes.json()
      if (!taskRes.ok) throw new Error(taskData.error || 'Failed to fetch usage')

      // Fetch family member count & recurring tasks
      const familyRes = await fetch('/api/family/usage')
      const familyData = familyRes.ok ? await familyRes.json() : { memberCount: 1, recurringCount: 0, maxMembers: 1, maxRecurring: 3 }

      setData({
        plan: taskData.plan,
        tasksToday: taskData.tasksToday,
        maxTasksPerDay: taskData.maxTasksPerDay,
        unlimited: taskData.unlimited,
        remaining: taskData.remaining,
        familyMembers: familyData.memberCount || 1,
        maxFamilyMembers: familyData.maxMembers || 1,
        recurringTasks: familyData.recurringCount || 0,
        maxRecurringTasks: familyData.maxRecurring || 3,
        isFree: taskData.plan === 'free',
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsage()
  }, [fetchUsage])

  const getPercentage = (used: number, max: number) => {
    if (max === -1) return 0
    return Math.min(Math.round((used / max) * 100), 100)
  }

  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-amber-500'
    return 'bg-indigo-500'
  }

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-5 text-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Loading usage...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="glass-card rounded-2xl p-5 text-center">
        <p className="text-xs text-muted-foreground mb-2">Could not load usage data</p>
        <button onClick={fetchUsage} className="btn-secondary text-xs">Retry</button>
      </div>
    )
  }

  const taskPct = data.unlimited ? 0 : getPercentage(data.tasksToday, data.maxTasksPerDay)
  const familyPct = data.maxFamilyMembers === -1 ? 0 : getPercentage(data.familyMembers, data.maxFamilyMembers)
  const recurringPct = data.maxRecurringTasks === -1 ? 0 : getPercentage(data.recurringTasks, data.maxRecurringTasks)

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Usage This Period
          </span>
        </div>
        <span className={`text-2xs px-2 py-0.5 rounded-full font-semibold ${
          data.isFree
            ? 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'
            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
        }`}>
          {data.isFree ? 'Free Plan' : `${data.plan === 'pro' ? 'Pro' : 'Family'} Plan`}
        </span>
      </div>

      <div className="space-y-4">
        {/* Tasks Used */}
        <UsageBar
          icon={<Zap className="w-3.5 h-3.5" />}
          label="Daily Tasks"
          used={data.tasksToday}
          max={data.maxTasksPerDay}
          unlimited={data.unlimited}
          percentage={taskPct}
          barColor={getBarColor(taskPct)}
          detail={!data.unlimited ? `${data.remaining} remaining today` : undefined}
          isWarning={taskPct >= 70}
          isCritical={taskPct >= 90}
        />

        {/* Family Members */}
        <UsageBar
          icon={<Users className="w-3.5 h-3.5" />}
          label="Family Members"
          used={data.familyMembers}
          max={data.maxFamilyMembers}
          unlimited={data.maxFamilyMembers === -1}
          percentage={familyPct}
          barColor={getBarColor(familyPct)}
          detail={data.maxFamilyMembers === -1 ? undefined : `${data.maxFamilyMembers - data.familyMembers} spots left`}
          isWarning={familyPct >= 70}
          isCritical={familyPct >= 90}
        />

        {/* Recurring Tasks */}
        <UsageBar
          icon={<Repeat className="w-3.5 h-3.5" />}
          label="Recurring Tasks"
          used={data.recurringTasks}
          max={data.maxRecurringTasks}
          unlimited={data.maxRecurringTasks === -1}
          percentage={recurringPct}
          barColor={getBarColor(recurringPct)}
          detail={data.maxRecurringTasks === -1 ? undefined : `${data.maxRecurringTasks - data.recurringTasks} remaining`}
          isWarning={recurringPct >= 70}
          isCritical={recurringPct >= 90}
        />
      </div>

      {/* Upgrade CTA for free or near-limit users */}
      {(data.isFree || taskPct >= 70 || familyPct >= 70) && (
        <button
          onClick={() => router.push('/dashboard/settings')}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl
            bg-gradient-to-r from-indigo-500 to-indigo-600 text-white
            hover:from-indigo-600 hover:to-indigo-700
            active:scale-[0.98] transition-all"
        >
          <ArrowUp className="w-3 h-3" />
          {data.isFree ? 'Upgrade for unlimited everything' : 'Upgrade plan for more capacity'}
        </button>
      )}
    </div>
  )
}

function UsageBar({
  icon,
  label,
  used,
  max,
  unlimited,
  percentage,
  barColor,
  detail,
  isWarning,
  isCritical,
}: {
  icon: React.ReactNode
  label: string
  used: number
  max: number
  unlimited: boolean
  percentage: number
  barColor: string
  detail?: string
  isWarning: boolean
  isCritical: boolean
}) {
  const isAtLimit = !unlimited && used >= max

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className={isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-muted-foreground'}>
            {icon}
          </span>
          <span className="text-xs font-medium text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${
            isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-foreground'
          }`}>
            {unlimited ? `${used} ✓` : `${used} / ${max}`}
          </span>
          {unlimited && (
            <CheckCircle className="w-3 h-3 text-emerald-500" />
          )}
        </div>
      </div>

      {/* Progress bar (only for limited resources) */}
      {!unlimited && (
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}

      {/* Detail / alert text */}
      {isAtLimit && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Limit reached — upgrade to continue
        </p>
      )}
      {!isAtLimit && detail && (
        <p className={`text-xs mt-1 ${
          isWarning ? 'text-amber-500' : 'text-muted-foreground'
        }`}>
          {detail}
        </p>
      )}
    </div>
  )
}
