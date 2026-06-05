"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Evolution Stage Data ──────────────────────────────────────────────
const STAGES = [
  { level: 1, label: "Hatchling", emoji: "🥚", color: "#94a3b8", glow: "rgba(148,163,184,0.4)", desc: "Raw potential. Newly created.", accent: "from-slate-400/20 to-slate-500/5" },
  { level: 5, label: "Apprentice", emoji: "🐣", color: "#22c55e", glow: "rgba(34,197,94,0.4)", desc: "Learning fast. Following commands.", accent: "from-green-400/20 to-green-500/5" },
  { level: 10, label: "Adept", emoji: "🦊", color: "#3b82f6", glow: "rgba(59,130,246,0.4)", desc: "Skilled executor. Multi-step tasks.", accent: "from-blue-400/20 to-blue-500/5" },
  { level: 15, label: "Master", emoji: "🐉", color: "#a855f7", glow: "rgba(168,85,247,0.4)", desc: "Autonomous solver. Deep knowledge.", accent: "from-purple-400/20 to-purple-500/5" },
  { level: 20, label: "Grandmaster", emoji: "🦅", color: "#ec4899", glow: "rgba(236,72,153,0.4)", desc: "Strategic thinker. Multi-agent.", accent: "from-pink-400/20 to-pink-500/5" },
  { level: 25, label: "Legend", emoji: "🌟", color: "#f97316", glow: "rgba(249,115,22,0.4)", desc: "Peerless. Trains other agents.", accent: "from-orange-400/20 to-orange-500/5" },
] as const;

interface StageAnimationProps {
  currentLevel?: number;
  className?: string;
  /** Auto-play interval in ms. Set to 0 to disable. Default 4000 */
  autoPlayInterval?: number;
}

