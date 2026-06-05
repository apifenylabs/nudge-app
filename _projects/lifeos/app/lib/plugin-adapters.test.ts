/**
 * LifeOS Plugin Adapter Tests
 * ============================
 * Unit tests for Headspace, Calm, Apple Health, Fitbit, and Oura adapter implementations.
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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HeadspaceAdapter, HeadspaceError } from './plugin-adapters-headspace';
import { CalmAdapter, CalmError } from './plugin-adapters-calm';
import { AppleHealthAdapter, AppleHealthError } from './plugin-adapters-apple-health';
import { FitbitAdapter, FitbitError } from './plugin-adapters-fitbit';
import { OuraAdapter, OuraError } from './plugin-adapters-oura';
import { pluginAdapterRegistry } from './plugin-adapter-registry';
import type { MindfulnessSession, MindfulnessSummary, HealthSummary, HealthRecord } from './plugin-adapters';

/* ─── Fixtures ──────────────────────────────────────────────────────────── */

const MOCK_CONFIG = { apiKey: 'test-key-123' };
const HEALTH_CONFIG = { accessToken: 'test-oauth-token', apiKey: 'test-key-123' };
const FITBIT_CONFIG = { accessToken: 'test-fitbit-token', clientId: 'test-client' };
const OURA_CONFIG = { accessToken: 'test-oura-token' };

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

/* ══════════════════════════════════════════════════════════════════════════
   Health OS — Interface Compliance
   ══════════════════════════════════════════════════════════════════════════ */

