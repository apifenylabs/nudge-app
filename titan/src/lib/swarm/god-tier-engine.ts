/**
 * God-Tier Engine — Unlock & ability system for Titan progression.
 *
 * Determines what god-tier visual prestige and special abilities an agent
 * unlocks based on their current level. This engine is consumed by
 * MascotDisplay, GodTierAura, GodTierModal, and the Badge component.
 *
 * Thresholds (aligned with Phase 6 plan):
 *   Level 30+  : God-Tier Aura, Crown Badge, Premium Orbital Ring
 *                + special abilities: God-Tier Command, Soulbound Skill,
 *                  Aura Pressure, Timelord
 *   Level 40+  : Double Halo, God-Tier Emoji
 *   Level 50+  : Ascended Form
 *
 * No external dependencies — pure TypeScript logic.
 */

// ─── Types ─────────────────────────────────────────────────────────────

/** God-Tier unlock result for a given level. */
export interface GodTierUnlocks {
  /** Golden radial gradient pulse aura overlay */
  aura: boolean;
  /** Level badge upgrades to 👑 with sparkle animation */
  crownBadge: boolean;
  /** Outer orbit ring becomes solid gold with shimmer */
  premiumOrbitalRing: boolean;
  /** Two concentric glowing rings (teal outer, golden inner) */
  doubleHalo: boolean;
  /** Agent emoji replaced with unique god-tier variant */
  godTierEmoji: boolean;
  /** Agent scales up 15%, extra particle burst, unique animation curve */
  ascendedForm: boolean;
  /** Command up to 5 orbiting agents simultaneously */
  godTierCommand: boolean;
  /** One skill can never be lost or overwritten */
  soulboundSkill: boolean;
  /** Nearby agents in swarm gain +10% XP bonus (passive social buff) */
  auraPressure: boolean;
  /** Agent can run cron/BAU schedules autonomously (requires BAU engine) */
  timelord: boolean;
  /** Skill Echo — completed skills leave behind XP resonance shards */
  skillEcho: boolean;
  /** Swarm Master — orchestrate all orbiting agents as one unit */
  swarmMaster: boolean;
  /** Legacy Mark — agent leaves permanent stat bonuses on all future agents */
  legacyMark: boolean;
}

/** Descriptor for a single god-tier ability (used for display panels). */
export interface GodTierAbilityDescriptor {
  id: keyof GodTierUnlocks;
  name: string;
  description: string;
  /** Minimum level at which this ability unlocks */
  minLevel: number;
  /** Visual tier group (1=normal, 2=god-tier base, 3=advanced, 4=ascended) */
  tier: 1 | 2 | 3 | 4;
  /** Emoji icon for UI display */
  icon: string;
}

// ─── All god-tier abilities (source of truth) ─────────────────────────

