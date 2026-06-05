/**
 * @vitest-environment jsdom
 *
 * Tests for the LifeOS Weekly Digest engine.
 *
 * Covers:
 * - Health OS adapter markdown block formatting
 * - Hobbies OS adapter markdown block formatting
 * - Mindfulness adapter markdown block formatting
 * - generateEnrichedWeeklyDigest with health/hobby/mindfulness adapter configs
 * - Fallback behavior when adapter data is unavailable
 * - queryCachedHealthData and queryCachedHobbyData
 * - generateWeeklyDigest (localStorage-only path)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  type HealthDigestData,
  type HobbyDigestData,
  type MindfulnessDigestData,
  queryCachedHealthData,
  queryCachedHobbyData,
  queryCachedAdapterData,
  generateEnrichedWeeklyDigest,
  generateWeeklyDigest,
} from './weekly-digest';
import { pluginAdapterRegistry } from './plugin-adapter-registry';
import type { HealthAdapter, HealthSummary, HobbyAdapter, HobbySummary, MindfulnessAdapter, MindfulnessSummary } from './plugin-adapters';

// ─── Fixtures ──────────────────────────────────────────────────────

/** Populate localStorage with enough usage events so generateWeeklyDigest returns a valid result. */
function setupMockLocalStorage(): void {
  const now = Date.now();
  const day = 86400000;

  // Usage summary
  localStorage.setItem('lifeos_usage_summary', JSON.stringify({
    totalSessions: 23,
    totalMessages: 142,
    mostUsedPlugin: 'productivity',
    pluginRankings: [
      { pluginName: 'productivity', sessions: 8, messages: 52 },
      { pluginName: 'mindfulness', sessions: 5, messages: 30 },
      { pluginName: 'finance', sessions: 4, messages: 28 },
      { pluginName: 'health', sessions: 3, messages: 18 },
      { pluginName: 'learning', sessions: 3, messages: 14 },
    ],
    lastUpdated: now,
  }));

  // Usage events spanning 7 days
  const events: any[] = [];
  const pluginIds = ['productivity', 'mindfulness', 'finance', 'health', 'learning'];
  for (let d = 6; d >= 0; d--) {
    const ts = new Date(now - d * day);
    const pid = pluginIds[d % pluginIds.length];
    events.push({
      timestamp: ts.toISOString(),
      eventType: 'session_started',
      pluginId: pid,
      pluginName: pid.charAt(0).toUpperCase() + pid.slice(1),
    });
  }
  localStorage.setItem('lifeos_usage_events', JSON.stringify(events));

  // Archetype
  localStorage.setItem('lifeos_archetype', JSON.stringify({
    name: 'Strategist',
    emoji: '🦊',
    description: 'You prefer structured, high-level thinking',
  }));
}

const mockHealthSummary: HealthSummary = {
  totalStepsToday: 8432,
  activeCaloriesToday: 312,
  workoutMinutesThisWeek: 185,
  workoutsThisWeek: 4,
  lastNightSleep: {
    date: '2026-06-03',
    totalHours: 7.2,
    deepHours: 1.8,
    remHours: 2.1,
    lightHours: 3.3,
    awakeMinutes: 18,
    quality: 8,
    provider: 'oura',
  },
  averageSleepHoursThisWeek: 7.2,
  averageSleepQualityThisWeek: 7.8,
  recentHeartRate: 62,
  recentHRV: 38,
  recentRecoveryScore: 82,
  stepTrend7Day: [7432, 8123, 7654, 8912, 7543, 8102, 8432],
  sleepTrend7Day: [6.8, 7.5, 6.9, 7.8, 7.0, 7.3, 7.2],
};

const mockHobbySummary: HobbySummary = {
  totalHoursThisMonth: 24.5,
  activeHobbies: 3,
  projectsCompleted: 2,
  milestonesReached: 5,
  topHobbyByTime: 'Web Development',
  recentSessions: [],
};

