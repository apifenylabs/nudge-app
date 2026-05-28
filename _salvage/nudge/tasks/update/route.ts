import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * PUT /api/tasks/update
 *
 * Update task fields (PATCH-style — only provided fields are updated).
 * Allowed fields: title, description, assigned_to, priority, due_date, status, recurrence
 *
 * Body:
 *   taskId: string                     — ID of the task to update
 *   userId: string                     — User making the update
 *   title?: string                     — Updated title
 *   description?: string               — Updated description
 *   assigned_to?: string | null        — Updated assignee (null to unassign)
 *   priority?: 'low' | 'medium' | 'high' — Updated priority
 *   due_date?: string | null           — Updated due date (ISO string, null to clear)
 *   status?: 'pending' | 'completed'   — Updated status
 *   recurrence?: string | null         — Updated recurrence pattern
 *
 * Returns: { success: true, task }
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      taskId,
      userId,
      title,
      description,
      assigned_to,
      priority,
      due_date,
      status,
      recurrence,
    } = body

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: taskId, userId' },
        { status: 400 }
      )
    }

    // Validate at least one update field is provided
    const updateFields: Record<string, unknown> = {}
    const allowedFields = [
      'title',
      'description',
      'assigned_to',
      'priority',
      'due_date',
      'status',
      'recurrence',
    ] as const

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateFields[field] = body[field]
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update. Allowed fields: title, description, assigned_to, priority, due_date, status, recurrence' },
        { status: 400 }
      )
    }

    // Validate priority values
    if (
      updateFields.priority !== undefined &&
      !['low', 'medium', 'high'].includes(updateFields.priority as string)
    ) {
      return NextResponse.json(
        { error: 'Invalid priority. Must be one of: low, medium, high' },
        { status: 400 }
      )
    }

    // Validate status values
    if (
      updateFields.status !== undefined &&
      !['pending', 'completed'].includes(updateFields.status as string)
    ) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, completed' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify task exists
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('id, title, family_id, status')
      .eq('id', taskId)
      .single()

    if (taskError || !task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Verify user is a member of the task's family
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

    // If status is being set to 'completed', auto-set completed_at/completed_by
    if (updateFields.status === 'completed' && task.status !== 'completed') {
      updateFields.completed_at = new Date().toISOString()
      updateFields.completed_by = userId
    }

    // If status is being set back to 'pending', clear completion fields
    if (updateFields.status === 'pending') {
      updateFields.completed_at = null
      updateFields.completed_by = null
    }

    // Set updated_at timestamp
    updateFields.updated_at = new Date().toISOString()

    // Perform the update
    const { data: updatedTask, error: updateError } = await supabase
      .from('tasks')
      .update(updateFields)
      .eq('id', taskId)
      .select()
      .single()

    if (updateError) {
      console.error('Task update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      task: updatedTask,
    })
  } catch (err) {
    console.error('Task update API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
