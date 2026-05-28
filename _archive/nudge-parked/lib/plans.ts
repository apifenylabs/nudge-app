/**
 * Plan definitions and utility functions for Nudge billing tiers.
 *
 * This is the single source of truth for what each plan level provides.
 */

import { createAdminClient } from '@/lib/supabase/admin'

export type PlanTier = 'free' | 'pro' | 'family'
export type BillingInterval = 'monthly' | 'yearly'

export interface PlanFeatures {
  maxTasksPerDay: number // -1 = unlimited
  maxFamilyMembers: number // -1 = unlimited
  maxRecurringTasks: number // -1 = unlimited
  voiceAi: 'basic' | 'advanced'
  reminderChannels: ('telegram' | 'email' | 'push' | 'sms')[]
  recurringChores: boolean
  scorecards: boolean
  analytics: boolean
  apiAccess: boolean
  prioritySupport: boolean
  referralsEnabled: boolean
}

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  family: {
    maxTasksPerDay: -1,
    maxFamilyMembers: -1,
    maxRecurringTasks: -1,
    voiceAi: 'advanced',
    reminderChannels: ['telegram', 'email', 'push', 'sms'],
    recurringChores: true,
    scorecards: true,
    analytics: true,
    apiAccess: true,
    prioritySupport: true,
    referralsEnabled: true,
  },
  pro: {
    maxTasksPerDay: -1,
    maxFamilyMembers: 5,
    maxRecurringTasks: 20,
    voiceAi: 'advanced',
    reminderChannels: ['telegram', 'email', 'push', 'sms'],
    recurringChores: true,
    scorecards: true,
    analytics: false,
    apiAccess: false,
    prioritySupport: true,
    referralsEnabled: true,
  },
  free: {
    maxTasksPerDay: 5,
    maxFamilyMembers: 1,
    maxRecurringTasks: 3,
    voiceAi: 'basic',
    reminderChannels: ['telegram', 'email'],
    recurringChores: false,
    scorecards: false,
    analytics: false,
    apiAccess: false,
    prioritySupport: false,
    referralsEnabled: false,
  },
}

/**
 * Pricing display info per plan + interval.
 */
export interface PlanPricing {
  plan: PlanTier
  monthlyPrice: number  // cents
  yearlyPrice: number   // cents (total for 12 months)
  monthlyLabel: string
  yearlyLabel: string
  yearlySavingsPercent: number
}

export const PLAN_PRICING: Record<Exclude<PlanTier, 'free'>, PlanPricing> = {
  pro: {
    plan: 'pro',
    monthlyPrice: 500,    // $5
    yearlyPrice: 5000,    // $50 ($4.17/mo save ~17%)
    monthlyLabel: '$5/mo',
    yearlyLabel: '$50/yr',
    yearlySavingsPercent: 17,
  },
  family: {
    plan: 'family',
    monthlyPrice: 900,    // $9
    yearlyPrice: 9000,    // $90 ($7.50/mo save ~17%)
    monthlyLabel: '$9/mo',
    yearlyLabel: '$90/yr',
    yearlySavingsPercent: 17,
  },
}

export function getPlanPricing(plan: Exclude<PlanTier, 'free'>): PlanPricing {
  return PLAN_PRICING[plan]
}

/**
 * Price label for display.
 */
export function getPriceLabel(plan: Exclude<PlanTier, 'free'>, interval: BillingInterval): string {
  const pricing = PLAN_PRICING[plan]
  if (interval === 'yearly') return pricing.yearlyLabel
  return pricing.monthlyLabel
}

/**
 * Per-month cost for yearly billing (for display).
 */
export function getYearlyPerMonth(plan: Exclude<PlanTier, 'free'>): string {
  const pricing = PLAN_PRICING[plan]
  return `$${(pricing.yearlyPrice / 1200).toFixed(2)}/mo`
}

/**
 * Returns the resolved plan for a given family.
 * Falls back to 'free' if no subscription record exists or status is inactive.
 */
