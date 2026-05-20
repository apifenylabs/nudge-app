'use client'

import { useEffect, useState, useCallback } from 'react'
import { Sparkles, AlertTriangle, X, Loader2, ArrowUp } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionBannerProps {
  userId: string
}

type BannerVariant = 'trial' | 'limit-warning' | 'upgrade' | 'hidden'

export default function SubscriptionBanner({ userId }: SubscriptionBannerProps) {
  const [variant, setVariant] = useState<BannerVariant>('hidden')
  const [plan, setPlan] = useState<string>('')
  const [dismissed, setDismissed] = useState(false)
  const [trialDays, setTrialDays] = useState<number | null>(null)
  const [tasksToday, setTasksToday] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    try {
      const [statusRes, usageRes] = await Promise.all([
        fetch('/api/stripe/status'),
        fetch('/api/stripe/task-usage'),
      ])
      if (!statusRes.ok) return
      const data = await statusRes.json()
      const usage = usageRes.ok ? await usageRes.json() : null

      setPlan(data.plan)

      if (usage) {
        setTasksToday(usage.tasksToday)
      }

      // Determine which banner to show
      if (data.plan === 'free') {
        if (data.trialDaysRemaining !== null && data.trialDaysRemaining > 0) {
          setTrialDays(data.trialDaysRemaining)
          setVariant('trial')
        } else if (usage && usage.remaining !== -1 && usage.remaining <= 2 && usage.tasksToday > 0) {
          // Close to limit — show warning
          setVariant('limit-warning')
        } else {
          setVariant('upgrade')
        }
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  if (loading || variant === 'hidden' || dismissed) return null

  const banners: Record<BannerVariant, { bg: string; icon: React.ReactNode; text: React.ReactNode } | null> = {
    trial: {
      bg: 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border-indigo-200 dark:border-indigo-800',
      icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
      text: (
        <span>
          <span className="font-semibold">Free trial:</span> {trialDays} {trialDays === 1 ? 'day' : 'days'} remaining.
          Upgrade to keep your tasks after the trial.
        </span>
      ),
    },
    'limit-warning': {
      bg: 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-200 dark:border-amber-800',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      text: (
        <span>
          <span className="font-semibold">Free plan:</span> {tasksToday} of 5 tasks used today.
          <Link href="/pricing" className="ml-1 underline font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
            Upgrade for unlimited.
          </Link>
        </span>
      ),
    },
    upgrade: {
      bg: 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border-indigo-200 dark:border-indigo-800',
      icon: <ArrowUp className="w-4 h-4 text-indigo-500" />,
      text: (
        <span>
          You&apos;re on the <span className="font-semibold">Free plan</span>.
          <Link href="/pricing" className="ml-1 underline font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
            Upgrade to Pro for unlimited tasks &amp; more features.
          </Link>
        </span>
      ),
    },
    hidden: null,
  }

  const banner = banners[variant]
  if (!banner) return null

  return (
    <div className={`mx-4 mt-2 px-4 py-2.5 rounded-xl border ${banner.bg} flex items-center gap-2.5 animate-slide-up`}>
      {banner.icon}
      <p className="text-xs text-foreground flex-1">{banner.text}</p>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
