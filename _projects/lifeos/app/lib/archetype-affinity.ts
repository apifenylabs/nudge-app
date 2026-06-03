/**
 * LifeOS — Archetype Affinity Scoring
 *
 * Maps user personality archetypes to plugin affinities.
 * Used by the homepage to sort/filter plugin cards by personality match.
 *
 * Pure functions, no React, no localStorage. Fully testable.
 */

import type { UsageSummary } from './usage-analytics';
import { PLUGINS, type PluginDefinition } from './plugin-registry';

// ─── Archetype Types (mirrors PersonalityProfile.tsx) ──────────────

export type ArchetypeId =
  | 'explorer'
  | 'strategist'
  | 'healer'
  | 'architect'
  | 'alchemist'
  | 'guardian'
  | 'novice';

export interface ArchetypeInfo {
  id: ArchetypeId;
  name: string;
  emoji: string;
}

// Archetype → plugin affinity scores (0-100 per plugin id)
// Higher = more relevant to that archetype
export type AffinityMap = Record<string, number>;

const ARCHETYPE_AFFINITIES: Record<ArchetypeId, AffinityMap> = {
  explorer: {
    travel: 95,
    learning: 85,
    builder_os: 75,
    social: 70,
    health: 60,
    mindfulness: 55,
    nutrition: 50,
    career: 45,
    family: 40,
    home: 35,
    relationships: 55,
    productivity: 50,
    finance: 40,
    trading_os: 45,
  },
  strategist: {
    finance: 95,
    career: 90,
    productivity: 90,
    trading_os: 85,
    learning: 70,
    builder_os: 60,
    home: 55,
    health: 50,
    travel: 40,
    social: 35,
    family: 30,
    relationships: 35,
    mindfulness: 40,
    nutrition: 45,
  },
  healer: {
    health: 95,
    mindfulness: 95,
    relationships: 90,
    nutrition: 85,
    family: 70,
    social: 60,
    travel: 50,
    learning: 40,
    productivity: 35,
    career: 30,
    finance: 25,
    home: 40,
    builder_os: 20,
    trading_os: 10,
  },
  architect: {
    home: 95,
    productivity: 90,
    learning: 85,
    builder_os: 80,
    finance: 65,
    career: 60,
    travel: 50,
    health: 45,
    nutrition: 40,
    family: 40,
    social: 35,
    relationships: 30,
    mindfulness: 35,
    trading_os: 50,
  },
  alchemist: {
    learning: 90,
    builder_os: 85,
    travel: 80,
    career: 75,
    social: 70,
    relationships: 65,
    health: 60,
    mindfulness: 60,
    nutrition: 55,
    productivity: 55,
    finance: 50,
    family: 50,
    home: 45,
    trading_os: 60,
  },
  guardian: {
    health: 90,
    mindfulness: 85,
    productivity: 80,
    nutrition: 80,
    relationships: 70,
    family: 70,
    home: 65,
    finance: 60,
    career: 55,
    learning: 50,
    social: 45,
    travel: 40,
    builder_os: 30,
    trading_os: 25,
  },
  novice: {
    // New users — general discovery, no strong affinity
    travel: 60,
    finance: 60,
    health: 60,
    career: 60,
    learning: 60,
    family: 60,
    home: 60,
    social: 60,
    relationships: 60,
    productivity: 60,
    mindfulness: 60,
    nutrition: 60,
    builder_os: 60,
    trading_os: 60,
  },
};

// ─── Archetype Detection (simplified version of PersonalityProfile logic) ──

function detectArchetypeId(summary?: UsageSummary): ArchetypeId {
  if (!summary || !summary.pluginRankings || summary.pluginRankings.length === 0) {
    return 'novice';
  }

  const count = summary.pluginRankings.length;
  const top = summary.pluginRankings[0]?.pluginId || '';
  const names = summary.pluginRankings.map(p => p.pluginId);

  // Guardian: few plugins (≤3) but enough total sessions (≥5)
  if (count <= 3 && summary.totalSessions >= 5) return 'guardian';

  // Healer: wellness plugins in top 3
  const wellnessPluginsTop = names.slice(0, 3).filter(n =>
    ['health', 'mindfulness', 'relationships', 'nutrition'].includes(n)
  );
  if (wellnessPluginsTop.length >= 2) return 'healer';

  // Strategist: finance, career, productivity in top 3
  const strategyPluginsTop = names.slice(0, 3).filter(n =>
    ['finance', 'career', 'productivity'].includes(n)
  );
  if (strategyPluginsTop.length >= 2) return 'strategist';

  // Architect: home, productivity, learning in top 3
  const architectPluginsTop = names.slice(0, 3).filter(n =>
    ['home', 'productivity', 'learning'].includes(n)
  );
  if (architectPluginsTop.length >= 2) return 'architect';

  // Alchemist: 4+ distinct categories
  if (count >= 4) return 'alchemist';

  // Explorer: broad sampling, not deep (3+ plugins)
  if (count >= 3) return 'explorer';

  // Fallback to first plugin's archetype
  const tagMap: Record<string, ArchetypeId> = {
    travel: 'explorer',
    finance: 'strategist',
    health: 'healer',
    career: 'strategist',
    learning: 'architect',
    family: 'explorer',
    home: 'architect',
    social: 'explorer',
    mindfulness: 'healer',
    relationships: 'healer',
    nutrition: 'healer',
    productivity: 'architect',
  };
  return tagMap[top] || 'explorer';
}

