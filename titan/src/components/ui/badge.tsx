"use client";

import { type HTMLAttributes } from "react";

// ─── Badge Component ─────────────────────────────────────────────────────
// Displays a level badge. At level 30+ renders a crown icon (👑).
// Supports multiple variants for different contexts.

type BadgeVariant = "default" | "small" | "large" | "pill";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Current agent level (controls crown unlock at 30+). */
  level: number;
  /** Display variant. */
  variant?: BadgeVariant;
  /** Optional custom label override (defaults to "Lv.{level}" or "👑 {level}"). */
  label?: string;
}

// ─── Crown Sparkle keyframes ──────────────────────────────────────────
const CROWN_KEYFRAMES_ID = "crown-badge-keyframes";

function injectCrownKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(CROWN_KEYFRAMES_ID)) return;

  const style = document.createElement("style");
  style.id = CROWN_KEYFRAMES_ID;
  style.textContent = `
    @keyframes crown-glow {
      0%, 100% {
        filter: drop-shadow(0 0 4px rgba(245,158,11,0.6))
                drop-shadow(0 0 8px rgba(245,158,11,0.3));
        transform: scale(1);
      }
      50% {
        filter: drop-shadow(0 0 8px rgba(245,158,11,0.9))
                drop-shadow(0 0 16px rgba(245,158,11,0.5));
        transform: scale(1.1);
      }
    }
    @keyframes crown-sparkle {
      0%   { opacity: 0; transform: translateY(0) scale(0.5); }
      50%  { opacity: 1; transform: translateY(-4px) scale(1); }
      100% { opacity: 0; transform: translateY(-8px) scale(0.5); }
    }
  `;
  document.head.appendChild(style);
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "px-2.5 py-0.5 text-xs font-semibold rounded-full",
  small: "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
  large: "px-4 py-1 text-sm font-bold rounded-xl",
  pill: "px-3 py-1 text-xs font-bold rounded-full",
};

const variantSizes: Record<BadgeVariant, { width: number; height: number }> = {
  default: { width: 18, height: 18 },
  small: { width: 14, height: 14 },
  large: { width: 24, height: 24 },
  pill: { width: 20, height: 20 },
};

export default function Badge({
  level,
  variant = "default",
  label,
  className = "",
  style,
  ...rest
}: BadgeProps) {
  if (typeof window !== "undefined") {
    injectCrownKeyframes();
  }

  const isGodTier = level >= 30;
  const displayText = label ?? (isGodTier ? `👑 ${level}` : `Lv.${level}`);

  const baseBg = isGodTier
    ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0F172A]"
    : "bg-[#1E2937] text-[#F1F5F9] border border-[#334155]";

  return (
    <span
      className={`inline-flex items-center gap-1 ${variantStyles[variant]} ${baseBg} ${className}`}
      style={{
        ...(isGodTier
          ? {
              animation: "crown-glow 2s ease-in-out infinite",
              boxShadow: "0 0 12px rgba(245, 158, 11, 0.4)",
            }
          : {}),
        ...style,
      }}
      {...rest}
    >
      {/* Crown sparkle particle (level 30+ only) */}
      {isGodTier && (
        <span
          aria-hidden="true"
          className="inline-block"
          style={{
            animation: "crown-sparkle 1.5s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        >
          ✦
        </span>
      )}
      {displayText}
    </span>
  );
}
