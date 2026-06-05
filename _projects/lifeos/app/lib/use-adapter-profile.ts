/**
 * LifeOS — Adapter-Enriched Personality Profile
 *
 * Reads connected adapters from the pluginAdapterRegistry and merges
 * their real data (mindfulness streaks, health metrics, hobby activity)
 * into personality trait scoring for the PersonalityProfile component.
 *
 * This hook allows the personality profile to reflect REAL user data
 * from connected third-party services (Oura, Headspace, Fitbit, etc.)
 * rather than being purely localStorage-derived.
 *
 * Usage:
 * ```tsx
 * const { adapterBoost, hasAdapterData, adapterSources } = useAdapterProfile();
 * // Pass adapterBoost to PersonalityProfile as an optional prop
 * ```
 *
 * @packageDocumentation
 */

import { useState, useEffect } from 'react';
import { pluginAdapterRegistry } from './plugin-adapter-registry';
import type { MindfulnessAdapter, HealthAdapter, HobbyAdapter, MindfulnessSummary, HealthSummary, HobbySummary } from './plugin-adapters';

// ─── Types ─────────────────────────────────────────────────────────

/**
 * Trait boost values from adapter data to merge into personality scoring.
 * Each value is a delta (0 to +30) to add to the base trait score.
 */
export interface AdapterTraitBoost {
  breadth: number;
  depth: number;
  consistency: number;
  diversity: number;
  planning: number;
  wellness: number;
}

/**
 * Metadata about which adapters contributed to the profile enrichment.
 */
export interface AdapterSourceInfo {
  provider: string;
  label: string;
  emoji: string;
  contributedTo: string[]; // trait names this adapter boosted
  status: 'active' | 'stale' | 'error';
  lastSynced?: string;
}

export interface AdapterProfileData {
  /** Trait deltas to apply on top of localStorage-derived scores. */
  boost: AdapterTraitBoost;
  /** Whether any adapter data was successfully read. */
  hasAdapterData: boolean;
  /** Which adapters contributed. */
  sources: AdapterSourceInfo[];
  /** Direct adapter summaries (for display in profile). */
  mindfulnessSummary: MindfulnessSummary | null;
  healthSummary: HealthSummary | null;
  hobbySummary: HobbySummary | null;
}

// ─── Provider Display Metadata ─────────────────────────────────────

const PROVIDER_META: Record<string, { label: string; emoji: string }> = {
  headspace: { label: 'Headspace', emoji: '🧡' },
  calm: { label: 'Calm', emoji: '💙' },
  apple_health: { label: 'Apple Health', emoji: '🍎' },
  oura: { label: 'Oura', emoji: '💍' },
  fitbit: { label: 'Fitbit', emoji: '⌚' },
  skillshare: { label: 'Skillshare', emoji: '🎨' },
  udemy: { label: 'Udemy', emoji: '📚' },
};

// ─── Trait Boosting Logic ──────────────────────────────────────────

/**
 * Given real adapter summaries, compute trait boosts.
 *
 * Principles:
 * - Real mindfulness streak + sessions → wellness boost (+5 to +20)
 * - Real HRV/sleep quality → depth boost (+3 to +15)
 * - Real step/workout consistency across 7 days → consistency boost (+3 to +15)
 * - Real hobby hours + milestones → breadth boost (+3 to +10)
 * - Multiple adapter categories active → diversity boost (+5 to +15)
 */
