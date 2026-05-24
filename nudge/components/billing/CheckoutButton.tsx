'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, Crown, Sparkles } from 'lucide-react'
import { getPriceId } from '@/lib/stripe/config'
import type { BillingInterval } from '@/lib/plans'

interface CheckoutButtonProps {
  plan: 'free' | 'pro' | 'family'
  interval?: BillingInterval
  label?: string
  className?: string
  children?: React.ReactNode
}

export default function CheckoutButton({ plan, interval = 'monthly', label, className, children }: CheckoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    if (plan === 'free') {
      router.push('/auth/signup')
      return
    }

    setLoading(true)
    setError('')

    try {
      const priceId = getPriceId(plan as 'pro' | 'family', interval)

      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, plan, interval }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/auth/signup?plan=${plan}&interval=${interval}`)
          return
        }
        throw new Error(data.error || 'Something went wrong')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message)
      router.push(`/auth/signup?plan=${plan}&interval=${interval}`)
    } finally {
      setLoading(false)
    }
  }

  const defaultLabel = plan === 'free' ? 'Get Started Free'
    : plan === 'pro'
      ? (interval === 'yearly' ? 'Start Pro Annual $50/yr' : 'Start Free Trial')
      : (interval === 'yearly' ? 'Start Family Annual $90/yr' : 'Start Free Trial')

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className || `w-full text-center text-sm rounded-xl font-semibold tracking-wide transition-all duration-200 py-3 px-6 flex items-center justify-center gap-2 ${
          plan === 'pro'
            ? 'bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-600/25 hover:brightness-110 active:scale-[0.97]'
            : plan === 'family'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:shadow-lg hover:shadow-amber-400/25 active:scale-[0.97]'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]'
        }`}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
          children || (
            <>
              {label || defaultLabel}
              {plan !== 'free' && <ArrowRight className="w-3.5 h-3.5" />}
            </>
          )
        )}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1.5 text-center">{error}</p>
      )}
    </div>
  )
}
