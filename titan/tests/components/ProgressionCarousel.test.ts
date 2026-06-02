// ═══════════════════════════════════════════════════════════════════════
// ProgressionCarousel — data integrity + logic tests
// ═══════════════════════════════════════════════════════════════════════

import { describe, it, expect } from "vitest";

// Mirrors the PROGRESSION_TIERS constant in the component
const PROGRESSION_TIERS = [
  { level: 1, emoji: "\u{1F95A}", label: "Hatchling" },
  { level: 5, emoji: "\u{1F423}", label: "Apprentice" },
  { level: 10, emoji: "\u{1F98A}", label: "Adept" },
  { level: 15, emoji: "\u{1F409}", label: "Master" },
  { level: 20, emoji: "\u{1F985}", label: "Grandmaster" },
  { level: 25, emoji: "\u{1F31F}", label: "Legend" },
  { level: 30, emoji: "\u{1F451}", label: "God-Tier" },
];

describe("ProgressionCarousel — data integrity", () => {
  it("has exactly 7 progression tiers", () => {
    expect(PROGRESSION_TIERS.length).toBe(7);
  });

  it("starts at level 1", () => {
    expect(PROGRESSION_TIERS[0].level).toBe(1);
  });

  it("has strictly increasing level thresholds", () => {
    for (let i = 1; i < PROGRESSION_TIERS.length; i++) {
      expect(PROGRESSION_TIERS[i].level).toBeGreaterThan(PROGRESSION_TIERS[i - 1].level);
    }
  });

  it("ends at God-Tier level 30", () => {
    const last = PROGRESSION_TIERS[PROGRESSION_TIERS.length - 1];
    expect(last.label).toBe("God-Tier");
    expect(last.level).toBe(30);
  });

  it("tier labels are unique", () => {
    const labels = PROGRESSION_TIERS.map((t) => t.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("tier levels are unique", () => {
    const levels = PROGRESSION_TIERS.map((t) => t.level);
    expect(new Set(levels).size).toBe(levels.length);
  });

  it("each step gap is 4-5 levels", () => {
    const levels = PROGRESSION_TIERS.map((t) => t.level);
    for (let i = 1; i < levels.length; i++) {
      const gap = levels[i] - levels[i - 1];
      expect(gap).toBeGreaterThanOrEqual(4);
      expect(gap).toBeLessThanOrEqual(5);
    }
  });
});

describe("ProgressionCarousel — level resolution logic", () => {
  // Mirrors the component's auto-scroll logic
  function getActiveIndex(level: number): number {
    let bestIdx = 0;
    for (let i = PROGRESSION_TIERS.length - 1; i >= 0; i--) {
      if (level >= PROGRESSION_TIERS[i].level) {
        bestIdx = i;
        break;
      }
    }
    return bestIdx;
  }

  const testCases = [
    [1, "Hatchling", 0],
    [4, "Hatchling", 0],
    [5, "Apprentice", 1],
    [9, "Apprentice", 1],
    [10, "Adept", 2],
    [14, "Adept", 2],
    [15, "Master", 3],
    [19, "Master", 3],
    [20, "Grandmaster", 4],
    [24, "Grandmaster", 4],
    [25, "Legend", 5],
    [29, "Legend", 5],
    [30, "God-Tier", 6],
    [50, "God-Tier", 6],
    [99, "God-Tier", 6],
    [0, "Hatchling", 0],
  ] as const;

  for (const [level, _label, expectedIdx] of testCases) {
    it(`level ${level} -> index ${expectedIdx}`, () => {
      expect(getActiveIndex(level)).toBe(expectedIdx);
    });
  }

  it("all 7 tier thresholds map to their own index", () => {
    for (let i = 0; i < PROGRESSION_TIERS.length; i++) {
      expect(getActiveIndex(PROGRESSION_TIERS[i].level)).toBe(i);
    }
  });
});

describe("ProgressionCarousel — unlocked status logic", () => {
  function isUnlocked(tierLevel: number, currentLevel: number): boolean {
    return currentLevel >= tierLevel;
  }

  it("only Hatchling unlocked at level 4", () => {
    expect(isUnlocked(1, 4)).toBe(true);
    expect(isUnlocked(5, 4)).toBe(false);
    expect(isUnlocked(10, 4)).toBe(false);
    expect(isUnlocked(30, 4)).toBe(false);
  });

  it("Apprentice+ locked at level 9", () => {
    expect(isUnlocked(1, 9)).toBe(true);
    expect(isUnlocked(5, 9)).toBe(true);
    expect(isUnlocked(10, 9)).toBe(false);
  });

  it("everything unlocked at level 30+", () => {
    for (const tier of PROGRESSION_TIERS) {
      expect(isUnlocked(tier.level, 30)).toBe(true);
    }
  });
});

describe("ProgressionCarousel — progress bar logic", () => {
  // Mirrors component calc: ((clamped - currentTier) / (nextTier - currentTier)) * 100
  function calcProgress(
    level: number,
    currentTierLevel: number,
    nextTierLevel: number
  ): number {
    const clamped = Math.min(Math.max(level, currentTierLevel), nextTierLevel);
    return ((clamped - currentTierLevel) / (nextTierLevel - currentTierLevel)) * 100;
  }

  it("0% at current tier minimum", () => {
    expect(calcProgress(1, 1, 5)).toBe(0);
  });

  it("100% at next tier threshold", () => {
    expect(calcProgress(5, 1, 5)).toBe(100);
  });

  it("50% at midpoint", () => {
    expect(calcProgress(3, 1, 5)).toBe(50);
  });

  it("clamps above 100%", () => {
    expect(calcProgress(10, 1, 5)).toBe(100);
  });

  it("clamps below 0%", () => {
    expect(calcProgress(0, 1, 5)).toBe(0);
  });

  it("calculates 20% increments correctly", () => {
    expect(calcProgress(6, 5, 10)).toBe(20);
    expect(calcProgress(7, 5, 10)).toBe(40);
    expect(calcProgress(8, 5, 10)).toBe(60);
    expect(calcProgress(9, 5, 10)).toBe(80);
  });
});
