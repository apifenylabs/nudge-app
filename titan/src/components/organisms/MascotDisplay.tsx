import React, { useEffect, useState } from 'react';
import GodTierAura from '../molecules/GodTierAura';
import GodTierModal from './GodTierModal';
import Badge from '../ui/badge';

interface MascotDisplayProps {
  level: number;
  mascotName?: string;
  className?: string;
}

const MASCOT_STAGES = [
  { min: 1,  emoji: '🥚', label: 'Hatchling' },
  { min: 5,  emoji: '🐣', label: 'Apprentice' },
  { min: 10, emoji: '🦊', label: 'Adept' },
  { min: 15, emoji: '🐉', label: 'Master' },
  { min: 20, emoji: '🦅', label: 'Grandmaster' },
  { min: 25, emoji: '🌟', label: 'Legend' },
  { min: 30, emoji: '👑', label: 'God-Tier' },
];

function getStage(level: number): { emoji: string; label: string } {
  let stage = MASCOT_STAGES[0];
  for (const s of MASCOT_STAGES) {
    if (level >= s.min) stage = s;
  }
  return stage;
}

export default function MascotDisplay({ level, mascotName, className }: MascotDisplayProps) {
  const stage = getStage(level);
  const isGodTier = level >= 30;
  const [showGodModal, setShowGodModal] = useState(false);

  // Show the God-Tier modal on mount for level 30+
  useEffect(() => {
    if (isGodTier) {
      const shown = sessionStorage.getItem('titan_godtier_shown');
      if (!shown) {
        setShowGodModal(true);
        sessionStorage.setItem('titan_godtier_shown', 'true');
      }
    }
  }, [isGodTier]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        minHeight: 280,
      }}
    >
      {/* God-Tier Aura (only renders when level >= 30) */}
      {isGodTier && <GodTierAura level={level} size={280} />}

      {/* Mascot emoji */}
      <div
        style={{
          fontSize: 80,
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          filter: isGodTier ? 'brightness(1.2) drop-shadow(0 0 12px rgba(245, 158, 11, 0.5))' : 'none',
          transition: 'filter 0.5s ease',
        }}
      >
        {stage.emoji}
      </div>

      {/* Level badge */}
      <div style={{ marginTop: 12, position: 'relative', zIndex: 1 }}>
        <Badge level={level} variant="pill" />
      </div>

      {/* Stage label */}
      <div
        style={{
          marginTop: 6,
          fontSize: 14,
          fontWeight: 600,
          color: isGodTier ? '#F59E0B' : '#94a3b8',
          letterSpacing: 1,
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {stage.label}
      </div>

      {/* Mascot name */}
      {mascotName && (
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#64748b',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {mascotName}
        </div>
      )}

      {/* God-Tier ascension modal (shows once per session) */}
      {isGodTier && (
        <GodTierModal
          open={showGodModal}
          onClose={() => setShowGodModal(false)}
          level={level}
        />
      )}
    </div>
  );
}
