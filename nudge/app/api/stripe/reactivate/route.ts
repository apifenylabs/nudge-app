/**
 * POST /api/stripe/reactivate
 * Reactivate a subscription that was set to cancel at period end.
 * Body: { subscriptionId: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { reactivateSubscription } from '@/lib/stripe/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is owner of their family
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id, role')
      .eq('user_id', user.id)
      .single()

    if (!membership || membership.role !== 'owner') {
      return NextResponse.json({ error: 'Only the family owner can reactivate' }, { status: 403 })
    }

    const body = await request.json()
    const { subscriptionId } = body

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Missing subscriptionId' }, { status: 400 })
    }

    await reactivateSubscription(subscriptionId)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Stripe reactivate error:', err)
    return NextResponse.json({ error: err.message || 'Failed to reactivate' }, { status: 500 })
  }
}
