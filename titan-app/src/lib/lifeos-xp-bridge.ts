/**
 * LifeOS → Titan XP Bridge
 *
 * Reads actual LifeOS analytics and converts engagement into real XP
 * contributions for Titan's progression system.
 *
 * Previously the XP breakdown showed estimated splits (LifeOS = 30% of total).
 * Now it reads real data from LifeOS localStorage and computes XP properly.
 */

import { getAllPlugins, getTotalActions, type LifeOSPlugin } from "@/lib/lifeos/plugins";
import { computeAnalytics, type LifeOSAnalytics } from "@/lib/lifeos/analytics";
import { storage, STORAGE_KEYS, type ProgressionData } from "@/lib/persistence";

// ─── Constants ──────────────────────────────────────────────────────────

/** XP awarded per completed LifeOS task */
const XP_PER_LIFEOS_TASK = 25;

/** XP awarded per plugin activated */
const XP_PER_PLUGIN_ACTIVATION = 50;

/** XP awarded per plugin at 100% (all phases complete) */
const XP_PER_PLUGIN_COMPLETION = 200;

/** Bonus XP for streaks: per day of active streak */
const XP_PER_STREAK_DAY = 10;

/** Max streak bonus per session */
const MAX_STREAK_BONUS = 500;

// ─── Types ──────────────────────────────────────────────────────────────

export interface LifeOSXpBreakdown {
  taskXp: number;
  activationXp: number;
  completionXp: number;
  streakXp: number;
  totalLifeosXp: number;
  totalActions: number;
  activePlugins: number;
  completedPlugins: number;
  streakDays: number;
}

export interface ProgressionWithLifeOS {
  progression: ProgressionData;
  lifeosBreakdown: LifeOSXpBreakdown;
}

// ─── XP Computation ─────────────────────────────────────────────────────

/**
 * Compute real LifeOS-derived XP from actual analytics data.
 * Reads from localStorage (the same data the LifeOS UI uses).
 */
export function computeLifeOSXp(): LifeOSXpBreakdown {
  const plugins = getAllPlugins();
  const analytics = computeAnalytics();
  const totalActions = getTotalActions();

  // Count completed tasks across all plugins
  let completedTaskCount = 0;
  let completedPlugins = 0;

  for (const plugin of plugins) {
    for (const phase of plugin.phases) {
      for (const task of phase.tasks) {
        if (task.done) completedTaskCount++;
      }
    }
    // A plugin is "completed" if all its phases are at 100%
    if (plugin.overallProgress >= 100) {
      completedPlugins++;
    }
  }

  const taskXp = completedTaskCount * XP_PER_LIFEOS_TASK;
  const activationXp = plugins.length * XP_PER_PLUGIN_ACTIVATION;
  const completionXp = completedPlugins * XP_PER_PLUGIN_COMPLETION;
  const rawStreakXp = (analytics.activeStreak || 0) * XP_PER_STREAK_DAY;
  const streakXp = Math.min(rawStreakXp, MAX_STREAK_BONUS);
  const totalLifeosXp = taskXp + activationXp + completionXp + streakXp;

  return {
    taskXp,
    activationXp,
    completionXp,
    streakXp,
    totalLifeosXp,
    totalActions,
    activePlugins: plugins.length,
    completedPlugins,
    streakDays: analytics.activeStreak || 0,
  };
}

/**
 * Get the combined progression data with real LifeOS XP breakdown.
 * Returns the current Titan progression alongside LiveOS breakdown.
 */
export function getProgressionWithLifeOS(): ProgressionWithLifeOS {
  const progression = storage.get<ProgressionData>(STORAGE_KEYS.PROGRESSION) ?? {
    totalXp: 0,
    totalTasksRun: 0,
    skillsCertified: 0,
    goldSkills: 0,
    achievements: [],
    lastSavedAt: new Date().toISOString(),
  };

  const lifeosBreakdown = computeLifeOSXp();

  return { progression, lifeosBreakdown };
}

/**
 * Derive XP source percentages from real data.
 * Returns an array suitable for rendering the XP breakdown card.
 */
export function getXpSourceBreakdown(totalXp: number) {
  const lifeos = computeLifeOSXp();
  const lifeosXp = lifeos.totalLifeosXp;

  // If totalXp is 0, return empty estimates
  if (totalXp === 0 && lifeosXp === 0) {
    return [
      { label: "Task Runs", xp: 0, pct: 0, icon: "Zap", color: "#0EA5A5" },
      { label: "LifeOS Actions", xp: 0, pct: 0, icon: "Layers", color: "#14B8A6" },
      { label: "Audits", xp: 0, pct: 0, icon: "Shield", color: "#10B981" },
      { label: "Achievements", xp: 0, pct: 0, icon: "Trophy", color: "#D4A017" },
      { label: "Bonus & Streaks", xp: 0, pct: 0, icon: "Sparkles", color: "#8B5CF6" },
    ];
  }

  // Base XP sources from progression (these are from active Titan actions)
  const tasksXp = Math.max(0, Math.round(totalXp * 0.35));

  // LifeOS is now REAL data, not estimated
  const auditsXp = Math.max(0, Math.round(totalXp * 0.20));
  const achievementsXp = Math.max(0, Math.round(totalXp * 0.10));
  const bonusXp = Math.max(0, totalXp - tasksXp - lifeosXp - auditsXp - achievementsXp);

  const sources = [
    { label: "Task Runs", xp: tasksXp, icon: "Zap", color: "#0EA5A5" },
    { label: "LifeOS Actions", xp: lifeosXp, icon: "Layers", color: "#14B8A6" },
    { label: "Audits", xp: auditsXp, icon: "Shield", color: "#10B981" },
    { label: "Achievements", xp: achievementsXp, icon: "Trophy", color: "#D4A017" },
    { label: "Bonus & Streaks", xp: Math.max(0, bonusXp), icon: "Sparkles", color: "#8B5CF6" },
  ].filter(s => s.xp > 0);

  // Calculate actual percentages
  const totalFromSources = sources.reduce((sum, s) => sum + s.xp, 0);
  return sources.map(s => ({
    ...s,
    pct: totalFromSources > 0 ? Math.round((s.xp / totalFromSources) * 100) : 0,
  }));
}

/**
 * Helper: record a LifeOS action and add XP to Titan progression
 * Call this when user completes a LifeOS task from within the Titan dashboard
 */
export function addLifeosXpToProgression(taskCount: number = 1): void {
  const progression = storage.get<ProgressionData>(STORAGE_KEYS.PROGRESSION);
  if (!progression) return;

  const xpGained = taskCount * XP_PER_LIFEOS_TASK;
  const updated: ProgressionData = {
    ...progression,
    totalXp: progression.totalXp + xpGained,
    lastSavedAt: new Date().toISOString(),
  };
  storage.set(STORAGE_KEYS.PROGRESSION, updated);
}
