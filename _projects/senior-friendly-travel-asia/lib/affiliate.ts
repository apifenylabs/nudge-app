/**
 * Senior-Friendly Travel Asia — Affiliate Link Infrastructure
 *
 * Central registry for all affiliate/partner programs.
 * Every external booking link flows through here for easy
 * audit, replacement, and commission tracking.
 *
 * Supported partners:
 * - Booking.com  → Hotels & accommodations (5-15% commission)
 * - Klook        → Tours, activities, attraction tickets (5-8%)
 * - GetYourGuide → Tours & experiences (5-10%)
 * - Skyscanner   → Flights (revenue share)
 * - NordVPN      → VPN for travel security (30-40% rev share)
 * - Trip.com     → Hotels, flights, trains (3-8%)
 * - Agoda        → Hotels in Asia (5-8%)
 * - Viator       → Experiences & day trips (8-10%)
 *
 * Real affiliate IDs are set from env vars with fallbacks.
 * Set in Vercel environment for production.
 */

// ─── Env Helper ────────────────────────────────────────────────
const envAid = (key: string, fallback: string): string =>
  (typeof process !== 'undefined' && process.env?.[key]) || fallback;

type AffiliatePartner =
  | 'booking'
  | 'klook'
  | 'getyourguide'
  | 'skyscanner'
  | 'nordvpn'
  | 'tripcom'
  | 'agoda'
  | 'viator'
  | 'discoveryprime'
  | 'worldnomads';

export interface AffiliateLink {
  url: string;
  partner: AffiliatePartner;
  /** Commission tier or estimated rate for transparency */
  commission: string;
}

// ─── Affiliate IDs ──────────────────────────────────────────────
export const AFFILIATE = {
  klookId: envAid('NEXT_PUBLIC_KLOOK_AFFILIATE_ID', '119991'),
  bookingId: envAid('NEXT_PUBLIC_BOOKING_AFFILIATE_ID', '2875669'),
  viatorPid: envAid('NEXT_PUBLIC_VIATOR_AFFILIATE_ID', 'P00299136'),
  viatorMcid: envAid('NEXT_PUBLIC_VIATOR_MCID', '42383'),
  getYourGuideId: envAid('NEXT_PUBLIC_GYG_AFFILIATE_ID', ''),
  amazonTag: envAid('NEXT_PUBLIC_AMAZON_AFFILIATE_TAG', ''),
  skyscannerId: envAid('NEXT_PUBLIC_SKYSCANNER_AFFILIATE_ID', ''),
  nordvpnId: envAid('NEXT_PUBLIC_NORDVPN_AFFILIATE_ID', ''),
  tripcomId: envAid('NEXT_PUBLIC_TRIPCOM_AFFILIATE_ID', ''),
  worldnomadsId: envAid('NEXT_PUBLIC_WORLDNOMADS_AFFILIATE_ID', ''),
};

// ─── TAG-TO-PARTNER MAPPING ─────────────────────────────────────
const TAG_TO_PARTNERS: Record<string, AffiliatePartner[]> = {
  'accommodation': ['booking', 'agoda', 'tripcom'],
  'hotel': ['booking', 'agoda', 'tripcom'],
  'resort': ['booking', 'agoda'],
  'tour': ['klook', 'getyourguide', 'viator'],
  'attraction': ['klook', 'getyourguide'],
  'museum': ['klook', 'getyourguide'],
  'flight': ['skyscanner', 'tripcom'],
  'transport': ['tripcom', 'skyscanner'],
  'beach': ['booking', 'agoda'],
  'nature': ['klook', 'getyourguide'],
  'city-guides': ['booking', 'agoda', 'klook'],
  'temple': ['klook', 'getyourguide'],
  'hotsprings': ['booking', 'agoda'],
  'shopping': ['getyourguide', 'klook'],
  'food': ['klook', 'getyourguide'],
  'insurance': ['worldnomads'],
  'safety': ['nordvpn', 'worldnomads'],
  'technology': ['nordvpn'],
  'cruise': ['tripcom', 'booking'],
  'culture': ['klook', 'getyourguide'],
  'wellness': ['booking', 'agoda'],
  'garden': ['klook', 'getyourguide'],
  'park': ['klook', 'getyourguide'],
  'heritage': ['getyourguide', 'klook'],
  'planning': ['booking', 'skyscanner'],
  'top-10': ['booking', 'klook'],
  'budget': ['agoda', 'booking'],
  'accessible': ['booking', 'klook'],
};

// ─── PARTNER CONFIG ─────────────────────────────────────────────
interface PartnerConfig {
  name: string;
  tagline: string;
  buildSearchUrl: (query: string, destSlug?: string) => string;
  icon: string;
  color: string;
}

