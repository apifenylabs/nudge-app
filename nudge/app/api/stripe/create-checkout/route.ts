/**
 * POST /api/stripe/create-checkout
 * Creates a Stripe Checkout Session for subscription purchase.
 * Body: { priceId: string, plan: 'pro' | 'family' }
 * Returns: { url: string } to redirect the user to Stripe.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse body
    const body = await request.json()
    const { priceId, plan } = body as { priceId: string; plan: 'pro' | 'family' }

    if (!priceId || !plan) {
      return NextResponse.json({ error: 'Missing priceId or plan' }, { status: 400 })
    }

    if (!['pro', 'family'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get user's primary family
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({ error: 'No family found. Create a family first.' }, { status: 400 })
    }

    // Create the checkout session
    const url = await createCheckoutSession({
      priceId,
      userId: user.id,
      userEmail: profile.email,
      userName: profile.full_name || undefined,
      familyId: membership.family_id,
    })

    if (!url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url })
  } catch (err: any) {
    console.error('Stripe create-checkout error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
