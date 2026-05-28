import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * DELETE /api/tasks/delete
 *
 * Soft-delete a task by setting its `deleted_at` timestamp.
 * Supports undo by clearing `deleted_at`.
 *
 * Query params for undo:
 *   ?undo=true   — Restore a previously deleted task
 *
 * Body:
 *   taskId: string   — ID of the task to delete/restore
 *   userId: string   — User requesting the action
 *
 * Returns: { success: true, taskId }
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const isUndo = searchParams.get('undo') === 'true'

    const { taskId, userId } = await req.json()

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: taskId, userId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify task exists
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('id, title, family_id, deleted_at')
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

    if (isUndo) {
      // Restore task by clearing deleted_at
      const { error: restoreError } = await supabase
        .from('tasks')
        .update({
          deleted_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', taskId)

      if (restoreError) {
        console.error('Task restore error:', restoreError)
        return NextResponse.json(
          { error: 'Failed to restore task' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        taskId,
        restored: true,
      })
    }

    // Soft-delete: set deleted_at timestamp
    const { error: deleteError } = await supabase
      .from('tasks')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)

    if (deleteError) {
      console.error('Task deletion error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete task' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      taskId,
    })
  } catch (err) {
    console.error('Task delete API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
