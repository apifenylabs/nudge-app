/**
 * POST /api/notifications/task-event
 * Handles task lifecycle events (created, completed, assigned) and:
 * 1. Sends Telegram notifications with deep links to task detail page
 * 2. Persists in-app notification records
 * 3. Optionally sends email for high-priority events
 *
 * Body: {
 *   event: 'created' | 'completed' | 'assigned'
 *   taskId: string
 *   actorId: string  // user who performed the action
 *   familyId: string
 * }
 *
 * Notifications:
 * - CREATED: Notify the assignee (someone assigned them a task)
 * - COMPLETED: Notify the creator (their task was done by someone else)
 * - ASSIGNED: Notify the newly assigned person
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { tryInsertNotification, ensureMigration } from '@/lib/supabase/migrate'
import { shouldNotify } from '@/lib/notifications/preferences'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'

/**
 * Send a Telegram message with an inline "View in Nudge" deep link button
 */
async function sendTelegramMessageWithLink(
  chatId: string,
  message: string,
  taskDeepLink: string,
  parseMode: 'Markdown' | 'HTML' = 'Markdown'
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
        parse_mode: parseMode,
        disable_web_page_preview: true,
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

/**
 * Send an email notification by calling the send-reminder API endpoint.
 * This reuses the existing email infrastructure (Resend + templates).
 */
async function sendEmailNotification(
  taskId: string,
  userId: string,
  type: 'reminder' | 'overdue',
  supabase: any
): Promise<boolean> {
  try {
    const baseUrl = APP_URL
    const res = await fetch(`${baseUrl}/api/email/send-reminder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, userId, type }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

/**
 * Persist an in-app notification record.
 * Handles missing table gracefully (triggers migration if needed).
 */
async function persistNotification(
  supabase: any,
  params: {
    userId: string
    type: 'assignment' | 'completion' | 'reminder' | 'system'
    title: string
    body?: string
    taskId?: string
  }
): Promise<boolean> {
  return tryInsertNotification(supabase, {
    user_id: params.userId,
    type: params.type,
    title: params.title,
    body: params.body,
    task_id: params.taskId,
  })
}

/**
 * Map event names to preference event types + in-app notification types
 */
const EVENT_MAP: Record<string, { prefType: string; inAppType: 'assignment' | 'completion' | 'reminder' | 'system' }> = {
  created:   { prefType: 'task_assigned',  inAppType: 'assignment' },
  completed: { prefType: 'task_completed', inAppType: 'completion' },
  assigned:  { prefType: 'task_assigned',  inAppType: 'assignment' },
}

export async function POST(req: NextRequest) {
  try {
    const { event, taskId, actorId, familyId } = await req.json()

    if (!event || !taskId || !actorId || !familyId) {
      return NextResponse.json(
        { error: 'Missing required fields: event, taskId, actorId, familyId' },
        { status: 400 }
      )
    }

    const validEvents = ['created', 'completed', 'assigned']
    if (!validEvents.includes(event)) {
      return NextResponse.json({ error: `Invalid event: ${event}` }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch the task with related data
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select(`
        id, title, description, assigned_to, created_by, due_date, priority, status
      `)
      .eq('id', taskId)
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Build the task deep link for all notifications
    const taskDeepLink = `${APP_URL}/dashboard/tasks/${taskId}`

    // Ensure notifications table exists (non-blocking — will retry on insert if needed)
    ensureMigration('notifications').catch(() => {
      /* silent — inserts will auto-retry */
    })

    // Fetch the actor (who did the action)
    const { data: actor } = await supabase
      .from('users')
      .select('id, full_name, telegram_chat_id')
      .eq('id', actorId)
      .single()

    const actorName = actor?.full_name || 'Someone'

    // Fetch the family
    const { data: family } = await supabase
      .from('families')
      .select('name')
      .eq('id', familyId)
      .single()

    const familyName = family?.name || 'Family'

    const notificationsSent: string[] = []
    const inAppInserted: string[] = []
    const errors: string[] = []

    // ── EVENT: TASK CREATED ───────────────────────────────────────
    // Notify the assignee that someone created a task for them
    if (event === 'created' && task.assigned_to && task.assigned_to !== actorId) {
      const { data: assignee } = await supabase
        .from('users')
        .select('id, full_name, telegram_chat_id')
        .eq('id', task.assigned_to)
        .single()

      if (assignee) {
        const dueInfo = task.due_date
          ? `\nDue: ${new Date(task.due_date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}`
          : ''

        const priorityEmoji =
          task.priority === 'urgent'
            ? '🔴'
            : task.priority === 'high'
              ? '🟠'
              : task.priority === 'medium'
                ? '🟡'
                : '🟢'

        // ── Telegram (check preference) ──
        const wantsTelegram = await shouldNotify(assignee.id, 'task_assigned', 'telegram')
        if (wantsTelegram && assignee.telegram_chat_id) {
          const tgMessage = [
            `📋 **New task assigned by ${actorName}**`,
            ``,
            `${priorityEmoji} *"${task.title}"*${dueInfo}`,
            ``,
            `Family: ${familyName}`,
          ].join('\n')

          const sent = await sendTelegramMessageWithLink(assignee.telegram_chat_id, tgMessage, taskDeepLink)
          if (sent) {
            notificationsSent.push(`telegram:${assignee.id}`)
          } else {
            errors.push(`Failed to send Telegram to ${assignee.full_name || assignee.id}`)
          }
        }

        // ── In-app notification (check preference) ──
        const wantsInApp = await shouldNotify(assignee.id, 'task_assigned', 'in_app')
        if (wantsInApp) {
          const inserted = await persistNotification(supabase, {
            userId: assignee.id,
            type: 'assignment',
            title: 'New task assigned',
            body: `${actorName} assigned you: "${task.title}"${dueInfo}`,
            taskId: task.id,
          })
          if (inserted) {
            inAppInserted.push(`inapp:${assignee.id}`)
          }
        }

        // ── Email (check preference) ──
        const wantsEmail = await shouldNotify(assignee.id, 'task_assigned', 'email')
        if (wantsEmail) {
          const emailed = await sendEmailNotification(task.id, assignee.id, 'reminder', supabase)
          if (emailed) {
            notificationsSent.push(`email:${assignee.id}`)
          } else {
            errors.push(`Failed to send email for task ${task.id} to ${assignee.id}`)
          }
        }
      }
    }

    // ── EVENT: TASK COMPLETED ─────────────────────────────────────
    // Notify the task creator when their assigned task is done (by someone else)
    if (event === 'completed' && task.created_by && task.created_by !== actorId) {
      const { data: creator } = await supabase
        .from('users')
        .select('id, full_name, telegram_chat_id')
        .eq('id', task.created_by)
        .single()

      if (creator) {
        // ── Telegram (check preference) ──
        const wantsTelegram = await shouldNotify(creator.id, 'task_completed', 'telegram')
        if (wantsTelegram && creator.telegram_chat_id) {
          const tgMessage = [
            `✅ **Task completed!**`,
            ``,
            `${actorName} completed *"${task.title}"* ✅`,
            ``,
            `Family: ${familyName}`,
          ].join('\n')

          const sent = await sendTelegramMessageWithLink(creator.telegram_chat_id, tgMessage, taskDeepLink)
          if (sent) {
            notificationsSent.push(`telegram:${creator.id}`)
          } else {
            errors.push(`Failed to send Telegram to ${creator.full_name || creator.id}`)
          }
        }

        // ── In-app notification (check preference) ──
        const wantsInApp = await shouldNotify(creator.id, 'task_completed', 'in_app')
        if (wantsInApp) {
          const inserted = await persistNotification(supabase, {
            userId: creator.id,
            type: 'completion',
            title: 'Task completed',
            body: `${actorName} completed "${task.title}" ✅`,
            taskId: task.id,
          })
          if (inserted) {
            inAppInserted.push(`inapp:${creator.id}`)
          }
        }

        // ── Email (check preference) ──
        const wantsEmail = await shouldNotify(creator.id, 'task_completed', 'email')
        if (wantsEmail) {
          const emailed = await sendEmailNotification(task.id, creator.id, 'reminder', supabase)
          if (emailed) {
            notificationsSent.push(`email:${creator.id}`)
          } else {
            errors.push(`Failed to send email for completed task ${task.id} to ${creator.id}`)
          }
        }
      }
    }

    // ── EVENT: TASK RE-ASSIGNED ────────────────────────────────────
    // Notify newly assigned person
    if (event === 'assigned' && task.assigned_to) {
      const { data: assignee } = await supabase
        .from('users')
        .select('id, full_name, telegram_chat_id')
        .eq('id', task.assigned_to)
        .single()

      if (assignee && assignee.id !== actorId) {
        // ── Telegram (check preference) ──
        const wantsTelegram = await shouldNotify(assignee.id, 'task_assigned', 'telegram')
        if (wantsTelegram && assignee.telegram_chat_id) {
          const tgMessage = [
            `👤 **Task reassigned to you**`,
            ``,
            `${actorName} assigned you: *"${task.title}"*`,
            task.due_date
              ? `\nDue: ${new Date(task.due_date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}`
              : '',
          ].join('\n')

          const sent = await sendTelegramMessageWithLink(assignee.telegram_chat_id, tgMessage, taskDeepLink)
          if (sent) {
            notificationsSent.push(`telegram:${assignee.id}`)
          } else {
            errors.push(`Failed to send Telegram to ${assignee.full_name || assignee.id}`)
          }
        }

        // ── In-app notification (check preference) ──
        const wantsInApp = await shouldNotify(assignee.id, 'task_assigned', 'in_app')
        if (wantsInApp) {
          const inserted = await persistNotification(supabase, {
            userId: assignee.id,
            type: 'assignment',
            title: 'Task reassigned',
            body: `${actorName} reassigned "${task.title}" to you`,
            taskId: task.id,
          })
          if (inserted) {
            inAppInserted.push(`inapp:${assignee.id}`)
          }
        }

        // ── Email (check preference) ──
        const wantsEmail = await shouldNotify(assignee.id, 'task_assigned', 'email')
        if (wantsEmail) {
          const emailed = await sendEmailNotification(task.id, assignee.id, 'reminder', supabase)
          if (emailed) {
            notificationsSent.push(`email:${assignee.id}`)
          } else {
            errors.push(`Failed to send email for reassigned task ${task.id} to ${assignee.id}`)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      event,
      taskId,
      notificationsSent,
      inAppInserted,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (err: any) {
    console.error('[Task Event Notification] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
