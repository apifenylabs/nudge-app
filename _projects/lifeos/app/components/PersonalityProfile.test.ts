import { describe, it, expect } from 'vitest';
import type { UsageSummary, PluginUsage } from '@/app/lib/usage-analytics';
import {
  getTopPlugins,
  computeArchetype,
  computeTraits,
  getRecommendations,
  type Archetype,
  type PersonalityTrait,
} from '@/app/lib/personality-profile';

// ─── Sample Data ──────────────────────────────────────────────────

function makeSummary(overrides: Partial<UsageSummary> & { pluginRankings: UsageSummary['pluginRankings'] }): UsageSummary {
  return {
    totalSessions: 50,
    totalMessages: 200,
    totalTimeMinutes: 600,
    activeDays: 15,
    mostUsedPlugin: overrides.pluginRankings[0]?.pluginId ?? 'travel',
    ...overrides,
  };
}

function makePlugin(id: string, name: string, sessions: number, messages?: number) {
  return { pluginId: id, pluginName: name, sessions, messages: messages ?? sessions * 4 };
}

// ─── Empty / Edge State Tests ──────────────────────────────────────

describe('getTopPlugins', () => {
  it('returns empty array for undefined summary', () => {
    expect(getTopPlugins(undefined)).toEqual([]);
  });

  it('returns empty array for summary with empty rankings', () => {
    const summary = makeSummary({ pluginRankings: [], totalSessions: 0 });
    expect(getTopPlugins(summary)).toEqual([]);
  });

  it('returns top 5 plugins with score relative to max', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('travel', 'Travel OS', 100),
        makePlugin('finance', 'Finance OS', 50),
        makePlugin('health', 'Health OS', 25),
      ],
    });
    const result = getTopPlugins(summary);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ id: 'travel', name: 'Travel OS', score: 100 });
    expect(result[1]).toMatchObject({ id: 'finance', name: 'Finance OS', score: 50 });
    expect(result[2]).toMatchObject({ id: 'health', name: 'Health OS', score: 25 });
  });

  it('caps at 5 plugins even if more exist', () => {
    const plugins = Array.from({ length: 10 }, (_, i) =>
      makePlugin(`p${i}`, `Plugin ${i}`, 100 - i * 5)
    );
    const summary = makeSummary({ pluginRankings: plugins });
    expect(getTopPlugins(summary)).toHaveLength(5);
  });

  it('assigns emoji based on pluginId mapping', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('mindfulness', 'Mindfulness OS', 10),
        makePlugin('unknown-thing', 'Custom Plugin', 5),
      ],
    });
    const result = getTopPlugins(summary);
    expect(result.find(p => p.id === 'mindfulness')?.emoji).toBe('🧘');
    expect(result.find(p => p.id === 'unknown-thing')?.emoji).toBe('🧠');
  });
});

// ─── Archetype Tests ───────────────────────────────────────────────

