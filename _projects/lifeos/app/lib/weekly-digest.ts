/**
 * LifeOS — Weekly Digest Export
 *
 * Generates a markdown summary of the past 7 days' usage + personality trends.
 * Core function reads from localStorage (offline-first).
 * Extended version optionally enriches the digest with data from plugin adapters
 * (Headspace, Calm, etc.) when those adapters are configured.
 */

import { UsageEvent, PluginUsage, getUsageSummary, getPluginUsage } from './usage-analytics';
import { pluginAdapterRegistry } from './plugin-adapter-registry';
import type { MindfulnessSummary, MindfulnessAdapter, HealthAdapter, HobbyAdapter, HobbySummary, HealthSummary } from './plugin-adapters';

// ─── Types ─────────────────────────────────────────────────────────

/** Mindfulness adapter enrichment data for the digest. */
export interface MindfulnessDigestData {
  provider: string;
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  averageMoodDelta: number;
}

/** Health OS adapter enrichment data for the digest. */
export interface HealthDigestData {
  provider: string;
  stepsToday: number;
  sleepHoursAvg: number;
  workoutMinutes: number;
  workoutsCount: number;
  sleepQualityAvg: number;
}

/** Hobbies OS adapter enrichment data for the digest. */
export interface HobbyDigestData {
  provider: string;
  totalHours: number;
  activeHobbies: number;
  projectsCompleted: number;
  milestonesReached: number;
  topHobby: string;
}

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
  /** Mindfulness data from plugin adapters (Headspace, Calm), if configured. */
  mindfulnessData: MindfulnessDigestData[];
  /** Health OS data from plugin adapters (Oura, Fitbit, Apple Health), if configured. */
  healthData: HealthDigestData[];
  /** Hobbies OS data from plugin adapters (Skillshare, Udemy, YouTube), if configured. */
  hobbyData: HobbyDigestData[];
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
      (e) => e.timestamp.slice(0, 10) === key && e.eventType === 'session_started'
    ).length;
    days.push({ day: dayLabel, sessions });
  }

  return days;
}

function getRecentEvents(): UsageEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('lifeos_usage_events');
    if (!raw) return [];
    const all: UsageEvent[] = JSON.parse(raw);
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return all.filter((e) => new Date(e.timestamp).getTime() > cutoff);
  } catch {
    return [];
  }
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

// ─── Main Generator (localStorage only) ───────────────────────────

export function generateWeeklyDigest(): WeeklyDigest | null {
  if (typeof window === 'undefined') return null;

  const weekRange = getWeekRange();
  const summary = getUsageSummary();
  const archetype = getArchetypeData();
  const daily = collectDailyBreakdown();
  const personalityHistory = getLastWeekPersonalityNotes();

  if (!summary) return null;

  const now = new Date();
  const topPlugins = summary.pluginRankings.slice(0, 5).map((p) => ({
    name: p.pluginName,
    sessions: p.sessions,
    messages: p.messages,
  }));

  const activeDays = daily.filter((d) => d.sessions > 0).length;

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
  md += `| Total Sessions | ${summary.totalSessions} |\n`;
  md += `| Total Messages | ${summary.totalMessages} |\n`;
  md += `| Active Days | ${activeDays}/7 |\n`;
  md += `| Most Used Plugin | ${summary.mostUsedPlugin} |\n\n`;

  md += `## 🔥 Top Plugins This Week\n\n`;
  md += `| Plugin | Sessions | Messages |\n`;
  md += `|--------|----------|----------|\n`;
  topPlugins.forEach((p) => {
    md += `| ${p.name} | ${p.sessions} | ${p.messages} |\n`;
  });
  md += '\n';

  md += `## 📅 Daily Activity\n\n`;
  md += `| Day | Sessions |\n`;
  md += `|-----|----------|\n`;
  daily.forEach((d) => {
    const bar = d.sessions > 0 ? '█'.repeat(Math.min(d.sessions, 10)) : '—';
    md += `| ${d.day} | ${d.sessions} ${bar ? ' ' + bar : ''}|\n`;
  });
  md += '\n';

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
      sessions: summary.totalSessions,
      messages: summary.totalMessages,
      activeDays,
    },
    topPlugins,
    dailyBreakdown: daily,
    mindfulnessData: [],
    healthData: [],
    hobbyData: [],
    markdown: md,
  };
}

/**
 * Enriched digest generator: includes adapter data (Headspace, Calm, etc.)
 * alongside localStorage usage analytics.
 *
 * Attempts to connect to all registered and enabled mindfulness adapters.
 * Gracefully handles missing API keys or connection failures — falls back to
 * localStorage-only data on any error.
 *
 * @param adapterConfigs - Optional map of provider → config. If omitted, no adapter data is fetched.
 */
