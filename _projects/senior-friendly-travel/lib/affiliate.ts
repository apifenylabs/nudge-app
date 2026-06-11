// ─── Affiliate Configuration ──────────────────────────────────────
// Change these values to update all affiliate links across the site.
// Env vars take precedence over defaults — set in Vercel for production.

const envAid = (key: string, fallback: string): string =>
  (typeof process !== 'undefined' && process.env?.[key]) || fallback;

export const AFFILIATE = {
  // Klook Affiliate ID: https://affiliate.klook.com/
  klookId: envAid('NEXT_PUBLIC_KLOOK_AFFILIATE_ID', '119991'),

  // Booking.com Affiliate ID: https://partners.booking.com/ (aid=2875669)
  bookingId: envAid('NEXT_PUBLIC_BOOKING_AFFILIATE_ID', '2875669'),

  // Viator Affiliate ID: https://partners.viator.com/ (aid=P00299136)
  viatorPid: envAid('NEXT_PUBLIC_VIATOR_AFFILIATE_ID', 'P00299136'),
  viatorMcid: envAid('NEXT_PUBLIC_VIATOR_MCID', '42383'),
};

/**
 * Build a Klook search URL with the affiliate ID for tracking.
 */
export function klookUrl(keyword: string): string {
  return `https://www.klook.com/search/?keyword=${encodeURIComponent(keyword)}&aid=${AFFILIATE.klookId}`;
}

/**
 * Build a Booking.com search URL with the affiliate label.
 */
export function bookingUrl(location: string): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}&aid=${AFFILIATE.bookingId}`;
}

/**
 * Build a Viator search URL with the affiliate ID.
 * Format: https://www.viator.com/.../?aid=P00299136
 */
export function viatorUrl(location: string): string {
  return `https://www.viator.com/${encodeURIComponent(location.replace(/\s+/g, '').replace(/[^a-zA-Z]/g, ''))}/things-to-do?aid=${AFFILIATE.viatorPid}`;
}

// ─── Central Tracking Beacon ──────────────────────────────────

const TRACKING_API = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AFFILIATE_TRACKING_URL)
  || 'https://affiliate-tracking.vercel.app';

/**
 * Fire a tracking beacon to the central affiliate tracking API.
 * Uses sendBeacon for reliable fire-and-forget delivery.
 */
export function fireAffiliateBeacon(linkId: string, redirectUrl: string): void {
  if (typeof window === 'undefined') return;
  
  const beaconUrl = `${TRACKING_API}/api/track-click` +
    `?linkId=${encodeURIComponent('family-directory_' + linkId)}` +
    `&redirectUrl=${encodeURIComponent(redirectUrl)}`;
  
  try {
    navigator.sendBeacon(beaconUrl);
  } catch {
    fetch(beaconUrl, { method: 'GET', keepalive: true }).catch(() => {});
  }
}
