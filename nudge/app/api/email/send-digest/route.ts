/**
 * POST /api/email/send-digest
 * Sends a daily digest or weekly scorecard email.
 * Called by cron job at scheduled intervals.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { dailyDigestEmail, weeklyScorecardEmail } from '@/lib/email/templates'

export async function POST(request: NextRequest) {
  try {
    const { userId, familyId, type } = await request.json()

    if (!userId || !familyId) {
      return NextResponse.json({ error: 'Missing userId or familyId' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const isWeekly = type === 'weekly'

    // Get user
    const { data: user } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('id', userId)
      .single()

    if (!user?.email) {
      return NextResponse.json({ error: 'User has no email' }, { status: 404 })
    }

    // Get family
    const { data: family } = await supabase
      .from('families')
      .select('name')
      .eq('id', familyId)
      .single()

    if (!family) {
      return NextResponse.json({ error: 'Family not found' }, { status: 404 })
    }

    // Get all family members
    const { data: members } = await supabase
      .from('family_members')
      .select('user_id')
      .eq('family_id', familyId)

    const memberIds = members?.map(m => m.user_id) || []
    const isOwner = true // checked above

    // Date range
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    let startDate: Date
    if (isWeekly) {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - startDate.getDay() - 6) // previous Monday
    } else {
      startDate = new Date(today)
    }

    // Get tasks for this period
    const { data: tasks } = await supabase
      .from('tasks')
      .select('id, title, priority, due_date, status, completed_at, assigned_to, created_by')
      .eq('family_id', familyId)
      .gte('created_at', startDate.toISOString())

    const myTasks = tasks?.filter(t => t.assigned_to === userId) || []
    const completed = myTasks.filter(t => t.status === 'completed')
    const pending = myTasks.filter(t => t.status === 'pending' || t.status === 'in_progress')
    const overdue = pending.filter(t => t.due_date && new Date(t.due_date) < now)

    if (isWeekly) {
      // Find top member
      interface MemberStats {
        userId: string
        name: string
        count: number
      }
      const memberStatsMap = new Map<string, MemberStats>()

      for (const mid of memberIds) {
        const { data: m } = await supabase
          .from('users')
          .select('id, full_name')
          .eq('id', mid)
          .single()
        if (m) {
          memberStatsMap.set(m.id, {
            userId: m.id,
            name: m.full_name || 'Unknown',
            count: 0,
          })
        }
      }

      for (const t of tasks || []) {
        if (t.status === 'completed' && t.assigned_to) {
          const existing = memberStatsMap.get(t.assigned_to)
          if (existing) existing.count++
        }
      }

      const sortedMembers = Array.from(memberStatsMap.values()).sort((a, b) => b.count - a.count)
      const topMember = sortedMembers[0]

      // Calculate streak (simplified: consecutive days someone completed a task)
      let streak = 0
      const checkDate = new Date(today)
      while (true) {
        const dayStart = new Date(checkDate)
        const dayEnd = new Date(checkDate)
        dayEnd.setHours(23, 59, 59, 999)

        const dayTasks = tasks?.filter(t => {
          if (!t.completed_at) return false
          const ca = new Date(t.completed_at)
          return ca >= dayStart && ca <= dayEnd && t.status === 'completed'
        })

        if (dayTasks && dayTasks.length > 0) {
          streak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }

      const totalCompleted = tasks?.filter(t => t.status === 'completed').length || 0
      const totalCreated = tasks?.length || 0
      const completionRate = totalCreated > 0
        ? Math.round((totalCompleted / totalCreated) * 100)
        : 0

      const weekLabel = `Week of ${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

      const result = await sendEmail(weeklyScorecardEmail({
        to: user.email!,
        userName: user.full_name || 'there',
        familyName: family.name,
        weekLabel,
        tasksCompleted: totalCompleted,
        tasksCreated: totalCreated,
        streak,
        topMember: topMember?.name || 'No one yet',
        topMemberTasks: topMember?.count || 0,
        memberCount: memberIds.length,
        completionRate,
      }))

      return NextResponse.json({ success: result.success })
    }

    // Daily digest
    const taskList = myTasks.filter(t => t.status !== 'completed').slice(0, 10).map(t => ({
      title: t.title,
      priority: t.priority,
      dueDate: t.due_date ? new Date(t.due_date).toLocaleDateString() : undefined,
    }))

    const result = await sendEmail(dailyDigestEmail({
      to: user.email!,
      userName: user.full_name || 'there',
      completedToday: completed.length,
      pendingToday: pending.length,
      totalTasks: myTasks.length,
      overdueCount: overdue.length,
      taskList,
    }))

    return NextResponse.json({ success: result.success })
  } catch (err: any) {
    console.error('[Email Digest] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
