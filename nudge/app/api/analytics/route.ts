/**
 * GET /api/analytics?familyId={familyId}
 *
 * Returns aggregated analytics data for the family dashboard:
 *   - completionTrends: daily completions for the last 30 days
 *   - memberProductivity: per-member completion counts
 *   - streakData: current/longest streaks per member
 *   - priorityBreakdown: task counts by priority
 *   - timeOfDay: tasks completed by time bucket
 *   - insights: computed trend insights
 *
 * Requires authenticated user who belongs to the family.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

interface TaskRow {
  id: string
  title: string
  status: string
  priority: string
  assigned_to: string | null
  completed_at: string | null
  created_at: string
  due_date: string | null
}

interface MemberRow {
  user_id: string
  role: string
  full_name: string
}

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const familyId = request.nextUrl.searchParams.get('familyId')
  if (!familyId) {
    return NextResponse.json({ error: 'familyId query param required' }, { status: 400 })
  }

  // Verify user belongs to this family
  const { data: membership } = await supabase
    .from('family_members')
    .select('role')
    .eq('family_id', familyId)
    .eq('user_id', user.id)
    .single()

  if (!membership) {
    return NextResponse.json({ error: 'Not a member of this family' }, { status: 403 })
  }

  try {
    // 1. Fetch all tasks for the family (non-deleted)
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('id, title, status, priority, assigned_to, completed_at, created_at, due_date')
      .eq('family_id', familyId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (tasksError) {
      return NextResponse.json({ error: tasksError.message }, { status: 500 })
    }

    // 2. Fetch family members with names
    const { data: members } = await supabase
      .from('family_members')
      .select(`
        user_id,
        role,
        users!inner(full_name)
      `)
      .eq('family_id', familyId)

    const memberMap = new Map<string, string>()
    const memberRoles = new Map<string, string>()
    if (members) {
      for (const m of members) {
        const u = Array.isArray(m.users) ? m.users[0] : m.users
        memberMap.set(m.user_id, (u as any)?.full_name || 'Unknown')
        memberRoles.set(m.user_id, m.role)
      }
    }

    const allTasks = (tasks || []) as TaskRow[]
    const completed = allTasks.filter(t => t.status === 'completed')
    const pending = allTasks.filter(t => t.status === 'pending' || t.status === 'in_progress')

    // ── 3. Completion Trends (last 30 days) ──
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    thirtyDaysAgo.setHours(0, 0, 0, 0)

    const dailyCompletions: Record<string, number> = {}
    const dailyCompletionsByMember: Record<string, Record<string, number>> = {}

    // Initialize all 30 days
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo)
      d.setDate(d.getDate() + i)
      const key = d.toISOString().slice(0, 10)
      dailyCompletions[key] = 0
    }

    for (const t of completed) {
      if (!t.completed_at) continue
      const ca = new Date(t.completed_at)
      if (ca < thirtyDaysAgo) continue
      const key = ca.toISOString().slice(0, 10)
      dailyCompletions[key] = (dailyCompletions[key] || 0) + 1

      if (t.assigned_to) {
        if (!dailyCompletionsByMember[t.assigned_to]) {
          dailyCompletionsByMember[t.assigned_to] = {}
        }
        dailyCompletionsByMember[t.assigned_to][key] =
          (dailyCompletionsByMember[t.assigned_to][key] || 0) + 1
      }
    }

    const completionTrends = Object.entries(dailyCompletions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date,
        count,
        dayLabel: new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      }))

    // ── 4. Member Productivity ──
    const memberProductivity = Array.from(memberMap.entries()).map(([userId, name]) => {
      const completedBy = completed.filter(t => t.assigned_to === userId).length
      const pendingTotal = pending.filter(t => t.assigned_to === userId).length
      const overdue = pending.filter(t => {
        if (!t.due_date) return false
        return new Date(t.due_date) < now
      }).length

      // This week
      const weekStart = new Date(now)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      weekStart.setHours(0, 0, 0, 0)
      const thisWeek = completed.filter(t => {
        if (!t.completed_at || t.assigned_to !== userId) return false
        return new Date(t.completed_at) >= weekStart
      }).length

      return {
        userId,
        name,
        completed: completedBy,
        pending: pendingTotal,
        overdue,
        thisWeek,
        role: memberRoles.get(userId) || 'member',
        completionRate: completedBy + pendingTotal > 0
          ? Math.round((completedBy / (completedBy + pendingTotal)) * 100)
          : 0,
      }
    }).sort((a, b) => b.completed - a.completed)

    // ── 5. Streak Data ──
    // Current streak per member
    const streaks = Array.from(memberMap.entries()).map(([userId, name]) => {
      let currentStreak = 0
      let longestStreak = 0
      let tempStreak = 0

      // Build set of days this user completed tasks
      const completionDays = new Set<string>()
      for (const t of completed) {
        if (t.assigned_to !== userId || !t.completed_at) continue
        completionDays.add(new Date(t.completed_at).toISOString().slice(0, 10))
      }

      // Current streak (going backward from today)
      const checkDate = new Date(now)
      checkDate.setHours(0, 0, 0, 0)
      for (let i = 0; i < 365; i++) {
        const key = checkDate.toISOString().slice(0, 10)
        if (completionDays.has(key)) {
          currentStreak++
        } else if (i > 0) {
          break
        }
        checkDate.setDate(checkDate.getDate() - 1)
      }

      // Longest streak (scan all completion days)
      const sortedDays = Array.from(completionDays).sort()
      for (let i = 0; i < sortedDays.length; i++) {
        if (i === 0) {
          tempStreak = 1
        } else {
          const prev = new Date(sortedDays[i - 1])
          const curr = new Date(sortedDays[i])
          const diffDays = Math.round(
            (curr.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000)
          )
          if (diffDays === 1) {
            tempStreak++
          } else {
            tempStreak = 1
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak)
      }

      // If no completions, longest is 0
      if (completionDays.size === 0) longestStreak = 0

      return { userId, name, currentStreak, longestStreak }
    }).sort((a, b) => b.currentStreak - a.currentStreak)

    // ── 6. Priority Breakdown ──
    const priorityBreakdown = {
      urgent: allTasks.filter(t => t.priority === 'urgent').length,
      high: allTasks.filter(t => t.priority === 'high').length,
      medium: allTasks.filter(t => t.priority === 'medium').length,
      low: allTasks.filter(t => t.priority === 'low').length,
    }

    // ── 7. Time of Day Analysis ──
    const timeBuckets = [
      { label: '🌅 Morning (6-12)', start: 6, end: 12, count: 0 },
      { label: '☀️ Afternoon (12-18)', start: 12, end: 18, count: 0 },
      { label: '🌆 Evening (18-22)', start: 18, end: 22, count: 0 },
      { label: '🌙 Night (22-6)', start: 22, end: 6, count: 0 },
    ]

    for (const t of completed) {
      if (!t.completed_at) continue
      const hour = new Date(t.completed_at).getHours()
      for (const bucket of timeBuckets) {
        if (bucket.start <= bucket.end) {
          if (hour >= bucket.start && hour < bucket.end) {
            bucket.count++
            break
          }
        } else {
          // Overnight bucket (22-6)
          if (hour >= bucket.start || hour < bucket.end) {
            bucket.count++
            break
          }
        }
      }
    }

    // ── 8. Insights ──
    const totalTasks = allTasks.length
    const completedCount = completed.length
    const overdueCount = pending.filter(t => {
      if (!t.due_date) return false
      return new Date(t.due_date) < now
    }).length

    // Best day of week
    const dayOfWeekCounts = [0, 0, 0, 0, 0, 0, 0]
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for (const t of completed) {
      if (!t.completed_at) continue
      const dow = new Date(t.completed_at).getDay()
      dayOfWeekCounts[dow]++
    }
    const bestDayIndex = dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts))

    // Most productive member (this week)
    const mostProductiveMember = memberProductivity.length > 0
      ? memberProductivity[0]
      : null

    // Completion rate change (last 7 days vs previous 7)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const prev7Days = new Date(last7Days.getTime() - 7 * 24 * 60 * 60 * 1000)

    const last7Completed = completed.filter(t => {
      if (!t.completed_at) return false
      const ca = new Date(t.completed_at)
      return ca >= last7Days && ca <= now
    }).length

    const prev7Completed = completed.filter(t => {
      if (!t.completed_at) return false
      const ca = new Date(t.completed_at)
      return ca >= prev7Days && ca < last7Days
    }).length

    const completionRateChange = prev7Completed > 0
      ? Math.round(((last7Completed - prev7Completed) / prev7Completed) * 100)
      : last7Completed > 0 ? 100 : 0

    const insights = {
      totalTasks,
      completedCount,
      pendingCount: pending.length,
      overdueCount,
      completionRate: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0,
      bestDay: dayNames[bestDayIndex] || 'N/A',
      bestDayTasks: dayOfWeekCounts[bestDayIndex] || 0,
      mostProductiveMember: mostProductiveMember ? {
        name: mostProductiveMember.name,
        completed: mostProductiveMember.completed,
      } : null,
      completionRateChange,
      thisWeekCompleted: memberProductivity.reduce((s, m) => s + m.thisWeek, 0),
      activeMembers: memberProductivity.filter(m => m.completed > 0 || m.pending > 0).length,
      totalMembers: memberProductivity.length,
    }

    // ── 9. Share Analytics ──
    let shareStats = { totalShares: 0, platforms: {} }
    try {
      const { data: shares } = await supabase
        .from('task_shares')
        .select('platform')
        .in('task_id', allTasks.map(t => t.id))

      if (shares) {
        const platformCounts: Record<string, number> = {}
        let total = 0
        for (const s of shares) {
          platformCounts[s.platform] = (platformCounts[s.platform] || 0) + 1
          total++
        }
        shareStats = { totalShares: total, platforms: platformCounts }
      }
    } catch {
      // task_shares table may not exist yet
    }

    return NextResponse.json({
      completionTrends,
      memberProductivity,
      streaks,
      priorityBreakdown,
      timeOfDay: timeBuckets,
      insights,
      shares: shareStats,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[Analytics] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
