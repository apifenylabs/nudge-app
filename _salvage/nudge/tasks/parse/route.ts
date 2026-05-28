import { NextRequest, NextResponse } from 'next/server'
import { nlpParser } from '@/lib/nlp-parser'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/tasks/parse
 *
 * Parse natural language text and return a preview WITHOUT creating a task.
 * Used by the SmartTaskCreator to show users what NLP extracted before they confirm.
 *
 * Body:
 *   text: string        — Natural language task description
 *   userId: string      — User ID (for family member lookup, default assignment)
 *   familyId: string    — Family ID (for family member lookup)
 *
 * Returns: { parsed: ParsedTask, memberNames: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { text, userId, familyId } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      )
    }

    if (!userId || !familyId) {
      // Without family context, do a light parse via parseMessage with empty family
      const parsed = await nlpParser.parseMessage(text, userId || '', '')
      return NextResponse.json({
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
        memberNames: [],
      })
    }

    // Get family members for NLP context
    const supabase = createAdminClient()
    const { data: members } = await supabase
      .from('family_members')
      .select(`
        user_id,
        users!inner (
          id,
          full_name,
          telegram_username
        )
      `)
      .eq('family_id', familyId)

    const familyMembers = (members || []).map((m: any) => {
      const user = Array.isArray(m.users) ? m.users[0] : m.users
      return {
        id: user?.id || '',
        name: user?.full_name || 'Family Member',
        telegram_username: user?.telegram_username,
      }
    })

    const parsed = await nlpParser.parseMessage(text, userId, familyId)

    return NextResponse.json({
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
      memberNames: familyMembers.map(m => m.name),
    })
  } catch (err) {
    console.error('Parse API error:', err)
    return NextResponse.json(
      { error: 'Failed to parse text' },
      { status: 500 }
    )
  }
}
