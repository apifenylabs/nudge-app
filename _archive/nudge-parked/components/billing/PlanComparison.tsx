'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Crown, Users, Zap, Sparkles, Flame } from 'lucide-react'
import type { BillingInterval } from '@/lib/plans'

interface PlanComparisonProps {
  currentPlan: 'free' | 'pro' | 'family'
  onUpgrade?: (plan: 'pro' | 'family', interval?: BillingInterval) => void
  loading?: boolean
  isOwner?: boolean
}

const featureLabels: Record<string, { label: string }> = {
  tasks: { label: 'Tasks' },
  voice: { label: 'Voice AI' },
  family: { label: 'Family' },
  reminders: { label: 'Reminders' },
  recurring: { label: 'Recurring' },
  scorecards: { label: 'Scorecards' },
  analytics: { label: 'Analytics' },
  api: { label: 'API Access' },
}

function getPlanInfo(interval: BillingInterval) {
  return [
    {
      key: 'free',
      name: 'Free',
      price: '$0',
      yearlyDiscount: '',
      color: 'text-muted-foreground',
      borderColor: 'border-gray-200 dark:border-gray-700',
      features: {
        tasks: '5/day',
        voice: 'Basic',
        family: '1 user',
        reminders: 'Telegram',
        recurring: false,
        scorecards: false,
        analytics: false,
        api: false,
      },
    },
    {
      key: 'pro',
      name: 'Pro',
      price: interval === 'yearly' ? '$50/yr' : '$5/mo',
      yearlyDiscount: interval === 'yearly' ? '$4.17/mo' : '',
      color: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      features: {
        tasks: 'Unlimited',
        voice: 'Advanced AI',
        family: 'Up to 5',
        reminders: 'All channels',
        recurring: true,
        scorecards: true,
        analytics: false,
        api: false,
      },
    },
    {
      key: 'family',
      name: 'Family',
      price: interval === 'yearly' ? '$90/yr' : '$9/mo',
      yearlyDiscount: interval === 'yearly' ? '$7.50/mo' : '',
      color: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800',
      features: {
        tasks: 'Unlimited',
        voice: 'Advanced AI',
        family: 'Unlimited',
        reminders: 'All channels',
        recurring: true,
        scorecards: true,
        analytics: true,
        api: true,
      },
    },
  ]
}

export default function PlanComparison({ currentPlan, onUpgrade, loading, isOwner }: PlanComparisonProps) {
  const [interval, setInterval] = useState<BillingInterval>('monthly')
  const plans = getPlanInfo(interval)

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Billing interval toggle */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-center">
        <div className="flex items-center gap-1 p-0.5 bg-secondary rounded-lg">
          <button
            onClick={() => setInterval('monthly')}
            className={`px-3 py-1 rounded-md text-2xs font-semibold transition-all ${
              interval === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('yearly')}
            className={`px-3 py-1 rounded-md text-2xs font-semibold transition-all ${
              interval === 'yearly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <span className="ml-1 text-[9px] text-emerald-500 font-bold">-17%</span>
          </button>
        </div>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-3 bg-muted/50 border-b border-border/40">
        <div className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Feature
        </div>
        {plans.map((plan) => (
          <div key={plan.key} className={`px-3 py-3 text-center border-l border-border/40 ${plan.key === currentPlan ? `bg-primary/5 ${plan.color}` : ''}`}>
            <p className={`text-xs font-bold ${plan.color}`}>{plan.name}</p>
            <p className={`text-2xs font-semibold mt-0.5 ${plan.color}`}>{plan.price}</p>
            {plan.yearlyDiscount && (
              <p className="text-[10px] text-emerald-500 font-semibold">{plan.yearlyDiscount}</p>
            )}
          </div>
        ))}
      </div>

      {/* Feature rows */}
      {Object.keys(featureLabels).map((featureKey) => {
        const fl = featureLabels[featureKey]
        const values = plans.map(p => p.features[featureKey as keyof typeof plans[0]['features']])

        return (
          <div key={featureKey} className="grid grid-cols-3 border-b border-border/30 last:border-0">
            <div className="px-3 py-2.5 text-xs text-muted-foreground">
              {fl.label}
            </div>
            {values.map((val, i) => {
              const plan = plans[i]
              const isCurrent = plan.key === currentPlan
              const boolVal = typeof val === 'boolean'

              return (
                <div
                  key={plan.key}
                  className={`px-3 py-2.5 text-center border-l border-border/40 ${isCurrent ? 'bg-primary/5' : ''}`}
                >
                  {boolVal ? (
                    val ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mx-auto" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-muted-foreground/30 mx-auto" />
                    )
                  ) : (
                    <span className={`text-xs ${isCurrent ? plan.color : 'text-muted-foreground'}`}>{val}</span>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

      {/* Annual savings note */}
      {interval === 'yearly' && (
        <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/10 border-b border-border/30 flex items-center justify-center gap-1.5">
          <Flame className="w-3 h-3 text-emerald-500" />
          <span className="text-2xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Save 17% with annual billing — best value!
          </span>
        </div>
      )}

      {/* Action row */}
      {isOwner && currentPlan !== 'family' && (
        <div className="grid grid-cols-3 border-t border-border/40">
          <div className="px-3 py-3" />
          {plans.map((plan) => {
            if (plan.key === currentPlan || plan.key === 'free') {
              return (
                <div key={plan.key} className={`px-3 py-3 text-center border-l border-border/40 ${plan.key === currentPlan ? 'bg-primary/5' : ''}`}>
                  {plan.key === currentPlan ? (
                    <span className="text-2xs font-semibold text-emerald-500">Current</span>
                  ) : null}
                </div>
              )
            }
            return (
              <div key={plan.key} className="px-3 py-3 text-center border-l border-border/40">
                <button
                  onClick={() => onUpgrade?.(plan.key as 'pro' | 'family', interval)}
                  disabled={loading}
                  className={`text-2xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
                    plan.key === 'family'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:shadow-sm'
                      : 'bg-indigo-600 text-white hover:shadow-sm'
                  }`}
                >
                  {interval === 'yearly' ? 'Start Annual' : 'Upgrade'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
