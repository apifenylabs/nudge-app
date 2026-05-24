"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Trophy, Sun, Cuboid, Zap, Bot, Shield, TrendingUp,
  Orbit, Rocket, Puzzle, Layers, CreditCard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { loadProgression, loadFeed, saveFeed } from "@/lib/persistence";
import { useMascotStore } from "@/stores/mascotStore";
import { MAIN_AGENT } from "@/lib/dashboard-store";
import type { FeedEntry } from "@/lib/persistence";
import MascotDisplay, { MascotPickerModal } from "@/components/molecules/MascotDisplay";

// ─── Theme Configuration ────────────────────────────────────────────────

export type DashboardTheme = "game" | "modular" | "minimal";

const THEMES: { id: DashboardTheme; label: string; description: string }[] = [
  { id: "game", label: "Living Ecosystem", description: "Warm glowing agents, orbiting swarm, emotional rewards" },
  { id: "modular", label: "Modular", description: "Clean card grid, metrics first, professional" },
  { id: "minimal", label: "Minimal", description: "Dark, focused, distraction-free" },
];

// ─── Navigation Items ──────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: typeof Bot;
  color: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Layers, color: "#14B8A6", path: "/dashboard" },
  { id: "swarm", label: "Swarm", icon: Layers, color: "#14B8A6", path: "/dashboard/swarm" },
  { id: "forge", label: "Forge", icon: Bot, color: "#F59E0B", path: "/dashboard/forge" },
  { id: "lifeos", label: "LifeOS", icon: Puzzle, color: "#14B8A6", path: "/dashboard/lifeos" },
  { id: "security", label: "Security", icon: Shield, color: "#10B981", path: "/dashboard/security" },
  { id: "automation", label: "Automation", icon: Orbit, color: "#7C3AED", path: "/dashboard/automation" },
  { id: "progression", label: "Progression", icon: Rocket, color: "#F59E0B", path: "/dashboard/progression" },
  { id: "billing", label: "Billing", icon: CreditCard, color: "#14B8A6", path: "/dashboard/billing" },
];

// ─── XP Bar ────────────────────────────────────────────────────────────

