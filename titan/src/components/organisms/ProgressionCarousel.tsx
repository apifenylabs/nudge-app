"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

// ─── Progression Stage Data ─────────────────────────────────────────────
const PROGRESSION_TIERS = [
  { level: 1, emoji: "🥚", label: "Hatchling", color: "#94a3b8", desc: "Newly created. Raw potential, untrained." },
  { level: 5, emoji: "🐣", label: "Apprentice", color: "#22c55e", desc: "Learning basics. Starting to follow commands reliably." },
  { level: 10, emoji: "🦊", label: "Adept", color: "#3b82f6", desc: "Skilled executor. Handles complex multi-step tasks." },
  { level: 15, emoji: "🐉", label: "Master", color: "#a855f7", desc: "Deep domain knowledge. Solves novel problems autonomously." },
  { level: 20, emoji: "🦅", label: "Grandmaster", color: "#ec4899", desc: "Strategic thinker. Coordinates multi-agent workflows." },
  { level: 25, emoji: "🌟", label: "Legend", color: "#f97316", desc: "Peer among the best. Trains other agents." },
  { level: 30, emoji: "👑", label: "God-Tier", color: "#f59e0b", desc: "Transcendent. Full cosmic aura unlocked." },
];

interface ProgressionCarouselProps {
  /** Current agent level */
  currentLevel: number;
  /** Optional className */
  className?: string;
}

// ─── Inline keyframe injection ──────────────────────────────────────────
const CAROUSEL_KEYFRAMES_ID = "progression-carousel-kf";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(CAROUSEL_KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = CAROUSEL_KEYFRAMES_ID;
  style.textContent = `
    @keyframes prog-scale-in {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes prog-pulse-glow {
      0%, 100% { box-shadow: 0 0 8px rgba(245,158,11,0.3); }
      50% { box-shadow: 0 0 20px rgba(245,158,11,0.7); }
    }
    @keyframes prog-slide-left {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(-60px); opacity: 0; }
    }
    @keyframes prog-slide-right {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(60px); opacity: 0; }
    }
    .prog-card-current {
      animation: prog-scale-in 0.4s ease-out, prog-pulse-glow 2s ease-in-out infinite;
    }
    .prog-card-unlocked {
      filter: grayscale(0) brightness(1);
      transition: filter 0.3s ease;
    }
    .prog-card-locked {
      filter: grayscale(0.7) brightness(0.6);
      transition: filter 0.3s ease;
    }
    .prog-card-locked:hover {
      filter: grayscale(0.5) brightness(0.8);
    }
  `;
  document.head.appendChild(style);
}

// ─── Chevron SVG ────────────────────────────────────────────────────────
function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4l-6 6 6 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4l6 6-6 6" />
    </svg>
  );
}

