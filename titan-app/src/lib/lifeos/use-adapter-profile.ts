/**
 * LifeOS — Simplified Adapter Profile
 *
 * Simplified version for titan-app. Returns empty/null defaults since
 * adapter integrations (Oura, Headspace, Fitbit, etc.) are not wired
 * into the dashboard. Exists to satisfy PersonalityProfile imports.
 */

import type { MindfulnessSummary, HealthSummary, HobbySummary } from '@/lib/lifeos/plugin-adapters';

// ─── Types ─────────────────────────────────────────────────────────

export interface AdapterTraitBoost {
  breadth: number;
  depth: number;
  consistency: number;
  diversity: number;
  planning: number;
  wellness: number;
}

export interface AdapterSourceInfo {
  id: string;
  label: string;
  icon: string;
  connected: boolean;
}

// ─── Hook (simplified — no adapter data available) ─────────────────

export interface AdapterProfileData {
  adapterBoost: AdapterTraitBoost | null;
  hasAdapterData: boolean;
  adapterSources: AdapterSourceInfo[];
  mindfulnessSummary: MindfulnessSummary | null;
  healthSummary: HealthSummary | null;
  hobbySummary: HobbySummary | null;
}

export function useAdapterProfile(): AdapterProfileData {
  return {
    adapterBoost: null,
    hasAdapterData: false,
    adapterSources: [],
    mindfulnessSummary: null,
    healthSummary: null,
    hobbySummary: null,
  };
}

// ─── Formatting Utility ────────────────────────────────────────────

export function formatAdapterStats(
  _mindfulnessSummary: MindfulnessSummary | null,
  _healthSummary: HealthSummary | null,
  _hobbySummary: HobbySummary | null,
): { label: string; value: string; emoji: string; category: string }[] {
  return [];
}