function XPBar({ current, max }: { current: number; max: number }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="w-24">
      <div className="h-1.5 bg-[#E5E0D8]/40 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #0EA5A5, #D4A017)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<DashboardTheme>("game");
  const [threeDMode, setThreeDMode] = useState(false);
  const [progression, setProgression] = useState({ totalXp: 0, totalTasksRun: 0 });

  const { currentMascot, openPicker } = useMascotStore();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('titan-3d-mode');
      if (saved === 'true') setThreeDMode(true);
      const prog = loadProgression();
      setProgression({ totalXp: prog.totalXp, totalTasksRun: prog.totalTasksRun });
    } catch {}
  }, []);

  const handleThreeDToggle = useCallback(() => {
    setThreeDMode((prev) => {
      const next = !prev;
      try { localStorage.setItem('titan-3d-mode', String(next)); } catch {}
      return next;
    });
  }, []);

  const activeTab = useMemo(() => {
    const item = NAV_ITEMS.find(n => n.path === pathname);
    return item?.id ?? "home";
  }, [pathname]);

  const handleNavigate = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  const estValue = (progression.totalTasksRun * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // ▸ Off-white monotone palette is the default for dashboard mode
  //   Theme toggle (dark teal/gold) stored in localStorage

  return (
    <motion.div
      className="min-h-screen relative"
      style={{ background: '#F8F6F3' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b backdrop-blur-sm"
        style={{ borderColor: '#E5E0D8', background: 'rgba(255,255,255,0.85)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border"
              style={{
                background: 'linear-gradient(135deg, #0EA5A5/20, #D4A017/10)',
                borderColor: '#0EA5A5/20'
              }}>
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: '#0EA5A5' }} />
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: '#1F1F1F' }}>TITAN</h1>
            <Badge className="hidden sm:inline-flex text-[10px] tracking-widest uppercase font-mono"
              style={{
                background: '#0EA5A5/10',
                color: '#0EA5A5',
                borderColor: '#0EA5A5/20'
              }}>
              v0.4 · Living
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Theme indicator */}
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-1 rounded-full border"
              style={{
                color: '#666666',
                background: '#FFFFFF',
                borderColor: '#E5E0D8'
              }}>
              <Sun className="h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ color: '#D4A017' }} />
              <span className="hidden sm:inline" style={{ color: '#666666' }}>{THEMES.find(t => t.id === theme)?.label}</span>
            </div>

            {/* Level + XP */}
            <div className="hidden md:flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5" style={{ color: '#D4A017' }} />
              <span className="text-xs font-mono font-semibold" style={{ color: '#D4A017' }}>Lv{MAIN_AGENT.level}</span>
              <XPBar current={progression.totalXp} max={MAIN_AGENT.xpToNext} />
            </div>

            {/* 3D Toggle */}
            <button
              onClick={handleThreeDToggle}
              className="flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full border transition-all"
              style={{
                background: threeDMode ? '#0EA5A5/15' : '#FFFFFF',
                borderColor: threeDMode ? '#0EA5A5/40' : '#E5E0D8',
                color: threeDMode ? '#0EA5A5' : '#666666',
              }}
              title={threeDMode ? '3D Agents (on)' : '3D Agents (off)'}
            >
              <Cuboid className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline font-mono">3D</span>
            </button>

            {/* Billing / Plan badge */}
            <button
              onClick={() => router.push('/dashboard/billing')}
              className="flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full border transition-all cursor-pointer"
              style={{
                background: '#0EA5A5/8',
                borderColor: '#0EA5A5/20',
                color: '#0EA5A5',
              }}
              title="Manage Billing"
            >
              <CreditCard className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden sm:inline font-mono">Plan</span>
            </button>

            {/* ROI widget */}
            <div className="flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full border"
              style={{
                background: '#0EA5A5/10',
                borderColor: '#0EA5A5/20',
                color: '#0EA5A5'
              }}>
              <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="font-mono font-medium">+${estValue}</span>
            </div>

            {/* Mascot avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex items-center justify-center border cursor-pointer hover:scale-110 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #0EA5A5/30, #D4A017/20)',
                borderColor: '#0EA5A5/30'
              }}
              onClick={openPicker}>
              <img src={currentMascot.image} alt={currentMascot.name}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-md"
                style={{ filter: `drop-shadow(0 0 4px ${currentMascot.colorTint}60)` }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── View-switch pill ── */}
      <div className="flex justify-center pt-2 sm:pt-3">
        <div className="flex items-center gap-1 rounded-full p-0.5 shadow-sm border"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E0D8',
          }}>
          {(['game' as const, 'modular' as const]).map(v => (
            <button
              key={v}
              onClick={() => setTheme(v)}
              className="px-4 py-1.5 rounded-full text-[11px] font-mono transition-all"
              style={{
                background: theme === v
                  ? 'linear-gradient(135deg, #0EA5A5/25, #D4A017/15)'
                  : 'transparent',
                color: theme === v ? '#1F1F1F' : '#666666',
                boxShadow: theme === v ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {v === 'game' ? '🌿 Living Ecosystem' : '🧩 Modular Dashboard'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 overflow-x-auto">
        <nav className="inline-flex gap-1 p-1 rounded-xl border"
          style={{
            background: '#FFFFFF',
            borderColor: '#E5E0D8',
          }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className="px-3 py-1.5 rounded-lg text-xs gap-1.5 transition-all duration-200 flex items-center whitespace-nowrap"
                style={{
                  background: isActive ? `${item.color}10` : 'transparent',
                  color: isActive ? item.color : '#666666',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Main Content ── */}
      <main className="relative max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {children}
      </main>

      <MascotPickerModal />
    </motion.div>
  );
}
