"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, Star } from "lucide-react";

interface XPBarProps {
  currentXp: number;
  maxXp: number;
  currentLevel: number;
  recentAchievements?: string[];
  onAchievementClick?: () => void;
}

function SparkleEffect({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: [0, 20, 40],
      }}
      transition={{ duration: 1.2, delay, repeat: Infinity, ease: "easeOut" }}
    >
      <Sparkles className="h-3 w-3 text-titan-golden" />
    </motion.div>
  );
}

export default function XPBar({
  currentXp,
  maxXp,
  currentLevel,
  recentAchievements = [],
  onAchievementClick,
}: XPBarProps) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(currentLevel);
  const [xpBarPulse, setXpBarPulse] = useState(false);
  const prevXpRef = useRef(currentXp);

  // Detect level-up
  useEffect(() => {
    if (currentLevel > prevLevel) {
      setShowLevelUp(true);
      setXpBarPulse(true);
      setPrevLevel(currentLevel);

      const pulseTimer = setTimeout(() => setXpBarPulse(false), 2000);
      const toastTimer = setTimeout(() => setShowLevelUp(false), 5000);

      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(toastTimer);
      };
    }
    // Also update prevLevel when it changes for other reasons
    setPrevLevel(currentLevel);
  }, [currentLevel, prevLevel]);

  // Pulse on XP gain
  useEffect(() => {
    if (currentXp > prevXpRef.current) {
      setXpBarPulse(true);
      const timer = setTimeout(() => setXpBarPulse(false), 1500);
      prevXpRef.current = currentXp;
      return () => clearTimeout(timer);
    }
    prevXpRef.current = currentXp;
  }, [currentXp]);

  const pct = Math.min((currentXp / maxXp) * 100, 100);

  return (
    <>
      {/* Level-up toast */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border"
              style={{
                background: "linear-gradient(135deg, rgba(212,160,23,0.15), rgba(14,165,165,0.08))",
                borderColor: "rgba(212,160,23,0.35)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(212,160,23,0.2)" }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Trophy className="h-5 w-5 text-amber-400" />
                </motion.div>
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#D4A017" }}>
                  Level Up! 🎉
                </p>
                <p className="text-xs font-mono" style={{ color: "#666666" }}>
                  Titan Core reached Lv.{currentLevel}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Bar with glow */}
      <div className="relative group">
        {/* BG track */}
        <div className="h-2 bg-[#E5E0D8]/60 rounded-full overflow-hidden relative">
          {/* Animated fill */}
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: "linear-gradient(90deg, #0EA5A5, #D4A017)",
              boxShadow: xpBarPulse
                ? "0 0 12px rgba(212,160,23,0.5), 0 0 24px rgba(14,165,165,0.3)"
                : "none",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated shimmer overlay */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Sparkle effects at progress points */}
          {pct > 25 && pct < 98 && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${pct}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-2.5 w-2.5 text-amber-300/70" />
            </motion.div>
          )}

          {/* Milestone markers */}
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${milestone}%`,
                background: pct >= milestone
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.08)",
              }}
            />
          ))}

          {/* Glow effects on hover */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(14,165,165,0.15), transparent)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* XP label */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px] font-mono tracking-wide" style={{ color: "#666666" }}>
            Lv.{currentLevel}
          </span>
          <span className="text-[9px] font-mono" style={{ color: "#666666" }}>
            {currentXp.toLocaleString()} / {maxXp.toLocaleString()} XP
          </span>
        </div>

        {/* Achievement badges */}
        {recentAchievements.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1">
            {recentAchievements.slice(0, 3).map((ach, i) => {
              const emojiMap: Record<string, string> = {
                "first-skill": "🏆",
                "first-audit": "🛡️",
                "gold-standard": "🌟",
                "swarm-master": "🌀",
                "xp-collector": "💎",
              };
              return (
                <motion.div
                  key={ach}
                  className="w-4 h-4 rounded-full flex items-center justify-center cursor-pointer text-[9px]"
                  style={{
                    background: "rgba(14,165,165,0.12)",
                    border: "1px solid rgba(14,165,165,0.2)",
                  }}
                  whileHover={{ scale: 1.3 }}
                  onClick={onAchievementClick}
                  title={ach}
                >
                  {emojiMap[ach] || "🏅"}
                </motion.div>
              );
            })}
            {recentAchievements.length > 3 && (
              <span className="text-[8px] font-mono" style={{ color: "#666666" }}>
                +{recentAchievements.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
