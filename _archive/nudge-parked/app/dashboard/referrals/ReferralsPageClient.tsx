'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Gift, Copy, CheckCircle, Share2, Users, TrendingUp,
  ExternalLink, Award, Crown, Share, Star, Zap, Sparkles, ChevronRight,
  MessageSquare, Target, Clock, BarChart3, Facebook
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'

// ── Types ──────────────────────────────────────────────────────────

interface ReferralStatus {
  referralCode: string | null
  totalSignups: number
  shareUrl: string | null
  activeRedemptions: number
  grantedRewards: number
  totalRedemptions: number
  achievements: any[]
}

// ── Reward tiers ───────────────────────────────────────────────────

const REWARD_TIERS = [
  { signups: 1, reward: '1 free month', icon: '🥇', color: 'from-amber-400 to-amber-500' },
  { signups: 3, reward: '3 free months', icon: '🥈', color: 'from-slate-300 to-slate-400' },
  { signups: 5, reward: '6 free months + early access', icon: '🥉', color: 'from-purple-400 to-purple-500' },
  { signups: 10, reward: '1 free year + VIP badge', icon: '🏆', color: 'from-yellow-400 to-orange-500' },
]

// ── Component ──────────────────────────────────────────────────────

interface ReferralsPageClientProps {
  userId: string
  userName: string
}

