"use client";

import { useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */

export interface EvolutionStage {
  rank: string;
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  accentColor: string;
  avatarEmoji: string;
  avatarDesc: string;
  stats: { label: string; value: number; max: number }[];
  abilities: string[];
  flavour: string;
  xpRequired: number;
}

export interface ProgressionProfile {
  id: string;
  display_name: string | null;
  current_rank: string;
  total_xp: number;
  tier: string | null;
  tutorial_seen: boolean | null;
  agents_created: number | null;
  agents_deployed: number | null;
  sandbox_sessions: number | null;
  unlocked_abilities: string[];
  first_agent_created: boolean | null;
  first_deploy: boolean | null;
  completed_tutorial: boolean | null;
}

export interface ProgressionData {
  profile: ProgressionProfile | null;
  currentStage: EvolutionStage;
  nextStage: EvolutionStage | null;
  xpProgress: number; // 0–1
  xpInRank: number;
  xpForNext: number;
  thresholds: { rank: string; xp_required: number }[] | null;
  loading: boolean;
  error: string | null;
}

/* ─────────────────────────────────────────────────────────────
   Evolution Stage Data (source of truth)
   ───────────────────────────────────────────────────────────── */

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    rank: 'E',
    title: 'Novice',
    subtitle: 'E-Rank — The Awakening',
    color: 'from-gray-400 to-gray-600',
    bgGradient: 'from-gray-900 via-slate-900 to-gray-950',
    accentColor: 'text-gray-300',
    avatarEmoji: '⚔️',
    avatarDesc: 'Fledgling hunter — just awakened. A single basic blade and raw instinct.',
    stats: [
      { label: 'STR', value: 20, max: 100 },
      { label: 'INT', value: 15, max: 100 },
      { label: 'AGI', value: 25, max: 100 },
      { label: 'ARC', value: 5, max: 100 },
    ],
    abilities: ['Basic Prompting', 'Single Agent Slot', 'Text-Only Responses'],
    flavour: '"Every legend begins with a single step through the gate. Yours starts now."',
    xpRequired: 0,
  },
  {
    rank: 'D',
    title: 'Recruit',
    subtitle: 'D-Rank — First Blood',
    color: 'from-green-500 to-green-700',
    bgGradient: 'from-gray-900 via-green-950 to-gray-950',
    accentColor: 'text-green-300',
    avatarEmoji: '🗡️',
    avatarDesc: 'Scarred but standing. Basic tools and the courage to use them.',
    stats: [
      { label: 'STR', value: 35, max: 100 },
      { label: 'INT', value: 30, max: 100 },
      { label: 'AGI', value: 40, max: 100 },
      { label: 'ARC', value: 15, max: 100 },
    ],
    abilities: ['Tool Integration', 'Web Search Access', 'File Handling', 'Basic Memory'],
    flavour: '"The low-rank dungeons teach you one thing: adapt or perish."',
    xpRequired: 100,
  },
  {
    rank: 'C',
    title: 'Veteran',
    subtitle: 'C-Rank — The Grinder',
    color: 'from-blue-500 to-blue-700',
    bgGradient: 'from-gray-900 via-blue-950 to-gray-950',
    accentColor: 'text-blue-300',
    avatarEmoji: '🛡️',
    avatarDesc: 'Seasoned by countless battles. Armour plates and elemental skills unlocked.',
    stats: [
      { label: 'STR', value: 50, max: 100 },
      { label: 'INT', value: 45, max: 100 },
      { label: 'AGI', value: 55, max: 100 },
      { label: 'ARC', value: 35, max: 100 },
    ],
    abilities: ['Advanced Memory (Context Recall)', 'Custom Knowledge Bases', '3 Agent Slots', 'Skill Specialization'],
    flavour: '"C-rank is where the weak get weeded out and the strong start to shine."',
    xpRequired: 350,
  },
  {
    rank: 'B',
    title: 'Hunter',
    subtitle: 'B-Rank — Elite Force',
    color: 'from-purple-500 to-fuchsia-700',
    bgGradient: 'from-gray-900 via-purple-950 to-gray-950',
    accentColor: 'text-purple-300',
    avatarEmoji: '🐉',
    avatarDesc: 'A predator among hunters. Multi-target engagement and advanced aura control.',
    stats: [
      { label: 'STR', value: 65, max: 100 },
      { label: 'INT', value: 60, max: 100 },
      { label: 'AGI', value: 70, max: 100 },
      { label: 'ARC', value: 55, max: 100 },
    ],
    abilities: ['Multi-Agent Orchestration', 'Parallel Execution', '5 Agent Slots', 'API & Webhook Access', 'Custom Skill Trees'],
    flavour: '"B-rank hunters don\'t wait for gates to open. They break them down."',
    xpRequired: 850,
  },
  {
    rank: 'A',
    title: 'Elite',
    subtitle: 'A-Rank — Reality Forger',
    color: 'from-amber-500 to-orange-700',
    bgGradient: 'from-gray-900 via-amber-950 to-gray-950',
    accentColor: 'text-amber-300',
    avatarEmoji: '⚡',
    avatarDesc: 'Reality bends around you. Tool synthesis, planning, and battlefield manipulation.',
    stats: [
      { label: 'STR', value: 80, max: 100 },
      { label: 'INT', value: 85, max: 100 },
      { label: 'AGI', value: 75, max: 100 },
      { label: 'ARC', value: 80, max: 100 },
    ],
    abilities: ['Tool Synthesis & Planning', 'Custom Training Pipelines', 'Unlimited Agent Variants', 'Private Deployment', 'Real-Time Strategy Mode'],
    flavour: '"The gate doesn\'t open for an A-rank. The gate opens BECAUSE of an A-rank."',
    xpRequired: 1850,
  },
  {
    rank: 'S',
    title: 'Sovereign',
    subtitle: 'S-Rank — Absolute Dominion',
    color: 'from-cyan-400 to-blue-600',
    bgGradient: 'from-gray-900 via-cyan-950 to-gray-950',
    accentColor: 'text-cyan-300',
    avatarEmoji: '👑',
    avatarDesc: 'You are no longer a hunter. You are the system. Autonomous agent armies obey your will.',
    stats: [
      { label: 'STR', value: 100, max: 100 },
      { label: 'INT', value: 100, max: 100 },
      { label: 'AGI', value: 100, max: 100 },
      { label: 'ARC', value: 100, max: 100 },
    ],
    abilities: [
      'Autonomous Agent Army',
      'Unlimited Orchestration',
      'Self-Improving Pipelines',
      'Full API Sovereignty',
      'Priority Infrastructure',
      'God-Tier Priority Support',
    ],
    flavour: '"There are hunters. And then there are Sovereigns. The gates bow to you."',
    xpRequired: 3850,
  },
];

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

