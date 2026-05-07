// ═══════════════════════════════════════════════
// APIFENY.AI — Utility Functions
// ═══════════════════════════════════════════════

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function getPricingLabel(tier: string): string {
  const labels: Record<string, string> = {
    'Free': 'Free',
    'Freemium': 'Free',
    'Paid': 'Paid',
    'Enterprise': 'Enterprise',
    'Open Source': 'Open Source',
  };
  return labels[tier] || tier;
}

export function getPricingColor(tier: string): string {
  const colors: Record<string, string> = {
    'Free': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Freemium': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'Paid': 'bg-neon/20 text-neon-light border-neon/30',
    'Enterprise': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Open Source': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  return colors[tier] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

export function getAsiaScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-asia';
  if (score >= 4) return 'text-amber-400';
  return 'text-gray-500';
}

export function getAsiaScoreBg(score: number): string {
  if (score >= 8) return 'bg-emerald-500/20 border-emerald-500/30';
  if (score >= 6) return 'bg-asia/20 border-asia/30';
  if (score >= 4) return 'bg-amber-500/20 border-amber-500/30';
  return 'bg-gray-500/20 border-gray-500/30';
}

export function renderStars(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full');
    else if (rating >= i - 0.5) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}
