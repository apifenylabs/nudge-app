"use client";

import { useProgression, EVOLUTION_STAGES } from "@/hooks/useProgression";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   ProgressionPreview — compact rank & XP widget
   ───────────────────────────────────────────────────────────── */

export default function ProgressionPreview() {
  const { currentStage, nextStage, xpProgress, xpForNext, loading, profile } = useProgression();

  // Guard: still loading
  if (loading) {
    return (
      <div className="glass rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full skeleton-pulse bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-24 h-4 rounded skeleton-pulse bg-slate-700" />
          <div className="w-full h-2 rounded skeleton-pulse bg-slate-700" />
          <div className="w-20 h-3 rounded skeleton-pulse bg-slate-700" />
        </div>
      </div>
    );
  }

  // Empty state: zero XP (brand-new user, finished loading)
  if (!loading && currentStage && profile?.total_xp === 0) {
    return (
      <div className="glass rounded-xl p-6 border border-gray-600/30 group hover:scale-[1.01] transition-all duration-300 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-4 relative">
          {/* SVG illustration — sleeping hunter campfire scene */}
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            {/* Background gradient circle */}
            <circle cx="60" cy="40" r="36" fill="url(#zeroXpGlow)" opacity="0.15" />
            {/* Campfire */}
            <ellipse cx="60" cy="62" rx="12" ry="3" fill="rgba(255,255,255,0.06)" />
            <g>
              <line x1="60" y1="62" x2="54" y2="48" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="60" y1="62" x2="66" y2="48" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="60" y1="62" x2="60" y2="44" stroke="rgba(34,211,238,0.25)" strokeWidth="1" strokeLinecap="round" />
              {/* Ember particles */}
              <circle cx="52" cy="42" r="1" fill="rgba(34,211,238,0.4)" className="animate-pulse" />
              <circle cx="66" cy="40" r="0.7" fill="rgba(34,211,238,0.3)" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
              <circle cx="58" cy="38" r="0.5" fill="rgba(34,211,238,0.3)" className="animate-pulse" style={{ animationDelay: "1s" }} />
            </g>
            {/* Slumbering figure */}
            <g opacity="0.5">
              {/* body curled up */}
              <ellipse cx="60" cy="57" rx="7" ry="5" fill="rgba(255,255,255,0.08)" />
              {/* head resting */}
              <circle cx="60" cy="50" r="4" fill="rgba(255,255,255,0.1)" />
              {/* Zzz indicators */}
              <text x="70" y="44" fontSize="6" fill="rgba(34,211,238,0.2)" fontFamily="monospace">z</text>
              <text x="76" y="38" fontSize="7" fill="rgba(34,211,238,0.25)" fontFamily="monospace">z</text>
              <text x="84" y="30" fontSize="8" fill="rgba(34,211,238,0.3)" fontFamily="monospace">z</text>
            </g>
            {/* Stars */}
            <circle cx="28" cy="20" r="0.8" fill="rgba(255,255,255,0.15)">
              <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="95" cy="15" r="0.6" fill="rgba(255,255,255,0.1)">
              <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="12" r="0.5" fill="rgba(255,255,255,0.08)">
              <animate attributeName="opacity" values="0.08;0.35;0.08" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <defs>
              <radialGradient id="zeroXpGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          <div className="text-center">
            <p className="text-white font-semibold text-sm">
              Your Journey Begins
            </p>
            <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
              The campfire flickers, stars glimmer overhead, and the gate looms nearby.
              Your first agent awaits — forge it to awaken your powers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 to-purple-600/30 px-4 py-2 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/30 hover:bg-cyan-600/40 hover:ring-cyan-400/50 transition-all shadow-lg"
            >
              <span className="text-sm">⚔️</span>
              Forge Your First Agent
              <span className="text-sm">→</span>
            </Link>
            <Link
              href="/progression"
              className="inline-flex items-center gap-1 px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              View Ranks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Guard: no data yet (shouldn't happen after loading finishes)
  if (!currentStage) {
    return (
      <div className="glass rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full skeleton-pulse bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-24 h-4 rounded skeleton-pulse bg-slate-700" />
          <div className="w-full h-2 rounded skeleton-pulse bg-slate-700" />
          <div className="w-20 h-3 rounded skeleton-pulse bg-slate-700" />
        </div>
      </div>
    );
  }

  const nextRank = nextStage?.rank ?? "MAX";
  const xpDisplay = xpForNext > 0 ? `${xpForNext.toLocaleString()} XP` : "MAX RANK";

  // Pick a subtle accent border color based on rank
  const rankBorderMap: Record<string, string> = {
    E: "border-gray-600/40",
    D: "border-green-700/40",
    C: "border-blue-700/40",
    B: "border-purple-700/40",
    A: "border-amber-600/40",
    S: "border-cyan-500/40",
  };
  const borderClass = rankBorderMap[currentStage.rank] ?? "border-slate-700/40";

  return (
    <Link href="/progression" prefetch={false}>
      <div
        className={`glass rounded-xl p-4 cursor-pointer hover:scale-[1.01] transition-all duration-300 border ${borderClass} group`}
      >
        <div className="flex items-center gap-4">
          {/* Rank badge */}
          <div className="shrink-0 relative">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-lg bg-gradient-to-br ${currentStage.color} shadow-lg`}
            >
              {currentStage.avatarEmoji}
            </div>
          </div>

          {/* Rank info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-lg font-bold leading-none ${currentStage.accentColor}`}>
                {currentStage.rank}
              </span>
              <span className="text-sm font-medium text-white truncate">
                {currentStage.title}
              </span>
              {nextStage && (
                <span className="text-[10px] text-slate-600 ml-auto hidden sm:inline">
                  Next: {nextStage.rank} · {nextStage.title}
                </span>
              )}
            </div>

            {/* XP progress bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-700 ease-out"
                style={{ width: `${(xpProgress * 100).toFixed(1)}%` }}
              />
            </div>

            {/* XP counter */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
                {xpDisplay}
              </span>
              <span className="text-[10px] text-slate-600 group-hover:text-cyan-500 transition-colors">
                View full progression →
              </span>
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-500/20 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  );
}
