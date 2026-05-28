'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Gift, X, TrendingUp, Crown, ArrowRight } from 'lucide-react'

interface ReferralBannerProps {
  userId: string
  dismissible?: boolean
}

export default function ReferralBanner({ userId, dismissible = true }: ReferralBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [pendingRewards, setPendingRewards] = useState(0)
  const [totalSignups, setTotalSignups] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hasReferralCode, setHasReferralCode] = useState(false)

  const fetchReferralStatus = useCallback(async () => {
    if (!userId) return
    try {
      const res = await fetch('/api/referral/stats')
      if (res.ok) {
        const data = await res.json()
        setPendingRewards(data.activeRedemptions || 0)
        setTotalSignups(data.totalSignups || 0)
        setHasReferralCode(!!data.referralCode)
      }
    } catch {
      // Silent
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchReferralStatus()
  }, [fetchReferralStatus])

  // Check local storage for dismiss
  useEffect(() => {
    if (!dismissible) return
    try {
      const stored = localStorage.getItem('nudge_referral_banner_dismissed')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Re-show after 7 days
        if (Date.now() - parsed < 7 * 24 * 60 * 60 * 1000) {
          setDismissed(true)
        }
      }
    } catch {}
  }, [dismissible])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem('nudge_referral_banner_dismissed', JSON.stringify(Date.now()))
    } catch {}
  }

  // Don't show if dismissed, loading, or user already has referred people
  if (dismissed || loading || totalSignups > 0) return null

  // Don't show if user has no referral code yet (they haven't generated one)
  if (!hasReferralCode && !loading) return null

  // Don't show if there are no pending rewards
  if (pendingRewards === 0 && !loading) {
    // Still show the "start referring" banner if user has a code but no referrals yet
    if (!hasReferralCode) return null

    return (
      <div className="relative mx-4 mb-3">
        <div className="bg-gradient-to-r from-amber-400 via-amber-400 to-rose-400 rounded-2xl p-4 shadow-lg shadow-amber-400/20 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-amber-950 mb-1">Refer & earn free months</h3>
              <p className="text-xs text-amber-900/70 leading-relaxed">
                Share Nudge with friends — each signup gives you 1 free month of Pro. No limits.
              </p>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-950 bg-white/40 px-3 py-1.5 rounded-lg hover:bg-white/60 transition-all"
              >
                <Gift className="w-3 h-3" /> Share now
              </Link>
            </div>
            {dismissible && (
              <button
                onClick={(e) => { e.stopPropagation(); handleDismiss() }}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-amber-900/60" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show rewards pending banner
  return (
    <div className="relative mx-4 mb-3">
      <div className="bg-gradient-to-r from-emerald-400 via-emerald-400 to-teal-400 rounded-2xl p-4 shadow-lg shadow-emerald-400/20 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center shrink-0 mt-0.5">
            <Crown className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-emerald-950 mb-1">
              🎉 Referral rewards pending!
            </h3>
            <p className="text-xs text-emerald-900/70 leading-relaxed">
              You have <strong>{pendingRewards} free {pendingRewards === 1 ? 'month' : 'months'}</strong> coming your way.
              Track your rewards in Settings.
            </p>
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-950 bg-white/40 px-3 py-1.5 rounded-lg hover:bg-white/60 transition-all"
            >
              View rewards <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {dismissible && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDismiss() }}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-emerald-900/60" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
