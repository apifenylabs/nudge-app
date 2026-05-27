/**
 * GET /api/stripe/payment-method
 * Returns the default payment method for the authenticated user's subscription.
 * Shows card brand, last4, expiry, and whether it's expiring soon.
 *
 * POST /api/stripe/payment-method
 * Creates a Stripe SetupIntent to update the payment method.
 * Returns a client_secret for the frontend to confirm with Stripe Elements.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getFamilySubscription } from '@/lib/stripe/db'
import { stripeConfig } from '@/lib/stripe/config'
import Stripe from 'stripe'

function getStripe(): Stripe | null {
  const key = stripeConfig.secretKey
  if (!key || key === 'sk_test_mock') return null
  return new Stripe(key, {
    apiVersion: '2025-03-31.basil' as any,
    typescript: true,
  })
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()

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
      return NextResponse.json({ method: null })
    }

    const subscription = await getFamilySubscription(membership.family_id)
    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ method: null })
    }

    const stripe = getStripe()
    if (!stripe) {
      // Dev mode fallback
      return NextResponse.json({
        method: {
          brand: 'visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2028,
          isExpiringSoon: false,
        },
      })
    }

    // Fetch the customer's default payment method
    const customer = await stripe.customers.retrieve(subscription.stripe_customer_id) as Stripe.Customer

    const defaultMethodId = customer.invoice_settings?.default_payment_method
      || (typeof customer.default_source === 'string' ? customer.default_source : null)

    if (!defaultMethodId) {
      return NextResponse.json({ method: null })
    }

    // Try to retrieve as PaymentMethod
    try {
      const paymentMethod = await stripe.paymentMethods.retrieve(defaultMethodId as string) as Stripe.PaymentMethod

      if (paymentMethod.type === 'card' && paymentMethod.card) {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1
        const expYear = paymentMethod.card.exp_year
        const expMonth = paymentMethod.card.exp_month
        const isExpiringSoon = expYear < currentYear || (expYear === currentYear && expMonth <= currentMonth + 2)

        return NextResponse.json({
          method: {
            id: paymentMethod.id,
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            expMonth: paymentMethod.card.exp_month,
            expYear: paymentMethod.card.exp_year,
            country: paymentMethod.card.country,
            isExpiringSoon,
            billingDetails: paymentMethod.billing_details ? {
              name: paymentMethod.billing_details.name,
              email: paymentMethod.billing_details.email,
            } : null,
          },
        })
      }
    } catch {
      // Fallback: try as source (legacy)
    }

    return NextResponse.json({ method: null })
  } catch (err: any) {
    console.error('Stripe payment-method error:', err)
    return NextResponse.json({ error: 'Failed to fetch payment method' }, { status: 500 })
  }
}

export async function POST(_request: NextRequest) {
  try {
    const supabase = createClient()

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

    const subscription = await getFamilySubscription(membership.family_id)
    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
    }

    const stripe = getStripe()
    if (!stripe) {
      // Dev mode
      return NextResponse.json({
        clientSecret: 'seti_mock_client_secret_dev',
      })
    }

    // Create a SetupIntent for the customer
    const setupIntent = await stripe.setupIntents.create({
      customer: subscription.stripe_customer_id,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        user_id: user.id,
        family_id: membership.family_id,
      },
    })

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    })
  } catch (err: any) {
    console.error('Stripe setup-intent error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create setup intent' }, { status: 500 })
  }
}
