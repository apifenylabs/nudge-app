"use client";

import { useEffect, useState } from "react";
import { getStreak, getStreakMilestone, recordScan } from "@/lib/streaks";
import { Badge } from "@/components/ui/badge";

interface StreakBadgeProps {
  onScanned?: () => void;
}

export default function StreakBadge({ onScanned }: StreakBadgeProps) {
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalScans: 0,
  });
  const [milestone, setMilestone] = useState<{
    milestone: number;
    emoji: string;
    label: string;
    achieved: boolean;
  } | null>(null);

  useEffect(() => {
    const data = getStreak();
    setStreak(data);
    setMilestone(getStreakMilestone(data.currentStreak));
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = () => {
      const data = getStreak();
      setStreak(data);
      setMilestone(getStreakMilestone(data.currentStreak));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (streak.totalScans === 0) return null;

  return (
    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1.5 text-xs dark:from-amber-950/30 dark:to-orange-950/30">
      {/* Streak fire */}
      <span className="text-base">
        {streak.currentStreak >= 7 ? "🔥" : streak.currentStreak >= 3 ? "💪" : "🌱"}
      </span>

      {/* Streak count */}
      <span className="font-bold text-amber-700 dark:text-amber-300">
        {streak.currentStreak}
      </span>
      <span className="text-amber-600 dark:text-amber-400">day streak</span>

      {/* Milestone badge */}
      {milestone && milestone.achieved && (
        <Badge
          variant="outline"
          className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-200"
        >
          {milestone.emoji} {milestone.label}
        </Badge>
      )}

      {/* Next milestone progress */}
      {milestone && !milestone.achieved && (
        <span className="text-amber-500 dark:text-amber-400">
          Next: {milestone.milestone}d {milestone.emoji}
        </span>
      )}

      {/* Total scans */}
      <span className="text-gray-400 dark:text-gray-500">
        · {streak.totalScans} scans
      </span>
    </div>
  );
}
