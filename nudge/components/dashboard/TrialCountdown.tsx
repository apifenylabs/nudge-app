'use client'

import { useEffect, useState } from 'react'
import { Clock, Flame, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TrialCountdownProps {
  userId: string
}

export default function TrialCountdown({ userId }: TrialCountdownProps) {
  const [trialInfo, setTrialInfo] = useState<{
    daysRemaining: number | null
    plan: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchTrial = async () => {
      try {
        const res = await fetch('/api/stripe/status')
        if (!res.ok) {
          setLoading(false)
          return
        }
        const data = await res.json()

        // Only show for trialing users with less than 7 days remaining
        if (
          data.status === 'trialing' &&
          data.trialDaysRemaining !== null &&
          data.trialDaysRemaining > 0 &&
          data.trialDaysRemaining <= 7 &&
          data.plan !== 'free'
        ) {
          setTrialInfo({
            daysRemaining: data.trialDaysRemaining,
            plan: data.plan,
          })
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchTrial()
    // Refresh every 5 minutes
    const interval = setInterval(fetchTrial, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [userId])

  if (loading || !trialInfo) return null

  const planName = trialInfo.plan === 'family' ? 'Family' : 'Pro'
  const daysRemaining = trialInfo.daysRemaining ?? 7
  const isUrgent = daysRemaining <= 2

  return (
    <Link
      href="/dashboard/settings"
      className={`block mx-4 mb-1 rounded-xl border p-3 transition-all hover:shadow-md ${
        isUrgent
          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
          : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isUrgent
              ? 'bg-red-100 dark:bg-red-900/30'
              : 'bg-amber-100 dark:bg-amber-900/30'
          }`}>
            {isUrgent ? (
              <Flame className="w-4 h-4 text-red-600 dark:text-red-400" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <div>
            <p className={`text-xs font-semibold ${
              isUrgent ? 'text-red-800 dark:text-red-300' : 'text-amber-800 dark:text-amber-300'
            }`}>
              {planName} trial ends in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {isUrgent
                ? 'Upgrade now to keep unlimited access'
                : 'Secure your plan before it expires'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Crown className="w-3 h-3" />
          Upgrade
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  )
}
