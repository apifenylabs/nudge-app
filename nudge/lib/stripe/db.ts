import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Get the subscription record for a family from our database.
 */
export async function getFamilySubscription(familyId: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('family_id', familyId)
    .single()
  return data
}

/**
 * Get the subscription record for a user (from their families).
 */
export async function getUserSubscription(userId: string) {
  const supabase = createAdminClient()

  // Get family IDs for the user
  const { data: memberships } = await supabase
    .from('family_members')
    .select('family_id')
    .eq('user_id', userId)

  if (!memberships || memberships.length === 0) return null

  // Get subscription for the first family (primary)
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .in('family_id', memberships.map(m => m.family_id))
    .single()
  return data
}

/**
 * Upsert a subscription record in our database.
 */
export async function upsertSubscription(params: {
  familyId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  plan: 'free' | 'pro' | 'family'
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
  currentPeriodStart?: string
  currentPeriodEnd?: string
  trialEndsAt?: string
  cancelAtPeriodEnd?: boolean
}) {
  const supabase = createAdminClient()

  const payload: Record<string, any> = {
    family_id: params.familyId,
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId,
    plan: params.plan,
    status: params.status,
    updated_at: new Date().toISOString(),
  }

  if (params.currentPeriodStart) payload.current_period_start = params.currentPeriodStart
  if (params.currentPeriodEnd) payload.current_period_end = params.currentPeriodEnd
  if (params.trialEndsAt) payload.trial_ends_at = params.trialEndsAt
  if (params.cancelAtPeriodEnd !== undefined) payload.cancel_at_period_end = params.cancelAtPeriodEnd

  const existing = await supabase
    .from('subscriptions')
    .select('id')
    .eq('family_id', params.familyId)
    .single()

  if (existing.data) {
    return supabase.from('subscriptions').update(payload).eq('family_id', params.familyId)
  } else {
    return supabase.from('subscriptions').insert({
      ...payload,
      created_at: new Date().toISOString(),
    })
  }
}

/**
 * Update subscription status in our database.
 */
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: string,
  metadata?: Record<string, any>
) {
  const supabase = createAdminClient()
  const update: Record<string, any> = { status, updated_at: new Date().toISOString() }
  if (metadata?.cancel_at_period_end !== undefined) update.cancel_at_period_end = metadata.cancel_at_period_end
  if (metadata?.current_period_end) update.current_period_end = metadata.current_period_end
  if (metadata?.trial_ends_at) update.trial_ends_at = metadata.trial_ends_at
  return supabase.from('subscriptions').update(update).eq('stripe_subscription_id', subscriptionId)
}

/**
 * Set a family's plan back to free.
 */
export async function clearSubscription(familyId: string) {
  const supabase = createAdminClient()
  return supabase.from('subscriptions').update({
    plan: 'free',
    status: 'canceled',
    updated_at: new Date().toISOString(),
  }).eq('family_id', familyId)
}
