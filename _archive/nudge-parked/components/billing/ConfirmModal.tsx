'use client'

import { useEffect, useRef, useState } from 'react'
import { X, AlertTriangle, Loader2, Crown, ArrowLeftRight, RefreshCcw } from 'lucide-react'

type ModalVariant = 'cancel' | 'downgrade' | 'upgrade' | 'info'

interface ConfirmModalProps {
  open: boolean
  variant: ModalVariant
  plan?: string
  loading?: boolean
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

const variants: Record<ModalVariant, {
  icon: any
  iconBg: string
  iconColor: string
  title: string
  defaultDescription: string
  defaultConfirmLabel: string
  confirmClass: string
}> = {
  cancel: {
    icon: AlertTriangle,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-500',
    title: 'Cancel Subscription',
    defaultDescription: 'Are you sure? You\'ll lose access to premium features at the end of your billing period. Your family\'s task history will be preserved, but you\'ll be limited to the Free plan.',
    defaultConfirmLabel: 'Confirm Cancellation',
    confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
  },
  downgrade: {
    icon: ArrowLeftRight,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-500',
    title: 'Change Plan',
    defaultDescription: 'Switching to a lower plan will reduce features available to your family. Changes take effect immediately for new features, but billing credits are handled by Stripe.',
    defaultConfirmLabel: 'Switch Plan',
    confirmClass: 'btn-amber',
  },
  upgrade: {
    icon: Crown,
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-500',
    title: 'Upgrade Plan',
    defaultDescription: 'Ready to unlock more features for your family? You\'ll be taken to Stripe to complete payment.',
    defaultConfirmLabel: 'Go to Checkout',
    confirmClass: 'btn-primary',
  },
  info: {
    icon: RefreshCcw,
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-500',
    title: 'Change Billing Interval',
    defaultDescription: 'Switching between monthly and annual billing.',
    defaultConfirmLabel: 'Switch Interval',
    confirmClass: 'btn-primary',
  },
}

export default function ConfirmModal({ open, variant, plan, loading, description, confirmLabel, onConfirm, onCancel, onClose }: ConfirmModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      const timer = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!visible && !open) return null

  const v = variants[variant]
  const Icon = v.icon

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 transition-all duration-200 ${
        open ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
      }`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        className={`w-full max-w-sm bg-background border border-border/60 rounded-2xl p-6 shadow-elevated transition-all duration-200 ${
          open ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl ${v.iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${v.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2">
          {v.title}
          {plan && ` — ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {description || v.defaultDescription}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel || onClose}
            disabled={loading}
            className="flex-1 btn-secondary text-sm"
          >
            Keep Plan
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-sm font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2 ${v.confirmClass}`}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
            ) : (
              confirmLabel || v.defaultConfirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