describe('computeArchetype', () => {
  it('returns Awakening (novice) when no summary data', () => {
    const result = computeArchetype(undefined, 0, 0);
    expect(result.id).toBe('novice');
    expect(result.name).toBe('Awakening');
  });

  it('returns Awakening when rankings are empty', () => {
    const summary = makeSummary({ pluginRankings: [], totalSessions: 0 });
    expect(computeArchetype(summary, 0, 0).id).toBe('novice');
  });

  it('returns Guardian for few plugins with high sessions', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('mindfulness', 'Mindfulness OS', 20),
        makePlugin('health', 'Health OS', 15),
      ],
      totalSessions: 35,
    });
    expect(computeArchetype(summary, 60, 50).id).toBe('guardian');
  });

  it('returns Healer when wellness plugins dominate top 3 and wellness score > 40', () => {
    // 4 plugins to bypass Guardian (count <= 3 check)
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('mindfulness', 'Mindfulness OS', 30),
        makePlugin('health', 'Health OS', 25),
        makePlugin('relationships', 'Relationships OS', 20),
        makePlugin('travel', 'Travel OS', 5),
      ],
      totalSessions: 80,
    });
    expect(computeArchetype(summary, 50, 60).id).toBe('healer');
  });

  it('does NOT return Healer when wellness score <= 40 despite wellness plugins', () => {
    // 4 plugins to bypass Guardian (count <= 3 check)
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('mindfulness', 'Mindfulness OS', 3),
        makePlugin('health', 'Health OS', 2),
        makePlugin('relationships', 'Relationships OS', 2),
        makePlugin('travel', 'Travel OS', 30),
      ],
      totalSessions: 37,
    });
    // wellnessScore is low (7/37=19%), so won't be Healer despite top-3
    const traits = computeTraits(summary);
    expect(traits.wellness).toBeLessThanOrEqual(40);
    const result = computeArchetype(summary, 30, traits.wellness);
    // 4 plugins + low depth (< 40) → Alchemist check fires (count >= 4) before Explorer
    expect(result.id).toBe('alchemist');
  });

  it('returns Strategist when finance/career/productivity dominate top 3', () => {
    // 4 plugins to bypass Guardian
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('finance', 'Finance OS', 40),
        makePlugin('career', 'Career OS', 30),
        makePlugin('productivity', 'Productivity OS', 20),
        makePlugin('travel', 'Travel OS', 10),
      ],
      totalSessions: 100,
    });
    expect(computeArchetype(summary, 50, 0).id).toBe('strategist');
  });

  it('returns Architect when home/productivity/learning dominate top 3', () => {
    // 4 plugins to bypass Guardian
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('home', 'Home OS', 25),
        makePlugin('productivity', 'Productivity OS', 20),
        makePlugin('learning', 'Learning OS', 15),
        makePlugin('travel', 'Travel OS', 5),
      ],
      totalSessions: 65,
    });
    expect(computeArchetype(summary, 50, 0).id).toBe('architect');
  });

  it('returns Alchemist when 4+ plugins used', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('travel', 'Travel OS', 20),
        makePlugin('finance', 'Finance OS', 18),
        makePlugin('health', 'Health OS', 15),
        makePlugin('learning', 'Learning OS', 12),
      ],
      totalSessions: 65,
    });
    expect(computeArchetype(summary, 60, 30).id).toBe('alchemist');
  });

  it('returns Explorer when low total sessions (bypasses Guardian) and 3 plugins with low depth', () => {
    // totalSessions < 5 to bypass Guardian
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('travel', 'Travel OS', 2),
        makePlugin('finance', 'Finance OS', 1),
        makePlugin('health', 'Health OS', 1),
      ],
      totalSessions: 4,
    });
    expect(computeArchetype(summary, 30, 30).id).toBe('explorer');
  });

  it('maps first-plugin fallback correctly via tagMap', () => {
    // 4 plugins to bypass Guardian, none strategy/architect/wellness enough
    // count >= 4 hits Alchemist before fallback, so testing via 3 plugins with totalSessions < 5
    const healthSummary = makeSummary({
      pluginRankings: [
        makePlugin('health', 'Health OS', 2),
        makePlugin('travel', 'Travel OS', 1),
      ],
      totalSessions: 3,
    });
    // count = 2 <= 3, but totalSessions = 3 < 5, so Guardian doesn't match
    // wellnessPluginsTop = ['health'], only 1, so Healer doesn't match
    // strategyPluginsTop = [], strategist doesn't match
    // architectPluginsTop = [], architect doesn't match
    // count = 2 < 4, alchemist doesn't match
    // count = 2 < 3, explorer doesn't match
    // Falls to tagMap: health -> Healer
    expect(computeArchetype(healthSummary, 30, 30).id).toBe('healer');
  });

  it('maps unknown plugin to Explorer fallback', () => {
    const summary = makeSummary({
      pluginRankings: [makePlugin('weird-plugin', 'Weird', 3)],
      totalSessions: 3,
    });
    // count <= 3 but totalSessions < 5, so not Guardian
    // wellnessPluginsTop check: none of top-3 are wellness
    // strategyPluginsTop: none are strategy
    // architectPluginsTop: none are architect
    // count = 1 < 4, not Alchemist
    // count >= 3 is false (only 1 plugin)
    // Falls to tagMap fallback — "weird-plugin" no match -> Explorer
    expect(computeArchetype(summary, 30, 0).id).toBe('explorer');
  });
});

