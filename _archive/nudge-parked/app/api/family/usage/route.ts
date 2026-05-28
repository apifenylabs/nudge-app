/**
 * GET /api/family/usage
 * Returns usage stats for the authenticated user's family.
 * Used by UsageDashboard to show member count, recurring tasks, etc.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getUserPlan, getPlanFeatures } from '@/lib/plans'

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminDb = createAdminClient()

    // Get user's primary family
    const { data: membership } = await adminDb
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({
        memberCount: 1,
        maxMembers: 1,
        recurringCount: 0,
        maxRecurring: 3,
      })
    }

    // Count family members
    const { count: memberCount } = await adminDb
      .from('family_members')
      .select('*', { count: 'exact', head: true })
      .eq('family_id', membership.family_id)

    // Count recurring tasks for this family
    const { count: recurringCount } = await adminDb
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('family_id', membership.family_id)
      .eq('is_recurring', true)
      .in('status', ['active', 'pending'])

    // Get plan limits
    const plan = await getUserPlan(user.id)
    const features = getPlanFeatures(plan)

    return NextResponse.json({
      memberCount: memberCount || 1,
      maxMembers: features.maxFamilyMembers,
      recurringCount: recurringCount || 0,
      maxRecurring: features.maxRecurringTasks,
    })
  } catch (err: any) {
    console.error('Family usage error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
