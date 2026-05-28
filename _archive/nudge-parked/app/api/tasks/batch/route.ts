import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/tasks/batch
 *
 * Perform batch operations on tasks.
 *
 * Body:
 *   action: 'complete' | 'delete' | 'assign' | 'restore'
 *   taskIds: string[] — Array of task IDs to operate on
 *   userId: string — User requesting the action
 *   assignedTo?: string — Target user ID (for 'assign' action)
 *
 * Returns: { success: true, affected: number, failed: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { action, taskIds, userId, assignedTo } = await req.json()

    if (!action || !taskIds || !Array.isArray(taskIds) || taskIds.length === 0 || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: action, taskIds (non-empty array), userId' },
        { status: 400 }
      )
    }

    const validActions = ['complete', 'delete', 'assign', 'restore']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${validActions.join(', ')}` },
        { status: 400 }
      )
    }

    if (action === 'assign' && !assignedTo) {
      return NextResponse.json(
        { error: 'Missing required field: assignedTo for assign action' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // First, verify all tasks exist and user has access to their families
    const { data: tasks, error: taskError } = await supabase
      .from('tasks')
      .select('id, family_id')
      .in('id', taskIds)

    if (taskError) {
      console.error('Batch fetch error:', taskError)
      return NextResponse.json({ error: 'Failed to verify tasks' }, { status: 500 })
    }

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ error: 'No tasks found with the given IDs' }, { status: 404 })
    }

    // Get unique family IDs
    const familyIds = Array.from(new Set(tasks.map(t => t.family_id)))

    // Verify user is a member of all families involved
    const { data: memberships } = await supabase
      .from('family_members')
      .select('family_id')
      .in('family_id', familyIds)
      .eq('user_id', userId)

    const memberFamilyIds = new Set((memberships || []).map(m => m.family_id))
    const unauthorizedFamilies = familyIds.filter(fid => !memberFamilyIds.has(fid))

    if (unauthorizedFamilies.length > 0) {
      return NextResponse.json(
        { error: 'Not authorized — you are not a member of all task families' },
        { status: 403 }
      )
    }

    // Find task IDs that actually exist (in case some were already deleted)
    const validTaskIds = tasks.map(t => t.id)
    const missingIds = taskIds.filter(id => !validTaskIds.includes(id))

    const now = new Date().toISOString()

    let updatePayload: Record<string, any> = {}

    switch (action) {
      case 'complete':
        updatePayload = {
          status: 'completed',
          completed_at: now,
          completed_by: userId,
          updated_at: now,
        }
        break
      case 'delete':
        updatePayload = {
          deleted_at: now,
          updated_at: now,
        }
        break
      case 'restore':
        updatePayload = {
          deleted_at: null,
          updated_at: now,
        }
        break
      case 'assign':
        updatePayload = {
          assigned_to: assignedTo,
          updated_at: now,
        }
        break
    }

    const { error: updateError, count } = await supabase
      .from('tasks')
      .update(updatePayload)
      .in('id', validTaskIds)

    if (updateError) {
      console.error(`Batch ${action} error:`, updateError)
      return NextResponse.json({ error: `Failed to ${action} tasks` }, { status: 500 })
    }

    // Fire notification events for completions (non-blocking)
    if (action === 'complete') {
      for (const task of tasks) {
        fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'}/api/notifications/task-event`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'batch_completed',
              taskIds: validTaskIds,
              actorId: userId,
              familyId: task.family_id,
              count: validTaskIds.length,
            }),
          }
        ).catch(e => console.error('[BatchComplete] Notification error:', e))
        break // Only send one notification per batch
      }
    }

    return NextResponse.json({
      success: true,
      action,
      affected: validTaskIds.length,
      failed: missingIds,
    })
  } catch (err) {
    console.error('Batch API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
