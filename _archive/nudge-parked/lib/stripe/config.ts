// Stripe configuration
// These keys are loaded from environment variables.

export interface PriceConfig {
  monthly: string
  yearly: string
}

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  // Price IDs from Stripe Dashboard
  prices: {
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
      yearly: process.env.STRIPE_PRICE_PRO_YEARLY || 'price_pro_yearly',
    } as PriceConfig,
    family: {
      monthly: process.env.STRIPE_PRICE_FAMILY_MONTHLY || 'price_family_monthly',
      yearly: process.env.STRIPE_PRICE_FAMILY_YEARLY || 'price_family_yearly',
    } as PriceConfig,
  },
  // Trial period in days
  trialPeriodDays: 14,
  // Success/cancel URLs
  urls: {
    success: '/checkout/success',
    cancel: '/checkout/cancel',
    portal: '/dashboard/settings',
  },
} as const

/**
 * Resolve a price ID for a given plan + billing interval.
 */
export function getPriceId(plan: 'pro' | 'family', interval: 'monthly' | 'yearly'): string {
  return stripeConfig.prices[plan][interval]
}

/**
 * Resolve plan + interval from a price ID.
 */
export function resolvePlanFromPrice(priceId: string): { plan: 'pro' | 'family' | null; interval: 'monthly' | 'yearly' | null } {
  const entries = [
    { plan: 'pro' as const, interval: 'monthly' as const, id: stripeConfig.prices.pro.monthly },
    { plan: 'pro' as const, interval: 'yearly' as const, id: stripeConfig.prices.pro.yearly },
    { plan: 'family' as const, interval: 'monthly' as const, id: stripeConfig.prices.family.monthly },
    { plan: 'family' as const, interval: 'yearly' as const, id: stripeConfig.prices.family.yearly },
  ]
  for (const entry of entries) {
    if (entry.id === priceId) return { plan: entry.plan, interval: entry.interval }
  }
  return { plan: null, interval: null }
}