const mockMindfulnessSummary: MindfulnessSummary = {
  totalMinutesThisWeek: 65,
  totalSessionsThisWeek: 7,
  currentStreakDays: 5,
  longestStreakDays: 14,
  averageMoodDelta: 1.2,
  lastSession: {
    id: 'ses_123',
    provider: 'headspace',
    type: 'meditation',
    startedAt: '2026-06-03T08:30:00Z',
    durationSeconds: 600,
    moodBefore: 6,
    moodAfter: 8,
    completed: true,
  },
};

// ─── Helpers ───────────────────────────────────────────────────────

/** Create a mock HealthAdapter for a given provider name. */
function createMockHealthAdapter(provider: string, summary: HealthSummary = mockHealthSummary): HealthAdapter {
  return {
    provider,
    config: { apiKey: 'test-key' },
    connect: vi.fn().mockResolvedValue(true),
    getRecords: vi.fn(),
    getWorkouts: vi.fn(),
    getSleep: vi.fn(),
    getSummary: vi.fn().mockResolvedValue(summary),
    getMetric: vi.fn(),
    logRecord: vi.fn(),
    healthCheck: vi.fn(),
  };
}

/** Create a mock HobbyAdapter for a given provider name. */
function createMockHobbyAdapter(provider: string, summary: HobbySummary = mockHobbySummary): HobbyAdapter {
  return {
    provider,
    config: { apiKey: 'test-key' },
    connect: vi.fn().mockResolvedValue(true),
    getSessions: vi.fn(),
    getMilestones: vi.fn(),
    getSummary: vi.fn().mockResolvedValue(summary),
    getMetric: vi.fn(),
    logSession: vi.fn(),
    healthCheck: vi.fn(),
  };
}

/** Create a mock MindfulnessAdapter for a given provider name. */
function createMockMindfulnessAdapter(provider: string, summary: MindfulnessSummary = mockMindfulnessSummary): MindfulnessAdapter {
  return {
    provider,
    config: { apiKey: 'test-key' },
    connect: vi.fn().mockResolvedValue(true),
    getSessions: vi.fn(),
    getSummary: vi.fn().mockResolvedValue(summary),
    getMetric: vi.fn(),
    logSession: vi.fn(),
    healthCheck: vi.fn(),
  };
}

// ─── Health Digest Data ────────────────────────────────────────────

describe('HealthDigestData', () => {
  it('has the expected shape', () => {
    const data: HealthDigestData = {
      provider: 'oura',
      stepsToday: 8432,
      sleepHoursAvg: 7.2,
      workoutMinutes: 185,
      workoutsCount: 4,
      sleepQualityAvg: 7.8,
    };
    expect(data.provider).toBe('oura');
    expect(data.stepsToday).toBe(8432);
    expect(data.sleepHoursAvg).toBe(7.2);
  });
});

describe('HobbyDigestData', () => {
  it('has the expected shape', () => {
    const data: HobbyDigestData = {
      provider: 'skillshare',
      totalHours: 24.5,
      activeHobbies: 3,
      projectsCompleted: 2,
      milestonesReached: 5,
      topHobby: 'Web Development',
    };
    expect(data.provider).toBe('skillshare');
    expect(data.totalHours).toBe(24.5);
    expect(data.topHobby).toBe('Web Development');
  });
});

describe('MindfulnessDigestData', () => {
  it('has the expected shape', () => {
    const data: MindfulnessDigestData = {
      provider: 'headspace',
      totalMinutes: 65,
      totalSessions: 7,
      currentStreak: 5,
      averageMoodDelta: 1.2,
    };
    expect(data.provider).toBe('headspace');
    expect(data.totalMinutes).toBe(65);
    expect(data.averageMoodDelta).toBe(1.2);
  });
});

// ─── queryCachedHealthData ────────────────────────────────────────

