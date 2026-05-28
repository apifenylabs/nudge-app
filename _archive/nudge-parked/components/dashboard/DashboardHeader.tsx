'use client'

import { useState, useEffect, useCallback } from 'react'
import { Settings, Crown, Mic, Sparkles, Bolt } from 'lucide-react'
import Link from 'next/link'
import InAppNotifications from './InAppNotifications'
import SyncStatus from './SyncStatus'
import { getPendingRecordingCount } from '@/lib/voice-indexeddb'
import WhatsNewModal from '@/components/changelog/WhatsNewModal'

interface DashboardHeaderProps {
  user: {
    email?: string | null
    fullName?: string | null
  }
  greeting: string
  taskCount: number
  pendingCount: number
  userId?: string
}

export default function DashboardHeader({ user, greeting, taskCount, pendingCount, userId }: DashboardHeaderProps) {
  const displayName = user.fullName || user.email?.split('@')[0] || 'there'
  const [plan, setPlan] = useState<string | null>(null)
  const [voicePending, setVoicePending] = useState(0)
  const [unseenChangelog, setUnseenChangelog] = useState(0)
  const [showWhatsNew, setShowWhatsNew] = useState(false)

  useEffect(() => {
    if (!userId) return
    fetch('/api/stripe/status')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && d.plan && d.plan !== 'free') {
          setPlan(d.plan)
        }
      })
      .catch(() => {})
  }, [userId])

  // Poll offline voice recording count
  useEffect(() => {
    const update = async () => {
      try {
        const count = await getPendingRecordingCount()
        setVoicePending(count)
      } catch { setVoicePending(0) }
    }
    update()
    const interval = setInterval(update, 8000)
    return () => clearInterval(interval)
  }, [])

  // Fetch unseen changelog count on mount
  useEffect(() => {
    if (!userId) return
    const fetchUnseen = async () => {
      try {
        const res = await fetch(`/api/changelog/list?userId=${userId}&limit=1`)
        if (res.ok) {
          const data = await res.json()
          setUnseenChangelog(data.totalUnseen || 0)
        }
      } catch {}
    }
    fetchUnseen()
  }, [userId])

  const handleUnseenChanged = useCallback((unseen: number) => {
    setUnseenChangelog(unseen)
  }, [])

  const initial = displayName.charAt(0).toUpperCase()

  return (
    <>
      <header className="pt-4 pb-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <span className="text-white font-bold text-sm">{initial}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{greeting},</p>
              <h1 className="text-lg font-bold text-foreground tracking-tight">{displayName}</h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sync status indicator (shows offline/pending state) */}
            {userId && (
              <div className="hidden sm:flex">
                <SyncStatus
                  familyId=""
                  userId={userId}
                  supabaseToken={async () => {
                    try {
                      const { supabase } = await import('@/lib/supabase')
                      const { data } = await supabase().auth.getSession()
                      return data.session?.access_token || null
                    } catch { return null }
                  }}
                />
              </div>
            )}

            {/* Voice pending badge */}
            {voicePending > 0 && (
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 animate-in fade-in">
                <Mic className="w-3 h-3" />
                <span className="text-2xs font-medium">{voicePending}</span>
              </div>
            )}

            {/* What's New button */}
            <button
              onClick={() => setShowWhatsNew(true)}
              className="relative w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 active:scale-90"
              title="What's new"
            >
              <Sparkles className="w-4.5 h-4.5" />
              {unseenChangelog > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-500 border-2 border-background rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white leading-none">
                    {unseenChangelog > 9 ? '9+' : unseenChangelog}
                  </span>
                </span>
              )}
            </button>

            {/* Notification bell */}
            {userId && <InAppNotifications userId={userId} />}

            {/* Plan badge */}
            {plan && (
              <Link
                href="/pricing"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                  plan === 'family'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                }`}
              >
                <Crown className="w-3 h-3" />
                {plan === 'family' ? 'Family' : 'Pro'}
              </Link>
            )}

            {/* Pending badge */}
            {pendingCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  {pendingCount} pending
                </span>
              </div>
            )}
            {/* Settings */}
            <Link
              href="/dashboard/settings"
              className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 active:scale-90"
            >
              <Settings className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>

        {/* Task count sub-header */}
        <p className="text-xs text-muted-foreground mt-1 ml-0">
          {taskCount > 0 ? `${taskCount} tasks on the board` : 'Start by adding your first task'}
        </p>
      </header>

      {/* What's New Modal */}
      <WhatsNewModal
        userId={userId}
        isOpen={showWhatsNew}
        onClose={() => setShowWhatsNew(false)}
        onUnseenChanged={handleUnseenChanged}
      />
    </>
  )
}
