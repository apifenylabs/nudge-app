"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedStatBar from "@/components/AnimatedStatBar";
import { EVOLUTION_STAGES, useProgression, type EvolutionStage } from "@/hooks/useProgression";

/* ─────────────────────────────────────────────────────────────
   TOUR STEPS — Tutorial Onboarding Overlay
   ───────────────────────────────────────────────────────────── */

interface TourStep {
  target: string;   // logical zone id
  title: string;
  body: string;
  position: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "evolution-carousel",
    title: "Evolution Stages",
    body: "Swipe left or right to explore each evolution stage from E-Rank Novice to S-Rank Sovereign. Each stage unlocks new powers.",
    position: "bottom",
  },
  {
    target: "rank-avatar",
    title: "Agent Avatar & Stats",
    body: "Each rank has a unique avatar with four core stats: Strength, Intelligence, Agility, and Arcana. Watch them grow as you ascend.",
    position: "right",
  },
  {
    target: "abilities-panel",
    title: "Unlockable Abilities",
    body: "As you rank up, new abilities become available. From basic prompting to autonomous agent armies — every rank adds new tools to your arsenal.",
    position: "left",
  },
  {
    target: "cta-jump",
    title: "Ready to Ascend?",
    body: "Jump directly into the Agent Studio to start building at any rank. Your progression is saved as you earn XP through agent creation.",
    position: "top",
  },
];

/* ─────────────────────────────────────────────────────────────
   TUTORIAL ONBOARDING OVERLAY
   ───────────────────────────────────────────────────────────── */