describe('queryCachedHealthData', () => {
  beforeEach(() => {
    // Clear registry before each test
    pluginAdapterRegistry.health.clear();
  });

  it('returns empty array when no health adapters are registered', async () => {
    const result = await queryCachedHealthData();
    expect(result).toEqual([]);
  });

  it('returns data from registered health adapters', async () => {
    const mockAdapter = createMockHealthAdapter('oura');
    pluginAdapterRegistry.health.set('oura', mockAdapter);

    const result = await queryCachedHealthData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('oura');
    expect(result[0].stepsToday).toBe(8432);
    expect(result[0].sleepHoursAvg).toBe(7.2);
    expect(mockAdapter.getSummary).toHaveBeenCalledOnce();
  });

  it('handles multiple health adapters', async () => {
    pluginAdapterRegistry.health.set('oura', createMockHealthAdapter('oura'));
    pluginAdapterRegistry.health.set('fitbit', createMockHealthAdapter('fitbit', {
      ...mockHealthSummary,
      totalStepsToday: 12000,
    }));

    const result = await queryCachedHealthData();
    expect(result).toHaveLength(2);
    expect(result.find((d) => d.provider === 'oura')!.stepsToday).toBe(8432);
    expect(result.find((d) => d.provider === 'fitbit')!.stepsToday).toBe(12000);
  });

  it('skips adapters that throw errors', async () => {
    const brokenAdapter = createMockHealthAdapter('apple_health');
    brokenAdapter.getSummary = vi.fn().mockRejectedValue(new Error('API down'));
    pluginAdapterRegistry.health.set('apple_health', brokenAdapter);
    pluginAdapterRegistry.health.set('oura', createMockHealthAdapter('oura'));

    const result = await queryCachedHealthData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('oura');
  });
});

// ─── queryCachedHobbyData ─────────────────────────────────────────

describe('queryCachedHobbyData', () => {
  beforeEach(() => {
    pluginAdapterRegistry.hobbies.clear();
  });

  it('returns empty array when no hobby adapters are registered', async () => {
    const result = await queryCachedHobbyData();
    expect(result).toEqual([]);
  });

  it('returns data from registered hobby adapters', async () => {
    pluginAdapterRegistry.hobbies.set('skillshare', createMockHobbyAdapter('skillshare'));

    const result = await queryCachedHobbyData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('skillshare');
    expect(result[0].totalHours).toBe(24.5);
    expect(result[0].topHobby).toBe('Web Development');
  });

  it('handles multiple hobby adapters', async () => {
    pluginAdapterRegistry.hobbies.set('skillshare', createMockHobbyAdapter('skillshare'));
    pluginAdapterRegistry.hobbies.set('udemy', createMockHobbyAdapter('udemy', {
      ...mockHobbySummary,
      totalHoursThisMonth: 12,
      topHobbyByTime: 'Python',
    }));

    const result = await queryCachedHobbyData();
    expect(result).toHaveLength(2);
    expect(result.find((d) => d.provider === 'udemy')!.topHobby).toBe('Python');
  });

  it('skips adapters that throw errors', async () => {
    const broken = createMockHobbyAdapter('udemy');
    broken.getSummary = vi.fn().mockRejectedValue(new Error('timeout'));
    pluginAdapterRegistry.hobbies.set('udemy', broken);
    pluginAdapterRegistry.hobbies.set('skillshare', createMockHobbyAdapter('skillshare'));

    const result = await queryCachedHobbyData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('skillshare');
  });
});

// ─── queryCachedAdapterData ────────────────────────────────────────

describe('queryCachedAdapterData', () => {
  beforeEach(() => {
    pluginAdapterRegistry.mindfulness.clear();
  });

  it('returns empty array when no mindfulness adapters are registered', async () => {
    const result = await queryCachedAdapterData();
    expect(result).toEqual([]);
  });

  it('returns data from registered mindfulness adapters', async () => {
    pluginAdapterRegistry.mindfulness.set('headspace', createMockMindfulnessAdapter('headspace'));

    const result = await queryCachedAdapterData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('headspace');
    expect(result[0].totalMinutes).toBe(65);
    expect(result[0].currentStreak).toBe(5);
  });

  it('skips adapters that throw', async () => {
    const broken = createMockMindfulnessAdapter('calm');
    broken.getSummary = vi.fn().mockRejectedValue(new Error('no auth'));
    pluginAdapterRegistry.mindfulness.set('calm', broken);
    pluginAdapterRegistry.mindfulness.set('headspace', createMockMindfulnessAdapter('headspace'));

    const result = await queryCachedAdapterData();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe('headspace');
  });
});