export async function generateEnrichedWeeklyDigest(
  adapterConfigs?: Record<string, { apiKey: string; baseUrl?: string }>,
): Promise<WeeklyDigest | null> {
  const base = generateWeeklyDigest();
  if (!base) return null;

  const mindfulnessData: MindfulnessDigestData[] = [];
  const healthData: HealthDigestData[] = [];
  const hobbyData: HobbyDigestData[] = [];

  // If no adapter configs supplied, return base digest as-is
  if (!adapterConfigs || Object.keys(adapterConfigs).length === 0) {
    return base;
  }

  const now = new Date();
  const weekEnd = now.toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Try each configured provider
  for (const [provider, config] of Object.entries(adapterConfigs)) {
    try {
      // Determine the plugin category from provider name
      const mindfulnessProviders = ['headspace', 'calm', 'ten-percent-happier'];
      const healthProviders = ['oura', 'fitbit', 'apple_health'];
      const hobbyProviders = ['skillshare', 'udemy', 'youtube'];

      if (mindfulnessProviders.includes(provider)) {
        const adapter = pluginAdapterRegistry.createAdapter('mindfulness-os', provider, config) as MindfulnessAdapter | null;
        if (!adapter) continue;
        const connected = await adapter.connect();
        if (!connected) continue;
        const summary: MindfulnessSummary = await adapter.getSummary();

        mindfulnessData.push({
          provider,
          totalMinutes: summary.totalMinutesThisWeek,
          totalSessions: summary.totalSessionsThisWeek,
          currentStreak: summary.currentStreakDays,
          averageMoodDelta: summary.averageMoodDelta,
        });

        const mdBlock = buildAdapterMarkdownBlock(provider, summary);
        const insertPoint = base.markdown.indexOf('## 🔥 Top Plugins');
        if (insertPoint !== -1) {
          base.markdown = base.markdown.slice(0, insertPoint) + mdBlock + '\n' + base.markdown.slice(insertPoint);
        }
      } else if (healthProviders.includes(provider)) {
        const adapter = pluginAdapterRegistry.createAdapter('health-os', provider, config) as HealthAdapter | null;
        if (!adapter) continue;
        const connected = await adapter.connect();
        if (!connected) continue;
        const summary: HealthSummary = await adapter.getSummary();

        healthData.push({
          provider,
          stepsToday: summary.totalStepsToday,
          sleepHoursAvg: summary.averageSleepHoursThisWeek,
          workoutMinutes: summary.workoutMinutesThisWeek,
          workoutsCount: summary.workoutsThisWeek,
          sleepQualityAvg: summary.averageSleepQualityThisWeek,
        });

        const mdBlock = buildHealthMarkdownBlock(provider, summary);
        const insertPoint = base.markdown.indexOf('## 🔥 Top Plugins');
        if (insertPoint !== -1) {
          base.markdown = base.markdown.slice(0, insertPoint) + mdBlock + '\n' + base.markdown.slice(insertPoint);
        }
      } else if (hobbyProviders.includes(provider)) {
        const adapter = pluginAdapterRegistry.createAdapter('hobbies-os', provider, config) as HobbyAdapter | null;
        if (!adapter) continue;
        const connected = await adapter.connect();
        if (!connected) continue;
        const summary: HobbySummary = await adapter.getSummary();

        hobbyData.push({
          provider,
          totalHours: summary.totalHoursThisMonth,
          activeHobbies: summary.activeHobbies,
          projectsCompleted: summary.projectsCompleted,
          milestonesReached: summary.milestonesReached,
          topHobby: summary.topHobbyByTime,
        });

        const mdBlock = buildHobbyMarkdownBlock(provider, summary);
        const insertPoint = base.markdown.indexOf('## 🔥 Top Plugins');
        if (insertPoint !== -1) {
          base.markdown = base.markdown.slice(0, insertPoint) + mdBlock + '\n' + base.markdown.slice(insertPoint);
        }
      }
    } catch (err) {
      // Provider unavailable — skip silently
      console.debug(`[WeeklyDigest] Adapter ${provider} unavailable:`, err);
    }
  }

  base.mindfulnessData = mindfulnessData;
  base.healthData = healthData;
  base.hobbyData = hobbyData;
  return base;
}

/**
 * Query all instantiated adapters for their summaries (if already connected).
 * This is a lighter variant for the UI layer — does not attempt to connect,
 * only reads from adapters already cached in the registry.
 */
export async function queryCachedAdapterData(): Promise<MindfulnessDigestData[]> {
  const results: MindfulnessDigestData[] = [];

  for (const [provider, adapter] of Array.from(pluginAdapterRegistry.mindfulness)) {
    try {
      const summary = await adapter.getSummary();
      results.push({
        provider,
        totalMinutes: summary.totalMinutesThisWeek,
        totalSessions: summary.totalSessionsThisWeek,
        currentStreak: summary.currentStreakDays,
        averageMoodDelta: summary.averageMoodDelta,
      });
    } catch {
      // skip silently
    }
  }

  return results;
}

/**
 * Query cached Health OS adapter data for the weekly digest.
 * Reads from already-instantiated health adapters (Oura, Fitbit, Apple Health).
 */
