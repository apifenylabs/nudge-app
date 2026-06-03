'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAffiliateForTool } from '@/lib/affiliate-links';

// ---------------------------------------------------------------------------
// StickyAffiliateBar – a persistent bottom-of-viewport CTA for monetizable
// AI tool listing pages. Appears after the user scrolls past the hero, stays
// visible with a dismiss option, and links directly to the affiliate/referral
// URL. Only renders for tools with is_direct === true (commission-bearing).
// ---------------------------------------------------------------------------

interface StickyAffiliateBarProps {
  toolSlug: string;
  toolName: string;
}

export default function StickyAffiliateBar({ toolSlug, toolName }: StickyAffiliateBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const affiliate = getAffiliateForTool(toolSlug);

  // Only show for commission-bearing tools
  const shouldRender = affiliate?.is_direct === true;

  useEffect(() => {
    if (!shouldRender) return;

    const handleScroll = () => {
      // Show after scrolling past 600px (past hero + intro)
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= 600) {
        setVisible(false);
      }
    };

    // Debounced scroll listener
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed, shouldRender]);

  if (!shouldRender) return null;

  const href = affiliate?.referral_url || '#';

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 transition-all duration-400 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      )}
    >
      {/* Desktop: sleek bar */}
      <div className="hidden sm:block bg-gradient-to-r from-tech-900/95 via-tech-800/95 to-tech-900/95 border-t border-neon/20 backdrop-blur-md shadow-lg shadow-neon/5">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-neon-light shrink-0" />
            <span className="text-sm text-tech-100">
              <span className="font-semibold text-white">{toolName}</span>
              {' — '}
              <span className="text-tech-300">{affiliate?.commission_note?.split('.')[0] || 'Try it free'}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-sm font-medium transition shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {affiliate?.cta_label || 'Get Started'}
            </a>
            <button
              onClick={() => { setDismissed(true); setVisible(false); }}
              className="p-1.5 rounded-lg text-tech-400 hover:text-white hover:bg-tech-700 transition"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: compact bar */}
      <div className="sm:hidden bg-gradient-to-r from-tech-900/98 to-tech-800/98 border-t border-neon/20 backdrop-blur-md">
        <div className="px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3 h-3 text-neon-light shrink-0" />
              <span className="text-xs font-semibold text-white truncate">{toolName}</span>
            </div>
            <p className="text-[10px] text-tech-300 truncate">
              {affiliate?.commission_note?.split('.')[0] || 'Affiliate link'}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neon hover:bg-neon-dark text-white text-xs font-medium transition shrink-0"
          >
            <ExternalLink className="w-3 h-3" />
            {affiliate?.cta_label || 'Visit'}
          </a>
          <button
            onClick={() => { setDismissed(true); setVisible(false); }}
            className="p-1.5 rounded-lg text-tech-400 hover:text-white shrink-0"
            aria-label="Dismiss"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
