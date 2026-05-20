/**
 * Nudge Affiliate Link Infrastructure
 *
 * Central module for all affiliate links across Nudge.
 * Data-only: the affiliate IDs are read from env vars at build time.
 * All actual JSX rendering components live in components/affiliate/.
 *
 * To enable affiliate tracking:
 * 1. Sign up for each affiliate program
 * 2. Set the matching environment variables (see AFFILIATE_SETUP.md)
 * 3. Rebuild
 *
 * When env vars are NOT set, URLs render as plain links (no tracking loss).
 * When env vars ARE set, affiliate tracking parameters are appended automatically.
 */

export interface AffiliateProgram {
  id: string
  name: string
  baseUrl: string
  commission: string
  cookieDays: number
  type: 'saas' | 'travel' | 'retail'
  badge: string
  envVar: string
  /** Query param name for this affiliate program's ID */
  trackingParam: string
  /** URL format pattern: {baseUrl}{path}?{trackingParam}={id} */
}

export const affiliatePrograms: AffiliateProgram[] = [
  // ── Travel / Booking ──────────────────────────────────────────────
  {
    id: 'booking',
    name: 'Booking.com',
    baseUrl: 'https://www.booking.com/',
    commission: '~4% per booking',
    cookieDays: 30,
    type: 'travel',
    badge: '🏨',
    envVar: 'NEXT_PUBLIC_AFFILIATE_BOOKING_COM',
    trackingParam: 'aid',
  },
  {
    id: 'agoda',
    name: 'Agoda',
    baseUrl: 'https://www.agoda.com/',
    commission: '3-5%',
    cookieDays: 30,
    type: 'travel',
    badge: '✈️',
    envVar: 'NEXT_PUBLIC_AFFILIATE_AGODA',
    trackingParam: 'cid',
  },
  {
    id: 'expedia',
    name: 'Expedia',
    baseUrl: 'https://www.expedia.com/',
    commission: '3-5%',
    cookieDays: 30,
    type: 'travel',
    badge: '🌍',
    envVar: 'NEXT_PUBLIC_AFFILIATE_EXPEDIA',
    trackingParam: 'msp_cid',
  },
  {
    id: 'klook',
    name: 'Klook',
    baseUrl: 'https://affiliate.klook.com/',
    commission: '3-6%',
    cookieDays: 30,
    type: 'travel',
    badge: '🎟️',
    envVar: 'NEXT_PUBLIC_AFFILIATE_KLOOK',
    trackingParam: 'aid',
  },
  {
    id: 'viator',
    name: 'Viator',
    baseUrl: 'https://www.viator.com/',
    commission: '4-8%',
    cookieDays: 30,
    type: 'travel',
    badge: '🧭',
    envVar: 'NEXT_PUBLIC_AFFILIATE_VIATOR',
    trackingParam: 'pid',
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    baseUrl: 'https://www.getyourguide.com/',
    commission: '6-10%',
    cookieDays: 30,
    type: 'travel',
    badge: '🎯',
    envVar: 'NEXT_PUBLIC_AFFILIATE_GETYOURGUIDE',
    trackingParam: 'partner_id',
  },
  {
    id: 'tripadvisor',
    name: 'Tripadvisor',
    baseUrl: 'https://www.tripadvisor.com/',
    commission: '~50% rev share',
    cookieDays: 30,
    type: 'travel',
    badge: '📸',
    envVar: 'NEXT_PUBLIC_AFFILIATE_TRIPADVISOR',
    trackingParam: 'partner_id',
  },

  // ── SaaS / Productivity ───────────────────────────────────────────
  {
    id: 'todoist',
    name: 'Todoist',
    baseUrl: 'https://todoist.com/',
    commission: '30% recurring (12 mo)',
    cookieDays: 30,
    type: 'saas',
    badge: '🌟',
    envVar: 'NEXT_PUBLIC_AFFILIATE_TODOIST',
    trackingParam: 'ref',
  },
  {
    id: 'notion',
    name: 'Notion',
    baseUrl: 'https://www.notion.so/',
    commission: '30% recurring (12 mo)',
    cookieDays: 30,
    type: 'saas',
    badge: '📝',
    envVar: 'NEXT_PUBLIC_AFFILIATE_NOTION',
    trackingParam: 'ref',
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    baseUrl: 'https://clickup.com/',
    commission: '30% recurring (12 mo)',
    cookieDays: 30,
    type: 'saas',
    badge: '🚀',
    envVar: 'NEXT_PUBLIC_AFFILIATE_CLICKUP',
    trackingParam: 'ref',
  },
  {
    id: 'trello',
    name: 'Trello',
    baseUrl: 'https://trello.com/',
    commission: '30% recurring (12 mo)',
    cookieDays: 30,
    type: 'saas',
    badge: '📋',
    envVar: 'NEXT_PUBLIC_AFFILIATE_TRELLO',
    trackingParam: 'ref',
  },
  {
    id: 'ticktick',
    name: 'TickTick',
    baseUrl: 'https://ticktick.com/',
    commission: '20-30% recurring',
    cookieDays: 30,
    type: 'saas',
    badge: '✅',
    envVar: 'NEXT_PUBLIC_AFFILIATE_TICKTICK',
    trackingParam: 'ref',
  },
  {
    id: 'cozi',
    name: 'Cozi',
    baseUrl: 'https://www.cozi.com/',
    commission: '20% recurring',
    cookieDays: 30,
    type: 'saas',
    badge: '📅',
    envVar: 'NEXT_PUBLIC_AFFILIATE_COZI',
    trackingParam: 'ref',
  },
  {
    id: 'ourhome',
    name: 'OurHome',
    baseUrl: 'https://www.ourhomeapp.com/',
    commission: '20% recurring',
    cookieDays: 30,
    type: 'saas',
    badge: '🏠',
    envVar: 'NEXT_PUBLIC_AFFILIATE_OURHOME',
    trackingParam: 'ref',
  },
]

