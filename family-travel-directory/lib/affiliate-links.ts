// ─── Affiliate Links Configuration ──────────────────────────────────────
// Placeholder IDs — replace with real IDs after signing up for each program.
// Env vars (NEXT_PUBLIC_AFFILIATE_*) take precedence over defaults.
// Set in Vercel → Settings → Environment Variables for production.

const env = (key: string, fallback: string): string =>
  (typeof process !== 'undefined' && process.env?.[key]) || fallback;

/**
 * All affiliate providers supported across the network.
 * Each provider has a human-readable name, affiliate ID (placeholder or env-var),
 * and a URL builder function.
 */
export const AFFILIATE_CONFIG = {
  klook: {
    name: 'Klook',
    id: env('NEXT_PUBLIC_AFFILIATE_KLOOK', env('NEXT_PUBLIC_KLOOK_AFFILIATE_ID', 'klk_PLACEHOLDER')),
    signupUrl: 'https://affiliate.klook.com',
    commission: '3-6%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://affiliate.klook.com/redirect?aid=${affiliateId}&aff_adid=${encodeURIComponent(productId)}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.klook.com/search/?keyword=${encodeURIComponent(keyword)}&aid=${affiliateId}`,
  },
  viator: {
    name: 'Viator',
    id: env('NEXT_PUBLIC_AFFILIATE_VIATOR', env('NEXT_PUBLIC_VIATOR_AFFILIATE_ID', 'viator_PLACEHOLDER')),
    signupUrl: 'https://www.viator.com/affiliates',
    commission: '4-8%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.viator.com/${encodeURIComponent(productId)}?pid=${affiliateId}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.viator.com/searchResults/all?text=${encodeURIComponent(keyword)}&pid=${affiliateId}`,
  },
  agoda: {
    name: 'Agoda',
    id: env('NEXT_PUBLIC_AFFILIATE_AGODA', 'agoda_PLACEHOLDER'),
    signupUrl: 'https://partner.agoda.com',
    commission: '3-5%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.agoda.com/${encodeURIComponent(productId)}?cid=${affiliateId}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.agoda.com/search?city=${encodeURIComponent(keyword)}&cid=${affiliateId}`,
  },
  booking: {
    name: 'Booking.com',
    id: env('NEXT_PUBLIC_AFFILIATE_BOOKING_COM', env('NEXT_PUBLIC_BOOKING_AFFILIATE_ID', 'book_PLACEHOLDER')),
    signupUrl: 'https://partner.booking.com',
    commission: '~4%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.booking.com/searchresults.html?aid=${affiliateId}&ss=${encodeURIComponent(productId)}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(keyword)}&aid=${affiliateId}`,
  },
  getyourguide: {
    name: 'GetYourGuide',
    id: env('NEXT_PUBLIC_AFFILIATE_GETYOURGUIDE', 'gyg_PLACEHOLDER'),
    signupUrl: 'https://partner.getyourguide.com',
    commission: '6-10%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.getyourguide.com/${encodeURIComponent(productId)}?partner_id=${affiliateId}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.getyourguide.com/s/?q=${encodeURIComponent(keyword)}&partner_id=${affiliateId}`,
  },
  expedia: {
    name: 'Expedia',
    id: env('NEXT_PUBLIC_AFFILIATE_EXPEDIA', 'exp_PLACEHOLDER'),
    signupUrl: 'https://expediapartnersolutions.com',
    commission: '3-5%',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.expedia.com/${encodeURIComponent(productId)}?msp_cid=${affiliateId}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.expedia.com/search?q=${encodeURIComponent(keyword)}&msp_cid=${affiliateId}`,
  },
  tripadvisor: {
    name: 'Tripadvisor',
    id: env('NEXT_PUBLIC_AFFILIATE_TRIPADVISOR', 'trip_PLACEHOLDER'),
    signupUrl: 'https://www.tripadvisor.com/affiliates',
    commission: '~50% rev share',
    buildUrl: (productId: string, affiliateId: string) =>
      `https://www.tripadvisor.com/${encodeURIComponent(productId)}?partner_id=${affiliateId}`,
    buildSearchUrl: (keyword: string, affiliateId: string) =>
      `https://www.tripadvisor.com/Search?q=${encodeURIComponent(keyword)}&partner_id=${affiliateId}`,
  },
} as const;

export type AffiliateProviderKey = keyof typeof AFFILIATE_CONFIG;

/**
 * Build an affiliate-tracked URL for a given provider, product, and optional search term.
 */
export function buildAffiliateUrl(
  provider: AffiliateProviderKey,
  productId?: string,
  searchTerm?: string,
): string {
  const config = AFFILIATE_CONFIG[provider];
  if (productId) {
    return config.buildUrl(productId, config.id);
  }
  return config.buildSearchUrl(searchTerm || '', config.id);
}

/**
 * Get a user-friendly display label for a provider.
 */
export function getProviderLabel(provider: AffiliateProviderKey): string {
  return AFFILIATE_CONFIG[provider].name;
}

/**
 * Check whether a provider's affiliate ID is set (real or placeholder).
 */
export function hasAffiliateId(provider: AffiliateProviderKey): boolean {
  const id = AFFILIATE_CONFIG[provider].id;
  return id.length > 0 && !id.includes('PLACEHOLDER') && !id.startsWith('klk_');
}

/**
 * Get the sign-up URL for a provider's affiliate program.
 */
export function getSignupUrl(provider: AffiliateProviderKey): string {
  return AFFILIATE_CONFIG[provider].signupUrl;
}
