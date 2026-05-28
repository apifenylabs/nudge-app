'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  FileText, ExternalLink, Download, CheckCircle, XCircle,
  Clock, AlertCircle, Loader2, CreditCard
} from 'lucide-react'
import Link from 'next/link'

interface Invoice {
  id: string
  number: string
  status: string
  amountPaid: number
  amountDue: number
  currency: string
  created: string
  paidAt: string | null
  periodStart: string
  periodEnd: string
  hostedInvoiceUrl: string
  invoicePdf: string
  lines: Array<{
    description: string
    amount: number
    period: { start: string; end: string }
  }>
}

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/stripe/invoices')
      if (!res.ok) throw new Error('Failed to load invoices')
      const data = await res.json()
      setInvoices(data.invoices || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const formatAmount = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(cents / 100)
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Payment History
        </h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3 glass-card rounded-xl animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-2.5 bg-muted rounded w-1/4" />
            </div>
            <div className="h-4 bg-muted rounded w-16" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground mb-2">{error}</p>
        <button onClick={fetchInvoices} className="text-xs text-primary hover:underline">
          Retry
        </button>
      </div>
    )
  }

  if (invoices.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Payment History
      </h3>
      <div className="glass-card rounded-2xl divide-y divide-border/40 overflow-hidden">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/30 transition-colors">
            {/* Status icon */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              inv.status === 'paid'
                ? 'bg-emerald-100 dark:bg-emerald-900/20'
                : inv.status === 'open'
                  ? 'bg-amber-100 dark:bg-amber-900/20'
                  : 'bg-red-100 dark:bg-red-900/20'
            }`}>
              {inv.status === 'paid' ? (
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              ) : inv.status === 'open' ? (
                <Clock className="w-4 h-4 text-amber-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate">
                  Invoice #{inv.number || inv.id.slice(0, 8)}
                </span>
                {inv.status === 'paid' && (
                  <span className="text-2xs px-1.5 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    Paid
                  </span>
                )}
                {inv.status === 'open' && (
                  <span className="text-2xs px-1.5 py-0.5 rounded-full font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    Pending
                  </span>
                )}
                {inv.status === 'past_due' && (
                  <span className="text-2xs px-1.5 py-0.5 rounded-full font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    Past Due
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDate(inv.created)} &middot; {formatDate(inv.periodStart)} &ndash; {formatDate(inv.periodEnd)}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-foreground">
                {formatAmount(inv.amountPaid || inv.amountDue, inv.currency)}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {inv.hostedInvoiceUrl && (
                  <a
                    href={inv.hostedInvoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="View invoice"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {inv.invoicePdf && (
                  <a
                    href={inv.invoicePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
