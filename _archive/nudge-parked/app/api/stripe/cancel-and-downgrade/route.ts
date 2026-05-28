/**
 * POST /api/stripe/cancel-and-downgrade
 * Cancel subscription AND immediately downgrade to Free plan.
 * Unlike /api/stripe/cancel which just sets cancel_at_period_end,
 * this does both and immediately enforces Free limits.
 *
 * Body: none (uses authenticated user's family)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getFamilySubscription, clearSubscription } from '@/lib/stripe/db'
import { stripeConfig } from '@/lib/stripe/config'
import Stripe from 'stripe'

export async function POST(_request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is owner
    const adminDb = createAdminClient()
    const { data: membership } = await adminDb
      .from('family_members')
      .select('family_id, role')
      .eq('user_id', user.id)
      .single()

    if (!membership || membership.role !== 'owner') {
      return NextResponse.json({ error: 'Only the family owner can cancel' }, { status: 403 })
    }

    const subscription = await getFamilySubscription(membership.family_id)
    if (!subscription || !subscription.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
    }

    const stripeKey = stripeConfig.secretKey
    if (stripeKey && stripeKey !== 'sk_test_mock') {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2025-03-31.basil' as any,
      })

      try {
        // Cancel at period end
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
          cancel_at_period_end: true,
        })
      } catch (stripeErr) {
        console.error('[Stripe] Error cancelling in Stripe:', stripeErr)
        // Continue anyway — we'll update local state
      }
    }

    // Immediately revert to Free plan locally
    await clearSubscription(membership.family_id)

    console.log(`[Stripe] Cancel & downgrade: family ${membership.family_id} -> free`)

    return NextResponse.json({
      success: true,
      plan: 'free',
      message: 'Subscription canceled. You\'ve been reverted to the Free plan.',
      cancelAtPeriodEnd: true,
    })
  } catch (err: any) {
    console.error('Stripe cancel-and-downgrade error:', err)
    return NextResponse.json({ error: err.message || 'Failed to cancel' }, { status: 500 })
  }
}
