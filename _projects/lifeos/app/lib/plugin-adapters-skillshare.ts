/**
 * LifeOS — Skillshare Hobbies Adapter
 * ====================================
 * Concrete implementation of HobbyAdapter for Skillshare.
 *
 * Maps Skillshare's public API to the LifeOS HobbyAdapter interface.
 * Tracks: enrolled courses, completed projects, watch time,
 * learning milestones, and skill acquisition.
 *
 * API Reference: https://developers.skillshare.com/api
 * Authentication: OAuth 2.0 (client credentials with user consent for profile data)
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

/** Raw course object from Skillshare API. */
interface SkillshareRawCourse {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  url: string;
  image_url?: string;
  teacher_name: string;
  total_lessons: number;
  total_duration_minutes: number;
  project_description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

/** Raw user enrollment from Skillshare API. */
interface SkillshareRawEnrollment {
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percent: number;
  watch_minutes: number;
  projects_completed: number;
  last_watched_at: string;
  course: SkillshareRawCourse;
}

/** Raw user progress summary from Skillshare API. */
interface SkillshareRawProgress {
  total_courses_enrolled: number;
  total_courses_completed: number;
  total_watch_minutes: number;
  total_projects_completed: number;
  current_streak_days: number;
  longest_streak_days: number;
  recent_enrollments: SkillshareRawEnrollment[];
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://api.skillshare.com/v1';

const ENDPOINTS = {
  userEnrollments: `${API_BASE}/user/enrollments`,
  userProgress:   `${API_BASE}/user/progress`,
  courses:        `${API_BASE}/courses`,
  health:         `${API_BASE}/ping`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'skillshare';

/* ─── Category Mapping ──────────────────────────────────────────────────── */

/** Maps Skillshare rubric/category slugs to LifeOS HobbyCategory. */
function mapCategory(skillshareCategory: string, tags?: string[]): HobbyCategory {
  const lower = skillshareCategory.toLowerCase();

  if (['fine art', 'illustration', 'graphic design', 'creative writing', 'photography', 'film'].some(c => lower.includes(c)))
    return 'creative';
  if (['craft', 'diy', 'fiber art', 'jewelry', 'papercraft'].some(c => lower.includes(c)))
    return 'crafts';
  if (['technology', 'data science', 'game design', 'web development', 'mobile'].some(c => lower.includes(c)))
    return 'intellectual';
  if (['dance', 'martial arts', 'yoga', 'movement'].some(c => lower.includes(c)))
    return 'physical';
  if (['gardening', 'nature', 'outdoor', 'survival'].some(c => lower.includes(c)))
    return 'outdoor';
  if (['cooking', 'food', 'baking', 'mixology', 'culinary', 'beverage'].some(c => lower.includes(c)))
    return 'culinary';
  if (['gaming', 'tabletop', 'board game'].some(c => lower.includes(c)))
    return 'gaming';
  if (['collecting', 'antiques', 'vintage'].some(c => lower.includes(c)))
    return 'collecting';

  // Fallback: check tags
  if (tags) {
    for (const tag of tags) {
      const mapped = mapCategory(tag);
      if (mapped !== 'intellectual') return mapped; // intellectual is the default fallback, skip if that's the result
    }
  }

  return 'intellectual';
}

/* ─── Adapter ────────────────────────────────────────────────────────────── */

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
      const res = await this.request(`${ENDPOINTS.health}`);
      this.connected = res.ok;
      return this.connected;
    } catch {
      this.connected = false;
      return false;
    }
  }

  /* ── Sessions (Course Watch Sessions) ──────────────────────────────── */

