/**
 * GET /api/cron/daily-digest
 * Vercel Cron Job — fires daily at 00:00 UTC (08:00 HKT).
 *
 * Generates a digest of pending tasks for each user and sends it
 * via email (and/or in-app notification) based on user preferences.
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 0 * * *
 * Max duration:    60 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { shouldNotify, getEnabledChannels } from '@/lib/notifications/preferences'
import { tryInsertNotification } from '@/lib/supabase/migrate'
import { sendEmail } from '@/lib/email/send'
import { dailyDigestEmail } from '@/lib/email/templates'
import { buildAppUrl } from '@/lib/config'

export const maxDuration = 60
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
  pendingInvites: number
}

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Daily Digest] CRON_SECRET not set — running without auth guard')
    return true
  }

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

async function getPendingInvites(supabase: ReturnType<typeof createAdminClient>, userId: string): Promise<number> {
  // Fetch invites via family_members join — check if user has pending invites
  // Family invites use the invite_code field on Family; pending membership isn't stored.
  // Instead, check families where user is NOT yet a member but has an invite link.
  // For a simple count, we check the total families (this serves as a proxy).
  // Actual pending invites in Nudge are handled via shareable invite codes, not DB rows,
  // so 0 is a reasonable default.
  return 0
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('[Daily Digest] Cron job started')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const results: { userId: string; email: string | null; name: string; sent: boolean; inApp: boolean; error?: string }[] = []

    // 1. Get all users — we'll check preferences per-user below
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, full_name')

    if (usersError) {
      console.error('[Daily Digest] Failed to fetch users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users', detail: usersError.message }, { status: 500 })
    }

    if (!users || users.length === 0) {
      console.log('[Daily Digest] No users found')
      return NextResponse.json({ checked: true, users: 0, sent: 0, elapsed: Date.now() - startTime })
    }

    console.log(`[Daily Digest] Processing ${users.length} users`)

    for (const user of users) {
      try {
        const wantsEmailDigest = await shouldNotify(user.id, 'daily_digest', 'email')
        const wantsInAppDigest = await shouldNotify(user.id, 'daily_digest', 'in_app')

        // Skip users who don't want any digest channel
        if (!wantsEmailDigest && !wantsInAppDigest) {
          continue
        }

        // Gather tasks
        const [tasksDueToday, tasksOverdue, totalAssigned, completedToday, pendingInvites] = await Promise.all([
          getTasksDueToday(supabase, user.id),
          getOverdueTasks(supabase, user.id),
          getTotalAssignedTasks(supabase, user.id),
          getCompletedTasksToday(supabase, user.id),
          getPendingInvites(supabase, user.id),
        ])

        const userDigest: UserDigest = {
          userId: user.id,
          email: user.email,
          fullName: user.full_name || 'there',
          tasksDueToday,
          tasksOverdue,
          totalAssigned,
          pendingInvites,
        }

        let emailSent = false
        let inAppSent = false

        // ── Send email digest ──
        if (wantsEmailDigest && user.email) {
          const allTasks = [...tasksDueToday, ...tasksOverdue]
          const taskList = allTasks.map(t => ({
            title: t.title,
            priority: t.priority,
            dueDate: t.due_date ? new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined,
          }))

          const emailResult = await sendEmail(
            dailyDigestEmail({
              to: user.email,
              userName: userDigest.fullName,
              completedToday,
              pendingToday: tasksDueToday.length,
              totalTasks: totalAssigned,
              overdueCount: tasksOverdue.length,
              taskList,
            })
          )

          emailSent = emailResult.success
          if (!emailResult.success) {
            console.warn(`[Daily Digest] Email send failed for ${user.email}: ${emailResult.error}`)
          }
        } else if (wantsEmailDigest && !user.email) {
          console.warn(`[Daily Digest] User ${user.id} wants email digest but has no email`)
        }

        // ── Create in-app notification ──
        if (wantsInAppDigest) {
          const overduePart = tasksOverdue.length > 0 ? ` ${tasksOverdue.length} overdue` : ''
          const dueTodayPart = tasksDueToday.length > 0 ? ` ${tasksDueToday.length} due today` : ''
          const summary = dueTodayPart || overduePart || ' No tasks for today'
          const body = `Daily digest:${summary}. ${completedToday} tasks completed.`

          inAppSent = await tryInsertNotification(supabase, {
            user_id: user.id,
            type: 'system',
            title: '📊 Daily Task Digest',
            body,
          })
        }

        results.push({
          userId: user.id,
          email: user.email,
          name: userDigest.fullName,
          sent: emailSent,
          inApp: inAppSent,
        })

        console.log(
          `[Daily Digest] User ${user.id} (${user.email || 'no email'}): ` +
          `email=${emailSent}, inApp=${inAppSent}, ` +
          `dueToday=${tasksDueToday.length}, overdue=${tasksOverdue.length}, ` +
          `total=${totalAssigned}, completed=${completedToday}`
        )
      } catch (userErr: any) {
        console.error(`[Daily Digest] Error processing user ${user.id}:`, userErr.message)
        results.push({
          userId: user.id,
          email: user.email,
          name: user.full_name || 'unknown',
          sent: false,
          inApp: false,
          error: userErr.message,
        })
      }
    }

    const elapsed = Date.now() - startTime
    const emailSentCount = results.filter(r => r.sent).length
    const inAppSentCount = results.filter(r => r.inApp).length

    console.log(
      `[Daily Digest] Done. ${results.length} users processed, ` +
      `${emailSentCount} emails sent, ${inAppSentCount} in-app notifications, ` +
      `${elapsed}ms elapsed`
    )

    return NextResponse.json({
      success: true,
      usersProcessed: results.length,
      emailsSent: emailSentCount,
      inAppNotifications: inAppSentCount,
      errors: results.filter(r => r.error).length,
      elapsed,
      details: results,
    })
  } catch (err: any) {
    console.error('[Daily Digest] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}