function computeBoosts(
  mindfulnessSummary: MindfulnessSummary | null,
  healthSummary: HealthSummary | null,
  hobbySummary: HobbySummary | null,
): AdapterTraitBoost {
  const boost: AdapterTraitBoost = {
    breadth: 0,
    depth: 0,
    consistency: 0,
    diversity: 0,
    planning: 0,
    wellness: 0,
  };

  let activeCategories = 0;

  // ── Mindfulness boosts ──────────────────────────────────────
  if (mindfulnessSummary && mindfulnessSummary.totalSessionsThisWeek > 0) {
    activeCategories++;

    // Wellness: real meditation practice is a strong signal
    const streakWellness = Math.min(15, Math.round(mindfulnessSummary.currentStreakDays * 1.5));
    const sessionWellness = Math.min(10, Math.round(mindfulnessSummary.totalSessionsThisWeek * 1.2));
    boost.wellness += streakWellness + sessionWellness;

    // Depth: consistent daily practice
    const dailyRatio = mindfulnessSummary.totalSessionsThisWeek / 7;
    if (dailyRatio >= 0.7) {
      boost.depth += 10; // near-daily practice = deep engagement
    } else if (dailyRatio >= 0.3) {
      boost.depth += 5;
    }

    // Consistency: streak length
    if (mindfulnessSummary.currentStreakDays >= 14) boost.consistency += 15;
    else if (mindfulnessSummary.currentStreakDays >= 7) boost.consistency += 10;
    else if (mindfulnessSummary.currentStreakDays >= 3) boost.consistency += 5;
  }

  // ── Health boosts ───────────────────────────────────────────
  if (healthSummary) {
    activeCategories++;

    // Depth: sleep tracking + HRV shows deeper self-awareness
    if (healthSummary.averageSleepHoursThisWeek > 0) {
      boost.depth += 5;
      if (healthSummary.averageSleepQualityThisWeek >= 7) boost.depth += 5;
    }
    if (healthSummary.recentHRV && healthSummary.recentHRV > 30) {
      boost.depth += 3; // HRV tracking indicates advanced health awareness
    }

    // Consistency: regular workouts
    if (healthSummary.workoutsThisWeek >= 4) boost.consistency += 12;
    else if (healthSummary.workoutsThisWeek >= 2) boost.consistency += 6;
    else if (healthSummary.workoutsThisWeek >= 1) boost.consistency += 3;

    // Wellness: active health tracking
    if (healthSummary.totalStepsToday > 0) {
      boost.wellness += 5;
      if (healthSummary.totalStepsToday >= 8000) boost.wellness += 5;
    }
    if (healthSummary.workoutMinutesThisWeek >= 150) {
      boost.wellness += 8; // meets WHO exercise guidelines
    } else if (healthSummary.workoutMinutesThisWeek >= 75) {
      boost.wellness += 4;
    }
  }

  // ── Hobby boosts ────────────────────────────────────────────
  if (hobbySummary && hobbySummary.activeHobbies > 0) {
    activeCategories++;

    // Breadth: multiple active hobbies
    if (hobbySummary.activeHobbies >= 4) boost.breadth += 12;
    else if (hobbySummary.activeHobbies >= 2) boost.breadth += 6;
    else boost.breadth += 3;

    // Depth: hours invested
    if (hobbySummary.totalHoursThisMonth >= 40) boost.depth += 10;
    else if (hobbySummary.totalHoursThisMonth >= 20) boost.depth += 6;
    else if (hobbySummary.totalHoursThisMonth >= 10) boost.depth += 3;

    // Consistency: milestones + projects
    const totalAchievements = hobbySummary.milestonesReached + hobbySummary.projectsCompleted;
    if (totalAchievements >= 10) boost.consistency += 12;
    else if (totalAchievements >= 5) boost.consistency += 7;
    else if (totalAchievements >= 2) boost.consistency += 3;
  }

  // ── Cross-category diversity boost ──────────────────────────
  if (activeCategories >= 3) {
    boost.diversity += 15; // Using mindfulness + health + hobbies = true alchemist
  } else if (activeCategories >= 2) {
    boost.diversity += 8;
  } else if (activeCategories >= 1) {
    boost.diversity += 3;
  }

  // Cap all boosts at 30 to prevent adapter data from dominating
  for (const key of Object.keys(boost) as (keyof AdapterTraitBoost)[]) {
    boost[key] = Math.min(30, boost[key]);
  }

  return boost;
}