export default function ReferralsPageClient({ userId, userName }: ReferralsPageClientProps) {
  const [status, setStatus] = useState<ReferralStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/referral/stats')
      if (res.ok) {
        const data = await res.json()
        setStatus(data)
      }
    } catch {
      // Silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/referral/generate', { method: 'POST' })
      if (res.ok) {
        await fetchStatus()
      }
    } catch {
      // Silent
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (!status?.shareUrl) return
    try {
      await navigator.clipboard.writeText(status.shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = status.shareUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = (platform: string) => {
    if (!status?.shareUrl) return

    const text = `🎉 I'm using Nudge to keep my family organized! It's free to start and I'll give you a free month of Pro. Join me: ${status.shareUrl}`
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(status.shareUrl)

    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent('Join me on Nudge — family task manager! 🎯')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    }

    const url = urls[platform]
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  const handleNativeShare = async () => {
    if (!status?.shareUrl) return
    const text = `🎉 I'm using Nudge to keep my family organized! It's free to start and I'll give you a free month of Pro. Join me: ${status.shareUrl}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Join me on Nudge', text, url: status.shareUrl })
        return
      } catch {}
    }

    // Fallback: copy to clipboard
    handleCopy()
  }

  // Compute next reward tier
  const currentSignups = status?.totalSignups || 0
  const nextTier = REWARD_TIERS.find(t => currentSignups < t.signups)
  const progressToNext = nextTier
    ? (currentSignups / nextTier.signups) * 100
    : 100
  const currentTierIndex = REWARD_TIERS.findIndex(t => currentSignups < t.signups)
  const achievedTiers = currentTierIndex === -1 ? REWARD_TIERS.length : currentTierIndex

  const rewardMessage = status?.grantedRewards && status.grantedRewards > 0
    ? `You've earned ${status.grantedRewards} free ${status.grantedRewards === 1 ? 'month' : 'months'}!`
    : status?.activeRedemptions && status.activeRedemptions > 0
      ? `You have ${status.activeRedemptions} referral${status.activeRedemptions > 1 ? 's' : ''} pending reward.`
      : status?.totalSignups && status.totalSignups > 0
        ? `Keep sharing to unlock your next reward!`
        : `Share with friends — each referral = 1 free month of Pro`

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 animate-pulse">
          <div className="h-6 bg-secondary rounded w-1/3" />
          <div className="h-40 bg-secondary rounded-2xl" />
          <div className="h-24 bg-secondary rounded-2xl" />
          <div className="h-48 bg-secondary rounded-2xl" />
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/settings" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Referral Program</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-600/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Gift className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Share Nudge, earn free Pro</h2>
              <p className="text-sm text-indigo-200 leading-relaxed">
                Every friend who signs up with your link gives you <strong>1 free month of Pro</strong>.
                No limits. Share with family, friends, and your community.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold">{status?.totalSignups || 0}</p>
              <p className="text-[11px] text-indigo-200">Signups</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-emerald-300">{status?.grantedRewards || 0}</p>
              <p className="text-[11px] text-indigo-200">Free Months</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-amber-300">{status?.activeRedemptions || 0}</p>
              <p className="text-[11px] text-indigo-200">Pending</p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-500" />
            Your Referral Link
          </h3>

          {status?.shareUrl ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-3 border border-border/40">
                <code className="text-sm text-foreground flex-1 truncate">{status.shareUrl}</code>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors shrink-0"
                  title="Copy link"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Share buttons */}
              <p className="text-xs text-muted-foreground font-medium">Share via:</p>
              <div className="flex gap-2">
                <button
                  onClick={handleNativeShare}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm rounded-xl py-2.5 font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Share className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={() => handleShare('telegram')}
                  className="p-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all"
                  title="Share on Telegram"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {generating ? (
                <>Generating...</>
              ) : (
                <><Gift className="w-4 h-4" /> Generate My Referral Link</>
              )}
            </button>
          )}
        </div>

        {/* Reward Progress */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            Reward Progress
          </h3>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">
                {currentSignups} referral{currentSignups !== 1 ? 's' : ''} completed
              </span>
              {nextTier ? (
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {nextTier.signups - currentSignups} more to go
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Max tier reached! 🎉
                </span>
              )}
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
          </div>

          {/* Reward tiers list */}
          <div className="space-y-2">
            {REWARD_TIERS.map((tier, index) => {
              const achieved = currentSignups >= tier.signups
              const isNext = !achieved && (!nextTier || tier.signups === nextTier.signups)
              return (
                <div
                  key={tier.signups}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    achieved
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                      : isNext
                        ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                        : 'bg-secondary/30 border border-transparent'
                  }`}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0
                    ${achieved ? 'bg-emerald-200 dark:bg-emerald-800' : isNext ? 'bg-amber-200 dark:bg-amber-800' : 'bg-muted'}
                  `}>
                    {achieved ? <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-300" /> : <span>{tier.icon}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{tier.signups} referrals</span>
                      {achieved && (
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      )}
                      {isNext && (
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded-full">
                          Next
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{tier.reward}</p>
                  </div>
                  <div className={`
                    w-24 h-1.5 rounded-full bg-secondary overflow-hidden hidden sm:block
                  `}>
                    <div
                      className={`h-full rounded-full transition-all ${achieved ? 'bg-emerald-500' : isNext ? 'bg-amber-500' : 'bg-muted'}`}
                      style={{ width: achieved ? '100%' : isNext ? `${(currentSignups / tier.signups) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats card */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Your Impact
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{status?.totalSignups || 0}</div>
              <div className="text-xs text-muted-foreground">People Referred</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ${(status?.grantedRewards || 0) * 5}
              </div>
              <div className="text-xs text-muted-foreground">Value Earned</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{status?.activeRedemptions || 0}</div>
              <div className="text-xs text-muted-foreground">Pending Rewards</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{status?.totalRedemptions || 0}</div>
              <div className="text-xs text-muted-foreground">Total Redemptions</div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <details className="group glass-card rounded-2xl overflow-hidden">
          <summary className="px-5 py-4 font-semibold text-foreground cursor-pointer flex items-center justify-between list-none hover:bg-secondary/30 transition-all">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              How it works
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform" />
          </summary>
          <div className="px-5 pb-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">1</div>
              <p className="text-sm text-muted-foreground">Share your unique referral link with friends & family</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">2</div>
              <p className="text-sm text-muted-foreground">When they sign up, both of you get rewards</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">3</div>
              <p className="text-sm text-muted-foreground">Each successful signup = 1 free month of Pro added to your account</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">4</div>
              <p className="text-sm text-muted-foreground">Rewards stack — refer 3 friends for 3 free months, 5 for 6 months</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">5</div>
              <p className="text-sm text-muted-foreground">Track your referrals and earned rewards right here</p>
            </div>
          </div>
        </details>
      </div>

      <BottomNav />
    </div>
  )
}