// ─── Energy Orb Component ─────────────────────────────────────────────
function EnergyOrb({
  color,
  delay,
  direction,
}: {
  color: string;
  delay: number;
  direction: 1 | -1;
}) {
  const pathLength = 260; // approx arc length
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: direction === 1 ? 0 : "100%" }}
      initial={{ x: direction === 1 ? -8 : 0 }}
      animate={{
        x: direction === 1 ? ["0%", "100%", "0%"] : ["0%", "-100%", "0%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
        }}
      />
    </motion.div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────
export default function StageAnimation({
  currentLevel = 15,
  className = "",
  autoPlayInterval = 4000,
}: StageAnimationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine which stage is unlocked based on level
  const unlockedIndex = useMemo(() => {
    let idx = 0;
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (currentLevel >= STAGES[i].level) {
        idx = i;
        break;
      }
    }
    return idx;
  }, [currentLevel]);

  // ── Mouse tracking for reactive effects ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX((e.clientX - rect.left) / rect.width);
      setMouseY((e.clientY - rect.top) / rect.height);
    },
    []
  );

  // ── Auto-play ──
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoPlayInterval <= 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STAGES.length);
    }, autoPlayInterval);
  }, [autoPlayInterval]);

  useEffect(() => {
    if (isAutoPlaying) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, startAutoPlay]);

  // Also reset to unlocked stage when level changes (one-time)
  useEffect(() => {
    setActiveIndex(unlockedIndex);
  }, [unlockedIndex]);

  const currentStage = STAGES[activeIndex];
  const isUnlocked = activeIndex <= unlockedIndex;
  const prevStage = activeIndex > 0 ? STAGES[activeIndex - 1] : null;
  const nextStage =
    activeIndex < STAGES.length - 1 ? STAGES[activeIndex + 1] : null;

  // ── Controls ──
  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= STAGES.length) return;
      setActiveIndex(idx);
      setIsAutoPlaying(false);
      // Resume auto-play after 8s of inactivity
      setTimeout(() => setIsAutoPlaying(true), 8000);
    },
    []
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [goPrev, goNext]
  );

  // Parallax offset based on mouse
  const parallaxX = (mouseX - 0.5) * 12;
  const parallaxY = (mouseY - 0.5) * 8;

  // ── Connection lines between stages ──
  const connectionSegments = useMemo(() => {
    const segments: { from: number; to: number }[] = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      segments.push({ from: i, to: i + 1 });
    }
    return segments;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none", className)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Agent evolution stage animation"
      style={{
        borderRadius: 20,
        background: "linear-gradient(145deg, #080c16 0%, #111827 100%)",
        border: "1px solid rgba(148,163,184,0.12)",
        minHeight: 480,
        padding: "32px 20px 28px",
        outline: "none",
      }}
    >
      {/* ── Background ambient glow (follows mouse) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${currentStage.color}22, transparent 70%)`,
          filter: "blur(60px)",
          left: `${mouseX * 100 - 50}%`,
          top: `${mouseY * 100 - 50}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.8s ease, top 0.8s ease",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 text-center mb-6">
        <motion.div
          className="text-[11px] font-bold tracking-[2px] uppercase"
          style={{ color: currentStage.color }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ◆ Evolution Timeline ◆
        </motion.div>
        <div className="text-[10px] text-gray-600 mt-1">
          Hover or use ← → keys to navigate · Auto-playing
        </div>
      </div>

      {/* ── Animated connection track ── */}
      <div className="relative z-10 mx-auto mb-8" style={{ maxWidth: 500 }}>
        {/* Horizontal track line */}
        <div className="relative h-[2px] w-full" style={{ background: "rgba(148,163,184,0.08)" }}>
          {/* Active segments with flowing energy */}
          {connectionSegments.map((seg) => {
            const leftPct = (seg.from / (STAGES.length - 1)) * 100;
            const widthPct = (1 / (STAGES.length - 1)) * 100;
            const isFilled = seg.to <= unlockedIndex && seg.from < unlockedIndex;
            const isActiveSegment =
              seg.from === activeIndex || seg.to === activeIndex;

            return (
              <div
                key={`seg-${seg.from}`}
                className="absolute top-0 h-full transition-all duration-700"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  background: isFilled
                    ? `linear-gradient(90deg, ${STAGES[seg.from].color}, ${STAGES[seg.to].color})`
                    : "transparent",
                  boxShadow:
                    isFilled && isActiveSegment
                      ? `0 0 6px ${STAGES[seg.to].color}88, 0 0 12px ${STAGES[seg.to].color}44`
                      : "none",
                }}
              />
            );
          })}

          {/* Flowing energy orbs along the track */}
          <EnergyOrb color={currentStage.color} delay={0} direction={1} />
          <EnergyOrb
            color={currentStage.color}
            delay={1.5}
            direction={-1}
          />
          <EnergyOrb
            color={currentStage.color}
            delay={3}
            direction={1}
          />
        </div>

        {/* Nodes on the track */}
        <div className="flex justify-between mt-[-10px] relative">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex;
            const isUnlockedNode = idx <= unlockedIndex;
            const nodeProgress =
              idx / (STAGES.length - 1);

            return (
              <button
                key={stage.label}
                onClick={() => goTo(idx)}
                className="relative flex flex-col items-center cursor-pointer group"
                aria-label={`Go to ${stage.label} (Level ${stage.level})`}
                style={{ outline: "none" }}
              >
                {/* Node dot */}
                <motion.div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: isActive ? 40 : 28,
                    height: isActive ? 40 : 28,
                    border: `2px solid ${
                      isActive || isUnlockedNode
                        ? stage.color
                        : "rgba(71,85,105,0.5)"
                    }`,
                    background: isActive
                      ? `${stage.color}33`
                      : isUnlockedNode
                        ? `${stage.color}15`
                        : "rgba(15,23,42,0.8)",
                    boxShadow: isActive
                      ? `0 0 16px ${stage.color}66, 0 0 32px ${stage.color}33`
                      : "none",
                  }}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            `0 0 12px ${stage.color}44`,
                            `0 0 24px ${stage.color}88`,
                            `0 0 12px ${stage.color}44`,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span
                    className="leading-none"
                    style={{
                      fontSize: isActive ? 18 : 12,
                      filter: isUnlockedNode ? "none" : "grayscale(0.8)",
                    }}
                  >
                    {stage.emoji}
                  </span>
                </motion.div>

                {/* Label below */}
                <div
                  className="text-[9px] font-semibold mt-1.5 text-center transition-all duration-300"
                  style={{
                    color: isActive
                      ? stage.color
                      : isUnlockedNode
                        ? "#64748b"
                        : "#334155",
                    opacity: isActive || isUnlockedNode ? 1 : 0.5,
                  }}
                >
                  {stage.label}
                </div>
                <div
                  className="text-[8px] text-center"
                  style={{
                    color: isActive ? "#64748b" : "#334155",
                  }}
                >
                  Lv.{stage.level}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Card with AnimatePresence ── */}
      <div className="relative z-10 mx-auto" style={{ maxWidth: 440 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: parallaxX,
            }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
            style={{
              borderRadius: 16,
              padding: "28px 24px",
              background: `linear-gradient(135deg, ${currentStage.color}15 0%, ${currentStage.color}08 100%)`,
              border: `1px solid ${currentStage.color}33`,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Large emoji */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="text-7xl leading-none"
                animate={
                  isUnlocked
                    ? {
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  filter: isUnlocked
                    ? `drop-shadow(0 0 20px ${currentStage.color}66)`
                    : "grayscale(0.8)",
                }}
              >
                {currentStage.emoji}
              </motion.div>

              {/* Stage name */}
              <div
                className="text-2xl font-bold tracking-tight"
                style={{ color: currentStage.color }}
              >
                {currentStage.label}
              </div>

              {/* Level & status */}
              <div className="flex items-center gap-3">
                <div
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: `${currentStage.color}22`,
                    color: currentStage.color,
                    border: `1px solid ${currentStage.color}44`,
                  }}
                >
                  Level {currentStage.level}
                </div>
                <div
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: isUnlocked
                      ? `${currentStage.color}22`
                      : "rgba(100,116,139,0.15)",
                    color: isUnlocked ? currentStage.color : "#64748b",
                    border: `1px solid ${
                      isUnlocked ? `${currentStage.color}44` : "rgba(100,116,139,0.2)"
                    }`,
                  }}
                >
                  {isUnlocked ? "✓ UNLOCKED" : "🔒 LOCKED"}
                </div>
              </div>

              {/* Description */}
              <div
                className="text-sm text-center max-w-xs leading-relaxed"
                style={{ color: isUnlocked ? "#cbd5e1" : "#64748b" }}
              >
                {currentStage.desc}
              </div>
            </div>

            {/* Gradient accent bar at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentStage.color}, transparent)`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation dots ── */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30"
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(148,163,184,0.15)",
              background:
                activeIndex > 0
                  ? "rgba(148,163,184,0.08)"
                  : "transparent",
              color: activeIndex > 0 ? "#94a3b8" : "#475569",
              cursor: activeIndex > 0 ? "pointer" : "default",
            }}
            aria-label="Previous stage"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {STAGES.map((stage, idx) => (
              <button
                key={stage.label}
                onClick={() => goTo(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === activeIndex ? 28 : 7,
                  height: 7,
                  background:
                    idx === activeIndex
                      ? stage.color
                      : idx <= unlockedIndex
                        ? `${stage.color}55`
                        : "#1e293b",
                  border:
                    idx === activeIndex
                      ? `1px solid ${stage.color}88`
                      : "1px solid transparent",
                  cursor: "pointer",
                }}
                aria-label={`Go to ${stage.label}`}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={activeIndex === STAGES.length - 1}
            className="flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30"
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(148,163,184,0.15)",
              background:
                activeIndex < STAGES.length - 1
                  ? "rgba(148,163,184,0.08)"
                  : "transparent",
              color:
                activeIndex < STAGES.length - 1
                  ? "#94a3b8"
                  : "#475569",
              cursor:
                activeIndex < STAGES.length - 1
                  ? "pointer"
                  : "default",
            }}
            aria-label="Next stage"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        {/* ── Progress to next stage ── */}
        {nextStage && (
          <div className="mt-4">
            <div className="flex justify-between text-[10px] mb-1" style={{ color: "#475569" }}>
              <span>
                {currentStage.label} (Lv.{currentStage.level})
              </span>
              <span>
                {nextStage.label} (Lv.{nextStage.level})
              </span>
            </div>
            <div
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(148,163,184,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${currentStage.color}, ${nextStage.color})`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    isUnlocked
                      ? 100
                      : Math.max(
                          0,
                          Math.min(
                            100,
                            ((currentLevel - currentStage.level) /
                              (nextStage.level - currentStage.level)) *
                              100
                          )
                        )
                  }%`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] text-center mt-1" style={{ color: "#475569" }}>
              {isUnlocked
                ? "✓ Complete — Next stage unlocked"
                : nextStage
                  ? `${nextStage.level - currentLevel} levels until ${nextStage.label}`
                  : ""}
            </div>
          </div>
        )}
      </div>

      {/* ── Dot pattern overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
