"use client";

/* ─────────────────────────────────────────────────────────────
   ProgressionBar — Rank XP Bar
   Displays current rank, XP progress toward next rank, and
   provides visual context for the player's progression tier.
   ───────────────────────────────────────────────────────────── */

import { EVOLUTION_STAGES, rankIndex, xpProgressInRank } from "@/hooks/useProgression";

// Derive RANK_DATA from the single source of truth (EVOLUTION_STAGES in useProgression)
// This ensures XP thresholds, colors, and labels stay in sync automatically.
const RANK_DATA = EVOLUTION_STAGES.map((s) => ({
  rank: s.rank,
  label: s.title,
  color: s.color,
  textColor: s.accentColor,
  maxXp: s.xpRequired,
}));

interface Props {
  currentRank: string;
  currentXp: number;
  onRankSelect?: (rank: string) => void;
  compact?: boolean;
}

export default function ProgressionBar({ currentRank, currentXp, onRankSelect, compact = false }: Props) {
  const currentIndex = RANK_DATA.findIndex((r) => r.rank === currentRank);
  const currentRankData = RANK_DATA[currentIndex] || RANK_DATA[0];
  const nextRankData = RANK_DATA[currentIndex + 1];

  // xpRequired is cumulative (total XP to reach this rank).
  // Calculate XP earned within the current rank and XP needed to reach next rank.
  const currentThreshold = currentRankData.maxXp;
  const nextThreshold = nextRankData?.maxXp ?? currentThreshold;
  const xpInRank = Math.max(0, Math.min(currentXp - currentThreshold, nextThreshold - currentThreshold));
  const xpNeededForRank = Math.max(1, nextThreshold - currentThreshold);
  const xpProgress = Math.min(xpInRank / xpNeededForRank, 1);
  const xpPercent = Math.round(xpProgress * 100);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${currentRankData.textColor}`}>
          [{currentRank}]
        </span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${currentRankData.color} transition-all duration-500`}
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <span className="text-[9px] text-white/40 w-12 text-right">
          {xpInRank}/{xpNeededForRank} XP
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/60 border border-white/10 rounded-xl p-4">
      {/* Rank title */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${currentRankData.textColor}`}>
            {currentRankData.label} Rank {currentRank}
          </span>
        </div>
        {nextRankData && (
          <span className="text-[10px] text-white/30">
            Next: {nextRankData.label} [{nextRankData.rank}]
          </span>
        )}
        {!nextRankData && (
          <span className="text-[10px] text-cyan-400/60">MAX RANK</span>
        )}
      </div>

      {/* XP bar */}
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${currentRankData.color} transition-all duration-700 ease-out shadow-lg`}
          style={{ width: `${xpPercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-mono text-white/80 font-semibold drop-shadow-md">
            {xpPercent}%
          </span>
        </div>
      </div>

      {/* XP counters — show progress within current rank */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-white/40">{xpInRank} XP</span>
        <span className="text-[10px] text-white/40">{xpNeededForRank} XP to next rank</span>
      </div>

      {/* Rank selector (clickable badges) */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {RANK_DATA.map((r, i) => {
          const isCurrent = r.rank === currentRank;
          const isUnlocked = i <= currentIndex;
          const isReachable = onRankSelect && i <= currentIndex + 1;
          return (
            <button
              key={r.rank}
              onClick={() => onRankSelect && isReachable && onRankSelect(r.rank)}
              disabled={!isReachable}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                isCurrent
                  ? `bg-gradient-to-br ${r.color} text-white shadow-lg scale-110`
                  : isUnlocked
                  ? "bg-white/10 text-white/50 border border-white/10"
                  : "bg-white/5 text-white/20 border border-white/5 opacity-40 cursor-not-allowed"
              } ${isReachable && !isCurrent ? "hover:bg-white/20 hover:border-white/30" : ""}`}
            >
              {r.rank}
            </button>
          );
        })}
      </div>
    </div>
  );
}
