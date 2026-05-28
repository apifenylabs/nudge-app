'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react'
import { loadFromLocalStorage, getScore, computeStreak, getToday } from '@/lib/life-checkin/storage'

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
  const [streakDays, setStreakDays] = useState(0)
  const [todayScore, setTodayScore] = useState<number | null>(null)
  const [weeklyAvg, setWeeklyAvg] = useState<number | null>(null)

  useEffect(() => {
    const data = loadFromLocalStorage()
    const streak = computeStreak(data.days || {})

    // Today's score
    const today = getToday()
    const todayEntry = data.days?.[today]
    const score = todayEntry ? getScore(todayEntry) : null

    // Weekly average
    const recentScores: number[] = []
    const sortedDays = Object.entries(data.days || {})
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 7)

    sortedDays.forEach(([_, entry]) => {
      recentScores.push(getScore(entry))
    })

    const avg = recentScores.length > 0
      ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
      : null

    setStreakDays(streak)
    setTodayScore(score)
    setWeeklyAvg(avg)
  }, [])

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
      label: 'Life Streak',
      value: streakDays > 0 ? `${streakDays}d` : 'Start!',
      icon: Zap,
      color: streakDays > 0 ? 'text-indigo-500' : 'text-muted-foreground',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ]

  return (
    <div className="px-4 py-3 space-y-3">
      {/* Life score mini card */}
      {(todayScore !== null || weeklyAvg !== null) && (
        <div className="glass-card px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              todayScore !== null && todayScore >= 80
                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                : todayScore !== null && todayScore >= 50
                  ? 'bg-amber-100 dark:bg-amber-900/30'
                  : 'bg-muted'
            }`}>
              <TrendingUp className={`w-4 h-4 ${
                todayScore !== null && todayScore >= 80
                  ? 'text-emerald-500'
                  : todayScore !== null && todayScore >= 50
                    ? 'text-amber-500'
                    : 'text-muted-foreground'
              }`} />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">
                {todayScore !== null ? `${todayScore}%` : 'No check-in yet'}
              </span>
              <span className="text-2xs text-muted-foreground block leading-tight">Today's life score</span>
            </div>
          </div>
          {weeklyAvg !== null && (
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground">{weeklyAvg}%</span>
              <span className="text-2xs text-muted-foreground block leading-tight">7-day avg</span>
            </div>
          )}
        </div>
      )}

      {/* Task stats grid */}
      <div className="grid grid-cols-3 gap-3">
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
    </div>
  )
}