// ─── Source Tracking ───────────────────────────────────────────────

function computeSources(
  mindfulnessSummary: MindfulnessSummary | null,
  healthSummary: HealthSummary | null,
  hobbySummary: HobbySummary | null,
): AdapterSourceInfo[] {
  const sources: AdapterSourceInfo[] = [];

  if (mindfulnessSummary && mindfulnessSummary.totalSessionsThisWeek > 0) {
    const provider = 'headspace'; // Simplified: use first available
    const meta = PROVIDER_META[provider] || { label: 'Mindfulness', emoji: '🧘' };
    const traits: string[] = ['wellness', 'depth'];
    if (mindfulnessSummary.currentStreakDays >= 3) traits.push('consistency');
    sources.push({
      provider: 'mindfulness',
      label: meta.label,
      emoji: meta.emoji,
      contributedTo: traits,
      status: 'active',
      lastSynced: new Date().toISOString(),
    });
  }

  if (healthSummary && (healthSummary.totalStepsToday > 0 || healthSummary.workoutsThisWeek > 0)) {
    // Pick the best-connected health provider
    const provider = pluginAdapterRegistry.health.size > 0
      ? Array.from(pluginAdapterRegistry.health.keys())[0]
      : 'oura';
    const meta = PROVIDER_META[provider] || { label: 'Health', emoji: '💪' };
    const traits: string[] = ['wellness', 'depth'];
    if (healthSummary.workoutsThisWeek >= 2) traits.push('consistency');
    sources.push({
      provider: 'health',
      label: meta.label,
      emoji: meta.emoji,
      contributedTo: traits,
      status: 'active',
      lastSynced: new Date().toISOString(),
    });
  }

  if (hobbySummary && hobbySummary.activeHobbies > 0) {
    const provider = 'skillshare';
    const meta = PROVIDER_META[provider] || { label: 'Hobbies', emoji: '🎯' };
    const traits: string[] = ['breadth', 'depth'];
    const totalAchievements = hobbySummary.milestonesReached + hobbySummary.projectsCompleted;
    if (totalAchievements >= 2) traits.push('consistency');
    sources.push({
      provider: 'hobbies',
      label: meta.label,
      emoji: meta.emoji,
      contributedTo: traits,
      status: 'active',
      lastSynced: new Date().toISOString(),
    });
  }

  return sources;
}

// ─── Hook ──────────────────────────────────────────────────────────

/**
 * React hook that reads connected adapters and computes trait boosts.
 *
 * Returns adapter-enriched profile data that PersonalityProfile can consume.
 * Gracefully handles missing/unconnected adapters — falls back to zero boost.
 *
 * @returns adapter profile data with boosts and source metadata
 */
