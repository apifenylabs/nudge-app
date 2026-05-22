/**
 * Titan Persistence Layer
 * Local-fallback storage with localStorage.
 * Future: add dual-write to Supabase when connected.
 */

// ─── Key constants ──────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  SKILLS: 'titan-skills',
  ORCHESTRATIONS: 'titan-orchestrations',
  AUDITS: 'titan-audits',
  FEED: 'titan-feed',
  PROGRESSION: 'titan-progression',
  ACHIEVEMENTS: 'titan-achievements',
  SWARM_ORDER: 'titan-swarm-order',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ─── Storage Adapter ────────────────────────────────────────────────────

export interface StorageAdapter {
  get<T>(key: StorageKey): T | null;
  set<T>(key: StorageKey, value: T): void;
  remove(key: StorageKey): void;
}

/**
 * LocalStorage implementation with safe try/catch for SSR and quota errors.
 */
export class LocalStorageAdapter implements StorageAdapter {
  get<T>(key: StorageKey): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: StorageKey, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[persistence] Failed to write "${key}":`, e);
    }
  }

  remove(key: StorageKey): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

// ─── Singleton ──────────────────────────────────────────────────────────

export const storage = new LocalStorageAdapter();

// ─── Typed helpers ──────────────────────────────────────────────────────

import type { Skill } from '@/types';

export interface AuditRecord {
  skillId: string;
  skillName: string;
  score: number;
  tier: 'gold' | 'silver' | 'bronze' | 'uncertified';
  timestamp: string;
  violations: string[];
}

export interface FeedEntry {
  id: string;
  avatar: string;
  name: string;
  text: string;
  time: string;
  type: 'levelup' | 'achievement' | 'task' | 'insight';
  read?: boolean;
}

export interface ProgressionData {
  totalXp: number;
  totalTasksRun: number;
  skillsCertified: number;
  goldSkills: number;
  achievements: string[];
  lastSavedAt: string;
}

export interface OrchestrationConfig {
  id: string;
  name: string;
  agentIds: string[];
  connections: { source: string; target: string; relationship: string }[];
  savedAt: string;
}

// Convenience getters/setters

export function loadSkills(): Skill[] {
  return storage.get<Skill[]>(STORAGE_KEYS.SKILLS) ?? [];
}

export function saveSkills(skills: Skill[]): void {
  storage.set(STORAGE_KEYS.SKILLS, skills);
}

export function loadProgression(): ProgressionData {
  return storage.get<ProgressionData>(STORAGE_KEYS.PROGRESSION) ?? {
    totalXp: 0,
    totalTasksRun: 0,
    skillsCertified: 0,
    goldSkills: 0,
    achievements: [],
    lastSavedAt: '',
  };
}

export function saveProgression(data: ProgressionData): void {
  storage.set(STORAGE_KEYS.PROGRESSION, data);
}

export function loadFeed(): FeedEntry[] {
  return storage.get<FeedEntry[]>(STORAGE_KEYS.FEED) ?? [];
}

export function saveFeed(entries: FeedEntry[]): void {
  // Cap at 50 entries, oldest dropped
  const capped = entries.slice(0, 50);
  storage.set(STORAGE_KEYS.FEED, capped);
}

export function loadAudits(): AuditRecord[] {
  return storage.get<AuditRecord[]>(STORAGE_KEYS.AUDITS) ?? [];
}

export function saveAudits(audits: AuditRecord[]): void {
  storage.set(STORAGE_KEYS.AUDITS, audits);
}

export function loadOrchestrations(): OrchestrationConfig[] {
  return storage.get<OrchestrationConfig[]>(STORAGE_KEYS.ORCHESTRATIONS) ?? [];
}

export function saveOrchestrations(orchs: OrchestrationConfig[]): void {
  storage.set(STORAGE_KEYS.ORCHESTRATIONS, orchs);
}

export function loadAchievements(): string[] {
  return storage.get<string[]>(STORAGE_KEYS.ACHIEVEMENTS) ?? [];
}

export function saveAchievements(achievements: string[]): void {
  storage.set(STORAGE_KEYS.ACHIEVEMENTS, achievements);
}
