/**
 * God-Tier Engine — Self-evolving skills, robotics manifests, final progression.
 * Phase 6 deliverable — the capstone.
 *
 * Unlock thresholds:
 *   Level 30+  : God-Tier Aura, Crown Badge, Premium Orbital Ring, basic abilities
 *   Level 40+  : Double Halo, God-Tier Emoji, advanced abilities
 *   Level 50+  : Ascended Form, ultimate abilities
 */
import type { Skill, MemoryEntry } from '@/types';

export interface RoboticsManifest {
  agentId: string;
  hardwareCompatibility: string[];     // e.g. ['ros2', 'arduino', 'esp32']
  motorSkills: string[];
  sensorInputs: string[];
  safetyConstraints: string[];
  embodimentType: 'humanoid' | 'drone' | 'arm' | 'mobile_base' | 'abstract';
}

export interface EvolvedSkill {
  originalSkillId: string;
  version: string;
  suggestions: string[];
  improvedSkillMd: string;
}

/** Unlockable god-tier ability descriptor */
export interface GodTierAbility {
  id: string;
  name: string;
  description: string;
  minLevel: number;
  icon: string;
  type: 'visual' | 'command' | 'passive' | 'social';
  earned: boolean;
}

/** Result of a god-tier unlock check */
export interface GodTierStatus {
  level: number;
  totalXp: number;
  isGodTier: boolean;
  unlockedAbilities: GodTierAbility[];
  godTierScore: number;
  nextAbilityAt: number;
}

// ─── All possible god-tier abilities ───────────────────────────────────

export const ALL_ABILITIES: GodTierAbility[] = [
  // Level 30 — base god-tier
  { id: 'aura',          name: 'God-Tier Aura',         description: 'Golden radial gradient pulse aura',             minLevel: 30, icon: '✨', type: 'visual',   earned: false },
  { id: 'crown',         name: 'Crown Badge',            description: 'Level badge transforms into 👑 with sparkles',  minLevel: 30, icon: '👑', type: 'visual',   earned: false },
  { id: 'orbital-ring',  name: 'Premium Orbital Ring',   description: 'Outer orbit ring upgrades to shimmering gold',  minLevel: 30, icon: '💫', type: 'visual',   earned: false },
  { id: 'god-command',   name: 'God-Tier Command',       description: 'Command up to 5 orbiting agents simultaneously', minLevel: 30, icon: '🗣️', type: 'command', earned: false },
  { id: 'soulbound',     name: 'Soulbound Skill',        description: 'One skill can never be lost or overwritten',     minLevel: 30, icon: '🔒', type: 'passive',  earned: false },
  { id: 'aura-pressure', name: 'Aura Pressure',          description: 'Nearby agents in swarm gain +10% XP bonus',     minLevel: 30, icon: '⚡', type: 'passive',  earned: false },
  // Level 40
  { id: 'double-halo',   name: 'Double Halo',            description: 'Two concentric glowing rings (teal outer, golden inner)', minLevel: 40, icon: '🌀', type: 'visual', earned: false },
  { id: 'god-emoji',     name: 'God-Tier Emoji',         description: 'Agent emoji upgraded to unique variant',        minLevel: 40, icon: '🌌', type: 'visual',   earned: false },
  { id: 'timelord',      name: 'Timelord',               description: 'Agent can run cron/BAU schedules autonomously',  minLevel: 40, icon: '⏳', type: 'command',  earned: false },
  { id: 'echo',          name: 'Skill Echo',             description: 'Completed skills leave behind XP resonance shards', minLevel: 40, icon: '🔊', type: 'passive', earned: false },
  // Level 50
  { id: 'ascended',      name: 'Ascended Form',          description: 'Agent scales up 15%, extra particle burst, unique animation curve', minLevel: 50, icon: '🌟', type: 'visual', earned: false },
  { id: 'swarm-master',  name: 'Swarm Master',           description: 'Simultaneously orchestrate all orbiting agents as one unit', minLevel: 50, icon: '🐝', type: 'command', earned: false },
  { id: 'legacy',        name: 'Legacy Mark',            description: 'Agent leaves permanent stat bonuses on all future agents', minLevel: 50, icon: '🏛️', type: 'passive', earned: false },
];

// ─── God-tier score calculation ────────────────────────────────────────

/**
 * Calculate god-tier achievement score (0-100).
 * Based on completed phases, certified skills, and tasks completed.
 */
export function calculateGodTierScore(
  completedPhases: number,
  certifiedSkills: number,
  tasksCompleted: number,
): number {
  const phaseScore = Math.min(completedPhases * 15, 90);   // 6 phases × 15 = 90 max
  const skillScore = Math.min(certifiedSkills * 2, 8);     // max 8
  const taskScore = Math.min(Math.floor(tasksCompleted / 10), 2); // max 2
  return Math.min(phaseScore + skillScore + taskScore, 100);
}

