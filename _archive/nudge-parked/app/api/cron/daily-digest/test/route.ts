/**
 * GET /api/cron/daily-digest/test
 * Test endpoint for the daily digest cron job.
 *
 * Generates a digest for a single user and returns the data as JSON
 * without actually sending any emails or creating notifications.
 *
 * Usage: GET /api/cron/daily-digest/test?userId=<user-uuid>
 *
 * Optional query params:
 *   - userId (required): The user to generate a digest for
 *   - secret: CRON_SECRET if auth is configured
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// ── Types ────────────────────────────────────────────────────────

interface TaskItem {
  id: string
  title: string
  priority: string
  due_date: string | null
  status: string
}

interface UserDigest {
  userId: string
  email: string | null
  fullName: string
  tasksDueToday: TaskItem[]
  tasksOverdue: TaskItem[]
  totalAssigned: number
  completedToday: number
  pendingInvites: number
}

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) return true

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')
  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Queries ──────────────────────────────────────────────────────

async function getTasksDueToday(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<TaskItem[]> {
  const today = new Date()
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0))
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999))

  const { data } = await supabase
    .from('tasks')
    .select('id, title, priority, due_date, status')
    .eq('assigned_to', userId)
    .in('status', ['pending', 'in_progress'])
    .gte('due_date', startOfDay.toISOString())
    .lte('due_date', endOfDay.toISOString())
    .order('priority', { ascending: false })
    .limit(50)

  return (data || []) as TaskItem[]
}

async function getOverdueTasks(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<TaskItem[]> {
  const now = new Date().toISOString()

  const { data } = await supabase
    .from('tasks')
    .select('id, title, priority, due_date, status')
    .eq('assigned_to', userId)
    .in('status', ['pending', 'in_progress'])
    .not('due_date', 'is', null)
    .lt('due_date', now)
    .order('due_date', { ascending: true })
    .limit(50)

  return (data || []) as TaskItem[]
}

async function getTotalAssignedTasks(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<number> {
  const { count } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('assigned_to', userId)
    .in('status', ['pending', 'in_progress'])

  return count ?? 0
}

async function getCompletedTasksToday(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<number> {
  const today = new Date()
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0))
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999))

  const { count } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('assigned_to', userId)
    .eq('status', 'completed')
    .gte('completed_at', startOfDay.toISOString())
    .lte('completed_at', endOfDay.toISOString())

  return count ?? 0
}

// ── Handler ──────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = request.nextUrl.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing required query param: userId' }, { status: 400 })
  }

  try {
    const supabase = createAdminClient()

    // Fetch user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({
        error: 'User not found',
        detail: userError?.message || `No user with id ${userId}`,
      }, { status: 404 })
    }

    // Gather tasks
    const [tasksDueToday, tasksOverdue, totalAssigned, completedToday] = await Promise.all([
      getTasksDueToday(supabase, userId),
      getOverdueTasks(supabase, userId),
      getTotalAssignedTasks(supabase, userId),
      getCompletedTasksToday(supabase, userId),
    ])

    // Build digest payload (same format as what would be emailed)
    const allTasks = [...tasksDueToday, ...tasksOverdue]
    const taskList = allTasks.map(t => ({
      title: t.title,
      priority: t.priority,
      dueDate: t.due_date
        ? new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : undefined,
      status: t.status,
    }))

    const digest: UserDigest = {
      userId: user.id,
      email: user.email,
      fullName: user.full_name || 'there',
      tasksDueToday,
      tasksOverdue,
      totalAssigned,
      completedToday,
      pendingInvites: 0,
    }

    // Build the email HTML (for preview purposes)
    const { dailyDigestEmail } = await import('@/lib/email/templates')
    const emailContent = dailyDigestEmail({
      to: user.email || 'test@example.com',
      userName: digest.fullName,
      completedToday,
      pendingToday: tasksDueToday.length,
      totalTasks: totalAssigned,
      overdueCount: tasksOverdue.length,
      taskList,
    })

    return NextResponse.json({
      success: true,
      test: true,
      note: 'This is a test run — no emails or notifications were sent',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      },
      stats: {
        tasksDueTodayCount: tasksDueToday.length,
        tasksOverdueCount: tasksOverdue.length,
        totalAssigned,
        completedToday,
        pendingInvites: 0,
      },
      digest,
      emailPreview: {
        subject: emailContent.subject,
        htmlLength: emailContent.html.length,
        htmlPreview: emailContent.html.substring(0, 2000) + '...',
      },
    })
  } catch (err: any) {
    console.error('[Daily Digest Test] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
