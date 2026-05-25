'use client';

import { FC, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

// ---------------------------------------------------------------------------
// AffiliateLink – a "Book via [provider]" button that respects env-var gating
// ---------------------------------------------------------------------------
// Usage: drop this component anywhere.  If the env var for the given provider
// is set AND productId is provided, the link points to the tracked affiliate
// URL via the centralized tracking API.  Otherwise it falls back to the plain
// `href` – safe to ship today.
//
// The tracking API (affiliate-tracking.vercel.app) records the click before
// redirecting to the provider, so all affiliate activity is logged to a
// central dashboard. See: https://affiliate-tracking.vercel.app/dashboard
//
// Provider logos are rendered as simple SVG/emoji badges so there is zero
// external dependency.  Swap with real vector logos when you have them.
// ---------------------------------------------------------------------------

/** Central affiliate-tracking API endpoint — records clicks before redirect. */
const TRACKING_API = 'https://affiliate-tracking.vercel.app/api/track-click';

export type AffiliateProvider = 'booking.com' | 'klook' | 'viator' | 'expedia' | 'getyourguide' | 'tripadvisor' | 'agoda';

interface AffiliateLinkProps {
  /** Plain fallback URL – used when the affiliate ID env var is missing */
  href: string;
  /** Provider identifier – maps to an env var */
  provider: AffiliateProvider;
  /** Optional product/tour/hotel ID for deep-linking */
  productId?: string;
  /** Visible label (defaults to "Book via {provider}") */
  children?: ReactNode;
  /** Extra classes for the anchor */
  className?: string;
  /** aria-label override */
  label?: string;
  /** Show external link icon */
  showExternalIcon?: boolean;
  /** Optional min-width for alignment in grids */
  minWidth?: string;
}

/**
 * Build an affiliate URL from env-var + productId, or fall back to href.
 * Routes through the centralized tracking API to log every click.
 */
function buildAffiliateUrl(
  provider: AffiliateProvider,
  productId: string | undefined,
  href: string,
): string {
  // Every provider maps to a `NEXT_PUBLIC_AFFILIATE_<PROVIDER_UPPER>` env var.
  const envKey = `NEXT_PUBLIC_AFFILIATE_${provider.toUpperCase().replace(/[.-]+/g, '_')}` as keyof typeof process.env;
  const affiliateId = process.env[envKey] as string | undefined;

  if (!affiliateId || !productId) return href;

  // Build the direct affiliate URL first
  let affiliateUrl: string;
  switch (provider) {
    case 'booking.com':
      affiliateUrl = `https://www.booking.com/searchresults.html?aid=${affiliateId}&ss=${encodeURIComponent(productId)}`;
      break;
    case 'klook':
      affiliateUrl = `https://affiliate.klook.com/redirect?aid=${affiliateId}&aff_adid=${encodeURIComponent(productId)}`;
      break;
    case 'viator':
      affiliateUrl = `https://www.viator.com/${encodeURIComponent(productId)}?pid=${affiliateId}`;
      break;
    case 'expedia':
      affiliateUrl = `https://www.expedia.com/${encodeURIComponent(productId)}?msp_cid=${affiliateId}`;
      break;
    case 'getyourguide':
      affiliateUrl = `https://www.getyourguide.com/${encodeURIComponent(productId)}?partner_id=${affiliateId}`;
      break;
    case 'tripadvisor':
      affiliateUrl = `https://www.tripadvisor.com/${encodeURIComponent(productId)}?partner_id=${affiliateId}`;
      break;
    case 'agoda':
      affiliateUrl = `https://www.agoda.com/${encodeURIComponent(productId)}?cid=${affiliateId}`;
      break;
    default:
      affiliateUrl = href;
  }

  // Route through the centralized tracking API — encodes the final redirect
  const linkId = `${provider}:${productId.substring(0, 40)}`;
  return `${TRACKING_API}?linkId=${encodeURIComponent(linkId)}&redirectUrl=${encodeURIComponent(affiliateUrl)}`;
}

/** Tiny provider-identifier badges (emoji-based – zero-dependency, mobile-safe) */
const PROVIDER_BADGE: Record<AffiliateProvider, string> = {
  'booking.com': '🏨',
  'klook': '🎫',
  'viator': '🏛️',
  'expedia': '✈️',
  'getyourguide': '🌟',
  'tripadvisor': '🐸',
  'agoda': '🛏️',
};

const PROVIDER_LABEL: Record<AffiliateProvider, string> = {
  'booking.com': 'Booking.com',
  'klook': 'Klook',
  'viator': 'Viator',
  'expedia': 'Expedia',
  'getyourguide': 'GetYourGuide',
  'tripadvisor': 'Tripadvisor',
  'agoda': 'Agoda',
};

const AffiliateLink: FC<AffiliateLinkProps> = ({
  href,
  provider,
  productId,
  children,
  className = '',
  label,
  showExternalIcon = true,
  minWidth,
}) => {
  const url = buildAffiliateUrl(provider, productId, href);
  const badge = PROVIDER_BADGE[provider] || '🔗';
  const providerName = PROVIDER_LABEL[provider] || provider;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={label || `Book via ${providerName}`}
      className={`
        inline-flex items-center justify-center gap-1.5
        px-3 py-2 rounded-lg text-xs font-medium
        border border-gray-200 bg-white
        text-gray-700 hover:text-gray-900
        hover:border-gray-300 hover:bg-gray-50
        hover:shadow-sm
        active:scale-[0.97]
        transition-all duration-150
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500
        ${className}
      `}
      style={minWidth ? { minWidth } : undefined}
    >
      <span aria-hidden="true" className="text-sm leading-none">{badge}</span>
      <span>{children || `Book via ${providerName}`}</span>
      {showExternalIcon && <ExternalLink size={10} className="opacity-50 shrink-0" aria-hidden="true" />}
    </a>
  );
};

export default AffiliateLink;
