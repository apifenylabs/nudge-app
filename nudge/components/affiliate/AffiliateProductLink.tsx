'use client'

import { affiliateUrl, affiliateBadge, isAffiliateActive } from '@/lib/affiliate-links'

interface AffiliateProductLinkProps {
  /** Which affiliate program (e.g. 'todoist', 'notion', 'clickup') */
  providerId: string
  /** The product/landing page path (e.g. '/product/') */
  path?: string
  /** Custom display text (defaults to "Try {name}") */
  children?: React.ReactNode
  /** Optional override href (use instead of path for full external URLs) */
  href?: string
  /** Show the commission badge? */
  showBadge?: boolean
}

/**
 * AffiliateProductLink — an inline product/recommendation link
 * with optional tracking badge and affiliate attribution.
 *
 * Used in comparison/review blog posts where a tool is recommended.
 * When the env var is set, tracking params are appended automatically.
 * When not set, the link works as a plain link (no tracking loss).
 *
 * Usage:
 * ```tsx
 * <AffiliateProductLink providerId="todoist" path="product/">
 *   Try Todoist
 * </AffiliateProductLink>
 * ```
 */
export default function AffiliateProductLink({
  providerId,
  path = '',
  children,
  href,
  showBadge = false,
}: AffiliateProductLinkProps) {
  const url = href || affiliateUrl(providerId, path)
  const badge = affiliateBadge(providerId)
  const isActive = isAffiliateActive(providerId)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium hover:underline group"
    >
      {badge && (
        <span className="text-sm shrink-0" role="img" aria-label={providerId}>
          {badge.split(' ')[0]}
        </span>
      )}
      <span>{children || `Try ${badge.replace(/^.\s+/, '')}`}</span>
      <svg
        className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {showBadge && isActive && (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ml-0.5">
          Affiliate
        </span>
      )}
    </a>
  )
}
