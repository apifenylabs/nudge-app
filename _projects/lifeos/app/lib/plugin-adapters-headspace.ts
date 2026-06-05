/**
 * LifeOS — Headspace Mindfulness Adapter
 * =======================================
 * Concrete implementation of MindfulnessAdapter for Headspace.
 *
 * Maps Headspace's public API to the LifeOS MindfulnessAdapter interface.
 * Handles: meditation sessions, breathwork exercises, streak tracking,
 * mood logging, and basic usage metrics.
 *
 * API Reference: https://developer.headspace.com/api
 * Authentication: OAuth 2.0 (client credentials flow, scoped to user data)
 *
 * @packageDocumentation
 */

import type {
  MindfulnessAdapter,
  MindfulnessAdapterConfig,
  MindfulnessSession,
  MindfulnessSummary,
  MindfulnessMetric,
} from './plugin-adapters';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Raw session object from Headspace API. */
interface HeadspaceRawSession {
  id: string;
  type: 'meditation' | 'breathwork' | 'body_scan';
  started_at: string;
  duration_seconds: number;
  completed: boolean;
  pack_title?: string;
  meditation_type?: 'single' | 'course' | 'daily' | 'focus' | 'sleep';
  mood_before?: number;
  mood_after?: number;
  notes?: string;
}

