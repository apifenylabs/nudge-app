// ─── Affiliate Configuration ──────────────────────────────────────
// Change these values to update all affiliate links across the site.

export const AFFILIATE = {
  // Klook Affiliate ID: https://affiliate.klook.com/
  klookId: '119991',

  // Booking.com Affiliate ID: https://partners.booking.com/ (aid=2875669)
  bookingId: '2875669',

  // Viator Affiliate ID: https://partners.viator.com/ (aid=P00299136)
  viatorPid: 'P00299136',
  viatorMcid: '42383',
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
