/**
 * POST /api/stripe/portal
 * Creates a Stripe Billing Portal session for managing subscriptions.
 * Returns: { url: string } to redirect the user to Stripe Portal.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createPortalSession } from '@/lib/stripe/server'
import { getFamilySubscription } from '@/lib/stripe/db'
import { buildAppUrl } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's primary family
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({ error: 'No family found' }, { status: 400 })
    }

    // Get subscription record
    const subscription = await getFamilySubscription(membership.family_id)

    if (!subscription || !subscription.stripe_customer_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
    }

    // Create portal session
    const returnUrl = buildAppUrl('/dashboard/settings')
    const url = await createPortalSession({
      customerId: subscription.stripe_customer_id,
      returnUrl,
    })

    if (!url) {
      return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
    }

    return NextResponse.json({ url })
  } catch (err: any) {
    console.error('Stripe portal error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
