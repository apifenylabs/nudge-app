import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { nlpParser } from '@/lib/nlp-parser'
import { checkDailyTaskLimit } from '@/lib/plans'

/**
 * POST /api/tasks/create
 *
 * Create a task from natural language text.
 * Optionally accepts pre-parsed fields to skip NLP.
 *
 * Body:
 *   text: string                    — Natural language task description
 *   userId: string                  — Creating user's ID
 *   familyId: string                — Family to create task in
 *   preParsed?: ParsedTask         — Skip NLP, use these fields directly
 *   dueDate?: string               — Override parsed due date (ISO string)
 *   assignedTo?: string            — Override parsed assignment
 *
 * Returns: { task, parsed }
 */
export async function POST(req: NextRequest) {
  try {
    const { text, userId, familyId, preParsed, dueDate, assignedTo } = await req.json()

    if (!text && !preParsed) {
      return NextResponse.json(
        { error: 'Must provide either text or preParsed fields' },
        { status: 400 }
      )
    }
    if (!userId || !familyId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, familyId' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify user is a member of the family
    const { data: membership } = await supabase
      .from('family_members')
      .select('role, family_id')
      .eq('family_id', familyId)
      .eq('user_id', userId)
      .single()

    if (!membership) {
      return NextResponse.json(
        { error: 'Not authorized — you are not a member of this family' },
        { status: 403 }
      )
    }

    // Check daily task limit based on subscription plan
    const limitCheck = await checkDailyTaskLimit(userId)
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: limitCheck.message,
          code: 'task_limit_reached',
          tasksToday: limitCheck.tasksToday,
          maxTasks: limitCheck.maxTasks,
        },
        { status: 429 }
      )
    }

    // Parse the task
    let parsed = preParsed
    if (!parsed && text) {
      parsed = await nlpParser.parseMessage(text, userId, familyId)
    }

    if (!parsed || !parsed.title) {
      return NextResponse.json(
        { error: 'Could not parse task. Please be more specific.' },
        { status: 422 }
      )
    }

    // Apply overrides
    if (dueDate) parsed.due_date = dueDate
    if (assignedTo) parsed.assigned_to = assignedTo

    // Extract recurrence config (days_of_week, day_of_month) from preParsed if present
    const recurrenceConfig = parsed.recurrence_config || null

    // Create the task
    const taskRecord = {
      family_id: familyId,
      created_by: userId,
      assigned_to: parsed.assigned_to || null,
      title: parsed.title,
      description: parsed.description || null,
      category: parsed.category || null,
      status: 'pending' as const,
      priority: parsed.priority || 'medium',
      due_date: parsed.due_date || null,
      recurrence: parsed.is_recurring ? (parsed.recurrence_pattern || 'none') : 'none',
      recurrence_config: recurrenceConfig,
    }

    const { data: task, error } = await supabase
      .from('tasks')
      .insert(taskRecord)
      .select()
      .single()

    if (error) {
      console.error('Task creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: 500 }
      )
    }

    // After task is created successfully, send notification via the task-event
    // dispatcher which respects user notification preferences
    if (task && task.assigned_to && task.assigned_to !== userId) {
      const notifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://nudge-sigma-liart.vercel.app'}/api/notifications/task-event`

      fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'created',
          taskId: task.id,
          actorId: userId,
          familyId: task.family_id,
        }),
      }).catch(e => console.error('[TaskCreate] Notification error:', e))
    }

    return NextResponse.json({
      success: true,
      task,
      parsed: {
        title: parsed.title,
        description: parsed.description,
        assigned_to: parsed.assigned_to,
        due_date: parsed.due_date,
        priority: parsed.priority,
        category: parsed.category,
        is_recurring: parsed.is_recurring,
        recurrence_pattern: parsed.recurrence_pattern,
      },
    })
  } catch (err) {
    console.error('Task create API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