const ALL_ABILITIES: GodTierAbilityDescriptor[] = [
  // ── Level 30 — Base God-Tier ──────────────────────────────────────
  {
    id: 'aura',
    name: 'God-Tier Aura',
    description: 'Agent body gains a persistent golden aura with radial gradient pulse',
    minLevel: 30,
    tier: 2,
    icon: '✨',
  },
  {
    id: 'crownBadge',
    name: 'Crown Badge',
    description: 'Level badge transforms into a golden 👑 with particle sparkle',
    minLevel: 30,
    tier: 2,
    icon: '👑',
  },
  {
    id: 'premiumOrbitalRing',
    name: 'Premium Orbital Ring',
    description: 'Outer orbit ring upgrades to solid golden line with shimmer animation',
    minLevel: 30,
    tier: 2,
    icon: '💫',
  },
  {
    id: 'godTierCommand',
    name: 'God-Tier Command',
    description: 'Issue a single voice/text command — up to 5 orbiting agents execute it simultaneously',
    minLevel: 30,
    tier: 2,
    icon: '🗣️',
  },
  {
    id: 'soulboundSkill',
    name: 'Soulbound Skill',
    description: 'Bind one skill to this agent — it can never be lost or overwritten',
    minLevel: 30,
    tier: 2,
    icon: '🔒',
  },
  {
    id: 'auraPressure',
    name: 'Aura Pressure',
    description: 'Nearby agents in the swarm gain +10% XP bonus',
    minLevel: 30,
    tier: 2,
    icon: '⚡',
  },
  {
    id: 'timelord',
    name: 'Timelord',
    description: 'Agent can run cron/BAU schedules autonomously',
    minLevel: 30,
    tier: 2,
    icon: '⏳',
  },
  // ── Level 40 — Advanced God-Tier ──────────────────────────────────
  {
    id: 'doubleHalo',
    name: 'Double Halo',
    description: 'Two concentric glowing rings — teal outer, golden inner',
    minLevel: 40,
    tier: 3,
    icon: '🌀',
  },
  {
    id: 'godTierEmoji',
    name: 'God-Tier Emoji',
    description: 'Agent emoji upgrades to a unique god-tier variant (e.g. 🦊 → 🌌)',
    minLevel: 40,
    tier: 3,
    icon: '🌌',
  },
  {
    id: 'skillEcho',
    name: 'Skill Echo',
    description: 'Completed skills leave behind XP resonance shards for nearby agents',
    minLevel: 40,
    tier: 3,
    icon: '🔊',
  },
  // ── Level 50 — Ascended God-Tier ──────────────────────────────────
  {
    id: 'ascendedForm',
    name: 'Ascended Form',
    description: 'Agent scales up 15%, extra particle burst on idle, unique animation curve',
    minLevel: 50,
    tier: 4,
    icon: '🌟',
  },
  {
    id: 'swarmMaster',
    name: 'Swarm Master',
    description: 'Simultaneously orchestrate all orbiting agents as one cohesive unit',
    minLevel: 50,
    tier: 4,
    icon: '🐝',
  },
  {
    id: 'legacyMark',
    name: 'Legacy Mark',
    description: 'Agent leaves permanent stat bonuses on all future agents you create',
    minLevel: 50,
    tier: 4,
    icon: '🏛️',
  },
];

// ─── Core Functions ─────────────────────────────────────────────────────

/**
 * Check what god-tier unlocks are available at a given level.
 * Returns an object with boolean flags for each unlockable ability.
 *
 * @example
 * ```ts
 * const unlocks = checkGodTierUnlock(35);
 * // => { aura: true, crownBadge: true, ..., doubleHalo: false, ... }
 * ```
 */
export function checkGodTierUnlock(level: number): GodTierUnlocks {
  return {
    aura: level >= 30,
    crownBadge: level >= 30,
    premiumOrbitalRing: level >= 30,
    doubleHalo: level >= 40,
    godTierEmoji: level >= 40,
    ascendedForm: level >= 50,
    godTierCommand: level >= 30,
    soulboundSkill: level >= 30,
    auraPressure: level >= 30,
    timelord: level >= 30,
    skillEcho: level >= 40,
    swarmMaster: level >= 50,
    legacyMark: level >= 50,
  };
}

/**
 * Get a human-readable array of ability names unlocked at a given level.
 * Useful for display in the God-Tier modal or achievements panel.
 *
 * @example
 * ```ts
 * getGodTierAbilities(35)
 * // => ['God-Tier Aura', 'Crown Badge', 'Premium Orbital Ring', ...]
 * ```
 */
export function getGodTierAbilities(level: number): string[] {
  return ALL_ABILITIES
    .filter((a) => level >= a.minLevel)
    .map((a) => a.name);
}

/**
 * Get full ability descriptors for all abilities unlocked at this level.
 * Includes icons, descriptions, and tier info for rich UI rendering.
 */
export function getAbilitiesForLevel(level: number): GodTierAbilityDescriptor[] {
  return ALL_ABILITIES.filter((a) => level >= a.minLevel);
}

/**
 * Get the next ability milestone (minLevel) above the current level.
 * Returns null if all abilities are unlocked.
 */
export function getNextMilestone(level: number): number | null {
  const next = ALL_ABILITIES.find((a) => level < a.minLevel);
  return next?.minLevel ?? null;
}

/**
 * Calculate the god-tier visual tier for rendering:
 *   1 — normal (level < 30)
 *   2 — god-tier base (level 30-39)
 *   3 — advanced god-tier (level 40-49)
 *   4 — ascended (level 50+)
 */
export function getGodTierTier(level: number): 1 | 2 | 3 | 4 {
  if (level >= 50) return 4;
  if (level >= 40) return 3;
  if (level >= 30) return 2;
  return 1;
}

/**
 * Check if a specific ability is unlocked at a given level.
 */
export function hasAbility(level: number, abilityId: keyof GodTierUnlocks): boolean {
  return checkGodTierUnlock(level)[abilityId];
}
