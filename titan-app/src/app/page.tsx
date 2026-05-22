"use client";

import { useState, useCallback, useMemo, useEffect, useRef, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Bot, Shield, TrendingUp, Orbit, Rocket, Zap,
  Trophy, Settings, ChevronRight, Users, Cpu, Star, Sparkles, Puzzle, CheckCircle,
  Sun, Moon, Monitor, Cuboid, Save, Download, GripVertical, Play, Lightbulb,
  Palette,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

// Supabase client functions (imported lazily to handle missing tables)
import { createSkill, updateSkill, getSkills, saveOrchestration } from "@/lib/db/supabase-client";
import LifeOSTab from "@/components/LifeOSTab";
import MascotDisplay, { MascotPickerModal } from "@/components/molecules/MascotDisplay";
import MascotPicker from "@/components/molecules/MascotPicker";
import HomeDashboard from "@/components/molecules/HomeDashboard";
import { useMascotStore } from "@/stores/mascotStore";
import { MASCOTS } from "@/data/mascots";
import { AnimatedStatCounter } from "@/components/molecules/AnimatedStatCounter";
import { TestimonialsSection } from "@/components/molecules/TestimonialsSection";
import { FeaturesGrid } from "@/components/molecules/FeaturesGrid";
// Mock certification engine
import { runMockAudit, type AuditResult } from "@/lib/certification";
// Types
import type { Skill } from "@/types";
// Persistence layer
import { storage, STORAGE_KEYS, loadSkills, saveSkills, loadProgression, saveProgression, loadFeed, saveFeed, loadAudits, saveAudits, loadOrchestrations, saveOrchestrations, loadAchievements, saveAchievements } from "@/lib/persistence";
import type { FeedEntry, AuditRecord, OrchestrationConfig, ProgressionData } from "@/lib/persistence";

// Lazy-load Three.js agent (only loads when 3D mode is active)
const Agent3D = dynamic(() => import("@/components/Agent3D"), { ssr: false });

// ─── Types ──────────────────────────────────────────────────────────────

interface TitanAgent {
  id: string;
  name: string;
  emoji: string;
  level: number;
  xp: number;
  xpToNext: number;
  color: string;
  specialty: string;
  mood: string;
}

// MoltbookEntry reuses the FeedEntry type from persistence
interface MoltbookEntry extends FeedEntry {}

// Level-up toast state
interface LevelUpToast {
  visible: boolean;
  level: number;
  message: string;
}

interface ProgressionState {
  totalXp: number;
  totalTasksRun: number;
  skillsCertified: number;
  goldSkills: number;
  achievements: string[];  // achievement IDs
  lastSavedAt: string;
}

type ProgressionUpdater = ((prev: ProgressionState) => Partial<ProgressionState>) | Partial<ProgressionState>;

function useProgressionGame(): [ProgressionState, (updater: ProgressionUpdater) => void] {
  const [state, setState] = useState<ProgressionState>(() => {
    const data = loadProgression();
    return {
      totalXp: data.totalXp,
      totalTasksRun: data.totalTasksRun,
      skillsCertified: data.skillsCertified,
      goldSkills: data.goldSkills,
      achievements: data.achievements,
      lastSavedAt: data.lastSavedAt,
    };
  });

  const update = useCallback((updater: ProgressionUpdater) => {
    setState(prev => {
      const changes = typeof updater === 'function' ? updater(prev) : updater;
      const next = { ...prev, ...changes, lastSavedAt: new Date().toISOString() };
      saveProgression({
        totalXp: next.totalXp,
        totalTasksRun: next.totalTasksRun,
        skillsCertified: next.skillsCertified,
        goldSkills: next.goldSkills,
        achievements: next.achievements,
        lastSavedAt: next.lastSavedAt,
      });
      return next;
    });
  }, []);

  return [state, update];
}

// ─── Achievement definitions ──────────────────────────────────────────

interface AchievementDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  check: (prog: ProgressionState, extras: AchievementExtras) => boolean;
}

interface AchievementExtras {
  skillCount?: number;
  swarmCount?: number;
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first-skill', name: 'First Skill Run', emoji: '🏆', description: 'Run your first skill', check: (p) => p.totalTasksRun >= 1 },
  { id: 'first-audit', name: 'First Audit', emoji: '🛡️', description: 'Complete your first audit', check: (p) => p.skillsCertified >= 1 },
  { id: 'gold-standard', name: 'Gold Standard', emoji: '🌟', description: 'Earn a gold certification', check: (p) => p.goldSkills >= 1 },
  { id: 'swarm-master', name: 'Swarm Master', emoji: '🌀', description: 'Save 3+ swarms', check: (_p, e) => (e?.swarmCount ?? 0) >= 3 },
  { id: 'xp-collector', name: 'XP Collector', emoji: '💎', description: 'Reach 1000 total XP', check: (p) => p.totalXp >= 1000 },
];

function checkAchievements(prog: ProgressionState, extras?: AchievementExtras): string[] {
  const unlocked = new Set(prog.achievements);
  for (const ach of ACHIEVEMENT_DEFS) {
    if (!unlocked.has(ach.id) && ach.check(prog, extras ?? {})) {
      unlocked.add(ach.id);
    }
  }
  return Array.from(unlocked);
}

function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_DEFS.find(a => a.id === id);
}

// ─── Mock Data ──────────────────────────────────────────────────────────

const MAIN_AGENT: TitanAgent = {
  id: "main",
  name: "Titan Core",
  emoji: "🌀",
  level: 24,
  xp: 7800,
  xpToNext: 10000,
  color: "#14B8A6",
  specialty: "Swarm Commander",
  mood: "happy",
};

const BASE_ORBITING_AGENTS: TitanAgent[] = [
  { id: "a1", name: "Travel Guide", emoji: "🌍", level: 12, xp: 3400, xpToNext: 5000, color: "#14B8A6", specialty: "Destinations", mood: "happy" },
  { id: "a2", name: "Budget Keeper", emoji: "💰", level: 8, xp: 2100, xpToNext: 4000, color: "#10B981", specialty: "Finance", mood: "neutral" },
  { id: "a3", name: "Research Bot", emoji: "🔬", level: 15, xp: 5200, xpToNext: 6000, color: "#14B8A6", specialty: "Deep Research", mood: "excited" },
  { id: "a4", name: "Crypto Trader", emoji: "🧠", level: 6, xp: 900, xpToNext: 3000, color: "#F59E0B", specialty: "Markets", mood: "focused" },
  { id: "a5", name: "Data Analyst", emoji: "📊", level: 10, xp: 2800, xpToNext: 4500, color: "#14B8A6", specialty: "Analytics", mood: "happy" },
];

// Skill templates for the Forge
const SKILL_TEMPLATES = [
  { name: 'Travel Companion', desc: 'Itinerary + budget + tips', level: 'Lv.5', code: `agent TravelGuide {
  triggers ['new_destination', 'budget_check']
  actions {
    research: deep_scan,
    summarize: concise,
    notify: push
  }
  level_req: 5
}` },
  { name: 'Research Analyst', desc: 'Deep-dive + citations + summary', level: 'Lv.8', code: `agent ResearchAnalyst {
  triggers ['query', 'schedule']
  actions {
    scrape: web_deep,
    analyze: cross_ref,
    cite: apa_format,
    summarize: bullet_points
  }
  level_req: 8
}` },
  { name: 'Trading Assistant', desc: 'Signals + risk + portfolio', level: 'Lv.12', code: `agent TradingAssistant {
  triggers ['market_update', 'price_alert']
  actions {
    analyze: sentiment,
    risk: portfolio_check,
    signal: buy_sell_hold
  }
  level_req: 12
}` },
  { name: 'Content Writer', desc: 'Drafts + SEO + tone check', level: 'Lv.3', code: `agent ContentWriter {
  triggers ['draft_request', 'edit_command']
  actions {
    generate: outline,
    optimize: seo,
    check: tone_analysis,
    output: markdown
  }
  level_req: 3
}` },
];

const MOLTBOOK: MoltbookEntry[] = [
  { id: "m1", avatar: "🎯", name: "Swarm", text: "Completed 12 automated tasks today", time: "2m ago", type: "task" },
  { id: "m2", avatar: "⭐", name: "Research Bot", text: "Level 15 achieved — unlocked deep analysis", time: "15m ago", type: "levelup" },
  { id: "m3", avatar: "🏆", name: "You", text: "Saved $540 this week via Budget Keeper", time: "1h ago", type: "achievement" },
  { id: "m4", avatar: "💡", name: "Travel Guide", text: "Found 3 new hidden gems in Kyoto", time: "2h ago", type: "insight" },
  { id: "m5", avatar: "🔬", name: "Research Bot", text: "Market analysis: SOL sentiment shifting bullish", time: "3h ago", type: "insight" },
];

// ─── Theme Configuration ────────────────────────────────────────────────

type TitanTheme = "game" | "modular" | "minimal";

const THEMES: { id: TitanTheme; label: string; icon: typeof Sun; description: string }[] = [
  { id: "game", label: "Living Ecosystem", icon: Sun, description: "Warm glowing agents, orbiting swarm, emotional rewards" },
  { id: "modular", label: "Modular", icon: Monitor, description: "Clean card grid, metrics first, professional" },
  { id: "minimal", label: "Minimal", icon: Moon, description: "Dark, focused, distraction-free" },
];

// ─── Dreamy Particle Field (68 orbs, 62/38 teal/golden, 11-keyframe) ──

