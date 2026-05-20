'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Crown, User, CreditCard, Bell, Shield,
  LogOut, ChevronRight, CheckCircle, XCircle, Loader2,
  ExternalLink, MessageSquare, Sparkles, Zap, Info,
  Smartphone, FileText, Eye, ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { supabase as supabaseFn } from '@/lib/supabase'
import SubscriptionCard from '@/components/billing/SubscriptionCard'
import InvoiceHistory from '@/components/billing/InvoiceHistory'
import PWAPrompt from '@/components/billing/PWAPrompt'
import PlanComparison from '@/components/billing/PlanComparison'
import ReferralProgram from '@/components/billing/ReferralProgram'
import InlineSetupGuide from '@/components/telegram/InlineSetupGuide'
import NotificationPreferences from '@/components/notifications/NotificationPreferences'
import BottomNav from '@/components/layout/BottomNav'


interface UserInfo {
  id: string
  email: string
  fullName: string | null
  telegramUsername: string | null
  telegramConnected: boolean
}

interface FamilyMembership {
  familyId: string
  role: string
}

interface SettingsPageClientProps {
  user: UserInfo
  familyMembership: FamilyMembership | null
}


export default function SettingsPageClient({ user, familyMembership }: SettingsPageClientProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(user.fullName || '')
  const [telegramUsername, setTelegramUsername] = useState(user.telegramUsername || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Expandable sections
  const [showNotifications, setShowNotifications] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)
  const [showPlanCompare, setShowPlanCompare] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | 'family'>('free')
  const [loadingPlan, setLoadingPlan] = useState(true)

  // Fetch subscription status
  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch('/api/stripe/status')
        if (res.ok) {
          const data = await res.json()
          if (data.plan === 'pro' || data.plan === 'family') {
            setCurrentPlan(data.plan)
          }
        }
      } catch {
        // Use default
      } finally {
        setLoadingPlan(false)
      }
    }
    fetchPlan()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const { error: updateError } = await supabaseFn()
        .from('users')
        .update({
          full_name: fullName,
          telegram_username: telegramUsername,
        })
        .eq('id', user.id)

      if (updateError) throw updateError
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await supabaseFn().auth.signOut()
    router.push('/')
  }

  const initial = (user.fullName || user.email).charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* PWA Install Prompt */}
      <PWAPrompt />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <span className="text-white font-bold text-lg">{initial}</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{user.fullName || 'Your Account'}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Telegram Username
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="input-field pl-10"
                  placeholder="@username"
                />
              </div>
              {user.telegramConnected && (
                <p className="text-xs text-emerald-500 mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Telegram connected
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-sm px-6">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saved && (
                <span className="text-sm text-emerald-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Subscription Section */}
        {familyMembership && (
          <section className="animate-fade-in">
            {/* Section header with expand toggle */}
            <button
              onClick={() => setShowBilling(!showBilling)}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-foreground">Subscription</h2>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showBilling ? 'rotate-180' : ''}`} />
            </button>

            {showBilling && (
              <div className="space-y-4">
                <SubscriptionCard familyId={familyMembership.familyId} isOwner={familyMembership.role === 'owner'} />

                {/* Plan comparison inside subscription */}
                <button
                  onClick={() => setShowPlanCompare(!showPlanCompare)}
                  className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Eye className="w-3 h-3" />
                  {showPlanCompare ? 'Hide' : 'View'} full plan comparison
                </button>

                {showPlanCompare && (
                  <PlanComparison
                    currentPlan={currentPlan}
                    isOwner={familyMembership.role === 'owner'}
                    loading={loadingPlan}
                  />
                )}

                {/* Payment History */}
                <button
                  onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                  className="w-full flex items-center justify-between px-4 py-3 glass-card rounded-xl hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Payment History</p>
                      <p className="text-xs text-muted-foreground">View past invoices</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showPaymentHistory ? 'rotate-90' : ''}`} />
                </button>

                {showPaymentHistory && (
                  <div className="animate-fade-in">
                    <InvoiceHistory />
                  </div>
                )}
              </div>
            )}

            {/* Show minimal subscription card when collapsed */}
            {!showBilling && (
              <div
                onClick={() => setShowBilling(true)}
                className="glass-card rounded-2xl p-4 cursor-pointer hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Manage Subscription</p>
                      <p className="text-xs text-muted-foreground">Plan, billing, invoices</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Notification Preferences — Phase 19: Per-event-type, per-channel toggles */}
        <section className="animate-fade-in">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-bold text-foreground">Notifications</h2>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showNotifications ? 'rotate-180' : ''}`} />
          </button>

          {showNotifications && (
            <div className="animate-fade-in">
              <NotificationPreferences userId={user.id} />
            </div>
          )}

          {!showNotifications && (
            <div
              onClick={() => setShowNotifications(true)}
              className="glass-card rounded-2xl p-4 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Notification Preferences</p>
                    <p className="text-xs text-muted-foreground">Per-event-type settings</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          )}
        </section>

        {/* Referral Program */}
        <section className="animate-fade-in">
          <ReferralProgram />
        </section>

        {/* Telegram Inline Mode Setup */}
        <section className="animate-fade-in">
          <InlineSetupGuide />
        </section>

        {/* App Section */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">App</h2>
          </div>

          <div className="glass-card divide-y divide-border/40 rounded-2xl overflow-hidden">
            <Link
              href="/family"
              className="flex items-center justify-between px-4 py-3.5 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Family Members</p>
                  <p className="text-xs text-muted-foreground">Invite & manage family</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  )
}