export function useAdapterProfile(): AdapterProfileData {
  const [data, setData] = useState<AdapterProfileData>({
    boost: { breadth: 0, depth: 0, consistency: 0, diversity: 0, planning: 0, wellness: 0 },
    hasAdapterData: false,
    sources: [],
    mindfulnessSummary: null,
    healthSummary: null,
    hobbySummary: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchAdapterData() {
      try {
        let mindfulnessSummary: MindfulnessSummary | null = null;
        let healthSummary: HealthSummary | null = null;
        let hobbySummary: HobbySummary | null = null;

        // Try reading from any instantiated mindfulness adapter
        if (pluginAdapterRegistry.mindfulness.size > 0) {
          const firstAdapter = Array.from(pluginAdapterRegistry.mindfulness.values())[0] as MindfulnessAdapter;
          try {
            const connected = await firstAdapter.connect();
            if (connected) {
              mindfulnessSummary = await firstAdapter.getSummary();
            }
          } catch {
            // adapter unavailable — skip
          }
        }

        // Try reading from any instantiated health adapter
        if (pluginAdapterRegistry.health.size > 0) {
          const firstAdapter = Array.from(pluginAdapterRegistry.health.values())[0] as HealthAdapter;
          try {
            const connected = await firstAdapter.connect();
            if (connected) {
              healthSummary = await firstAdapter.getSummary();
            }
          } catch {
            // skip
          }
        }

        // Try reading from any instantiated hobby adapter
        if (pluginAdapterRegistry.hobbies.size > 0) {
          const firstAdapter = Array.from(pluginAdapterRegistry.hobbies.values())[0] as HobbyAdapter;
          try {
            const connected = await firstAdapter.connect();
            if (connected) {
              hobbySummary = await firstAdapter.getSummary();
            }
          } catch {
            // skip
          }
        }

        if (cancelled) return;

        const hasData = !!(mindfulnessSummary || healthSummary || hobbySummary);
        const boost = computeBoosts(mindfulnessSummary, healthSummary, hobbySummary);
        const sources = computeSources(mindfulnessSummary, healthSummary, hobbySummary);

        setData({
          boost,
          hasAdapterData: hasData,
          sources,
          mindfulnessSummary,
          healthSummary,
          hobbySummary,
        });
      } catch {
        if (!cancelled) {
          setData({
            boost: { breadth: 0, depth: 0, consistency: 0, diversity: 0, planning: 0, wellness: 0 },
            hasAdapterData: false,
            sources: [],
            mindfulnessSummary: null,
            healthSummary: null,
            hobbySummary: null,
          });
        }
      }
    }

    fetchAdapterData();

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

/**
 * Utility: format adapter summary data for inline display in the profile UI.
 * Returns a list of stats lines (label + value + emoji) for rendering.
 */
export function formatAdapterStats(
  mindfulnessSummary: MindfulnessSummary | null,
  healthSummary: HealthSummary | null,
  hobbySummary: HobbySummary | null,
): { label: string; value: string; emoji: string; category: string }[] {
  const stats: { label: string; value: string; emoji: string; category: string }[] = [];

  if (mindfulnessSummary && mindfulnessSummary.totalSessionsThisWeek > 0) {
    stats.push({
      label: 'Meditation Streak',
      value: `${mindfulnessSummary.currentStreakDays} days`,
      emoji: '🧘',
      category: 'Mindfulness',
    });
    stats.push({
      label: 'Sessions/Week',
      value: `${mindfulnessSummary.totalSessionsThisWeek}`,
      emoji: '📊',
      category: 'Mindfulness',
    });
  }

  if (healthSummary) {
    if (healthSummary.totalStepsToday > 0) {
      stats.push({
        label: 'Steps Today',
        value: healthSummary.totalStepsToday.toLocaleString(),
        emoji: '👟',
        category: 'Health',
      });
    }
    if (healthSummary.averageSleepHoursThisWeek > 0) {
      stats.push({
        label: 'Avg Sleep',
        value: `${healthSummary.averageSleepHoursThisWeek.toFixed(1)} hrs`,
        emoji: '😴',
        category: 'Health',
      });
    }
    if (healthSummary.workoutMinutesThisWeek > 0) {
      stats.push({
        label: 'Workouts/Week',
        value: `${healthSummary.workoutsThisWeek} (${healthSummary.workoutMinutesThisWeek} min)`,
        emoji: '💪',
        category: 'Health',
      });
    }
  }

  if (hobbySummary && hobbySummary.activeHobbies > 0) {
    stats.push({
      label: 'Active Hobbies',
      value: `${hobbySummary.activeHobbies}`,
      emoji: '🎯',
      category: 'Hobbies',
    });
    if (hobbySummary.totalHoursThisMonth > 0) {
      stats.push({
        label: 'Hours/Month',
        value: `${hobbySummary.totalHoursThisMonth.toFixed(1)}`,
        emoji: '⏱️',
        category: 'Hobbies',
      });
    }
  }

  return stats;
}