function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 68 }, (_, i) => {
      const isTeal = Math.random() < 0.62; // 62% teal, 38% golden
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3.5 + Math.random() * 5, // 3.5–8.5px
        duration: 160 + Math.random() * 120, // 160–280s
        delay: Math.random() * 80,
        color: isTeal ? 'rgba(20, 184, 166,' : 'rgba(245, 158, 11,',
        opacity: isTeal ? 0.78 : 0.58,
        glowSize: 5 + Math.random() * 6,
        layer: Math.floor(Math.random() * 3),
      };
    }), []);

  const layerStyles = ['z-0', 'z-[1]', 'z-[2]'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div key={p.id} className={`absolute ${layerStyles[p.layer]} titan-particle-glow`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size + p.glowSize * 2, height: p.size + p.glowSize * 2 }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `${p.color} ${p.opacity})`,
              left: '50%', top: '50%',
              x: '-50%', y: '-50%',
              boxShadow: `0 0 ${p.glowSize * 4.2}px ${p.color} ${p.opacity * 0.7})`,
            }}
            animate={{
              // 11-keyframe organic random walk: slow upward float with gentle sway
              y: [0, -8, 2, -12, -3, -18, 0, -10, -5, -14, 0],
              x: [0, 5, -3, 8, -5, 6, -7, 4, -4, 3, 0],
              scale: [1, 1.12, 0.78, 1.2, 0.85, 1.15, 0.72, 1.08, 0.8, 1.05, 1],
              opacity: [
                p.opacity * 0.25, p.opacity * 0.65, p.opacity * 0.45,
                p.opacity * 0.85, p.opacity * 0.3, p.opacity * 0.75,
                p.opacity * 0.2, p.opacity * 0.7, p.opacity * 0.4,
                p.opacity * 0.6, p.opacity * 0.25
              ],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Agent Avatar (Premium Friendly Glowing Companion + 3D Mode) ───────

function AgentAvatar({ agent, size = 'md', threeD }: { agent: TitanAgent; size?: 'sm' | 'md' | 'lg'; threeD?: boolean }) {
  const dims = size === 'lg' ? 160 : size === 'md' ? 80 : 56;
  const glowSize = dims * 1.8;

  // Check keep-basic-look — force tier 1 when enabled
  const keepBasicLook = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem('titan-keep-basic-look') === 'true'; } catch { return false; }
  }, []);
  const computedTier = useMemo<1 | 2 | 3>(() => {
    if (keepBasicLook) return 1;
    const lvl = agent.level;
    if (lvl >= 31) return 3;
    if (lvl >= 11) return 2;
    return 1;
  }, [keepBasicLook, agent.level]);

  // 3D mode: render Three.js procedural cartoon agent
  if (threeD && size !== 'sm') {
    const threeSize = size === 'lg' ? 140 : 72;
    return (
      <motion.div
        className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 250, damping: 12 }}
      >
        {/* Glow halo behind 3D model */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: threeSize * 2,
            height: threeSize * 2,
            top: `calc(50% - ${threeSize}px)`,
            left: `calc(50% - ${threeSize}px)`,
            background: `radial-gradient(circle, ${agent.color}20 0%, transparent 70%)`,
          }}
        />
        <Agent3D
          color={agent.color}
          size={threeSize}
          emotion={(agent.mood as 'happy' | 'neutral' | 'excited' | 'focused') || 'happy'}
          breathing={true}
          level={agent.level}
          tier={computedTier}
        />
        {/* Level badge */}
        <motion.div
          className="absolute -top-1 right-0"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ marginTop: -4 }}
        >
          <Badge className="bg-gradient-to-r from-titan-golden to-titan-amber text-[10px] h-5 px-1.5 font-mono border-0 shadow-lg shadow-amber-500/20">
            Lv{agent.level}
          </Badge>
        </motion.div>
        {/* Name label */}
        <motion.span
          className="text-xs font-mono text-titan-text/60 truncate max-w-[100px] text-center mt-1"
          whileHover={{ color: agent.color, textShadow: `0 0 8px ${agent.color}40` }}
        >
          {agent.name}
        </motion.span>
      </motion.div>
    );
  }

  // 2D fallback (emoji-based)
  return (
    <motion.div
      className="relative flex flex-col items-center gap-1.5 cursor-pointer group"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 12 }}
    >
      {/* Deep glow layer (outer aura) */}
      <motion.div
        className={`absolute rounded-full ${size === 'lg' ? 'animate-glow-pulse' : ''}`}
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${agent.color}18 0%, ${agent.color}08 40%, transparent 70%)`,
        }}
        animate={size !== 'lg' ? { opacity: [0.3, 0.7, 0.3] } : {}}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Agent body with premium depth */}
      <motion.div
        className={`relative rounded-2xl flex items-center justify-center ${size === 'lg' ? 'titan-agent-deep' : ''}`}
        style={{
          width: dims,
          height: dims,
          background: `linear-gradient(145deg, ${agent.color}15, #0F172A 60%, ${agent.color}10)`,
          border: `1.5px solid ${agent.color}35`,
        }}
        animate={size === 'lg'
          ? { y: [0, -6, 0], scale: [1, 1.02, 1] }
          : { y: [0, -3, 0] }
        }
        transition={{ duration: size === 'lg' ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner glow rim */}
        <div className="absolute inset-0 rounded-2xl" style={{
          background: `radial-gradient(circle at 35% 35%, ${agent.color}30 0%, transparent 70%)`,
          opacity: 0.4,
        }} />
        <span className={`relative z-10 ${size === 'lg' ? 'text-5xl drop-shadow-lg' : size === 'md' ? 'text-2xl' : 'text-lg'}`}>
          {agent.emoji}
        </span>

        {/* Level badge */}
        <motion.div
          className={`absolute -top-1.5 -right-1.5 ${size === 'sm' ? 'scale-75' : ''}`}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Badge className="bg-gradient-to-r from-titan-golden to-titan-amber text-[10px] h-5 px-1.5 font-mono border-0 shadow-lg shadow-amber-500/20">
            Lv{agent.level}
          </Badge>
        </motion.div>
      </motion.div>

      {/* Name label with hover glow */}
      <motion.span
        className="text-xs font-mono text-titan-text/60 truncate max-w-[100px] text-center"
        whileHover={{ color: agent.color, textShadow: `0 0 8px ${agent.color}40` }}
      >
        {agent.name}
      </motion.span>
    </motion.div>
  );
}

// ─── Orbiting Swarm (Mobile-First Responsive, CSS Animations with @keyframes spin) ──

