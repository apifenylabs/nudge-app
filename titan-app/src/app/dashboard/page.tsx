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
import { loadFeed, saveFeed } from "@/lib/persistence";
import type { FeedEntry } from "@/lib/persistence";

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
    </div>
  );
}
