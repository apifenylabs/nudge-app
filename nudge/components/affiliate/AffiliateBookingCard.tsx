'use client'

import { affiliateUrl, affiliateBadge } from '@/lib/affiliate-links'

interface BookingOption {
  provider: 'booking' | 'agoda' | 'expedia' | 'klook' | 'viator'
  /** The search/detail path for this provider, e.g. '/hotel/th/bangkok-luxury' */
  searchPath: string
  /** Optional label override — defaults to "Check {provider name}" */
  label?: string
  /** Optional badge text like "Best Price" or "Free Cancellation" */
  badge?: string
}

interface AffiliateBookingCardProps {
  /** Name of the resort/hotel/activity */
  name: string
  /** Optional 1-5 star rating */
  rating?: number
  /** Optional location string */
  location?: string
  /** List of booking options to display */
  options: BookingOption[]
  /** Optional className for the card wrapper */
  className?: string
}

/**
 * Converts a resort/property name into a search-friendly slug
 * for Booking.com, Agoda, and Expedia search URLs.
 */
function searchPathFromName(name: string, programId: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  switch (programId) {
    case 'booking':
      return `/searchresults.html?ss=${encodeURIComponent(name)}`
    case 'agoda':
      return `/search?city=&checkIn=&checkOut=&rooms=1&adults=2&children=0&hotel=${slug}`
    case 'expedia':
      return `/${slug}.h1800000.${slug}`
    default:
      return `/${slug}`
  }
}

/**
 * AffiliateBookingCard — a beautiful card component for resort/hotel pages
 * that shows Booking.com, Agoda, Expedia, or Klook search/booking links
 * with affiliate tracking.
 *
 * Usage:
 * ```tsx
 * <AffiliateBookingCard
 *   name="Vinpearl Resort & Spa Da Nang"
 *   rating={4.5}
 *   location="Da Nang, Vietnam"
 *   options={[
 *     { provider: 'booking', searchPath: '/searchresults.html?ss=Vinpearl+Da+Nang', badge: 'Best Price' },
 *     { provider: 'agoda', searchPath: '/search?city=&hotel=vinpearl-da-nang' },
 *   ]}
 * />
 * ```
 */
export default function AffiliateBookingCard({
  name,
  rating,
  location,
  options,
  className = '',
}: AffiliateBookingCardProps) {
  if (options.length === 0) return null

  return (
    <div className={`my-8 p-5 rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50/80 to-indigo-50/30 dark:from-indigo-950/20 dark:to-indigo-900/10 shadow-sm ${className}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-lg">🏨</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-sm">{name}</h3>
          {rating && (
            <div className="flex items-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          {location && (
            <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        {options.map((option, i) => {
          const program = affiliateUrl(option.provider, option.searchPath)
          const badge = affiliateBadge(option.provider)
          return (
            <a
              key={`${option.provider}-${i}`}
              href={program}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-border/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all duration-150 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base shrink-0">{option.badge || badge.split(' ')[0]}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {option.label || `Check ${badge.replace(/^.\s+/, '')}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {option.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {option.badge}
                  </span>
                )}
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          )
        })}
      </div>

      <p className="text-[10px] text-muted-foreground/60 mt-3 text-center">
        We may earn a commission if you book through these links, at no extra cost to you.
      </p>
    </div>
  )
}
