import { describe, it, expect } from 'vitest';
import {
  calculateGodTierScore,
  getGodTierStatus,
  getVisualTier,
  hasAbility,
  getAbilitiesForLevel,
  evolveSkill,
  getRoboticsManifest,
} from './god-tier-engine';

describe('calculateGodTierScore', () => {
  it('returns 0 for zero contributions', () => {
    expect(calculateGodTierScore(0, 0, 0)).toBe(0);
  });

  it('caps at 100', () => {
    expect(calculateGodTierScore(10, 100, 1000)).toBe(100);
  });

  it('maxes phase contribution at 90 (6 phases × 15)', () => {
    expect(calculateGodTierScore(6, 0, 0)).toBe(90);
    expect(calculateGodTierScore(7, 0, 0)).toBe(90);
  });

  it('maxes skill contribution at 8', () => {
    expect(calculateGodTierScore(0, 4, 0)).toBe(8);
    expect(calculateGodTierScore(0, 10, 0)).toBe(8);
  });

  it('maxes task contribution at 2 (every 20 tasks)', () => {
    expect(calculateGodTierScore(0, 0, 20)).toBe(2);
    expect(calculateGodTierScore(0, 0, 50)).toBe(2);
  });

  it('computes mixed contributions correctly', () => {
    // 2 phases = 30, 3 certified = 6, 5 tasks = 0 → total 36
    expect(calculateGodTierScore(2, 3, 5)).toBe(36);
  });
});

describe('getGodTierStatus', () => {
  it('returns isGodTier=false for level < 30', () => {
    const status = getGodTierStatus(15, 1000, 2, 1, 5);
    expect(status.isGodTier).toBe(false);
    expect(status.unlockedAbilities).toHaveLength(0);
    expect(status.nextAbilityAt).toBe(30);
  });

  it('returns isGodTier=true at level 30+', () => {
    const status = getGodTierStatus(30, 5000, 4, 2, 20);
    expect(status.isGodTier).toBe(true);
  });

  it('unlocks all 6 level-30 abilities at level 30', () => {
    const status = getGodTierStatus(30, 5000, 4, 2, 20);
    expect(status.unlockedAbilities).toHaveLength(6);
    const ids = status.unlockedAbilities.map((a) => a.id);
    expect(ids).toContain('aura');
    expect(ids).toContain('crown');
    expect(ids).toContain('orbital-ring');
    expect(ids).toContain('god-command');
    expect(ids).toContain('soulbound');
    expect(ids).toContain('aura-pressure');
  });

  it('unlocks level-40 abilities at level 40', () => {
    const status = getGodTierStatus(40, 10000, 6, 5, 50);
    const ids = status.unlockedAbilities.map((a) => a.id);
    expect(ids).toContain('double-halo');
    expect(ids).toContain('god-emoji');
    expect(ids).toContain('timelord');
    expect(ids).toContain('echo');
  });

  it('unlocks level-50 abilities at level 50+', () => {
    const status = getGodTierStatus(50, 20000, 6, 5, 100);
    const ids = status.unlockedAbilities.map((a) => a.id);
    expect(ids).toContain('ascended');
    expect(ids).toContain('swarm-master');
    expect(ids).toContain('legacy');
  });

  it('has correct total ability count at max level (6+4+3=13)', () => {
    const status = getGodTierStatus(50, 20000, 6, 5, 100);
    expect(status.unlockedAbilities).toHaveLength(13);
  });

  it('sets nextAbilityAt correctly', () => {
    const statusL15 = getGodTierStatus(15, 500, 0, 0, 0);
    expect(statusL15.nextAbilityAt).toBe(30);
    const statusL35 = getGodTierStatus(35, 8000, 4, 2, 20);
    expect(statusL35.nextAbilityAt).toBe(40);
    const statusL45 = getGodTierStatus(45, 15000, 5, 4, 50);
    expect(statusL45.nextAbilityAt).toBe(50);
    const statusL50 = getGodTierStatus(50, 20000, 6, 5, 100);
    expect(statusL50.nextAbilityAt).toBe(50); // max level
  });

  it('marks all unlocked abilities as earned', () => {
    const status = getGodTierStatus(35, 8000, 4, 2, 20);
    expect(status.unlockedAbilities.every((a) => a.earned)).toBe(true);
  });
});

