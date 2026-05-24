/**
 * usePlan — Hook for checking user's plan and limits.
 *
 * Currently uses localStorage for plan tracking.
 * Future: read from Supabase subscriptions table.
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { type PlanTier, type PlanFeatures, getPlanFeatures, PLAN_FEATURES, PLAN_PRICES, shouldShowUpgrade, planLabel } from '@/lib/plans'
import { createAuthClient } from '@/lib/auth/client'

const STORAGE_KEY = 'titan-plan-tier'

function loadPlan(): PlanTier {
  if (typeof window === 'undefined') return 'free'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pro') return 'pro'
  } catch {}
  return 'free'
}

function savePlan(tier: PlanTier) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, tier)
  } catch {}
}

export function usePlan() {
  const [plan, setPlan] = useState<PlanTier>(loadPlan)
  const [loading, setLoading] = useState(false)

  // Try to read from Supabase session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createAuthClient()
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          // In future: fetch subscription from DB
          // For now, keep localStorage plan
        }
      } catch {}
    }
    checkSession()
  }, [])

  const features: PlanFeatures = useMemo(() => getPlanFeatures(plan), [plan])

  const upgrade = useCallback(async () => {
    const priceId = PLAN_PRICES.pro.stripePriceId

    // Try to get the user email for checkout
    let userEmail = ''
    let userId = ''
    try {
      const supabase = createAuthClient()
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        userEmail = data.user.email || ''
        userId = data.user.id
      }
    } catch {}

    try {
      // Call the Stripe checkout API
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId, email: userEmail }),
      })

      const result = await res.json()

      if (result.url) {
        // Mock success (same-origin redirect) or real Stripe URL
        if (result.url.startsWith(window.location.origin)) {
          // Dev mock — upgrade locally
          setPlan('pro')
          savePlan('pro')
          window.location.href = result.url
        } else {
          // Real Stripe checkout
          window.location.href = result.url
        }
      }
    } catch (err) {
      console.error('[UPGRADE ERROR]', err)
      // Fallback: just upgrade locally
      setPlan('pro')
      savePlan('pro')
    }
  }, [])

  const downgrade = useCallback(() => {
    setPlan('free')
    savePlan('free')
  }, [])

  const checkLimit = useCallback((type: keyof PlanFeatures, current: number): { allowed: boolean; upgradeRequired: boolean; message?: string } => {
    const limit = features[type]
    if (limit === -1) return { allowed: true, upgradeRequired: false }

    const numLimit = limit as number
    if (current >= numLimit) {
      return {
        allowed: false,
        upgradeRequired: true,
        message: `You've reached the free plan limit. Upgrade to Pro for unlimited access.`,
      }
    }

    return { allowed: true, upgradeRequired: false }
  }, [features])

  return {
    plan,
    features,
    loading,
    isPro: plan === 'pro',
    isFree: plan === 'free',
    upgrade,
    downgrade,
    checkLimit,
    shouldUpgrade: shouldShowUpgrade(plan),
    label: planLabel(plan),
  }
}
