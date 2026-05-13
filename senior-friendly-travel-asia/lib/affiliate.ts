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
 */

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

interface AffiliateLink {
  url: string;
  partner: AffiliatePartner;
  /** Commission tier or estimated rate for transparency */
  commission: string;
}

// --- TAG-TO-PARTNER MAPPING ---
// Maps content tags to the most relevant booking partners
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
  'city': ['booking', 'agoda', 'klook'],
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
};

// --- PARTNER CONFIG ---
const PARTNER_CONFIG: Record<AffiliatePartner, {
  name: string;
  tagline: string;
  baseUrl: string;
  icon: string;
  color: string;
  // Search page with params
  buildSearchUrl?: (query: string) => string;
}> = {
  booking: {
    name: 'Booking.com',
    tagline: 'Book senior-friendly hotels & resorts',
    baseUrl: 'https://www.booking.com/index.html?aid=YOUR_AFFILIATE_ID',
    icon: '🏨',
    color: '#003580',
    buildSearchUrl: (query: string) =>
      `https://www.booking.com/searchresults.html?aid=YOUR_AFFILIATE_ID&ss=${encodeURIComponent(query)}&sb=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Faid%3DYOUR_AFFILIATE_ID&ssne=${encodeURIComponent(query)}&ssne_untouched=${encodeURIComponent(query)}&label=senior-travel-asia`,
  },
  klook: {
    name: 'Klook',
    tagline: 'Book tours & attractions',
    baseUrl: 'https://affiliate.klook.com/redirect?aid=YOUR_AFFILIATE_ID',
    icon: '🎫',
    color: '#FF5A00',
    buildSearchUrl: (query: string) =>
      `https://affiliate.klook.com/redirect?aid=YOUR_AFFILIATE_ID&text=${encodeURIComponent(query)}&k_srg=%2Factivity%2Fsearch%3Fkeyword%3D${encodeURIComponent(query)}`,
  },
  getyourguide: {
    name: 'GetYourGuide',
    tagline: 'Top-rated tours & day trips',
    baseUrl: 'https://www.getyourguide.com/?partner_id=YOUR_PARTNER_ID&utm_medium=online_publisher&placement=content-middle',
    icon: '🗺️',
    color: '#FA5833',
    buildSearchUrl: (query: string) =>
      `https://www.getyourguide.com/s/?q=${encodeURIComponent(query)}&partner_id=YOUR_PARTNER_ID&utm_medium=online_publisher&placement=content-middle`,
  },
  skyscanner: {
    name: 'Skyscanner',
    tagline: 'Find the best flights',
    baseUrl: 'https://www.skyscanner.net/g/referrals/v1/flights/home?adId=YOUR_AD_ID',
    icon: '✈️',
    color: '#FF5722',
  },
  nordvpn: {
    name: 'NordVPN',
    tagline: 'Stay safe on public Wi-Fi',
    baseUrl: 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_AFF_ID',
    icon: '🔒',
    color: '#4687FF',
  },
  tripcom: {
    name: 'Trip.com',
    tagline: 'Hotels, flights & trains in Asia',
    baseUrl: 'https://www.trip.com/?Allianceid=YOUR_ALLIANCE_ID&SID=YOUR_SID',
    icon: '🌏',
    color: '#287DFA',
    buildSearchUrl: (query: string) =>
      `https://www.trip.com/hotels/?Allianceid=YOUR_ALLIANCE_ID&SID=YOUR_SID&keyword=${encodeURIComponent(query)}`,
  },
  agoda: {
    name: 'Agoda',
    tagline: 'Best hotel deals in Asia',
    baseUrl: 'https://www.agoda.com/partners/partnersearch.aspx?asq=YOUR_ASQ_CODE',
    icon: '🏢',
    color: '#003580',
    buildSearchUrl: (query: string) =>
      `https://www.agoda.com/search?device=cid=YOUR_CID&selectedproperty=&city=${encodeURIComponent(query)}&checkIn=&checkOut=&rooms=1&adults=2&children=0&price=0`,
  },
  viator: {
    name: 'Viator',
    tagline: 'Unique travel experiences',
    baseUrl: 'https://www.viator.com/?pid=YOUR_PID&mcid=YOUR_MCID',
    icon: '🌟',
    color: '#E2231A',
    buildSearchUrl: (query: string) =>
      `https://www.viator.com/searchResults/${encodeURIComponent(query)}?pid=YOUR_PID&mcid=YOUR_MCID`,
  },
  discoveryprime: {
    name: 'Discovery Prime',
    tagline: 'Premium travel experiences',
    baseUrl: 'https://www.discoveryprime.com/?ref=YOUR_REF',
    icon: '👑',
    color: '#1A1A2E',
  },
  worldnomads: {
    name: 'World Nomads',
    tagline: 'Travel insurance for seniors',
    baseUrl: 'https://www.worldnomads.com/affiliates/affiliate.aspx?affid=YOUR_AFFID&partner=YOUR_PARTNER',
    icon: '🛡️',
    color: '#00B4D8',
  },
};

// --- PUBLIC API ---

/**
 * Get the best affiliate link for a given search query / destination / tags.
 * Tags determine which partners are most relevant.
 */
export function getAffiliateLinks(
  destination: string,
  tags: string[] = ['accommodation', 'tour'],
  count: number = 2
): AffiliateLink[] {
  const partners = new Set<AffiliatePartner>();

  for (const tag of tags) {
    const mapped = TAG_TO_PARTNERS[tag.toLowerCase()];
    if (mapped) mapped.forEach((p) => partners.add(p));
  }

  // If no matches from tags, add default partners
  if (partners.size === 0) {
    partners.add('booking');
    partners.add('klook');
  }

  const linkPartners = Array.from(partners).slice(0, count);

  return linkPartners.map((partner) => {
    const config = PARTNER_CONFIG[partner];
    const url = config.buildSearchUrl?.(destination) ?? config.baseUrl;
    return {
      url,
      partner,
      commission: config.name,
    };
  });
}

/**
 * Get a specific partner's configuration for rendering affiliate CTAs.
 */
export function getPartner(partner: AffiliatePartner) {
  return PARTNER_CONFIG[partner] ?? null;
}

/**
 * Get all available partners (for directory pages, comparison tables, etc.)
 */
export function getAllPartners(): Array<{ key: AffiliatePartner } & (typeof PARTNER_CONFIG)[AffiliatePartner]> {
  return (Object.entries(PARTNER_CONFIG) as [AffiliatePartner, (typeof PARTNER_CONFIG)[AffiliatePartner]][]).map(
    ([key, config]) => ({ key, ...config })
  );
}

/**
 * Build a hotel search link for a destination.
 */
export function hotelSearchLink(destination: string): string {
  return `https://www.booking.com/searchresults.html?aid=YOUR_AFFILIATE_ID&ss=${encodeURIComponent(destination)}&sb=1&src=index&src_elem=sb&ssne=${encodeURIComponent(destination)}&label=senior-travel-asia`;
}

/**
 * Build a tour search link for a destination.
 */
export function tourSearchLink(destination: string): string {
  return `https://affiliate.klook.com/redirect?aid=YOUR_AFFILIATE_ID&text=${encodeURIComponent(destination + ' tours')}&k_srg=%2Factivity%2Fsearch%3Fkeyword%3D${encodeURIComponent(destination)}`;
}

export type { AffiliatePartner, AffiliateLink };
