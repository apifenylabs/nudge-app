/**
 * Stripe Checkout API Route
 *
 * Creates a Stripe Checkout Session for Titan Pro subscription.
 * In dev mode (no STRIPE_SECRET_KEY), returns a mock redirect.
 */

import { NextResponse } from 'next/server'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { priceId, userId, email } = body

    if (!priceId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: priceId, email' },
        { status: 400 }
      )
    }

    // No real Stripe key? Dev mode — mock redirect
    if (!stripeSecretKey || stripeSecretKey === 'sk_test_mock') {
      console.log('[CHECKOUT MOCK] Creating session for:', priceId, email)
      return NextResponse.json({
        url: `${appUrl}/dashboard/billing?checkout=mock-success`,
      })
    }

    // Real Stripe — only reachable if stripe package is available
    // and STRIPE_SECRET_KEY is set in env
    const stripe = await createStripeClient(stripeSecretKey)
    if (!stripe) {
      return NextResponse.json({
        url: `${appUrl}/dashboard/billing?checkout=mock-success`,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: { user_id: userId },
      success_url: `${appUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[CHECKOUT ERROR]', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

async function createStripeClient(secretKey: string) {
  try {
    // Dynamic import avoids requiring the package at install time
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = await eval(`import('stripe')`)
    const Stripe = mod.default
    return new Stripe(secretKey, {
      apiVersion: '2025-03-31.basil' as any,
    })
  } catch {
    return null
  }
}
