'use client';

import { useEffect, useRef } from 'react';
import { useXpNotification } from '@/hooks/useXpNotification';

// ─── Shared Rank Definitions (mirror XpNotificationProvider) ────────────

export const RANK_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5000];
export const RANK_NAMES = ['', 'Hatchling', 'Apprentice', 'Adept', 'Master', 'Grandmaster', 'Legend', 'God-Tier'];
export const RANK_EMOJIS = ['', '🥚', '🐣', '🦊', '🐉', '🦅', '🌟', '👑'];

export function getRankFromXp(xp: number): { index: number; name: string; emoji: string } {
  let idx = 0;
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= RANK_THRESHOLDS[i]) { idx = i; break; }
  }
  return { index: idx, name: RANK_NAMES[idx] || '', emoji: RANK_EMOJIS[idx] || '' };
}

// ─── Level Calculation ──────────────────────────────────────────────────

/**
 * Derive level from total XP using Titan's XP-per-level formula.
 * Level 1 at 0 XP, then 500 XP per level.
 */
export function getLevelFromXp(totalXp: number): number {
  return Math.max(1, Math.floor(totalXp / 500) + 1);
}

// ─── Level-Up Watcher ──────────────────────────────────────────────────

/**
 * Watches `totalXp` for level changes and pushes rank-up XP notifications
 * whenever the user crosses a level boundary.
 *
 * Integrate this at the layout level or any page that owns progression state.
 *
 * @param totalXp - Current total XP (from progression store)
 * @param enabled - Whether the watcher is active (default true)
 */
export function useLevelUpWatcher(totalXp: number, enabled = true): void {
  const xpNotif = useXpNotification();
  const prevLevelRef = useRef<number>(getLevelFromXp(totalXp));
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const currentLevel = getLevelFromXp(totalXp);
    const prevLevel = prevLevelRef.current;

    // Skip the very first render — only detect *changes*
    if (!initializedRef.current) {
      initializedRef.current = true;
      prevLevelRef.current = currentLevel;
      return;
    }

    // Detect level-up
    if (currentLevel > prevLevel) {
      const levelsGained = currentLevel - prevLevel;

      // Get rank info for the new level based on cumulative XP
      const baseRank = getRankFromXp(totalXp);
      const rankName = baseRank.name || `Level ${currentLevel}`;
      const rankEmoji = baseRank.emoji || '⬆️';

      // Fire rank-up notification (one per level gained)
      xpNotif.push(levelsGained * 100, `Level Up! Now Lv.${currentLevel} — ${rankName}`, {
        rankUp: true,
        rankName: `Lv.${currentLevel} ${rankName}`,
        rankEmoji,
      });

      prevLevelRef.current = currentLevel;
    }
  }, [totalXp, enabled, xpNotif]);
}
