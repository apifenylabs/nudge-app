'use client'

import { CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react'

interface StatsOverviewProps {
  completedTasks: number
  pendingTasks: number
  totalTasks: number
  urgentTasks?: number
}

export default function StatsOverview({
  completedTasks,
  pendingTasks,
  totalTasks,
  urgentTasks = 0,
}: StatsOverviewProps) {
  const stats = [
    {
      label: 'Done Today',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      label: 'Family Streak',
      value: `${Math.min(totalTasks, 7)}d`,
      icon: Zap,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="glass-card px-3 py-3.5 rounded-xl flex flex-col items-center gap-1 text-center"
          >
            <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
            </div>
            <span className="text-lg font-bold text-foreground leading-none">{stat.value}</span>
            <span className="text-2xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
          </div>
        )
      })}
    </div>
  )
}
