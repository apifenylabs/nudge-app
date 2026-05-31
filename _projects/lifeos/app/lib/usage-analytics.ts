/**
 * LifeOS — Usage Analytics
 *
 * Tracks per-plugin usage events (sessions started, messages sent,
 * phases progressed, time spent) and stores them in localStorage
 * with optional Supabase sync (when configured).
 *
 * Follows same pattern as chat-persistence.ts: localStorage fallback,
 * Supabase when configured, graceful no-op when neither available.
 */

import supabase, { isSupabaseConfigured } from './supabase-client';

// ─── Types ─────────────────────────────────────────────────────────

export type UsageEventType =
  | 'plugin_opened'
  | 'session_started'
  | 'message_sent'
  | 'phase_progressed'
  | 'canvas_opened'
  | 'session_completed';

export interface UsageEvent {
  id: string;
  pluginId: string;
  pluginName: string;
  eventType: UsageEventType;
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
}

export interface PluginUsage {
  pluginId: string;
  pluginName: string;
  totalSessions: number;
  totalMessages: number;
  totalTimeMinutes: number;
  lastUsed: string;
  phaseProgressions: Record<string, number>; // phaseId -> count
  dailyStats: Record<string, number>;         // YYYY-MM-DD -> session count
}

export interface UsageSummary {
  totalSessions: number;
  totalMessages: number;
  totalTimeMinutes: number;
  activeDays: number;
  mostUsedPlugin: string;
  pluginRankings: { pluginId: string; pluginName: string; sessions: number; messages: number }[];
}

// ─── Local Storage ─────────────────────────────────────────────────

const STORAGE_KEY_EVENTS = 'lifeos_usage_events';
const STORAGE_KEY_SESSIONS = 'lifeos_usage_sessions';

function getLocalEvents(): UsageEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalEvents(events: UsageEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
  } catch (e) {
    console.warn('[Usage Analytics] Failed to save events:', e);
  }
}

function getLocalSessionTimes(): Record<string, { start: string; pluginId: string; pluginName: string }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalSessionTimes(times: Record<string, { start: string; pluginId: string; pluginName: string }>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(times));
  } catch (e) {
    console.warn('[Usage Analytics] Failed to save session times:', e);
  }
}

// ─── Analytics Table Helpers ──────────────────────────────────────

function usageTable() {
  return (supabase as any)?.from('lifeos_usage_events');
}

// ─── Public API ────────────────────────────────────────────────────

let eventCounter = 0;

