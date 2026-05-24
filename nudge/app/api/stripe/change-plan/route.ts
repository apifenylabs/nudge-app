/**
 * POST /api/stripe/change-plan
 * Upgrade or downgrade the subscription plan.
 * Body: { plan: 'pro' | 'family' | 'free', interval?: 'monthly' | 'yearly' }
 *
 * This is used by the settings UI for direct plan changes.
 * For owners who want to upgrade/downgrade without going through Stripe portal.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getFamilySubscription } from '@/lib/stripe/db'
import { stripeConfig, getPriceId } from '@/lib/stripe/config'
import Stripe from 'stripe'
import type { BillingInterval } from '@/lib/plans'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { plan, interval } = body as { plan: string; interval?: BillingInterval }

    if (plan !== 'pro' && plan !== 'family' && plan !== 'free') {
      return NextResponse.json({ error: 'Invalid plan. Must be "pro", "family", or "free".' }, { status: 400 })
    }

    if (interval && interval !== 'monthly' && interval !== 'yearly') {
      return NextResponse.json({ error: 'Invalid interval. Must be "monthly" or "yearly".' }, { status: 400 })
    }

    // Verify user is owner of their family
    const adminDb = createAdminClient()
    const { data: membership } = await adminDb
      .from('family_members')
      .select('family_id, role')
      .eq('user_id', user.id)
      .single()

    if (!membership || membership.role !== 'owner') {
      return NextResponse.json({ error: 'Only the family owner can change the plan' }, { status: 403 })
    }

    const targetInterval: BillingInterval = interval || 'monthly'

    // Handle downgrade to free: cancel the Stripe subscription and clear local record
    if (plan === 'free') {
      const subscription = await getFamilySubscription(membership.family_id)
      if (!subscription || !subscription.stripe_subscription_id) {
        return NextResponse.json({ error: 'No active subscription found.' }, { status: 400 })
      }

      const stripeKey = stripeConfig.secretKey
      if (stripeKey && stripeKey !== 'sk_test_mock') {
        try {
          const stripe = new Stripe(stripeKey, {
            apiVersion: '2025-03-31.basil' as any,
          })
          await stripe.subscriptions.update(subscription.stripe_subscription_id, {
            cancel_at_period_end: true,
          })
        } catch (stripeErr) {
          console.error('[Stripe] Error handling free downgrade in Stripe:', stripeErr)
        }
      }

      const { clearSubscription } = await import('@/lib/stripe/db')
      await clearSubscription(membership.family_id)

      return NextResponse.json({
        success: true,
        plan: 'free',
        message: 'Downgraded to Free. You\'ll keep access until the end of your billing period.',
      })
    }

    // Paid plan change (pro ⟷ family, or billing interval change)
    const subscription = await getFamilySubscription(membership.family_id)
    if (!subscription || !subscription.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found. Please subscribe first.' }, { status: 400 })
    }

    // Determine the target price ID
    const targetPriceId = getPriceId(plan as 'pro' | 'family', targetInterval)

    if (!targetPriceId || targetPriceId.startsWith('price_')) {
      // In dev mode with mock prices, just update locally
      if (targetPriceId.includes('price_pro') || targetPriceId.includes('price_family')) {
        await adminDb.from('subscriptions').update({
          plan,
          billing_interval: targetInterval,
          updated_at: new Date().toISOString(),
        }).eq('family_id', membership.family_id)

        return NextResponse.json({
          success: true,
          plan,
          interval: targetInterval,
          message: `Plan changed to ${plan} (${targetInterval}) — dev mode`,
        })
      }
    }

    // Call Stripe to update the subscription
    const stripeKey = stripeConfig.secretKey
    if (!stripeKey || stripeKey === 'sk_test_mock') {
      // Dev mode: simulate
      await adminDb.from('subscriptions').update({
        plan,
        billing_interval: targetInterval,
        updated_at: new Date().toISOString(),
      }).eq('family_id', membership.family_id)

      return NextResponse.json({
        success: true,
        plan,
        interval: targetInterval,
        message: `Plan changed to ${plan} (${targetInterval}) — dev mode`,
      })
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-03-31.basil' as any,
    })

    // Retrieve the subscription to get the current subscription item ID
    const existingSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id)

    if (!existingSub.items?.data?.[0]?.id) {
      return NextResponse.json({ error: 'No subscription item found' }, { status: 500 })
    }

    // Update the subscription to the new price
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      items: [
        {
          id: existingSub.items.data[0].id,
          price: targetPriceId,
        },
      ],
      proration_behavior: 'always_invoice',
      metadata: {
        ...existingSub.metadata,
        plan_changed_to: plan,
        interval_changed_to: targetInterval,
      },
    })

    // Update our database
    await adminDb.from('subscriptions').update({
      plan,
      billing_interval: targetInterval,
      updated_at: new Date().toISOString(),
    }).eq('family_id', membership.family_id)

    console.log(`[Stripe] Plan changed: family ${membership.family_id} -> ${plan} (${targetInterval})`)

    return NextResponse.json({
      success: true,
      plan,
      interval: targetInterval,
      message: `Plan changed to ${plan.charAt(0).toUpperCase() + plan.slice(1)} (${targetInterval}). Changes take effect immediately.`,
    })
  } catch (err: any) {
    console.error('Stripe change-plan error:', err)
    return NextResponse.json({ error: err.message || 'Failed to change plan' }, { status: 500 })
  }
}
