/**
 * GET /api/social-proof
 *
 * Returns social proof data for the marketing site:
 *   - familiesThisWeek: number of families created this week
 *   - totalFamilies: total number of families (approximate)
 *   - tasksCompletedToday: tasks completed today across all families
 *   - totalTasksCompleted: all-time task completions
 *   - cachedAt: when the data was fetched
 *
 * This endpoint is public and cached client-side.
 * Uses admin client (service_role) to read aggregate stats.
 */

import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function GET() {
  try {
    const supabase = createAdminClient()
    const now = new Date()

    // Week boundaries
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay()) // Start of current week (Sunday)
    weekStart.setHours(0, 0, 0, 0)

    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)

    // Count families created this week
    const { count: familiesThisWeek, error: fwError } = await supabase
      .from('families')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart.toISOString())

    // Count total families
    const { count: totalFamilies, error: tfError } = await supabase
      .from('families')
      .select('*', { count: 'exact', head: true })

    // Count tasks completed today
    const { count: tasksToday, error: ttError } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('completed_at', todayStart.toISOString())

    // Count all-time completed tasks
    const { count: totalCompleted, error: tcError } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    if (fwError || tfError) {
      console.error('[Social Proof] DB errors:', { fwError, tfError, ttError, tcError })
      return NextResponse.json({
        success: false,
        error: 'Failed to query aggregate stats',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        familiesThisWeek: familiesThisWeek || 0,
        totalFamilies: totalFamilies || 0,
        tasksCompletedToday: tasksToday || 0,
        totalTasksCompleted: totalCompleted || 0,
      },
      cachedAt: now.toISOString(),
    })
  } catch (err: any) {
    console.error('[Social Proof] Error:', err.message)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 })
  }
}
