'use client'

import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import { TrendingUp, MessageSquare, Bookmark, Flame, Sparkles, Award } from 'lucide-react'

/**
 * AccountStats — LifeOS-style stats panel for the account dashboard.
 * Shows activity streak, total reviews, saved destinations, and engagement insights.
 * Invisible when Supabase is unavailable (mock mode renders nothing).
 */
export default function AccountStats() {
  const supabase = createBrowserSupabaseClient()
  const [stats, setStats] = useState<{
    totalReviews: number
    totalSaved: number
    streakDays: number
    topCategory: string
    loading: boolean
  }>({
    totalReviews: 0,
    totalSaved: 0,
    streakDays: 0,
    topCategory: '',
    loading: true,
  })

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user || !user.id) {
          if (!cancelled) setStats(s => ({ ...s, loading: false }))
          return
        }

        // Fetch reviews count
        let totalReviews = 0
        let totalSaved = 0
        let reviewDates: string[] = []

        const { data: reviews, error: reviewsError } = await supabase
          .from('destination_reviews')
          .select('created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!reviewsError && reviews) {
          totalReviews = reviews.length
          reviewDates = reviews.map(r =>
            new Date(r.created_at).toISOString().split('T')[0]
          )
        }

        // Fetch bookmarks count
        const { data: bookmarks, error: bookmarksError } = await supabase
          .from('bookmarks')
          .select('created_at')
          .eq('user_id', user.id)

        if (!bookmarksError && bookmarks) {
          totalSaved = bookmarks.length
          // Merge bookmark dates into activity dates
          const bookmarkDates = bookmarks.map(b =>
            new Date(b.created_at).toISOString().split('T')[0]
          )
          reviewDates = [...new Set([...reviewDates, ...bookmarkDates])]
        }

        // Calculate current streak
        let streakDays = 0
        if (reviewDates.length > 0) {
          const uniqueDates = [...new Set(reviewDates)].sort().reverse()
          const today = new Date().toISOString().split('T')[0]
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

          // Only count streak if the user has activity today or yesterday
          const hasRecentActivity =
            uniqueDates[0] === today || uniqueDates[0] === yesterday
          if (hasRecentActivity) {
            const startFrom = uniqueDates[0] === today ? today : yesterday
            let checkDate = new Date(startFrom)
            for (const dateStr of uniqueDates) {
              const date = new Date(dateStr)
              if (date.toISOString().split('T')[0] === checkDate.toISOString().split('T')[0]) {
                streakDays++
                checkDate.setDate(checkDate.getDate() - 1)
              } else {
                break
              }
            }
          }
        }

        // Determine top category from saved destinations
        let topCategory = ''
        if (totalSaved > 0) {
          const { data: savedDestinations } = await supabase
            .from('bookmarks')
            .select('destination_id')
            .eq('user_id', user.id)
            .limit(10)

          if (savedDestinations && savedDestinations.length > 0) {
            const destIds = savedDestinations.map(b => b.destination_id)
            const { data: destinations } = await supabase
              .from('destinations')
              .select('category')
              .in('id', destIds)

            if (destinations && destinations.length > 0) {
              const catCount: Record<string, number> = {}
              destinations.forEach(d => {
                catCount[d.category] = (catCount[d.category] || 0) + 1
              })
              const sorted = Object.entries(catCount).sort(([, a], [, b]) => b - a)
              if (sorted.length > 0) {
                topCategory = sorted[0][0]
              }
            }
          }
        }

        if (!cancelled) {
          setStats({
            totalReviews,
            totalSaved,
            streakDays,
            topCategory,
            loading: false,
          })
        }
      } catch {
        if (!cancelled) setStats(s => ({ ...s, loading: false }))
      }
    }

    loadStats()
    return () => { cancelled = true }
  }, [supabase])

  // Don't render anything while loading or if no data
  if (stats.loading) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const hasNoData = stats.totalReviews === 0 && stats.totalSaved === 0
  if (hasNoData) return null

  const statCards = [
    {
      label: 'Reviews Written',
      value: stats.totalReviews,
      icon: MessageSquare,
      color: 'bg-amber-50 text-amber-600',
      bg: 'bg-amber-50/50',
    },
    {
      label: 'Saved Destinations',
      value: stats.totalSaved,
      icon: Bookmark,
      color: 'bg-rose-50 text-rose-600',
      bg: 'bg-rose-50/50',
    },
    {
      label: 'Day Streak',
      value: stats.streakDays > 0 ? `${stats.streakDays}d` : 'Start today!',
      icon: Flame,
      color: 'bg-orange-50 text-orange-600',
      bg: 'bg-orange-50/50',
    },
    {
      label: stats.topCategory ? 'Top Category' : 'Insight',
      value: stats.topCategory || 'Explore more',
      icon: stats.topCategory ? Award : Sparkles,
      color: 'bg-sky-50 text-sky-600',
      bg: 'bg-sky-50/50',
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Your Activity
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow`}
          >
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-2`}>
              <card.icon size={16} />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