export async function getFamilyPlan(familyId: string): Promise<PlanTier> {
  const supabase = createAdminClient()
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('family_id', familyId)
    .single()

  if (!sub) return 'free'
  if (sub.status !== 'active' && sub.status !== 'trialing') return 'free'
  if (sub.plan !== 'pro' && sub.plan !== 'family') return 'free'

  return sub.plan as PlanTier
}

/**
 * Returns the resolved plan for a given user (via their primary family).
 */
export async function getUserPlan(userId: string): Promise<PlanTier> {
  const supabase = createAdminClient()

  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle()

  if (!membership) return 'free'

  return getFamilyPlan(membership.family_id)
}

/**
 * Returns the PlanFeatures for a given plan tier.
 */
export function getPlanFeatures(tier: PlanTier): PlanFeatures {
  return PLAN_FEATURES[tier] || PLAN_FEATURES.free
}

/**
 * Checks whether a user can create more tasks today.
 * Returns { allowed: true } or { allowed: false, tasksToday, maxTasks, message }.
 */
export async function checkDailyTaskLimit(
  userId: string
): Promise<{ allowed: true } | { allowed: false; tasksToday: number; maxTasks: number; message: string }> {
  const plan = await getUserPlan(userId)
  const features = getPlanFeatures(plan)

  // Unlimited
  if (features.maxTasksPerDay === -1) {
    return { allowed: true }
  }

  const supabase = createAdminClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { count } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', userId)
    .gte('created_at', today.toISOString())
    .lt('created_at', tomorrow.toISOString())

  const tasksToday = count || 0
  const maxTasks = features.maxTasksPerDay

  if (tasksToday >= maxTasks) {
    return {
      allowed: false,
      tasksToday,
      maxTasks,
      message: `You've reached the free plan limit of ${maxTasks} tasks per day. Upgrade to Pro for unlimited tasks.`,
    }
  }

  return { allowed: true }
}

/**
 * Subscription status payload for UI consumption.
 */
export interface SubscriptionStatus {
  plan: PlanTier
  billingInterval: BillingInterval | null
  status: string
  trialDaysRemaining: number | null
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string | null
  features: PlanFeatures
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
}

/**
 * Fetches the subscription status for a given user's primary family.
 */
export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  const supabase = createAdminClient()

  const { data: membership } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle()

  if (!membership) {
    return {
      plan: 'free',
      billingInterval: null,
      status: 'active',
      trialDaysRemaining: null,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
      features: getPlanFeatures('free'),
      stripeCustomerId: null,
      stripeSubscriptionId: null,
    }
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('family_id', membership.family_id)
    .maybeSingle()

  if (!sub) {
    return {
      plan: 'free',
      billingInterval: null,
      status: 'active',
      trialDaysRemaining: null,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
      features: getPlanFeatures('free'),
      stripeCustomerId: null,
      stripeSubscriptionId: null,
    }
  }

  // Calculate trial days remaining
  let trialDaysRemaining: number | null = null
  if (sub.trial_ends_at) {
    const trialEnd = new Date(sub.trial_ends_at)
    const now = new Date()
    const remaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    trialDaysRemaining = remaining > 0 ? remaining : 0
  }

  const plan = (sub.plan === 'pro' || sub.plan === 'family') ? sub.plan : 'free'
  const billingInterval: BillingInterval | null = sub.billing_interval === 'yearly' ? 'yearly' :
    sub.billing_interval === 'monthly' ? 'monthly' : null

  return {
    plan,
    billingInterval,
    status: sub.status,
    trialDaysRemaining,
    cancelAtPeriodEnd: sub.cancel_at_period_end || false,
    currentPeriodEnd: sub.current_period_end,
    features: getPlanFeatures(plan),
    stripeCustomerId: sub.stripe_customer_id,
    stripeSubscriptionId: sub.stripe_subscription_id,
  }
}

/**
 * Human-readable label for a plan tier.
 */
export function planLabel(tier: PlanTier): string {
  switch (tier) {
    case 'family': return 'Family Plan'
    case 'pro': return 'Pro Plan'
    default: return 'Free Plan'
  }
}

/**
 * Whether the plan should display an upgrade call-to-action.
 */
export function shouldShowUpgradeCTA(tier: PlanTier): boolean {
  return tier === 'free'
}
