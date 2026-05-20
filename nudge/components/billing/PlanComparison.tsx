'use client'

import { CheckCircle, XCircle, Crown, Users, Zap, Sparkles } from 'lucide-react'

interface PlanComparisonProps {
  currentPlan: 'free' | 'pro' | 'family'
  onUpgrade?: (plan: 'pro' | 'family') => void
  loading?: boolean
  isOwner?: boolean
}

const plans = [
  {
    key: 'free',
    name: 'Free',
    price: '$0',
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
    price: '$5/mo',
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
    price: '$9/mo',
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

const featureLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  tasks: { label: 'Tasks', icon: <Zap className="w-3.5 h-3.5" /> },
  voice: { label: 'Voice AI', icon: <Sparkles className="w-3.5 h-3.5" /> },
  family: { label: 'Family', icon: <Users className="w-3.5 h-3.5" /> },
  reminders: { label: 'Reminders', icon: <Crown className="w-3.5 h-3.5" /> },
  recurring: { label: 'Recurring', icon: <Crown className="w-3.5 h-3.5" /> },
  scorecards: { label: 'Scorecards', icon: <Crown className="w-3.5 h-3.5" /> },
  analytics: { label: 'Analytics', icon: <Crown className="w-3.5 h-3.5" /> },
  api: { label: 'API Access', icon: <Crown className="w-3.5 h-3.5" /> },
}

export default function PlanComparison({ currentPlan, onUpgrade, loading, isOwner }: PlanComparisonProps) {
  const currentIdx = plans.findIndex(p => p.key === currentPlan)

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="grid grid-cols-3 bg-muted/50 border-b border-border/40">
        <div className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Feature
        </div>
        {plans.map((plan) => (
          <div key={plan.key} className={`px-3 py-3 text-center border-l border-border/40 ${plan.key === currentPlan ? `bg-primary/5 ${plan.color}` : ''}`}>
            <p className={`text-xs font-bold ${plan.color}`}>{plan.name}</p>
            <p className={`text-2xs font-semibold mt-0.5 ${plan.color}`}>{plan.price}</p>
          </div>
        ))}
      </div>

      {/* Feature rows */}
      {Object.keys(featureLabels).map((featureKey) => {
        const fl = featureLabels[featureKey]
        const values = plans.map(p => p.features[featureKey as keyof typeof plans[0]['features']])

        return (
          <div key={featureKey} className="grid grid-cols-3 border-b border-border/30 last:border-0">
            <div className="px-3 py-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="text-foreground/40">{fl.icon}</span>
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

      {/* Action row — only for owners not on Family */}
      {isOwner && currentPlan !== 'family' && (
        <div className="grid grid-cols-3 border-t border-border/40">
          <div className="px-3 py-3" />
          {plans.map((plan, i) => {
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
                  onClick={() => onUpgrade?.(plan.key as 'pro' | 'family')}
                  disabled={loading}
                  className={`text-2xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
                    plan.key === 'family'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:shadow-sm'
                      : 'bg-indigo-600 text-white hover:shadow-sm'
                  }`}
                >
                  {plan.key === 'pro' ? 'Upgrade' : 'Upgrade'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