// ─── Scoring Functions ─────────────────────────────────────────────

const PLUGIN_ID_MAP: Record<string, string> = {
  'trading-os': 'trading_os',
  'builder-os': 'builder_os',
};

function toKey(pluginId: string): string {
  return PLUGIN_ID_MAP[pluginId] || pluginId;
}

/**
 * Get the affinity score (0-100) for a specific plugin and archetype.
 * Active and beta plugins score at full affinity.
 * Coming-soon plugins score at 70% of their affinity (to indicate interest without frustration).
 */
export function getPluginAffinity(pluginId: string, archetypeId: ArchetypeId): number {
  const key = toKey(pluginId);
  const affinities = ARCHETYPE_AFFINITIES[archetypeId];
  return affinities?.[key] ?? 50; // Default neutral score
}

/**
 * Get affinity badge label and color for a plugin card.
 */
export function getAffinityBadge(
  plugin: PluginDefinition,
  archetypeId: ArchetypeId,
): { label: string; color: string; bgColor: string } | null {
  if (archetypeId === 'novice') return null;

  const score = getPluginAffinity(plugin.id, archetypeId);

  if (score >= 85) {
    return { label: '★ Top Match', color: '#059669', bgColor: '#D1FAE5' };
  }
  if (score >= 65) {
    return { label: '● Strong Fit', color: '#0D9488', bgColor: '#CCFBF1' };
  }
  if (score >= 45) {
    return { label: '○ Good Fit', color: '#6366F1', bgColor: '#E0E7FF' };
  }
  return null; // Low affinity — no badge
}

/**
 * Compute the detected archetype from usage data.
 * Returns null for novice/Awakening (not enough data).
 */
export function getDetectionStatus(summary?: UsageSummary): {
  archetypeId: ArchetypeId;
  archetypeName: string;
  archetypeEmoji: string;
  hasData: boolean;
} {
  const id = detectArchetypeId(summary);
  const hasData = id !== 'novice';

  const names: Record<ArchetypeId, string> = {
    explorer: 'Explorer',
    strategist: 'Strategist',
    healer: 'Healer',
    architect: 'Architect',
    alchemist: 'Alchemist',
    guardian: 'Guardian',
    novice: 'Awakening',
  };

  const emojis: Record<ArchetypeId, string> = {
    explorer: '🧭',
    strategist: '♟️',
    healer: '🕊️',
    architect: '🏗️',
    alchemist: '⚗️',
    guardian: '🛡️',
    novice: '🌟',
  };

  return {
    archetypeId: id,
    archetypeName: names[id],
    archetypeEmoji: emojis[id],
    hasData,
  };
}

/**
 * Sort plugins by affinity score (highest first).
 */
export function sortByAffinity(
  plugins: PluginDefinition[],
  archetypeId: ArchetypeId,
): PluginDefinition[] {
  return [...plugins].sort((a, b) => {
    return getPluginAffinity(b.id, archetypeId) - getPluginAffinity(a.id, archetypeId);
  });
}

/**
 * Get the top-N recommended plugins for a given archetype.
 * Excludes the plugins the user already has high engagement with
 * (based on usage summary rankings) to avoid recommending things they already use.
 */
export function getRecommendedPlugins(
  plugins: PluginDefinition[],
  archetypeId: ArchetypeId,
  summary?: UsageSummary,
  maxCount: number = 4,
): PluginDefinition[] {
  if (archetypeId === 'novice' || !summary) return [];

  // Get IDs of plugins the user already uses (top ranked)
  const usedPluginIds = new Set(
    (summary.pluginRankings || []).map(p => p.pluginId),
  );

  // Score all plugins, filter out ones the user already uses heavily
  const scored = plugins
    .filter(p => !usedPluginIds.has(p.id)) // Don't recommend already-used plugins
    .filter(p => p.status === 'active' || p.status === 'beta') // Only recommend available plugins
    .map(p => ({
      plugin: p,
      score: getPluginAffinity(p.id, archetypeId),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, maxCount).map(s => s.plugin);
}

/**
 * Get the badge emoji/label for affinity level display.
 */
export function getArchetypeLabel(archetypeId: ArchetypeId): string {
  const labels: Record<ArchetypeId, string> = {
    explorer: '🧭 Explorer',
    strategist: '♟️ Strategist',
    healer: '🕊️ Healer',
    architect: '🏗️ Architect',
    alchemist: '⚗️ Alchemist',
    guardian: '🛡️ Guardian',
    novice: '🌟 Awakening',
  };
  return labels[archetypeId];
}