const PARTNER_CONFIG: Record<AffiliatePartner, PartnerConfig> = {
  booking: {
    name: 'Booking.com',
    tagline: 'Find senior-friendly hotels & resorts',
    icon: '🏨',
    color: '#003580',
    buildSearchUrl: (query: string) =>
      `https://www.booking.com/searchresults.html?aid=${AFFILIATE.bookingId}&ss=${encodeURIComponent(query)}&sb=1&src=index&ssne=${encodeURIComponent(query)}&ssne_untouched=${encodeURIComponent(query)}&label=senior-travel-asia`,
  },
  klook: {
    name: 'Klook',
    tagline: 'Book tours, attractions & activities',
    icon: '🎫',
    color: '#FF5A00',
    buildSearchUrl: (query: string) =>
      `https://www.klook.com/search/?keyword=${encodeURIComponent(query)}&aid=${AFFILIATE.klookId}`,
  },
  getyourguide: {
    name: 'GetYourGuide',
    tagline: 'Top-rated tours & day trips',
    icon: '🗺️',
    color: '#FA5833',
    buildSearchUrl: (query: string) =>
      `https://www.getyourguide.com/s/?q=${encodeURIComponent(query)}&partner_id=${AFFILIATE.getYourGuideId}&utm_medium=online_publisher&placement=content-middle`,
  },
  skyscanner: {
    name: 'Skyscanner',
    tagline: 'Find the best flights',
    icon: '✈️',
    color: '#FF5722',
    buildSearchUrl: (query: string) =>
      `https://www.skyscanner.net/g/referrals/v1/flights/home?adId=${AFFILIATE.skyscannerId}&q=${encodeURIComponent(query)}`,
  },
  nordvpn: {
    name: 'NordVPN',
    tagline: 'Stay safe on public Wi-Fi abroad',
    icon: '🔒',
    color: '#4687FF',
    buildSearchUrl: (_query: string) =>
      `https://go.nordvpn.net/aff_c?offer_id=15&aff_id=${AFFILIATE.nordvpnId}`,
  },
  tripcom: {
    name: 'Trip.com',
    tagline: 'Hotels, flights & trains across Asia',
    icon: '🌏',
    color: '#287DFA',
    buildSearchUrl: (query: string) =>
      `https://www.trip.com/hotels/?Allianceid=${AFFILIATE.tripcomId}&SID=&keyword=${encodeURIComponent(query)}`,
  },
  agoda: {
    name: 'Agoda',
    tagline: 'Best hotel deals across Asia',
    icon: '🏢',
    color: '#003580',
    buildSearchUrl: (query: string) =>
      `https://www.agoda.com/search?device=cid=&selectedproperty=&city=${encodeURIComponent(query)}&checkIn=&checkOut=&rooms=1&adults=2&children=0`,
  },
  viator: {
    name: 'Viator',
    tagline: 'Unique travel experiences & day trips',
    icon: '🌟',
    color: '#E2231A',
    buildSearchUrl: (query: string) =>
      `https://www.viator.com/${encodeURIComponent(query.replace(/\s+/g, '').replace(/[^a-zA-Z]/g, ''))}/things-to-do?aid=${AFFILIATE.viatorPid}`,
  },
  discoveryprime: {
    name: 'Discovery Prime',
    tagline: 'Premium travel experiences',
    icon: '👑',
    color: '#1A1A2E',
    buildSearchUrl: () => 'https://www.discoveryprime.com/',
  },
  worldnomads: {
    name: 'World Nomads',
    tagline: 'Travel insurance built for seniors',
    icon: '🛡️',
    color: '#00B4D8',
    buildSearchUrl: () =>
      `https://www.worldnomads.com/affiliates/affiliate.aspx?affid=${AFFILIATE.worldnomadsId}&partner=senior-travel-asia`,
  },
};

// ─── PUBLIC API ─────────────────────────────────────────────────

/**
 * Get affiliate links for a destination, inferred from tags.
 * Falls back to hotel + tour if no tag matches.
 */
export function getAffiliateLinks(
  destination: string,
  tags: string[] = [],
  count: number = 3
): AffiliateLink[] {
  const partners = new Set<AffiliatePartner>();

  for (const tag of tags) {
    const mapped = TAG_TO_PARTNERS[tag.toLowerCase()];
    if (mapped) mapped.forEach((p) => partners.add(p));
  }

  if (partners.size === 0) {
    partners.add('booking');
    partners.add('klook');
  }

  const linkPartners = Array.from(partners).slice(0, count);

  return linkPartners.map((partner) => {
    const config = PARTNER_CONFIG[partner];
    const url = config.buildSearchUrl(destination);
    return { url, partner, commission: config.name };
  });
}

/**
 * Get a specific partner's configuration for rendering affiliate CTAs.
 */
export function getPartner(partner: AffiliatePartner): PartnerConfig | null {
  return PARTNER_CONFIG[partner] ?? null;
}

/**
 * Get all available partners (for directory pages, comparison tables, etc.)
 */
export function getAllPartners(): Array<
  { key: AffiliatePartner } & PartnerConfig
> {
  return (Object.entries(PARTNER_CONFIG) as [AffiliatePartner, PartnerConfig][]).map(
    ([key, config]) => ({ key, ...config })
  );
}

/**
 * Build a hotel search link for a destination.
 */
export function hotelSearchLink(destination: string): string {
  return `https://www.booking.com/searchresults.html?aid=${AFFILIATE.bookingId}&ss=${encodeURIComponent(destination)}&sb=1&src=index&ssne=${encodeURIComponent(destination)}&label=senior-travel-asia`;
}

/**
 * Build a tour search link for a destination.
 */
export function tourSearchLink(destination: string): string {
  return `https://www.klook.com/search/?keyword=${encodeURIComponent(destination + ' tours')}&aid=${AFFILIATE.klookId}`;
}

export type { AffiliatePartner, PartnerConfig };

// ─── Central Tracking Beacon ──────────────────────────────────
// Fires a server-side tracking event to the central affiliate-tracking API.

const TRACKING_API = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AFFILIATE_TRACKING_URL)
  || 'https://affiliate-tracking.vercel.app';

/**
 * Fire a tracking beacon to the central affiliate tracking API.
 * Uses sendBeacon for reliable fire-and-forget delivery.
 */
export function fireAffiliateBeacon(linkId: string, redirectUrl: string): void {
  if (typeof window === 'undefined') return;
  
  const beaconUrl = `${TRACKING_API}/api/track-click` +
    `?linkId=${encodeURIComponent('senior-travel_' + linkId)}` +
    `&redirectUrl=${encodeURIComponent(redirectUrl)}`;
  
  try {
    navigator.sendBeacon(beaconUrl);
  } catch {
    fetch(beaconUrl, { method: 'GET', keepalive: true }).catch(() => {});
  }
}
