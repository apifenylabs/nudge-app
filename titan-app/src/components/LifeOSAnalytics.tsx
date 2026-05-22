"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Activity, Zap, Flame, Lightbulb, Target,
  Sparkles, ArrowRight, ChevronRight, Star, Puzzle,
  BrainCircuit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  computeAnalytics,
  getRecommendations,
  recordAction,
  type LifeOSAnalytics,
  type CategoryScore,
} from "@/lib/lifeos/analytics";
import { getAvailableCategories, type LifeCategory } from "@/lib/lifeos/plugins";

// ─── LifeOS Analytics Tab ───────────────────────────────────────────────

export default function LifeOSAnalytics({ onActivateCategory }: { onActivateCategory?: (category: LifeCategory) => void }) {
  const [analytics, setAnalytics] = useState<LifeOSAnalytics | null>(null);
  const [recommendations, setRecommendations] = useState<LifeCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const catalog = getAvailableCategories();

  const refresh = useCallback(() => {
    const result = computeAnalytics();
    setAnalytics(result);
    setRecommendations(getRecommendations(3));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse text-titan-muted/50 text-xs font-mono">Computing analytics...</div>
      </div>
    );
  }

  const topCategory = analytics.scores[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: '#8B5CF6' }} />
        <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#8B5CF6' }}>ANALYTICS</h2>
        <span className="text-[10px] font-mono text-titan-muted/50">// scoring & personality</span>
      </div>

      {/* Stats cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Plugins', value: analytics.totalPlugins, icon: Puzzle, color: '#14B8A6', suffix: '' },
          { label: 'Total Actions', value: analytics.totalActions, icon: Zap, color: '#F59E0B', suffix: '' },
          { label: 'Current Streak', value: analytics.activeStreak, icon: Flame, color: '#EF4444', suffix: 'days' },
          { label: 'Best Streak', value: analytics.bestStreak, icon: TrophyIcon, color: '#10B981', suffix: 'days' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="p-3 sm:p-4 rounded-xl bg-titan-card/60 border border-titan-border/30 hover:border-violet-500/20 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-mono text-titan-muted/70">{stat.label}</p>
              <stat.icon className={`h-3.5 w-3.5`} style={{ color: stat.color }} />
            </div>
            <p className="text-lg sm:text-xl font-bold font-mono tracking-tight" style={{ color: stat.color }}>
              {stat.value}
              {stat.suffix && <span className="text-[10px] font-mono text-titan-muted/50 ml-1">{stat.suffix}</span>}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Personality match card */}
      {analytics.personalityMatch && (
        <motion.div
          className="p-4 sm:p-5 rounded-2xl border overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(20,184,166,0.06))',
            borderColor: 'rgba(139,92,246,0.25)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at 70% 40%, rgba(139,92,246,0.15) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="h-4 w-4 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400/70 uppercase tracking-wider">Personality Profile</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-violet-300">{analytics.personalityMatch.personality}</h3>
                <p className="text-[11px] sm:text-xs text-titan-muted/70 mt-0.5 max-w-md">
                  {analytics.personalityMatch.description}
                </p>
              </div>
              <div className="ml-auto shrink-0">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <motion.circle
                      cx="40" cy="40" r="32" fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - analytics.personalityMatch.matchScore / 100) }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold font-mono text-violet-400">{analytics.personalityMatch.matchScore}%</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Matched categories tags */}
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {analytics.personalityMatch.matchedCategories.map(cat => {
                const info = catalog.find(c => c.category === cat);
                return (
                  <Badge
                    key={cat}
                    className="text-[9px] font-mono border"
                    style={{
                      background: `${info?.color || '#8B5CF6'}15`,
                      color: info?.color || '#8B5CF6',
                      borderColor: `${info?.color || '#8B5CF6'}30`,
                    }}
                  >
                    {info?.emoji || '🧩'} {info?.name || cat}
                  </Badge>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Category engagement chart */}
      {analytics.scores.length > 0 && (
        <Card className="p-4 sm:p-5 bg-titan-card/60 border-titan-border/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-violet-400" />
              Plugin Engagement
            </h3>
            <span className="text-[9px] font-mono text-titan-muted/50">tasks completed</span>
          </div>
          <div className="space-y-2.5">
            {analytics.scores.map((score, i) => {
              const maxTasks = Math.max(...analytics.scores.map(s => s.completedTasks), 1);
              const barPct = (score.completedTasks / maxTasks) * 100;
              return (
                <motion.div
                  key={score.category}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedCategory(score.category === selectedCategory ? null : score.category)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{score.emoji}</span>
                    <span className="text-[11px] font-medium flex-1">{score.name}</span>
                    <span className="text-[10px] font-mono text-titan-muted/70">{score.completedTasks}/{score.totalTasks}</span>
                    <span className="text-[10px] font-mono font-semibold" style={{ color: score.color }}>{score.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-titan-border/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${score.color}, ${score.color}88)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barPct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                    />
                  </div>
                  {/* Expand detail on click */}
                  <AnimatePresence>
                    {selectedCategory === score.category && (
                      <motion.div
                        className="mt-2 pl-7 pr-2 py-2 rounded-lg bg-titan-surface/40 border border-titan-border/10"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="flex items-center gap-3 text-[10px] font-mono text-titan-muted/70">
                          <span>🔵 {score.completedTasks} done</span>
                          <span>⚪ {score.totalTasks - score.completedTasks} remaining</span>
                          {score.streakDays > 0 && <span className="text-amber-400">🔥 {score.streakDays}d streak</span>}
                        </div>
                        <div className="flex gap-1.5 mt-1.5">
                          {score.completedTasks > 0 && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Active
                            </span>
                          )}
                          {score.progress >= 100 && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              ★ Complete
                            </span>
                          )}
                          <span className="text-[9px] text-titan-muted/40">
                            Last: {score.lastActiveAt ? new Date(score.lastActiveAt).toLocaleDateString() : 'Never'}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Insights panel */}
      {analytics.insights.length > 0 && (
        <Card className="p-4 sm:p-5 bg-titan-card/60 border-titan-border/30">
          <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-3">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Insights & Recommendations
          </h3>
          <div className="space-y-2">
            {analytics.insights.map((insight, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-titan-surface/30 border border-titan-border/10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-xs mt-0.5">{insight.split(' ')[0]}</span>
                <p className="text-[10px] sm:text-[11px] text-titan-muted/80 leading-relaxed">{insight}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations — categories to activate next */}
      {recommendations.length > 0 && (
        <Card className="p-4 sm:p-5 bg-titan-card/60 border-titan-border/30" style={{ borderLeft: '3px solid #8B5CF6' }}>
          <h3 className="text-xs font-semibold flex items-center gap-1.5 mb-3">
            <Target className="h-3.5 w-3.5 text-violet-400" />
            Recommended Next Plugins
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {recommendations.map((cat, i) => {
              const info = catalog.find(c => c.category === cat);
              return (
                <motion.button
                  key={cat}
                  onClick={() => onActivateCategory?.(cat)}
                  className="flex items-center gap-2.5 p-3 rounded-xl border bg-titan-surface/40 border-titan-border/20 hover:border-violet-500/30 transition-all text-left"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-lg">{info?.emoji || '🧩'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold">{info?.name || cat}</p>
                    <p className="text-[9px] text-titan-muted/60 line-clamp-1">{info?.description || ''}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 text-titan-muted/30 shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Inline trophy icon (avoids loading thousands of lucide icons) ──────

function TrophyIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.73 7 19.92 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.73 17 19.92 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
