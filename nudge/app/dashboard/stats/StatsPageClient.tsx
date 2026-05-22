'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Flame, Loader2, RefreshCw, BarChart3,
  Clock, AlertTriangle
} from 'lucide-react'
import {
  MemberProductivity,
  CompletionTrends,
  StreakDisplay,
  TrendInsights,
  TimeOfDayAnalysis,
} from '@/components/analytics'
import BottomNav from '@/components/layout/BottomNav'

interface AnalyticsData {
  completionTrends: { date: string; count: number; dayLabel: string }[]
  memberProductivity: {
    userId: string
    name: string
    completed: number
    pending: number
    overdue: number
    thisWeek: number
    role: string
    completionRate: number
  }[]
  streaks: { userId: string; name: string; currentStreak: number; longestStreak: number }[]
  priorityBreakdown: { urgent: number; high: number; medium: number; low: number }
  timeOfDay: { label: string; start: number; end: number; count: number }[]
  insights: {
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
}

type Tab = 'overview' | 'members' | 'trends' | 'streaks'

export default function StatsPageClient() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [familyId, setFamilyId] = useState<string | null>(null)

  // Fetch family ID
  useEffect(() => {
    async function getFamily() {
      try {
        const { supabase } = await import('@/lib/supabase')
        const client = supabase()
        const { data: { user } } = await client.auth.getUser()
        if (!user) return

        const { data: membership } = await client
          .from('family_members')
          .select('family_id')
          .eq('user_id', user.id)
          .limit(1)
          .single()

        if (membership) {
          setFamilyId(membership.family_id)
        }
      } catch (err) {
        console.error('Failed to get family:', err)
      }
    }
    getFamily()
  }, [])

  // Fetch analytics data
  const fetchData = async () => {
    if (!familyId) return
    setRefreshing(true)
    try {
      const res = await fetch(`/api/analytics?familyId=${familyId}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const json = await res.json()
      setData(json)
      setError(null)
    } catch (err: any) {
      console.error('Analytics fetch error:', err)
      setError(err.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (familyId && loading) {
      fetchData()
    }
  }, [familyId, loading])

  // Priority colors for the breakdown
  const priorityColors: Record<string, string> = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-indigo-500',
    low: 'bg-blue-400',
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'trends', label: 'Trends', icon: '📈' },
    { id: 'streaks', label: 'Streaks', icon: '🔥' },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-bold text-foreground flex-1">Analytics</h1>
          <button
            onClick={fetchData}
            disabled={refreshing || !familyId}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-indigo-500' : ''}`} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="max-w-2xl mx-auto px-4 pb-2">
          <div className="flex gap-1 bg-secondary/50 rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
            <p className="text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300 mb-3">
              {error}
            </p>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-semibold hover:bg-rose-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Data: Overview tab */}
        {data && activeTab === 'overview' && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Completed"
                value={data.insights.completedCount}
                icon={BarChart3}
                color="emerald"
              />
              <StatCard
                label="Pending"
                value={data.insights.pendingCount}
                icon={Clock}
                color="amber"
              />
              <StatCard
                label="Completion Rate"
                value={`${data.insights.completionRate}%`}
                icon={BarChart3}
                color="indigo"
              />
              <StatCard
                label="This Week"
                value={data.insights.thisWeekCompleted}
                icon={Flame}
                color="rose"
              />
            </div>

            {/* Insights */}
            <Section title="💡 Insights">
              <TrendInsights data={data.insights} />
            </Section>

            {/* Priority breakdown */}
            <Section title="🏷️ Priority Breakdown">
              <div className="space-y-3">
                {(Object.entries(data.priorityBreakdown) as [string, number][]).map(([key, count]) => {
                  const total = data.insights.totalTasks
                  const pct = total > 0 ? (count / total) * 100 : 0
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground capitalize">{key}</span>
                        <span className="text-xs text-muted-foreground">{count} ({Math.round(pct)}%)</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${priorityColors[key] || 'bg-indigo-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>

            {/* Time of day */}
            <Section title="⏰ Peak Hours">
              <TimeOfDayAnalysis data={data.timeOfDay} />
            </Section>
          </>
        )}

        {/* Data: Members tab */}
        {data && activeTab === 'members' && (
          <Section title="👥 Member Productivity">
            <MemberProductivity data={data.memberProductivity} />
          </Section>
        )}

        {/* Data: Trends tab */}
        {data && activeTab === 'trends' && (
          <Section title="📈 Completion Trends (30 days)">
            <CompletionTrends data={data.completionTrends} />
          </Section>
        )}

        {/* Data: Streaks tab */}
        {data && activeTab === 'streaks' && (
          <Section title="🔥 Streak Tracker">
            <StreakDisplay data={data.streaks} />
          </Section>
        )}

        {/* No data state (loaded but empty) */}
        {data && data.insights.totalTasks === 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 text-center mt-4">
            <BarChart3 className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">No data yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start creating and completing tasks to see analytics!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, color
}: {
  label: string
  value: string | number
  icon: React.ElementType
  color: 'emerald' | 'amber' | 'indigo' | 'rose'
}) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-500', border: 'border-emerald-200/50' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-500', border: 'border-amber-200/50' },
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-500', border: 'border-indigo-200/50' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-500', border: 'border-rose-200/50' },
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-sm font-bold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  )
}