// ─── Component ──────────────────────────────────────────────────────────
export default function ProgressionCarousel({
  currentLevel,
  className = "",
}: ProgressionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectKeyframes();
  }, []);

  // Auto-scroll to the stage matching current level on mount
  useEffect(() => {
    let bestIdx = 0;
    for (let i = PROGRESSION_TIERS.length - 1; i >= 0; i--) {
      if (currentLevel >= PROGRESSION_TIERS[i].level) {
        bestIdx = i;
        break;
      }
    }
    setActiveIndex(bestIdx);
  }, [currentLevel]);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    if (idx < 0 || idx >= PROGRESSION_TIERS.length) return;
    setActiveIndex(idx);
  }, [isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, [isAnimating]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => Math.min(PROGRESSION_TIERS.length - 1, prev + 1));
  }, [isAnimating]);

  const tier = PROGRESSION_TIERS[activeIndex];
  const isCurrent = currentLevel >= tier.level;
  const isGodTier = currentLevel >= 30;
  const maxLevelReached = PROGRESSION_TIERS.reduce((max, t) =>
    currentLevel >= t.level ? Math.max(max, t.level) : max, 0);

  // Calculate progress toward next tier
  const nextTierIdx = activeIndex + 1 < PROGRESSION_TIERS.length ? activeIndex + 1 : null;
  const nextTier = nextTierIdx !== null ? PROGRESSION_TIERS[nextTierIdx] : null;
  const progressStart = tier.level;
  const progressEnd = nextTier ? nextTier.level : currentLevel;
  const clampedLevel = Math.min(Math.max(currentLevel, progressStart), progressEnd);
  const progressPct = progressEnd > progressStart
    ? ((clampedLevel - progressStart) / (progressEnd - progressStart)) * 100
    : 100;

  // Watch for keyboard arrows (optional a11y)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  }, [goPrev, goNext]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="region"
      aria-label="Agent progression carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: "24px 16px",
        borderRadius: 16,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        border: "1px solid rgba(148,163,184,0.15)",
        userSelect: "none",
        outline: "none",
      }}
    >
      {/* ─── Header ───────────────────────────────────── */}
      <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>
        Progression
      </div>

      {/* ─── Main Card ─────────────────────────────────── */}
      <div
        className={isCurrent ? "prog-card-current" : "prog-card-locked"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: "24px 32px",
          borderRadius: 20,
          background: isCurrent
            ? `linear-gradient(135deg, ${tier.color}22 0%, ${tier.color}11 100%)`
            : "rgba(30,41,59,0.6)",
          border: isCurrent ? `2px solid ${tier.color}66` : "2px solid rgba(148,163,184,0.1)",
          minWidth: 240,
          transition: "all 0.4s ease",
        }}
      >
        {/* Emoji */}
        <div
          style={{
            fontSize: 72,
            lineHeight: 1,
            filter: isCurrent ? "none" : "grayscale(0.8)",
            transition: "filter 0.4s ease",
          }}
        >
          {tier.emoji}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: isCurrent ? tier.color : "#64748b",
            transition: "color 0.3s ease",
          }}
        >
          {tier.label}
        </div>

        {/* Level requirement */}
        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          Level {tier.level}{tier.level === 1 ? "+" : "+"}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 14,
            color: isCurrent ? "#cbd5e1" : "#64748b",
            textAlign: "center",
            maxWidth: 260,
            lineHeight: 1.5,
            minHeight: 42,
          }}
        >
          {tier.desc}
        </div>

        {/* Unlocked / Locked badge */}
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 14px",
            borderRadius: 999,
            background: isCurrent
              ? `${tier.color}33`
              : "rgba(100,116,139,0.2)",
            color: isCurrent ? tier.color : "#64748b",
          }}
        >
          {isCurrent ? "✓ UNLOCKED" : "🔒 LOCKED"}
        </div>
      </div>

      {/* ─── Progress bar ──────────────────────────────── */}
      {nextTier && (
        <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b" }}>
            <span>Level {tier.level} ({tier.label})</span>
            <span>Level {nextTier.level} ({nextTier.label})</span>
          </div>
          <div
            style={{
              width: "100%",
              height: 6,
              borderRadius: 3,
              background: "rgba(148,163,184,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(100, progressPct)}%`,
                height: "100%",
                borderRadius: 3,
                background: isCurrent
                  ? `linear-gradient(90deg, ${tier.color}, ${nextTier.color})`
                  : "#475569",
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div style={{ fontSize: 11, color: "#64748b", textAlign: "center" }}>
            {currentLevel >= nextTier.level
              ? "Maxed this tier! 🎉"
              : `${nextTier.level - currentLevel} levels until ${nextTier.label}`}
          </div>
        </div>
      )}

      {/* ─── Carousel Controls ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 4,
        }}
      >
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous tier"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,0.2)",
            background: activeIndex === 0 ? "transparent" : "rgba(148,163,184,0.1)",
            color: activeIndex === 0 ? "#475569" : "#94a3b8",
            cursor: activeIndex === 0 ? "default" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <ChevronLeft />
        </button>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {PROGRESSION_TIERS.map((t, idx) => (
            <button
              key={t.label}
              onClick={() => goTo(idx)}
              aria-label={`Go to ${t.label} (Level ${t.level})`}
              style={{
                width: idx === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background:
                  idx === activeIndex
                    ? PROGRESSION_TIERS[activeIndex].color
                    : currentLevel >= t.level
                      ? PROGRESSION_TIERS[activeIndex].color + "44"
                      : "#334155",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={activeIndex === PROGRESSION_TIERS.length - 1}
          aria-label="Next tier"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(148,163,184,0.2)",
            background: activeIndex === PROGRESSION_TIERS.length - 1 ? "transparent" : "rgba(148,163,184,0.1)",
            color: activeIndex === PROGRESSION_TIERS.length - 1 ? "#475569" : "#94a3b8",
            cursor: activeIndex === PROGRESSION_TIERS.length - 1 ? "default" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <ChevronRight />
        </button>
      </div>

      {/* ─── Keyboard hint ─────────────────────────────── */}
      <div style={{ fontSize: 10, color: "#475569" }}>
        Use ← → arrow keys to navigate
      </div>

      {/* ─── God-Tier note ─────────────────────────────── */}
      {isGodTier && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#f59e0b",
            background: "rgba(245,158,11,0.1)",
            padding: "8px 20px",
            borderRadius: 999,
            animation: "prog-pulse-glow 2s ease-in-out infinite",
          }}
        >
          👑 God-Tier Unlocked — Full cosmic aura active
        </div>
      )}
    </div>
  );
}