// ─── Trait Computation Tests ───────────────────────────────────────

describe('computeTraits', () => {
  it('returns all zeros for undefined summary', () => {
    const traits = computeTraits(undefined);
    expect(traits).toEqual({ breadth: 0, depth: 0, consistency: 0, diversity: 0, planning: 0, wellness: 0 });
  });

  it('returns baseline values for empty rankings (not zero — depth and diversity floor at 10)', () => {
    const summary = makeSummary({ pluginRankings: [], totalSessions: 0 });
    const traits = computeTraits(summary);
    // count = 0: breadth = 0, diversity = 10 (evenness floor), depth = 10 (count>2?30:10)
    expect(traits).toEqual({ breadth: 0, depth: 10, consistency: 0, diversity: 10, planning: 0, wellness: 0 });
  });

  it('computes breadth proportional to 12 possible plugins', () => {
    const summary = makeSummary({
      pluginRankings: Array.from({ length: 6 }, (_, i) => makePlugin(`p${i}`, `P${i}`, 10)),
      totalSessions: 60,
    });
    const traits = computeTraits(summary);
    expect(traits.breadth).toBe(50); // 6/12 = 50%
  });

  it('caps breadth at 100', () => {
    const summary = makeSummary({
      pluginRankings: Array.from({ length: 20 }, (_, i) => makePlugin(`p${i}`, `P${i}`, 10)),
      totalSessions: 200,
    });
    expect(computeTraits(summary).breadth).toBe(100);
  });

  it('computes planning from finance+career+productivity share', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('finance', 'Finance OS', 40),
        makePlugin('travel', 'Travel OS', 30),
        makePlugin('career', 'Career OS', 20),
        makePlugin('health', 'Health OS', 10),
      ],
      totalSessions: 100,
    });
    const traits = computeTraits(summary);
    expect(traits.planning).toBe(60); // (40+20)/100 = 60%
  });

  it('computes wellness from health+mindfulness+relationships+nutrition share', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('health', 'Health OS', 30),
        makePlugin('mindfulness', 'Mindfulness OS', 20),
        makePlugin('travel', 'Travel OS', 50),
      ],
      totalSessions: 100,
    });
    const traits = computeTraits(summary);
    expect(traits.wellness).toBe(50); // (30+20)/100 = 50%
  });

  it('computes diversity from evenness of distribution', () => {
    // Even distribution: 3 plugins all at same sessions
    const evenSummary = makeSummary({
      pluginRankings: [
        makePlugin('a', 'A', 20),
        makePlugin('b', 'B', 20),
        makePlugin('c', 'C', 20),
      ],
      totalSessions: 60,
    });
    const evenTraits = computeTraits(evenSummary);
    // evenness = (20/20 + 20/20 + 20/20)/3 = 1.0
    // diversity = 1.0 * 80 + 10 = 90
    expect(evenTraits.diversity).toBe(90);

    // Uneven distribution: one plugin dominates
    const unevenSummary = makeSummary({
      pluginRankings: [
        makePlugin('a', 'A', 100),
        makePlugin('b', 'B', 10),
        makePlugin('c', 'C', 5),
      ],
      totalSessions: 115,
    });
    const unevenTraits = computeTraits(unevenSummary);
    // evenness = (100/100 + 10/100 + 5/100)/3 = 1.15/3 ≈ 0.383
    // diversity ≈ 0.383 * 80 + 10 ≈ 40.67 ≈ 41
    expect(unevenTraits.diversity).toBeLessThan(50);
  });

  it('depth increases with session count', () => {
    const lowSummary = makeSummary({
      pluginRankings: [makePlugin('a', 'A', 3)],
      totalSessions: 3,
    });
    const highSummary = makeSummary({
      pluginRankings: [makePlugin('a', 'A', 50), makePlugin('b', 'B', 30)],
      totalSessions: 80,
    });
    expect(computeTraits(lowSummary).depth).toBeLessThan(computeTraits(highSummary).depth);
  });

  it('caps all traits at 100', () => {
    // Extreme values to force capping
    const summary = makeSummary({
      pluginRankings: Array.from({ length: 12 }, (_, i) => makePlugin(`p${i}`, `P${i}`, 1000)),
      totalSessions: 12000,
    });
    const traits = computeTraits(summary);
    Object.values(traits).forEach(v => {
      expect(v).toBeLessThanOrEqual(100);
    });
  });
});

