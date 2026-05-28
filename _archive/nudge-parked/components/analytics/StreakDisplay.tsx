'use client'

import { Flame, TrendingUp, Award, Calendar } from 'lucide-react'

interface StreakData {
  userId: string
  name: string
  currentStreak: number
  longestStreak: number
}

interface StreakDisplayProps {
  data: StreakData[]
}

/**
 * Streak tracking display showing current and longest streaks
 * per family member with visual indicators.
 */
export default function StreakDisplay({ data }: StreakDisplayProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Complete tasks on consecutive days to build a streak! 🔥
      </div>
    )
  }

  const topStreak = Math.max(...data.map(s => s.currentStreak), 1)
  const bestEver = Math.max(...data.map(s => s.longestStreak), 0)

  return (
    <div className="space-y-3">
      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-3 text-center">
          <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{topStreak}</div>
          <div className="text-[10px] text-muted-foreground">Best current</div>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-3 text-center">
          <Award className="w-5 h-5 text-rose-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{bestEver}</div>
          <div className="text-[10px] text-muted-foreground">All-time best</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-3 text-center">
          <TrendingUp className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">
            {data.filter(s => s.currentStreak >= 3).length}
          </div>
          <div className="text-[10px] text-muted-foreground">Active (3+ days)</div>
        </div>
      </div>

      {/* Member streaks */}
      <div className="space-y-2">
        {data.map((s, i) => {
          const pct = topStreak > 0 ? (s.currentStreak / topStreak) * 100 : 0
          return (
            <div key={s.userId} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame
                    className={`w-3.5 h-3.5 ${
                      s.currentStreak >= 7
                        ? 'text-orange-500'
                        : s.currentStreak >= 3
                        ? 'text-amber-400'
                        : s.currentStreak > 0
                        ? 'text-gray-400'
                        : 'text-gray-300'
                    }`}
                  />
                  <span className="text-xs font-medium text-foreground">
                    {s.name}
                  </span>
                  <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
                    {s.currentStreak}d
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  Best: {s.longestStreak}d
                </span>
              </div>

              {/* Streak progress bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    s.currentStreak >= 7
                      ? 'bg-gradient-to-r from-orange-400 to-red-500'
                      : s.currentStreak >= 3
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                      : s.currentStreak > 0
                      ? 'bg-indigo-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>

              {/* Streak milestone badges */}
              <div className="flex items-center gap-1 ml-5">
                {s.currentStreak >= 3 && (
                  <span className="text-[9px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-full">
                    🔥 3-day
                  </span>
                )}
                {s.currentStreak >= 7 && (
                  <span className="text-[9px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-full">
                    ⚡ 7-day
                  </span>
                )}
                {s.currentStreak >= 14 && (
                  <span className="text-[9px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-full">
                    🏆 14-day
                  </span>
                )}
                {s.currentStreak >= 30 && (
                  <span className="text-[9px] text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded-full">
                    👑 30-day
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Streak tips */}
      {data.every(s => s.currentStreak === 0) && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
          <Calendar className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Complete at least one task every day to start a streak!
          </p>
        </div>
      )}
    </div>
  )
}
