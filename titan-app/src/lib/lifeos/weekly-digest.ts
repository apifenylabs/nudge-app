/**
 * LifeOS — Weekly Digest (titan-app edition)
 *
 * Generates a markdown summary of the past 7 days' usage + personality trends.
 * Uses the existing computeAnalytics() + localStorage event log from titan-app.
 * No external dependencies.
 */

import { computeAnalytics, type LifeOSAnalytics } from './analytics';
import { getAllPlugins } from './plugins';

// ─── Types ─────────────────────────────────────────────────────────

export interface WeeklyDigest {
  generatedAt: string;
  weekLabel: string;
  dateRange: string;
  archetype: { name: string; emoji: string } | null;
  totals: {
    sessions: number;
    messages: number;
    activeDays: number;
  };
  topPlugins: { name: string; sessions: number; messages: number }[];
  dailyBreakdown: { day: string; sessions: number }[];
  markdown: string;
}

// ─── Helpers ───────────────────────────────────────────────────────

function getArchetypeData(): { name: string; emoji: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('lifeos_archetype');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.name && parsed.emoji) {
      return { name: parsed.name, emoji: parsed.emoji };
    }
    return null;
  } catch {
    return null;
  }
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getWeekRange(): { start: Date; end: Date; label: string } {
  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return {
    start,
    end,
    label: `${formatDate(start)} — ${formatDate(end)}`,
  };
}

interface UsageEvent {
  timestamp: string;
  eventType: string;
  pluginId?: string;
}

function getRecentEvents(): UsageEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('titan-lifeos-analytics-events');
    if (!raw) return [];
    const all: UsageEvent[] = JSON.parse(raw);
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return all.filter((e) => new Date(e.timestamp).getTime() > cutoff);
  } catch {
    return [];
  }
}

function collectDailyBreakdown(): { day: string; sessions: number }[] {
  const events = getRecentEvents();
  const now = new Date();
  const days: { day: string; sessions: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const sessions = events.filter(
      (e) => e.timestamp.slice(0, 10) === key
    ).length;
    days.push({ day: dayLabel, sessions });
  }

  return days;
}

function getLastWeekPersonalityNotes(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('lifeos_personality_history');
    if (!raw) return [];
    const history: { timestamp: string; archetype: string }[] = JSON.parse(raw);
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = history.filter((h) => new Date(h.timestamp).getTime() > cutoff);
    return recent.map((h) => `- ${h.archetype} (${new Date(h.timestamp).toLocaleDateString()})`);
  } catch {
    return [];
  }
}

// ─── Main Generator ───────────────────────────────────────────────

export function generateWeeklyDigest(): WeeklyDigest | null {
  if (typeof window === 'undefined') return null;

  const weekRange = getWeekRange();
  const analytics = computeAnalytics();
  const archetype = getArchetypeData();
  const daily = collectDailyBreakdown();
  const personalityHistory = getLastWeekPersonalityNotes();
  const plugins = getAllPlugins();

  if (analytics.totalActions === 0 && plugins.length === 0) return null;

  const now = new Date();
  const activeDays = daily.filter((d) => d.sessions > 0).length;

  // Build top plugins from analytics scores
  const topPlugins = analytics.scores.slice(0, 5).map((s) => ({
    name: s.name,
    sessions: s.completedTasks,
    messages: Math.round(s.completedTasks * 2.5), // estimate based on task completions
  }));

  // ── Build Markdown ──

  let md = '';
  md += `# 🦊 LifeOS Weekly Digest\n\n`;
  md += `**Generated:** ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\n`;
  md += `**Period:** ${weekRange.label}\n\n`;

  if (archetype) {
    md += `## 🧠 Your Archetype: ${archetype.emoji} ${archetype.name}\n\n`;
    md += `Your personality profile shows a **${archetype.name}** tendency. `;
    md += `Plugins aligned with this archetype will feel most natural to you.\n\n`;
  }

  md += `## 📊 Weekly Summary\n\n`;
  md += `| Metric | Value |\n`;
  md += `|--------|-------|\n`;
  md += `| Total Actions | ${analytics.totalActions} |\n`;
  md += `| Active Plugins | ${analytics.totalPlugins} |\n`;
  md += `| Active Days | ${activeDays}/7 |\n`;
  md += `| Current Streak | ${analytics.activeStreak} days |\n`;
  md += `| Best Streak | ${analytics.bestStreak} days |\n\n`;

  if (analytics.personalityMatch) {
    md += `## 🧩 Personality Match\n\n`;
    md += `**${analytics.personalityMatch.personality}** (${analytics.personalityMatch.matchScore}% match)\n\n`;
    md += `${analytics.personalityMatch.description}\n\n`;
  }

  if (topPlugins.length > 0) {
    md += `## 🔥 Top Plugins This Week\n\n`;
    md += `| Plugin | Tasks | Est. Messages |\n`;
    md += `|--------|-------|---------------|\n`;
    topPlugins.forEach((p) => {
      md += `| ${p.name} | ${p.sessions} | ${p.messages} |\n`;
    });
    md += '\n';
  }

  md += `## 📅 Daily Activity\n\n`;
  md += `| Day | Actions |\n`;
  md += `|-----|---------|\n`;
  daily.forEach((d) => {
    const bar = d.sessions > 0 ? '█'.repeat(Math.min(d.sessions, 10)) : '—';
    md += `| ${d.day} | ${d.sessions} ${d.sessions > 0 ? ' ' + bar : ''}|\n`;
  });
  md += '\n';

  if (analytics.insights.length > 0) {
    md += `## 💡 Insights\n\n`;
    analytics.insights.forEach((i) => (md += i + '\n'));
    md += '\n';
  }

  if (personalityHistory.length > 0) {
    md += `## 🔄 Archetype Shifts\n\n`;
    md += `Your personality has been tracked this week:\n\n`;
    personalityHistory.forEach((line) => (md += line + '\n'));
    md += '\n';
  }

  md += `---\n`;
  md += `*LifeOS → Your personality-aware copilot. Every week builds a better you.*\n`;

  return {
    generatedAt: now.toISOString(),
    weekLabel: weekRange.label,
    dateRange: weekRange.label,
    archetype,
    totals: {
      sessions: analytics.totalActions,
      messages: analytics.totalPlugins,
      activeDays,
    },
    topPlugins,
    dailyBreakdown: daily,
    markdown: md,
  };
}

/**
 * Downloads the weekly digest as a .md file.
 * Returns true if download was triggered.
 */
export function downloadWeeklyDigest(): boolean {
  const digest = generateWeeklyDigest();
  if (!digest) return false;

  const blob = new Blob([digest.markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const now = new Date();
  a.download = `lifeos-weekly-${now.toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
