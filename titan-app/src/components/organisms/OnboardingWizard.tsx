"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Check, Bot, Sparkles, Zap,
  LayoutDashboard, Shield, SkipForward, PartyPopper,
  GitBranch, ChevronRight
} from "lucide-react";
import { useMascotStore } from "@/stores/mascotStore";
import MascotPicker from "@/components/molecules/MascotPicker";
import { STORAGE_KEYS } from "@/lib/persistence";

// ─── Step Definitions ───────────────────────────────────────────────────

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: "welcome",
    title: "Welcome to Titan",
    subtitle: "Your AI-powered agent builder with gamified progression",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "mascot",
    title: "Choose Your Companion",
    subtitle: "Pick a mascot that matches your vibe — they'll grow with you",
    icon: <Bot className="w-6 h-6" />,
  },
  {
    id: "dashboard",
    title: "Your Command Centre",
    subtitle: "Dashboard, agents, progression tree — everything in one place",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    id: "first-agent",
    title: "Create Your First Agent",
    subtitle: "Build an AI agent tuned to your workflow in seconds",
    icon: <Zap className="w-6 h-6" />,
  },
];

// ─── Progress Dots ──────────────────────────────────────────────────────

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-500 ${
            i === current
              ? "w-8 bg-emerald-500"
              : i < current
                ? "w-2 bg-emerald-400/60"
                : "w-2 bg-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Dashboard Preview Card ─────────────────────────────────────────────

function DashboardPreview() {
  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-zinc-700/50 bg-zinc-800/40 overflow-hidden shadow-xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700/50 bg-zinc-800/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-xs text-zinc-400 font-mono ml-2">Titan Dashboard</span>
      </div>
      {/* Preview content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 pb-2 border-b border-zinc-700/30">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="h-3 w-28 rounded bg-zinc-700/50" />
            <div className="h-2 w-20 rounded bg-zinc-700/30 mt-1.5" />
          </div>
          <div className="text-xs text-emerald-400 font-mono">LVL 1</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Agents", "Quests", "Stats"].map((label) => (
            <div key={label} className="rounded-lg bg-zinc-700/30 p-2.5 text-center">
              <div className="h-3 w-12 rounded bg-zinc-600/50 mx-auto" />
              <div className="text-[10px] text-zinc-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="h-16 rounded-lg bg-zinc-700/20 flex items-center justify-center">
          <p className="text-xs text-zinc-500">✦ Activity feed & progression</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Onboarding Wizard ─────────────────────────────────────────────

interface OnboardingWizardProps {
  /** If true, forces the wizard open even if already completed (for testing / re-run) */
  force?: boolean;
}

export default function OnboardingWizard({ force = false }: OnboardingWizardProps) {
  const router = useRouter();
  const {
    hasCompletedOnboarding,
    completeOnboarding,
    currentMascot,
  } = useMascotStore();

  const [stepIndex, setStepIndex] = useState(0);
  const [mascotChosen, setMascotChosen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isFirstAgentDismissed, setIsFirstAgentDismissed] = useState(false);

  const isVisible = force || !hasCompletedOnboarding;
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const isFirst = stepIndex === 0;
  const totalSteps = STEPS.length;

  // Mark mascot as chosen once user has picked one
  useEffect(() => {
    if (currentMascot.id !== "default" && currentMascot.name !== "Pixel") {
      setMascotChosen(true);
    }
  }, [currentMascot]);

  const handleNext = useCallback(() => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
    }
  }, [stepIndex, totalSteps]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  }, [stepIndex]);

  const handleFinish = useCallback(() => {
    setExiting(true);
    completeOnboarding();
    // Short delay for exit animation then redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  }, [completeOnboarding, router]);

  const handleSkip = useCallback(() => {
    setExiting(true);
    completeOnboarding();
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  }, [completeOnboarding, router]);

  const canProceed = useMemo(() => {
    if (step.id === "mascot") return mascotChosen;
    return true;
  }, [step.id, mascotChosen]);

  const handleDismissFirstAgent = useCallback(() => {
    setIsFirstAgentDismissed(true);
    handleFinish();
  }, [handleFinish]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {!exiting && (
        <motion.div
          key="onboarding-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-lg mx-4"
          >
            {/* Card */}
            <div
              className="relative rounded-2xl border shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #18181B 0%, #1C1917 50%, #18181B 100%)",
                borderColor: "rgba(16, 185, 129, 0.15)",
              }}
            >
              {/* Top gradient accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, #10B981, #34D399, #6EE7B7, #34D399, #10B981)",
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Step icon header */}
              <div className="relative pt-8 px-6 sm:px-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  {step.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {step.title}
                </h2>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  {step.subtitle}
                </p>
              </div>

              {/* Step content */}
              <div className="px-6 sm:px-8 py-6 min-h-[200px]">
                {step.id === "welcome" && (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2 text-sm text-zinc-400">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                        🎮 Gamified Progression
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs">
                        🤖 AI Agents
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                      Build, train, and deploy AI agents while leveling up your skills.
                      Complete missions, earn achievements, and unlock new capabilities.
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {[
                        { label: "Agents", value: "∞", color: "text-emerald-400" },
                        { label: "Skills", value: "12+", color: "text-amber-400" },
                        { label: "Tiers", value: "5", color: "text-purple-400" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl bg-zinc-800/60 border border-zinc-700/30 p-3"
                        >
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step.id === "mascot" && (
                  <div className="space-y-3">
                    <div className="text-xs text-zinc-500 text-center mb-2">
                      Your mascot evolves as you level up. Pick one to start.
                    </div>
                    <MascotPicker />
                    {!mascotChosen && (
                      <p className="text-xs text-amber-400/70 text-center mt-2">
                        Click a mascot above to select your companion
                      </p>
                    )}
                  </div>
                )}

                {step.id === "dashboard" && (
                  <div className="space-y-4">
                    <DashboardPreview />
                    <ul className="space-y-2 max-w-sm mx-auto">
                      {[
                        "📊 Real-time analytics & activity feed",
                        "🎯 Progression tree with skill unlocks",
                        "🧩 LifeOS plugin integration",
                        "🏆 Achievements & daily quests",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.id === "first-agent" && (
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20">
                      <Zap className="w-9 h-9 text-emerald-400" />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                      Your first agent can handle research, automate tasks, or
                      assist with coding — all configured through a simple form.
                    </p>
                    <p className="text-xs text-zinc-500">
                      You can set this up now or start exploring and come back later.
                    </p>
                  </div>
                )}
              </div>

              {/* Progress + Actions */}
              <div className="px-6 sm:px-8 pb-6 space-y-4">
                <ProgressDots current={stepIndex} total={totalSteps} />

                <div className="flex items-center gap-2 justify-center">
                  {isFirst ? (
                    <span className="text-xs text-zinc-600" />
                  ) : (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}

                  {isLast ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleFinish}
                        className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: "linear-gradient(135deg, #10B981, #059669)",
                        }}
                      >
                        <PartyPopper className="w-4 h-4" />
                        Let&apos;s Go!
                      </button>
                      <button
                        onClick={handleDismissFirstAgent}
                        className="px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/80 transition-colors"
                      >
                        Skip agent setup
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        canProceed
                          ? "text-white shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                          : "text-zinc-600 cursor-not-allowed"
                      }`}
                      style={
                        canProceed
                          ? { background: "linear-gradient(135deg, #10B981, #059669)" }
                          : { background: "#27272A" }
                      }
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Skip link */}
              <div className="px-6 sm:px-8 pb-4 text-center">
                <button
                  onClick={handleSkip}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors inline-flex items-center gap-1"
                >
                  <SkipForward className="w-3 h-3" />
                  Skip onboarding
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
