"use client";

import { useEffect, useState, useCallback } from "react";
import type { EvolutionStage } from "@/hooks/useProgression";

/**
 * RankUpCelebration — portal overlay that fires when the user reaches
 * a new rank threshold. Displays a particle burst, animated rank badge
 * transition, and a triumphant message.
 */

interface Props {
  /** The rank the user just achieved (should become currentStage) */
  achievedRank: EvolutionStage;
  /** Whether the user just crossed the rank threshold */
  show: boolean;
  /** Called after animation completes (3s)   */
  onComplete: () => void;
}

/* ─────────────────────────────────────────────────────────────
   Particle Explosion
   ───────────────────────────────────────────────────────────── */

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  life: number;
  delay: number;
}

function generateParticles(stageColor: string): Particle[] {
  const colors = stageColor
    .split(" ")
    .filter((s) => s.startsWith("from-") || s.startsWith("to-"))
    .map((s) => s.replace("from-", "").replace("to-", ""));

  const palette: string[] = [];
  for (const c of colors) {
    if (c.includes("gray")) palette.push("#9ca3af", "#d1d5db", "#e5e7eb");
    else if (c.includes("green")) palette.push("#34d399", "#6ee7b7", "#a7f3d0");
    else if (c.includes("blue")) palette.push("#60a5fa", "#93c5fd", "#bfdbfe");
    else if (c.includes("purple") || c.includes("fuchsia")) palette.push("#a78bfa", "#c4b5fd", "#e9d5ff");
    else if (c.includes("amber") || c.includes("orange")) palette.push("#fbbf24", "#fcd34d", "#fde68a");
    else if (c.includes("cyan")) palette.push("#22d3ee", "#67e8f9", "#a5f3fc");
    else palette.push("#22d3ee", "#a855f7", "#ffffff");
  }

  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 30,
    y: 50 + (Math.random() - 0.5) * 20,
    dx: (Math.random() - 0.5) * 12,
    dy: -(Math.random() * 14 + 4),
    size: Math.random() * 6 + 2,
    color: palette[Math.floor(Math.random() * palette.length)],
    life: 1,
    delay: i * 25,
  }));
}

/* ─────────────────────────────────────────────────────────────
   Particle Canvas Overlay
   ───────────────────────────────────────────────────────────── */

function ParticleBurst({ color }: { color: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setParticles(generateParticles(color));

    const fadeTimer = setTimeout(() => {
      setParticles((prev) => prev.map((p) => ({ ...p, life: 0 })));
    }, 200);

    const hideTimer = setTimeout(() => setVisible(false), 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [color]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.life,
              animation: `rankUpParticle 1.5s ease-out ${p.delay}ms forwards`,
              willChange: "transform, opacity",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────────── */

export default function RankUpCelebration({ achievedRank, show, onComplete }: Props) {
  const [stage, setStage] = useState<"entering" | "visible" | "exiting" | "hidden">("hidden");

  const dismiss = useCallback(() => {
    setStage("exiting");
    setTimeout(() => {
      setStage("hidden");
      onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    if (!show) {
      setStage("hidden");
      return;
    }

    setStage("entering");
    const enterTimer = setTimeout(() => setStage("visible"), 50);

    // Auto-dismiss after 3s
    const autoTimer = setTimeout(dismiss, 3000);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoTimer);
    };
  }, [show, dismiss]);

  // Keyboard dismiss
  useEffect(() => {
    if (stage !== "visible") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, dismiss]);

  if (stage === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label={`Rank up to ${achievedRank.rank}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          stage === "entering"
            ? "bg-black/0 backdrop-blur-none"
            : "bg-black/60 backdrop-blur-md"
        }`}
      />

      {/* Card */}
      <div
        className={`relative max-w-sm w-full mx-4 rounded-3xl overflow-hidden transition-all duration-500 ${
          stage === "entering"
            ? "scale-50 opacity-0"
            : stage === "visible"
              ? "scale-100 opacity-100"
              : "scale-110 opacity-0"
        }`}
      >
        {/* Particle burst */}
        <ParticleBurst color={achievedRank.color} />

        {/* Glow background */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${achievedRank.bgGradient}`}
        />

        {/* Content */}
        <div className="relative p-8 flex flex-col items-center gap-4 text-center">
          {/* Rank badge */}
          <div
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${achievedRank.color} flex items-center justify-center text-4xl shadow-2xl`}
            style={{
              animation: `rankUpBounce 0.6s ease-out, rankUpGlow 2s ease-in-out infinite`,
            }}
          >
            {achievedRank.avatarEmoji}
          </div>

          {/* Title */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
              Rank Up!
            </p>
            <h2 className={`text-3xl font-black ${achievedRank.accentColor}`}>
              {achievedRank.rank}-Rank
            </h2>
            <p className="text-lg font-bold text-white mt-1">
              {achievedRank.title}
            </p>
            <p className="text-xs text-white/40 mt-2 max-w-xs leading-relaxed">
              {achievedRank.flavour}
            </p>
          </div>

          {/* Abilities unlocked */}
          <div className="w-full">
            <p className="text-[9px] uppercase tracking-widest text-white/20 mb-2">
              Abilities Unlocked
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {achievedRank.abilities.slice(0, 4).map((a) => (
                <span
                  key={a}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${achievedRank.accentColor} bg-white/5 border border-white/10`}
                >
                  ◆ {a}
                </span>
              ))}
            </div>
          </div>

          {/* Dismiss */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="mt-2 px-6 py-2 rounded-xl bg-white/10 text-white/60 text-xs font-medium hover:bg-white/20 hover:text-white/90 transition-all"
          >
            Continue Journey
          </button>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes rankUpParticle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx, 60px), var(--dy, -80px)) scale(0);
            opacity: 0;
          }
        }
        @keyframes rankUpBounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes rankUpGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        }
      `}</style>
    </div>
  );
}
