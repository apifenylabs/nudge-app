'use client'

import {
  TrendingUp, TrendingDown, Minus, Clock, Users,
  Target, Zap, Sun, Moon, Sparkles
} from 'lucide-react'

interface InsightsData {
  totalTasks: number
  completedCount: number
  pendingCount: number
  overdueCount: number
  completionRate: number
  bestDay: string
  bestDayTasks: number
  mostProductiveMember: { name: string; completed: number } | null
  completionRateChange: number
  thisWeekCompleted: number
  activeMembers: number
  totalMembers: number
}

interface TrendInsightsProps {
  data: InsightsData
}

/**
 * Insight cards showing computed trends and smart observations.
 */
export default function TrendInsights({ data }: TrendInsightsProps) {
  const insights: {
    icon: React.ElementType
    emoji?: string
    title: string
    description: string
    color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple'
    condition?: boolean
  }[] = [
    {
      icon: TrendingUp,
      title: 'Completion Rate',
      description: `${data.completionRate}% of all tasks completed`,
      color: 'indigo',
    },
    {
      icon: data.completionRateChange >= 0 ? TrendingUp : TrendingDown,
      title: 'Trend (last 14 days)',
      description: data.completionRateChange >= 0
        ? `${data.completionRateChange}% more tasks completed vs previous week`
        : `${Math.abs(data.completionRateChange)}% fewer tasks completed vs previous week`,
      color: data.completionRateChange >= 0 ? 'emerald' : 'rose',
    },
    {
      icon: Users,
      title: 'Most Productive Member',
      description: data.mostProductiveMember
        ? `${data.mostProductiveMember.name} — ${data.mostProductiveMember.completed} tasks`
        : 'No tasks completed yet',
      color: 'blue',
      condition: !!data.mostProductiveMember,
    },
    {
      icon: Target,
      title: 'Best Day',
      description: `${data.bestDay} is your family's most productive day (${data.bestDayTasks} tasks)`,
      color: 'purple',
      condition: data.bestDayTasks > 0,
    },
    {
      icon: Clock,
      title: 'Overdue Tasks',
      description: `${data.overdueCount} tasks overdue — ${data.overdueCount > 0 ? 'time to catch up! 💪' : 'all caught up! 🎉'}`,
      color: data.overdueCount > 0 ? 'amber' : 'emerald',
    },
    {
      icon: data.thisWeekCompleted >= 5 ? Zap : Sun,
      title: 'This Week',
      description: `${data.thisWeekCompleted} tasks completed this week by ${data.activeMembers} of ${data.totalMembers} members`,
      color: 'amber',
    },
  ]

  if (data.totalTasks === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        <Sparkles className="w-8 h-8 mx-auto mb-2 text-indigo-300" />
        Add some tasks to see insights about your family's productivity!
      </div>
    )
  }

  const colorMap = {
    indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-500', border: 'border-indigo-200/50' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-500', border: 'border-emerald-200/50' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-500', border: 'border-amber-200/50' },
    rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-500', border: 'border-rose-200/50' },
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-500', border: 'border-blue-200/50' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', icon: 'text-purple-500', border: 'border-purple-200/50' },
  }

  return (
    <div className="space-y-2">
      {insights.map((item, i) => {
        const c = colorMap[item.color]
        const Icon = item.icon
        return (
          <div
            key={i}
            className={`${c.bg} border ${c.border} rounded-xl p-3 flex items-start gap-3`}
          >
            <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${c.icon}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">{item.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