/**
 * Get the tracked affiliate URL for a program.
 * If the env var isn't set, returns the plain URL.
 * If the env var IS set, appends the tracking parameter.
 *
 * @param programId - The program id (e.g. 'booking', 'todoist')
 * @param path - Optional path appended to the base URL (e.g. '/hotel/th/bangkok-luxury')
 * @returns The full affiliate URL (tracked or plain)
 */
export function affiliateUrl(programId: string, path: string = ''): string {
  const program = affiliatePrograms.find((p) => p.id === programId)
  if (!program) return path || ''

  const affiliateId = typeof process !== 'undefined'
    ? process.env[program.envVar]
    : undefined

  const base = `${program.baseUrl.replace(/\/+$/, '')}${path.startsWith('/') ? '' : '/'}${path.replace(/^\//, '')}`

  if (affiliateId) {
    const separator = base.includes('?') ? '&' : '?'
    return `${base}${separator}${program.trackingParam}=${encodeURIComponent(affiliateId)}`
  }

  return base
}

/**
 * Smart affiliate URL builder — returns a URL with the program's ref param.
 * Falls back to the provided fallback URL if the program is unknown.
 */
export function smartAffiliateUrl(
  programId: string,
  searchPath: string,
  fallbackUrl: string
): string {
  const program = affiliatePrograms.find((p) => p.id === programId)
  if (!program) return fallbackUrl
  return affiliateUrl(programId, searchPath)
}

/**
 * Get the display badge text for a program.
 */
export function affiliateBadge(programId: string): string {
  const program = affiliatePrograms.find((p) => p.id === programId)
  if (!program) return ''
  return `${program.badge} ${program.name}`
}

/**
 * Check if an affiliate program has a configured tracking ID.
 * Useful for conditionally showing "affiliate" badges.
 */
export function isAffiliateActive(programId: string): boolean {
  const program = affiliatePrograms.find((p) => p.id === programId)
  if (!program) return false
  return !!(typeof process !== 'undefined' && process.env[program.envVar])
}

/**
 * Disclosure text for FTC compliance.
 */
export const affiliateDisclosureText =
  'Some links on this page are affiliate links. We may earn a commission at no extra cost to you.'
