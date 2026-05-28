import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { shouldNotify } from '@/lib/notifications/preferences'
import { tryInsertNotification } from '@/lib/supabase/migrate'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'

/**
 * POST /api/notifications/check-reminders
 * Called by cron (~every 5 min). Checks for due tasks and sends reminders.
 * Also handles weekly scorecard scheduling (Monday morning).
 *
 * Respects user notification preferences before sending reminders
 * across all channels: Telegram, in-app, and email.
 * 
 * ALL Telegram messages now include a "View in Nudge" deep link button
 * that opens the task detail page in the PWA.
 */

/**
 * Send a Telegram message with an inline "View in Nudge" deep link button
 */
async function sendTelegramWithLink(
  chatId: string,
  message: string,
  taskDeepLink: string,
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) return false
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '👁️ View in Nudge',
                url: taskDeepLink,
              },
            ],
          ],
        },
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const now = new Date()
    const actions: string[] = []
    let remindersSent = 0
    let scorecardsSent = 0

    // ── DUE SOON (within 1 hour) ─────────────────────────────────
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    const { data: dueTasks, error: taskError } = await supabase
      .from('tasks')
      .select(`
        id, title, due_date, priority, family_id, assigned_to,
        created_by, status
      `)
      .in('status', ['pending', 'in_progress'])
      .not('assigned_to', 'is', null)
      .lte('due_date', oneHourFromNow.toISOString())
      .gte('due_date', fiveMinutesAgo.toISOString())
      .limit(20)

    if (taskError) {
      console.error('[Check Reminders] Task query error:', taskError)
    }

    if (dueTasks && dueTasks.length > 0) {
      for (const task of dueTasks) {
        if (!task.assigned_to) continue

        const { data: assignedUser } = await supabase
          .from('users')
          .select('id, telegram_chat_id, full_name, email')
          .eq('id', task.assigned_to)
          .single()

        if (!assignedUser) continue

        const wantsTelegram = await shouldNotify(assignedUser.id, 'task_due_soon', 'telegram')
        const wantsInApp = await shouldNotify(assignedUser.id, 'task_due_soon', 'in_app')
        const wantsEmail = await shouldNotify(assignedUser.id, 'task_due_soon', 'email')

        // Build deep link once per task
        const taskDeepLink = `${APP_URL}/dashboard/tasks/${task.id}`

        // Telegram
        if (wantsTelegram && assignedUser.telegram_chat_id) {
          const isUrgent = task.priority === 'urgent'

          const message = isUrgent
            ? `🔴 **URGENT Task Due Soon**\n\n"${task.title}" needs to be done soon!`
            : `⏰ **Task Reminder**\n\n"${task.title}" is due within the hour.`

          try {
            const sent = await sendTelegramWithLink(assignedUser.telegram_chat_id, message, taskDeepLink)
            if (sent) {
              remindersSent++
              actions.push(`Telegram due-soon to ${assignedUser.full_name || 'user'} for "${task.title}"`)
            }
          } catch (e) {
            console.error(`[Check Reminders] Failed to send Telegram to ${assignedUser.telegram_chat_id}:`, e)
          }
        }

        // Email
        if (wantsEmail && assignedUser.email) {
          try {
            const res = await fetch(`${APP_URL}/api/email/send-reminder`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ taskId: task.id, userId: assignedUser.id, type: 'reminder' }),
            })
            const data = await res.json()
            if (data.success) {
              remindersSent++
              actions.push(`Email due-soon to ${assignedUser.full_name || 'user'} for "${task.title}"`)
            }
          } catch (e) {}
        }

        // In-app
        if (wantsInApp) {
          await tryInsertNotification(supabase, {
            user_id: assignedUser.id,
            type: 'reminder',
            title: 'Task due soon',
            body: `"${task.title}" is due within the hour`,
            task_id: task.id,
          })
        }
      }
    }

    // ── OVERDUE (15-90 min window) ────────────────────────────────
    const { data: overdueTasks, error: overdueError } = await supabase
      .from('tasks')
      .select(`
        id, title, due_date, priority, family_id, assigned_to
      `)
      .in('status', ['pending', 'in_progress'])
      .not('assigned_to', 'is', null)
      .not('due_date', 'is', null)
      .lt('due_date', new Date(now.getTime() - 15 * 60 * 1000).toISOString())
      .gte('due_date', new Date(now.getTime() - 90 * 60 * 1000).toISOString())
      .limit(10)

    if (overdueTasks && overdueTasks.length > 0) {
      for (const task of overdueTasks) {
        if (!task.assigned_to || !task.due_date) continue

        const { data: assignedUser } = await supabase
          .from('users')
          .select('id, telegram_chat_id, full_name, email')
          .eq('id', task.assigned_to)
          .single()

        if (!assignedUser) continue

        const wantsTelegram = await shouldNotify(assignedUser.id, 'task_overdue', 'telegram')
        const wantsInApp = await shouldNotify(assignedUser.id, 'task_overdue', 'in_app')
        const wantsEmail = await shouldNotify(assignedUser.id, 'task_overdue', 'email')

        const taskDeepLink = `${APP_URL}/dashboard/tasks/${task.id}`

        // Telegram
        if (wantsTelegram && assignedUser.telegram_chat_id) {
          const minsOverdue = Math.floor((now.getTime() - new Date(task.due_date).getTime()) / 60000)

          try {
            const sent = await sendTelegramWithLink(
              assignedUser.telegram_chat_id,
              `⏰ **Still waiting!**\n\n"${task.title}" is ${minsOverdue} minute${minsOverdue > 1 ? 's' : ''} overdue.`,
              taskDeepLink,
            )
            if (sent) {
              remindersSent++
              actions.push(`Telegram overdue to ${assignedUser.full_name || 'user'} for "${task.title}"`)
            }
          } catch (e) {}
        }

        // Email
        if (wantsEmail && assignedUser.email) {
          try {
            const res = await fetch(`${APP_URL}/api/email/send-reminder`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ taskId: task.id, userId: assignedUser.id, type: 'overdue' }),
            })
            const data = await res.json()
            if (data.success) {
              remindersSent++
              actions.push(`Email overdue to ${assignedUser.full_name || 'user'} for "${task.title}"`)
            }
          } catch (e) {}
        }

        // In-app
        if (wantsInApp) {
          await tryInsertNotification(supabase, {
            user_id: assignedUser.id,
            type: 'reminder',
            title: 'Task overdue',
            body: `"${task.title}" is past due!`,
            task_id: task.id,
          })
        }
      }
    }

    return NextResponse.json({
      checked: true,
      remindersSent,
      scorecardsSent,
      actions,
      timestamp: now.toISOString(),
    })
  } catch (err: any) {
    console.error('[Check Reminders] Error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