  async getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]> {
    const enrollments = await this.getAllEnrollments();
    if (!enrollments.length) return [];

    const sessions: HobbySession[] = [];

    for (const enrollment of enrollments) {
      // Basic session is the entire course enrollment;
      // Skillshare doesn't expose per-lecture viewing via public API
      const enrolledDate = new Date(enrollment.enrolled_at);
      const lastWatchDate = new Date(enrollment.last_watched_at);
      const isInRange = enrolledDate.toISOString() >= from || lastWatchDate.toISOString() <= to;
      const cat = mapCategory(enrollment.course.category, enrollment.course.tags);

      if (!isInRange) continue;
      if (category && cat !== category) continue;

      sessions.push({
        id: `ss-${enrollment.course_id}`,
        provider: PROVIDER_NAME,
        hobby: enrollment.course.title,
        category: cat,
        startedAt: enrollment.enrolled_at,
        durationMinutes: enrollment.watch_minutes,
        notes: enrollment.course.project_description
          ? `Project: ${enrollment.course.project_description}`
          : undefined,
        completed: enrollment.progress_percent >= 100,
        satisfactionRating: undefined, // Skillshare API doesn't expose ratings for own enrollments
      });
    }

    return sessions;
  }

  /* ── Milestones ─────────────────────────────────────────────────────── */

  async getMilestones(from: string, to: string): Promise<HobbyMilestone[]> {
    const enrollments = await this.getAllEnrollments();
    if (!enrollments.length) return [];

    const milestones: HobbyMilestone[] = [];

    for (const enrollment of enrollments) {
      // Course completion is a milestone
      if (enrollment.completed_at && enrollment.completed_at >= from && enrollment.completed_at <= to) {
        milestones.push({
          id: `ss-complete-${enrollment.course_id}`,
          hobby: enrollment.course.title,
          title: `🎓 Completed: ${enrollment.course.title}`,
          achievedAt: enrollment.completed_at,
          description: `Finished all ${enrollment.course.total_lessons} lessons and completed ${enrollment.projects_completed} project(s).`,
        });
      }

      // 50% progress is a mini-milestone
      if (enrollment.progress_percent >= 50 && enrollment.last_watched_at >= from && enrollment.last_watched_at <= to) {
        milestones.push({
          id: `ss-halfway-${enrollment.course_id}`,
          hobby: enrollment.course.title,
          title: `🏁 Halfway through: ${enrollment.course.title}`,
          achievedAt: enrollment.last_watched_at,
          description: `Reached 50% progress on ${enrollment.course.title}.`,
        });
      }
    }

    milestones.sort((a, b) => a.achievedAt.localeCompare(b.achievedAt));
    return milestones;
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<HobbySummary> {
    const progress = await this.fetchUserProgress();
    if (!progress) {
      return {
        totalHoursThisMonth: 0,
        activeHobbies: 0,
        projectsCompleted: 0,
        milestonesReached: 0,
        topHobbyByTime: '',
        recentSessions: [],
      };
    }

    const allEnrollments = progress.recent_enrollments ?? [];
    const activeCourses = allEnrollments.filter(e => e.progress_percent < 100);
    const completedCourses = allEnrollments.filter(e => e.progress_percent >= 100);

    // Estimate monthly minutes based on total / rough enrollment period
    const totalMinutes = allEnrollments.reduce((sum, e) => sum + e.watch_minutes, 0);
    const monthlyMinutes = Math.min(totalMinutes, 30 * 60); // cap at ~30h/month for estimate

    // Recent sessions (last 10 enrollments as proxy for recent activity)
    const recentSessions: HobbySession[] = allEnrollments
      .sort((a, b) => b.last_watched_at.localeCompare(a.last_watched_at))
      .slice(0, 10)
      .map(e => ({
        id: `ss-${e.course_id}`,
        provider: PROVIDER_NAME,
        hobby: e.course.title,
        category: mapCategory(e.course.category, e.course.tags),
        startedAt: e.enrolled_at,
        durationMinutes: e.watch_minutes,
        completed: e.progress_percent >= 100,
        satisfactionRating: undefined,
      }));

    // Top hobby by time
    const topCourse = [...allEnrollments].sort((a, b) => b.watch_minutes - a.watch_minutes)[0];

    return {
      totalHoursThisMonth: Math.round(monthlyMinutes / 60 * 10) / 10,
      activeHobbies: activeCourses.length,
      projectsCompleted: completedCourses.length,
      milestonesReached: allEnrollments.filter(e => e.completed_at).length,
      topHobbyByTime: topCourse?.course.title ?? '',
      recentSessions,
    };
  }

  /* ── Metrics ────────────────────────────────────────────────────────── */

  async getMetric(metric: HobbyMetric, from: string, to: string): Promise<number[]> {
    switch (metric) {
      case 'hours_spent': {
        const sessions = await this.getSessions(from, to);
        const byMonth = aggregateSessionsByMonth(sessions);
        return byMonth;
      }

      case 'courses_enrolled': {
        const enrollments = await this.getAllEnrollments();
        const filtered = enrollments.filter(e =>
          e.enrolled_at >= from && e.enrolled_at <= to,
        );
        return [filtered.length];
      }

      case 'projects_completed': {
        const enrollments = await this.getAllEnrollments();
        const completed = enrollments.filter(e =>
          e.completed_at && e.completed_at >= from && e.completed_at <= to,
        );
        return [completed.length];
      }

      case 'skills_acquired': {
        // Skillshare doesn't have explicit "skill" tracking.
        // Each completed course counts as one skill.
        const enrollments = await this.getAllEnrollments();
        const completed = enrollments.filter(e =>
          e.completed_at && e.completed_at >= from && e.completed_at <= to,
        );
        return [completed.length];
      }

      case 'practice_sessions':
        return []; // Skillshare tracks courses, not practice sessions
      case 'milestones_reached': {
        const milestones = await this.getMilestones(from, to);
        return [milestones.length];
      }
      case 'materials_purchased':
        return []; // Not applicable for subscription-based platform
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<HobbySession, 'id'>): Promise<string> {
    // Skillshare API may not support programmatic session creation.
    // We'll log externally and return a local ID.
    const localId = `ss-ext-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // If the provider supports manual progress updates, this is where we'd POST.
    // Currently Skillshare v1 is read-only for user progress.

    console.warn(`[SkillshareAdapter] logSession not fully supported by Skillshare API. Generated local ID: ${localId}`);
    return localId;
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

  private async getAllEnrollments(): Promise<SkillshareRawEnrollment[]> {
    const progress = await this.fetchUserProgress();
    return progress?.recent_enrollments ?? [];
  }

  private async fetchUserProgress(): Promise<SkillshareRawProgress | null> {
    try {
      const res = await this.request(ENDPOINTS.userProgress);
      if (!res.ok) return null;
      return await res.json() as SkillshareRawProgress;
    } catch {
      return null;
    }
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

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Aggregates session duration values by calendar month, returning monthly totals. */
function aggregateSessionsByMonth(sessions: HobbySession[]): number[] {
  const map = new Map<string, number>();

  for (const s of sessions) {
    const month = s.startedAt.slice(0, 7); // YYYY-MM
    map.set(month, (map.get(month) ?? 0) + s.durationMinutes);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => Math.round((v / 60) * 10) / 10); // Convert min → hours
}

/* ─── Error ──────────────────────────────────────────────────────────────── */

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