export async function queryCachedHealthData(): Promise<HealthDigestData[]> {
  const results: HealthDigestData[] = [];

  for (const [provider, adapter] of Array.from(pluginAdapterRegistry.health)) {
    try {
      const adapterTyped = adapter as unknown as HealthAdapter;
      const summary: HealthSummary = await adapterTyped.getSummary();
      results.push({
        provider,
        stepsToday: summary.totalStepsToday,
        sleepHoursAvg: summary.averageSleepHoursThisWeek,
        workoutMinutes: summary.workoutMinutesThisWeek,
        workoutsCount: summary.workoutsThisWeek,
        sleepQualityAvg: summary.averageSleepQualityThisWeek,
      });
    } catch {
      // skip silently
    }
  }

  return results;
}

/**
 * Query cached Hobbies OS adapter data for the weekly digest.
 * Reads from already-instantiated hobby adapters (Skillshare, Udemy).
 */
export async function queryCachedHobbyData(): Promise<HobbyDigestData[]> {
  const results: HobbyDigestData[] = [];

  for (const [provider, adapter] of Array.from(pluginAdapterRegistry.hobbies)) {
    try {
      const adapterTyped = adapter as unknown as HobbyAdapter;
      const summary: HobbySummary = await adapterTyped.getSummary();
      results.push({
        provider,
        totalHours: summary.totalHoursThisMonth,
        activeHobbies: summary.activeHobbies,
        projectsCompleted: summary.projectsCompleted,
        milestonesReached: summary.milestonesReached,
        topHobby: summary.topHobbyByTime,
      });
    } catch {
      // skip silently
    }
  }

  return results;
}

/** Build a markdown section for a single health provider (Oura, Fitbit, Apple Health). */
function buildHealthMarkdownBlock(provider: string, summary: HealthSummary): string {
  const emojiMap: Record<string, string> = {
    oura: '💍',
    fitbit: '⌚',
    apple_health: '🍎',
  };
  const emoji = emojiMap[provider] || '❤️';
  const label = provider === 'apple_health' ? 'Apple Health'
    : provider.charAt(0).toUpperCase() + provider.slice(1);

  const sleepQuality = summary.averageSleepQualityThisWeek > 0
    ? summary.averageSleepQualityThisWeek.toFixed(1) + '/10'
    : '—';
  const sleepHours = summary.averageSleepHoursThisWeek > 0
    ? summary.averageSleepHoursThisWeek.toFixed(1) + ' hrs'
    : '—';

  let block = `## ${emoji} ${label} Health Snapshot\n\n`;
  block += `| Metric | Value |\n`;
  block += `|--------|-------|\n`;
  block += `| Steps Today | ${summary.totalStepsToday.toLocaleString()} |\n`;
  block += `| Avg Sleep | ${sleepHours} |\n`;
  block += `| Sleep Quality | ${sleepQuality} |\n`;
  block += `| Workout Minutes | ${summary.workoutMinutesThisWeek} min |\n`;
  block += `| Workouts This Week | ${summary.workoutsThisWeek} |\n\n`;

  return block;
}

/** Build a markdown section for a single hobby provider (Skillshare, Udemy). */
function buildHobbyMarkdownBlock(provider: string, summary: HobbySummary): string {
  const emojiMap: Record<string, string> = {
    skillshare: '🎨',
    udemy: '📚',
    youtube: '▶️',
  };
  const emoji = emojiMap[provider] || '🎯';
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);

  let block = `## ${emoji} ${label} Learning Snapshot\n\n`;
  block += `| Metric | Value |\n`;
  block += `|--------|-------|\n`;
  block += `| Hours This Month | ${summary.totalHoursThisMonth.toFixed(1)} |\n`;
  block += `| Active Hobbies | ${summary.activeHobbies} |\n`;
  block += `| Projects Completed | ${summary.projectsCompleted} |\n`;
  block += `| Milestones Reached | ${summary.milestonesReached} |\n`;
  block += `| Top Hobby | ${summary.topHobbyByTime} |\n\n`;

  return block;
}

/** Build a markdown section for a single mindfulness provider. */
function buildAdapterMarkdownBlock(provider: string, summary: MindfulnessSummary): string {
  const emoji = provider === 'headspace' ? '🧡' : provider === 'calm' ? '💙' : '🧘';
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);

  let block = `## ${emoji} ${label} Insight\n\n`;
  block += `| Metric | Value |\n`;
  block += `|--------|-------|\n`;
  block += `| Meditation Minutes | ${Math.round(summary.totalMinutesThisWeek)} min |\n`;
  block += `| Sessions This Week | ${summary.totalSessionsThisWeek} |\n`;
  block += `| Current Streak | ${summary.currentStreakDays} days |\n`;
  block += `| Avg Mood Lift | ${summary.averageMoodDelta > 0 ? '+' : ''}${summary.averageMoodDelta.toFixed(1)} |\n\n`;

  if (summary.lastSession) {
    const d = new Date(summary.lastSession.startedAt);
    block += `*Last session: ${d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} `;
    block += `(${Math.round(summary.lastSession.durationSeconds / 60)} min ${summary.lastSession.type})*\n\n`;
  }

  return block;
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
