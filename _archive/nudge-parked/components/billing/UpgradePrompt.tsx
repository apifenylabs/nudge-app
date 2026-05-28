'use client'

import { useState } from 'react'
import {
  Crown, Users, Zap, Sparkles, Loader2, X, ArrowRight,
  CheckCircle, Clock, Shield,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getPriceId } from '@/lib/stripe/config'
import type { BillingInterval } from '@/lib/plans'

interface UpgradePromptProps {
  open: boolean
  onClose: () => void
  /** Contextual trigger message shown at top */
  contextMessage?: string
}

type SelectedPlan = 'pro' | 'family' | null
type SelectedInterval = BillingInterval

export default function UpgradePrompt({ open, onClose, contextMessage }: UpgradePromptProps) {
  const router = useRouter()
  const [plan, setPlan] = useState<SelectedPlan>('pro')
  const [interval, setInterval] = useState<SelectedInterval>('monthly')
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  if (!open) return null

  const handleCheckout = async (targetPlan: 'pro' | 'family') => {
    setLoading(`${targetPlan}-${interval}`)
    setError('')

    try {
      const priceId = getPriceId(targetPlan, interval)

      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, plan: targetPlan, interval }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(null)
    }
  }

  const monthlyPrice = plan === 'pro' ? 5 : 9
  const yearlyTotal = plan === 'pro' ? 50 : 90
  const yearlyPerMonth = plan === 'pro' ? 4.17 : 7.50

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-background border border-border/60 rounded-2xl shadow-elevated overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Upgrade Your Plan</h3>
              <p className="text-sm text-muted-foreground">Unlock everything Nudge has to offer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {contextMessage && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-300">{contextMessage}</p>
            </div>
          )}
        </div>

        {/* Billing interval toggle */}
        <div className="px-6 pt-4 pb-1">
          <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl w-fit mx-auto">
            <button
              onClick={() => setInterval('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                interval === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval('yearly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                interval === 'yearly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-1 text-[10px] text-emerald-500 font-bold">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plan selector cards */}
        <div className="px-6 py-4 space-y-3">
          {/* Pro card */}
          <button
            onClick={() => setPlan('pro')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              plan === 'pro'
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 shadow-sm'
                : 'border-border/60 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              plan === 'pro' ? 'bg-indigo-500' : 'bg-secondary'
            }`}>
              <Zap className={`w-5 h-5 ${plan === 'pro' ? 'text-white' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Pro Plan</span>
                {plan === 'pro' && (
                  <span className="text-2xs px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Up to 5 family members, unlimited tasks</p>
              <p className="text-sm font-bold text-foreground mt-1">
                {interval === 'monthly' ? `$${monthlyPrice}/mo` : `$${yearlyTotal}/yr`}
                {interval === 'yearly' && (
                  <span className="text-xs text-muted-foreground font-normal ml-1">(${yearlyPerMonth}/mo)</span>
                )}
              </p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              plan === 'pro' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 dark:border-gray-600'
            }`}>
              {plan === 'pro' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>

          {/* Family card */}
          <button
            onClick={() => setPlan('family')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              plan === 'family'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 shadow-sm'
                : 'border-border/60 hover:border-amber-300 dark:hover:border-amber-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              plan === 'family' ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-secondary'
            }`}>
              <Users className={`w-5 h-5 ${plan === 'family' ? 'text-amber-950' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Family Plan</span>
                <span className="text-2xs px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold">
                  Best Value
                </span>
                {plan === 'family' && (
                  <span className="text-2xs px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Unlimited members, analytics, API access</p>
              <p className="text-sm font-bold text-foreground mt-1">
                {interval === 'monthly' ? `$${monthlyPrice}/mo` : `$${yearlyTotal}/yr`}
                {interval === 'yearly' && (
                  <span className="text-xs text-muted-foreground font-normal ml-1">(${yearlyPerMonth}/mo)</span>
                )}
              </p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              plan === 'family' ? 'border-amber-500 bg-amber-500' : 'border-gray-300 dark:border-gray-600'
            }`}>
              {plan === 'family' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        </div>

        {/* Feature highlights */}
        {plan && (
          <div className="px-6 pb-2">
            <div className="grid grid-cols-2 gap-2">
              <FeatureCheck text={plan === 'family' ? 'Unlimited family members' : 'Up to 5 members'} />
              <FeatureCheck text="Unlimited tasks" />
              <FeatureCheck text={interval === 'yearly' ? 'Best value — save 17%' : 'Cancel anytime'} />
              <FeatureCheck text="14-day free trial" />
              {plan === 'family' && (
                <>
                  <FeatureCheck text="Advanced analytics" />
                  <FeatureCheck text="API access" />
                </>
              )}
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="px-6 pb-6 pt-2">
          {error && (
            <p className="text-xs text-red-500 mb-2 text-center">{error}</p>
          )}
          {plan && (
            <button
              onClick={() => handleCheckout(plan)}
              disabled={loading !== null}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.97] ${
                plan === 'family'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:shadow-lg hover:shadow-amber-400/25'
                  : 'bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/25'
              }`}
            >
              {loading === `${plan}-${interval}` ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                <>
                  <Crown className="w-4 h-4" />
                  Start {plan === 'pro' ? 'Pro' : 'Family'} Free Trial
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}

          <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secure checkout via Stripe &middot; No risk, cancel anytime
          </p>

          <button
            onClick={onClose}
            className="w-full text-xs text-muted-foreground hover:text-foreground py-2 mt-1 transition-colors"
          >
            Maybe later &mdash; keep using Free
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureCheck({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
      {text}
    </div>
  )
}

// Re-export for convenience
import { AlertTriangle } from 'lucide-react'
