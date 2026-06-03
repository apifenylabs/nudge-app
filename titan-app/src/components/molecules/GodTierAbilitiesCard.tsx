"use client";

import { Lock, Sparkles, Crown, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { GodTierAbility } from "@/lib/swarm/god-tier-engine";

interface GodTierAbilitiesCardProps {
  /** Current agent level */
  currentLevel: number;
  /** Abilities unlocked so far */
  unlockedAbilities: GodTierAbility[];
  /** All possible god-tier abilities */
  allAbilities: GodTierAbility[];
}

/** Tier threshold UI helper */
const TIERS = [
  { level: 30, label: "God-Tier",    color: "#F59E0B", icon: Crown },
  { level: 40, label: "Transcendent", color: "#14B8A6", icon: Sparkles },
  { level: 50, label: "Ascended",     color: "#8B5CF6", icon: Eye },
] as const;

/**
 * GodTierAbilitiesCard — Aspirational preview of unlockable god-tier abilities.
 * Shows what abilities unlock at Lv.30, Lv.40, and Lv.50.
 * Locked tiers are greyed out; progress bar hints how far until next unlock.
 */
export default function GodTierAbilitiesCard({
  currentLevel,
  unlockedAbilities,
  allAbilities,
}: GodTierAbilitiesCardProps) {
  const nextTier = TIERS.find((t) => t.level > currentLevel);
  const pctToNext = nextTier
    ? Math.min(100, Math.round(((currentLevel % 10) / 10) * 100))
    : 100;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderColor: currentLevel >= 30 ? "rgba(245,158,11,0.3)" : "rgba(100,116,139,0.25)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "rgba(100,116,139,0.2)" }}
      >
        <div className="flex items-center gap-2">
          <Crown
            className="w-4 h-4"
            style={{ color: currentLevel >= 30 ? "#F59E0B" : "#64748B" }}
          />
          <span className="text-sm font-semibold text-white">God-Tier Abilities</span>
        </div>
        {currentLevel >= 30 && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.15)",
              color: "#F59E0B",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            Active
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Progress to next tier */}
        {nextTier && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400 font-medium">
                Next milestone: Lv.{nextTier.level} — {nextTier.label}
              </span>
              <span className="text-xs font-mono" style={{ color: nextTier.color }}>
                Lv.{currentLevel}/{nextTier.level}
              </span>
            </div>
            <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${nextTier.color}88, ${nextTier.color})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${pctToNext}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Tiers */}
        <div className="space-y-3">
          {TIERS.map((tier) => {
            const tierAbilities = allAbilities.filter((a) => a.minLevel === tier.level);
            const isUnlocked = currentLevel >= tier.level;
            const Icon = tier.icon;

            return (
              <div
                key={tier.level}
                className="rounded-lg p-3 transition"
                style={{
                  background: isUnlocked
                    ? `${tier.color}08`
                    : "rgba(100,116,139,0.06)",
                  border: `1px solid ${
                    isUnlocked
                      ? `${tier.color}20`
                      : "rgba(100,116,139,0.12)"
                  }`,
                  opacity: isUnlocked ? 1 : 0.6,
                }}
              >
                {/* Tier header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: isUnlocked ? tier.color : "#64748B" }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: isUnlocked ? tier.color : "#94A3B8" }}
                    >
                      Lv.{tier.level} — {tier.label}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                      style={{
                        background: `${tier.color}15`,
                        color: tier.color,
                      }}
                    >
                      {tierAbilities.length} unlocked
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600" />
                  )}
                </div>

                {/* Ability list */}
                <div className="grid grid-cols-1 gap-1">
                  {tierAbilities.map((ability) => {
                    const earned = isUnlocked && ability.earned;
                    return (
                      <div
                        key={ability.id}
                        className="flex items-center gap-2 text-[11px]"
                        style={{ color: earned ? "#E2E8F0" : "#64748B" }}
                      >
                        <span className="shrink-0">{ability.icon}</span>
                        <span className="font-medium truncate">
                          {ability.name}
                        </span>
                        <span className="truncate text-slate-500 ml-auto hidden sm:inline">
                          {ability.description}
                        </span>
                        {!isUnlocked && (
                          <Lock className="w-2.5 h-2.5 shrink-0 text-slate-600 ml-auto sm:ml-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stat */}
        {currentLevel >= 30 && (
          <div
            className="text-center pt-2 border-t text-xs font-mono"
            style={{
              borderColor: "rgba(100,116,139,0.15)",
              color: "#94A3B8",
            }}
          >
            {unlockedAbilities.length} / {allAbilities.length} god-tier abilities active
          </div>
        )}
      </div>
    </div>
  );
}
