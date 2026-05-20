'use client'

import { useEffect, useState } from 'react'
import { Gift, Users, ArrowRight, Star, CheckCircle, MessageSquare, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface ReferralInfo {
  valid: boolean
  code?: string
  referrerName?: string
  message?: string
}

export default function ReferPage({ params }: { params: { code: string } }) {
  const [info, setInfo] = useState<ReferralInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkCode() {
      try {
        const res = await fetch(`/api/referral/check?code=${params.code}`)
        const data = await res.json()
        setInfo(data)
      } catch {
        setInfo({ valid: false, message: 'Could not verify referral code' })
      } finally {
        setLoading(false)
      }
    }
    checkCode()
  }, [params.code])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying invite...</p>
        </div>
      </div>
    )
  }

  if (!info?.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Invite Not Found</h1>
          <p className="text-muted-foreground mb-8">{info?.message || 'This referral link doesn\'t seem to work.'}</p>
          <Link
            href="/"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-600/25 transition-all"
          >
            Go to Nudge <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const signupUrl = `/auth/signup?ref=${info.code}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-foreground">Nudge</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
            <Gift className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            {info.referrerName} invited you to Nudge!
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
            Join the AI-powered family task manager. Start with a free month on us.
          </p>

          {/* Benefits cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Mic, text: 'Voice task creation', color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30' },
              { icon: Users, text: 'Family sharing', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
              { icon: Star, text: 'Free month of Pro', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
            ].map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div key={i} className="bg-white dark:bg-gray-900 border border-border/60 rounded-2xl p-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${benefit.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{benefit.text}</p>
                </div>
              )
            })}
          </div>

          <Link
            href={signupUrl}
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-lg px-10 py-4 rounded-xl font-bold tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97] inline-flex items-center gap-2 shadow-xl shadow-indigo-600/15"
          >
            <Gift className="w-5 h-5" /> Accept Invite — Start Free
          </Link>

          <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-500" /> No credit card required
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-900/50 border border-border/40 rounded-3xl p-8 md:p-10">
            <h2 className="text-xl font-bold text-foreground text-center mb-8">Why families love Nudge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { quote: 'Nudge saved us from the "I told you" arguments. Best family app we\'ve tried.', author: 'Sarah & Mike', rating: 5 },
                { quote: 'My kids actually do chores now. It turned me from nagging mom to cool mom.', author: 'Jessica C.', rating: 5 },
              ].map((t, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 border border-border/40 rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs font-semibold text-foreground">{t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 px-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nudge. Free month applies to Pro plan for new users.
        </p>
      </footer>
    </div>
  )
}

// Icons
function Mic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}
