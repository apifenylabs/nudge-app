'use client'

import { useEffect, useState } from 'react'
import {
  CheckCircle, Crown, ArrowRight, MessageSquare, Users,
  Sparkles, Settings, ChevronRight, PartyPopper, Copy,
  Share2, Smartphone, ExternalLink, Loader2, Globe
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface CheckoutSuccessClientProps {
  plan: string
  familyId: string | null
  isOwner: boolean
  userName: string
}

const planDetails = {
  pro: {
    title: 'Welcome to Nudge Pro!',
    subtitle: 'Unlimited tasks, advanced voice AI, and up to 5 family members.',
    color: 'from-indigo-600 to-indigo-400',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
  },
  family: {
    title: 'Welcome to Nudge Family!',
    subtitle: 'Unlimited everything for your entire household.',
    color: 'from-amber-400 to-amber-500',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/30',
    badgeText: 'text-amber-700 dark:text-amber-300',
  },
}

const nextSteps = [
  {
    icon: Users,
    title: 'Invite your family',
    desc: 'Share your family invite link so everyone stays on the same page.',
    href: '/dashboard/family',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    icon: MessageSquare,
    title: 'Connect Telegram',
    desc: 'Get nudges on Telegram. Voice record tasks directly from the app.',
    href: '/dashboard/settings',
    color: 'text-sky-500',
    bgColor: 'bg-sky-100 dark:bg-sky-900/20',
  },
  {
    icon: Smartphone,
    title: 'Install the app',
    desc: 'Add Nudge to your home screen for one-tap access.',
    href: '#',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
]

export default function CheckoutSuccessClient({ plan, familyId, isOwner, userName }: CheckoutSuccessClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const details = planDetails[plan as keyof typeof planDetails] || planDetails.pro
  const [showConfetti, setShowConfetti] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyLink = async () => {
    if (!familyId) return
    const link = `${window.location.origin}/join/${familyId}`
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fade-in"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 10}%`,
                animation: `confettiFall ${1 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <div
                className={`w-${2 + Math.floor(Math.random() * 2)} h-${2 + Math.floor(Math.random() * 2)} rounded-sm ${
                  ['bg-indigo-500', 'bg-amber-400', 'bg-emerald-500', 'bg-sky-500', 'bg-pink-500', 'bg-purple-500'][
                    Math.floor(Math.random() * 6)
                  ]
                }`}
                style={{ width: 8 + Math.random() * 8, height: 8 + Math.random() * 8 }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-16 md:py-24">
        {/* Success header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${details.color} flex items-center justify-center shadow-xl ${
            plan === 'family' ? 'shadow-amber-400/30' : 'shadow-indigo-500/30'
          }`}>
            {plan === 'family' ? (
              <PartyPopper className="w-9 h-9 text-white" />
            ) : (
              <Crown className="w-9 h-9 text-white" />
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            {details.title}
          </h1>

          <p className="text-base text-muted-foreground mb-4 max-w-md mx-auto">
            {details.subtitle}
          </p>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${details.badgeBg} ${details.badgeText}`}>
            <CheckCircle className="w-4 h-4" />
            {plan === 'family' ? 'Family Plan Active' : 'Pro Plan Active'}
          </div>
        </div>

        {/* Celebration callout */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Hey {userName || 'there'}! </span>
            You&apos;re all set. Your 14-day free trial has started — no charges yet.
            Here&apos;s what to do next to get the most out of Nudge:
          </p>
        </div>

        {/* Next steps */}
        <div className="space-y-3 mb-8">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
            Get Started in 3 Steps
          </h2>

          {nextSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <Link
                key={step.title}
                href={step.href}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-card-hover transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${step.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-2xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 ml-7">{step.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
            )
          })}
        </div>

        {/* Invite shortcut (only if owner) */}
        {isOwner && familyId && (
          <div className="glass-card rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Share your family invite</h3>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted rounded-xl px-3 py-2.5 text-xs text-muted-foreground truncate border border-border/50">
                {typeof window !== 'undefined' ? `${window.location.origin}/join/${familyId}` : `/join/${familyId}`}
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary text-primary-foreground hover:brightness-110'
                }`}
              >
                {copied ? <><CheckCircle className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
          </div>
        )}

        {/* Go to dashboard CTA */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-3">
            You can always find these steps in your Settings.
          </p>
        </div>
      </div>

      {/* Confetti keyframes */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
