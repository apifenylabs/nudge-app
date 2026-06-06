"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLevelProgression } from "@/lib/swarm/use-level-progression";
import { getNextMilestone, getAbilitiesForLevel } from "@/lib/swarm/god-tier-engine";
import GodTierAura from "./GodTierAura";

// ─── Stage data ─────────────────────────────────────────────────────────
const TIERS: Array<{ level: number; emoji: string; label: string; color: string }> = [
  { level: 1, emoji: "🥚", label: "Hatchling", color: "#94a3b8" },
  { level: 5, emoji: "🐣", label: "Apprentice", color: "#22c55e" },
  { level: 10, emoji: "🦊", label: "Adept", color: "#3b82f6" },
  { level: 15, emoji: "🐉", label: "Master", color: "#a855f7" },
  { level: 20, emoji: "🦅", label: "Grandmaster", color: "#ec4899" },
  { level: 25, emoji: "🌟", label: "Legend", color: "#f97316" },
  { level: 30, emoji: "👑", label: "God-Tier", color: "#f59e0b" },
];

const XP_PER_LEVEL = 100;

function getStage(level: number): { level: number; emoji: string; label: string; color: string } {
  let best = TIERS[0];
  for (const t of TIERS) {
    if (level >= t.level) best = t;
  }
  return best;
}

function getNextStage(level: number): { level: number; emoji: string; label: string; color: string } | null {
  for (const t of TIERS) {
    if (level < t.level) return t;
  }
  return null;
}

function xpForLevel(level: number): number {
  return level * XP_PER_LEVEL * 1.5;
}

// ─── Animated XP Bar ────────────────────────────────────────────────────
function XPBar({ currentXp, xpForNext, color }: { currentXp: number; xpForNext: number; color: string }) {
  const pct = Math.min(100, (currentXp / xpForNext) * 100);
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          width: "100%",
          height: 8,
          borderRadius: 4,
          background: "rgba(148,163,184,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: `0 0 12px ${color}44`,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b" }}>
        <span>{Math.floor(currentXp)} / {xpForNext} XP</span>
      </div>
    </div>
  );
}

// ─── Click Simulator ────────────────────────────────────────────────────
function ClickSimulator({
  onXpGained,
  label,
  icon,
}: {
  onXpGained: (amount: number) => void;
  label: string;
  icon: string;
}) {
  const handleClick = useCallback(() => {
    onXpGained(Math.floor(Math.random() * 30) + 10);
  }, [onXpGained]);

  return (
    <button
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "10px 16px",
        borderRadius: 12,
        border: "1px solid rgba(148,163,184,0.15)",
        background: "rgba(30,41,59,0.5)",
        color: "#cbd5e1",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: 12,
        fontWeight: 600,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(245,158,11,0.12)";
        e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(30,41,59,0.5)";
        e.currentTarget.style.borderColor = "rgba(148,163,184,0.15)";
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </button>
  );
}

// ─── Sparkle animation keyframes ────────────────────────────────────────
const XP_KEYFRAMES_ID = "profile-xp-kf";

function injectXpKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(XP_KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = XP_KEYFRAMES_ID;
  style.textContent = `
    @keyframes xp-levelup {
      0% { transform: scale(1); }
      30% { transform: scale(1.2); }
      60% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    @keyframes xp-sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    @keyframes xp-fade-up {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
}

// ─── XP Float Text ──────────────────────────────────────────────────────
function XPFloat({ amount, color }: { amount: number; color: string }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setKey((k) => k + 1), 800);
    return () => clearTimeout(timer);
  }, [amount]);
  if (key === 0) return null;

  return (
    <span
      key={key}
      style={{
        position: "absolute",
        top: -8,
        right: -4,
        fontSize: 13,
        fontWeight: 700,
        color,
        animation: "xp-fade-up 0.8s ease-out forwards",
        pointerEvents: "none",
      }}
    >
      +{amount} XP
    </span>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────
interface ProfileProgressXPProps {
  /** Initial agent level for the demo. Default 1. */
  initialLevel?: number;
  /** Optional className */
  className?: string;
  /** Whether to show interactive click buttons */
  interactive?: boolean;
  /** Compact mode for hero sections */
  compact?: boolean;
}

export default function ProfileProgressXP({
  initialLevel = 1,
  className = "",
  interactive = true,
  compact = false,
}: ProfileProgressXPProps) {
  const [state, actions] = useLevelProgression(initialLevel);
  const [xp, setXp] = useState(0);
  const [floatText, setFloatText] = useState<{ amount: number; id: number } | null>(null);
  const [floatId, setFloatId] = useState(0);
  const [levelUpFlash, setLevelUpFlash] = useState(false);

  // Reset level on hover area — but the user can also click to gain XP
  const currentStage = getStage(state.level);
  const nextStage = getNextStage(state.level);
  const xpNeeded = xpForLevel(state.level);
  const nextMilestone = getNextMilestone(state.level);

  // Reset to initial if level resets
  useEffect(() => {
    injectXpKeyframes();
  }, []);

  const handleXpGained = useCallback(
    (amount: number) => {
      // Pass a function so addXp recalculates xpNeeded per level (correct multi-level-up carryover)
      const newXp = actions.addXp(amount, xp, (lvl: number) => xpForLevel(lvl));
      setXp(newXp);
      setFloatId((id) => id + 1);
      setFloatText({ amount, id: floatId + 1 });
    },
    [xp, actions, floatId]
  );

  // Detect level-up from the hook's previousLevel tracking
  const [prevLevel, setPrevLevel] = useState(state.level);
  useEffect(() => {
    if (state.level > prevLevel) {
      setLevelUpFlash(true);
      setTimeout(() => setLevelUpFlash(false), 600);
    }
    setPrevLevel(state.level);
  }, [state.level, prevLevel]);

  // Available abilities count
  const abilities = getAbilitiesForLevel(state.level);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: compact ? 12 : 20,
        padding: compact ? "20px 24px" : "28px 32px",
        borderRadius: 20,
        background: "rgba(15,23,42,0.8)",
        border: levelUpFlash
          ? "2px solid rgba(245,158,11,0.6)"
          : state.level >= 30
            ? "2px solid rgba(245,158,11,0.3)"
            : "1px solid rgba(148,163,184,0.12)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        transition: "border 0.3s ease",
      }}
    >
      {/* God-Tier Aura overlay at level 30+ */}
      {state.level >= 30 && (
        <GodTierAura level={state.level} size={compact ? 200 : 300} />
      )}

      {/* Level-up flash */}
      {levelUpFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 60%)",
            animation: "xp-levelup 0.6s ease-out",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ─── Header row ──────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Emoji stage icon */}
          <div
            style={{
              fontSize: compact ? 28 : 40,
              lineHeight: 1,
              animation: levelUpFlash ? "xp-levelup 0.6s ease-out" : undefined,
            }}
          >
            {currentStage.emoji}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: compact ? 16 : 20,
                fontWeight: 700,
                color: currentStage.color,
                transition: "color 0.3s ease",
              }}
            >
              {currentStage.label}
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Level {state.level} {nextStage ? `· Next: ${nextStage.label} (Lv ${nextStage.level})` : "· MAX LEVEL"}
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div
          style={{
            fontSize: compact ? 20 : 28,
            fontWeight: 800,
            color: state.level >= 30 ? "#f59e0b" : "#94a3b8",
            position: "relative",
          }}
        >
          {state.level >= 30 ? "👑" : state.level}
          {state.level >= 30 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -8,
                fontSize: 10,
                color: "#f59e0b",
              }}
            >
              ✦
            </span>
          )}
        </div>
      </div>

      {/* ─── XP Bar ──────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ position: "relative" }}>
          <XPBar currentXp={xp} xpForNext={xpNeeded} color={currentStage.color} />
          {floatText && (
            <XPFloat amount={floatText.amount} color={currentStage.color} />
          )}
        </div>

        {/* Stage progress dots */}
        <div
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          {TIERS.map((t) => (
            <div
              key={t.label}
              title={`${t.label} (Lv ${t.level})`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: state.level >= t.level ? t.color : "rgba(148,163,184,0.15)",
                transition: "all 0.3s ease",
                boxShadow: state.level >= t.level ? `0 0 4px ${t.color}66` : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Abilities unlocked (compact: collapsed) ─── */}
      {!compact && abilities.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          {abilities.slice(0, 6).map((a) => (
            <span
              key={a.id}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(245,158,11,0.1)",
                color: "#f59e0b",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              {a.icon} {a.name}
            </span>
          ))}
          {abilities.length > 6 && (
            <span style={{ fontSize: 11, color: "#64748b", padding: "3px 6px" }}>
              +{abilities.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* ─── Next milestone hint ─────────────────────── */}
      {nextMilestone && (
        <div
          style={{
            fontSize: 11,
            color: "#64748b",
            position: "relative",
            zIndex: 1,
          }}
        >
          Next ability milestone: Level {nextMilestone} —
          {getAbilitiesForLevel(nextMilestone)
            .filter((a) => a.minLevel === nextMilestone)
            .map((a) => `${a.icon} ${a.name}`)
            .join(", ")}
        </div>
      )}

      {/* ─── Interactive buttons ─────────────────────── */}
      {interactive && (
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <ClickSimulator
            onXpGained={handleXpGained}
            label="Task Complete"
            icon="✅"
          />
          <ClickSimulator
            onXpGained={(a) => handleXpGained(a * 2)}
            label="Skill Mastered"
            icon="⭐"
          />
          <button
            onClick={() => {
              actions.setLevel(1);
              setXp(0);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 16px",
              borderRadius: 12,
              border: "1px solid rgba(239,68,68,0.15)",
              background: "rgba(239,68,68,0.05)",
              color: "#f87171",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: 12,
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.12)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.05)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.15)";
            }}
          >
            <span style={{ fontSize: 18 }}>🔄</span>
            Reset
          </button>
        </div>
      )}

      {/* Interactive hint */}
      {interactive && nextStage && (
        <div
          style={{
            fontSize: 10,
            color: "#475569",
            position: "relative",
            zIndex: 1,
            marginTop: -4,
          }}
        >
          💡 Click to earn XP and level up through all 7 stages
        </div>
      )}
    </div>
  );
}