function OrbitingSwarm({ agents, threeD }: { agents: TitanAgent[]; threeD?: boolean }) {
  const { currentMascot, openPicker } = useMascotStore();
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] mx-auto max-w-full overflow-visible">
      {/* Central platform glow — uses mascot color */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '75%',
          paddingBottom: '75%',
          border: `1px solid ${currentMascot.colorTint}30`,
          background: `radial-gradient(circle, ${currentMascot.colorTint}12 0%, transparent 70%)`,
          boxShadow: `0 0 60px ${currentMascot.colorTint}10`,
        }}
      />

      {/* Inner dashed ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '48%',
          paddingBottom: '48%',
          border: `1px dashed ${currentMascot.colorTint}20`,
        }}
      />

      {/* Animated outer ring glow (framer-motion rotation) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: '84%',
          paddingBottom: '84%',
          border: `1px solid ${currentMascot.colorTint}10`,
        }}
        animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central mascot — responsive */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        onClick={openPicker}
      >
        <div className="hidden sm:block">
          <MascotDisplay size={160} showLevel level={24} glowMultiplier={1.2} />
        </div>
        <div className="sm:hidden">
          <MascotDisplay size={100} showLevel level={24} />
        </div>
      </motion.div>

      {/* Orbiting agents — uses CSS @keyframes spin now defined in globals.css */}
      {agents.map((agent, i) => {
        const orbitDuration = 18 + i * 4;
        const radius = 140; /* orbit radius in px */
        return (
          <div key={agent.id} className="absolute z-20"
            style={{
              left: '50%', top: '50%',
              width: 0, height: 0,
              animation: `spin ${orbitDuration}s linear infinite`,
              animationDelay: `-${(i / agents.length) * orbitDuration}s`,
            }}>
            {/* Container for the orbiting dot — spun in opposite direction so agent stays upright */}
            <div className="hidden sm:block" style={{
              position: 'absolute',
              width: 56,
              height: 56,
              left: -28,
              top: -28 - radius,
            }}>
              <AgentAvatar agent={agent} size='sm' threeD={threeD} />
            </div>
            <div className="sm:hidden" style={{
              position: 'absolute',
              width: 48,
              height: 48,
              left: -24,
              top: -24 - 100,
            }}>
              <AgentAvatar agent={agent} size='sm' threeD={threeD} />
            </div>
          </div>
        );
      })}

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.12 }}>
        {agents.map((_, i) => {
          const angle = (i / agents.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const gradientId = `line-grad-${i}`;
          return (
            <g key={i}>
              <defs>
                <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' stopColor='#14B8A6' />
                  <stop offset='100%' stopColor='#F59E0B' />
                </linearGradient>
              </defs>
              <line
                x1='50%' y1='50%'
                x2={`${50 + Math.cos(rad) * 28}%`}
                y2={`${50 + Math.sin(rad) * 28}%`}
                stroke={`url(#${gradientId})`}
                strokeWidth='0.6'
                strokeDasharray='3 4'
                className='titan-orbit-ring'
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── XP Progress Bar ────────────────────────────────────────────────────

function XPBar({ current, max, label }: { current: number; max: number; label?: string }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-[10px] font-mono text-titan-muted mb-1"><span>{label}</span><span>{current.toLocaleString()} / {max.toLocaleString()} XP</span></div>}
      <div className="h-1.5 bg-titan-border/40 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #14B8A6, #F59E0B)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Retail-Friendly Landing Page (Default Onboarding) ────────────────
// Large cute 3D agent front and center on a glowing platform

function ThemePicker({ onSelect }: { onSelect: (theme: TitanTheme) => void }) {
  // Read progression from localStorage to compute current tier
  const [progState, setProgState] = useState<ProgressionState>(() => {
    if (typeof window === 'undefined') return { totalXp: 0, totalTasksRun: 0, skillsCertified: 0, goldSkills: 0, achievements: [], lastSavedAt: '' };
    try {
      const saved = localStorage.getItem('titan-progression');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { totalXp: 0, totalTasksRun: 0, skillsCertified: 0, goldSkills: 0, achievements: [], lastSavedAt: '' };
  });

  // Compute agent level from XP (rough: every 500 XP = 1 level)
  const agentLevel = useMemo(() => Math.max(1, Math.floor(progState.totalXp / 500) + 1), [progState.totalXp]);

  // Mascot store
  const { currentMascot, hasCompletedOnboarding, openPicker } = useMascotStore();
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);

  // Hover state for agent reaction
  const [hovering, setHovering] = useState(false);

  // Parallax scroll effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estimated savings (for sticky message)
  const estSavings = (progState.totalTasksRun * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // If first visit, show onboarding picker
  if (showOnboarding) {
    return (
      <div className="min-h-screen titan-gradient relative flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.06) 0%, transparent 65%)',
            mixBlendMode: 'screen',
          }}
        />
        <ParticleField />
        <div className="relative z-10 max-w-lg w-full">
          <MascotPicker onComplete={() => setShowOnboarding(false)} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen titan-gradient relative flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Warm teal/golden radial glow backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 titan-radial-glow-warm" />

      {/* Soft golden overlay across entire page */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.06) 0%, transparent 65%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Parallax grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 titan-grid-bg"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />

      {/* Particles */}
      <ParticleField />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Mascot hero with orbital companions */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: hovering ? 1.03 : 1,
            opacity: 1,
          }}
          transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Orbital ring base — responsive: 200px mobile, 340px desktop */}
          <div className="relative w-[200px] h-[200px] sm:w-[340px] sm:h-[340px]">
            {/* Glow platform */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '88%',
                height: '88%',
                top: '6%',
                left: '6%',
                background: `radial-gradient(circle, ${currentMascot.colorTint}20 0%, ${currentMascot.colorTint}08 40%, transparent 70%)`,
                filter: 'blur(25px)',
              }}
            />
            {/* Orbital ring */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: '82%',
                paddingBottom: '82%',
                border: `1px solid ${currentMascot.colorTint}20`,
              }}
            />
            {/* Orbiting companion mascots — use mascot data for orbiting agents */}
            {MASCOTS.filter(m => m.id !== currentMascot.id).slice(0, 5).map((mascot, i) => {
              const d = 18 + i * 4;
              const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 85 : 135;
              return (
                <div key={mascot.id} className="absolute z-20"
                  style={{
                    left: '50%', top: '50%',
                    width: 0, height: 0,
                    animation: `spin ${d}s linear infinite`,
                    animationDelay: `-${(i / 5) * d}s`,
                  }}>
                  <div style={{
                    position: 'absolute',
                    width: 28,
                    height: 28,
                    left: -14,
                    top: -14 - orbitRadius,
                  }}>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm overflow-hidden"
                      style={{ background: `${mascot.colorTint}20`, border: `1px solid ${mascot.colorTint}30` }}>
                      <img src={mascot.image} alt={mascot.name} className="w-5 h-5 sm:w-7 sm:h-7 object-contain drop-shadow-md"
                        style={{ filter: `drop-shadow(0 0 4px ${mascot.colorTint}60)` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Floating main mascot — responsive */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={openPicker}
              animate={{
                y: hovering ? [0, -10, 0] : [0, -5, 0],
                rotate: hovering ? [0, -8, 8, -5, 5, 0] : [0, 0, 0, 0],
              }}
              transition={{
                duration: hovering ? 1.5 : 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <MascotDisplay
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 80 : 120}
                glowMultiplier={hovering ? 2 : 1}
              />
              {/* Particle burst on hover */}
              {hovering && (
                <div className="absolute inset-0 pointer-events-none z-10 animate-particle-burst">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 4 + Math.random() * 6,
                        height: 4 + Math.random() * 6,
                        left: `${20 + Math.random() * 60}%`,
                        top: `${10 + Math.random() * 50}%`,
                        background: `radial-gradient(circle, ${
                          Math.random() > 0.5 ? 'rgba(20,184,166,0.8)' : 'rgba(245,158,11,0.7)'
                        }, transparent)`,
                        boxShadow: `0 0 ${6 + Math.random() * 10}px ${
                          Math.random() > 0.5 ? 'rgba(20,184,166,0.6)' : 'rgba(245,158,11,0.5)'
                        }`,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Headline + Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-titan-teal/10 border border-titan-teal/20">
            <Sparkles className="h-3.5 w-3.5 text-titan-teal" />
            <span className="text-[10px] sm:text-xs font-mono text-titan-teal tracking-wider">YOUR AI SWARM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3 leading-tight">
            <span className="titan-text-gradient">Your personal AI swarm</span>
            <br />
            <span className="text-titan-text/90">that grows with you</span>
          </h1>
          <p className="text-titan-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-2 sm:mb-3 leading-relaxed px-2">
            Meet Titan — your friendly agent ecosystem for travel, finance, health, and life.
          </p>

          {/* ROI/XP preview — sticky value messaging */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 bg-titan-emerald/10 px-3 py-1.5 rounded-full border border-titan-emerald/20">
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-titan-emerald" />
              <span className="font-mono text-titan-emerald font-medium">+${estSavings} potential value</span>
            </div>
            <div className="flex items-center gap-1.5 bg-titan-golden/10 px-3 py-1.5 rounded-full border border-titan-golden/20">
              <Trophy className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-titan-golden" />
              <span className="font-mono text-titan-golden font-medium">Lv{agentLevel} Agent</span>
            </div>
          </div>

          {/* Problem-first sticky message */}
          <motion.p
            className="text-[11px] sm:text-xs text-titan-muted/60 font-mono mb-4 sm:mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Already saved <span className="text-titan-teal font-semibold">+${estSavings}</span> in potential value
            and completed <span className="text-titan-golden font-semibold">{progState.totalTasksRun}</span> tasks.
          </motion.p>

          {/* CTA button */}
          <motion.button
            onClick={() => onSelect('game')}
            className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold mb-6 sm:mb-8 inline-flex items-center gap-2 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
              color: '#0A0E17',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Enter Your Ecosystem
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </motion.button>
        </motion.div>

        {/* View switch pill — refined with glow on active */}
        <motion.div
          className="flex items-center justify-center gap-1 bg-titan-surface/50 backdrop-blur-sm border border-titan-border/20 rounded-full p-1 mx-auto w-fit"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => onSelect('game')}
            className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all bg-gradient-to-r from-titan-teal/25 to-titan-golden/15 text-titan-text shadow-sm"
            style={{ boxShadow: '0 0 12px rgba(20,184,166,0.15)' }}
          >
            🌿 Living Ecosystem
          </button>
          <button
            onClick={() => onSelect('modular')}
            className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all text-titan-muted/70 hover:bg-titan-teal/10 hover:text-titan-muted"
          >
            🧩 Modular Dashboard
          </button>
        </motion.div>
      </div>

      {/* ── Animated Stats Counter Row ── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AnimatedStatCounter
            end={528}
            label="Automated tasks completed"
            suffix="k+"
            icon={<Zap className="h-4 w-4" />}
            color="#14B8A6"
          />
          <AnimatedStatCounter
            end={12400}
            label="XP earned by early users"
            suffix="+"
            icon={<Trophy className="h-4 w-4" />}
            color="#F59E0B"
          />
          <AnimatedStatCounter
            end={47}
            label="Custom skills forged"
            prefix=""
            icon={<Bot className="h-4 w-4" />}
            color="#10B981"
          />
          <AnimatedStatCounter
            end={13}
            label="Gold certifications earned"
            prefix=""
            icon={<Star className="h-4 w-4" />}
            color="#F59E0B"
          />
        </div>
      </motion.div>

      {/* ── Feature Highlights ── */}
      <FeaturesGrid />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── Bottom CTA ── */}
      <motion.div
        className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 pb-10 sm:pb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-6 sm:p-8 rounded-2xl bg-titan-card/40 border border-titan-border/20 backdrop-blur-sm titan-glow">
          <motion.h2
            className="text-lg sm:text-xl font-bold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="titan-text-gradient">Ready to build your swarm?</span>
          </motion.h2>
          <p className="text-xs sm:text-sm text-titan-muted/70 mb-4 font-mono">
            Start free. No credit card. Your agents are waiting.
          </p>
          <motion.button
            onClick={() => onSelect('game')}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #14B8A6, #F59E0B)',
              color: '#0A0E17',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Enter Your Ecosystem
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard Views ─────────────────────────────────────────────────────

function GameDashboard({ theme, setTheme }: { theme: TitanTheme; setTheme: (t: TitanTheme) => void }) {
  const [activeTab, setActiveTab] = useState("home");

  // ── Progression System ──
  const [progression, setProgression] = useProgressionGame();

  // ── Level-up toast ──
  const [levelUpToast, setLevelUpToast] = useState<LevelUpToast>({ visible: false, level: 0, message: '' });

  // ── Achievement toast ──
  const [achievementToast, setAchievementToast] = useState<{ visible: boolean; id: string; name: string }>({ visible: false, id: '', name: '' });

  // ── Mascot store ──
  const { currentMascot } = useMascotStore();

  // Helper: compute level from XP
  const computeLevel = useCallback((xp: number) => Math.max(1, Math.floor(xp / 500) + 1), []);

  // Derive current level from totalXp
  const currentLevel = useMemo(() => computeLevel(progression.totalXp), [progression.totalXp, computeLevel]);

  // Watch for level-up and show toast
  const prevLevelRef = useRef(currentLevel);
  useEffect(() => {
    if (prevLevelRef.current < currentLevel) {
      const msg = `Level ${currentLevel} — ${currentLevel >= 30 ? 'God-Tier Unlocked!' : currentLevel >= 20 ? 'Mastery Reached!' : 'Growing Stronger!'}`;
      setLevelUpToast({ visible: true, level: currentLevel, message: msg });
      setTimeout(() => setLevelUpToast(prev => ({ ...prev, visible: false })), 4000);
      // Add to feed
      addFeedEntry({
        id: `levelup-${Date.now()}`,
        avatar: '🎯',
        name: 'Titan Core',
        text: msg,
        time: 'Just now',
        type: 'levelup',
      });
    }
    prevLevelRef.current = currentLevel;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  // ── Unified feed state with persistence ──
  const [bauEntries, setBauEntries] = useState<MoltbookEntry[]>(() => {
    const saved = loadFeed();
    return saved.length > 0 ? saved as MoltbookEntry[] : [...MOLTBOOK];
  });

  // Persist feed on every change (debounced via ref)
  const feedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (feedTimerRef.current) clearTimeout(feedTimerRef.current);
    feedTimerRef.current = setTimeout(() => saveFeed(bauEntries), 300);
    return () => { if (feedTimerRef.current) clearTimeout(feedTimerRef.current); };
  }, [bauEntries]);

  // ── Feed helper: add entry and persist ──
  const addFeedEntry = useCallback((entry: MoltbookEntry) => {
    setBauEntries(prev => {
      const next = [entry, ...prev];
      // Cap at 50
      if (next.length > 50) return next.slice(0, 50);
      return next;
    });
  }, []);

  // ── Grant XP with level-up detection and achievement checks ──
  const grantXp = useCallback((xp: number, extras?: AchievementExtras) => {
    setProgression((prev: ProgressionState) => ({
      totalXp: prev.totalXp + xp,
      achievements: checkAchievements({ ...prev, totalXp: prev.totalXp + xp }, extras),
    }));
  }, [setProgression]);

  // ── Grant task + XP ──
  const grantTask = useCallback(() => {
    setProgression((prev: ProgressionState) => ({
      totalTasksRun: prev.totalTasksRun + 1,
      totalXp: prev.totalXp + 50,
      achievements: checkAchievements({ ...prev, totalTasksRun: prev.totalTasksRun + 1, totalXp: prev.totalXp + 50 }),
    }));
  }, [setProgression]);

  // ── Swarm save count for achievement ──
  const [swarmSaveCount, setSwarmSaveCount] = useState(() => {
    const orchs = loadOrchestrations();
    return orchs.length;
  });

  // ── Grant certification XP ──
  const grantCertXp = useCallback((tier: string) => {
    const xpMap: Record<string, number> = { gold: 200, silver: 100, bronze: 50 };
    const xp = xpMap[tier] || 0;
    setProgression(prev => {
      const newXp = prev.totalXp + xp;
      const newCert = prev.skillsCertified + (tier !== 'uncertified' ? 1 : 0);
      const newGold = prev.goldSkills + (tier === 'gold' ? 1 : 0);
      const newAch = checkAchievements({ ...prev, totalXp: newXp, skillsCertified: newCert, goldSkills: newGold });
      return {
        ...prev,
        totalXp: newXp,
        skillsCertified: newCert,
        goldSkills: newGold,
        achievements: newAch,
        lastSavedAt: new Date().toISOString(),
      };
    });
  }, [setProgression]);

  // ── Achievement unlock listener ──
  const prevAchRef = useRef<string[]>(progression.achievements);
  useEffect(() => {
    const prevAchs = prevAchRef.current;
    const newAchs = progression.achievements.filter(a => !prevAchs.includes(a));
    if (newAchs.length > 0) {
      for (const achId of newAchs) {
        const def = getAchievementById(achId);
        if (def) {
          setAchievementToast({ visible: true, id: achId, name: def.name });
          setTimeout(() => setAchievementToast(prev => ({ ...prev, visible: false })), 4000);
          addFeedEntry({
            id: `ach-${Date.now()}-${achId}`,
            avatar: def.emoji,
            name: 'Achievement',
            text: `Unlocked: ${def.name} — ${def.description}`,
            time: 'Just now',
            type: 'achievement',
          });
        }
      }
    }
    prevAchRef.current = progression.achievements;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progression.achievements]);

  // ── Skill Forge State ──
  const [editorCode, setEditorCode] = useState<string>(SKILL_TEMPLATES[0].code);
  const [savedSkills, setSavedSkills] = useState<Skill[]>(() => loadSkills());
  const [skillName, setSkillName] = useState('');
  const [skillSaving, setSkillSaving] = useState(false);
  const [skillsLoaded, setSkillsLoaded] = useState(false);

  // Persist skills to storage whenever they change
  useEffect(() => {
    if (savedSkills.length > 0 || skillsLoaded) {
      saveSkills(savedSkills);
    }
  }, [savedSkills, skillsLoaded]);

  // ── Certification Modal State ──
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [certifiedSkill, setCertifiedSkill] = useState<string | null>(null);
  const [certifiedTier, setCertifiedTier] = useState<AuditResult['auditTier'] | null>(null);
  const [certifiedScore, setCertifiedScore] = useState<number>(0);

  // ── Audit history ──
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>(() => loadAudits());
  useEffect(() => { saveAudits(auditHistory); }, [auditHistory]);

  // ── Swarm orchestration persistence ──
  const [savedOrchestrations, setSavedOrchestrations] = useState<OrchestrationConfig[]>(() => loadOrchestrations());
  useEffect(() => { saveOrchestrations(savedOrchestrations); }, [savedOrchestrations]);

  // Ref for orderedAgents — populated later, used by handleSaveSwarm
  const orderedAgentsRef = useRef<TitanAgent[]>([]);

  // ── Swarm Execute Input ──
  const [swarmInput, setSwarmInput] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // ── Scroll state for Moltbook feed ──
  const feedScrollRef = useRef<HTMLDivElement>(null);
  const [feedScrolledUp, setFeedScrolledUp] = useState(false);

  // ── Handler: Execute swarm command ──
  const handleSwarmExecute = useCallback(() => {
    if (!swarmInput.trim()) return;
    const text = swarmInput.trim();
    addFeedEntry({
      id: `swarm-${Date.now()}`,
      avatar: '🌀',
      name: 'Swarm',
      text: `Executed: ${text}`,
      time: 'Just now',
      type: 'task',
    });
    grantXp(10); // +10 XP for swarm execution
    setSwarmInput('');
    setToastMsg(`Executed: ${text}`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, [swarmInput, addFeedEntry, grantXp]);

  // ── Handler: Run skill ──
  const [runningSkill, setRunningSkill] = useState(false);
  const handleRunSkill = useCallback(async (name: string, code: string) => {
    setRunningSkill(true);
    const mockResults = [
      'Completed deep research analysis',
      'Generated comprehensive report with 12 sources',
      'Sent notification to all subscribed agents',
      `Successfully executed ${name} — ${code.split('\n').length} lines parsed`,
      `Output saved to BAU feed (${Date.now()})`,
    ];
    const resultSnippet = mockResults[Math.floor(Math.random() * mockResults.length)];
    addFeedEntry({
      id: `run-${Date.now()}`,
      avatar: '⚡',
      name: name,
      text: resultSnippet,
      time: 'Just now',
      type: 'task',
    });
    grantXp(25); // +25 XP for running a skill
    setRunningSkill(false);
  }, [addFeedEntry, grantXp]);

  // ── Handler: Save skill ──
  const handleSaveSkill = useCallback(async () => {
    if (!skillName.trim()) return;
    setSkillSaving(true);
    const localSkill: Skill = {
      id: `local-${Date.now()}`,
      agentId: 'forge',
      name: skillName.trim(),
      description: `Skill: ${skillName.trim()}`,
      skillMd: editorCode,
      certified: false,
      auditScore: null,
      auditTier: null,
      auditReport: null,
      createdAt: new Date().toISOString(),
    };
    setSavedSkills(prev => [...prev, localSkill]);

    // Grant XP with skill count for 'first-skill' achievement check
    const newSkillCount = savedSkills.length + 1;
    grantXp(25, { skillCount: newSkillCount });

    // Add feed entry
    addFeedEntry({
      id: `save-${Date.now()}`,
      avatar: '⚡',
      name: 'Forge',
      text: `Created skill: "${skillName.trim()}"`,
      time: 'Just now',
      type: 'task',
    });

    setSkillSaving(false);
    setSkillName('');
  }, [skillName, editorCode, savedSkills.length, addFeedEntry, grantXp]);

  // ── Handler: Save swarm/orchestration ──
  const handleSaveSwarm = useCallback(() => {
    const agents = orderedAgentsRef.current;
    const newOrch: OrchestrationConfig = {
      id: `swarm-${Date.now()}`,
      name: `Swarm ${savedOrchestrations.length + 1}`,
      agentIds: agents.map(a => a.id),
      connections: agents.map((a, i) => ({
        source: a.id,
        target: agents[(i + 1) % agents.length].id,
        relationship: 'reports_to',
      })),
      savedAt: new Date().toISOString(),
    };
    setSavedOrchestrations(prev => [...prev, newOrch]);

    const newCount = swarmSaveCount + 1;
    setSwarmSaveCount(newCount);

    // Grant XP
    grantXp(10, { swarmCount: newCount });

    // Add feed entry
    addFeedEntry({
      id: `swarm-save-${Date.now()}`,
      avatar: '🌀',
      name: 'Swarm',
      text: `Saved orchestration: ${newOrch.name}`,
      time: 'Just now',
      type: 'insight',
    });
  }, [savedOrchestrations.length, swarmSaveCount, grantXp, addFeedEntry]);

  // ── Handler: Audit skill ──
  const handleAuditSkill = useCallback(() => {
    const currentName = skillName.trim() || 'Untitled Skill';
    const result = runMockAudit(currentName, editorCode);
    setAuditResult(result);
    setShowAuditModal(true);
    setCertifiedSkill(currentName);
    setCertifiedTier(result.auditTier);
    setCertifiedScore(result.overallScore);

    // Save to audit history
    const auditRec: AuditRecord = {
      skillId: `audit-${Date.now()}`,
      skillName: currentName,
      score: result.overallScore,
      tier: result.auditTier,
      timestamp: new Date().toISOString(),
      violations: result.violations,
    };
    setAuditHistory(prev => [auditRec, ...prev]);

    // Grant certification XP (gold=200, silver=100, bronze=50)
    grantCertXp(result.auditTier);

    // Update skill's certification status
    setSavedSkills(prev => prev.map(s =>
      s.name === currentName
        ? { ...s, certified: result.auditTier !== 'uncertified', auditScore: result.overallScore, auditTier: result.auditTier }
        : s
    ));

    // Add feed entry
    const tierEmoji = result.auditTier === 'gold' ? '🌟' : result.auditTier === 'silver' ? '🥈' : result.auditTier === 'bronze' ? '🥉' : '⚠️';
    addFeedEntry({
      id: `audit-${Date.now()}`,
      avatar: tierEmoji,
      name: currentName,
      text: `Certified ${result.auditTier.toUpperCase()} (${result.overallScore}%)`,
      time: 'Just now',
      type: 'achievement',
    });
  }, [skillName, editorCode, grantCertXp, addFeedEntry]);

  // ── Handler: Close audit modal ──
  const handleCloseAuditModal = useCallback(() => {
    setShowAuditModal(false);
    setAuditResult(null);
  }, []);

  // ── Feed scroll handler ──
  const handleFeedScroll = useCallback(() => {
    if (!feedScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedScrollRef.current;
    setFeedScrolledUp(scrollTop + clientHeight < scrollHeight - 60);
  }, []);

  const scrollFeedToBottom = useCallback(() => {
    if (feedScrollRef.current) {
      feedScrollRef.current.scrollTop = feedScrollRef.current.scrollHeight;
      setFeedScrolledUp(false);
    }
  }, []);

  // ── Mark feed entry as read ──
  const handleMarkRead = useCallback((entryId: string) => {
    setBauEntries(prev => prev.map(e => e.id === entryId ? { ...e, read: true } : e));
  }, []);

  // Mark skills as loaded
  useEffect(() => {
    setSkillsLoaded(true);
  }, []);

  // ── Feature 4: 3D Toggle Persistence ──
  const [threeDMode, setThreeDMode] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('titan-3d-mode');
      if (saved === 'true') setThreeDMode(true);
    } catch {}
  }, []);
  const handleThreeDToggle = useCallback(() => {
    setThreeDMode((prev) => {
      const next = !prev;
      try { localStorage.setItem('titan-3d-mode', String(next)); } catch {}
      return next;
    });
  }, []);

  // ── Feature: Keep Basic Look Toggle ──
  const [keepBasicLook, setKeepBasicLook] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('titan-keep-basic-look') === 'true';
    } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('titan-keep-basic-look', String(keepBasicLook)); } catch {}
  }, [keepBasicLook]);

  // ── Feature 2: Drag-and-Drop Swarm Order ──
  const [orderedAgents, setOrderedAgents] = useState<TitanAgent[]>(() => {
    // Try to load saved order from localStorage
    try {
      const saved = localStorage.getItem('titan-swarm-order');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const map = new Map(BASE_ORBITING_AGENTS.map(a => [a.id, a]));
        const reordered = parsed.map(id => map.get(id)).filter(Boolean) as TitanAgent[];
        if (reordered.length === BASE_ORBITING_AGENTS.length) return reordered;
      }
    } catch {}
    return [...BASE_ORBITING_AGENTS];
  });
  // Keep ref in sync
  useEffect(() => { orderedAgentsRef.current = orderedAgents; }, [orderedAgents]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const handleDragStart = (index: number) => { dragItem.current = index; };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };
  const handleDrop = useCallback(() => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;
    const copy = [...orderedAgents];
    const dragged = copy[dragItem.current];
    copy.splice(dragItem.current, 1);
    copy.splice(dragOverItem.current, 0, dragged);
    setOrderedAgents(copy);
    try { localStorage.setItem('titan-swarm-order', JSON.stringify(copy.map(a => a.id))); } catch {}
    dragItem.current = null;
    dragOverItem.current = null;
  }, [orderedAgents]);



  const tabs = [
    { id: "home", label: "Home", icon: Layers, color: "#14B8A6", bg: "from-titan-teal/10" },
    { id: "swarm", label: "Swarm", icon: Layers, color: "#14B8A6", bg: "from-titan-teal/10" },
    { id: "forge", label: "Forge", icon: Bot, color: "#F59E0B", bg: "from-titan-golden/10" },
    { id: "lifeos", label: "LifeOS", icon: Puzzle, color: "#14B8A6", bg: "from-titan-teal/10" },
    { id: "audit", label: "Audit", icon: Shield, color: "#10B981", bg: "from-titan-emerald/10" },
    { id: "roi", label: "ROI", icon: TrendingUp, color: "#14B8A6", bg: "from-titan-teal/10" },
    { id: "bau", label: "BAU", icon: Orbit, color: "#7C3AED", bg: "from-titan-violet/10" },
    { id: "progression", label: "Progression", icon: Rocket, color: "#F59E0B", bg: "from-titan-golden/15" },
  ];

  const tabColors: Record<string, string> = {
    home: "#14B8A6",
    forge: "#F59E0B",
    lifeos: "#14B8A6",
    audit: "#10B981",
    roi: "#14B8A6",
    bau: "#7C3AED",
    progression: "#F59E0B",
  };

  return (
    <motion.div
      className="min-h-screen titan-gradient relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particles everywhere */}
      <ParticleField />

      {/* Teal center radial — #14B8A6 at 32% opacity fading to edges */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(20, 184, 166, 0.32) 0%, transparent 72%)',
        }}
      />

      {/* Golden screen overlay — #F59E0B at 7% opacity, screen blend, 72% radius */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.07) 0%, transparent 72%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(20, 184, 166, 0.02) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Top Bar — responsive: horizontal scroll on mobile */}
      <header className="relative z-10 border-b border-titan-border/30 backdrop-blur-sm bg-titan-bg/40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-titan-teal/20 to-titan-golden/10 flex items-center justify-center border border-titan-teal/20">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-titan-teal" />
            </div>
            <h1 className="text-base sm:text-lg font-bold titan-text-gradient tracking-tight">TITAN</h1>
            <Badge className="hidden sm:inline-flex bg-titan-teal/10 text-titan-teal border-titan-teal/20 text-[10px] tracking-widest uppercase font-mono">
              v0.4 · Living
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Theme indicator */}
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-titan-muted bg-titan-card/50 px-2 sm:px-2.5 py-1 rounded-full border border-titan-border/30">
              <Sun className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-titan-golden" />
              <span className="hidden sm:inline">{THEMES.find(t => t.id === theme)?.label}</span>
            </div>

            {/* Level + XP — hidden on very small screens */}
            <div className="hidden md:flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-titan-golden" />
              <span className="text-xs font-mono text-titan-golden font-semibold">Lv{MAIN_AGENT.level}</span>
              <div className="w-20">
                <XPBar current={progression.totalXp} max={MAIN_AGENT.xpToNext} />
              </div>
            </div>

            {/* 3D Toggle */}
            <button
              onClick={handleThreeDToggle}
              className={`flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full border transition-all ${
                threeDMode
                  ? 'bg-titan-teal/15 border-titan-teal/40 text-titan-teal'
                  : 'bg-titan-card/50 border-titan-border/30 text-titan-muted hover:bg-titan-teal/10 hover:border-titan-teal/30'
              }`}
              title={threeDMode ? '3D Agents (on)' : '3D Agents (off)'}
            >
              <Cuboid className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${threeDMode ? 'text-titan-teal' : ''}`} />
              <span className="hidden sm:inline font-mono">3D</span>
            </button>

            {/* ROI widget */}
            <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-titan-emerald/10 px-2 sm:px-2.5 py-1 rounded-full border border-titan-emerald/20">
              <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-titan-emerald" />
              <span className="font-mono text-titan-emerald font-medium">+${(progression.totalTasksRun * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>

            {/* Mascot avatar — click to change */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gradient-to-br from-titan-teal/30 to-titan-golden/20 flex items-center justify-center border border-titan-teal/30 cursor-pointer hover:scale-110 transition-transform" onClick={() => useMascotStore.getState().openPicker()}>
              <img src={currentMascot.image} alt={currentMascot.name} className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-md"
                style={{ filter: `drop-shadow(0 0 4px ${currentMascot.colorTint}60)` }} />
            </div>
          </div>
        </div>
      </header>

      {/* View-switch pill — Game View ↔ Modular Dashboard at top of content */}
      <div className="relative z-10 flex justify-center pt-2 sm:pt-3">
        <div className="flex items-center gap-1 bg-titan-surface/60 backdrop-blur-md border border-titan-border/20 rounded-full p-0.5 shadow-lg">
          {(['game' as const, 'modular' as const]).map(v => (
            <button
              key={v}
              onClick={() => setTheme(v)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                theme === v
                  ? 'bg-gradient-to-r from-titan-teal/25 to-titan-golden/15 text-titan-text shadow-sm'
                  : 'text-titan-muted/60 hover:text-titan-muted/90'
              }`}
            >
              {v === 'game' ? '🌿 Living Ecosystem' : '🧩 Modular Dashboard'}
            </button>
          ))}
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 overflow-x-hidden">
        {/* Tab Navigation — scrollable on mobile */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="-mx-3 sm:mx-0 overflow-x-auto scrollbar-none">
          <TabsList className="bg-titan-surface/80 border border-titan-border/30 p-1 rounded-xl backdrop-blur-sm inline-flex w-max sm:w-full">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:shadow-sm rounded-lg text-xs gap-1.5 transition-all duration-300"
                style={{
                  color: activeTab === tab.id ? tab.color : undefined,
                }}
              >
                <tab.icon className="h-3.5 w-3.5" style={{ color: activeTab === tab.id ? tab.color : undefined }} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              HOME TAB — Unified Dashboard (mascot, impact, quick nav)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="home" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 bg-titan-card/60 border-titan-border/30">
              <HomeDashboard
                progression={progression}
                agentLevel={currentLevel}
                recentFeed={bauEntries}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              SWARM TAB — Orbiting Ecosystem (teal, circular, living)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="swarm" className="space-y-4 sm:space-y-6">
            <Card className="relative h-[400px] sm:h-[500px] md:h-[550px] overflow-hidden bg-titan-card/60 border-titan-border/30 titan-glow">
              <div className="absolute inset-0 titan-radial-glow" />
              <div className="relative z-10 h-full flex items-center justify-center p-2 sm:p-4 max-w-full">
                <OrbitingSwarm agents={orderedAgents} threeD={threeDMode} />
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[90vw] sm:max-w-lg px-2 sm:px-4 z-30">
                <div className="flex gap-1.5 sm:gap-2 bg-titan-surface/80 backdrop-blur-md border border-titan-border/30 rounded-xl p-1.5 shadow-2xl">
                  <input
                    value={swarmInput}
                    onChange={(e) => setSwarmInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSwarmExecute()}
                    placeholder="tell your swarm what to do..."
                    className="flex-1 bg-transparent px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none placeholder:text-titan-muted/50 font-mono min-w-0"
                  />
                  <Button
                    onClick={handleSwarmExecute}
                    className="bg-titan-teal text-titan-bg hover:bg-titan-teal/90 font-semibold gap-1 text-[10px] sm:text-xs shrink-0 relative overflow-hidden"
                  >
                    <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Execute
                    {/* Toast animation */}
                    <AnimatePresence>
                      {toastVisible && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-titan-teal text-[9px] font-mono text-titan-bg"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -30, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ✓ Done
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </Card>
            {/* Drag-and-Drop Swarm Agent List */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono text-titan-muted/70">Drag agents to reorder swarm</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveSwarm}
                className="text-[10px] h-7 gap-1"
                style={{ borderColor: 'rgba(20,184,166,0.3)', color: '#14B8A6' }}
              >
                <Save className="h-3 w-3" />
                Save Swarm
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {orderedAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={handleDrop}
                  className="p-3 rounded-xl bg-titan-card/60 border border-titan-border/30 hover:border-titan-teal/30 hover:titan-glow transition-all duration-300 cursor-grab active:cursor-grabbing group relative"
                  whileHover={{ y: -2 }}
                  layout
                >
                  {/* Drag handle indicator */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-40 transition-opacity">
                    <GripVertical className="h-3 w-3 text-titan-muted" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <motion.div className="w-9 h-9 rounded-xl flex items-center justify-center text-base border border-titan-border/30 shrink-0"
                      style={{ background: `linear-gradient(135deg, ${agent.color}20, #1E2937)` }}
                      animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}>
                      {agent.emoji}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-medium truncate">{agent.name}</p>
                      <p className="text-[10px] font-mono text-titan-muted/70">Lv{agent.level} · {agent.xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              FORGE TAB — Workshop (golden/amber, 3-column workshop, dark terminal)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="forge" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
              <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#F59E0B' }}>SKILL WORKSHOP</h2>
              <span className="text-[10px] font-mono text-titan-muted/50">// craft, compile, certify</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left: Templates with golden left border */}
              <Card className="p-4 bg-titan-card/60 border-titan-border/30" style={{ borderLeft: '3px solid #F59E0B' }}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#F59E0B' }}><Star className="h-3.5 w-3.5" />Templates</h3>
                <div className="space-y-2">
                  {SKILL_TEMPLATES.map((t, i) => (
                    <motion.div
                      key={i}
                      className="p-2.5 rounded-lg bg-titan-surface/60 border border-titan-border/20 hover:border-amber-500/30 cursor-pointer transition-all"
                      whileHover={{ x: 3 }}
                      onClick={() => {
                        setEditorCode(t.code);
                        setSkillName(t.name);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div><p className="text-xs font-medium">{t.name}</p><p className="text-[10px] text-titan-muted/70">{t.desc}</p></div>
                        <Badge className="text-[9px]" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)' }}>{t.level}</Badge>
                      </div>
                    </motion.div>
                  ))}
                  {/* Saved skills section */}
                  {skillsLoaded && savedSkills.length > 0 && (
                    <>
                      <div className="border-t border-titan-border/20 pt-3 mt-3">
                        <h4 className="text-[10px] font-mono text-titan-muted/60 mb-2 uppercase tracking-wider">
                          <Download className="h-2.5 w-2.5 inline mr-1" />
                          Saved Skills ({savedSkills.length})
                        </h4>
                        {savedSkills.map((s) => (
                          <motion.div
                            key={s.id}
                            className="p-2 rounded-lg bg-titan-surface/40 border border-titan-border/10 hover:border-amber-500/20 cursor-pointer transition-all mb-1.5"
                            whileHover={{ x: 2 }}
                            onClick={() => {
                              setEditorCode(s.skillMd);
                              setSkillName(s.name);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[11px] font-medium">{s.name}</p>
                                <p className="text-[9px] text-titan-muted/60 font-mono">
                                  {s.auditTier ? (
                                    <span style={{
                                      color: s.auditTier === 'gold' ? '#F59E0B' : s.auditTier === 'silver' ? '#94A3B8' : s.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                                    }}>
                                      {s.auditTier.toUpperCase()} · {s.auditScore}%
                                    </span>
                                  ) : 'Not certified'}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Center: Code Editor with golden top accent */}
              <Card className="p-4 bg-[#0B0F1A] border-titan-border/30" style={{ borderTop: '3px solid #F59E0B' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <h3 className="text-sm font-semibold" style={{ color: '#F59E0B' }}>SKILL EDITOR</h3>
                    <input
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      placeholder="Skill name..."
                      className="bg-transparent border-b border-titan-border/30 text-xs font-mono text-titan-text/80 outline-none focus:border-amber-500/50 transition-colors px-1 py-0.5 max-w-[140px]"
                    />
                  </div>
                  <Badge className="text-[9px] font-mono" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)' }}>v1 · Draft</Badge>
                </div>
                <textarea
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  className="bg-black/50 rounded-lg p-3 font-mono text-[11px] leading-relaxed border border-titan-border/20 min-h-[240px] w-full resize-y outline-none text-titan-text/90 placeholder:text-titan-muted/30"
                  spellCheck={false}
                  placeholder="// Write your skill code here..."
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    className="flex-1 font-semibold text-xs border-0 gap-1"
                    style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)', color: '#0A0E17' }}
                    onClick={() => handleRunSkill(skillName.trim() || 'Untitled Skill', editorCode)}
                    disabled={runningSkill}
                  >
                    <Play className="h-3 w-3" />
                    {runningSkill ? 'Running...' : 'Run Skill'}
                  </Button>
                  <Button
                    className="flex-1 font-semibold text-xs border-0"
                    style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0E17' }}
                    onClick={handleAuditSkill}
                  >
                    Audit & Certify
                  </Button>
                  <Button
                    variant="outline"
                    className="text-xs gap-1 shrink-0"
                    style={{ borderColor: 'rgba(245,158,11,0.3)', color: '#F59E0B' }}
                    onClick={handleSaveSkill}
                    disabled={skillSaving || !skillName.trim()}
                  >
                    <Save className="h-3 w-3" />
                    {skillSaving ? 'Saving...' : 'Save Skill'}
                  </Button>
                </div>
              </Card>

              {/* Right: Preview Card with golden right border */}
              <Card className="p-4 bg-titan-card/60 border-titan-border/30" style={{ borderRight: '3px solid #F59E0B' }}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#F59E0B' }}><Bot className="h-3.5 w-3.5" />Preview</h3>
                <div className="flex flex-col items-center py-6">
                  <motion.div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-titan-teal/10 flex items-center justify-center text-3xl border border-amber-500/20 mb-3"
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    {skillName ? ['🌍','🔬','🧠','✍️'][SKILL_TEMPLATES.findIndex(t => t.name === skillName) >= 0 ? SKILL_TEMPLATES.findIndex(t => t.name === skillName) : 0] : '🌍'}
                  </motion.div>
                  <p className="font-mono text-sm font-medium">{skillName || 'Travel Guide v2'}</p>
                  {certifiedTier && certifiedSkill === (skillName || 'Untitled Skill') && (
                    <Badge
                      className="mt-1 text-[9px] font-mono"
                      style={{
                        background: certifiedTier === 'gold' ? 'rgba(245,158,11,0.2)' : certifiedTier === 'silver' ? 'rgba(148,163,184,0.2)' : certifiedTier === 'bronze' ? 'rgba(217,119,6,0.2)' : 'rgba(239,68,68,0.2)',
                        color: certifiedTier === 'gold' ? '#F59E0B' : certifiedTier === 'silver' ? '#94A3B8' : certifiedTier === 'bronze' ? '#D97706' : '#EF4444',
                        borderColor: 'currentColor',
                      }}
                    >
                      {certifiedTier.toUpperCase()} · {certifiedScore}%
                    </Badge>
                  )}
                  <div className="flex gap-1 mt-2">
                    {['Research', 'Summarize', 'Notify'].map(s => (
                      <Badge key={s} className="text-[8px]" style={{ background: 'rgba(245,158,11,0.1)', color: 'rgba(245,158,11,0.8)', borderColor: 'rgba(245,158,11,0.2)' }}>{s}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 w-full"><XPBar current={3400} max={5000} label="Level Progress" /></div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              LIFEOS TAB — Plugin Ecosystem for Every Category
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="lifeos" className="space-y-6">
            <LifeOSTab onFeedAdd={(entry) => {
              setBauEntries(prev => [{
                id: `lifeos-${Date.now()}`,
                avatar: entry.avatar,
                name: entry.name,
                text: entry.text,
                time: 'Just now',
                type: 'task',
              }, ...prev]);
            }} />
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              AUDIT TAB — Security Center (emerald green, certification focus)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
              <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#10B981' }}>SECURITY CENTER</h2>
              <span className="text-[10px] font-mono text-titan-muted/50">// certifications & compliance</span>
            </div>

            {/* Green certification banner — updates dynamically */}
            <motion.div
              className="p-6 rounded-2xl border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: certifiedTier === 'gold'
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))'
                  : certifiedTier
                    ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
                    : 'linear-gradient(135deg, rgba(16,185,129,0.12), transparent)',
                borderColor: certifiedTier === 'gold'
                  ? 'rgba(245,158,11,0.3)'
                  : certifiedTier
                    ? 'rgba(16,185,129,0.3)'
                    : 'rgba(16,185,129,0.2)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Shield className={`h-6 w-6 ${certifiedTier === 'gold' ? 'text-amber-400' : 'text-emerald-400'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {certifiedTier === 'gold'
                      ? '⭐ God-Tier Certified!'
                      : certifiedTier
                        ? `${certifiedSkill || 'Skill'} Certified`
                        : 'All Agents Certified'}
                  </h3>
                  <p className="text-sm text-titan-muted/80">
                    {certifiedTier === 'gold'
                      ? 'Exceptional quality — this skill is production-ready and exceeds all standards.'
                      : certifiedTier
                        ? `Audit completed: ${certifiedTier.toUpperCase()} tier (${certifiedScore}%). ${certifiedTier === 'silver' ? 'Minor improvements suggested.' : certifiedTier === 'bronze' ? 'Some violations to address.' : 'Needs significant rework.'}`
                        : 'Your swarm passed all security checks — no vulnerabilities found'}
                  </p>
                </div>
                <Badge
                  className="ml-auto border-0 text-xs font-mono"
                  style={{
                    background: certifiedTier === 'gold'
                      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                      : certifiedTier
                        ? '#10B981'
                        : '#10B981',
                    color: certifiedTier === 'gold' ? '#0A0E17' : 'white',
                  }}
                >
                  {certifiedTier === 'gold' ? '✦ GOLD' : certifiedTier ? `✓ ${certifiedTier.toUpperCase()}` : '✓ Certified'}
                </Badge>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'OWASP Top 10', checks: ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design'], score: 96 },
                { name: 'TDAD Compliance', checks: ['Data Privacy', 'Model Transparency', 'Audit Trail', 'Bias Check'], score: 94 },
                { name: 'Agent Behavior', checks: ['Scope Limits', 'Permission Boundary', 'Escalation Path', 'Logging'], score: 98 },
                { name: 'Supply Chain', checks: ['Dependency Scan', 'License Check', 'Version Audit', 'Signature Verify'], score: 91 },
              ].map((a, i) => (
                <motion.div key={i} className="p-4 rounded-xl bg-titan-card/60 border border-titan-border/30 hover:border-emerald-500/30 transition-all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">{a.name}</h4>
                    <span className="text-lg font-mono font-bold" style={{ color: '#10B981' }}>{a.score}%</span>
                  </div>
                  <div className="space-y-1.5">
                    {a.checks.map((c, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-titan-muted">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <span className="text-[8px] text-emerald-400">✓</span>
                        </span>
                        {c}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              ROI TAB — Value Dashboard (teal/emerald metrics, productivity bars)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="roi" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#14B8A6' }} />
              <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#14B8A6' }}>VALUE DASHBOARD</h2>
              <span className="text-[10px] font-mono text-titan-muted/50">// savings & productivity</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Time Saved', get value() { return (progression.totalTasksRun * 0.25).toFixed(1) + 'h'; }, unit: 'total', icon: Zap, color: 'text-teal-400' },
                { label: 'Money Saved', get value() { return (progression.totalTasksRun * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + '$'; }, unit: 'total', icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'Tasks Autod', get value() { const t = progression.totalTasksRun; return t >= 1000 ? (t / 1000).toFixed(1) + 'k' : String(t); }, unit: 'completed', icon: Orbit, color: 'text-amber-400' },
              ].map((m, i) => (
                <motion.div key={i} className="p-5 rounded-xl bg-titan-card/60 border border-titan-border/30 hover:border-teal-500/30 transition-all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-mono text-titan-muted">{m.label}</p>
                    <m.icon className={`h-4 w-4 ${m.color}`} />
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{m.value}</p>
                  <p className="text-[11px] text-titan-muted/70 mt-1">{m.unit}</p>
                </motion.div>
              ))}
            </div>

            <Card className="p-5 bg-titan-card/60 border-teal-500/20">
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#14B8A6' }}>Agent Productivity</h3>
              <div className="space-y-3">
                {orderedAgents.map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-3">
                    <span className="text-lg">{agent.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-titan-muted">{agent.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="h-1.5 bg-titan-border/30 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full"
                          style={{ width: `${Math.min((agent.xp / agent.xpToNext) * 100, 100)}%`, background: `linear-gradient(90deg, ${agent.color}, ${agent.color}88)` }}
                          initial={{ width: 0 }} animate={{ width: `${Math.min((agent.xp / agent.xpToNext) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }} />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-titan-muted/70">{agent.specialty}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              BAU TAB — Automation Hub (violet, task cards with animated progress)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="bau" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
              <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#7C3AED' }}>AUTOMATION HUB</h2>
              <span className="text-[10px] font-mono text-titan-muted/50">// scheduled routines & cron</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Daily Report', status: 'active', schedule: 'Every 8h', last: '2h ago', desc: 'Swarm activity summary + key metrics' },
                { name: 'Market Scan', status: 'active', schedule: 'Every 4h', last: '1h ago', desc: 'Crypto + travel price monitoring' },
                { name: 'Budget Check', status: 'active', schedule: 'Daily 9AM', last: 'Today', desc: 'Expense tracking + savings report' },
                { name: 'Content Digest', status: 'paused', schedule: 'Weekly Mon', last: '3d ago', desc: 'Curated reading list from research agents' },
              ].map((task, i) => (
                <motion.div key={i} className="p-4 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))', border: '1px solid rgba(124,58,237,0.2)' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  {/* Animated wave progress bar */}
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }}
                    animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">{task.name}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${task.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs text-titan-muted/80 mb-2">{task.desc}</p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-titan-muted">
                    <span>🕐 {task.schedule}</span>
                    <span>⚡ {task.last}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════════════
              PROGRESSION TAB — Achievement Hall (golden, milestone track, God-Tier)
             ═══════════════════════════════════════════════════════════════════════ */}
          <TabsContent value="progression" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
              <h2 className="text-sm font-mono font-semibold tracking-wider" style={{ color: '#F59E0B' }}>ACHIEVEMENT HALL</h2>
              <span className="text-[10px] font-mono text-titan-muted/50">// milestones & God-Tier</span>
            </div>

            {/* God-Tier Banner with golden glow */}
            <motion.div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(20,184,166,0.05))', border: '1px solid rgba(245,158,11,0.3)' }}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.3) 0%, transparent 60%)' }}
                animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center"><Rocket className="h-6 w-6 text-amber-400" /></div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#F59E0B' }}>Progression System</h3>
                  <p className="text-sm text-titan-muted/80">Level up agents to unlock God-Tier capabilities</p>
                </div>
                <Badge className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 text-xs font-mono font-bold">Next Lv.30</Badge>
              </div>
            </motion.div>

            {/* Agent Evolution Toggle */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <motion.button
                onClick={() => setKeepBasicLook(prev => !prev)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all border ${
                  keepBasicLook
                    ? 'bg-titan-surface/60 border-titan-border/30 text-titan-muted/60'
                    : 'bg-gradient-to-r from-titan-teal/20 to-titan-golden/20 border-titan-teal/30 text-titan-text shadow-sm'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${keepBasicLook ? 'bg-titan-muted/40' : 'bg-titan-teal'}`} />
                  Agent Evolution: {keepBasicLook ? 'OFF' : 'ON'}
                </span>
              </motion.button>
              {keepBasicLook && (
                <span className="text-[10px] font-mono text-titan-muted/50">Tier locked to basic look</span>
              )}
              {!keepBasicLook && (
                <span className="text-[10px] font-mono text-titan-muted/50">Tier auto-evolves from level</span>
              )}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Unlocked Achievements', value: `${progression.achievements.length}/5`, desc: 'First Skill Run, Skill Forger, Gold Standard, Swarm Commander, Pro' },
                { title: 'God-Tier Agents', value: '0', desc: 'Reach Lv.30+ to unlock self-evolving' },
                { title: 'Total XP Earned', value: progression.totalXp.toLocaleString(), desc: 'Across all agents in your swarm' },
              ].map((s, i) => (
                <motion.div key={i} className="p-4 rounded-xl bg-titan-card/60 border border-titan-border/30" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <p className="text-2xl font-bold" style={{ color: i === 1 ? '#F59E0B' : i === 2 ? '#10B981' : '#14B8A6' }}>{s.value}</p>
                  <p className="text-sm font-semibold mt-1">{s.title}</p>
                  <p className="text-[11px] text-titan-muted/70 mt-1">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Achievement Grid — driven by progression state */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'First Skill Run', emoji: '🏆' },
                { name: 'Skill Forger', emoji: '⚡' },
                { name: 'Gold Standard', emoji: '🌟' },
                { name: 'Swarm Commander', emoji: '🌀' },
                { name: 'Pro', emoji: '💎' },
              ].map((ach) => {
                const unlocked = progression.achievements.includes(ach.name);
                return (
                  <motion.div key={ach.name} className={`p-3 rounded-xl border text-center ${unlocked ? 'bg-titan-card/60 border-amber-500/20' : 'bg-titan-surface/40 border-titan-border/10 opacity-40'}`} whileHover={unlocked ? { y: -2 } : {}}>
                    <span className={`text-2xl ${unlocked ? '' : 'grayscale'}`}>{ach.emoji}</span>
                    <p className="text-xs mt-1">{ach.name}</p>
                    {unlocked && <p className="text-[9px] font-mono mt-0.5" style={{ color: '#10B981' }}>✓ Unlocked</p>}
                    {!unlocked && <p className="text-[9px] font-mono mt-0.5" style={{ color: '#64748B' }}>🔒 Locked</p>}
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Audit Result Modal (Feature 3) ── */}
        <AnimatePresence>
          {showAuditModal && auditResult && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseAuditModal}
              />
              {/* Modal */}
              <motion.div
                className="relative z-10 w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #0F172A, #1E2937)',
                  borderColor: auditResult.auditTier === 'gold'
                    ? 'rgba(245,158,11,0.4)'
                    : auditResult.auditTier === 'silver'
                      ? 'rgba(148,163,184,0.4)'
                      : auditResult.auditTier === 'bronze'
                        ? 'rgba(217,119,6,0.4)'
                        : 'rgba(239,68,68,0.4)',
                }}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" style={{
                      color: auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                    }} />
                    <h3 className="text-base font-bold">Audit Results</h3>
                  </div>
                  <Badge
                    className="text-[10px] font-mono border-0"
                    style={{
                      background: auditResult.auditTier === 'gold'
                        ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                        : auditResult.auditTier === 'silver'
                          ? 'linear-gradient(135deg, #94A3B8, #64748B)'
                          : auditResult.auditTier === 'bronze'
                            ? 'linear-gradient(135deg, #D97706, #B45309)'
                            : 'linear-gradient(135deg, #EF4444, #DC2626)',
                      color: auditResult.auditTier === 'gold' ? '#0A0E17' : '#fff',
                    }}
                  >
                    {auditResult.auditTier.toUpperCase()}
                  </Badge>
                </div>

                {/* Score ring */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke={auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - auditResult.overallScore / 100) }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <span className="text-2xl font-bold font-mono" style={{
                      color: auditResult.auditTier === 'gold' ? '#F59E0B' : auditResult.auditTier === 'silver' ? '#94A3B8' : auditResult.auditTier === 'bronze' ? '#D97706' : '#EF4444'
                    }}>{auditResult.overallScore}%</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-titan-muted/80 mb-4 leading-relaxed text-center">{auditResult.summary}</p>

                {/* Categories */}
                <div className="space-y-2 mb-4">
                  {auditResult.categories.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${cat.passed ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                        <span className={`text-[8px] ${cat.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                          {cat.passed ? '✓' : '✗'}
                        </span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-medium truncate">{cat.name}</span>
                          <span style={{
                            color: cat.passed ? '#10B981' : '#EF4444',
                          }} className="font-mono">{cat.score}/{cat.maxScore}</span>
                        </div>
                        <div className="h-1 bg-titan-border/20 rounded-full overflow-hidden mt-0.5">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: cat.passed ? '#10B981' : '#EF4444' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Violations */}
                {auditResult.violations.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-red-400/80 mb-1.5 uppercase tracking-wider">
                      ⚠ {auditResult.violations.length} Violation{auditResult.violations.length > 1 ? 's' : ''}
                    </p>
                    <div className="space-y-1">
                      {auditResult.violations.map((v, i) => (
                        <div key={i} className="text-[10px] font-mono text-red-400/60 bg-red-500/5 rounded px-2 py-1">
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close button */}
                <Button
                  className="w-full text-xs font-semibold"
                  onClick={handleCloseAuditModal}
                  style={{
                    background: auditResult.auditTier === 'gold'
                      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                      : 'linear-gradient(135deg, #14B8A6, #0D9488)',
                    color: auditResult.auditTier === 'gold' ? '#0A0E17' : '#fff',
                  }}
                >
                  {auditResult.auditTier === 'gold' ? '✦ Certified!' : 'Close'}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Level-Up Toast (bottom-right) ── */}
        <AnimatePresence>
          {levelUpToast.visible && (
            <motion.div
              className="fixed bottom-6 right-6 z-[60] max-w-xs"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="p-4 rounded-2xl border shadow-2xl backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,184,166,0.2), rgba(245,158,11,0.15))',
                  borderColor: 'rgba(245,158,11,0.3)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-teal-500/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-amber-400">Level Up! Lv.{levelUpToast.level}</p>
                    <p className="text-[11px] text-titan-muted/80 mt-0.5">{levelUpToast.message}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Achievement Toast (bottom-right, offset above level-up) ── */}
        <AnimatePresence>
          {achievementToast.visible && (
            <motion.div
              className="fixed bottom-24 right-6 z-[60] max-w-xs"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="p-4 rounded-2xl border shadow-2xl backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(20,184,166,0.15))',
                  borderColor: 'rgba(16,185,129,0.3)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-emerald-400">Achievement Unlocked!</p>
                    <p className="text-[11px] text-titan-muted/80 mt-0.5">✨ {achievementToast.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Moltbook Feed (right sidebar on desktop) — polished with type icons, stagger, scroll-to-bottom, mark-as-read */}
        <div className="hidden lg:block fixed right-6 top-24 w-72">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-titan-teal animate-pulse-teal" />
            <span className="text-[10px] font-mono text-titan-muted tracking-widest uppercase">Moltbook</span>
            {bauEntries.length >= 5 && (
              <button
                onClick={() => setBauEntries(prev => prev.slice(0, 10))}
                className="ml-auto text-[9px] font-mono text-titan-muted/50 hover:text-titan-teal transition-colors underline underline-offset-2"
              >
                Clear old
              </button>
            )}
          </div>
          {/* Scrollable feed container */}
          <div
            ref={feedScrollRef}
            onScroll={handleFeedScroll}
            className="space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 scrollbar-thin"
          >
            {bauEntries.slice(0, 50).map((entry, i) => {
              // Icon by entry type
              const TypeIcon = entry.type === 'levelup'
                ? Trophy
                : entry.type === 'achievement'
                  ? Star
                  : entry.type === 'task'
                    ? CheckCircle
                    : Lightbulb;
              const iconColor = entry.type === 'levelup'
                ? '#F59E0B'
                : entry.type === 'achievement'
                  ? '#14B8A6'
                  : entry.type === 'task'
                    ? '#7C3AED'
                    : '#10B981';
              return (
                <motion.div
                  key={entry.id}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer group ${
                    entry.read
                      ? 'bg-titan-card/20 border-titan-border/10 opacity-50 hover:opacity-70'
                      : 'bg-titan-card/40 border-titan-border/20 hover:border-titan-teal/20 hover:bg-titan-card/60'
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => handleMarkRead(entry.id)}
                  title="Click to mark as read"
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 shrink-0">
                      <TypeIcon className="h-3.5 w-3.5" style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium">{entry.name}</span>
                        <span className="text-[8px] text-titan-muted/50">{entry.time}</span>
                      </div>
                      <p className="text-[10px] text-titan-muted/70 mt-0.5 line-clamp-2 leading-relaxed">{entry.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Scroll-to-bottom button */}
          <AnimatePresence>
            {feedScrolledUp && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollFeedToBottom}
                className="mt-2 w-full text-[9px] font-mono text-titan-teal/70 bg-titan-card/60 backdrop-blur-md border border-titan-teal/20 rounded-lg py-1.5 hover:text-titan-teal transition-colors"
              >
                ↓ Scroll to bottom
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mascot picker modal — click mascot avatar to open */}
      <MascotPickerModal />
    </motion.div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────
// Defaults to the warm Living Ecosystem (retail-friendly) instantly.


export default function TitanApp() {
  const [theme, setTheme] = useState<TitanTheme>('game');
  const [onboarded, setOnboarded] = useState(false);

  const handleThemeSelect = useCallback((selected: TitanTheme) => {
    setTheme(selected);
    setOnboarded(true);
  }, []);

  // Show landing page first, always
  if (!onboarded) {
    return (
      <>
        <ThemePicker onSelect={handleThemeSelect} />
        <MascotPickerModal />
      </>
    );
  }

  return <GameDashboard theme={theme} setTheme={setTheme} />;
}

// Need Layers icon for Swarm tab
function Layers(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
    </svg>
  );
}
