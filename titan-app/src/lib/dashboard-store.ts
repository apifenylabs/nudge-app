"use client";

import { create } from "zustand";
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { loadFeed, saveFeed, loadSkills, saveSkills, loadProgression, saveProgression, loadAudits, saveAudits, loadOrchestrations, saveOrchestrations } from "@/lib/persistence";
import type { FeedEntry, AuditRecord, OrchestrationConfig } from "@/lib/persistence";
import type { Skill } from "@/types";
import { runMockAudit, type AuditResult } from "@/lib/certification";
import { getGodTierStatus, getVisualTier, getAbilitiesForLevel, type GodTierStatus } from "@/lib/swarm/god-tier-engine";

// ─── Types ──────────────────────────────────────────────────────────────

export interface TitanAgent {
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

export interface LevelUpToast {
  visible: boolean;
  level: number;
  message: string;
}

export interface ProgressionState {
  totalXp: number;
  totalTasksRun: number;
  skillsCertified: number;
  goldSkills: number;
  achievements: string[];
  lastSavedAt: string;
}

export type ProgressionUpdater = ((prev: ProgressionState) => Partial<ProgressionState>) | Partial<ProgressionState>;

export interface AchievementExtras {
  skillCount?: number;
  swarmCount?: number;
}

// ─── Achievement Definitions ──────────────────────────────────────────

interface AchievementDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  check: (prog: ProgressionState, extras: AchievementExtras) => boolean;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first-skill', name: 'First Skill Run', emoji: '🏆', description: 'Run your first skill', check: (p) => p.totalTasksRun >= 1 },
  { id: 'first-audit', name: 'First Audit', emoji: '🛡️', description: 'Complete your first audit', check: (p) => p.skillsCertified >= 1 },
  { id: 'gold-standard', name: 'Gold Standard', emoji: '🌟', description: 'Earn a gold certification', check: (p) => p.goldSkills >= 1 },
  { id: 'swarm-master', name: 'Swarm Master', emoji: '🌀', description: 'Save 3+ swarms', check: (_p, e) => (e?.swarmCount ?? 0) >= 3 },
  { id: 'xp-collector', name: 'XP Collector', emoji: '💎', description: 'Reach 1000 total XP', check: (p) => p.totalXp >= 1000 },
];

export function checkAchievements(prog: ProgressionState, extras?: AchievementExtras): string[] {
  const unlocked = new Set(prog.achievements);
  for (const ach of ACHIEVEMENT_DEFS) {
    if (!unlocked.has(ach.id) && ach.check(prog, extras ?? {})) {
      unlocked.add(ach.id);
    }
  }
  return Array.from(unlocked);
}

export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_DEFS.find(a => a.id === id);
}

// ─── Progression Hook ──────────────────────────────────────────────────

export function useProgressionGame(): [ProgressionState, (updater: ProgressionUpdater) => void] {
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

// ─── God-Tier hook ──────────────────────────────────────────────────────

export function useGodTier(progression: ProgressionState, currentLevel: number): GodTierStatus {
  return useMemo(() => getGodTierStatus(
    currentLevel,
    progression.totalXp,
    6,
    progression.skillsCertified,
    progression.totalTasksRun,
  ), [currentLevel, progression.totalXp, progression.skillsCertified, progression.totalTasksRun]);
}

// ─── Mock Data ──────────────────────────────────────────────────────────

export const MAIN_AGENT: TitanAgent = {
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

export const BASE_ORBITING_AGENTS: TitanAgent[] = [
  { id: "a1", name: "Travel Guide", emoji: "🌍", level: 12, xp: 3400, xpToNext: 5000, color: "#14B8A6", specialty: "Destinations", mood: "happy" },
  { id: "a2", name: "Budget Keeper", emoji: "💰", level: 8, xp: 2100, xpToNext: 4000, color: "#10B981", specialty: "Finance", mood: "neutral" },
  { id: "a3", name: "Research Bot", emoji: "🔬", level: 15, xp: 5200, xpToNext: 6000, color: "#14B8A6", specialty: "Deep Research", mood: "excited" },
  { id: "a4", name: "Crypto Trader", emoji: "🧠", level: 6, xp: 900, xpToNext: 3000, color: "#F59E0B", specialty: "Markets", mood: "focused" },
  { id: "a5", name: "Data Analyst", emoji: "📊", level: 10, xp: 2800, xpToNext: 4500, color: "#14B8A6", specialty: "Analytics", mood: "happy" },
];

export const SKILL_TEMPLATES = [
  { name: 'Travel Companion', desc: 'Itinerary + budget + tips', level: 'Lv.5', code: `agent TravelGuide {\n  triggers ['new_destination', 'budget_check']\n  actions {\n    research: deep_scan,\n    summarize: concise,\n    notify: push\n  }\n  level_req: 5\n}` },
  { name: 'Research Analyst', desc: 'Deep-dive + citations + summary', level: 'Lv.8', code: `agent ResearchAnalyst {\n  triggers ['query', 'schedule']\n  actions {\n    scrape: web_deep,\n    analyze: cross_ref,\n    cite: apa_format,\n    summarize: bullet_points\n  }\n  level_req: 8\n}` },
  { name: 'Trading Assistant', desc: 'Signals + risk + portfolio', level: 'Lv.12', code: `agent TradingAssistant {\n  triggers ['market_update', 'price_alert']\n  actions {\n    analyze: sentiment,\n    risk: portfolio_check,\n    signal: buy_sell_hold\n  }\n  level_req: 12\n}` },
  { name: 'Content Writer', desc: 'Drafts + SEO + tone check', level: 'Lv.3', code: `agent ContentWriter {\n  triggers ['draft_request', 'edit_command']\n  actions {\n    generate: outline,\n    optimize: seo,\n    check: tone_analysis,\n    output: markdown\n  }\n  level_req: 3\n}` },
];

export const MOLTBOOK: FeedEntry[] = [
  { id: "m1", avatar: "🎯", name: "Swarm", text: "Completed 12 automated tasks today", time: "2m ago", type: "task" },
  { id: "m2", avatar: "⭐", name: "Research Bot", text: "Level 15 achieved — unlocked deep analysis", time: "15m ago", type: "levelup" },
  { id: "m3", avatar: "🏆", name: "You", text: "Saved $540 this week via Budget Keeper", time: "1h ago", type: "achievement" },
  { id: "m4", avatar: "💡", name: "Travel Guide", text: "Found 3 new hidden gems in Kyoto", time: "2h ago", type: "insight" },
  { id: "m5", avatar: "🔬", name: "Research Bot", text: "Market analysis: SOL sentiment shifting bullish", time: "3h ago", type: "insight" },
];