function TutorialOverlay({
  steps,
  onComplete,
}: {
  steps: TourStep[];
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const step = steps[currentStep];

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setVisible(false);
      setTimeout(onComplete, 300);
    }
  }, [currentStep, steps.length, onComplete]);

  const handleSkip = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  // Keyboard nav
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, handleNext, handleSkip]);

  // Track target element position
  useEffect(() => {
    if (!visible) return;
    const targetId = step.target === "evolution-carousel"
      ? "evolution-carousel"
      : step.target === "rank-avatar"
      ? "rank-avatar"
      : step.target === "abilities-panel"
      ? "abilities-panel"
      : step.target === "cta-jump"
      ? "cta-jump"
      : null;

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      }
    } else {
      setTargetRect(null);
    }

    const onScroll = () => {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) setTargetRect(el.getBoundingClientRect());
      }
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [visible, currentStep, step.target]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Semi-transparent overlay with cutout */}
      {targetRect && (() => {
        // We create a full-screen overlay with a "window pane" effect
        // where the target element is visible through the cutout
        const pad = 8;
        const clipTop = Math.max(0, targetRect.top - pad);
        const clipLeft = Math.max(0, targetRect.left - pad);
        const clipRight = Math.min(window.innerWidth, targetRect.right + pad);
        const clipBottom = Math.min(window.innerHeight, targetRect.bottom + pad);

        const polygon = [
          `0 0`,
          `${window.innerWidth}px 0`,
          `${window.innerWidth}px ${window.innerHeight}px`,
          `0 ${window.innerHeight}px`,
          `0 0`,
          `${clipLeft}px ${clipTop}px`,
          `${clipRight}px ${clipTop}px`,
          `${clipRight}px ${clipBottom}px`,
          `${clipLeft}px ${clipBottom}px`,
          `${clipLeft}px ${clipTop}px`,
        ].join(", ");

        const clipPath = `polygon(${polygon})`;

        return (
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              clipPath,
            }}
          />
        );
      })()}

      {/* Highlight glow around the target */}
      {targetRect && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: targetRect.left - 12,
            top: targetRect.top - 12,
            width: targetRect.width + 24,
            height: targetRect.height + 24,
            border: "2px solid rgba(34, 211, 238, 0.5)",
            borderRadius: 16,
            boxShadow: "0 0 24px rgba(34, 211, 238, 0.25), 0 0 64px rgba(34, 211, 238, 0.1)",
            zIndex: 61,
            animation: "pulse-border 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Tooltip card */}
      <div className="relative max-w-md w-full mx-4 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 animate-in fade-in zoom-in-95 duration-300 z-[62]">
        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-6 bg-cyan-400"
                  : i < currentStep
                  ? "w-1.5 bg-cyan-400/40"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">
              {currentStep + 1}
            </span>
            <h3 className="text-sm font-bold text-white">{step.title}</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed ml-8">{step.body}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium border border-white/10 text-white/50 hover:border-white/30 hover:text-white/70 transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              {currentStep < steps.length - 1 ? "Next" : "Done 🎉"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EVOLUTION CAROUSEL — Swipeable Stage Cards
   ───────────────────────────────────────────────────────────── */

function StatBar({ label, value, max, color, index }: { label: string; value: number; max: number; color: string; index: number }) {
  return (
    <AnimatedStatBar
      label={label}
      value={value}
      max={max}
      color={color}
      delay={index * 150}
    />
  );
}

function EvolutionCard({
  stage,
  active,
  index,
}: {
  stage: EvolutionStage;
  active: boolean;
  index: number;
}) {
  return (
    <div
      id={`stage-${stage.rank}`}
      className={`shrink-0 w-full px-2 transition-all duration-500 ${
        active ? "opacity-100 scale-100" : "opacity-40 scale-[0.92] blur-[1px]"
      }`}
      style={{ scrollSnapAlign: "center" }}
      aria-label={`${stage.rank}-Rank: ${stage.title}`}
    >
      <div className={`relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b ${stage.bgGradient}`}>
        {/* Rank badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-lg font-black ${stage.accentColor}`}>
            {stage.rank}
          </span>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${stage.color.replace('from-', '').split(' ')[0] || '#fff'}, transparent)` }}
        />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <div
              id="rank-avatar"
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-3xl shadow-lg shrink-0`}
            >
              {stage.avatarEmoji}
            </div>
            <div className="pt-1">
              <h2 className="text-2xl font-black text-white">{stage.title}</h2>
              <p className={`text-sm font-semibold ${stage.accentColor}`}>{stage.subtitle}</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">{stage.avatarDesc}</p>
            </div>
          </div>

          {/* Stats */}
          <div id="abilities-panel" className="mb-6 space-y-2">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Core Stats</p>
            {stage.stats.map((s, si) => (
              <StatBar
                key={s.label}
                label={s.label}
                value={s.value}
                max={s.max}
                color={stage.color}
                index={si}
              />
            ))}
          </div>

          {/* Abilities */}
          <div className="mb-6">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Unlocked Abilities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.abilities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5"
                >
                  <span className={`text-[8px] ${stage.accentColor}`}>◆</span>
                  <span className="text-xs text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* XP requirement */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">XP to unlock:</span>
              <span className={`text-xs font-mono font-bold ${stage.accentColor}`}>
                {stage.xpRequired.toLocaleString()} XP
              </span>
            </div>
            {/* Flavour text */}
            <p className="text-[9px] text-slate-600 italic max-w-[200px] text-right leading-tight">
              {stage.flavour}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVIGATION DOTS
   ───────────────────────────────────────────────────────────── */

function CarouselDots({
  total,
  active,
  onChange,
  colors,
}: {
  total: number;
  active: number;
  onChange: (i: number) => void;
  colors: string[];
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`transition-all duration-300 ${
            i === active
              ? "w-8 h-2 rounded-full"
              : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/40"
          }`}
          style={
            i === active
              ? { background: `linear-gradient(90deg, ${colors[i] || '#22d3ee'}, ${colors[Math.min(i + 1, colors.length - 1)] || '#a855f7'})` }
              : {}
          }
          aria-label={`Go to ${EVOLUTION_STAGES[i].rank}-Rank`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function ProgressionPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Connected progression data — falls back to mock when Supabase is unconfigured
  const progression = useProgression();

  useEffect(() => setMounted(true), []);

  // Check if tutorial has been seen (localStorage)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("titan-progression-tour-seen");
    if (!seen) {
      // Small delay so the page renders first
      const t = setTimeout(() => setShowTutorial(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleTourComplete = useCallback(() => {
    localStorage.setItem("titan-progression-tour-seen", "true");
    setShowTutorial(false);
  }, []);

  const goTo = useCallback((i: number) => {
    setActiveIndex(Math.max(0, Math.min(i, EVOLUTION_STAGES.length - 1)));
    const el = carouselRef.current;
    if (el) {
      const card = el.children[i] as HTMLElement;
      if (card) card.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, []);

  // Intersection Observer for active detection during swipe
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Array.from(el.children).indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActiveIndex(idx);
          }
        }
      },
      { root: el, threshold: [0.6] }
    );

    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [mounted]);

  // Keyboard arrows
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showTutorial) return;
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, showTutorial, goTo]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 60) {
      if (delta > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  };

  if (!mounted) return null;

  const colors = EVOLUTION_STAGES.map((s) => {
    const c = s.color.split(" ")[0]?.replace("from-", "") || "#22d3ee";
    return c;
  });

  return (
    <>
      {/* Tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay steps={TOUR_STEPS} onComplete={handleTourComplete} />
      )}

      <div className="min-h-screen bg-gray-950 flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-3 bg-gray-900/50 border-b border-white/10">
          <a href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <span className="text-lg">⚔️</span>
            <span className="font-bold text-sm">Titan</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/features" className="text-[11px] text-white/40 hover:text-white/70">Features</a>
            <a href="/sandbox" className="text-[11px] text-white/40 hover:text-white/70">Agent Studio</a>
            <a href="/pricing" className="text-[11px] text-white/40 hover:text-white/70">Pricing</a>
            <span
              onClick={() => setShowTutorial(true)}
              className="text-[11px] text-cyan-400/60 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              Help
            </span>
          </div>
        </nav>

        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] text-cyan-400 mb-4 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Progression System
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
              Evolution <span className="text-gradient">Stages</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Every hunter evolves. Swipe through the ranks and see what powers await at each stage of your ascension.
            </p>
          </div>
        </div>

        {/* Profile Summary — live from API or mock fallback */}
        {progression && !progression.loading && progression.profile && (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 mb-6">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              {/* Current rank badge */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${progression.currentStage.color} flex items-center justify-center text-xl font-black shadow-lg shrink-0`}>
                {progression.currentStage.avatarEmoji}
              </div>
              {/* Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-bold ${progression.currentStage.accentColor}`}>
                    {progression.currentStage.title}
                  </span>
                  <span className="text-xs text-white/30">[{progression.currentStage.rank}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40">{progression.profile.display_name || 'Hunter'}</span>
                  <span className="text-[8px] text-white/20">·</span>
                  <span className="text-[10px] text-white/30">{progression.profile.total_xp.toLocaleString()} XP</span>
                </div>
                {/* XP bar */}
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${progression.currentStage.color} transition-all duration-700`}
                      style={{ width: `${Math.round(progression.xpProgress * 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-white/30 tabular-nums">
                    {progression.xpInRank.toLocaleString()} / {progression.nextStage ? (progression.nextStage.xpRequired - progression.currentStage.xpRequired).toLocaleString() : 'MAX'}
                  </span>
                </div>
              </div>
              {/* Connection status */}
              {progression.error && (
                <span className="text-[8px] text-amber-500/50 shrink-0" title={progression.error}>
                  demo mode
                </span>
              )}
            </div>
          </div>
        )}

        {/* Carousel */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 pb-8">
          {/* Rank tabs (desktop) */}
          <div className="hidden sm:flex items-center justify-center gap-2 mb-6">
            {EVOLUTION_STAGES.map((stage, i) => (
              <button
                key={stage.rank}
                onClick={() => goTo(i)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  i === activeIndex
                    ? `bg-gradient-to-r ${stage.color} text-white shadow-lg scale-110`
                    : "bg-white/5 text-white/40 border border-white/10 hover:border-white/30"
                }`}
              >
                {stage.rank} &middot; {stage.title}
              </button>
            ))}
          </div>

          {/* Swipeable cards */}
          <div
            id="evolution-carousel"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {EVOLUTION_STAGES.map((stage, i) => (
              <div key={stage.rank} className="min-w-[320px] sm:min-w-[500px] lg:min-w-[600px] snap-center">
                <EvolutionCard stage={stage} active={i === activeIndex} index={i} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <CarouselDots
            total={EVOLUTION_STAGES.length}
            active={activeIndex}
            onChange={goTo}
            colors={colors}
          />

          {/* CTA */}
          <div id="cta-jump" className="flex items-center justify-center gap-4 mt-8">
            <a
              href="/sandbox"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
            >
              Start Building in Agent Studio →
            </a>
            <a
              href="/features"
              className="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-semibold hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              View All Features
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/5 bg-gray-900/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-[10px] text-white/20">
              Titan Evolution System &mdash; 6 stages from Novice to Sovereign
            </p>
            <p className="text-[10px] text-white/10">v0.4.0 &middot; Progression Carousel + Tutorial</p>
          </div>
        </footer>
      </div>
    </>
  );
}
