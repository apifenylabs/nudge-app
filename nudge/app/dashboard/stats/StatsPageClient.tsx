'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, CheckCircle, Clock, AlertCircle, Zap,
  TrendingUp, Users, Calendar, BarChart3, Flame
} from 'lucide-react'
import GamificationPanel from '@/components/dashboard/GamificationPanel'
import BottomNav from '@/components/layout/BottomNav'

interface Task {
  id: string
  title: string
  status: string
  priority: string
  due_date?: string
  completed_at?: string
  created_at: string
  assigned_to?: string
  is_recurring: boolean
}

export default function StatsPageClient({ tasks }: { tasks: Task[] }) {
  const stats = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const completed = tasks.filter(t => t.status === 'completed')
    const pending = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress')
    const overdue = pending.filter(t => t.due_date && new Date(t.due_date) < now)
    const completedToday = completed.filter(t => {
      if (!t.completed_at) return false
      return new Date(t.completed_at) >= today
    })
    const completedThisWeek = completed.filter(t => {
      if (!t.completed_at) return false
      return new Date(t.completed_at) >= weekStart
    })

    const completionRate = tasks.length > 0
      ? Math.round((completed.length / tasks.length) * 100)
      : 0

    // Streak: consecutive days with at least one completed task
    let streak = 0
    const checkDate = new Date(today)
    while (true) {
      const dayStart = new Date(checkDate)
      const dayEnd = new Date(checkDate)
      dayEnd.setHours(23, 59, 59, 999)

      const dayCompleted = completed.some(t => {
        if (!t.completed_at) return false
        const ca = new Date(t.completed_at)
        return ca >= dayStart && ca <= dayEnd
      })

      if (dayCompleted) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    // Priority breakdown
    const byPriority = {
      urgent: tasks.filter(t => t.priority === 'urgent').length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    }

    // Completion this week by day
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weekData = weekDays.map((day, i) => {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + i)
      const dayEnd = new Date(d)
      dayEnd.setHours(23, 59, 59, 999)

      const count = completed.filter(t => {
        if (!t.completed_at) return false
        const ca = new Date(t.completed_at)
        return ca >= d && ca <= dayEnd
      }).length

      return { day, count, isToday: i === now.getDay() }
    })

    const maxWeekCount = Math.max(...weekData.map(d => d.count), 1)

    return {
      total: tasks.length,
      completed: completed.length,
      pending: pending.length,
      overdue: overdue.length,
      completedToday: completedToday.length,
      completedThisWeek: completedThisWeek.length,
      completionRate,
      streak,
      byPriority,
      weekData,
      maxWeekCount,
    }
  }, [tasks])

  const priorityColors = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-indigo-500',
    low: 'bg-blue-400',
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Stats</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Completed Today"
            value={stats.completedToday}
            icon={CheckCircle}
            color="emerald"
          />
          <StatCard
            label="This Week"
            value={stats.completedThisWeek}
            icon={TrendingUp}
            color="indigo"
          />
          <StatCard
            label="Completion Rate"
            value={`${stats.completionRate}%`}
            icon={BarChart3}
            color="blue"
          />
          <StatCard
            label="Streak"
            value={`${stats.streak} days`}
            icon={Flame}
            color="amber"
          />
        </div>

        {/* Weekly Chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4">This Week</h3>
          <div className="flex items-end gap-2 h-32">
            {stats.weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground font-medium">
                  {d.count || ''}
                </span>
                <div
                  className={`w-full rounded-lg transition-all duration-300 ${
                    d.isToday
                      ? 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                      : 'bg-indigo-200 dark:bg-indigo-900/40'
                  }`}
                  style={{
                    height: `${Math.max((d.count / stats.maxWeekCount) * 100, d.count > 0 ? 8 : 0)}%`,
                  }}
                />
                <span className={`text-[10px] font-medium ${d.isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4">Priority Breakdown</h3>
          <div className="space-y-3">
            {(Object.entries(stats.byPriority) as [string, number][]).map(([key, count]) => {
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground capitalize">{key}</span>
                    <span className="text-xs text-muted-foreground">{count} tasks ({Math.round(pct)}%)</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${priorityColors[key as keyof typeof priorityColors]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gamification */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" /> Achievements
          </h3>
          <GamificationPanel />
        </div>

        {/* Summary */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Summary</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• {stats.pending} tasks still pending</p>
            <p>• {stats.overdue} tasks overdue</p>
            <p>• {stats.completed} tasks completed overall</p>
            {stats.streak > 0 && (
              <p>• {stats.streak} day streak 🔥</p>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function StatCard({
  label, value, icon: Icon, color
}: {
  label: string
  value: string | number
  icon: React.ElementType
  color: 'emerald' | 'indigo' | 'blue' | 'amber'
}) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-500' },
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-500' },
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-500' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-500' },
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <div className={`w-7 h-7 rounded-lg ${colorMap[color].bg} flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${colorMap[color].text}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}