describe('Health OS — interface compliance', () => {
  it('AppleHealthAdapter implements HealthAdapter', () => {
    const adapter = new AppleHealthAdapter(HEALTH_CONFIG);
    expect(adapter.provider).toBe('apple_health');
    expect(adapter.connect).toBeInstanceOf(Function);
    expect(adapter.getRecords).toBeInstanceOf(Function);
    expect(adapter.getWorkouts).toBeInstanceOf(Function);
    expect(adapter.getSleep).toBeInstanceOf(Function);
    expect(adapter.getSummary).toBeInstanceOf(Function);
    expect(adapter.getMetric).toBeInstanceOf(Function);
    expect(adapter.logRecord).toBeInstanceOf(Function);
    expect(adapter.healthCheck).toBeInstanceOf(Function);
  });

  it('FitbitAdapter implements HealthAdapter', () => {
    const adapter = new FitbitAdapter(FITBIT_CONFIG);
    expect(adapter.provider).toBe('fitbit');
    expect(adapter.connect).toBeInstanceOf(Function);
    expect(adapter.getRecords).toBeInstanceOf(Function);
    expect(adapter.getWorkouts).toBeInstanceOf(Function);
    expect(adapter.getSleep).toBeInstanceOf(Function);
    expect(adapter.getSummary).toBeInstanceOf(Function);
    expect(adapter.getMetric).toBeInstanceOf(Function);
    expect(adapter.logRecord).toBeInstanceOf(Function);
    expect(adapter.healthCheck).toBeInstanceOf(Function);
  });

  it('OuraAdapter implements HealthAdapter', () => {
    const adapter = new OuraAdapter(OURA_CONFIG);
    expect(adapter.provider).toBe('oura');
    expect(adapter.connect).toBeInstanceOf(Function);
    expect(adapter.getRecords).toBeInstanceOf(Function);
    expect(adapter.getWorkouts).toBeInstanceOf(Function);
    expect(adapter.getSleep).toBeInstanceOf(Function);
    expect(adapter.getSummary).toBeInstanceOf(Function);
    expect(adapter.getMetric).toBeInstanceOf(Function);
    expect(adapter.logRecord).toBeInstanceOf(Function);
    expect(adapter.healthCheck).toBeInstanceOf(Function);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   AppleHealthAdapter — Connect & Auth
   ══════════════════════════════════════════════════════════════════════════ */

describe('AppleHealthAdapter — connect', () => {
  it('connects with accessToken', async () => {
    const adapter = new AppleHealthAdapter({ accessToken: 'valid-token' });
    const result = await adapter.connect();
    expect(result).toBe(true);
  });

  it('connects with apiKey fallback', async () => {
    const adapter = new AppleHealthAdapter({ apiKey: 'valid-key' });
    const result = await adapter.connect();
    expect(result).toBe(true);
  });

  it('fails with no credentials', async () => {
    const adapter = new AppleHealthAdapter({});
    const result = await adapter.connect();
    expect(result).toBe(false);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   AppleHealthAdapter — Summary fallback
   ══════════════════════════════════════════════════════════════════════════ */

describe('AppleHealthAdapter — getSummary fallback', () => {
  it('returns sample data when API unavailable', async () => {
    fetchSpy.mockRejectedValue(new Error('Network error'));
    const adapter = new AppleHealthAdapter({ accessToken: 'token' });
    const summary = await adapter.getSummary();
    expect(summary.totalStepsToday).toBeGreaterThan(0);
    expect(summary.lastNightSleep).not.toBeNull();
    expect(summary.stepTrend7Day).toHaveLength(7);
    expect(summary.sleepTrend7Day).toHaveLength(7);
    expect(summary.recentHeartRate).toBeDefined();
    expect(summary.recentHRV).toBeDefined();
  });

  it('getMetric falls back to sample for steps/sleep', async () => {
    const adapter = new AppleHealthAdapter({ accessToken: 'token' });
    const steps = await adapter.getMetric('steps', 7);
    expect(steps).toHaveLength(7);

    const sleep = await adapter.getMetric('sleep_hours', 7);
    expect(sleep).toHaveLength(7);

    const unknown = await adapter.getMetric('heart_rate', 3);
    expect(unknown).toEqual([]);
  });
});

describe('AppleHealthAdapter — healthCheck', () => {
  it('returns ok when ping succeeds', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const adapter = new AppleHealthAdapter({ accessToken: 'token' });
    const health = await adapter.healthCheck();
    expect(health.ok).toBe(true);
  });

  it('returns not ok on failure', async () => {
    fetchSpy.mockRejectedValue(new Error('Timeout'));
    const adapter = new AppleHealthAdapter({ accessToken: 'token' });
    const health = await adapter.healthCheck();
    expect(health.ok).toBe(false);
    expect(health.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

describe('AppleHealthAdapter — error class', () => {
  it('creates AppleHealthError with code and status', () => {
    const err = new AppleHealthError('Unauthorized', 'AUTH_ERROR', 401);
    expect(err.name).toBe('AppleHealthError');
    expect(err.code).toBe('AUTH_ERROR');
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe('Unauthorized');
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   FitbitAdapter — Connect & Error Handling
   ══════════════════════════════════════════════════════════════════════════ */

describe('FitbitAdapter — connect', () => {
  it('connects with valid accessToken', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const adapter = new FitbitAdapter({ accessToken: 'valid-token' });
    const result = await adapter.connect();
    expect(result).toBe(true);
  });

  it('fails without accessToken', async () => {
    const adapter = new FitbitAdapter({});
    const result = await adapter.connect();
    expect(result).toBe(false);
  });

  it('fails on API rejection', async () => {
    fetchSpy.mockResolvedValue({ ok: false, status: 401 });
    const adapter = new FitbitAdapter({ accessToken: 'bad-token' });
    const result = await adapter.connect();
    expect(result).toBe(false);
  });
});

describe('FitbitAdapter — getSleep', () => {
  it('returns null when no sleep data', async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sleep: [] }),
    });
    const adapter = new FitbitAdapter({ accessToken: 'token' });
    const sleep = await adapter.getSleep('2026-06-04');
    expect(sleep).toBeNull();
  });
});

describe('FitbitAdapter — error class', () => {
  it('creates FitbitError with rate limited code', () => {
    const err = new FitbitError('Too many requests', 'RATE_LIMITED', 429);
    expect(err.name).toBe('FitbitError');
    expect(err.code).toBe('RATE_LIMITED');
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   OuraAdapter — Connection & Core Methods
   ══════════════════════════════════════════════════════════════════════════ */

describe('OuraAdapter — connect', () => {
  it('connects with valid token', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const adapter = new OuraAdapter({ accessToken: 'valid-token' });
    const result = await adapter.connect();
    expect(result).toBe(true);
  });

  it('fails without token', async () => {
    const adapter = new OuraAdapter({});
    const result = await adapter.connect();
    expect(result).toBe(false);
  });
});

describe('OuraAdapter — getSummary fallback', () => {
  it('returns sample data when API unavailable', async () => {
    fetchSpy.mockRejectedValue(new Error('Network error'));
    const adapter = new OuraAdapter({ accessToken: 'token' });
    const summary = await adapter.getSummary();
    expect(summary.totalStepsToday).toBeGreaterThan(0);
    expect(summary.lastNightSleep).not.toBeNull();
    expect(summary.recentRecoveryScore).toBeDefined();
    expect(summary.recentHRV).toBeDefined();
  });
});

describe('OuraAdapter — logRecord', () => {
  it('throws OuraError with NOT_SUPPORTED code', async () => {
    const adapter = new OuraAdapter({ accessToken: 'token' });
    const record: Omit<HealthRecord, 'id' | 'createdAt'> = {
      provider: 'oura',
      metric: 'steps',
      value: 1000,
      unit: 'count',
      source: 'manual_entry',
      recordedAt: new Date().toISOString(),
    };
    await expect(adapter.logRecord(record)).rejects.toThrow(OuraError);
    await expect(adapter.logRecord(record)).rejects.toThrow(OuraError);
    await expect(adapter.logRecord(record)).rejects.toThrow(/does not support writing/i);
  });
});

describe('OuraAdapter — error class', () => {
  it('creates OuraError', () => {
    const err = new OuraError('API failure', 'API_ERROR', 500);
    expect(err.name).toBe('OuraError');
    expect(err.code).toBe('API_ERROR');
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   Registry — Health OS Integration
   ══════════════════════════════════════════════════════════════════════════ */

describe('Adapter Registry — Health OS', () => {
  beforeEach(() => {
    pluginAdapterRegistry.reset();
    pluginAdapterRegistry.register(
      {
        plugin: 'health-os',
        provider: 'apple_health',
        factory: (config) => new AppleHealthAdapter(config as any),
        configSchema: {},
        isEnabled: true,
      },
      {
        plugin: 'health-os',
        provider: 'fitbit',
        factory: (config) => new FitbitAdapter(config as any),
        configSchema: {},
        isEnabled: true,
      },
      {
        plugin: 'health-os',
        provider: 'oura',
        factory: (config) => new OuraAdapter(config as any),
        configSchema: {},
        isEnabled: true,
      },
    );
  });

  it('lists health providers', () => {
    const available = pluginAdapterRegistry.listAvailable();
    const healthEntry = available.find(a => a.plugin === 'health-os');
    expect(healthEntry).toBeDefined();
    expect(healthEntry!.providers).toContain('apple_health');
    expect(healthEntry!.providers).toContain('fitbit');
    expect(healthEntry!.providers).toContain('oura');
  });

  it('creates health adapters via factory', () => {
    const ah = pluginAdapterRegistry.createAdapter('health-os', 'apple_health', HEALTH_CONFIG);
    expect(ah).toBeInstanceOf(AppleHealthAdapter);

    const fb = pluginAdapterRegistry.createAdapter('health-os', 'fitbit', FITBIT_CONFIG);
    expect(fb).toBeInstanceOf(FitbitAdapter);

    const oa = pluginAdapterRegistry.createAdapter('health-os', 'oura', OURA_CONFIG);
    expect(oa).toBeInstanceOf(OuraAdapter);
  });

  it('caches and returns same instance', () => {
    const a1 = pluginAdapterRegistry.createAdapter('health-os', 'apple_health', HEALTH_CONFIG);
    const a2 = pluginAdapterRegistry.getAdapter('health-os', 'apple_health');
    expect(a1).toBe(a2);
  });

  it('runs health checks on health adapters', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    pluginAdapterRegistry.createAdapter('health-os', 'oura', OURA_CONFIG);
    const results = await pluginAdapterRegistry.healthCheckAll();
    expect(results).toHaveProperty('oura');
    expect(results.oura.ok).toBe(true);
  });
});
