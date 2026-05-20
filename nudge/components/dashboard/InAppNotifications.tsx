'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, X, CheckCircle, Sparkles, User, Calendar, Loader2 } from 'lucide-react'

interface AppNotification {
  id: string
  type: 'assignment' | 'completion' | 'reminder' | 'system'
  title: string
  body: string
  task_id?: string
  read: boolean
  created_at: string
}

interface InAppNotificationsProps {
  userId: string
  pollingIntervalMs?: number
}

/**
 * In-app notification system.
 * Polls the server for unread notifications and displays them as a bell icon
 * with a dropdown panel. Notifications can be marked as read individually
 * or all at once.
 */
export default function InAppNotifications({
  userId,
  pollingIntervalMs = 30000,
}: InAppNotificationsProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const fetchNotifications = useCallback(async () => {
    if (!userId) return
    try {
      const res = await fetch(`/api/notifications/list?userId=${userId}&limit=10`)
      if (!res.ok) return
      const data = await res.json()
      if (data.notifications) {
        // Only keep unread + recent read notifications for display
        const unread = data.notifications.filter((n: AppNotification) => !n.read)
        const recentRead = data.notifications.filter((n: AppNotification) => n.read).slice(0, 3)
        setNotifications([...unread, ...recentRead])
        setUnreadCount(unread.length)
      }
    } catch (err) {
      // Silent fail — polling shouldn't be noisy
      console.debug('[Notifications] Poll error:', err)
    }
  }, [userId])

  // Initial fetch + polling
  useEffect(() => {
    if (!userId) return
    fetchNotifications()
    const interval = setInterval(fetchNotifications, pollingIntervalMs)
    return () => clearInterval(interval)
  }, [userId, pollingIntervalMs, fetchNotifications])

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Fetch immediately when opening
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen, fetchNotifications])

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

  const markOneRead = useCallback(async (notificationId: string) => {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <User className="w-4 h-4 text-indigo-500" />
      case 'completion': return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case 'reminder': return <Calendar className="w-4 h-4 text-amber-500" />
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />
    }
  }

  const formatTimeAgo = (dateStr: string) => {
    try {
      const diff = Date.now() - new Date(dateStr).getTime()
      const mins = Math.floor(diff / 60000)
      if (mins < 1) return 'just now'
      if (mins < 60) return `${mins}m ago`
      const hours = Math.floor(mins / 60)
      if (hours < 24) return `${hours}h ago`
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    } catch {
      return ''
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[18px] px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-500" />
              Notifications
              {unreadCount > 0 && (
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                  ({unreadCount} unread)
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            )}

            {!loading && notifications.length === 0 && (
              <div className="text-center py-8 px-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  You&apos;ll see updates when tasks are created or completed
                </p>
              </div>
            )}

            {!loading && notifications.length > 0 && (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      !notification.read
                        ? 'bg-indigo-50/50 dark:bg-indigo-900/10'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm leading-snug ${
                          !notification.read
                            ? 'font-semibold text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0 whitespace-nowrap">
                          {formatTimeAgo(notification.created_at)}
                        </span>
                      </div>
                      {notification.body && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {notification.body}
                        </p>
                      )}
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markOneRead(notification.id)}
                        className="shrink-0 p-1 rounded-lg text-gray-300 dark:text-gray-600 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        title="Mark as read"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
