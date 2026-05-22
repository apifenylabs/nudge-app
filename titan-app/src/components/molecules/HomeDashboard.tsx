"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMascotStore } from "@/stores/mascotStore";
import {
  Zap, TrendingUp, Clock, Shield, Bot, Star,
  ArrowRight, Layers, Sparkles, Trophy, ChevronRight, Orbit,
} from "lucide-react";
import type { MascotDef } from "@/data/mascots";
import type { ProgressionData, FeedEntry } from "@/lib/persistence";

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
}: {
  label: string;
  value: string;
  icon: typeof Zap;
  trend?: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="relative p-3 sm:p-4 rounded-xl border bg-titan-card/60 backdrop-blur-sm cursor-pointer group overflow-hidden"
      style={{ borderColor: `${color}25` }}
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
          <p className="text-[10px] sm:text-xs font-mono text-titan-muted/70 mb-1">{label}</p>
          <p className="text-lg sm:text-2xl font-bold font-mono" style={{ color }}>
            {value}
          </p>
          {trend && (
            <p className="text-[9px] sm:text-[10px] text-titan-muted/50 mt-0.5 font-mono">{trend}</p>
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
}: {
  label: string;
  description: string;
  icon: typeof Bot;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="relative p-3 sm:p-4 rounded-xl border bg-titan-card/40 hover:bg-titan-card/60 text-left w-full group"
      style={{ borderColor: `${color}20` }}
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold font-mono text-titan-text">{label}</p>
          <p className="text-[9px] sm:text-[10px] text-titan-muted/60 mt-0.5 truncate">{description}</p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-titan-muted/40 group-hover:text-titan-teal transition-colors shrink-0" />
      </div>
    </motion.button>
  );
}

export default function HomeDashboard({ progression, agentLevel, recentFeed, onNavigate }: HomeDashboardProps) {
  const { currentMascot, openPicker } = useMascotStore();

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

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome header */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mascot avatar (clickable) */}
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
            className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-titan-bg"
            style={{ background: currentMascot.colorTint }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-titan-bg" />
          </motion.div>
        </motion.div>

        {/* Level + XP */}
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-xl font-bold">
            <span className="titan-text-gradient">{currentMascot.name}</span>
            <span className="text-titan-muted/50 ml-2 text-xs font-mono">Lv.{agentLevel}</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-titan-muted/60 font-mono mt-0.5">
            {currentMascot.description}
          </p>
          {/* XP bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-titan-border/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${currentMascot.colorTint}, #F59E0B)` }}
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono text-titan-muted/50 shrink-0">
              {progression.totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* Today's Impact */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-3 w-3 text-titan-golden" />
          <span className="text-[10px] font-mono text-titan-muted/70 tracking-widest uppercase">Today&apos;s Impact</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard
            label="Tasks Done"
            value={todayImpact.tasks.toString()}
            icon={Bot}
            color="#14B8A6"
            trend="swarm executed"
            onClick={() => onNavigate("swarm")}
          />
          <StatCard
            label="Time Saved"
            value={`${todayImpact.timeSaved}h`}
            icon={Clock}
            color="#10B981"
            trend="automated hours"
            onClick={() => onNavigate("bau")}
          />
          <StatCard
            label="Value Created"
            value={`$${todayImpact.moneySaved}`}
            icon={TrendingUp}
            color="#F59E0B"
            trend="total savings"
            onClick={() => onNavigate("roi")}
          />
        </div>
      </div>

      {/* Mini swarm + quick nav — two columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Mini Swarm Preview */}
        <div className="relative p-4 sm:p-5 rounded-xl border bg-titan-card/40 overflow-hidden"
          style={{ borderColor: `${currentMascot.colorTint}15` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${currentMascot.colorTint}05, transparent 70%)`,
            }}
          />
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-3.5 w-3.5" style={{ color: currentMascot.colorTint }} />
            <span className="text-[10px] font-mono text-titan-muted/70 tracking-widest uppercase">Active Swarm</span>
          </div>

          <div className="flex items-center justify-center py-4 sm:py-6">
            {/* Mini orbital view */}
            <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]">
              {/* Ring */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-full h-full"
                style={{
                  border: `1px solid ${currentMascot.colorTint}15`,
                  background: `radial-gradient(circle, ${currentMascot.colorTint}05, transparent 60%)`,
                }}
              />
              {/* Center mascot */}
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

              {/* Orbiting dots */}
              {[
                { color: "#14B8A6", angle: 0 },
                { color: "#F59E0B", angle: 72 },
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
            className="w-full py-1.5 rounded-lg text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all group"
            style={{
              background: `${currentMascot.colorTint}12`,
              color: currentMascot.colorTint,
            }}
            whileHover={{ scale: 1.01 }}
            onClick={() => onNavigate("swarm")}
          >
            Open Swarm View
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Quick navigation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-3 w-3 text-titan-golden" />
            <span className="text-[10px] font-mono text-titan-muted/70 tracking-widest uppercase">Quick Actions</span>
          </div>
          <QuickNavCard
            label="Skill Forge"
            description="Craft new skills & templates"
            icon={Bot}
            color="#F59E0B"
            onClick={() => onNavigate("forge")}
          />
          <QuickNavCard
            label="Automation Hub"
            description="Manage BAU & scheduled tasks"
            icon={Orbit as typeof Bot}
            color="#7C3AED"
            onClick={() => onNavigate("bau")}
          />
          <QuickNavCard
            label="Security Center"
            description="Certifications & trust scores"
            icon={Shield}
            color="#10B981"
            onClick={() => onNavigate("audit")}
          />
          <QuickNavCard
            label="Progression"
            description="Achievements & milestones"
            icon={Trophy}
            color="#F59E0B"
            onClick={() => onNavigate("progression")}
          />
        </div>
      </div>

      {/* Recent Activity Feed */}
      {recentActivity.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-3 w-3 text-titan-teal" />
            <span className="text-[10px] font-mono text-titan-muted/70 tracking-widest uppercase">Recent Activity</span>
          </div>
          <div className="space-y-1.5">
            {recentActivity.map((entry, i) => (
              <motion.div
                key={entry.id}
                className="flex items-center gap-2.5 p-2 rounded-lg border border-titan-border/10 bg-titan-card/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-sm">{entry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-titan-text/80 truncate">{entry.text}</p>
                  <p className="text-[9px] text-titan-muted/50 mt-0.5 font-mono">{entry.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* System health banner */}
      <motion.div
        className="p-3 rounded-xl border flex items-center gap-3 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(20,184,166,0.05))",
          borderColor: "rgba(16,185,129,0.25)",
        }}
        whileHover={{ y: -1 }}
        onClick={() => onNavigate("audit")}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Shield className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-400">All Systems Secure</p>
          <p className="text-[10px] text-titan-muted/60 mt-0.5 font-mono">
            {progression.skillsCertified} skills certified · {progression.goldSkills} gold standard
          </p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-emerald-400/50 shrink-0" />
      </motion.div>
    </motion.div>
  );
}
