/**
 * POST /api/stripe/webhook
 * Handles incoming Stripe webhook events:
 *   - checkout.session.completed
 *   - invoice.paid
 *   - invoice.payment_failed
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripeConfig } from '@/lib/stripe/config'
import { upsertSubscription, updateSubscriptionStatus } from '@/lib/stripe/db'

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 401 })
  }

  const rawBody = await request.text()

  let event: Stripe.Event

  try {
    const stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2025-03-31.basil' as any,
    })
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeConfig.webhookSecret)
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  try {
    const obj = event.data.object as any
    const eventType = event.type

    switch (eventType) {
      // --- Checkout Complete ---
      case 'checkout.session.completed': {
        const subscriptionId = obj.subscription as string
        const customerId = obj.customer as string
        const familyId = obj.metadata?.family_id

        if (!subscriptionId || !familyId) {
          console.warn('[Stripe Webhook] Missing metadata in checkout.session.completed')
          break
        }

        // Get subscription details from Stripe
        const stripeClient = new Stripe(stripeConfig.secretKey, { apiVersion: '2025-03-31.basil' as any })
        const subData = await stripeClient.subscriptions.retrieve(subscriptionId) as any

        const priceId = subData.items?.data?.[0]?.price?.id
        const plan = getPlanFromPrice(priceId)

        await upsertSubscription({
          familyId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          plan: plan || 'pro',
          status: subData.status || 'active',
          currentPeriodStart: new Date(subData.current_period_start * 1000).toISOString(),
          currentPeriodEnd: new Date(subData.current_period_end * 1000).toISOString(),
          trialEndsAt: subData.trial_end
            ? new Date(subData.trial_end * 1000).toISOString()
            : undefined,
          cancelAtPeriodEnd: !!subData.cancel_at_period_end,
        })

        console.log(`[Stripe Webhook] Subscription created: ${subscriptionId} for family ${familyId} (${plan})`)
        break
      }

      // --- Invoice Paid (renewal / initial) ---
      case 'invoice.paid': {
        const subId = obj.subscription as string
        if (!subId) break

        const stripeClient2 = new Stripe(stripeConfig.secretKey, { apiVersion: '2025-03-31.basil' as any })
        const sub2 = await stripeClient2.subscriptions.retrieve(subId) as any
        const priceId2 = sub2.items?.data?.[0]?.price?.id
        const plan2 = getPlanFromPrice(priceId2)

        await updateSubscriptionStatus(subId, 'active', {
          current_period_end: new Date(sub2.current_period_end * 1000).toISOString(),
          cancel_at_period_end: !!sub2.cancel_at_period_end,
        })

        if (plan2) {
          const { createAdminClient } = await import('@/lib/supabase/admin')
          await createAdminClient().from('subscriptions').update({ plan: plan2 }).eq('stripe_subscription_id', subId)
        }

        console.log(`[Stripe Webhook] Invoice paid for subscription ${subId}`)
        break
      }

      // --- Invoice Payment Failed ---
      case 'invoice.payment_failed': {
        const failedSubId = obj.subscription as string
        if (failedSubId) {
          await updateSubscriptionStatus(failedSubId, 'past_due')
          console.log(`[Stripe Webhook] Payment failed for subscription ${failedSubId}`)
        }
        break
      }

      // --- Subscription Updated ---
      case 'customer.subscription.updated': {
        const updatedPriceId = obj.items?.data?.[0]?.price?.id
        const updatedPlan = getPlanFromPrice(updatedPriceId)

        await updateSubscriptionStatus(obj.id, obj.status, {
          cancel_at_period_end: !!obj.cancel_at_period_end,
          current_period_end: new Date(obj.current_period_end * 1000).toISOString(),
          trial_ends_at: obj.trial_end
            ? new Date(obj.trial_end * 1000).toISOString()
            : undefined,
        })

        if (updatedPlan) {
          const { createAdminClient } = await import('@/lib/supabase/admin')
          await createAdminClient().from('subscriptions').update({ plan: updatedPlan }).eq('stripe_subscription_id', obj.id)
        }

        console.log(`[Stripe Webhook] Subscription updated: ${obj.id} -> ${obj.status}`)
        break
      }

      // --- Subscription Deleted ---
      case 'customer.subscription.deleted': {
        await updateSubscriptionStatus(obj.id, 'canceled')
        console.log(`[Stripe Webhook] Subscription deleted: ${obj.id}`)
        break
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('[Stripe Webhook] Error processing event:', err.message)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

/**
 * Map Stripe price IDs to plan names.
 */
function getPlanFromPrice(priceId: string): 'free' | 'pro' | 'family' | null {
  const proPrice = stripeConfig.prices.pro.monthly
  const familyPrice = stripeConfig.prices.family.monthly
  if (priceId === proPrice) return 'pro'
  if (priceId === familyPrice) return 'family'
  return null
}
