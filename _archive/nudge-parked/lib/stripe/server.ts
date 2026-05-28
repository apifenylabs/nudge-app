import Stripe from 'stripe'
import { stripeConfig } from './config'

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = stripeConfig.secretKey
    if (!key || key === 'sk_test_mock') {
      // Return a mock instance for dev/testing
      return null as unknown as Stripe
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2025-03-31.basil' as any,
      typescript: true,
    })
  }
  return stripeInstance
}

/**
 * Create a Stripe Checkout Session for a subscription.
 * Returns the session URL to redirect the user to.
 */
export async function createCheckoutSession(params: {
  customerId?: string
  priceId: string
  userId: string
  userEmail: string
  userName?: string
  familyId: string
  trialDays?: number
}): Promise<string | null> {
  const stripe = getStripe()
  if (!stripe) {
    // Dev mode: return mock URL
    console.log('[STRIPE MOCK] Creating checkout session for:', params.priceId)
    return '/dashboard/settings?billing=dev-simulated'
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    customer: params.customerId,
    customer_email: params.customerId ? undefined : params.userEmail,
    subscription_data: {
      trial_period_days: params.trialDays ?? stripeConfig.trialPeriodDays,
      metadata: {
        user_id: params.userId,
        family_id: params.familyId,
      },
    },
    metadata: {
      user_id: params.userId,
      family_id: params.familyId,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${stripeConfig.urls.success}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${stripeConfig.urls.cancel}`,
  })

  return session.url
}

/**
 * Create a Stripe Billing Portal session for managing subscriptions.
 */
export async function createPortalSession(params: {
  customerId: string
  returnUrl: string
}): Promise<string | null> {
  const stripe = getStripe()
  if (!stripe) {
    console.log('[STRIPE MOCK] Creating portal session for customer:', params.customerId)
    return params.returnUrl
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  })

  return session.url
}

/**
 * Retrieve a subscription by ID.
 */
export async function getSubscription(subscriptionId: string) {
  const stripe = getStripe()
  if (!stripe) return null
  return stripe.subscriptions.retrieve(subscriptionId)
}

/**
 * Cancel a subscription at period end.
 */
export async function cancelSubscription(subscriptionId: string) {
  const stripe = getStripe()
  if (!stripe) return null
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

/**
 * Reactivate a subscription that was set to cancel.
 */
export async function reactivateSubscription(subscriptionId: string) {
  const stripe = getStripe()
  if (!stripe) return null
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  })
}

/**
 * List all invoices for a customer.
 */
export async function getInvoices(customerId: string, limit = 12) {
  const stripe = getStripe()
  if (!stripe) return []
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  })
  return invoices.data
}
