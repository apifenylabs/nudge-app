'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { XpNotificationContext } from '@/hooks/useXpNotification';
import type { XpNotification } from '@/hooks/useXpNotification';

// ─── Styles (kept inline for consistency with existing Titan patterns) ────────

const TOAST_W = 320;

const TOAST_GAP = 12;

const COLORS: Record<string, string> = {
  bg: '#FFFFFF',
  border: '#E5E0D8',
  primary: '#1F1F1F',
  secondary: '#666666',
  accentTeal: '#0EA5A5',
  accentGold: '#D4A017',
  rankUpBg: '#FFFBE6',
  rankUpBorder: '#D4A01740',
};

// ─── Rank Thresholds (for auto-detecting rank-ups) ────────────────────────────

export const RANK_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5000];
export const RANK_NAMES = ['', 'Hatchling', 'Apprentice', 'Adept', 'Master', 'Grandmaster', 'Legend', 'God-Tier'];
export const RANK_EMOJIS = ['', '🥚', '🐣', '🦊', '🐉', '🦅', '🌟', '👑'];

function getRank(xp: number): { index: number; name: string; emoji: string } {
  let idx = 0;
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= RANK_THRESHOLDS[i]) { idx = i; break; }
  }
  return { index: idx, name: RANK_NAMES[idx] || '', emoji: RANK_EMOJIS[idx] || '' };
}

// ─── Single Toast Card ────────────────────────────────────────────────────────

function XpToast({ notif, onDismiss }: { notif: XpNotification; onDismiss: (id: string) => void }) {
  const isRankUp = notif.variant === 'rank-up';

  const avatarContent = isRankUp ? (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
      style={{
        background: 'linear-gradient(135deg, #D4A017, #F59E0B)',
        boxShadow: '0 0 12px rgba(212, 160, 23, 0.4)',
      }}
    >
      {notif.rankEmoji || '👑'}
    </div>
  ) : (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: '#0EA5A515' }}
    >
      <Sparkles className="h-5 w-5" style={{ color: '#0EA5A5' }} />
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
      className="relative rounded-xl border overflow-hidden cursor-pointer"
      style={{
        width: TOAST_W,
        background: isRankUp ? COLORS.rankUpBg : COLORS.bg,
        borderColor: isRankUp ? COLORS.rankUpBorder : COLORS.border,
        boxShadow: '0 8px 24px -6px rgba(31,31,31,0.12)',
      }}
      onClick={() => onDismiss(notif.id)}
    >
      {/* Sparkle particles for rank-up */}
      {isRankUp && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: '#D4A017' }}
              initial={{
                x: 60 + (i - 3) * 40,
                y: 50,
                opacity: 1,
              }}
              animate={{
                y: [50, -20],
                x: [60 + (i - 3) * 40, 60 + (i - 3) * 40 + (i % 2 === 0 ? 30 : -30)],
                opacity: [1, 0],
                scale: [1, 0.3],
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-3 p-3 relative z-10">
        {avatarContent}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-bold font-mono"
              style={{ color: isRankUp ? COLORS.accentGold : COLORS.primary }}
            >
              {isRankUp ? `Rank Up! ${notif.rankName || ''}` : `+${notif.amount} XP`}
            </span>
            {isRankUp && (
              <span className="text-base">{notif.rankEmoji || '👑'}</span>
            )}
          </div>
          <p
            className="text-[10px] font-mono mt-0.5 truncate"
            style={{ color: COLORS.secondary }}
          >
            {notif.source}
          </p>
          {/* Rank-up XP micro bar */}
          {isRankUp && notif.rankName && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #D4A017, #F59E0B)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <span className="text-[8px] font-mono" style={{ color: COLORS.accentGold }}>
                {notif.rankName}
              </span>
            </div>
          )}
          {/* Normal XP mini-bar */}
          {!isRankUp && (
            <div className="mt-1.5 flex items-center gap-1">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: COLORS.accentTeal }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (notif.amount / 500) * 100)}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[8px] font-mono shrink-0" style={{ color: COLORS.accentTeal }}>
                +{notif.amount}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Context Provider ─────────────────────────────────────────────────────────

export function XpNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<XpNotification[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const push = useCallback((
    amount: number,
    source: string,
    options?: { rankUp?: boolean; rankName?: string; rankEmoji?: string },
  ) => {
    counterRef.current += 1;
    const id = `xp-${Date.now()}-${counterRef.current}`;

    const notif: XpNotification = {
      id,
      amount,
      source,
      variant: options?.rankUp ? 'rank-up' : 'normal',
      rankName: options?.rankName,
      rankEmoji: options?.rankEmoji,
      timestamp: Date.now(),
    };

    setNotifications(prev => [...prev.slice(-4), notif]); // max 5 visible

    // Auto-dismiss after 4 seconds
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  // Clean up stale (shouldn't happen with auto-dismiss, but safety net)
  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setInterval(() => {
      const cutoff = Date.now() - 5000;
      setNotifications(prev => prev.filter(n => n.timestamp > cutoff));
    }, 1000);
    return () => clearInterval(timer);
  }, [notifications.length]);

  const value = useMemo(() => ({ notifications, push, dismiss }), [notifications, push, dismiss]);

  return (
    <XpNotificationContext.Provider value={value}>
      {children}

      {/* Toast Stack — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none"
        style={{ gap: TOAST_GAP }}
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <div key={n.id} className="pointer-events-auto">
              <XpToast notif={n} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </XpNotificationContext.Provider>
  );
}
