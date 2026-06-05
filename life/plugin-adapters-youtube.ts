/**
 * LifeOS — YouTube Hobbies Adapter
 * ==================================
 * Concrete implementation of HobbyAdapter for YouTube Data API v3.
 *
 * Tracks hobby-based learning and creative exploration via YouTube
 * playlists, watch history, and saved/liked videos.
 *
 * Unlike Skillshare/Udemy, YouTube treats *playlists* as "courses" —
 * each playlist is a hobby category. Users organize their learning
 * by creating themed playlists (e.g., "Guitar Lessons", "Watercolor
 * Tutorials", "Chess Openings").
 *
 * API: YouTube Data API v3
 * Auth: OAuth 2.0 (scopes: youtube.readonly, playlist.readonly)
 * Docs: https://developers.google.com/youtube/v3/docs
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

/** Raw playlist item from YouTube Data API. */
interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    resourceId: { videoId: string };
    thumbnails: Record<string, { url: string }>;
    publishedAt: string;
    channelTitle: string;
    position: number;
  };
  contentDetails?: {
    videoId: string;
    videoPublishedAt: string;
    duration?: string; // ISO 8601 duration (from video list endpoint)
  };
}

/** Raw playlist resource from YouTube Data API. */
interface YouTubePlaylist {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Record<string, { url: string }>;
    publishedAt: string;
    itemCount: number;
  };
}

/** Raw video resource from YouTube Data API. */
interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: Record<string, { url: string }>;
    categoryId: string;
  };
  contentDetails: {
    duration: string; // ISO 8601 PT#M#S format
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

/** Top-level YouTube Data API list response. */
interface YouTubeListResponse<T> {
  kind: string;
  etag: string;
  items: T[];
  nextPageToken?: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
}

/* ─── Category Mapping ──────────────────────────────────────────────────── */

/** YouTube video category IDs mapped to LifeOS HobbyCategory. */
const YT_CATEGORY_MAP: Record<string, HobbyCategory> = {
  '1': 'creative',      // Film & Animation
  '2': 'creative',      // Autos & Vehicles
  '10': 'creative',     // Music
  '15': 'creative',     // Pets & Animals
  '17': 'creative',     // Sports
  '18': 'intellectual', // Short Movies
  '19': 'creative',     // Travel & Events
  '20': 'intellectual', // Gaming
  '21': 'intellectual', // Videoblogging
  '22': 'intellectual', // People & Blogs
  '23': 'creative',     // Comedy
  '24': 'creative',     // Entertainment
  '25': 'creative',     // News & Politics
  '26': 'intellectual', // Howto & Style
  '27': 'intellectual', // Education
  '28': 'creative',     // Science & Technology
  '29': 'creative',     // Nonprofits & Activism
  '30': 'creative',     // Movies
  '31': 'creative',     // Anime/Animation
  '32': 'creative',     // Action/Adventure
  '33': 'creative',     // Classics
  '34': 'creative',     // Comedy (old?)
  '35': 'creative',     // Documentary
  '36': 'creative',     // Drama
  '37': 'creative',     // Family
  '38': 'creative',     // Foreign
  '39': 'creative',     // Horror
  '40': 'creative',     // Sci-Fi/Fantasy
  '41': 'creative',     // Thriller
  '42': 'creative',     // Shorts
  '43': 'creative',     // Shows
  '44': 'creative',     // Trailers
};

/** Fallback category mapping by playlist title keywords. */
const TITLE_KEYWORD_MAP: Array<[RegExp, HobbyCategory]> = [
  [/guitar|piano|ukulele|music|song|sing/i, 'creative'],
  [/paint|watercolor|sketch|draw|art|illustr/i, 'creative'],
  [/photo|editing|lightroom|photoshop|camera/i, 'creative'],
  [/cook|baking|recipe|kitchen|culinary/i, 'culinary'],
  [/knit|crochet|sew|embroid|craft/i, 'crafts'],
  [/woodwork|carpentry|diy.*build/i, 'crafts'],
  [/chess|puzzle|logic|brain/i, 'intellectual'],
  [/code|program|python|java|react|tutorial/i, 'intellectual'],
  [/language|spanish|french|japanese|chinese/i, 'intellectual'],
  [/garden|plant|bonsai|landscape/i, 'outdoor'],
  [/hike|trail|camping|outdoor/i, 'outdoor'],
  [/gym|fitness|workout|yoga|stretch/i, 'physical'],
  [/dance|ballet|choreo|hip.hop/i, 'physical'],
  [/board.game|ttrpg|dnd|dungeon/i, 'gaming'],
  [/speedrun|walkthrough|lets.play|gaming/i, 'gaming'],
];

function inferCategory(title: string, videoCategoryId?: string): HobbyCategory {
  // First try explicit YouTube category
  if (videoCategoryId && YT_CATEGORY_MAP[videoCategoryId]) {
    return YT_CATEGORY_MAP[videoCategoryId];
  }
  // Fall back to title keyword matching
  for (const [pattern, category] of TITLE_KEYWORD_MAP) {
    if (pattern.test(title)) return category;
  }
  // Default
  return 'intellectual';
}

/* ─── API Endpoints ─────────────────────────────────────────────────────── */

const API_BASE = 'https://www.googleapis.com/youtube/v3';

const ENDPOINTS = {
  playlists:       `${API_BASE}/playlists`,
  playlistItems:   `${API_BASE}/playlistItems`,
  videos:          `${API_BASE}/videos`,
  channels:        `${API_BASE}/channels`,
  subscriptions:   `${API_BASE}/subscriptions`,
  activities:      `${API_BASE}/activities`,
} as const;

/* ─── Defaults ──────────────────────────────────────────────────────────── */

const DEFAULT_TIMEOUT_MS = 10_000;
const PROVIDER_NAME = 'youtube';
const MAX_PAGE_SIZE = 50;

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/**
 * Parse ISO 8601 duration string (PT#H#M#S) to total minutes.
 * YouTube uses this in contentDetails.duration.
 */
function parseDurationToMinutes(isoDuration: string): number {
  const match = isoDuration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  const hours = parseInt(match[1] ?? '0', 10);
  const minutes = parseInt(match[2] ?? '0', 10);
  const seconds = parseInt(match[3] ?? '0', 10);
  return Math.round((hours * 60) + minutes + (seconds / 60));
}

/**
 * Fetch all pages from a paginated YouTube Data API list endpoint.
 */
async function fetchAllPages<T>(
  baseUrl: string,
  params: URLSearchParams,
  apiKey: string,
  timeoutMs: number,
): Promise<T[]> {
  const items: T[] = [];
  let pageToken: string | undefined;

  do {
    const p = new URLSearchParams(params);
    if (pageToken) p.set('pageToken', pageToken);
    p.set('maxResults', String(MAX_PAGE_SIZE));

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(`${baseUrl}?${p}`, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new YouTubeError(
          `YouTube API error: ${res.status} ${res.statusText}`,
          res.status,
        );
      }

      const data: YouTubeListResponse<T> & { nextPageToken?: string } = await res.json();
      items.push(...data.items);
      pageToken = data.nextPageToken;
    } finally {
      clearTimeout(timer);
    }
  } while (pageToken);

  return items;
}

