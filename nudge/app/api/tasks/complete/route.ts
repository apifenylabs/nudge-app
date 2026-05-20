import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { computeNextDueDate, isRecurring } from '@/lib/recurrence'
import { checkDailyTaskLimit } from '@/lib/plans'

/**
 * POST /api/tasks/complete
 * Mark a task as completed with the user who completed it.
 * If the task has a recurrence pattern, auto-create the next instance.
 *
 * Body: { taskId: string, userId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { taskId, userId } = await req.json()

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: taskId, userId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify task exists and belongs to a family the user is part of
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('id, title, description, family_id, assigned_to, created_by, due_date, recurrence, priority, category')
      .eq('id', taskId)
      .single()

    if (taskError || !task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Verify user is a member of the family
    const { data: membership } = await supabase
      .from('family_members')
      .select('user_id')
      .eq('family_id', task.family_id)
      .eq('user_id', userId)
      .single()

    if (!membership) {
      return NextResponse.json(
        { error: 'Not authorized — you are not a member of this family' },
        { status: 403 }
      )
    }

    // Update task status to completed
    const { data: updatedTask, error: updateError } = await supabase
      .from('tasks')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        completed_by: userId,
      })
      .eq('id', taskId)
      .select()
      .single()

    if (updateError) {
      console.error('Task completion error:', updateError)
      return NextResponse.json(
        { error: 'Failed to complete task' },
        { status: 500 }
      )
    }

    // Auto-create next recurring task if applicable
    let nextTask = null
    let planSkipped = false
    if (isRecurring(task.recurrence)) {
      // Check plan limit for the task creator (who owns the recurrence)
      const limitCheck = await checkDailyTaskLimit(task.created_by)
      if (limitCheck.allowed) {
        const nextDueDate = computeNextDueDate(task.due_date, task.recurrence)

        if (nextDueDate) {
          const nextTaskRecord = {
            family_id: task.family_id,
            created_by: task.created_by,
            assigned_to: task.assigned_to,
            title: task.title,
            description: task.description,
            priority: task.priority,
            recurrence: task.recurrence,
            due_date: nextDueDate,
            recurrence_origin_id: task.id,
            status: 'pending' as const,
          }

          const { data: created, error: createError } = await supabase
            .from('tasks')
            .insert(nextTaskRecord)
            .select()
            .single()

          if (createError) {
            console.error('Failed to create next recurring task:', createError)
          } else {
            nextTask = created
          }
        }
      } else {
        planSkipped = true
        console.log(`[Recurring] Skipped auto-create for task ${taskId} — plan limit reached for user ${task.created_by}`)
      }
    }

    // Fire notification events (async — don't block response)
    const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/api/notifications/task-event`
    
    // Notify creator that task was completed (if completed by someone else)
    if (task.created_by !== userId) {
      fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'completed',
          taskId: task.id,
          actorId: userId,
          familyId: task.family_id,
        }),
      }).catch(e => console.error('[TaskComplete] Notification error:', e))
    }

    return NextResponse.json({
      success: true,
      task: updatedTask,
      nextRecurringTask: nextTask,
      planSkipped,
    })
  } catch (err) {
    console.error('Task complete API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
