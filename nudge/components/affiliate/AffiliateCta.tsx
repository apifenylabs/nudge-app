'use client'

import Link from 'next/link'
import AffiliateProductLink from './AffiliateProductLink'

interface AffiliateCtaProps {
  programName: string
  href: string
  badge?: string
  children: React.ReactNode
}

/**
 * An inline affiliate link with a subtle badge.
 * Example: <AffiliateCta programName="Todoist" href="https://todoist.com/?ref=nudge">Try Todoist</AffiliateCta>
 */
export function AffiliateLink({ programName, href, badge, children }: AffiliateCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
    >
      {badge && <span className="text-xs">{badge}</span>}
      {children}
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}

/**
 * Disclosure banner for pages that contain affiliate links.
 */
export function AffiliateDisclosure() {
  return (
    <p className="text-xs text-muted-foreground italic mt-2">
      Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.
    </p>
  )
}

/**
 * "Nudge vs Competitor" comparison CTA card.
 * Rendered at the bottom of comparison/review posts.
 */
export function VsNudgeCta({ competitorName }: { competitorName: string }) {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-950/30 dark:to-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
      <h3 className="text-lg font-bold text-foreground mb-2">
        {competitorName} vs Nudge: Which Is Better for Families?
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {competitorName} is great for productivity, but it wasn&apos;t built for families. Nudge was designed from the ground up for household task management — with family sharing, natural language parsing, and Telegram integration.
      </p>
      <Link
        href="/auth/signup"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all"
      >
        Try Nudge Free →
      </Link>
    </div>
  )
}

/**
 * Travel affiliate card — appears in travel/resort blog posts.
 */
export function TravelAffiliateCard({
  name,
  href,
  badge,
}: {
  name: string
  href: string
  badge: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-200 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
    >
      <span className="text-base">{badge}</span>
      <span>Check prices on {name}</span>
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}

/**
 * AffiliateAppRow — a horizontal row for a comparison/review page
 * that shows an app/product logo, name, description, and affiliate link.
 *
 * Used in "best of" style posts like best chore apps or best task managers.
 */
export function AffiliateAppRow({
  rank,
  name,
  emoji,
  description,
  providerId,
  linkPath,
  badges,
}: {
  rank: number
  name: string
  emoji: string
  description: string
  providerId: string
  linkPath?: string
  badges?: string[]
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-border/50 mb-3 last:mb-0">
      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-base leading-none">{emoji}</span>
          <h4 className="font-bold text-sm text-foreground">{name}</h4>
          {badges?.map((b) => (
            <span
              key={b}
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="shrink-0 pt-0.5">
        <AffiliateProductLink providerId={providerId} path={linkPath}>
          Visit
        </AffiliateProductLink>
      </div>
    </div>
  )
}

export { default as AffiliateProductLinkDefault } from './AffiliateProductLink'
export { default as AffiliateBookingCard } from './AffiliateBookingCard'