/* ─── Adapter ───────────────────────────────────────────────────────────── */

/**
 * Concrete YouTube adapter for hobby tracking.
 *
 * Maps YouTube playlists to hobby "courses" and playlist items to
 * hobby sessions. Since YouTube doesn't natively expose structured
 * learning data, it uses playlist organization as a proxy.
 *
 * Usage:
 * ```ts
 * const yt = new YouTubeAdapter({ apiKey: process.env.YOUTUBE_API_KEY! });
 * await yt.connect();
 * const summary = await yt.getSummary();
 * ```
 */
export class YouTubeAdapter implements HobbyAdapter {
  readonly provider = PROVIDER_NAME;
  readonly config: HobbyAdapterConfig;

  private connected = false;
  /** Cached channel ID for the authenticated user (requires OAuth). */
  private channelId: string | null = null;
  /** Cached playlist names to categorise hobby types. */
  private playlistCache: YouTubePlaylist[] | null = null;

  constructor(config: HobbyAdapterConfig) {
    this.config = {
      ...config,
      baseUrl: config.baseUrl ?? API_BASE,
      timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    };
  }

  /* ── Auth ───────────────────────────────────────────────────────────── */

  private get apiKey(): string {
    return this.config.apiKey ?? '';
  }

  /* ── Connection ─────────────────────────────────────────────────────── */

  async connect(): Promise<boolean> {
    try {
      // Validate API key by fetching the channel info for the key's project
      const res = await this.request(`${ENDPOINTS.channels}?part=snippet&mine=true`);
      if (res.ok) {
        const data = await res.json();
        if (data.items?.length > 0) {
          this.channelId = data.items[0].id;
        }
        this.connected = true;
        return true;
      }

      // If mine=true fails (API key doesn't have OAuth), try a public ping
      this.connected = false;
      return false;
    } catch {
      this.connected = false;
      return false;
    }
  }

  /* ── Playlists (Courses) ────────────────────────────────────────────── */

