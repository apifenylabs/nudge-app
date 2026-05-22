"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMascotStore } from "@/stores/mascotStore";
import { MASCOTS, type MascotDef } from "@/data/mascots";
import { Sparkles, ChevronRight, Star } from "lucide-react";

const RARITY_COLORS: Record<string, string> = {
  common: "from-slate-500/30 to-slate-600/20 border-slate-500/30",
  uncommon: "from-emerald-500/30 to-teal-600/20 border-emerald-500/30",
  rare: "from-amber-500/30 to-orange-600/20 border-amber-500/30",
  legendary: "from-yellow-400/40 to-amber-500/30 border-yellow-400/40",
};

const RARITY_GLOW: Record<string, string> = {
  common: "0 0 15px rgba(148,163,184,0.15)",
  uncommon: "0 0 20px rgba(16,185,129,0.2)",
  rare: "0 0 25px rgba(245,158,11,0.25)",
  legendary: "0 0 35px rgba(250,204,21,0.35)",
};

const RARITY_BADGE: Record<string, { bg: string; text: string }> = {
  common: { bg: "bg-slate-500/20", text: "text-slate-400" },
  uncommon: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  rare: { bg: "bg-amber-500/20", text: "text-amber-400" },
  legendary: { bg: "bg-yellow-400/20", text: "text-yellow-400" },
};

function MascotCard({
  mascot,
  isSelected,
  onSelect,
}: {
  mascot: MascotDef;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const rarityColor = RARITY_COLORS[mascot.rarity] ?? RARITY_COLORS.common;
  const glow = RARITY_GLOW[mascot.rarity] ?? RARITY_GLOW.common;
  const badge = RARITY_BADGE[mascot.rarity] ?? RARITY_BADGE.common;

  return (
    <motion.button
      onClick={onSelect}
      className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? `bg-gradient-to-b ${rarityColor} scale-105`
          : "bg-titan-surface/60 border-titan-border/20 hover:border-titan-teal/30 hover:bg-titan-teal/5"
      }`}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: isSelected ? glow : undefined,
      }}
    >
      {/* Rarity badge */}
      <span
        className={`absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-[7px] font-mono uppercase tracking-wider ${badge.bg} ${badge.text}`}
      >
        {mascot.rarity === "legendary" ? "✨" : mascot.rarity}
      </span>

      {/* Mascot image */}
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, ${mascot.colorTint}20, transparent 70%)`,
        }}
      >
        <Image
          src={mascot.image}
          alt={mascot.name}
          width={56}
          height={56}
          className="drop-shadow-lg"
          style={{ filter: `drop-shadow(0 0 8px ${mascot.colorTint}60)` }}
        />
      </div>

      {/* Name */}
      <span className="text-[10px] sm:text-xs font-mono font-medium text-titan-text truncate max-w-[80px]">
        {mascot.name}
      </span>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          className="absolute -inset-0.5 rounded-xl border-2 pointer-events-none"
          style={{ borderColor: mascot.colorTint, boxShadow: `0 0 12px ${mascot.colorTint}40` }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}
    </motion.button>
  );
}

export default function MascotPicker({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { currentMascot, setMascot, closePicker, completeOnboarding, hasCompletedOnboarding } = useMascotStore();

  // Show the current mascot large at top, with picker grid below
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Current mascot preview */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${currentMascot.colorTint}25, ${currentMascot.colorTint}10 50%, transparent 70%)`,
              boxShadow: `0 0 40px ${currentMascot.colorTint}30`,
            }}
          >
            <Image
              src={currentMascot.image}
              alt={currentMascot.name}
              width={112}
              height={112}
              className="drop-shadow-2xl"
              style={{ filter: `drop-shadow(0 0 20px ${currentMascot.colorTint}80)` }}
            />
          </div>
          {/* Name + rarity */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span
              className="px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold border"
              style={{
                background: `${currentMascot.colorTint}20`,
                borderColor: `${currentMascot.colorTint}40`,
                color: currentMascot.colorTint,
              }}
            >
              {currentMascot.name} {currentMascot.rarity === "legendary" ? "✨" : ""}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pick your companion heading */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold titan-text-gradient">
          {hasCompletedOnboarding ? "Choose Your Companion" : "Choose Your Titan Companion"}
        </h3>
        <p className="text-xs text-titan-muted/70 mt-1 font-mono">
          {hasCompletedOnboarding
            ? "Unlock a new look for your agent"
            : "This will be your personal AI mascot"}
        </p>
      </div>

      {/* Mascot grid */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {MASCOTS.map((mascot) => (
          <MascotCard
            key={mascot.id}
            mascot={mascot}
            isSelected={currentMascot.id === mascot.id}
            onSelect={() => setMascot(mascot.id)}
          />
        ))}
      </div>

      {/* Description */}
      <div className="text-center mb-4">
        <p className="text-[11px] text-titan-muted/60 font-mono italic">
          {currentMascot.description}
        </p>
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => {
          completeOnboarding();
          closePicker();
          onComplete?.();
        }}
        className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #14B8A6, #F59E0B)",
          color: "#0A0E17",
        }}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {hasCompletedOnboarding ? (
          <>
            Confirm Mascot
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        ) : (
          <>
            Confirm & Enter Ecosystem
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
