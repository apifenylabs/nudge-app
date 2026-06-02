'use client';

import { FC } from 'react';
import { Sparkles, Zap, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAffiliateForTool } from '@/lib/affiliate-links';

// ---------------------------------------------------------------------------
// AffiliateCard – a tasteful, contextual tool recommendation card
// ---------------------------------------------------------------------------
// Designed for embedding within blog post content and tool detail pages.
// Presents a single "Try this tool" callout with a subtle visual treatment.
// No banner ads, no popups – just a contextual recommendation.
//
// Usage:
//   <AffiliateCard
//     toolSlug="cursor"
//     toolName="Cursor"
//     context="coding"
//     description="The AI-first code editor that writes code 10x faster."
//   />
//
// When the slug matches an entry in affiliate-links.ts, it automatically
// picks up the affiliate URL, CTA label, and badge. Otherwise falls back
// to the provided props.
// ---------------------------------------------------------------------------

interface AffiliateCardProps {
  /** Tool slug (must match affiliate-links.ts) */
  toolSlug: string;
  /** Display name */
  toolName: string;
  /** Short context label (e.g. "coding", "writing", "design") */
  context?: string;
  /** Optional custom description (overrides affiliate-links data) */
  description?: string;
  /** Optional custom CTA text */
  ctaLabel?: string;
  /** Optional fallback URL */
  fallbackUrl?: string;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'inline';
  /** Extra classes */
  className?: string;
  /** Click handler for analytics */
  onClick?: () => void;
}

const AffiliateCard: FC<AffiliateCardProps> = ({
  toolSlug,
  toolName,
  context,
  description,
  ctaLabel,
  fallbackUrl,
  variant = 'default',
  className,
  onClick,
}) => {
  const affiliate = getAffiliateForTool(toolSlug);
  const href = affiliate?.referral_url || fallbackUrl || '#';
  const cta = ctaLabel || affiliate?.cta_label || `Try ${toolName} →`;
  const desc = description || affiliate?.commission_note || `Learn more about ${toolName}`;
  const badge = affiliate?.badge || (affiliate?.is_direct ? undefined : undefined);
  const isDirect = affiliate?.is_direct ?? false;

  if (!href || href === '#') return null;

  // ── Compact variant (small inline card) ──
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-gradient-to-r from-tech-700/60 to-tech-800/40',
          'border border-tech-500/20 hover:border-neon/20',
          'transition-all duration-150 group',
          className
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-neon-light shrink-0" />
        <span className="text-xs text-tech-100">
          <strong className="text-white">{toolName}</strong>
          {context && <span className="text-tech-300"> for {context}</span>}
        </span>
        <a
          href={href}
          target="_blank"
          rel={isDirect ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
          className="ml-auto text-xs font-medium text-neon-light hover:text-neon shrink-0 flex items-center gap-1"
          onClick={onClick}
          aria-label={`Try ${toolName}`}
        >
          {cta.replace('→', '')}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // ── Inline variant (sits within a paragraph as a note) ──
  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel={isDirect ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-medium',
          'text-neon-light hover:text-neon transition-colors',
          'underline decoration-neon/30 hover:decoration-neon/60 underline-offset-2',
          className
        )}
        onClick={onClick}
        aria-label={`Try ${toolName}`}
      >
        <Zap className="w-3 h-3" />
        {cta}
      </a>
    );
  }

  // ── Default variant (full recommendation card) ──
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        'border border-tech-500/20',
        'bg-gradient-to-br from-tech-700/60 via-tech-800/40 to-tech-900/30',
        'p-5 sm:p-6',
        'transition-all duration-200',
        'hover:border-neon/20',
        className
      )}
    >
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4">
        {/* Left: Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neon/20 to-neon/5 flex items-center justify-center border border-neon/10">
          <Sparkles className="w-5 h-5 text-neon-light" />
        </div>

        {/* Center: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="text-sm font-semibold text-white">{toolName}</h4>
            {badge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border bg-neon/20 text-neon-light border-neon/30">
                <Sparkles className="w-2.5 h-2.5" />
                {badge}
              </span>
            )}
            {isDirect && (
              <span className="text-[10px] text-neon-light/60 font-medium">Affiliate</span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-tech-200 leading-relaxed">
            {desc}
          </p>

          {context && (
            <p className="text-[11px] text-tech-300 mt-1">
              Best for: <span className="text-tech-100 capitalize">{context}</span>
            </p>
          )}
        </div>

        {/* Right: CTA */}
        <a
          href={href}
          target="_blank"
          rel={isDirect ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium',
            'whitespace-nowrap shrink-0 transition-all duration-150',
            'active:scale-[0.97]',
            isDirect
              ? 'bg-neon hover:bg-neon-dark text-white shadow-sm shadow-neon/10'
              : 'bg-tech-600 hover:bg-tech-500 text-white border border-tech-500/40 hover:border-neon/20'
          )}
          onClick={onClick}
          aria-label={`${isDirect ? 'Affiliate link — ' : ''}Try ${toolName}`}
        >
          <span>{cta}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>

      {/* Affiliate disclosure – subtle footnote */}
      {isDirect && (
        <p className="relative z-10 text-[10px] text-tech-400 mt-3 pt-2 border-t border-tech-500/10">
          We may earn a commission at no extra cost to you when you sign up through this link.
        </p>
      )}
    </div>
  );
};

export default AffiliateCard;
