"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMascotStore } from "@/stores/mascotStore";
import type { MascotDef } from "@/data/mascots";
import GodTierAura from "./GodTierAura";

interface MascotDisplayProps {
  size?: number;
  showName?: boolean;
  showLevel?: boolean;
  level?: number;
  showSparkles?: boolean;
  glowMultiplier?: number;
  onClick?: () => void;
  className?: string;
}

// Track pointer for eye-follow effect (optional CSS-only eye movement)
export default function MascotDisplay({
  size = 120,
  showName = false,
  showLevel = false,
  level = 1,
  showSparkles = true,
  glowMultiplier = 1,
  onClick,
  className = "",
}: MascotDisplayProps) {
  const { currentMascot, openPicker } = useMascotStore();
  const [isHovered, setIsHovered] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const glowSize = size * 1.8;
  const sparkleCount = useMemo(() => {
    const base = currentMascot.sparkleCount;
    // Scale sparkles by level (more sparkles at higher levels)
    const levelBonus = Math.floor(level / 5) * 2;
    return Math.min(base + levelBonus, 32);
  }, [currentMascot.sparkleCount, level]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setPointerPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPointerPos({ x: 0, y: 0 });
  }, []);

  // Hover animation variant based on mascot type
  const hoverAnimation = useMemo(() => {
    if (!isHovered) return {};
    switch (currentMascot.hoverAnimation) {
      case "wave":
        return { rotate: [0, -5, 5, -3, 3, 0], scale: 1.04 };
      case "bounce":
        return { y: [0, -8, 0], scale: [1, 1.03, 1] };
      case "spin":
        return { rotate: [0, 5, -5, 3, -3, 0], scale: 1.04 };
      case "pulse":
        return { scale: [1, 1.06, 1] };
      case "excited":
        return { y: [0, -6, 0], scale: [1, 1.04, 1], rotate: [0, 3, -3, 0] };
      default:
        return { scale: 1.03 };
    }
  }, [isHovered, currentMascot.hoverAnimation]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center gap-1.5 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick ?? openPicker}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...hoverAnimation,
      }}
      transition={{
        duration: isHovered ? 0.6 : 0.4,
        ease: "easeInOut",
      }}
    >
      {/* God-Tier aura (level >= 30) */}
      <GodTierAura level={level} size={glowSize * 1.3} pulseDuration={3} />

      {/* Outer glow aura */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${currentMascot.colorTint}18 0%, transparent 65%)`,
          filter: `blur(${isHovered ? 16 : 8}px)`,
        }}
        animate={{
          opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
          scale: isHovered ? [1, 1.08, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: isHovered ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mascot image container */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
        }}
        animate={
          !isHovered
            ? { y: [0, -3, 0] }
            : {}
        }
        transition={
          !isHovered
            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(circle, ${currentMascot.colorTint}20, transparent 70%)`,
            boxShadow: isHovered
              ? `0 0 ${30 * glowMultiplier}px ${currentMascot.colorTint}40`
              : `0 0 ${15 * glowMultiplier}px ${currentMascot.colorTint}20`,
          }}
        >
          <Image
            src={currentMascot.image}
            alt={currentMascot.name}
            width={size * 0.85}
            height={size * 0.85}
            className="drop-shadow-xl transition-transform duration-300"
            style={{
              filter: `drop-shadow(0 0 ${isHovered ? 16 : 8}px ${currentMascot.colorTint}80)`,
              transform: isHovered
                ? `translate(${pointerPos.x * 3}px, ${pointerPos.y * 2}px)`
                : "translate(0, 0)",
            }}
          />
        </div>

        {/* Overlay glow ring on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 pointer-events-none"
            style={{ borderColor: `${currentMascot.colorTint}50` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Sparkle particles (visible on hover or always if showSparkles) */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {Array.from({ length: Math.ceil(sparkleCount / 3) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 80}%`,
                background: currentMascot.colorTint,
                opacity: 0,
                boxShadow: `0 0 ${4 + Math.random() * 6}px ${currentMascot.colorTint}`,
              }}
              animate={
                isHovered
                  ? {
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.2, 0],
                      y: [0, -10 - Math.random() * 15],
                    }
                  : { opacity: [0, 0.3, 0] }
              }
              transition={{
                duration: 1 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Name label */}
      {showName && (
        <motion.span
          className="text-xs font-mono text-titan-text/80 truncate max-w-[120px] text-center"
          animate={isHovered ? { color: currentMascot.colorTint } : {}}
        >
          {currentMascot.name}
        </motion.span>
      )}

      {/* Level badge */}
      {showLevel && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={isHovered ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <span
            className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border"
            style={{
              background: `linear-gradient(135deg, ${currentMascot.colorTint}30, transparent)`,
              borderColor: `${currentMascot.colorTint}40`,
              color: currentMascot.colorTint,
            }}
          >
            Lv{level}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Standalone Modal Picker Trigger ──────────────────────────────────

export function MascotPickerModal() {
  const { isPickerOpen, closePicker, currentMascot } = useMascotStore();

  // Lazy-load MascotPicker inside modal
  const [MascotPickerInner, setMascotPickerInner] = useState<React.ComponentType<{ onComplete?: () => void }> | null>(null);

  useEffect(() => {
    if (isPickerOpen && !MascotPickerInner) {
      import("./MascotPicker").then((mod) => setMascotPickerInner(() => mod.default));
    }
  }, [isPickerOpen, MascotPickerInner]);

  return (
    <AnimatePresence>
      {isPickerOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePicker}
          />

          {/* Modal */}
          {MascotPickerInner && (
            <motion.div
              className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border p-5 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #0F172A, #1E2937)",
                borderColor: `${currentMascot.colorTint}30`,
              }}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
            >
              <MascotPickerInner
                onComplete={() => {
                  // Modal already closed by MascotPicker internal logic
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
