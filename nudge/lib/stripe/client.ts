import { loadStripe, Stripe } from '@stripe/stripe-js'
import { stripeConfig } from './config'

let stripePromise: Promise<Stripe | null> | null = null

export function getStripeClient(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = stripeConfig.publishableKey
    if (!key || key === 'pk_test_mock') {
      // Dev mode: return null promise
      stripePromise = Promise.resolve(null)
    } else {
      stripePromise = loadStripe(key)
    }
  }
  return stripePromise
}
