/**
 * LifeOS Export Engine
 *
 * Generates shareable progress summaries from LifeOS plugin state.
 * Exports as markdown (for sharing/notion) or plain text (for messaging).
 *
 * Includes:
 *   - Overall stats (plugins, actions, streaks, XP multiplier)
 *   - Per-plugin progress with phase breakdown
 *   - Personality profile
 *   - Active synergy network
 *   - Cluster heat map
 */

import { getAllPlugins, getTotalActions, getAvailableCategories, type LifeOSPlugin, type LifeCategory } from './plugins';
import { computeAnalytics, type LifeOSAnalytics } from './analytics';
import {
  computeXpMultiplier,
  getActiveSynergies,
  getClusterStatus,
  getTotalSynergies,
  type SynergyClusterWithStatus,
} from './synergies';

// ─── Types ──────────────────────────────────────────────────────────────

export interface ExportOptions {
  /** Include full task breakdown per phase (default: false) */
  includeTasks?: boolean;
  /** Include personality profile section (default: true) */
  includePersonality?: boolean;
  /** Include synergy network stats (default: true) */
  includeSynergies?: boolean;
  /** Max plugins to detail (default: all) */
  maxPlugins?: number;
}

// ─── Markdown Export ────────────────────────────────────────────────────

/**
 * Generate a shareable Markdown summary of all LifeOS progress.
 */
export function exportMarkdown(options: ExportOptions = {}): string {
  const {
    includeTasks = false,
    includePersonality = true,
    includeSynergies = true,
    maxPlugins,
  } = options;

  const plugins = getAllPlugins();
  const analytics = computeAnalytics();
  const catalog = getAvailableCategories();
  const clusters = getClusterStatus(plugins);
  const xpMultiplier = computeXpMultiplier(plugins);
  const activeSynergies = getActiveSynergies(plugins);

  const lines: string[] = [];

  // ── Header ──
  lines.push('# 🧩 LifeOS Progress Report');
  lines.push(`> Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
  lines.push('');

  // ── Stats Overview ──
  lines.push('## 📊 Overview');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Active Plugins | ${analytics.totalPlugins} |`);
  lines.push(`| Total Actions | ${analytics.totalActions} |`);
  lines.push(`| Current Streak | ${analytics.activeStreak} day${analytics.activeStreak !== 1 ? 's' : ''} |`);
  lines.push(`| Best Streak | ${analytics.bestStreak} day${analytics.bestStreak !== 1 ? 's' : ''} |`);
  lines.push(`| XP Multiplier | x${xpMultiplier.toFixed(2)} |`);
  lines.push(`| Active Synergies | ${activeSynergies.length} / ${getTotalSynergies()} |`);

  if (analytics.topCategory) {
    const top = catalog.find(c => c.category === analytics.topCategory);
    lines.push(`| Top Plugin | ${top?.emoji || ''} ${top?.name || analytics.topCategory} |`);
  }
  lines.push('');

  // ── Personality Profile ──
  if (includePersonality && analytics.personalityMatch) {
    lines.push('## 🧠 Personality Profile');
    lines.push('');
    lines.push(`**${analytics.personalityMatch.personality}** — ${analytics.personalityMatch.description}`);
    lines.push('');
    lines.push(`Match score: **${analytics.personalityMatch.matchScore}%**`);
    lines.push('');
    lines.push('**Matched categories:**');
    for (const cat of analytics.personalityMatch.matchedCategories) {
      const info = catalog.find(c => c.category === cat);
      lines.push(`- ${info?.emoji || ''} ${info?.name || cat}`);
    }
    lines.push('');
  }

  // ── Insight Spotlight ──
  if (analytics.insights.length > 0) {
    lines.push('## 💡 Insights');
    lines.push('');
    for (const insight of analytics.insights) {
      lines.push(`- ${insight}`);
    }
    lines.push('');
  }

  // ── Synergy Clusters ──
  if (includeSynergies && clusters.length > 0) {
    lines.push('## 🔗 Synergy Clusters');
    lines.push('');
    for (const cluster of clusters) {
      const bar = progressBar(cluster.progress, 12);
      const activeNames = cluster.activeCategories.map(cat => {
        const info = catalog.find(c => c.category === cat);
        return `${info?.emoji || ''}${info?.name || cat}`;
      }).join(', ');
      const inactiveNames = cluster.inactiveCategories.map(cat => {
        const info = catalog.find(c => c.category === cat);
        return `${info?.emoji || ''}${info?.name || cat}`;
      }).join(', ');

      lines.push(`### ${cluster.emoji} ${cluster.name}`);
      lines.push(`\`${bar}\` ${cluster.progress}% (${cluster.activeCategories.length}/${cluster.categories.length})`);
      lines.push(`> ${cluster.description}`);
      if (activeNames) lines.push(`- ✅ Active: ${activeNames}`);
      if (inactiveNames) lines.push(`- ⬜ Available: ${inactiveNames}`);
      lines.push('');
    }
  }

  // ── Plugin Detail ──
  const pluginsToShow = maxPlugins ? plugins.slice(0, maxPlugins) : plugins;

  if (pluginsToShow.length > 0) {
    lines.push(`## 🧩 Plugin Progress (${plugins.length} total)`);
    lines.push('');

    for (const plugin of pluginsToShow) {
      const bar = progressBar(plugin.overallProgress, 16);
      lines.push(`### ${plugin.emoji} ${plugin.name}`);
      lines.push(`\`${bar}\` **${plugin.overallProgress}%** complete`);
      lines.push(`> ${plugin.description}`);
      lines.push('');

      // Phase cards
      for (const phase of plugin.phases) {
        const phaseEmoji = phaseEmojiMap[phase.phase] || '📋';
        const phaseLabel = phaseLabelMap[phase.phase] || phase.phase;
        const phaseBar = progressBar(phase.progress, 10);
        const status = phase.completed ? '✅' : phase.progress > 0 ? '🔄' : '⬜';

        lines.push(`${status} **${phaseEmoji} ${phaseLabel}** \`${phaseBar}\` ${phase.progress}%`);

        if (includeTasks && phase.tasks.length > 0) {
          for (const task of phase.tasks) {
            const check = task.done ? '✅' : '⬜';
            lines.push(`  ${check} ${task.label}`);
            if (task.done) {
              // Already shown as checked
            } else if (task.description) {
              lines.push(`   └ ${task.description}`);
            }
          }
        }

        lines.push('');
      }
    }
  }

  // ── Footer ──
  lines.push('---');
  lines.push(`*Exported from LifeOS (Titan) • ${new Date().toLocaleDateString()}*`);
  lines.push('');

  return lines.join('\n');
}

