/**
 * LifeOS Plugin Adapter Tests
 * ============================
 * Unit tests for Headspace and Calm adapter implementations.
 *
 * These tests validate:
 * - Interface compliance (all methods exist with correct signatures)
 * - API request formation (URLs, headers, auth)
 * - Response mapping (raw → canonical type transformations)
 * - Error handling (timeouts, auth failures, malformed responses)
 * - Registry integration (registration, creation, health checks)
 *
 * Run: npx vitest run plugin-adapters.test.ts
 * (or from _projects/lifeos root: npx vitest run)
 *
 * @packageDocumentation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeadspaceAdapter, HeadspaceError } from './plugin-adapters-headspace';
import { CalmAdapter, CalmError } from './plugin-adapters-calm';
import { pluginAdapterRegistry } from './plugin-adapter-registry';
import type { MindfulnessSession, MindfulnessSummary } from './plugin-adapters';

/* ─── Fixtures ──────────────────────────────────────────────────────────── */

const MOCK_CONFIG = { apiKey: 'test-key-123' };

const MOCK_RAW_SESSION = {
  id: 'sess-001',
  type: 'meditation',
  started_at: '2026-06-04T10:00:00Z',
  duration_seconds: 1200,
  completed: true,
  mood_before: 5,
  mood_after: 8,
  pack_title: 'Basics Pack',
  notes: 'Felt good',
};

const MOCK_RAW_STATS = {
  total_minutes_this_week: 180,
  total_sessions_this_week: 12,
  current_streak_days: 7,
  longest_streak_days: 30,
  total_sessions_all_time: 450,
  last_session: MOCK_RAW_SESSION,
};

/* ─── Globals ───────────────────────────────────────────────────────────── */

let fetchSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  // Reset registry for clean test state
  pluginAdapterRegistry.reset();
  // Register adapters (same as prod startup)
  pluginAdapterRegistry.register(
    {
      plugin: 'mindfulness-os',
      provider: 'headspace',
      factory: (config) => new HeadspaceAdapter(config as any),
      configSchema: {},
      isEnabled: true,
    },
    {
      plugin: 'mindfulness-os',
      provider: 'calm',
      factory: (config) => new CalmAdapter(config as any),
      configSchema: {},
      isEnabled: true,
    },
  );
  // Mock fetch
  fetchSpy = vi.fn();
  vi.stubGlobal('fetch', fetchSpy);
});

/* ══════════════════════════════════════════════════════════════════════════
   Interface Compliance
   ══════════════════════════════════════════════════════════════════════════ */

describe('HeadspaceAdapter — interface compliance', () => {
  it('implements MindfulnessAdapter', () => {
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    expect(adapter.provider).toBe('headspace');
    expect(adapter.config.apiKey).toBe('test-key-123');
    // All required methods exist
    expect(adapter.connect).toBeInstanceOf(Function);
    expect(adapter.getSessions).toBeInstanceOf(Function);
    expect(adapter.getSummary).toBeInstanceOf(Function);
    expect(adapter.getMetric).toBeInstanceOf(Function);
    expect(adapter.logSession).toBeInstanceOf(Function);
    expect(adapter.healthCheck).toBeInstanceOf(Function);
  });
});

describe('CalmAdapter — interface compliance', () => {
  it('implements MindfulnessAdapter', () => {
    const adapter = new CalmAdapter(MOCK_CONFIG);
    expect(adapter.provider).toBe('calm');
    expect(adapter.config.apiKey).toBe('test-key-123');
    expect(adapter.connect).toBeInstanceOf(Function);
    expect(adapter.getSessions).toBeInstanceOf(Function);
    expect(adapter.getSummary).toBeInstanceOf(Function);
    expect(adapter.getMetric).toBeInstanceOf(Function);
    expect(adapter.logSession).toBeInstanceOf(Function);
    expect(adapter.healthCheck).toBeInstanceOf(Function);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   HeadspaceAdapter — API Integration
   ══════════════════════════════════════════════════════════════════════════ */

describe('HeadspaceAdapter — connect', () => {
  it('returns true on successful auth', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: true });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const result = await adapter.connect();
    expect(result).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.headspace.com/v2/user/me',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-key-123',
        }),
      }),
    );
  });

  it('returns false on auth failure', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const result = await adapter.connect();
    expect(result).toBe(false);
  });

  it('returns false on network error', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network failure'));
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const result = await adapter.connect();
    expect(result).toBe(false);
  });
});

describe('HeadspaceAdapter — getSessions', () => {
  it('returns mapped sessions', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([MOCK_RAW_SESSION]),
    });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const sessions = await adapter.getSessions('2026-01-01', '2026-06-04');
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toMatchObject({
      id: 'sess-001',
      provider: 'headspace',
      type: 'meditation',
      durationSeconds: 1200,
      completed: true,
      moodBefore: 5,
      moodAfter: 8,
      tags: ['Basics Pack'],
    });
  });

  it('throws HeadspaceError on API failure', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false, status: 401 });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    await expect(adapter.getSessions('a', 'b')).rejects.toThrow(HeadspaceError);
  });
});

describe('HeadspaceAdapter — getSummary', () => {
  it('aggregates summary from API stats', async () => {
    fetchSpy
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(MOCK_RAW_STATS) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) }); // empty mood deltas
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const summary = await adapter.getSummary();
    expect(summary.totalMinutesThisWeek).toBe(180);
    expect(summary.totalSessionsThisWeek).toBe(12);
    expect(summary.currentStreakDays).toBe(7);
    expect(summary.longestStreakDays).toBe(30);
  });
});