/** Raw user stats from Headspace API. */
interface HeadspaceRawStats {
  total_minutes_this_week: number;
  total_sessions_this_week: number;
  current_streak_days: number;
  longest_streak_days: number;
  total_sessions_all_time: number;
  last_session: HeadspaceRawSession | null;
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://api.headspace.com/v2';

const ENDPOINTS = {
  sessions:    `${API_BASE}/sessions`,
  stats:       `${API_BASE}/user/stats`,
  health:      `${API_BASE}/ping`,
  mood:        `${API_BASE}/user/mood`,
  connect:     `${API_BASE}/user/me`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'headspace';

/* ─── Adapter —──────────────────────────────────────────────────────────── */

/**
 * Concrete Headspace adapter.
 *
 * Usage:
 * ```ts
 * const hs = new HeadspaceAdapter({ apiKey: process.env.HEADSPACE_API_KEY! });
 * await hs.connect();
 * const summary = await hs.getSummary();
 * ```
 */
export class HeadspaceAdapter implements MindfulnessAdapter {
  readonly provider = PROVIDER_NAME;
  readonly config: MindfulnessAdapterConfig;
  private connected = false;
  private abortController: AbortController | null = null;

  constructor(config: MindfulnessAdapterConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? API_BASE,
      timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
  }

  /* ── Connection ─────────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      const res = await this.request(ENDPOINTS.connect);
      this.connected = res.ok;
      return this.connected;
    } catch {
      this.connected = false;
      return false;
    }
  }

  /* ── Sessions ───────────────────────────────────────────────────────── */

  async getSessions(from: string, to: string): Promise<MindfulnessSession[]> {
    const params = new URLSearchParams({
      from,
      to,
      limit: '100',
    });
    const res = await this.request(`${ENDPOINTS.sessions}?${params}`);

    if (!res.ok) {
      throw new HeadspaceError(`Failed to fetch sessions: ${res.status}`, res.status);
    }

    const raw: HeadspaceRawSession[] = await res.json();
    return raw.map(mapSession);
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<MindfulnessSummary> {
    const res = await this.request(ENDPOINTS.stats);

    if (!res.ok) {
      throw new HeadspaceError(`Failed to fetch stats: ${res.status}`, res.status);
    }

    const raw: HeadspaceRawStats = await res.json();

    return {
      totalMinutesThisWeek: raw.total_minutes_this_week,
      totalSessionsThisWeek: raw.total_sessions_this_week,
      currentStreakDays: raw.current_streak_days,
      longestStreakDays: raw.longest_streak_days,
      averageMoodDelta: await this.computeAverageMoodDelta(),
      lastSession: raw.last_session ? mapSession(raw.last_session) : null,
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: MindfulnessMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'meditation_minutes': {
        const sessions = await this.getSessions(from, to);
        // Aggregate by day
        const byDay = aggregateByDay(sessions, (s) => s.durationSeconds / 60);
        return byDay;
      }

      case 'session_count': {
        const sessions = await this.getSessions(from, to);
        const byDay = aggregateByDay(sessions, () => 1);
        return byDay;
      }

      case 'streak_days': {
        const summary = await this.getSummary();
        return [summary.currentStreakDays, summary.longestStreakDays];
      }

      case 'mood_score': {
        const sessions = await this.getSessions(from, to);
        const scores = sessions
          .filter((s) => s.moodAfter != null)
          .map((s) => s.moodAfter!);
        return scores.length > 0 ? scores : [0];
      }

      case 'breathing_exercises_completed': {
        const sessions = await this.getSessions(from, to);
        const breathwork = sessions.filter((s) => s.type === 'breathwork');
        const byDay = aggregateByDay(breathwork, () => 1);
        return byDay;
      }

      case 'journal_entries':
      case 'gratitude_logs':
        // Headspace doesn't expose journal/gratitude via public API currently;
        // return empty to indicate no data rather than failing
        return [];

      case 'heart_rate_variability':
        // HRV requires wearable integration, not part of Headspace API
        return [];
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<MindfulnessSession, 'id'>): Promise<string> {
    const body = {
      type: session.type,
      started_at: session.startedAt,
      duration_seconds: session.durationSeconds,
      completed: session.completed,
      mood_before: session.moodBefore,
      mood_after: session.moodAfter,
      notes: session.notes,
      tags: session.tags,
    };

    const res = await this.request(ENDPOINTS.sessions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new HeadspaceError(`Failed to log session: ${res.status}`, res.status);
    }

    const created: { id: string } = await res.json();
    return created.id;
  }

  /* ── Health Check ───────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      const res = await this.request(ENDPOINTS.health);
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ── Private ────────────────────────────────────────────────────────── */

  private async computeAverageMoodDelta(): Promise<number> {
    try {
      const sessions = await this.getLastWeekSessions();
      const deltas = sessions
        .filter((s) => s.moodBefore != null && s.moodAfter != null)
        .map((s) => (s.moodAfter ?? 0) - (s.moodBefore ?? 0));

      if (deltas.length === 0) return 0;
      return deltas.reduce((a, b) => a + b, 0) / deltas.length;
    } catch {
      return 0;
    }
  }

  private async getLastWeekSessions(): Promise<MindfulnessSession[]> {
    const to = new Date().toISOString();
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    return this.getSessions(from, to);
  }

  private async request(
    url: string,
    init?: RequestInit,
  ): Promise<Response> {
    this.abortController = new AbortController();
    const timeout = setTimeout(() => this.abortController!.abort(), this.config.timeoutMs);

    try {
      const res = await fetch(url, {
        ...init,
        signal: this.abortController.signal,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${this.config.apiKey}`,
          Accept: 'application/json',
        },
      });
      return res;
    } finally {
      clearTimeout(timeout);
      this.abortController = null;
    }
  }
}

/* ─── Mapping ───────────────────────────────────────────────────────────── */

/** Maps a raw Headspace session to the canonical MindfulnessSession type. */
function mapSession(raw: HeadspaceRawSession): MindfulnessSession {
  return {
    id: raw.id,
    provider: PROVIDER_NAME,
    type: raw.type === 'body_scan' ? 'body_scan' : raw.type,
    startedAt: raw.started_at,
    durationSeconds: raw.duration_seconds,
    completed: raw.completed,
    moodBefore: raw.mood_before,
    moodAfter: raw.mood_after,
    notes: raw.notes,
    tags: raw.pack_title ? [raw.pack_title] : undefined,
  };
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Aggregates session values by day, returning array of daily totals. */
function aggregateByDay(sessions: MindfulnessSession[], extractor: (s: MindfulnessSession) => number): number[] {
  const map = new Map<string, number>();

  for (const s of sessions) {
    const day = s.startedAt.slice(0, 10); // YYYY-MM-DD
    map.set(day, (map.get(day) ?? 0) + extractor(s));
  }

  // Return as sorted time series
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/* ─── Error ─────────────────────────────────────────────────────────────── */

/** Typed error for Headspace API failures. */
export class HeadspaceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(`[Headspace] ${message}`);
    this.name = 'HeadspaceError';
  }
}
