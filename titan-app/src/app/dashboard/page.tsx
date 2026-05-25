"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import HomeDashboard from "@/components/molecules/HomeDashboard";
import { useMascotStore } from "@/stores/mascotStore";

// Shared state from dashboard-store
import {
  useProgressionGame,
  MOLTBOOK,
  MAIN_AGENT,
} from "@/lib/dashboard-store";
import { loadFeed, saveFeed, loadAudits } from "@/lib/persistence";
import type { FeedEntry, AuditRecord } from "@/lib/persistence";
import { Trophy, Shield, Star, Sparkles } from "lucide-react";

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

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-6"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
          borderRadius: '20px',
          boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
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
              borderColor: '#E5E0D8',
              boxShadow: '0 4px 12px -4px rgba(31,31,31,0.06)',
            }}
          >
            <Trophy className="h-4 w-4 mx-auto mb-1" style={{ color: '#D4A017' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#D4A017' }}>{certStats.gold}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#666666' }}>Gold</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E0D8',
              boxShadow: '0 4px 12px -4px rgba(31,31,31,0.06)',
            }}
          >
            <Shield className="h-4 w-4 mx-auto mb-1" style={{ color: '#6B7280' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#6B7280' }}>{certStats.silver}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#666666' }}>Silver</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center"
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E0D8',
              boxShadow: '0 4px 12px -4px rgba(31,31,31,0.06)',
            }}
          >
            <Star className="h-4 w-4 mx-auto mb-1" style={{ color: '#CD7F32' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#CD7F32' }}>{certStats.bronze}</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#666666' }}>Bronze</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl border text-center cursor-pointer"
            onClick={() => router.push('/dashboard/progression')}
            style={{
              background: '#FFFFFF',
              borderColor: '#E5E0D8',
              boxShadow: '0 4px 12px -4px rgba(31,31,31,0.06)',
            }}
          >
            <Sparkles className="h-4 w-4 mx-auto mb-1" style={{ color: '#0EA5A5' }} />
            <div className="text-lg sm:text-xl font-bold" style={{ color: '#0EA5A5' }}>{certStats.avgScore}%</div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider" style={{ color: '#666666' }}>Avg Score</div>
          </div>
        </div>
      )}
    </div>
  );
}
