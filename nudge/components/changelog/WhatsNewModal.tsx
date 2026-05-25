'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  X, Sparkles, Bug, ArrowRight, CheckCircle2, Zap, ExternalLink, Info
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────

interface ChangelogEntry {
  id: string
  title: string
  body: string
  category: 'new_feature' | 'improvement' | 'fix' | 'announcement'
  icon: string
  tags: string[]
  published_at: string
  seen: boolean
}

interface ChangelogData {
  entries: ChangelogEntry[]
  totalUnseen: number
  total: number
}

// ── Helpers ────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  new_feature: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', label: 'New' },
  improvement: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', label: 'Improvement' },
  fix: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Fix' },
  announcement: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Announcement' },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

// ── Props ──────────────────────────────────────────────────────────

interface WhatsNewModalProps {
  userId?: string
  isOpen: boolean
  onClose: () => void
  onUnseenChanged?: (unseen: number) => void
}

// ── Component ──────────────────────────────────────────────────────

export default function WhatsNewModal({ userId, isOpen, onClose, onUnseenChanged }: WhatsNewModalProps) {
  const [data, setData] = useState<ChangelogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChangelog = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (userId) params.set('userId', userId)
      params.set('limit', '50')

      const res = await fetch(`/api/changelog/list?${params}`)
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to fetch changelog')
      }
      const json = await res.json()
      setData(json)
      onUnseenChanged?.(json.totalUnseen || 0)
    } catch (err: any) {
      console.error('[WhatsNew] Fetch error:', err)
      setError(err.message || 'Failed to load changelog')
    } finally {
      setLoading(false)
    }
  }, [userId, onUnseenChanged])

  useEffect(() => {
    if (isOpen) {
      fetchChangelog()
    }
  }, [isOpen, fetchChangelog])

  // Mark all as seen when modal opens
  useEffect(() => {
    if (!isOpen || !userId) return

    const markSeen = async () => {
      try {
        await fetch('/api/changelog/mark-seen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })
        onUnseenChanged?.(0)
      } catch {
        // Non-critical
      }
    }

    // Small delay to let the animation play
    const timer = setTimeout(markSeen, 1000)
    return () => clearTimeout(timer)
  }, [isOpen, userId, onUnseenChanged])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 bottom-0 sm:inset-x-auto sm:top-[5%] sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg w-full z-50 animate-in slide-in-from-bottom-4 fade-in">
        <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[85vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-foreground">What&apos;s New</h2>
              {data && data.totalUnseen > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                  {data.totalUnseen} new
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-secondary rounded w-1/4" />
                    <div className="h-5 bg-secondary rounded w-3/4" />
                    <div className="h-16 bg-secondary rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <Info className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{error}</p>
                <button
                  onClick={fetchChangelog}
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium mt-2"
                >
                  Try again
                </button>
              </div>
            ) : !data || data.entries.length === 0 ? (
              <div className="p-6 text-center">
                <Sparkles className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">No updates yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check back here for new features and improvements!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {data.entries.map((entry, index) => {
                  const catStyle = CATEGORY_STYLES[entry.category] || CATEGORY_STYLES.improvement
                  return (
                    <div
                      key={entry.id}
                      className={`px-5 py-4 transition-colors ${
                        !entry.seen
                          ? 'bg-indigo-50/50 dark:bg-indigo-950/20'
                          : 'hover:bg-secondary/30'
                      }`}
                    >
                      {/* Category + Date */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${catStyle.bg} ${catStyle.text}`}>
                            {catStyle.label}
                          </span>
                          {!entry.seen && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDate(entry.published_at)}
                        </span>
                      </div>

                      {/* Title + Icon */}
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {entry.icon && <span className="mr-1.5">{entry.icon}</span>}
                        {entry.title}
                      </h3>

                      {/* Body */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {entry.body}
                      </p>

                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {entry.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 bg-secondary text-[10px] text-muted-foreground rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-border/40 flex items-center justify-between shrink-0">
            <p className="text-[11px] text-muted-foreground">
              We ship improvements regularly
            </p>
            <button
              onClick={onClose}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