/**
 * Compute god-tier status for a given level and XP.
 */
export function getGodTierStatus(level: number, totalXp: number, completedPhases: number, certifiedSkills: number, tasksCompleted: number): GodTierStatus {
  const isGodTier = level >= 30;
  const score = calculateGodTierScore(completedPhases, certifiedSkills, tasksCompleted);

  const unlockedAbilities = ALL_ABILITIES
    .filter(a => level >= a.minLevel)
    .map(a => ({ ...a, earned: true }));

  // Find the next ability the user hasn't reached yet
  const nextAbility = ALL_ABILITIES.find(a => level < a.minLevel);

  return {
    level,
    totalXp,
    isGodTier,
    unlockedAbilities,
    godTierScore: score,
    nextAbilityAt: nextAbility?.minLevel ?? 50,
  };
}

/**
 * Get the visual tier number (1-3) for rendering.
 * Level 1-29 → tier 1, level 30-39 → tier 2, level 40-49 → tier 3, level 50+ → tier 3+
 */
export function getVisualTier(level: number): 1 | 2 | 3 {
  if (level >= 40) return 3;
  if (level >= 30) return 2;
  return 1;
}

/**
 * Check if a specific ability is unlocked at this level.
 */
export function hasAbility(level: number, abilityId: string): boolean {
  const ability = ALL_ABILITIES.find(a => a.id === abilityId);
  if (!ability) return false;
  return level >= ability.minLevel;
}

/**
 * Get all abilities unlocked at this level.
 */
export function getAbilitiesForLevel(level: number): GodTierAbility[] {
  return ALL_ABILITIES
    .filter(a => level >= a.minLevel)
    .map(a => ({ ...a, earned: true }));
}

// ─── Skill evolution ───────────────────────────────────────────────────

/**
 * Load memory graph for a skill and evolve it using suggestions.
 */
export async function evolveSkill(skillId: string): Promise<EvolvedSkill> {
  // 1. Load memory graph entries related to this skill
  const memoryEntries: MemoryEntry[] = await loadMemoryForSkill(skillId);
  const failureCount = memoryEntries.filter((e) => e.entity.includes('error')).length;
  const successEntries = memoryEntries.filter((e) => e.entity === 'success_rate');

  console.log(`[GodTier] Evolving skill ${skillId} from ${memoryEntries.length} memory entries (${failureCount} failures)`);

  // 2. Generate improvement suggestions based on memory data
  const suggestions: string[] = [];

  if (failureCount > 2) {
    suggestions.push(`Add error recovery — memory shows ${failureCount} failures`);
  }

  const hasSuccessData = successEntries.length > 0;
  if (hasSuccessData) {
    const avgRate = successEntries.reduce((s, e) => s + (e.value as { rate: number }).rate, 0) / successEntries.length;
    if (avgRate > 0.9) {
      suggestions.push('Skill is at high proficiency — consider parallel execution branches');
    } else if (avgRate < 0.6) {
      suggestions.push('Optimize for lower token usage and add retry logic');
    }
  }

  suggestions.push('Add error recovery path');
  suggestions.push('Optimize for lower token usage');
  suggestions.push('Add parallel execution branch');

  // 3. Return evolved version
  return {
    originalSkillId: skillId,
    version: '2.0.0',
    suggestions: [...new Set(suggestions)], // deduplicate
    improvedSkillMd: `---\nname: "Evolved Skill"\nversion: "2.0.0"\n---\n\n## Evolved Instructions\nOptimized from ${memoryEntries.length} executions (${failureCount} failures).\n\n### Improvements\n${[...new Set(suggestions)].map(s => `- ${s}`).join('\n')}\n`,
  };
}

// ─── Robotics manifest ─────────────────────────────────────────────────

/**
 * Generate a robotics-compatible embodiment manifest for a given agent.
 */
export function getRoboticsManifest(agentId: string): RoboticsManifest {
  return {
    agentId,
    hardwareCompatibility: ['ros2', 'arduino', 'esp32', 'i2c'],
    motorSkills: ['navigate', 'grasp', 'orient'],
    sensorInputs: ['camera', 'lidar', 'touch', 'microphone'],
    safetyConstraints: [
      'emergency_stop_required',
      'max_speed_0.5mps',
      'no_autonomous_weapons',
    ],
    embodimentType: 'abstract',
  };
}

// ─── Private helpers ────────────────────────────────────────────────────

async function loadMemoryForSkill(_skillId: string): Promise<MemoryEntry[]> {
  // In production: query Supabase memory_graph by skill_id
  return [
    {
      id: 'm1',
      agentId: 'a1',
      entity: 'error_timeout',
      value: { count: 3, last: '2026-05-20' },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'm2',
      agentId: 'a1',
      entity: 'success_rate',
      value: { rate: 0.87, total: 47 },
      lastUpdated: new Date().toISOString(),
    },
  ];
}
