/**
 * GET /api/cron/master
 * Vercel Cron Job — fires once daily at 10:00 UTC (18:00 HKT).
 *
 * Master orchestrator that handles all scheduled maintenance tasks:
 *   1. Daily digest emails (every day)
 *   2. Trial-expiry check emails (every day)
 *   3. Weekly scorecard (Sundays only)
 *   4. Check due-soon reminders (every run)
 *
 * Vercel Hobby accounts are limited to 1 cron job per day, so we consolidate
 * everything into one scheduled endpoint.
 *
 * Protected by CRON_SECRET environment variable.
 *
 * Cron schedule:   0 10 * * *
 * Max duration:    120 seconds
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { shouldNotify } from '@/lib/notifications/preferences'
import { sendEmail } from '@/lib/email/send'
import {
  dailyDigestEmail,
  weeklyScorecardEmail,
  trialExpiringEmail,
  taskReminderEmail,
} from '@/lib/email/templates'
import { tryInsertNotification } from '@/lib/supabase/migrate'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// ── Auth ─────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.warn('[Master Cron] CRON_SECRET not set — running without auth guard')
    return true
  }

  const auth = request.headers.get('authorization')
  const querySecret = request.nextUrl.searchParams.get('secret')

  return auth === `Bearer ${cronSecret}` || querySecret === cronSecret
}

// ── Helpers ──────────────────────────────────────────────────────

function getDayOfWeek(): number {
  return new Date().getDay() // 0=Sunday
}

function getWeekRange(): { start: Date; end: Date; label: string } {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  const start = new Date(now)
  start.setDate(start.getDate() - daysSinceMonday - 7)
  start.setHours(0, 0, 0, 0)

  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  const endOfWeek = new Date(start)
  endOfWeek.setDate(endOfWeek.getDate() + 6)

  const label = `Week of ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

  return { start, end, label }
}

function buildAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'
}

// ── Task 1: Daily Digest ────────────────────────────────────────

async function runDailyDigest(supabase: ReturnType<typeof createAdminClient>) {
  console.log('[Master Cron] Task: Daily Digest')
  const startTime = Date.now()

  // Get all families with active members
  const { data: families } = await supabase
    .from('families')
    .select('id, name')

  if (!families || families.length === 0) {
    console.log('[Master Cron] Daily Digest: No families found')
    return { families: 0, sent: 0, errors: 0 }
  }

  let totalSent = 0
  let totalErrors = 0

  for (const family of families) {
    try {
      // Get members
      const { data: members } = await supabase
        .from('family_members')
        .select('user_id')
        .eq('family_id', family.id)

      if (!members || members.length === 0) continue

      // Get tasks for this family created/updated today
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      const { data: tasks } = await supabase
        .from('tasks')
        .select('id, title, status, assigned_to, created_by, created_at, due_date')
        .eq('family_id', family.id)
        .gte('created_at', todayStart.toISOString())
        .limit(20)

      const completedToday = tasks?.filter(t => t.status === 'completed').length || 0
      const pendingToday = tasks?.filter(t => t.status === 'pending').length || 0
      const totalCount = tasks?.length || 0
      const overdueCount = tasks?.filter(t => t.status === 'overdue').length || 0
      const taskList = (tasks || []).slice(0, 10).map(t => ({
        title: t.title,
        priority: (t as any).priority || 'normal',
        dueDate: t.due_date || t.created_at,
      }))

      for (const member of members) {
        try {
          const wantsEmail = await shouldNotify(member.user_id, 'daily_digest', 'email')
          if (!wantsEmail) continue

          const { data: user } = await supabase
            .from('users')
            .select('id, email, full_name')
            .eq('id', member.user_id)
            .single()

          if (!user || !user.email) continue

          const result = await sendEmail(
            dailyDigestEmail({
              to: user.email,
              userName: user.full_name || 'there',
              completedToday,
              pendingToday,
              totalTasks: totalCount,
              overdueCount,
              taskList,
            })
          )

          if (result.success) totalSent++
          else totalErrors++
        } catch (memberErr: any) {
          totalErrors++
          console.error(`[Daily Digest] Member error ${member.user_id}:`, memberErr.message)
        }
      }
    } catch (familyErr: any) {
      totalErrors++
      console.error(`[Daily Digest] Family error ${family.id}:`, familyErr.message)
    }
  }

  console.log(`[Master Cron] Daily Digest: ${totalSent} sent, ${totalErrors} errors, ${families.length} families, ${Date.now() - startTime}ms`)
  return { families: families.length, sent: totalSent, errors: totalErrors }
}

// ── Task 2: Check Trials ────────────────────────────────────────

async function runCheckTrials(supabase: ReturnType<typeof createAdminClient>) {
  console.log('[Master Cron] Task: Check Expiring Trials')
  const startTime = Date.now()

  const now = new Date()
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()

  const { data: expiringSubs } = await supabase
    .from('subscriptions')
    .select('id, family_id, plan, trial_ends_at')
    .in('status', ['trialing', 'active'])
    .not('trial_ends_at', 'is', null)
    .lte('trial_ends_at', threeDaysFromNow)
    .gte('trial_ends_at', now.toISOString())
    .limit(50)

  if (!expiringSubs || expiringSubs.length === 0) {
    console.log('[Master Cron] Check Trials: No expiring trials')
    return { found: 0, notified: 0, errors: 0 }
  }

  let notified = 0
  let errors = 0

  for (const sub of expiringSubs) {
    try {
      if (!sub.trial_ends_at) continue

      const trialEnd = new Date(sub.trial_ends_at)
      const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      if (daysRemaining <= 0) continue

      // Find family owner
      const { data: owner } = await supabase
        .from('family_members')
        .select('user_id')
        .eq('family_id', sub.family_id)
        .eq('role', 'owner')
        .single()

      if (!owner) continue

      const { data: user } = await supabase
        .from('users')
        .select('id, email, full_name')
        .eq('id', owner.user_id)
        .single()

      if (!user || !user.email) continue

      const planName = sub.plan === 'family' ? 'Family' : 'Pro'

      const result = await sendEmail(
        trialExpiringEmail({
          to: user.email,
          userName: user.full_name || 'there',
          planName,
          daysRemaining,
          subscribeUrl: `${buildAppUrl()}/dashboard/settings`,
        })
      )

      if (result.success) {
        notified++
        console.log(`[Check Trials] Notified ${user.email} (${planName}, ${daysRemaining}d left)`)
      } else {
        errors++
        console.warn(`[Check Trials] Failed for ${user.email}: ${result.error}`)
      }
    } catch (err: any) {
      errors++
      console.error(`[Check Trials] Error:`, err.message)
    }
  }

  console.log(`[Master Cron] Check Trials: ${notified} notified, ${errors} errors, ${Date.now() - startTime}ms`)
  return { found: expiringSubs.length, notified, errors }
}

// ── Task 3: Weekly Scorecard (Sundays only) ─────────────────────

async function runWeeklyScorecard(supabase: ReturnType<typeof createAdminClient>) {
  const dayOfWeek = getDayOfWeek()
  if (dayOfWeek !== 0) {
    console.log(`[Master Cron] Weekly Scorecard: Skipping (day ${dayOfWeek}, Sunday=0 required)`)
    return { skipped: true, reason: 'Not Sunday' }
  }

  console.log('[Master Cron] Task: Weekly Scorecard (Sunday)')
  const startTime = Date.now()
  const weekRange = getWeekRange()

  const { data: families } = await supabase
    .from('families')
    .select('id, name')

  if (!families || families.length === 0) {
    return { families: 0, sent: 0, errors: 0 }
  }

  let totalSent = 0
  let totalErrors = 0

  for (const family of families) {
    try {
      const { data: members } = await supabase
        .from('family_members')
        .select('user_id')
        .eq('family_id', family.id)

      if (!members || members.length === 0) continue
      const memberIds = members.map(m => m.user_id)

      // Get this week's tasks
      const { data: tasks } = await supabase
        .from('tasks')
        .select('id, title, status, completed_at, assigned_to, created_at')
        .eq('family_id', family.id)
        .gte('created_at', weekRange.start.toISOString())
        .lte('created_at', weekRange.end.toISOString())

      if (!tasks || tasks.length === 0) continue

      const totalCompleted = tasks.filter(t => t.status === 'completed').length
      const completionRate = tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0

      // Calculate streak
      let bestStreak = 0
      let currentStreak = 0
      const checkDate = new Date(weekRange.end)
      while (checkDate >= weekRange.start) {
        const dayStart = new Date(checkDate)
        dayStart.setHours(0, 0, 0, 0)
        const dayEnd = new Date(checkDate)
        dayEnd.setHours(23, 59, 59, 999)

        const dayCompleted = tasks.filter(t => {
          if (!t.completed_at) return false
          const ca = new Date(t.completed_at)
          return ca >= dayStart && ca <= dayEnd && t.status === 'completed'
        }).length

        if (dayCompleted > 0) {
          currentStreak++
          bestStreak = Math.max(bestStreak, currentStreak)
        } else {
          currentStreak = 0
        }
        checkDate.setDate(checkDate.getDate() - 1)
      }

      // Per-member stats
      const memberStats = await Promise.all(
        memberIds.map(async (mid) => {
          const { data: user } = await supabase
            .from('users')
            .select('id, full_name')
            .eq('id', mid)
            .single()
          const completed = tasks.filter(
            t => t.assigned_to === mid && t.status === 'completed'
          ).length
          return { userId: mid, name: user?.full_name || 'Unknown', completed }
        })
      )

      memberStats.sort((a, b) => b.completed - a.completed)
      const topMember = memberStats[0]

      // Send to each member
      for (const member of members) {
        try {
          const wantsEmail = await shouldNotify(member.user_id, 'weekly_summary', 'email')
          if (!wantsEmail) continue

          const { data: user } = await supabase
            .from('users')
            .select('id, email, full_name')
            .eq('id', member.user_id)
            .single()

          if (!user || !user.email) continue

          const result = await sendEmail(
            weeklyScorecardEmail({
              to: user.email,
              userName: user.full_name || 'there',
              familyName: family.name,
              weekLabel: weekRange.label,
              tasksCompleted: totalCompleted,
              tasksCreated: tasks.length,
              streak: bestStreak,
              topMember: topMember?.name || 'No one yet',
              topMemberTasks: topMember?.completed || 0,
              memberCount: memberStats.length,
              completionRate,
            })
          )

          if (result.success) totalSent++
          else totalErrors++
        } catch (memberErr: any) {
          totalErrors++
        }
      }
    } catch (familyErr: any) {
      totalErrors++
    }
  }

  console.log(`[Master Cron] Weekly Scorecard: ${totalSent} sent, ${totalErrors} errors, ${Date.now() - startTime}ms`)
  return { families: families.length, sent: totalSent, errors: totalErrors, week: weekRange.label }
}

// ── Task 4: Check Due-Soon Reminders ────────────────────────────

async function runDueSoonReminders(supabase: ReturnType<typeof createAdminClient>) {
  console.log('[Master Cron] Task: Check Due-Soon Reminders')
  const startTime = Date.now()

  const now = new Date()
  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString()

  // Find tasks due within the next 2 hours that are still pending
  const { data: upcomingTasks } = await supabase
    .from('tasks')
    .select('id, title, due_date, family_id, assigned_to')
    .eq('status', 'pending')
    .not('due_date', 'is', null)
    .gte('due_date', now.toISOString())
    .lte('due_date', twoHoursFromNow)
    .limit(20)

  if (!upcomingTasks || upcomingTasks.length === 0) {
    console.log('[Master Cron] Due-Soon: No upcoming tasks')
    return { tasks: 0, reminded: 0 }
  }

  let reminded = 0

  for (const task of upcomingTasks) {
    try {
      if (!task.assigned_to) continue

      // Check if Telegram notification opt-in
      const wantsTelegram = await shouldNotify(task.assigned_to, 'task_due_soon', 'telegram')
      const wantsEmail = await shouldNotify(task.assigned_to, 'task_due_soon', 'email')

      if (!wantsTelegram && !wantsEmail) continue

      const { data: user } = await supabase
        .from('users')
        .select('id, email, full_name, telegram_chat_id')
        .eq('id', task.assigned_to)
        .single()

      if (!user) continue

      const taskLink = `${buildAppUrl()}/dashboard/tasks/${task.id}`
      const message = `⏰ Reminder: "${task.title}" is due soon!`

      // Telegram notification
      if (wantsTelegram && user.telegram_chat_id) {
        const botToken = process.env.TELEGRAM_BOT_TOKEN
        if (botToken) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: user.telegram_chat_id,
              text: `⏰ *Task Due Soon*\n\n${task.title}`,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: [[{ text: '👁️ View Task', url: taskLink }]],
              },
            }),
          }).catch(() => {})
        }
      }

      // Email notification
      if (wantsEmail && user.email) {
        await sendEmail(
          taskReminderEmail({
            to: user.email,
            userName: user.full_name || 'there',
            taskTitle: task.title,
            taskId: task.id,
            assignedBy: 'Nudge Bot',
            dueDate: new Date(task.due_date!).toLocaleString(),
            priority: 'normal',
          })
        ).catch(() => {})
      }

      // In-app notification
      await tryInsertNotification(supabase, {
        user_id: user.id,
        type: 'reminder',
        title: message,
        body: `Due ${new Date(task.due_date!).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`,
      }).catch(() => {})

      reminded++
      console.log(`[Due-Soon] Reminded user ${user.id} about task "${task.title}"`)
    } catch (err: any) {
      console.error(`[Due-Soon] Error for task ${task.id}:`, err.message)
    }
  }

  console.log(`[Master Cron] Due-Soon: ${reminded} reminded of ${upcomingTasks.length} tasks, ${Date.now() - startTime}ms`)
  return { tasks: upcomingTasks.length, reminded }
}

// ── Main Handler ─────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const overallStart = Date.now()
  console.log('[Master Cron] ⏰ Starting daily maintenance run')

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, any> = {}

  try {
    const supabase = createAdminClient()

    // Run all tasks
    results.dailyDigest = await runDailyDigest(supabase)
    results.checkTrials = await runCheckTrials(supabase)
    results.weeklyScorecard = await runWeeklyScorecard(supabase)
    results.dueSoonReminders = await runDueSoonReminders(supabase)

    const elapsed = Date.now() - overallStart
    console.log(`[Master Cron] ✅ Complete in ${elapsed}ms`)

    return NextResponse.json({
      success: true,
      elapsed,
      results,
    })
  } catch (err: any) {
    console.error('[Master Cron] Fatal error:', err.message)
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 })
  }
}

// ── Test / Manual Trigger (POST) ─────────────────────────────────

export async function POST(request: NextRequest) {
  // Same as GET but with JSON body for manual triggers
  return GET(request)
}
