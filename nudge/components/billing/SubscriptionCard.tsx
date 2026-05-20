'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Crown, CheckCircle, XCircle, Loader2, ExternalLink,
  Zap, Users, Sparkles, ArrowRight, Clock, AlertTriangle,
  CreditCard, ChevronRight, Info, Undo2, Eye,
  ArrowDown, ArrowUp,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { buildAppUrl } from '@/lib/config'
import ConfirmModal from './ConfirmModal'
import PlanComparison from './PlanComparison'

interface Subscription {
  plan: 'free' | 'pro' | 'family'
  status: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  currentPeriodEnd: string | null
  trialEndsAt: string | null
  trialDaysRemaining: number | null
  cancelAtPeriodEnd: boolean
  features: Record<string, any>
}

interface SubscriptionCardProps {
  familyId: string
  isOwner: boolean
}

type ConfirmAction = 'cancel' | 'downgrade-to-free' | 'downgrade-pro' | 'upgrade-family' | 'reactivate'

export default function SubscriptionCard({ familyId, isOwner }: SubscriptionCardProps) {
  const router = useRouter()
  const [sub, setSub] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>('cancel')
  const [confirmPlan, setConfirmPlan] = useState<string | undefined>(undefined)
  const [confirmDescription, setConfirmDescription] = useState('')

  // Show comparison table
  const [showComparison, setShowComparison] = useState(false)

  // Success toast
  const [successMsg, setSuccessMsg] = useState('')

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/stripe/status')
      if (!res.ok) throw new Error('Failed to fetch status')
      const data = await res.json()
      setSub(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const showConfirm = (action: ConfirmAction) => {
    setConfirmAction(action)
    setConfirmOpen(true)

    switch (action) {
      case 'cancel':
        setConfirmPlan(undefined)
        setConfirmDescription(
          'Are you sure? You\'ll lose access to premium features at the end of your billing period. ' +
          'Your family\'s task history will be preserved, but you\'ll be limited to the Free plan.'
        )
        break
      case 'downgrade-to-free':
        setConfirmPlan('free')
        setConfirmDescription(
          'This will immediately switch your family to the Free plan. ' +
          'You\'ll keep task history and can upgrade again anytime.'
        )
        break
      case 'downgrade-pro':
        setConfirmPlan('pro')
        setConfirmDescription(
          'Downgrading to Pro will limit you to 5 family members and remove analytics and API access. ' +
          'Changes take effect immediately.'
        )
        break
      case 'upgrade-family':
        setConfirmPlan('family')
        setConfirmDescription(
          'Upgrade to Family Plan ($9/mo) for unlimited family members, analytics, API access, and priority support.'
        )
        break
      case 'reactivate':
        setConfirmPlan(undefined)
        setConfirmDescription(
          'Reactivate your subscription to continue enjoying premium features.'
        )
        break
    }
  }

  const handleConfirm = async () => {
    switch (confirmAction) {
      case 'cancel':
        await doCancelAtPeriodEnd()
        break
      case 'downgrade-to-free':
        await doChangePlan('free')
        break
      case 'downgrade-pro':
        await doChangePlan('pro')
        break
      case 'upgrade-family':
        await doChangePlan('family')
        break
      case 'reactivate':
        await doReactivate()
        break
    }
  }

  const doChangePlan = async (targetPlan: string) => {
    setActionLoading('change-plan')
    try {
      const res = await fetch('/api/stripe/change-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: targetPlan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to change plan')

      setSuccessMsg(data.message || `Plan changed to ${targetPlan}!`)
      setConfirmOpen(false)
      await fetchStatus()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 4000)
    } finally {
      setActionLoading(null)
    }
  }

  const doCancelAtPeriodEnd = async () => {
    if (!sub?.stripeSubscriptionId) return

    setActionLoading('cancel')
    try {
      const res = await fetch('/api/stripe/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: sub.stripeSubscriptionId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to cancel')
      }

      setSuccessMsg('Subscription will end at the end of your billing period.')
      await fetchStatus()
      setConfirmOpen(false)
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const doReactivate = async () => {
    if (!sub?.stripeSubscriptionId) return

    setActionLoading('reactivate')
    try {
      const res = await fetch('/api/stripe/reactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: sub.stripeSubscriptionId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to reactivate')
      }

      setSuccessMsg('Subscription reactivated!')
      setConfirmOpen(false)
      await fetchStatus()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleUpgrade = async (plan: 'pro' | 'family') => {
    // For free → paid, redirect to Stripe checkout (needs payment method)
    if (!sub || sub.plan === 'free') {
      await doCheckout(plan)
      return
    }

    // For pro → family, use change-plan API
    if (sub.plan === 'pro' && plan === 'family') {
      showConfirm('upgrade-family')
      return
    }
  }

  const doCheckout = async (plan: 'pro' | 'family') => {
    setActionLoading(plan)
    try {
      const priceId = plan === 'pro'
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly'
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_FAMILY_MONTHLY || 'price_family_monthly'

      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, plan }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout')

      if (data.url) {
        window.location.href = data.url
      } else {
        router.push(data.url)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
      setConfirmOpen(false)
    }
  }

  const handleManageBilling = async () => {
    setActionLoading('portal')
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to open billing portal')

      if (data.url) {
        window.location.href = data.url
      } else {
        router.push(data.url)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading subscription...</p>
      </div>
    )
  }

  if (!sub) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">Could not load subscription info</p>
        <button onClick={fetchStatus} className="btn-secondary text-sm">Retry</button>
      </div>
    )
  }

  // ---------- FREE PLAN VIEW ----------
  if (sub.plan === 'free') {
    return (
      <div className="space-y-3">
        {/* Current plan status */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Plan</p>
              <p className="text-lg font-bold text-foreground mt-0.5">Free</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2 mb-5">
            <FeatureRow label="5 tasks per day" included />
            <FeatureRow label="Basic voice input" included />
            <FeatureRow label="Single user" included />
            <FeatureRow label="Advanced voice AI" included={false} />
            <FeatureRow label="Family sharing" included={false} />
            <FeatureRow label="SMS reminders" included={false} />
          </div>

          {isOwner && (
            <div className="space-y-2">
              <button
                onClick={() => handleUpgrade('pro')}
                disabled={actionLoading === 'pro'}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                {actionLoading === 'pro' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Opening checkout...</>
                ) : (
                  <><Crown className="w-4 h-4" /> Upgrade to Pro — $5/mo</>
                )}
              </button>
              <button
                onClick={() => handleUpgrade('family')}
                disabled={actionLoading === 'family'}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                  bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950
                  hover:from-amber-500 hover:to-amber-600
                  active:scale-[0.97] transition-all"
              >
                {actionLoading === 'family' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Opening checkout...</>
                ) : (
                  <><Users className="w-4 h-4" /> Upgrade to Family — $9/mo</>
                )}
              </button>
              <p className="text-xs text-muted-foreground text-center pt-1">
                Save $3/mo with Family — includes everything in Pro plus unlimited members &amp; analytics
              </p>
            </div>
          )}

          {!isOwner && (
            <p className="text-xs text-muted-foreground text-center">
              Ask your family owner to upgrade
            </p>
          )}
        </div>

        {/* Plan comparison toggle */}
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <Eye className="w-3 h-3" />
          {showComparison ? 'Hide' : 'Show'} plan comparison
        </button>

        {showComparison && (
          <PlanComparison
            currentPlan="free"
            onUpgrade={handleUpgrade}
            loading={actionLoading !== null}
            isOwner={isOwner}
          />
        )}
      </div>
    )
  }

  // ---------- PAID PLAN VIEW (pro or family) ----------
  const isTrialing = sub.status === 'trialing'
  const isPastDue = sub.status === 'past_due'

  return (
    <div className="space-y-3">
      {/* Confirmation modal */}
      <ConfirmModal
        open={confirmOpen}
        variant={confirmAction === 'upgrade-family' ? 'upgrade' : confirmAction === 'reactivate' ? 'upgrade' : confirmAction === 'cancel' ? 'cancel' : 'downgrade'}
        plan={confirmPlan}
        loading={actionLoading !== null}
        description={confirmDescription}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
        onClose={() => setConfirmOpen(false)}
      />

      {/* Success toast */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-slide-up">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2 animate-slide-up">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Current Plan Card */}
      <div className={`glass-card rounded-2xl p-5 ${
        sub.plan === 'family'
          ? 'border-2 border-amber-200 dark:border-amber-800'
          : 'border-2 border-indigo-200 dark:border-indigo-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Plan</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-lg font-bold text-foreground capitalize">{sub.plan}</p>
              {sub.cancelAtPeriodEnd && (
                <span className="badge-amber text-[10px]">Canceling</span>
              )}
              {isTrialing && (
                <span className="badge-amber text-[10px]">Trial</span>
              )}
              {isPastDue && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                  Past Due
                </span>
              )}
            </div>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            sub.plan === 'family' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'
          }`}>
            <Crown className={`w-5 h-5 ${
              sub.plan === 'family' ? 'text-amber-500' : 'text-indigo-500'
            }`} />
          </div>
        </div>

        {/* Trial / Period info */}
        {sub.trialDaysRemaining !== null && sub.trialDaysRemaining > 0 && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl mb-4">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <span className="font-semibold">{sub.trialDaysRemaining} days</span> remaining in your trial.
              {sub.trialDaysRemaining <= 3 && ' Your card will be charged soon.'}
            </p>
          </div>
        )}

        {sub.cancelAtPeriodEnd && sub.currentPeriodEnd && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-700 dark:text-red-300">
              Your subscription ends{' '}
              {new Date(sub.currentPeriodEnd).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}.
              {' '}You'll revert to Free after that.
            </p>
          </div>
        )}

        {isPastDue && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-700 dark:text-red-300">
              Your latest payment failed. Please update your payment method to keep access.
            </p>
          </div>
        )}

        {/* Feature highlights */}
        <div className="space-y-2 mb-5">
          <FeatureRow label="Unlimited tasks" included />
          <FeatureRow label="Advanced voice AI" included />
          {sub.plan === 'family' ? (
            <FeatureRow label="Unlimited family members" included />
          ) : (
            <FeatureRow label="Up to 5 family members" included />
          )}
          <FeatureRow label="SMS reminders" included />
          <FeatureRow label="Weekly scorecards" included />
          {sub.plan === 'family' && (
            <>
              <FeatureRow label="Advanced analytics" included />
              <FeatureRow label="API access" included />
            </>
          )}
          <FeatureRow label="Priority support" included />
        </div>

        {/* Owner action buttons */}
        {isOwner && (
          <div className="space-y-2">
            {/* Manage Billing (Stripe Portal) — always available */}
            <button
              onClick={handleManageBilling}
              disabled={actionLoading === 'portal'}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
              {actionLoading === 'portal' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
              ) : (
                <><CreditCard className="w-4 h-4" /> Manage Billing (Stripe)</>
              )}
            </button>

            {/* ---- Pro-specific actions ---- */}
            {sub.plan === 'pro' && !sub.cancelAtPeriodEnd && (
              <>
                {/* Upgrade to Family (direct change-plan) */}
                <button
                  onClick={() => showConfirm('upgrade-family')}
                  disabled={actionLoading === 'change-plan'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950
                    hover:from-amber-500 hover:to-amber-600
                    active:scale-[0.97] transition-all"
                >
                  {actionLoading === 'change-plan' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Upgrading...</>
                  ) : (
                    <><ArrowUp className="w-4 h-4" /> Upgrade to Family — $9/mo</>
                  )}
                </button>

                {/* Downgrade to Free (direct change-plan with 'free') */}
                <button
                  onClick={() => showConfirm('downgrade-to-free')}
                  disabled={actionLoading === 'change-plan'}
                  className="w-full text-xs text-muted-foreground hover:text-amber-500 transition-colors py-1.5 flex items-center justify-center gap-1"
                >
                  <ArrowDown className="w-3 h-3" />
                  Downgrade to Free
                </button>
              </>
            )}

            {/* ---- Family-specific actions ---- */}
            {sub.plan === 'family' && !sub.cancelAtPeriodEnd && (
              <>
                {/* Downgrade to Pro (direct change-plan) */}
                <button
                  onClick={() => showConfirm('downgrade-pro')}
                  disabled={actionLoading === 'change-plan'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                    bg-muted hover:bg-secondary text-foreground
                    active:scale-[0.97] transition-all"
                >
                  {actionLoading === 'change-plan' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Downgrading...</>
                  ) : (
                    <><ArrowDown className="w-4 h-4" /> Downgrade to Pro — $5/mo</>
                  )}
                </button>

                {/* Cancel straight to Free */}
                <button
                  onClick={() => showConfirm('downgrade-to-free')}
                  disabled={actionLoading === 'change-plan'}
                  className="w-full text-xs text-muted-foreground hover:text-red-500 transition-colors py-1.5 flex items-center justify-center gap-1"
                >
                  Cancel &amp; Downgrade to Free
                </button>
              </>
            )}

            {/* ---- Canceling state actions ---- */}
            {sub.cancelAtPeriodEnd && (
              <>
                {/* Reactivate */}
                <button
                  onClick={() => showConfirm('reactivate')}
                  disabled={actionLoading === 'reactivate'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                    bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300
                    hover:bg-emerald-100 dark:hover:bg-emerald-900/30
                    active:scale-[0.97] transition-all"
                >
                  {actionLoading === 'reactivate' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Reactivating...</>
                  ) : (
                    <><Undo2 className="w-4 h-4" /> Reactivate Subscription</>
                  )}
                </button>

                {/* Immediate downgrade to Free (don't wait for period) */}
                <button
                  onClick={() => showConfirm('downgrade-to-free')}
                  disabled={actionLoading === 'change-plan'}
                  className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors py-1.5"
                >
                  Switch to Free immediately
                </button>
              </>
            )}
          </div>
        )}

        {/* Non-owner message */}
        {!isOwner && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            Only the family owner can manage billing.
          </p>
        )}
      </div>

      {/* Plan comparison toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        <Eye className="w-3 h-3" />
        {showComparison ? 'Hide' : 'Show'} plan comparison
      </button>

      {showComparison && (
        <PlanComparison
          currentPlan={sub.plan}
          onUpgrade={handleUpgrade}
          loading={actionLoading !== null}
          isOwner={isOwner}
        />
      )}

      {/* Pricing link */}
      <Link href="/pricing" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors justify-center py-1">
        <Info className="w-3 h-3" />
        Compare all plans on pricing page
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  )
}

function FeatureRow({ label, included }: { label: string; included: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      {included ? (
        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground/30 shrink-0" />
      )}
      <span className={included ? 'text-foreground' : 'text-muted-foreground/50'}>{label}</span>
    </div>
  )
}