describe('getVisualTier', () => {
  it('returns 1 for level 1-29', () => {
    expect(getVisualTier(1)).toBe(1);
    expect(getVisualTier(15)).toBe(1);
    expect(getVisualTier(29)).toBe(1);
  });

  it('returns 2 for level 30-39', () => {
    expect(getVisualTier(30)).toBe(2);
    expect(getVisualTier(35)).toBe(2);
    expect(getVisualTier(39)).toBe(2);
  });

  it('returns 3 for level 40+', () => {
    expect(getVisualTier(40)).toBe(3);
    expect(getVisualTier(50)).toBe(3);
    expect(getVisualTier(100)).toBe(3);
  });
});

describe('hasAbility', () => {
  it('returns false for unknown ability id', () => {
    expect(hasAbility(50, 'fake-ability')).toBe(false);
  });

  it('returns false when level is below threshold', () => {
    expect(hasAbility(29, 'aura')).toBe(false);
  });

  it('returns true when level meets threshold', () => {
    expect(hasAbility(30, 'aura')).toBe(true);
    expect(hasAbility(40, 'double-halo')).toBe(true);
    expect(hasAbility(50, 'ascended')).toBe(true);
  });
});

describe('getAbilitiesForLevel', () => {
  it('returns empty for sub-30', () => {
    expect(getAbilitiesForLevel(15)).toHaveLength(0);
  });

  it('marks all as earned', () => {
    const abilities = getAbilitiesForLevel(40);
    expect(abilities.every((a) => a.earned)).toBe(true);
  });

  it('returns 6 abilities at level 30', () => {
    expect(getAbilitiesForLevel(30)).toHaveLength(6);
  });

  it('returns 10 abilities at level 40', () => {
    expect(getAbilitiesForLevel(40)).toHaveLength(10);
  });

  it('returns all 13 abilities at level 50', () => {
    expect(getAbilitiesForLevel(50)).toHaveLength(13);
  });
});

describe('evolveSkill', () => {
  it('returns EvolvedSkill with correct shape', async () => {
    const result = await evolveSkill('skill-1');
    expect(result).toHaveProperty('originalSkillId', 'skill-1');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('suggestions');
    expect(result).toHaveProperty('improvedSkillMd');
  });

  it('includes memory-derived suggestions', async () => {
    const result = await evolveSkill('skill-1');
    // The mock data has 1 error entry (error_timeout) so failureCount > 2 is false,
    // but suggestions include generic ones
    expect(result.suggestions.length).toBeGreaterThanOrEqual(3);
  });

  it('deduplicates suggestions', async () => {
    const result = await evolveSkill('skill-1');
    const unique = new Set(result.suggestions);
    expect(result.suggestions.length).toBe(unique.size);
  });

  it('generates markdown with improvement section', async () => {
    const result = await evolveSkill('skill-1');
    expect(result.improvedSkillMd).toContain('## Evolved Instructions');
    expect(result.improvedSkillMd).toContain('### Improvements');
  });

  it('version is semver', async () => {
    const result = await evolveSkill('skill-1');
    expect(result.version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

describe('getRoboticsManifest', () => {
  it('returns manifest for agent id', () => {
    const manifest = getRoboticsManifest('agent-42');
    expect(manifest.agentId).toBe('agent-42');
  });

  it('includes all required hardware platforms', () => {
    const manifest = getRoboticsManifest('agent-42');
    expect(manifest.hardwareCompatibility).toContain('ros2');
    expect(manifest.hardwareCompatibility).toContain('arduino');
    expect(manifest.hardwareCompatibility).toContain('esp32');
  });

  it('includes safety constraints', () => {
    const manifest = getRoboticsManifest('agent-42');
    expect(manifest.safetyConstraints.length).toBeGreaterThan(0);
    expect(manifest.safetyConstraints).toContain('emergency_stop_required');
    expect(manifest.safetyConstraints).toContain('no_autonomous_weapons');
  });

  it('has abstract as default embodiment', () => {
    const manifest = getRoboticsManifest('agent-42');
    expect(manifest.embodimentType).toBe('abstract');
  });
});
