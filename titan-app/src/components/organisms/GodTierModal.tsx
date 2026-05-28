"use client";

import React, { useEffect, useState } from "react";

interface GodTierModalProps {
  open: boolean;
  onClose: () => void;
  level: number;
}

/** Random particle burst effect for the celebration screen */
function ParticleBurst({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    color: [
      "#F59E0B",
      "#14B8A6",
      "#FCD34D",
      "#FDE68A",
      "#fff",
    ][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => {
        const dx = `${(Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50)}px`;
        const dy = `${(Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50)}px`;
        return (
          <div
            key={p.id}
            className="absolute rounded-full opacity-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              animation: `godTierParticle ${p.duration}s ${p.delay}s ease-out forwards`,
              ["--dx" as string]: dx,
              ["--dy" as string]: dy,
            }}
          />
        );
      })}
    </div>
  );
}

export default function GodTierModal({
  open,
  onClose,
  level,
}: GodTierModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const id = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ animation: "godTierFadeIn 0.3s ease-out" }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        className="relative w-[90%] max-w-[380px] overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "2px solid rgba(245, 158, 11, 0.4)",
          boxShadow:
            "0 0 60px rgba(245, 158, 11, 0.2), 0 0 120px rgba(20, 184, 166, 0.1)",
          animation: "godTierScaleIn 0.4s ease-out",
        }}
      >
        <ParticleBurst count={24} />

        <div className="relative z-10">
          <div
            className="mb-2 text-6xl"
            style={{ animation: "godTierBounce 0.6s ease-out" }}
          >
            👑
          </div>
          <div className="mb-1 text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Ascension Complete
          </div>
          <div className="mb-2 text-3xl font-extrabold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
            GOD-TIER
          </div>
          <div className="mb-3 text-base font-bold text-amber-300">
            Level {level}
          </div>
          <div className="mb-5 text-sm leading-relaxed text-slate-400">
            You have transcended mortal limits. The crown is yours &mdash; wear
            it with glory. Your mascot now emanates god-tier power.
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 text-sm font-bold text-[#1a1a2e] shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40"
          >
            RISE 👑
          </button>
        </div>
      </div>

      <style>{`
        @keyframes godTierFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes godTierScaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes godTierBounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes godTierParticle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(0);
          }
        }
      `}</style>
    </div>
  );
}