function generateId(): string {
  eventCounter++;
  return `usage-${Date.now()}-${eventCounter}-${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Track a usage event.
 * Stores locally immediately, syncs to Supabase when configured.
 */
export async function trackEvent(
  pluginId: string,
  pluginName: string,
  eventType: UsageEventType,
  metadata?: Record<string, string | number | boolean>,
): Promise<void> {
  const event: UsageEvent = {
    id: generateId(),
    pluginId,
    pluginName,
    eventType,
    metadata: metadata || undefined,
    timestamp: new Date().toISOString(),
  };

  // Save locally
  const events = getLocalEvents();
  events.push(event);
  // Keep last 10,000 events
  if (events.length > 10000) {
    events.splice(0, events.length - 10000);
  }
  saveLocalEvents(events);

  // Sync to Supabase when configured
  if (isSupabaseConfigured() && supabase && eventType !== 'canvas_opened') {
    // Canvas opened is noisy, skip Supabase for it
    try {
      await usageTable().insert({
        plugin_id: pluginId,
        plugin_name: pluginName,
        event_type: eventType,
        metadata: metadata || null,
        created_at: event.timestamp,
      });
    } catch (e) {
      // Silent fail — localStorage is the source of truth
      console.debug('[Usage Analytics] Supabase sync skipped (expected if RLS not configured)');
    }
  }
}

/**
 * Start timing a session. Call when a plugin conversation begins.
 */
export async function startSession(pluginId: string, pluginName: string): Promise<void> {
  const sessionId = generateId();
  const times = getLocalSessionTimes();
  times[sessionId] = {
    start: new Date().toISOString(),
    pluginId,
    pluginName,
  };
  saveLocalSessionTimes(times);

  await trackEvent(pluginId, pluginName, 'session_started', { sessionId });
}

/**
 * End a session timer. Call when leaving a plugin conversation.
 * Returns the duration in minutes, or 0 if no session was started.
 */
export async function endSession(pluginId: string): Promise<number> {
  const times = getLocalSessionTimes();
  // Find the most recent session for this plugin
  const sessionKeys = Object.keys(times).filter(
    (k) => times[k].pluginId === pluginId,
  );
  if (sessionKeys.length === 0) return 0;

  // End the most recent session
  const latestKey = sessionKeys[sessionKeys.length - 1];
  const session = times[latestKey];
  const startTime = new Date(session.start).getTime();
  const elapsedMs = Date.now() - startTime;
  const elapsedMinutes = Math.round(elapsedMs / 60000);

  delete times[latestKey];
  saveLocalSessionTimes(times);

  await trackEvent(pluginId, session.pluginName, 'session_completed', {
    durationMinutes: elapsedMinutes,
  });

  return elapsedMinutes;
}

/**
 * Track a sent message.
 */
export async function trackMessage(
  pluginId: string,
  pluginName: string,
  role: 'user' | 'assistant',
): Promise<void> {
  await trackEvent(pluginId, pluginName, 'message_sent', { role });
}

/**
 * Track a phase progression.
 */
export async function trackPhaseProgress(
  pluginId: string,
  pluginName: string,
  fromPhase: string,
  toPhase: string,
): Promise<void> {
  await trackEvent(pluginId, pluginName, 'phase_progressed', { fromPhase, toPhase });
}

// ─── Aggregation ───────────────────────────────────────────────────

/**
 * Get usage summary for all plugins based on local events.
 */
export function getUsageSummary(): UsageSummary {
  const events = getLocalEvents();

  if (events.length === 0) {
    return {
      totalSessions: 0,
      totalMessages: 0,
      totalTimeMinutes: 0,
      activeDays: 0,
      mostUsedPlugin: '',
      pluginRankings: [],
    };
  }

  const sessionEvents = events.filter((e) => e.eventType === 'session_started');
  const messageEvents = events.filter((e) => e.eventType === 'message_sent');
  const completedEvents = events.filter((e) => e.eventType === 'session_completed');

  const totalSessions = sessionEvents.length;
  const totalMessages = messageEvents.length;
  const totalTimeMinutes = completedEvents.reduce((sum, e) => {
    return sum + ((e.metadata?.durationMinutes as number) || 0);
  }, 0);

  // Active days: unique dates
  const activeDates = new Set(
    events.map((e) => e.timestamp.split('T')[0]),
  );
  const activeDays = activeDates.size;

  // Per-plugin stats
  const pluginMap = new Map<
    string,
    { pluginName: string; sessions: number; messages: number }
  >();

  sessionEvents.forEach((e) => {
    const existing = pluginMap.get(e.pluginId);
    if (existing) {
      existing.sessions++;
    } else {
      pluginMap.set(e.pluginId, {
        pluginName: e.pluginName,
        sessions: 1,
        messages: 0,
      });
    }
  });

  messageEvents.forEach((e) => {
    const existing = pluginMap.get(e.pluginId);
    if (existing) {
      existing.messages++;
    } else {
      pluginMap.set(e.pluginId, {
        pluginName: e.pluginName,
        sessions: 0,
        messages: 1,
      });
    }
  });

  const pluginRankings = Array.from(pluginMap.entries())
    .map(([pluginId, stats]) => ({
      pluginId,
      pluginName: stats.pluginName,
      sessions: stats.sessions,
      messages: stats.messages,
    }))
    .sort((a, b) => b.sessions - a.sessions);

  const mostUsedPlugin = pluginRankings[0]?.pluginId || '';
  const mostUsedName = pluginRankings[0]?.pluginName || '';

  return {
    totalSessions,
    totalMessages,
    totalTimeMinutes,
    activeDays,
    mostUsedPlugin: mostUsedName,
    pluginRankings,
  };
}

/**
 * Get detailed usage for a single plugin.
 */
export function getPluginUsage(pluginId: string): PluginUsage | null {
  const events = getLocalEvents();
  const pluginEvents = events.filter((e) => e.pluginId === pluginId);

  if (pluginEvents.length === 0) return null;

  const pluginName = pluginEvents[0]?.pluginName || pluginId;
  const sessionStarts = pluginEvents.filter((e) => e.eventType === 'session_started');
  const messages = pluginEvents.filter((e) => e.eventType === 'message_sent');
  const completed = pluginEvents.filter((e) => e.eventType === 'session_completed');

  const totalTimeMinutes = completed.reduce((sum, e) => {
    return sum + ((e.metadata?.durationMinutes as number) || 0);
  }, 0);

  // Phase progressions
  const phaseProgressions: Record<string, number> = {};
  pluginEvents
    .filter((e) => e.eventType === 'phase_progressed')
    .forEach((e) => {
      const toPhase = (e.metadata?.toPhase as string) || 'unknown';
      phaseProgressions[toPhase] = (phaseProgressions[toPhase] || 0) + 1;
    });

  // Daily stats
  const dailyStats: Record<string, number> = {};
  sessionStarts.forEach((e) => {
    const day = e.timestamp.split('T')[0];
    dailyStats[day] = (dailyStats[day] || 0) + 1;
  });

  const sortedDays = Object.keys(dailyStats).sort().reverse();
  const lastUsed = sortedDays[0] || '';

  return {
    pluginId,
    pluginName,
    totalSessions: sessionStarts.length,
    totalMessages: messages.length,
    totalTimeMinutes,
    lastUsed,
    phaseProgressions,
    dailyStats,
  };
}

/**
 * Reset all usage data (for testing or user request).
 */
export function resetUsageData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_EVENTS);
    localStorage.removeItem(STORAGE_KEY_SESSIONS);
  } catch {
    // ignore
  }
}