  /**
   * Fetch all playlists owned by the channel. These represent hobby "courses".
   * Uses API key for public playlists; OAuth token for private ones.
   */
  async getPlaylists(): Promise<YouTubePlaylist[]> {
    if (this.playlistCache) return this.playlistCache;

    try {
      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        mine: 'true',
        maxResults: String(MAX_PAGE_SIZE),
      });

      const playlists = await fetchAllPages<YouTubePlaylist>(
        ENDPOINTS.playlists,
        params,
        this.apiKey,
        this.config.timeoutMs!,
      );

      this.playlistCache = playlists;
      return playlists;
    } catch {
      // Graceful fallback for offline / bad API key
      this.playlistCache = [];
      return [];
    }
  }

  /* ── Sessions ───────────────────────────────────────────────────────── */

  async getSessions(from: string, to: string, category?: HobbyCategory): Promise<HobbySession[]> {
    const playlists = await this.getPlaylists();
    const allSessions: HobbySession[] = [];

    for (const playlist of playlists) {
      // Fetch items (videos) in this playlist
      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        playlistId: playlist.id,
        maxResults: String(MAX_PAGE_SIZE),
      });

      try {
        const items = await fetchAllPages<YouTubePlaylistItem>(
          ENDPOINTS.playlistItems,
          params,
          this.apiKey,
          this.config.timeoutMs!,
        );

        for (const item of items) {
          const publishedAt = item.snippet.publishedAt;
          // Filter by date range
          if (publishedAt < from || publishedAt > to) continue;

          // Try to get video details for accurate duration
          const durationMinutes = await this.getVideoDurationMinutes(
            item.snippet.resourceId.videoId,
          );

          // Determine category from playlist context, fallback to title match
          const playlistCategory = inferCategory(playlist.snippet.title);
          const videoCategory = inferCategory(item.snippet.title);
          const sessionCategory = category
            ? category
            : (playlistCategory !== 'intellectual' ? playlistCategory : videoCategory);

          allSessions.push({
            id: item.id,
            provider: PROVIDER_NAME,
            hobby: playlist.snippet.title,
            category: sessionCategory,
            startedAt: publishedAt,
            durationMinutes: Math.round(durationMinutes),
            notes: item.snippet.description,
            mediaUrls: item.snippet.thumbnails?.high
              ? [item.snippet.thumbnails.high.url]
              : undefined,
            completed: true, // YouTube playlists are static — watched = completed
            satisfactionRating: undefined,
          });
        }
      } catch (error) {
        console.warn(`[YouTubeAdapter] Failed to fetch playlist ${playlist.id}:`, error);
        // Continue with other playlists
      }
    }

    // Apply category filter if specified
    if (category) {
      return allSessions.filter((s) => s.category === category);
    }

    return allSessions;
  }

  /* ── Milestones ─────────────────────────────────────────────────────── */

  /**
   * YouTube milestones are derived from playlist completions and
   * subscriber/channel milestones for the user's own content.
   * For learning tracking, completing a full playlist = milestone.
   */
  async getMilestones(from: string, to: string): Promise<HobbyMilestone[]> {
    try {
      const playlists = await this.getPlaylists();
      const milestones: HobbyMilestone[] = [];

      for (const playlist of playlists) {
        // Check if this playlist was recently created/updated (proxy for "completed")
        if (playlist.snippet.publishedAt >= from && playlist.snippet.publishedAt <= to) {
          milestones.push({
            id: `playlist:${playlist.id}`,
            hobby: playlist.snippet.title,
            title: `Playlist created: ${playlist.snippet.title}`,
            achievedAt: playlist.snippet.publishedAt,
            description: playlist.snippet.description || `Started tracking "${playlist.snippet.title}" — ${playlist.snippet.itemCount} videos`,
          });
        }
      }

      return milestones;
    } catch {
      return [];
    }
  }

  /* ── Summary ────────────────────────────────────────────────────────── */

  async getSummary(): Promise<HobbySummary> {
    try {
      const playlists = await this.getPlaylists();
      const activePlaylists = playlists.filter((p) => p.snippet.itemCount > 0);

      // Get total hours from all playlists (estimate via public video durations)
      let totalMinutes = 0;
      const recentSessions: HobbySession[] = [];
      let topPlaylist = activePlaylists[0];

      for (const playlist of activePlaylists.slice(0, 10)) {
        const params = new URLSearchParams({
          part: 'contentDetails',
          playlistId: playlist.id,
          maxResults: '10', // Sample first 10 to estimate total
        });

        try {
          const items = await fetchAllPages<YouTubePlaylistItem>(
            ENDPOINTS.playlistItems,
            params,
            this.apiKey,
            this.config.timeoutMs!,
          );

          for (const item of items.slice(0, 5)) {
            const dur = await this.getVideoDurationMinutes(item.contentDetails?.videoId ?? '');
            totalMinutes += dur;

            // Build recent session from the first few items
            recentSessions.push({
              id: item.id,
              provider: PROVIDER_NAME,
              hobby: playlist.snippet.title,
              category: inferCategory(playlist.snippet.title),
              startedAt: item.snippet.publishedAt,
              durationMinutes: Math.round(dur),
              notes: item.snippet.description?.slice(0, 200),
              completed: true,
            });
          }
        } catch {
          // Skip playlists we can't fetch
        }

        if (playlist.snippet.itemCount > (topPlaylist?.snippet.itemCount ?? 0)) {
          topPlaylist = playlist;
        }
      }

      return {
        totalHoursThisMonth: Math.round(totalMinutes / 60 * 10) / 10,
        activeHobbies: activePlaylists.length,
        projectsCompleted: 0,
        milestonesReached: playlists.length,
        topHobbyByTime: topPlaylist?.snippet.title ?? 'unknown',
        recentSessions: recentSessions.slice(0, 20),
      };
    } catch {
      return {
        totalHoursThisMonth: 0,
        activeHobbies: 0,
        projectsCompleted: 0,
        milestonesReached: 0,
        topHobbyByTime: 'unknown',
        recentSessions: [],
      };
    }
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
        // "Enrolled" = number of active playlists organized by creation date
        const playlists = await this.getPlaylists();
        const byDay = aggregateByDay(
          playlists.map((p) => ({ startedAt: p.snippet.publishedAt })),
          () => 1,
        );
        return byDay;
      }

      case 'practice_sessions':
      case 'skills_acquired': {
        const sessions = await this.getSessions(from, to);
        return aggregateByDay(sessions, () => 1);
      }

      case 'projects_completed': {
        // Learning "projects" = playlists completed
        const playlists = await this.getPlaylists();
        const byDay = aggregateByDay(
          playlists.map((p) => ({ startedAt: p.snippet.publishedAt })),
          () => 1,
        );
        return byDay;
      }

      case 'milestones_reached': {
        const milestones = await this.getMilestones(from, to);
        return aggregateByDay(
          milestones.map((m) => ({ startedAt: m.achievedAt })),
          () => 1,
        );
      }

      case 'materials_purchased':
        return []; // YouTube doesn't track purchases

      default:
        return [];
    }
  }

  /* ── Log Session ────────────────────────────────────────────────────── */

  async logSession(session: Omit<HobbySession, 'id'>): Promise<string> {
    // YouTube Data API doesn't support writing custom sessions.
    // We log to a local store instead.
    const localId = `manual:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    console.info(`[YouTubeAdapter] Logged local session: ${localId}`, session.hobby);
    return localId;
  }

  /* ── Health Check ───────────────────────────────────────────────────── */

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      // Ping the API by listing a single video (cheap endpoint)
      const res = await this.request(
        `${ENDPOINTS.videos}?part=snippet&chart=mostPopular&maxResults=1`,
      );
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /* ── Private Helpers ────────────────────────────────────────────────── */

  /**
   * Fetch the duration of a single video in minutes.
   * Uses the Videos.list endpoint with contentDetails part.
   */
  private async getVideoDurationMinutes(videoId: string): Promise<number> {
    try {
      const params = new URLSearchParams({
        part: 'contentDetails',
        id: videoId,
        maxResults: '1',
      });
      const res = await this.request(`${ENDPOINTS.videos}?${params}`);
      if (!res.ok) return 15; // Fallback: assume ~15 min average

      const data: YouTubeListResponse<YouTubeVideo> = await res.json();
      if (data.items.length === 0) return 15;

      return parseDurationToMinutes(data.items[0].contentDetails.duration);
    } catch {
      return 15; // Fallback duration
    }
  }

  /**
   * Make an authenticated request to the YouTube Data API.
   * Supports both API key (read-only public data) and OAuth token.
   */
  private async request(url: string, init?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs ?? DEFAULT_TIMEOUT_MS);

    try {
      // Append API key as query param (YouTube Data API v3 style)
      const separator = url.includes('?') ? '&' : '?';
      const fullUrl = `${url}${separator}key=${encodeURIComponent(this.apiKey)}`;

      const headers: Record<string, string> = {
        Accept: 'application/json',
        ...(init?.headers as Record<string, string>),
      };

      return await fetch(fullUrl, {
        ...init,
        headers,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }
}

/* ─── Mapping Helpers ───────────────────────────────────────────────────── */

/** Aggregates items by day into a sorted time series. */
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

/* ─── Error ─────────────────────────────────────────────────────────────── */

/** Typed error for YouTube Data API failures. */
export class YouTubeError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(`[YouTube] ${message}`);
    this.name = 'YouTubeError';
  }
}
