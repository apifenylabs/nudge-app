'use client'

import { useState, useEffect } from 'react'
import { Settings, Crown } from 'lucide-react'
import Link from 'next/link'
import InAppNotifications from './InAppNotifications'

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
  const initial = displayName.charAt(0).toUpperCase()

  return (
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
  )
}
