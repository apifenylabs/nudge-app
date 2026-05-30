"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import HomeDashboard from "@/components/molecules/HomeDashboard";
import ActivitySparkline from "@/components/molecules/ActivitySparkline";
import AgentActivityFeed from "@/components/molecules/AgentActivityFeed";
import DashboardSkeleton from "@/components/molecules/DashboardSkeleton";
import { useMascotStore } from "@/stores/mascotStore";
import OnboardingWizard from "@/components/organisms/OnboardingWizard";

// Shared state from dashboard-store
import {
  useProgressionGame,
  MOLTBOOK,
  MAIN_AGENT,
} from "@/lib/dashboard-store";
import { loadFeed, saveFeed, loadAudits } from "@/lib/persistence";
import type { FeedEntry, AuditRecord } from "@/lib/persistence";
import { Trophy, Shield, Star, Sparkles, Puzzle, Layers } from "lucide-react";
import { computeLifeOSXp } from "@/lib/lifeos-xp-bridge";
import { getAllPlugins } from "@/lib/lifeos/plugins";
import { recordDailyStat } from "@/lib/usage-tracker";

/** Active LifeOS Plugins widget — shows up to 5 most-recently-active plugin phase cards */
function ActiveLifeOSPlugins() {
  const router = useRouter();
  const plugins = useMemo(() => {
    const all = getAllPlugins();
    // Sort by lastActiveAt descending, take top 5
    return [...all]
      .sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime())
      .slice(0, 5);
  }, []);

  if (plugins.length === 0) return null;

  return (
    <>
      <div className="text-sm font-semibold font-mono uppercase tracking-wider mb-2 pl-1"
        style={{ color: '#374151' }}
      >
        Active Plugins
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {plugins.map((plugin) => {
          const phaseColors = plugin.phases.map(p => {
            if (p.completed) return '#14B8A6'; // teal for complete
            if (p.progress > 0) return plugin.color; // gradient = plugin color
            return '#D1D5DB'; // gray for empty
          });

          return (
            <div
              key={plugin.id}
              onClick={() => router.push('/dashboard/lifeos')}
              className="p-3 sm:p-4 rounded-xl border cursor-pointer hover:shadow-md transition-shadow"
              style={{
                background: '#FFFFFF',
                borderColor: '#E5E7EB',
                boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Plugin emoji + name */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{plugin.emoji}</span>
                <span className="text-[11px] font-semibold truncate" style={{ color: '#374151' }}>
                  {plugin.name}
                </span>
              </div>

              {/* Phase dot strip */}
              <div className="flex gap-1 mb-2">
                {phaseColors.map((color, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full mb-2" style={{ backgroundColor: '#F3F4F6' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${plugin.overallProgress}%`,
                    backgroundColor: plugin.color,
                  }}
                />
              </div>

              {/* Phase name + progress text */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono truncate" style={{ color: '#6B7280' }}>
                  {plugin.phases.find(p => !p.completed && p.progress > 0)?.phase ??
                   (plugin.overallProgress >= 100 ? '✅ Complete' : 'Not started')}
                </span>
                <span className="text-[10px] font-mono font-semibold" style={{ color: plugin.color }}>
                  {Math.round(plugin.overallProgress)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function DashboardHomePage() {
  const router = useRouter();
  const [progression, setProgression] = useProgressionGame();
  const [bauEntries, setBauEntries] = useState<FeedEntry[]>(() => {
    const saved = loadFeed();
    return saved.length > 0 ? saved as FeedEntry[] : [...MOLTBOOK];
  });

  const feedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    feedTimerRef.current = setTimeout(() => saveFeed(bauEntries), 300);
    return () => { if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, [bauEntries]);

  const { currentMascot } = useMascotStore();

  const currentLevel = useMemo(() => Math.max(1, Math.floor(progression.totalXp / 500) + 1), [progression.totalXp]);

  // ─── Certification Stats ─────────────────────────────────────────────
  const certStats = useMemo(() => {
    const audits = loadAudits();
    const gold = audits.filter(a => a.tier === 'gold').length;
    const silver = audits.filter(a => a.tier === 'silver').length;
    const bronze = audits.filter(a => a.tier === 'bronze').length;
    const total = audits.length;
    const avgScore = total > 0
      ? Math.round(audits.reduce((s: number, a: AuditRecord) => s + a.score, 0) / total)
      : 0;
    return { gold, silver, bronze, total, avgScore };
  }, []);

  // LifeOS bridge data — reads actual plugin engagement from localStorage
  const lifeosData = useMemo(() => computeLifeOSXp(), []);

  const handleNavigate = useCallback((tab: string) => {
    const pathMap: Record<string, string> = {
      home: "/dashboard",
      swarm: "/dashboard/swarm",
      forge: "/dashboard/forge",
      lifeos: "/dashboard/lifeos",
      audit: "/dashboard/security",
      bau: "/dashboard/automation",
      roi: "/dashboard",
      progression: "/dashboard/progression",
    };
    router.push(pathMap[tab] || `/dashboard/${tab}`);
  }, [router]);

  // Track today's stats on mount
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    // Record a daily stat snapshot so the activity chart has data
    recordDailyStat({ tasksRun: progression.totalTasksRun, xpEarned: progression.totalXp });
    return () => clearTimeout(timer);
  }, [progression.totalTasksRun, progression.totalXp]);

  if (!loaded) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <OnboardingWizard />
      <div className="space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-6"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)',
        }}
      >
        <HomeDashboard
          progression={progression}
          agentLevel={currentLevel}
          recentFeed={bauEntries}
          onNavigate={handleNavigate}
        />
      </Card>

      {/* Certification Overview */}
      {certStats.total > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <div className="p-3 sm:p-4 rounded-xl border text-center"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <Trophy className="h-4 w-4 mx-auto mb-1" style={{ color: '#F59E0B' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#F59E0B' }}>{certStats.gold}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Gold</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <Shield className="h-4 w-4 mx-auto mb-1" style={{ color: '#6B7280' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#6B7280' }}>{certStats.silver}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Silver</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <Star className="h-4 w-4 mx-auto mb-1" style={{ color: '#CD7F32' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#CD7F32' }}>{certStats.bronze}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Bronze</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center cursor-pointer"
            onClick={() => router.push('/dashboard/progression')}
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E7EB',
              boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
            }}
          >
            <Sparkles className="h-4 w-4 mx-auto mb-1" style={{ color: '#0D9488' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#0D9488' }}>{certStats.avgScore}%</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Avg Score</div>
          </div>
        </div>
      )}

      {/* LifeOS Plugin Summary — always visible */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div
          className="p-3 sm:p-4 rounded-xl border text-center cursor-pointer"
          onClick={() => router.push('/dashboard/lifeos')}
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
          }}
        >
          <Puzzle className="h-4 w-4 mx-auto mb-1" style={{ color: '#0D9488' }} />
          <div className="text-lg sm:text-xl font-bold" style={{ color: '#0D9488' }}>{lifeosData.activePlugins}</div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Plugins</div>
        </div>
        <div
          className="p-3 sm:p-4 rounded-xl border text-center cursor-pointer"
          onClick={() => router.push('/dashboard/lifeos')}
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
          }}
        >
          <Layers className="h-4 w-4 mx-auto mb-1" style={{ color: '#0D9488' }} />
          <div className="text-lg sm:text-xl font-bold" style={{ color: '#0D9488' }}>{lifeosData.totalActions}</div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Actions</div>
        </div>
        <div
          className="p-3 sm:p-4 rounded-xl border text-center cursor-pointer"
          onClick={() => router.push('/dashboard/lifeos')}
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
          }}
        >
          <Trophy className="h-4 w-4 mx-auto mb-1" style={{ color: '#F59E0B' }} />
          <div className="text-lg sm:text-xl font-bold" style={{ color: '#F59E0B' }}>{lifeosData.completedPlugins}</div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>Done</div>
        </div>
        <div
          className="p-3 sm:p-4 rounded-xl border text-center"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E7EB',
            boxShadow: '0 4px 12px -4px rgba(0,0,0,0.04)',
          }}
        >
          <Star className="h-4 w-4 mx-auto mb-1" style={{ color: '#10B981' }} />
          <div className="text-lg sm:text-xl font-bold" style={{ color: '#10B981' }}>{lifeosData.totalLifeosXp.toLocaleString()}</div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#6B7280' }}>XP</div>
        </div>
      </div>

      {/* Active LifeOS Plugins — plugin phase progress cards */}
      <ActiveLifeOSPlugins />

      {/* Agent Activity Feed — recent agent activity entries */}
      <AgentActivityFeed entries={bauEntries} onFeedChange={setBauEntries} />

      {/* Activity Sparkline — 7-day usage trend chart */}
      <ActivitySparkline />
    </div>
    </>
  );
}
