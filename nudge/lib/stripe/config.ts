// Stripe configuration
// These keys are loaded from environment variables.

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  // Price IDs from Stripe Dashboard
  prices: {
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
    },
    family: {
      monthly: process.env.STRIPE_PRICE_FAMILY_MONTHLY || 'price_family_monthly',
    },
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
