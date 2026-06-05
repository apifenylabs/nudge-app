/**
 * LifeOS — Skillshare Hobbies Adapter
 * =====================================
 * Concrete implementation of HobbyAdapter for Skillshare.
 *
 * Maps Skillshare's API to the LifeOS HobbyAdapter interface.
 * Handles: course enrollment tracking, watch history, project submissions,
 * learning minutes, and skill milestones.
 *
 * API Reference: https://developers.skillshare.com/api
 * Authentication: Bearer token (OAuth 2.0, scoped to user data)
 *
 * @packageDocumentation
 */

import type {
  HobbyAdapter,
  HobbyAdapterConfig,
  HobbySession,
  HobbyMilestone,
  HobbySummary,
  HobbyMetric,
  HobbyCategory,
} from './plugin-adapters';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Raw class/watch session from Skillshare API. */
interface SkillshareRawSession {
  id: string;
  class_id: string;
  class_title: string;
  category: string;
  started_at: string;
  duration_minutes: number;
  completed: boolean;
  project_submitted: boolean;
  project_title?: string;
  notes?: string;
  rating?: number;
}

/** Raw user stats from Skillshare API. */
interface SkillshareRawStats {
  total_minutes_this_month: number;
  total_classes_watched: number;
  active_enrollments: number;
  completed_classes: number;
  projects_submitted: number;
  milestones_reached: number;
  top_category: string;
  recent_sessions: SkillshareRawSession[];
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://api.skillshare.com/v2';

const ENDPOINTS = {
  sessions:   `${API_BASE}/user/activity`,
  enrollments: `${API_BASE}/user/enrollments`,
  stats:      `${API_BASE}/user/stats`,
  milestones: `${API_BASE}/user/milestones`,
  health:     `${API_BASE}/ping`,
  connect:    `${API_BASE}/user/me`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'skillshare';

/* ─── Category Mapping ──────────────────────────────────────────────────── */

/** Maps Skillshare categories to LifeOS HobbyCategory. */
const CATEGORY_MAP: Record<string, HobbyCategory> = {
  'creative':       'creative',
  'illustration':   'creative',
  'design':         'creative',
  'photography':    'creative',
  'writing':        'creative',
  'film':           'creative',
  'music':          'creative',
  'fine-art':       'crafts',
  'crafts':         'crafts',
  'lifestyle':      'intellectual',
  'business':       'intellectual',
  'technology':     'intellectual',
  'culinary':       'culinary',
};

function mapCategory(skillshareCategory: string): HobbyCategory {
  return CATEGORY_MAP[skillshareCategory.toLowerCase()] ?? 'intellectual';
}

/* ─── Adapter ───────────────────────────────────────────────────────────── */

/**
 * Concrete Skillshare adapter.
 *
 * Usage:
 * ```ts
 * const ss = new SkillshareAdapter({ apiKey: process.env.SKILLSHARE_API_KEY! });
 * await ss.connect();
 * const summary = await ss.getSummary();
 * ```
 */
export class SkillshareAdapter implements HobbyAdapter {
  readonly provider = PROVIDER_NAME;
  readonly config: HobbyAdapterConfig;
  private connected = false;
  private abortController: AbortController | null = null;

  constructor(config: HobbyAdapterConfig) {
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

  async getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]> {
    const params = new URLSearchParams({ from, to, limit: '100' });
    const res = await this.request(`${ENDPOINTS.sessions}?${params}`);

    if (!res.ok) {
      throw new SkillshareError(`Failed to fetch sessions: ${res.status}`, res.status);
    }

    const raw: SkillshareRawSession[] = await res.json();
    let sessions = raw.map(mapSession);

    if (category) {
      sessions = sessions.filter((s) => s.category === category);
    }

    return sessions;
  }

  /* ── Milestones ─────────────────────────────────────────────────────── */

  async getMilestones(from: string, to: string): Promise<HobbyMilestone[]> {
    const params = new URLSearchParams({ from, to, limit: '50' });
    const res = await this.request(`${ENDPOINTS.milestones}?${params}`);

    if (!res.ok) {
      throw new SkillshareError(`Failed to fetch milestones: ${res.status}`, res.status);
    }

    const raw: Array<{ id: string; title: string; achieved_at: string; description: string }> = await res.json();
    return raw.map((m) => ({
      id: m.id,
      hobby: `skillshare:${m.title}`,
      title: m.title,
      achievedAt: m.achieved_at,
      description: m.description,
    }));
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<HobbySummary> {
    const res = await this.request(ENDPOINTS.stats);

    if (!res.ok) {
      throw new SkillshareError(`Failed to fetch stats: ${res.status}`, res.status);
    }

    const raw: SkillshareRawStats = await res.json();

    return {
      totalHoursThisMonth: Math.round(raw.total_minutes_this_month / 60 * 10) / 10,
      activeHobbies: raw.active_enrollments,
      projectsCompleted: raw.projects_submitted,
      milestonesReached: raw.milestones_reached,
      topHobbyByTime: raw.top_category,
      recentSessions: raw.recent_sessions.map(mapSession),
      upcomingMilestones: undefined, // Skillshare API doesn't expose upcoming
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: HobbyMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'hours_spent': {
        const sessions = await this.getSessions(from, to);
        const byDay = aggregateByDay(sessions, (s) => s.durationMinutes / 60);
        return byDay;
      }

      case 'courses_enrolled': {
        const params = new URLSearchParams({ from, to, limit: '100' });
        const res = await this.request(`${ENDPOINTS.enrollments}?${params}`);
        if (!res.ok) return [];
        const raw: Array<{ enrolled_at: string }> = await res.json();
        const byDay = aggregateRawByDay(raw, (r) => r.enrolled_at, () => 1);
        return byDay;
      }

      case 'projects_completed': {
        const sessions = await this.getSessions(from, to);
        const projects = sessions.filter((s) => s.notes?.includes('[project]'));
        return aggregateByDay(projects, () => 1);
      }

      case 'skills_acquired':
      case 'practice_sessions': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, () => 1);
      }

      case 'milestones_reached': {
        const milestones = await this.getMilestones(from, to);
        // Map milestones to conform to the aggregate helper
        const mapped = milestones.map(m => ({ startedAt: m.achievedAt }));
        return aggregateByDay(mapped, () => 1);
      }

      case 'materials_purchased':
        // Skillshare doesn't expose materials purchases via API
        return [];
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<HobbySession, 'id'>): Promise<string> {
    const body = {
      hobby: session.hobby,
      started_at: session.startedAt,
      duration_minutes: session.durationMinutes,
      completed: session.completed,
      notes: session.notes,
      satisfaction_rating: session.satisfactionRating,
    };

    const res = await this.request(ENDPOINTS.sessions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new SkillshareError(`Failed to log session: ${res.status}`, res.status);
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

  private async request(url: string, init?: RequestInit): Promise<Response> {
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

/** Maps a raw Skillshare session to the canonical HobbySession type. */
function mapSession(raw: SkillshareRawSession): HobbySession {
  return {
    id: raw.id,
    provider: PROVIDER_NAME,
    hobby: raw.class_title,
    category: mapCategory(raw.category),
    startedAt: raw.started_at,
    durationMinutes: raw.duration_minutes,
    completed: raw.completed,
    notes: raw.notes ?? (raw.project_submitted ? '[project]' : undefined),
    satisfactionRating: raw.rating,
  };
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Aggregates session values by day into a sorted time series. */
function aggregateByDay<T extends { startedAt: string }>(
  items: T[],
  extractor: (item: T) => number,
): number[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const day = item.startedAt.slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + extractor(item));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/** Aggregates raw items by a date field into a sorted time series. */
function aggregateRawByDay<T>(
  items: T[],
  dateField: (item: T) => string,
  extractor: (item: T) => number,
): number[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const day = dateField(item).slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + extractor(item));
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
}

/* ─── Error ─────────────────────────────────────────────────────────────── */

/** Typed error for Skillshare API failures. */
export class SkillshareError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(`[Skillshare] ${message}`);
    this.name = 'SkillshareError';
  }
}
