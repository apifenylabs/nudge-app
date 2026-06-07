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
    'Free': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Freemium': 'bg-sky-100 text-sky-700 border-sky-200',
    'Paid': 'bg-neon/20 text-neon-light border-neon/30',
    'Enterprise': 'bg-amber-100 text-amber-700 border-amber-200',
    'Open Source': 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return colors[tier] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export function getAsiaScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-asia';
  if (score >= 4) return 'text-amber-400';
  return 'text-gray-500';
}

export function getAsiaScoreColorLight(score: number): string {
  if (score >= 8) return 'text-emerald-600';
  if (score >= 6) return 'text-amber-600';
  if (score >= 4) return 'text-orange-500';
  return 'text-gray-400';
}

export function getAsiaScoreBg(score: number): string {
  if (score >= 8) return 'bg-emerald-100 border-emerald-200';
  if (score >= 6) return 'bg-asia/20 border-asia/30';
  if (score >= 4) return 'bg-amber-100 border-amber-200';
  return 'bg-gray-100 border-gray-200';
}

export function getAsiaScoreBgLight(score: number): string {
  if (score >= 8) return 'bg-emerald-100 border-emerald-200';
  if (score >= 6) return 'bg-amber-100 border-amber-200';
  if (score >= 4) return 'bg-orange-100 border-orange-200';
  return 'bg-gray-100 border-gray-200';
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

/**
 * Pipeline Stage Badge System
 * Maps pipeline stages to display badges with label, color, and icon.
 */
export function getPipelineStageBadge(stage: string): { label: string; color: string; icon: string } {
  const badges: Record<string, { label: string; color: string; icon: string }> = {
    'planning':     { label: 'Strategic Planning', color: 'bg-violet-100 text-violet-700 border-violet-200', icon: '🧠' },
    'ideation':     { label: 'Ideation',           color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200', icon: '💡' },
    'research':     { label: 'Research',           color: 'bg-cyan-100 text-cyan-700 border-cyan-200', icon: '🔬' },
    'coding':       { label: 'Coding',             color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '💻' },
    'review':       { label: 'Review/Testing',     color: 'bg-amber-100 text-amber-700 border-amber-200', icon: '✅' },
    'deployment':   { label: 'Deployment',         color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: '🚀' },
    'content':      { label: 'Content',            color: 'bg-pink-100 text-pink-700 border-pink-200', icon: '✍️' },
    'marketing':    { label: 'Marketing',          color: 'bg-orange-100 text-orange-700 border-orange-200', icon: '📊' },
    'build':        { label: 'Agent Building',     color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '🤖' },
    'monetization': { label: 'Monetization',       color: 'bg-green-100 text-green-700 border-green-200', icon: '💰' },
  };
  return badges[stage] || { label: 'General', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '📌' };
}