// ─── Plain Text Export (compact, for messaging) ────────────────────────

/**
 * Generate a compact plain-text summary for sharing in chat/messages.
 */
export function exportText(options: ExportOptions = {}): string {
  const { includePersonality = true } = options;
  const plugins = getAllPlugins();
  const analytics = computeAnalytics();
  const catalog = getAvailableCategories();

  const lines: string[] = [];

  lines.push(`🧩 LifeOS — ${analytics.totalPlugins} plugins, ${analytics.totalActions} actions`);
  lines.push(`📊 Streak: ${analytics.activeStreak}d (best ${analytics.bestStreak}d)`);

  if (includePersonality && analytics.personalityMatch) {
    lines.push(`🧠 ${analytics.personalityMatch.personality} (${analytics.personalityMatch.matchScore}%)`);
  }

  for (const plugin of plugins) {
    const bar = progressBar(plugin.overallProgress, 8);
    lines.push(`  ${plugin.emoji} ${plugin.name}: ${bar} ${plugin.overallProgress}%`);
  }

  return lines.join('\n');
}

// ─── Helpers ────────────────────────────────────────────────────────────

function progressBar(pct: number, length: number): string {
  const filled = Math.round((pct / 100) * length);
  const empty = length - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

const phaseLabelMap: Record<string, string> = {
  research: 'Research',
  canvas: 'Canvas',
  build: 'Build',
  ship: 'Ship',
  maintain: 'Maintain',
};

const phaseEmojiMap: Record<string, string> = {
  research: '🔍',
  canvas: '🎨',
  build: '🔧',
  ship: '🚀',
  maintain: '🔄',
};