// ─── Recommendation Tests ──────────────────────────────────────────

describe('getRecommendations', () => {
  it('returns recommendations for Explorer', () => {
    const result = getRecommendations('explorer');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(3);
    expect(result!.recommendations[0].id).toBe('travel');
    expect(result!.customMessage).toContain('curiosity');
  });

  it('returns recommendations for Strategist', () => {
    const result = getRecommendations('strategist');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(4);
    expect(result!.recommendations.some(r => r.id === 'finance')).toBe(true);
    expect(result!.recommendations.some(r => r.status === 'coming-soon')).toBe(true);
  });

  it('returns recommendations for Healer', () => {
    const result = getRecommendations('healer');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(4);
    expect(result!.recommendations.some(r => r.id === 'mindfulness')).toBe(true);
    expect(result!.recommendations.some(r => r.id === 'relationships')).toBe(true);
  });

  it('returns recommendations for Architect', () => {
    const result = getRecommendations('architect');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(4);
    expect(result!.recommendations.some(r => r.id === 'home')).toBe(true);
  });

  it('returns recommendations for Alchemist', () => {
    const result = getRecommendations('alchemist');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(4);
    expect(result!.recommendations.some(r => r.id === 'learning')).toBe(true);
  });

  it('returns recommendations for Guardian', () => {
    const result = getRecommendations('guardian');
    expect(result).not.toBeNull();
    expect(result!.recommendations).toHaveLength(4);
    expect(result!.recommendations.some(r => r.id === 'health')).toBe(true);
  });

  it('returns null for unknown archetype', () => {
    expect(getRecommendations('unknown')).toBeNull();
  });

  it('returns null for novice archetype', () => {
    expect(getRecommendations('novice')).toBeNull();
  });
});

// ─── Integration Tests: Archetype + Trait Coherence ────────────────

describe('archetype and trait coherence', () => {
  it('Strategist has high planning trait', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('finance', 'Finance OS', 40),
        makePlugin('career', 'Career OS', 30),
        makePlugin('productivity', 'Productivity OS', 20),
        makePlugin('travel', 'Travel OS', 10),
      ],
      totalSessions: 100,
    });
    const traits = computeTraits(summary);
    const archetype = computeArchetype(summary, traits.depth, traits.wellness);
    expect(archetype.id).toBe('strategist');
    expect(traits.planning).toBeGreaterThan(50);
  });

  it('Healer has high wellness trait', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('mindfulness', 'Mindfulness OS', 30),
        makePlugin('health', 'Health OS', 25),
        makePlugin('nutrition', 'Nutrition OS', 20),
        makePlugin('relationships', 'Relationships OS', 15),
      ],
      totalSessions: 90,
    });
    const traits = computeTraits(summary);
    const archetype = computeArchetype(summary, traits.depth, traits.wellness);
    expect(archetype.id).toBe('healer');
    expect(traits.wellness).toBeGreaterThan(80);
  });

  it('Alchemist has high breadth and diversity', () => {
    const summary = makeSummary({
      pluginRankings: [
        makePlugin('travel', 'Travel OS', 20),
        makePlugin('finance', 'Finance OS', 18),
        makePlugin('health', 'Health OS', 16),
        makePlugin('learning', 'Learning OS', 14),
        makePlugin('home', 'Home OS', 12),
        makePlugin('mindfulness', 'Mindfulness OS', 10),
      ],
      totalSessions: 90,
    });
    const traits = computeTraits(summary);
    expect(traits.breadth).toBeGreaterThanOrEqual(50); // 6/12
    expect(traits.diversity).toBeGreaterThan(50);
    const archetype = computeArchetype(summary, traits.depth, traits.wellness);
    expect(archetype.id).toBe('alchemist');
  });
});
