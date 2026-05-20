/**
 * GET /api/stripe/task-usage
 * Returns today's task count vs plan limit for the authenticated user.
 * Used by the UI to show limit warnings.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan, getPlanFeatures } from '@/lib/plans'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const plan = await getUserPlan(user.id)
    const features = getPlanFeatures(plan)

    // Count today's tasks
    const adminDb = createAdminClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { count } = await adminDb
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())

    const tasksToday = count || 0

    return NextResponse.json({
      plan,
      tasksToday,
      maxTasksPerDay: features.maxTasksPerDay,
      unlimited: features.maxTasksPerDay === -1,
      remaining: features.maxTasksPerDay === -1 ? -1 : Math.max(0, features.maxTasksPerDay - tasksToday),
    })
  } catch (err: any) {
    console.error('Task usage error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
