'use client';

import { Crown, Sparkles, Star, Award } from 'lucide-react';

interface EditorBadgeProps {
  variant?: 'editor-pick' | 'curated' | 'top-rated' | 'exclusive';
  label?: string;
  className?: string;
}

/**
 * EditorBadge — Cosme-style premium badge for editorial content.
 * 
 * Variants:
 * - 'editor-pick': Gold gradient, "Editor's Pick" (default)
 * - 'curated': Subtle gold border, "Curated Selection"
 * - 'top-rated': Dark gold, "Top Rated"
 * - 'exclusive': Champagne, "Exclusive"
 */
export default function EditorBadge({
  variant = 'editor-pick',
  label,
  className = '',
}: EditorBadgeProps) {
  const config = BADGE_CONFIG[variant];

  return (
    <div
      className={`editor-badge ${className}`}
      style={{
        background: config.background,
        color: config.textColor,
      }}
      role="status"
      aria-label={label || config.defaultLabel}
    >
      <config.icon
        size={10}
        className="shrink-0"
        style={{ color: config.textColor }}
        aria-hidden="true"
      />
      <span>{label || config.defaultLabel}</span>
    </div>
  );
}

const BADGE_CONFIG = {
  'editor-pick': {
    icon: Crown,
    background: 'linear-gradient(135deg, #D4AF37 0%, #C9A96E 50%, #B89628 100%)',
    textColor: '#0A0A0A',
    defaultLabel: "Editor's Pick",
  },
  'curated': {
    icon: Sparkles,
    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(201, 169, 110, 0.08))',
    textColor: '#C9A96E',
    defaultLabel: 'Curated Selection',
  },
  'top-rated': {
    icon: Award,
    background: 'linear-gradient(135deg, #8B6914 0%, #A0822A 50%, #8B6914 100%)',
    textColor: '#FFFDF7',
    defaultLabel: 'Top Rated',
  },
  'exclusive': {
    icon: Star,
    background: 'linear-gradient(135deg, #F7E8CE 0%, #E8DCC6 50%, #F7E8CE 100%)',
    textColor: '#1A1A2E',
    defaultLabel: 'Exclusive',
  },
};
