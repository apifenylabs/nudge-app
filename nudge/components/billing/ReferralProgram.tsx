'use client'

import { useState, useEffect, useCallback } from 'react'
import { Gift, Copy, CheckCircle, Share2, Users, TrendingUp, ExternalLink, Award, Share } from 'lucide-react'

interface ReferralStatus {
  referralCode: string | null
  totalSignups: number
  shareUrl: string | null
  activeRedemptions: number
  grantedRewards: number
  totalRedemptions: number
  achievements: any[]
}

export default function ReferralProgram() {
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
      // Fallback
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

  const handleShare = async () => {
    if (!status?.shareUrl) return
    const text = `🎉 I'm using Nudge to keep my family organized! It's free to start and I'll give you a month of Pro for free. Join me: ${status.shareUrl}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Join me on Nudge', text, url: status.shareUrl })
        return
      } catch {}
    }

    // Fallback: WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-secondary rounded w-1/3" />
        <div className="h-20 bg-secondary rounded-2xl" />
        <div className="h-12 bg-secondary rounded-2xl" />
      </div>
    )
  }

  const rewardMessage = status && status.totalSignups >= 3
    ? `You've earned ${status.grantedRewards} free ${status.grantedRewards === 1 ? 'month' : 'months'}!`
    : status && status.totalSignups >= 1
      ? `You've earned 1 free month! Keep sharing for more.`
      : `Share with friends — each referral = 1 free month of Pro`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-md">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Referral Program</h3>
          <p className="text-sm text-muted-foreground">Share Nudge and earn free months</p>
        </div>
      </div>

      {/* Rewards card */}
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-950/20 dark:to-rose-950/20 border border-amber-200/60 dark:border-amber-800/30 rounded-2xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground mb-1">Your Rewards</p>
            <p className="text-sm text-muted-foreground">{rewardMessage}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{status?.totalSignups || 0}</p>
            <p className="text-xs text-muted-foreground">Signups</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{status?.grantedRewards || 0}</p>
            <p className="text-xs text-muted-foreground">Free Months</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{status?.activeRedemptions || 0}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>🎯 1 referral = 1 free month</p>
          <p>🎯 3 referrals = 3 free months</p>
          <p>🎯 5 referrals = 6 free months + early access</p>
        </div>
      </div>

      {/* Referral link section */}
      <div className="bg-white dark:bg-gray-900 border border-border/60 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Your Referral Link</span>
          </div>
          <span className="text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Share & earn
          </span>
        </div>

        {status?.shareUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-3 border border-border/40">
              <code className="text-sm text-foreground flex-1 truncate">{status.shareUrl}</code>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Copy link"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm rounded-xl py-3 font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share Link
              </button>
              <button
                onClick={() => {
                  const text = `🎉 I'm using Nudge! It's free to start and I'll give you a free month of Pro. Join me: ${status.shareUrl}`
                  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(status.shareUrl!)}&text=${encodeURIComponent(text)}`
                  window.open(telegramUrl, '_blank')
                }}
                className="px-4 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all flex items-center justify-center"
                title="Share on Telegram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.037.358.026.557-.11 1.175-.588 4.028-.83 5.342-.103.56-.306.748-.502.768-.43.044-.757-.284-1.175-.557-.561-.366-.878-.595-1.423-.956-.593-.394-.208-.61.13-.965.09-.094.448-.41.877-.767.533-.445.763-.592.83-.748.013-.03.025-.062.004-.088-.02-.026-.079-.019-.112-.011-.066.015-.226.145-1.053.696-.645.413-1.174.607-1.348.644-.267.057-.512.04-.751-.024-.453-.122-.91-.248-1.404-.404-.327-.103-.58-.164-.564-.33.008-.09.133-.186.362-.28.73-.33 1.94-.72 3.158-1.046.53-.143 1.09-.267 1.598-.373z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const text = `🎉 I'm using Nudge to keep my family organized! It's free to start and you get a free month of Pro. Join me: ${status.shareUrl}`
                  const encoded = encodeURIComponent(text)
                  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank')
                }}
                className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center"
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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

      {/* How it works */}
      <details className="group bg-white dark:bg-gray-900 border border-border/60 rounded-2xl overflow-hidden">
        <summary className="px-5 py-4 font-semibold text-foreground cursor-pointer flex items-center justify-between list-none hover:bg-secondary/30 transition-colors">
          How referrals work
          <ExternalLink className="w-4 h-4 text-muted-foreground group-open:rotate-45 transition-transform" />
        </summary>
        <div className="px-5 pb-5 text-sm text-muted-foreground space-y-2">
          <p>1. Share your unique referral link with friends & family</p>
          <p>2. When they sign up, both of you get rewards</p>
          <p>3. Each successful signup = 1 free month of Pro added to your account</p>
          <p>4. Rewards stack — refer 3 friends for 3 free months</p>
          <p>5. Track your referrals and rewards in this panel</p>
        </div>
      </details>
    </div>
  )
}
