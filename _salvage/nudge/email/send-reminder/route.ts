/**
 * POST /api/email/send-reminder
 * Sends a task reminder email to a specific user.
 * Called by cron job or Telegram bot when a reminder is due.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { taskReminderEmail, taskOverdueEmail } from '@/lib/email/templates'

export async function POST(request: NextRequest) {
  try {
    const { taskId, userId, type } = await request.json()

    if (!taskId || !userId) {
      return NextResponse.json({ error: 'Missing taskId or userId' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get user
    const { data: user } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('id', userId)
      .single()

    if (!user || !user.email) {
      return NextResponse.json({ error: 'User not found or has no email' }, { status: 404 })
    }

    // Get task
    const { data: task } = await supabase
      .from('tasks')
      .select('id, title, priority, due_date, assigned_by')
      .eq('id', taskId)
      .single()

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Get assigner name
    let assignedBy = 'Someone'
    if (task.assigned_by) {
      const { data: assigner } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', task.assigned_by)
        .single()
      if (assigner?.full_name) {
        assignedBy = assigner.full_name
      }
    }

    let result

    if (type === 'overdue') {
      const daysOverdue = task.due_date
        ? Math.max(1, Math.floor(
            (Date.now() - new Date(task.due_date).getTime()) / (1000 * 60 * 60 * 24)
          ))
        : 1

      result = await sendEmail(taskOverdueEmail({
        to: user.email!,
        userName: user.full_name || 'there',
        taskTitle: task.title,
        taskId: task.id,
        daysOverdue,
      }))
    } else {
      const dueDate = task.due_date
        ? new Date(task.due_date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })
        : undefined

      result = await sendEmail(taskReminderEmail({
        to: user.email!,
        userName: user.full_name || 'there',
        taskTitle: task.title,
        taskId: task.id,
        assignedBy,
        dueDate,
        priority: task.priority,
      }))
    }

    return NextResponse.json({ success: result.success, id: result.id })
  } catch (err: any) {
    console.error('[Email Reminder] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
