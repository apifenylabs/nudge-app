import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * GET /api/analytics/shares
 *
 * Returns share analytics for the current user's family:
 *   - totalShares: total number of shares
 *   - platforms: breakdown by platform
 *
 * Requires authenticated user who belongs to a family.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user's family
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .single()

    if (!membership) {
      return NextResponse.json({ totalShares: 0, platforms: {} })
    }

    // Get all task IDs for this family
    const { data: tasks } = await supabase
      .from('tasks')
      .select('id')
      .eq('family_id', membership.family_id)

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ totalShares: 0, platforms: {} })
    }

    const taskIds = tasks.map(t => t.id)

    // Get share counts
    const { data: shares } = await supabase
      .from('task_shares')
      .select('platform')
      .in('task_id', taskIds)

    if (!shares || shares.length === 0) {
      return NextResponse.json({ totalShares: 0, platforms: {} })
    }

    const platformCounts: Record<string, number> = {}
    let total = 0
    for (const s of shares) {
      platformCounts[s.platform] = (platformCounts[s.platform] || 0) + 1
      total++
    }

    return NextResponse.json({
      totalShares: total,
      platforms: platformCounts,
    })
  } catch (err) {
    console.error('Share analytics API error:', err)
    return NextResponse.json(
      { totalShares: 0, platforms: {}, error: 'Could not load share analytics' },
      { status: 500 }
    )
  }
}
