"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { checkGodTierUnlock, getGodTierAbilities, getGodTierTier } from "./god-tier-engine";

// ─── Types ──────────────────────────────────────────────────────────────

export interface LevelProgressionState {
  /** Current agent level */
  level: number;
  /** Previous level (for detecting level-ups) */
  previousLevel: number;
  /** Whether a god-tier unlock happened this session */
  godTierUnlocked: boolean;
  /** Whether the god-tier modal should be shown */
  showGodModal: boolean;
  /** Whether the god-tier aura should be active */
  hasGodTierAura: boolean;
}

export interface LevelProgressionActions {
  /** Set the current level (will detect level-ups) */
  setLevel: (newLevel: number) => void;
  /** Mark the god-tier modal as dismissed */
  dismissGodModal: () => void;
  /** Add XP and potentially level up */
  addXp: (amount: number, currentXp: number, xpToNext: number) => number;
}

// ─── Hook ───────────────────────────────────────────────────────────────

const GOD_MODAL_SESSION_KEY = "titan_godtier_shown";

/**
 * Manages level progression state and detects god-tier unlock events.
 *
 * Handles:
 * - Level tracking with previous-level diff
 * - God-Tier unlock detection (level >= 30)
 * - One-time-per-session god-tier modal trigger
 * - God-Tier aura toggle
 *
 * @param initialLevel - Starting level (default 1)
 */
export function useLevelProgression(initialLevel = 1): [LevelProgressionState, LevelProgressionActions] {
  const [level, setLevelState] = useState(initialLevel);
  const [previousLevel, setPreviousLevel] = useState(initialLevel);
  const [showGodModal, setShowGodModal] = useState(false);
  const [godTierUnlocked, setGodTierUnlocked] = useState(false);
  const prevLevelRef = useRef(initialLevel);

  // Check session storage on mount for god-tier modal
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(GOD_MODAL_SESSION_KEY);
    const godTier = checkGodTierUnlock(level);

    if (godTier.aura && !alreadyShown) {
      setGodTierUnlocked(true);
      setShowGodModal(true);
      sessionStorage.setItem(GOD_MODAL_SESSION_KEY, "true");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLevel = useCallback((newLevel: number) => {
    const prev = prevLevelRef.current;

    // Detect level-up: only trigger if level actually increased
    if (newLevel > prev) {
      setPreviousLevel(prev);
      setLevelState(newLevel);
      prevLevelRef.current = newLevel;

      // Check if this level-up unlocks god-tier
      const prevGodTier = checkGodTierUnlock(prev);
      const newGodTier = checkGodTierUnlock(newLevel);

      // Level-up crossed the threshold: level was < 30, now >= 30
      if (!prevGodTier.aura && newGodTier.aura) {
        setGodTierUnlocked(true);
        setShowGodModal(true);
        sessionStorage.setItem(GOD_MODAL_SESSION_KEY, "true");
      }
    } else if (newLevel < prev) {
      // Allow level reset (e.g., for testing or hard reset)
      setPreviousLevel(prev);
      setLevelState(newLevel);
      prevLevelRef.current = newLevel;

      // If falling below god-tier, re-evaluate
      if (newLevel < 30) {
        setGodTierUnlocked(false);
      }
    }
  }, []);

  const dismissGodModal = useCallback(() => {
    setShowGodModal(false);
  }, []);

  /**
   * Add XP and return any level-ups that occurred.
   * Returns the new XP amount after accounting for level-ups.
   */
  const addXp = useCallback(
    (amount: number, currentXp: number, xpToNext: number): number => {
      let xp = currentXp + amount;
      let newLevel = level;

      while (xp >= xpToNext && xpToNext > 0) {
        xp -= xpToNext;
        newLevel += 1;
      }

      if (newLevel > level) {
        setLevel(newLevel);
      }

      return xp;
    },
    [level, setLevel]
  );

  const state: LevelProgressionState = {
    level,
    previousLevel,
    godTierUnlocked,
    showGodModal,
    hasGodTierAura: level >= 30,
  };

  const actions: LevelProgressionActions = {
    setLevel,
    dismissGodModal,
    addXp,
  };

  return [state, actions];
}
