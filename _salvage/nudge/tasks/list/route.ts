import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/tasks/list
 *
 * List tasks for a family, with optional filters.
 *
 * Query params:
 *   familyId    (required) — ID of the family
 *   status      (optional) — Filter by status: 'pending', 'completed', 'all' (default: 'all')
 *   assignedTo  (optional) — Filter by assigned user ID
 *
 * Returns: { tasks: [...] }
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const familyId = searchParams.get('familyId')
    const status = searchParams.get('status') || 'all'
    const assignedTo = searchParams.get('assignedTo')

    if (!familyId) {
      return NextResponse.json(
        { error: 'Missing required query param: familyId' },
        { status: 400 }
      )
    }

    // Validate status filter
    const validStatuses = ['pending', 'completed', 'all']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, completed, all' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Build query
    let query = supabase
      .from('tasks')
      .select('*')
      .eq('family_id', familyId)
      .is('deleted_at', null)

    // Apply status filter
    if (status === 'pending') {
      query = query.eq('status', 'pending')
    } else if (status === 'completed') {
      query = query.eq('status', 'completed')
    }
    // 'all' — no filter

    // Apply assignedTo filter
    if (assignedTo) {
      query = query.eq('assigned_to', assignedTo)
    }

    // Order by creation date, newest first
    query = query.order('created_at', { ascending: false })

    const { data: tasks, error } = await query

    if (error) {
      console.error('Task list error:', error)
      return NextResponse.json(
        { error: 'Failed to retrieve tasks' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      tasks: tasks || [],
    })
  } catch (err) {
    console.error('Task list API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
