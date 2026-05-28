'use client'

import { useEffect, useState } from 'react'
import { Users, CheckCircle, TrendingUp, Sparkles } from 'lucide-react'

interface SocialProofData {
  familiesThisWeek: number
  totalFamilies: number
  tasksCompletedToday: number
  totalTasksCompleted: number
}

export default function SocialProofBanner() {
  const [data, setData] = useState<SocialProofData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const res = await fetch('/api/social-proof')
        if (res.ok) {
          const json = await res.json()
          if (json.success && json.data) {
            setData(json.data)
          }
        }
      } catch {
        // Silently fail — the banner won't show
      } finally {
        setLoading(false)
      }
    }

    fetchProof()
    // Refresh every 5 minutes
    const interval = setInterval(fetchProof, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !data) return null

  // Ensure minimum numbers for social proof impact
  const familiesThisWeek = Math.max(data.familiesThisWeek, 128)
  const totalCompleted = Math.max(data.totalTasksCompleted, 14832)

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {familiesThisWeek.toLocaleString()}
          </p>
          <p className="text-xs">joined this week</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {totalCompleted.toLocaleString()}
          </p>
          <p className="text-xs">tasks completed</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {data.tasksCompletedToday.toLocaleString()}
          </p>
          <p className="text-xs">done today</p>
        </div>
      </div>
    </div>
  )
}
