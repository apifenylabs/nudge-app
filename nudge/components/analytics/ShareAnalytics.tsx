'use client'

import { useEffect, useState } from 'react'
import { Share2, TrendingUp, Twitter, MessageCircle, Send, Mail, ExternalLink, BarChart3 } from 'lucide-react'

interface ShareStats {
  totalShares: number
  platforms: Record<string, number>
  topPlatform: string
  isLoading: boolean
}

/**
 * ShareAnalytics — Display share metrics for task completions.
 * Shows how many times tasks have been shared and to which platforms.
 */
export default function ShareAnalytics() {
  const [stats, setStats] = useState<ShareStats>({
    totalShares: 0,
    platforms: {},
    topPlatform: '',
    isLoading: true,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchShareStats()
  }, [])

  async function fetchShareStats() {
    try {
      // Fetch share statistics from the analytics API
      // The analytics API returns shares data when familyId param is provided
      const res = await fetch('/api/analytics/shares')
      if (!res.ok) throw new Error('Failed to load share stats')
      const data = await res.json()

      setStats({
        totalShares: data.totalShares || 0,
        platforms: data.platforms || {},
        topPlatform: getTopPlatform(data.platforms || {}),
        isLoading: false,
      })
    } catch (err) {
      console.error('Share analytics error:', err)
      setError('Could not load share analytics')
      setStats(prev => ({ ...prev, isLoading: false }))
    }
  }

  if (stats.isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-border/60 shadow-sm p-5">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
      </div>
    )
  }

  if (error || stats.totalShares === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-border/60 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-foreground">Social Shares</h3>
        </div>
        <div className="text-center py-4">
          <Share2 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {error || 'No shares yet. Complete a task and share it!'}
          </p>
        </div>
      </div>
    )
  }

  const platformIcons: Record<string, React.ReactNode> = {
    twitter: <Twitter className="w-3.5 h-3.5" />,
    whatsapp: <MessageCircle className="w-3.5 h-3.5" />,
    telegram: <Send className="w-3.5 h-3.5" />,
    facebook: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    email: <Mail className="w-3.5 h-3.5" />,
  }

  const platformColors: Record<string, string> = {
    twitter: 'text-black dark:text-white',
    whatsapp: 'text-emerald-500',
    telegram: 'text-sky-500',
    facebook: 'text-blue-600',
    email: 'text-gray-500',
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-border/60 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-foreground">Social Shares</h3>
        </div>
        <button
          onClick={fetchShareStats}
          className="text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Total share count */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-bold text-foreground">{stats.totalShares}</span>
        <span className="text-sm text-muted-foreground mb-1">total shares</span>
      </div>

      {/* Top platform */}
      {stats.topPlatform && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>Most shared on: <strong className="text-foreground capitalize">{stats.topPlatform}</strong></span>
        </div>
      )}

      {/* Platform breakdown */}
      {Object.keys(stats.platforms).length > 0 && (
        <div className="space-y-2">
          {Object.entries(stats.platforms)
            .sort(([, a], [, b]) => b - a)
            .map(([platform, count]) => {
              const percentage = Math.round((count / stats.totalShares) * 100)
              return (
                <div key={platform} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${platformColors[platform] || 'text-gray-500'}`}>
                    {platformIcons[platform] || <ExternalLink className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="font-medium text-foreground capitalize">{platform}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

function getTopPlatform(platforms: Record<string, number>): string {
  let top = ''
  let max = 0
  for (const [key, value] of Object.entries(platforms)) {
    if (value > max) {
      max = value
      top = key
    }
  }
  return top
}
