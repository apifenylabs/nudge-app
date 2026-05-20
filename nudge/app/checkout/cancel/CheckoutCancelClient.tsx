'use client'

import { ArrowLeft, ArrowRight, Crown, MessageSquare, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface CheckoutCancelClientProps {
  isLoggedIn: boolean
}

export default function CheckoutCancelClient({ isLoggedIn }: CheckoutCancelClientProps) {
  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8 animate-fade-in">
          {/* Waiting icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-secondary flex items-center justify-center">
            <HelpCircle className="w-9 h-9 text-muted-foreground" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
            Checkout canceled
          </h1>
          <p className="text-base text-muted-foreground max-w-sm mx-auto">
            No worries — your account stays active on the Free plan. You can upgrade anytime you&apos;re ready.
          </p>
        </div>

        {/* Free plan reminder */}
        <div className="glass-card rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Free Plan includes</p>
              <p className="text-xs text-muted-foreground">Everything you need to start</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              '5 tasks per day',
              'Basic voice input',
              'Telegram reminders',
              'Single user access',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Questions / help */}
        <div className="glass-card rounded-2xl p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-1">Have questions?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Want more info before upgrading? We&apos;re happy to help. Check the FAQ on the pricing page or start your free trial to explore Pro features risk-free.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href={isLoggedIn ? '/dashboard' : '/'}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {isLoggedIn ? 'Back to Dashboard' : 'Back to Home'}
          </Link>

          <Link
            href="/pricing"
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Compare Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