describe('HeadspaceAdapter — getMetric', () => {
  it('returns streak data as 2-element array', async () => {
    fetchSpy
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(MOCK_RAW_STATS) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const result = await adapter.getMetric('streak_days', 'a', 'b');
    expect(result).toEqual([7, 30]);
  });
});

describe('HeadspaceAdapter — logSession', () => {
  it('returns created session id', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'sess-created-001' }),
    });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const id = await adapter.logSession({
      provider: 'headspace',
      type: 'meditation',
      startedAt: '2026-06-04T12:00:00Z',
      durationSeconds: 900,
      completed: true,
    });
    expect(id).toBe('sess-created-001');
  });
});

describe('HeadspaceAdapter — healthCheck', () => {
  it('returns ok + latency', async () => {
    fetchSpy.mockResolvedValueOnce({ ok: true });
    const adapter = new HeadspaceAdapter(MOCK_CONFIG);
    const health = await adapter.healthCheck();
    expect(health.ok).toBe(true);
    expect(health.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   CalmAdapter — API Integration
   ══════════════════════════════════════════════════════════════════════════ */

describe('CalmAdapter — session type mapping', () => {
  it('maps sleep_story to meditation type', async () => {
    const calmSession = {
      ...MOCK_RAW_SESSION,
      content_type: 'sleep_story',
      id: 'calm-sleep-1',
      title: 'Sleep Story: The Moonlit Garden',
      teacher_name: 'John Doe',
    };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [calmSession] }),
    });
    const adapter = new CalmAdapter(MOCK_CONFIG);
    const sessions = await adapter.getSessions('2026-01-01', '2026-06-04');
    expect(sessions[0].type).toBe('meditation');
    expect(sessions[0].tags).toContain('teacher:John Doe');
  });

  it('maps calming music to body_scan type', async () => {
    const calmSession = {
      ...MOCK_RAW_SESSION,
      content_type: 'music',
      id: 'calm-music-1',
      title: 'Rain Sounds',
    };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [calmSession] }),
    });
    const adapter = new CalmAdapter(MOCK_CONFIG);
    const sessions = await adapter.getSessions('2026-01-01', '2026-06-04');
    expect(sessions[0].type).toBe('body_scan');
  });
});

describe('CalmAdapter — getMetric', () => {
  it('returns mood scores from mood log endpoint', async () => {
    const mockMoodData = {
      data: [
        { date: '2026-06-01', score: 7 },
        { date: '2026-06-02', score: 6 },
        { date: '2026-06-03', score: 8 },
      ],
    };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMoodData),
    });
    const adapter = new CalmAdapter(MOCK_CONFIG);
    const scores = await adapter.getMetric('mood_score', '2026-06-01', '2026-06-04');
    expect(scores).toEqual([7, 6, 8]);
  });
});

describe('CalmAdapter — healthCheck', () => {
  it('returns failure status on network error', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Timeout'));
    const adapter = new CalmAdapter(MOCK_CONFIG);
    const health = await adapter.healthCheck();
    expect(health.ok).toBe(false);
    expect(health.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   Registry Integration
   ══════════════════════════════════════════════════════════════════════════ */

describe('Adapter Registry', () => {
  beforeEach(() => {
    pluginAdapterRegistry.reset();
    pluginAdapterRegistry.register(
      {
        plugin: 'mindfulness-os',
        provider: 'headspace',
        factory: (config) => new HeadspaceAdapter(config as any),
        configSchema: {},
        isEnabled: true,
      },
      {
        plugin: 'mindfulness-os',
        provider: 'calm',
        factory: (config) => new CalmAdapter(config as any),
        configSchema: {},
        isEnabled: true,
      },
    );
  });

  it('lists available providers', () => {
    const available = pluginAdapterRegistry.listAvailable();
    expect(available).toHaveLength(1);
    expect(available[0].providers).toContain('headspace');
    expect(available[0].providers).toContain('calm');
  });

  it('creates a Headspace adapter via factory', () => {
    const adapter = pluginAdapterRegistry.createAdapter('mindfulness-os', 'headspace', MOCK_CONFIG);
    expect(adapter).toBeInstanceOf(HeadspaceAdapter);
  });

  it('returns cached instance on second call', () => {
    const a1 = pluginAdapterRegistry.createAdapter('mindfulness-os', 'headspace', MOCK_CONFIG);
    const a2 = pluginAdapterRegistry.getAdapter('mindfulness-os', 'headspace');
    expect(a1).toBe(a2);
  });

  it('returns null for unknown provider', () => {
    const adapter = pluginAdapterRegistry.createAdapter('mindfulness-os', 'unknown', MOCK_CONFIG);
    expect(adapter).toBeNull();
  });

  it('runs health checks on all active adapters', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    pluginAdapterRegistry.createAdapter('mindfulness-os', 'headspace', MOCK_CONFIG);
    pluginAdapterRegistry.createAdapter('mindfulness-os', 'calm', MOCK_CONFIG);
    const results = await pluginAdapterRegistry.healthCheckAll();
    expect(results).toHaveProperty('headspace');
    expect(results).toHaveProperty('calm');
    expect(results.headspace.ok).toBe(true);
    expect(results.calm.ok).toBe(true);
  });
});
