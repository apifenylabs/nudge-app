'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  CreditCard, Loader2, CheckCircle, AlertTriangle,
  ExternalLink, RefreshCw, Shield, Smartphone,
} from 'lucide-react'

interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expMonth: number
  expYear: number
  country: string | null
  isExpiringSoon: boolean
  billingDetails: {
    name: string | null
    email: string | null
  } | null
}

export default function PaymentMethodCard() {
  const [method, setMethod] = useState<PaymentMethod | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [setupLoading, setSetupLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const fetchMethod = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/stripe/payment-method')
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to fetch')
      }
      const data = await res.json()
      setMethod(data.method)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMethod()
  }, [fetchMethod])

  const handleUpdatePaymentMethod = async () => {
    setSetupLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create setup')

      if (data.clientSecret === 'seti_mock_client_secret_dev') {
        // Dev mode — simulate success
        setSuccessMsg('Payment method updated (dev mode simulation)')
        setMethod({
          id: 'pm_mock',
          brand: 'visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2028,
          country: 'US',
          isExpiringSoon: false,
          billingDetails: null,
        })
        setTimeout(() => setSuccessMsg(''), 4000)
        return
      }

      // Real mode — open Stripe Elements or redirect to portal
      // For simplicity, open the billing portal which handles this
      const portalRes = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const portalData = await portalRes.json()
      if (portalData.url) {
        window.location.href = portalData.url
      }
    } catch (err: any) {
      setError(err.message)
      setTimeout(() => setError(''), 4000)
    } finally {
      setSetupLoading(false)
    }
  }

  const brandLogo = (brand: string) => {
    const normalized = brand.toLowerCase()
    if (normalized === 'visa') return '💳'
    if (normalized === 'mastercard') return '💳'
    if (normalized === 'amex' || normalized === 'american express') return '🏦'
    if (normalized === 'discover') return '🔶'
    return '💳'
  }

  const brandColor = (brand: string) => {
    const normalized = brand.toLowerCase()
    if (normalized === 'visa') return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    if (normalized === 'mastercard') return 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    if (normalized === 'amex' || normalized === 'american express') return 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
    return 'bg-secondary text-muted-foreground'
  }

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-4 text-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Loading payment method...</p>
      </div>
    )
  }

  if (error && !method) {
    return (
      <div className="glass-card rounded-2xl p-4 text-center">
        <p className="text-xs text-muted-foreground mb-2">Could not load payment info</p>
        <button onClick={fetchMethod} className="btn-secondary text-xs">Retry</button>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {successMsg && (
        <div className="mx-4 mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-slide-up">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Payment Method
            </span>
          </div>
        </div>

        {!method ? (
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground mb-2">No payment method on file</p>
            <button
              onClick={handleUpdatePaymentMethod}
              disabled={setupLoading}
              className="btn-primary text-xs px-4 py-2"
            >
              {setupLoading ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Setting up...</>
              ) : (
                'Add Payment Method'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Card Display */}
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${brandColor(method.brand)}`}>
                {brandLogo(method.brand)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground capitalize">
                    {method.brand}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    &bull;&bull;&bull;&bull; {method.last4}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Expires {String(method.expMonth).padStart(2, '0')}/{method.expYear}
                  {method.country && <span> &middot; {method.country}</span>}
                </p>
              </div>
              {method.isExpiringSoon && (
                <div className="shrink-0">
                  <span className="text-2xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Expiring
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdatePaymentMethod}
                disabled={setupLoading}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                  bg-muted hover:bg-secondary text-foreground transition-all active:scale-[0.97]"
              >
                {setupLoading ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Updating...</>
                ) : (
                  <><RefreshCw className="w-3 h-3" /> Update Card</>
                )}
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground flex items-center gap-1 justify-center">
              <Shield className="w-3 h-3" />
              Payment info secured by Stripe. We never see your full card number.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
