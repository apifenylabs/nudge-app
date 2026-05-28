/**
 * GET /api/stripe/status
 * Returns the current subscription status for the authenticated user's family.
 * Used by the UI to show plan info, trial days remaining, etc.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSubscriptionStatus } from '@/lib/plans'

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const status = await getSubscriptionStatus(user.id)

    return NextResponse.json({
      ...status,
      trialEndsAt: status.currentPeriodEnd,
    })
  } catch (err: any) {
    console.error('Stripe status error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
