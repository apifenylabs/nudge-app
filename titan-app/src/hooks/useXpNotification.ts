'use client';

import { createContext, useContext, useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface XpNotification {
  id: string;
  amount: number;
  source: string;
  variant: 'normal' | 'rank-up';
  rankName?: string;
  rankEmoji?: string;
  timestamp: number;
}

interface XpNotificationContextValue {
  notifications: XpNotification[];
  push: (amount: number, source: string, options?: { rankUp?: boolean; rankName?: string; rankEmoji?: string }) => void;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const XpNotificationContext = createContext<XpNotificationContextValue>({
  notifications: [],
  push: () => {},
  dismiss: () => {},
});

export function useXpNotification() {
  return useContext(XpNotificationContext);
}

// ─── Provider (re-exported for convenience; actual React node in component) ──

export type { XpNotificationContextValue };
