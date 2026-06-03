"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useMascotStore } from "@/stores/mascotStore";
import {
  Zap, TrendingUp, Clock, Shield, Bot, Star,
  ArrowRight, Layers, Sparkles, Trophy, ChevronRight, Orbit,
} from "lucide-react";
import type { FeedEntry } from "@/lib/persistence";

// ─── New Palette ────────────────────────────────────────────────────────
// Page bg: #F8F6F3, Card bg: #FFFFFF
// Card border: 1px solid #E5E0D8, shadow: 0 10px 30px -10px rgba(31,31,31,0.08)
// Primary text: #1F1F1F, Secondary: #666666
// Accent teal: #0EA5A5, Accent gold: #D4A017
// Button height: 56px, border-radius 16px
// Card border-radius: 20px, padding: 24px

interface HomeDashboardProps {
  progression: {
    totalXp: number;
    totalTasksRun: number;
    skillsCertified: number;
    goldSkills: number;
  };
  agentLevel: number;
  recentFeed: FeedEntry[];
  onNavigate: (tab: string) => void;
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color,
  onClick,
  statIndex,
  focusedStatIndex,
  onFocus,
  refCallback,
}: {
  label: string;
  value: string;
  icon: typeof Zap;
  trend?: string;
  color: string;
  onClick?: () => void;
  statIndex?: number;
  focusedStatIndex?: number;
  onFocus?: () => void;
  refCallback?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={refCallback}
      tabIndex={0}
      onFocus={onFocus}
      className="relative p-4 rounded-xl border cursor-pointer group overflow-hidden"
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E0D8',
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        ...(focusedStatIndex !== undefined && statIndex !== undefined && focusedStatIndex === statIndex
          ? { outline: '2px solid #0EA5A5', outlineOffset: '2px' }
          : {}),
      }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)`,
        }}
      />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] sm:text-xs font-mono mb-1" style={{ color: '#666666' }}>{label}</p>
          <p className="text-lg sm:text-2xl font-bold font-mono" style={{ color }}>
            {value}
          </p>
          {trend && (
            <p className="text-[9px] sm:text-[10px] font-mono mt-0.5" style={{ color: '#666666' }}>{trend}</p>
          )}
        </div>
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

function QuickNavCard({
  label,
  description,
  icon: Icon,
  color,
  onClick,
  badge,
  quickIndex,
  focusedQuickIndex,
  onFocus,
  refCallback,
}: {
  label: string;
  description: string;
  icon: typeof Bot;
  color: string;
  onClick: () => void;
  badge?: string;
  quickIndex?: number;
  focusedQuickIndex?: number;
  onFocus?: () => void;
  refCallback?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <motion.button
      ref={refCallback}
      tabIndex={0}
      onFocus={onFocus}
      className="relative p-4 rounded-xl border text-left w-full group"
      style={{
        background: '#FFFFFF',
        borderColor: `${color}20`,
        boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
        ...(focusedQuickIndex !== undefined && quickIndex !== undefined && focusedQuickIndex === quickIndex
          ? { outline: `2px solid ${color}`, outlineOffset: '2px' }
          : {}),
      }}
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at 0% 50%, ${color}05, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-3 relative z-10">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs sm:text-sm font-semibold font-mono" style={{ color: '#1F1F1F' }}>{label}</p>
            {badge && (
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full"
                style={{ background: `${color}12`, color }}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-[9px] sm:text-[10px] mt-0.5 truncate" style={{ color: '#666666' }}>{description}</p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform shrink-0" style={{ color }} />
      </div>
    </motion.button>
  );
}

export default function HomeDashboard({ progression, agentLevel, recentFeed, onNavigate }: HomeDashboardProps) {
  const { currentMascot, openPicker } = useMascotStore();
  const [focusedQuickIndex, setFocusedQuickIndex] = useState(-1);
  const [focusedStatIndex, setFocusedStatIndex] = useState(-1);
  const quickRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const todayImpact = useMemo(() => {
    const tasks = progression.totalTasksRun;
    const moneySaved = (tasks * 3.8).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const timeSaved = (tasks * 0.25).toFixed(1);
    return { tasks, moneySaved, timeSaved };
  }, [progression.totalTasksRun]);

  const nextLevelXp = agentLevel * 500;
  const xpProgress = Math.min(100, (progression.totalXp / nextLevelXp) * 100);

  const recentActivity = useMemo(() => {
    return recentFeed.slice(0, 4);
  }, [recentFeed]);

  // ─── Keyboard Navigation ───────────────────────────────────────────

  const scrollToQuick = useCallback((idx: number) => {
    const el = quickRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const scrollToStat = useCallback((idx: number) => {
    const el = statRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  // Quick actions: 4 items
  const quickLabels = ['Skill Forge', 'Automation Hub', 'Security Center', 'Progression'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enable stat nav when stats are focused
      if (focusedStatIndex >= 0) {
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            setFocusedStatIndex(prev => { const next = Math.min(prev + 1, 2); scrollToStat(next); return next; });
            return;
          case 'ArrowLeft':
            e.preventDefault();
            setFocusedStatIndex(prev => { const next = Math.max(prev - 1, 0); scrollToStat(next); return next; });
            return;
          case 'ArrowDown':
            e.preventDefault();
            setFocusedStatIndex(-1);
            setFocusedQuickIndex(0);
            scrollToQuick(0);
            return;
          case 'Escape':
            e.preventDefault();
            setFocusedStatIndex(-1);
            return;
        }
        return;
      }

      if (focusedQuickIndex >= 0) {
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            setFocusedQuickIndex(prev => { const next = Math.min(prev + 1, 3); scrollToQuick(next); return next; });
            return;
          case 'ArrowLeft':
            e.preventDefault();
            setFocusedQuickIndex(prev => { const next = Math.max(prev - 1, 0); scrollToQuick(next); return next; });
            return;
          case 'ArrowUp':
            e.preventDefault();
            setFocusedQuickIndex(-1);
            setFocusedStatIndex(0);
            scrollToStat(0);
            return;
          case 'Enter':
          case ' ':
            if (focusedQuickIndex >= 0 && focusedQuickIndex < quickLabels.length) {
              e.preventDefault();
              const tabMap: Record<string, string> = {
                'Skill Forge': 'forge',
                'Automation Hub': 'bau',
                'Security Center': 'audit',
                'Progression': 'progression',
              };
              const tab = tabMap[quickLabels[focusedQuickIndex]];
              if (tab) onNavigate(tab);
            }
            return;
          case 'Escape':
            e.preventDefault();
            setFocusedQuickIndex(-1);
            return;
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedStatIndex, focusedQuickIndex, onNavigate, scrollToQuick, scrollToStat]);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome header avec mascot + greeting */}
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.div
          className="relative shrink-0 cursor-pointer group"
          whileHover={{ scale: 1.08 }}
          onClick={openPicker}
        >
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(circle, ${currentMascot.colorTint}20, transparent 70%)`,
              boxShadow: `0 0 20px ${currentMascot.colorTint}20`,
            }}
          >
            <img
              src={currentMascot.image}
              alt={currentMascot.name}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
              style={{ filter: `drop-shadow(0 0 8px ${currentMascot.colorTint}60)` }}
            />
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white"
            style={{ background: currentMascot.colorTint }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white" />
          </motion.div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-xl font-bold" style={{ color: '#1F1F1F' }}>
            {currentMascot.name}
            <span className="ml-2 text-xs font-mono" style={{ color: '#666666' }}>Lv.{agentLevel}</span>
          </h1>
          <p className="text-[10px] sm:text-xs font-mono mt-0.5" style={{ color: '#666666' }}>
            {currentMascot.description}
          </p>
          {/* XP bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 sm:h-2 rounded-full overflow-hidden" style={{ background: '#E5E0D8' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${currentMascot.colorTint}, #D4A017)` }}
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono shrink-0" style={{ color: '#666666' }}>
              {progression.totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* Today's Impact — Value metrics cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-3 w-3" style={{ color: '#D4A017' }} />
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#666666' }}>Today&apos;s Impact</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard
            label="Tasks Done"
            value={todayImpact.tasks.toString()}
            icon={Bot}
            color="#0EA5A5"
            trend="swarm executed"
            onClick={() => onNavigate("swarm")}
            statIndex={0}
            focusedStatIndex={focusedStatIndex}
            onFocus={() => setFocusedStatIndex(0)}
            refCallback={(el) => { statRefs.current[0] = el; }}
          />
          <StatCard
            label="Time Saved"
            value={`${todayImpact.timeSaved}h`}
            icon={Clock}
            color="#10B981"
            trend="automated hours"
            onClick={() => onNavigate("bau")}
            statIndex={1}
            focusedStatIndex={focusedStatIndex}
            onFocus={() => setFocusedStatIndex(1)}
            refCallback={(el) => { statRefs.current[1] = el; }}
          />
          <StatCard
            label="Value Created"
            value={`$${todayImpact.moneySaved}`}
            icon={TrendingUp}
            color="#D4A017"
            trend="total savings"
            onClick={() => onNavigate("roi")}
            statIndex={2}
            focusedStatIndex={focusedStatIndex}
            onFocus={() => setFocusedStatIndex(2)}
            refCallback={(el) => { statRefs.current[2] = el; }}
          />
        </div>
      </div>

      {/* Mini swarm + quick actions — two columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Mini Swarm Preview */}
        <motion.div
          className="relative p-4 sm:p-5 rounded-xl border overflow-hidden group"
          style={{
            background: '#FFFFFF',
            borderColor: `${currentMascot.colorTint}15`,
            boxShadow: '0 10px 30px -10px rgba(31,31,31,0.08)',
          }}
          whileHover={{ y: -2, scale: 1.005 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${currentMascot.colorTint}05, transparent 70%)`,
            }}
          />
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-3.5 w-3.5" style={{ color: currentMascot.colorTint }} />
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#666666' }}>Active Swarm</span>
          </div>

          <div className="flex items-center justify-center py-4 sm:py-6">
            <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-full h-full"
                style={{
                  border: `1px solid ${currentMascot.colorTint}15`,
                  background: `radial-gradient(circle, ${currentMascot.colorTint}05, transparent 60%)`,
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={openPicker}
              >
                <img
                  src={currentMascot.image}
                  alt={currentMascot.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg cursor-pointer"
                  style={{ filter: `drop-shadow(0 0 10px ${currentMascot.colorTint}60)` }}
                />
              </motion.div>

              {[
                { color: "#0EA5A5", angle: 0 },
                { color: "#D4A017", angle: 72 },
                { color: "#10B981", angle: 144 },
                { color: "#7C3AED", angle: 216 },
                { color: "#EC4899", angle: 288 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full z-10"
                  style={{
                    background: dot.color,
                    boxShadow: `0 0 6px ${dot.color}60`,
                  }}
                  animate={{
                    x: [60 * Math.cos((dot.angle * Math.PI) / 180), 60 * Math.cos(((dot.angle + 360) * Math.PI) / 180)],
                    y: [60 * Math.sin((dot.angle * Math.PI) / 180), 60 * Math.sin(((dot.angle + 360) * Math.PI) / 180)],
                  }}
                  transition={{
                    duration: 12 - i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>

          <motion.button
            className="w-full py-2 rounded-lg text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all group"
            style={{
              height: '56px',
              borderRadius: '16px',
              background: `${currentMascot.colorTint}12`,
              color: currentMascot.colorTint,
            }}
            whileHover={{ scale: 1.01 }}
            onClick={() => onNavigate("swarm")}
          >
            Open Swarm View
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Quick actions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-3 w-3" style={{ color: '#D4A017' }} />
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#666666' }}>Quick Actions</span>
          </div>
          <QuickNavCard
            label="Skill Forge"
            description="Craft new skills & templates"
            icon={Bot}
            color="#D4A017"
            badge="New"
            onClick={() => onNavigate("forge")}
            quickIndex={0}
            focusedQuickIndex={focusedQuickIndex}
            onFocus={() => setFocusedQuickIndex(0)}
            refCallback={(el) => { quickRefs.current[0] = el; }}
          />
          <QuickNavCard
            label="Automation Hub"
            description="Manage BAU & scheduled tasks"
            icon={Orbit as typeof Bot}
            color="#7C3AED"
            onClick={() => onNavigate("bau")}
            quickIndex={1}
            focusedQuickIndex={focusedQuickIndex}
            onFocus={() => setFocusedQuickIndex(1)}
            refCallback={(el) => { quickRefs.current[1] = el; }}
          />
          <QuickNavCard
            label="Security Center"
            description="Certifications & trust scores"
            icon={Shield}
            color="#10B981"
            onClick={() => onNavigate("audit")}
            quickIndex={2}
            focusedQuickIndex={focusedQuickIndex}
            onFocus={() => setFocusedQuickIndex(2)}
            refCallback={(el) => { quickRefs.current[2] = el; }}
          />
          <QuickNavCard
            label="Progression"
            description="Achievements & milestones"
            icon={Trophy}
            color="#D4A017"
            onClick={() => onNavigate("progression")}
            quickIndex={3}
            focusedQuickIndex={focusedQuickIndex}
            onFocus={() => setFocusedQuickIndex(3)}
            refCallback={(el) => { quickRefs.current[3] = el; }}
          />
        </div>
      </div>

      {/* Recent Activity Feed */}
      {recentActivity.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-3 w-3" style={{ color: '#0EA5A5' }} />
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#666666' }}>Recent Activity</span>
          </div>
          <div className="space-y-1.5">
            {recentActivity.map((entry, i) => (
              <motion.div
                key={entry.id}
                className="flex items-center gap-2.5 p-2 rounded-lg border"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E0D8',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-sm">{entry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] truncate" style={{ color: '#1F1F1F' }}>{entry.text}</p>
                  <p className="text-[9px] font-mono mt-0.5" style={{ color: '#666666' }}>{entry.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* XP stat + system health banner */}
      <motion.div
        className="p-3 rounded-xl border flex items-center gap-3 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(14,165,165,0.05))',
          borderColor: 'rgba(16,185,129,0.25)',
        }}
        whileHover={{ y: -1 }}
        onClick={() => onNavigate("audit")}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Shield className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-400">All Systems Secure</p>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: '#666666' }}>
            {progression.skillsCertified} skills certified · {progression.goldSkills} gold standard
          </p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: '#10B981' }} />
      </motion.div>
    </motion.div>
  );
}