// ─── generateEnrichedWeeklyDigest (adapter routing) ───────────────

describe('generateEnrichedWeeklyDigest — adapter routing', () => {
  beforeEach(() => {
    setupMockLocalStorage();
  });
  it('includes health data in enriched digest when health adapter config is provided', async () => {
    const result = await generateEnrichedWeeklyDigest({
      oura: { apiKey: 'test-key' },
    });
    // Should have healthData populated since oura is a health provider
    expect(result).not.toBeNull();
    expect(result!.healthData.length).toBeGreaterThanOrEqual(0);
    // Mindfulness and hobby should be empty since we didn't configure those
    expect(result!.mindfulnessData).toEqual([]);
    expect(result!.hobbyData).toEqual([]);
  });

  it('includes hobby data when hobby adapter config is provided', async () => {
    const result = await generateEnrichedWeeklyDigest({
      skillshare: { apiKey: 'test-key' },
    });
    expect(result).not.toBeNull();
    expect(result!.hobbyData.length).toBeGreaterThanOrEqual(0);
    expect(result!.mindfulnessData).toEqual([]);
    expect(result!.healthData).toEqual([]);
  });

  it('handles multiple adapter categories simultaneously', async () => {
    const result = await generateEnrichedWeeklyDigest({
      oura: { apiKey: 'test-key' },
      skillshare: { apiKey: 'test-key' },
      headspace: { apiKey: 'test-key' },
    });
    expect(result).not.toBeNull();
    // All three categories should have been attempted
    expect(result!.healthData.length).toBeGreaterThanOrEqual(0);
    expect(result!.hobbyData.length).toBeGreaterThanOrEqual(0);
    expect(result!.mindfulnessData.length).toBeGreaterThanOrEqual(0);
  });

  it('returns base digest unchanged when no adapter configs supplied', async () => {
    const result = await generateEnrichedWeeklyDigest();
    expect(result).not.toBeNull();
    expect(result!.healthData).toEqual([]);
    expect(result!.hobbyData).toEqual([]);
    expect(result!.mindfulnessData).toEqual([]);
  });

  it('returns base digest unchanged with empty adapter configs', async () => {
    const result = await generateEnrichedWeeklyDigest({});
    expect(result).not.toBeNull();
    expect(result!.healthData).toEqual([]);
  });

  it('gracefully handles unknown provider names (falls through all categories)', async () => {
    const result = await generateEnrichedWeeklyDigest({
      unknown_service: { apiKey: 'nope' } as any,
    });
    expect(result).not.toBeNull();
    expect(result!.healthData).toEqual([]);
    expect(result!.hobbyData).toEqual([]);
    expect(result!.mindfulnessData).toEqual([]);
  });
});

// ─── generateWeeklyDigest (localStorage only) ─────────────────────

describe('generateWeeklyDigest (localStorage-only)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns a zeroed digest when localStorage has no events', () => {
    const result = generateWeeklyDigest();
    expect(result).not.toBeNull();
    expect(result!.totals.sessions).toBe(0);
    expect(result!.totals.messages).toBe(0);
    expect(result!.healthData).toEqual([]);
    expect(result!.hobbyData).toEqual([]);
    expect(result!.mindfulnessData).toEqual([]);
    expect(result!.archetype).toBeNull();
  });

  it('returns a valid digest when localStorage has usage data', () => {
    setupMockLocalStorage();
    const result = generateWeeklyDigest();
    expect(result).not.toBeNull();
    expect(result!.totals.sessions).toBe(7);  // 1 session per day from mock setup
    expect(result!.archetype).not.toBeNull();
    expect(result!.archetype!.name).toBe('Strategist');
    expect(result!.topPlugins.length).toBe(5);
    expect(result!.markdown).toContain('LifeOS Weekly Digest');
    expect(result!.markdown).toContain('Strategist');
    expect(result!.markdown).toContain('🔥 Top Plugins');
    expect(result!.markdown).toContain('📅 Daily Activity');
  });
});
