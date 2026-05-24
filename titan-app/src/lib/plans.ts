/**
 * Titan Plans — Freemium Tier Definition
 *
 * Single source of truth for what each plan provides.
 */

export type PlanTier = 'free' | 'pro'

export interface PlanFeatures {
  maxSwarms: number       // -1 = unlimited
  maxAgents: number       // -1 = unlimited
  maxMascots: number      // basic = only common/uncommon
  canSaveSwarms: boolean
  skillForgeAccess: boolean
  auditCenterAccess: boolean
  lifeosAccess: boolean
  prioritySupport: boolean
}

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  free: {
    maxSwarms: 1,
    maxAgents: 3,
    maxMascots: 5,   // common + uncommon only
    canSaveSwarms: false,
    skillForgeAccess: true,
    auditCenterAccess: false,
    lifeosAccess: true,
    prioritySupport: false,
  },
  pro: {
    maxSwarms: -1,
    maxAgents: -1,
    maxMascots: -1,  // all mascots including legendary
    canSaveSwarms: true,
    skillForgeAccess: true,
    auditCenterAccess: true,
    lifeosAccess: true,
    prioritySupport: true,
  },
}

export const PLAN_PRICES = {
  pro: {
    monthly: 19, // USD
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
  },
} as const

/**
 * Returns the features for a given plan tier.
 */
export function getPlanFeatures(tier: PlanTier): PlanFeatures {
  return PLAN_FEATURES[tier] || PLAN_FEATURES.free
}

/**
 * Returns whether the user should see an upgrade prompt.
 */
export function shouldShowUpgrade(tier: PlanTier): boolean {
  return tier === 'free'
}

/**
 * Human-readable plan label.
 */
export function planLabel(tier: PlanTier): string {
  switch (tier) {
    case 'pro': return 'Pro Plan'
    default: return 'Free Plan'
  }
}

/**
 * Get the count of allowed mascots based on plan.
 * Free tier: only common + uncommon.
 */
export function getAllowedMascotCount(tier: PlanTier): number | 'all' {
  if (tier === 'pro') return 'all'
  return 5 // common + uncommon only
}
