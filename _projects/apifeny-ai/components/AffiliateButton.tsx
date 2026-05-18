'use client';

import { FC } from 'react';
import { ExternalLink, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAffiliateForTool } from '@/lib/affiliate-links';

// ---------------------------------------------------------------------------
// AffiliateButton – a general-purpose affiliate CTA for AI tools
// ---------------------------------------------------------------------------
// Unlike the travel-focused AffiliateLink (components/affiliate/AffiliateLink.tsx),
// this component uses the tool slug to look up affiliate data from affiliate-links.ts,
// supporting all AI tools (ChatGPT, Claude, Gemini, Midjourney, etc.).
//
// Props: style can be 'primary' (neon, most visible), 'ghost' (subtle), or 'small'
// ---------------------------------------------------------------------------

interface AffiliateButtonProps {
  /** Tool slug to look up affiliate link data */
  toolSlug: string;
  /** Tool display name */
  toolName: string;
  /** Fallback URL if no affiliate data exists */
  fallbackUrl?: string;
  /** Visual style variant */
  variant?: 'primary' | 'ghost' | 'small';
  /** Optional extra CSS classes */
  className?: string;
  /** Optional click handler for analytics */
  onClick?: () => void;
}

const AffiliateButton: FC<AffiliateButtonProps> = ({
  toolSlug,
  toolName,
  fallbackUrl,
  variant = 'primary',
  className,
  onClick,
}) => {
  const affiliate = getAffiliateForTool(toolSlug);
  const href = affiliate?.referral_url || fallbackUrl || '#';
  const label = affiliate?.cta_label || `Visit ${toolName}`;
  const isDirectAffiliate = affiliate?.is_direct ?? false;

  if (!href || href === '#') return null;

  const variantStyles = {
    primary: cn(
      'inline-flex items-center justify-center gap-2',
      'px-5 py-2.5 rounded-lg text-sm font-medium',
      'bg-neon hover:bg-neon-dark text-white',
      'hover:shadow-lg hover:shadow-neon/20',
      'active:scale-[0.97]',
      'transition-all duration-150'
    ),
    ghost: cn(
      'inline-flex items-center justify-center gap-2',
      'px-4 py-2 rounded-lg text-xs font-medium',
      'bg-tech-600 hover:bg-tech-500 text-white',
      'border border-tech-500/50 hover:border-neon/30',
      'active:scale-[0.97]',
      'transition-all duration-150'
    ),
    small: cn(
      'inline-flex items-center justify-center gap-1.5',
      'px-3 py-1.5 rounded-md text-[11px] font-medium',
      'bg-tech-600/80 hover:bg-neon/20 text-tech-100 hover:text-neon-light',
      'border border-tech-500/30 hover:border-neon/30',
      'active:scale-[0.97]',
      'transition-all duration-150'
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel={isDirectAffiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
      className={cn(variantStyles[variant], className)}
      onClick={onClick}
      aria-label={`${isDirectAffiliate ? 'Affiliate link — ' : ''}Visit ${toolName}`}
    >
      {variant === 'small' ? (
        <>
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </>
      ) : (
        <>
          {isDirectAffiliate ? (
            <Zap className="w-4 h-4 shrink-0" />
          ) : (
            <ExternalLink className="w-4 h-4 shrink-0" />
          )}
          <span>{label}</span>
          {affiliate?.badge && (
            <Sparkles className="w-3 h-3 shrink-0 text-amber-300" />
          )}
        </>
      )}
    </a>
  );
};

// ---------------------------------------------------------------------------
// AffiliateBadge – small coloured tag shown beside affiliate buttons
// ---------------------------------------------------------------------------

interface AffiliateBadgeProps {
  label: string;
  className?: string;
}

const badgeColorMap: Record<string, string> = {
  'Best Value': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Most Popular': 'bg-neon/20 text-neon-light border-neon/30',
  'Free Tier': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Pro Pick': 'bg-asia/20 text-asia border-asia/30',
  'Free Trial': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export const AffiliateBadge: FC<AffiliateBadgeProps> = ({ label, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border',
        badgeColorMap[label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        className
      )}
    >
      <Sparkles className="w-2.5 h-2.5" />
      {label}
    </span>
  );
};

export default AffiliateButton;
