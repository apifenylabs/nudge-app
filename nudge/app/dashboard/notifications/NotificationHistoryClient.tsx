'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Sparkles,
  User,
  Calendar,
  X,
  Loader2,
  RefreshCw,
  Trash2,
  CheckCheck,
  Filter,
  Info,
  MessageSquare,
  Mail,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'

// ── Types ───────────────────────────────────────────────────────

interface AppNotification {
  id: string
  user_id: string
  type: 'assignment' | 'completion' | 'reminder' | 'system'
  title: string
  body: string
  task_id?: string
  read: boolean
  created_at: string
}

type FilterType = 'all' | 'unread' | 'assignment' | 'completion' | 'reminder' | 'system'

// ── Helpers ─────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, typeof Bell> = {
  assignment: User,
  completion: CheckCircle,
  reminder: Calendar,
  system: Sparkles,
}

const TYPE_COLORS: Record<string, string> = {
  assignment: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
  completion: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
  reminder: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  system: 'text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
}

const FILTER_LABELS: Record<FilterType, string> = {
  all: 'All',
  unread: 'Unread',
  assignment: 'Assignments',
  completion: 'Completions',
  reminder: 'Reminders',
  system: 'System',
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    } else if (days === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  } catch {
    return dateStr
  }
}

// ── Component ───────────────────────────────────────────────────

interface NotificationHistoryClientProps {
  userId: string
  initialNotifications: AppNotification[]
  totalCount: number
  initialUnreadCount?: number
}

export default function NotificationHistoryClient({
  userId,
  initialNotifications,
  totalCount,
  initialUnreadCount = 0,
}: NotificationHistoryClientProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications)
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialNotifications.length >= 50)
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)

  // ── Fetch notifications ────────────────────────────────────────
  const fetchNotifications = useCallback(async (offset = 0) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/notifications/list?userId=${userId}&limit=50&offset=${offset}`)
      const data = await res.json()
      if (data.notifications) {
        if (offset === 0) {
          setNotifications(data.notifications)
        } else {
          setNotifications(prev => [...prev, ...data.notifications])
        }
        setHasMore(data.notifications.length >= 50)
        
        // Recalculate unread count
        const unread = data.notifications.filter((n: AppNotification) => !n.read)
        if (offset === 0) {
          setUnreadCount(unread.length)
        } else {
          setUnreadCount(prev => prev + unread.filter((n: AppNotification) => !n.read).length)
        }
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // ── Mark single read ───────────────────────────────────────────
  const markRead = useCallback(async (notificationId: string) => {
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, notificationId }),
      })
      setNotifications(prev => prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      ))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch {}
  }, [userId])

  // ── Mark all read ──────────────────────────────────────────────
  const markAllRead = useCallback(async () => {
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch {}
  }, [userId])

  // ── Filtered list ──────────────────────────────────────────────
  const filtered = notifications.filter(n => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.type === filter
  })

  // ── Stats ──────────────────────────────────────────────────────
  const typeCounts = {
    assignment: notifications.filter(n => n.type === 'assignment').length,
    completion: notifications.filter(n => n.type === 'completion').length,
    reminder: notifications.filter(n => n.type === 'reminder').length,
    system: notifications.filter(n => n.type === 'system').length,
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-500" />
              Notifications
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={() => fetchNotifications(0)}
              disabled={loading}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Summary strip */}
      <div className="px-4 py-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{totalCount}</span>
            total
            {unreadCount > 0 && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-indigo-500 font-medium">{unreadCount}</span>
                <span>unread</span>
              </>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            {Object.entries(typeCounts).map(([type, count]) => {
              if (count === 0) return null
              const Icon = TYPE_ICONS[type] || Sparkles
              return (
                <button
                  key={type}
                  onClick={() => setFilter(filter === type ? 'all' : type as FilterType)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors ${
                    filter === type
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {count}
                </button>
              )
            })}
          </div>
        </div>

        {/* Filter chips — mobile scrollable */}
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'unread', 'assignment', 'completion', 'reminder', 'system'] as FilterType[]).map((f) => {
            const isActive = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Notification list */}
      <div className="divide-y divide-border/40">
        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No notifications here</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {filter === 'all'
                ? 'You\'ll see notifications when family members create or complete tasks.'
                : filter === 'unread'
                ? 'All caught up! Great job staying on top of things. 🎉'
                : `No ${FILTER_LABELS[filter].toLowerCase()} notifications yet.`}
            </p>
          </div>
        )}

        {filtered.map((notification) => {
          const Icon = TYPE_ICONS[notification.type] || Sparkles

          return (
            <div
              key={notification.id}
              className={`group relative flex items-start gap-3 px-4 py-4 transition-colors ${
                !notification.read
                  ? 'bg-indigo-50/40 dark:bg-indigo-900/8'
                  : 'hover:bg-secondary/30'
              }`}
            >
              {/* Unread indicator dot */}
              {!notification.read && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500" />
              )}

              {/* Icon */}
              <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${TYPE_COLORS[notification.type] || 'text-muted-foreground bg-secondary'}`}>
                <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm leading-snug ${
                    !notification.read
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  }`}>
                    {notification.title}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markRead(notification.id)}
                        className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        title="Mark as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                {notification.body && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.body}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground/50 mt-1.5">
                  {formatDate(notification.created_at)}
                </p>
              </div>
            </div>
          )
        })}

        {/* Load more */}
        {hasMore && (
          <div className="px-4 py-4 text-center">
            <button
              onClick={() => fetchNotifications(notifications.length)}
              disabled={loading}
              className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Loading...
                </span>
              ) : (
                'Load more notifications'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom padding for nav */}
      <div className="h-16 md:hidden" />
    </div>
  )
}
