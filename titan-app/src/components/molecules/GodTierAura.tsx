"use client";

import { type HTMLAttributes } from "react";

// ─── God-Tier Aura Overlay ──────────────────────────────────────────────
// Renders a golden radial gradient aura around an agent.
// Only activates when level >= 30.
// Uses pure Tailwind keyframe animations — no extra deps needed.

interface GodTierAuraProps extends HTMLAttributes<HTMLDivElement> {
  /** Current agent level. Aura only renders when level >= 30. */
  level: number;
  /** Optional diameter (px). Defaults to 280. */
  size?: number;
  /** Optional pulse speed in seconds. Defaults to 3. */
  pulseDuration?: number;
}

// Inject the @keyframes once via a style tag (idempotent).
const AURA_KEYFRAMES_ID = "god-tier-aura-keyframes";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(AURA_KEYFRAMES_ID)) return;

  const style = document.createElement("style");
  style.id = AURA_KEYFRAMES_ID;
  style.textContent = `
    @keyframes aura-pulse {
      0%, 100% {
        opacity: 0.5;
        transform: scale(1);
      }
      50% {
        opacity: 0.85;
        transform: scale(1.08);
      }
    }
    @keyframes aura-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes aura-shimmer {
      0%   { filter: hue-rotate(0deg) brightness(1); }
      50%  { filter: hue-rotate(12deg) brightness(1.15); }
      100% { filter: hue-rotate(0deg) brightness(1); }
    }
  `;
  document.head.appendChild(style);
}

export default function GodTierAura({
  level,
  size = 280,
  pulseDuration = 3,
  className = "",
  style,
  ...rest
}: GodTierAuraProps) {
  // Inject keyframes on first client render
  if (typeof window !== "undefined") {
    injectKeyframes();
  }

  // No aura below level 30
  if (level < 30) return null;

  const half = size / 2;
  const innerRingSize = size * 0.7;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {/* ── Outer radial glow ────────────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.35) 0%, rgba(20,184,166,0.15) 50%, transparent 75%)",
          animation: `aura-pulse ${pulseDuration}s ease-in-out infinite`,
        }}
      />

      {/* ── Inner golden ring ────────────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          width: innerRingSize,
          height: innerRingSize,
          borderColor: "rgba(245, 158, 11, 0.5)",
          boxShadow: "0 0 18px 4px rgba(245, 158, 11, 0.25)",
          animation: `aura-spin ${pulseDuration * 1.5}s linear infinite`,
        }}
      />

      {/* ── Outer teal ring ──────────────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderColor: "rgba(20, 184, 166, 0.3)",
          boxShadow: "0 0 12px 2px rgba(20, 184, 166, 0.15)",
          animation: `aura-spin ${pulseDuration * 2}s linear infinite reverse`,
        }}
      />

      {/* ── Particle sparkles (4 dots) ──────────────── */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * 90 * Math.PI) / 180;
        const radius = half * 0.75;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              left: `calc(50% + ${x}px - 3px)`,
              top: `calc(50% + ${y}px - 3px)`,
              background:
                i % 2 === 0
                  ? "rgba(245, 158, 11, 0.8)"
                  : "rgba(20, 184, 166, 0.7)",
              boxShadow: `0 0 8px 2px ${
                i % 2 === 0
                  ? "rgba(245, 158, 11, 0.5)"
                  : "rgba(20, 184, 166, 0.4)"
              }`,
              animation: `aura-shimmer ${pulseDuration}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}