/** Find the rank index for a given rank letter. Defaults to 0 (E). */
export function rankIndex(rank: string): number {
  return EVOLUTION_STAGES.findIndex((s) => s.rank === rank);
}

/** Calculate XP progress within current rank (0–1). */
export function xpProgressInRank(xp: number, currentRankIndex: number): number {
  const stage = EVOLUTION_STAGES[currentRankIndex];
  if (!stage) return 0;
  const nextStage = EVOLUTION_STAGES[currentRankIndex + 1];
  if (!nextStage) return 1; // S-rank is max
  const xpInRank = xp - stage.xpRequired;
  const xpNeeded = nextStage.xpRequired - stage.xpRequired;
  return Math.min(xpInRank / xpNeeded, 1);
}

/* ─────────────────────────────────────────────────────────────
   Mock data for demo / no-Supabase fallback
   ───────────────────────────────────────────────────────────── */

function mockProfile(rankLetter = 'E'): ProgressionProfile {
  const idx = rankIndex(rankLetter);
  const stage = EVOLUTION_STAGES[idx] || EVOLUTION_STAGES[0];
  const nextStage = EVOLUTION_STAGES[idx + 1];
  const xpFloor = stage.xpRequired;
  const xpCeil = nextStage ? nextStage.xpRequired : stage.xpRequired + 500;
  const mockXp = xpFloor + Math.floor((xpCeil - xpFloor) * 0.55);

  return {
    id: 'demo-user',
    display_name: 'Titan Hunter',
    current_rank: rankLetter,
    total_xp: mockXp,
    tier: rankLetter,
    tutorial_seen: false,
    agents_created: idx + 1,
    agents_deployed: Math.max(1, idx),
    sandbox_sessions: (idx + 1) * 3,
    unlocked_abilities: [...stage.abilities],
    first_agent_created: true,
    first_deploy: idx > 0,
    completed_tutorial: false,
  };
}

/* ─────────────────────────────────────────────────────────────
   Main hook
   ───────────────────────────────────────────────────────────── */

export function useProgression(profileId?: string) {
  const [data, setData] = useState<ProgressionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Expose a refresh function
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Determine caller rank from URL or default
      const id = profileId || 'demo-user';

      const res = await fetch(`/api/progression/${id}`);
      if (!res.ok) {
        // If 503 (Supabase not configured) or any error, fall back to mock
        throw new Error(res.status === 503 ? 'Supabase not configured' : `API error: ${res.status}`);
      }

      const json = await res.json();
      const profile: ProgressionProfile = json.profile;

      const currentRankIdx = rankIndex(profile.current_rank);
      const currentStage = EVOLUTION_STAGES[currentRankIdx] || EVOLUTION_STAGES[0];
      const nextStage = EVOLUTION_STAGES[currentRankIdx + 1] || null;

      const xpInRank = nextStage
        ? profile.total_xp - currentStage.xpRequired
        : profile.total_xp - currentStage.xpRequired;
      const xpNeeded = nextStage
        ? nextStage.xpRequired - currentStage.xpRequired
        : 1;
      const xpProgress = Math.min(Math.max(xpInRank / xpNeeded, 0), 1);
      const xpForNext = nextStage ? nextStage.xpRequired - profile.total_xp : 0;

      setData({
        profile,
        currentStage,
        nextStage,
        xpProgress,
        xpInRank: Math.max(xpInRank, 0),
        xpForNext: Math.max(xpForNext, 0),
        thresholds: json.thresholds,
        loading: false,
        error: null,
      });
    } catch (err) {
      // Fallback to mock data with a demo profile
      const profile = mockProfile('E');
      const currentRankIdx = rankIndex(profile.current_rank);
      const currentStage = EVOLUTION_STAGES[currentRankIdx] || EVOLUTION_STAGES[0];
      const nextStage = EVOLUTION_STAGES[currentRankIdx + 1] || null;

      const xpInRank = profile.total_xp - currentStage.xpRequired;
      const xpNeeded = nextStage
        ? nextStage.xpRequired - currentStage.xpRequired
        : 1;
      const xpProgress = Math.min(Math.max(xpInRank / xpNeeded, 0), 1);

      setData({
        profile,
        currentStage,
        nextStage,
        xpProgress,
        xpInRank: Math.max(xpInRank, 0),
        xpForNext: nextStage ? nextStage.xpRequired - profile.total_xp : 0,
        thresholds: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  // Load on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...data, loading, error, refresh } as ProgressionData & { refresh: () => Promise<void> };
}
