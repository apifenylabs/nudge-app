'use client'

import { useState, useEffect } from 'react'
import { Trophy, Flame, Award, Target, Star, Zap, Loader2 } from 'lucide-react'

interface StreakData {
  current_streak: number
  longest_streak: number
  total_completed: number
  week_completed: number
  last_task_date: string | null
}

interface Achievement {
  key: string
  title: string
  description: string
  icon: string
  earned_at: string | null
  progress: number
  requirement_value: number
}

interface LeaderboardEntry {
  user_id: string
  display_name: string
  points: number
  tasks_completed: number
  streak: number
  avatar_url: string | null
}

interface GamificationData {
  streak: StreakData | null
  achievements: Achievement[]
  leaderboard: LeaderboardEntry[]
}

export default function GamificationPanel() {
  const [data, setData] = useState<GamificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements')

  useEffect(() => {
    async function fetchGamification() {
      try {
        const res = await fetch('/api/gamification')
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch {
        // Silent
      } finally {
        setLoading(false)
      }
    }
    fetchGamification()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <Trophy className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Loading stats...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Streak Card */}
      {data.streak && (
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20 border border-orange-200/60 dark:border-orange-800/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className={`w-5 h-5 ${data.streak.current_streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              <span className="font-semibold text-foreground">Your Streak</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">{data.streak.current_streak}</span>
              <span className="text-xs text-muted-foreground ml-1">days</span>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl p-4 border border-border/40">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{data.streak.total_completed}</p>
                <p className="text-xs text-muted-foreground">Total Done</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{data.streak.week_completed}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{data.streak.longest_streak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </div>

          {/* Streak visualization */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const daysAgo = 6 - i
              const isActive = data.streak?.current_streak || 0 > daysAgo
              return (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i === 6 && (data.streak?.current_streak || 0) > 0
                      ? 'bg-gradient-to-r from-orange-400 to-rose-500'
                      : isActive
                        ? 'bg-orange-300 dark:bg-orange-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>Mon</span>
            <span>Today</span>
          </div>
        </div>
      )}

      {/* Tab switcher */}
      <div className="flex gap-2 bg-secondary/50 rounded-xl p-1 border border-border/40">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all ${
            activeTab === 'achievements'
              ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Award className="w-3.5 h-3.5 inline mr-1.5" /> Achievements
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 inline mr-1.5" /> Leaderboard
        </button>
      </div>

      {/* Achievements */}
      {activeTab === 'achievements' && (
        <div className="space-y-2">
          {data.achievements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Complete tasks to earn achievements!</p>
            </div>
          ) : (
            data.achievements.map((a) => {
              const earned = !!a.earned_at
              const progressPct = Math.min(100, (a.progress / a.requirement_value) * 100)
              return (
                <div
                  key={a.key}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    earned
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/30'
                      : 'bg-white dark:bg-gray-900 border-border/60'
                  }`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground truncate">{a.title}</p>
                      {earned && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-medium">Earned</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{a.description}</p>
                    {!earned && (
                      <div className="mt-1.5 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {earned && <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />}
                  {!earned && (
                    <span className="text-xs text-muted-foreground shrink-0">{a.progress}/{a.requirement_value}</span>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-2">
          {data.leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start completing tasks as a family to see the leaderboard!</p>
            </div>
          ) : (
            data.leaderboard.map((entry, i) => {
              const medals = ['🥇', '🥈', '🥉']
              const rank = i + 1
              return (
                <div
                  key={entry.user_id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    rank === 1
                      ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/30'
                      : 'bg-white dark:bg-gray-900 border-border/60'
                  }`}
                >
                  <span className="text-xl w-8 text-center">
                    {rank <= 3 ? medals[rank - 1] : `#${rank}`}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {(entry.display_name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{entry.display_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{entry.tasks_completed} tasks done</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{entry.points}</p>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                  {entry.streak > 0 && (
                    <div className="flex items-center gap-0.5 text-xs text-orange-500">
                      <Flame className="w-3 h-3" />
                      {entry.streak}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
