'use client';

import { ExternalLink, Sparkles, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAffiliateForTool, AffiliateLink } from '@/lib/affiliate-links';

interface AffiliateCTABarProps {
  toolSlug: string;
  toolName: string;
  websiteUrl: string;
  pricingMin?: number;
  pricingMax?: number;
  pricingTier: string;
}

function Badge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    'Best Value': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Most Popular': 'bg-neon/20 text-neon-light border-neon/30',
    'Free Tier': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'Pro Pick': 'bg-asia/20 text-asia border-asia/30',
    'Free Trial': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
        colors[label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      )}
    >
      <Sparkles className="w-2.5 h-2.5 mr-1" />
      {label}
    </span>
  );
}

export default function AffiliateCTABar({
  toolSlug,
  toolName,
  websiteUrl,
  pricingMin,
  pricingMax,
  pricingTier,
}: AffiliateCTABarProps) {
  const affiliate = getAffiliateForTool(toolSlug);

  // Build pricing range string
  const pricingText =
    pricingTier === 'Free'
      ? 'Free'
      : pricingTier === 'Open Source'
      ? 'Open Source'
      : pricingMin !== undefined
      ? `$${pricingMin}${pricingMax && pricingMax > pricingMin ? ` – $${pricingMax}` : pricingMax ? ` – $${pricingMax}` : '/mo'}${pricingMax ? '/mo' : '/mo'}`
      : 'See pricing';

  // Determine CTA text
  const ctaLabel = affiliate?.cta_label || `Visit ${toolName}`;
  const href = affiliate?.referral_url || websiteUrl;

  return (
    <div className="rounded-xl border border-tech-500/30 bg-gradient-to-r from-tech-700/90 to-tech-800/80 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Description */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white">Try {toolName}</h3>
            {affiliate?.badge && <Badge label={affiliate.badge} />}
            {!affiliate?.is_direct && pricingTier !== 'Free' && (
              <span className="text-[10px] text-tech-300 font-medium">Deep link</span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-tech-200">
            {affiliate?.commission_note || `${pricingTier} plan`}
            {pricingText !== 'See pricing' && pricingTier !== 'Free' && (
              <span className="text-tech-300"> · {pricingText}</span>
            )}
          </p>
          {affiliate?.is_direct && (
            <p className="text-[10px] text-neon-light mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Affiliate link — we may earn a commission at no extra cost to you
            </p>
          )}
          {!affiliate?.is_direct && (
            <p className="text-[10px] text-tech-300 mt-1 flex items-center gap-1">
              <Check className="w-3 h-3 text-tech-200" />
              Direct link to official site
            </p>
          )}
        </div>

        {/* Right: CTA button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap',
            affiliate?.is_direct
              ? 'bg-neon hover:bg-neon-dark text-white'
              : 'bg-tech-600 hover:bg-tech-500 text-white border border-tech-500/50 hover:border-neon/30'
          )}
        >
          <ExternalLink className="w-4 h-4" />
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
