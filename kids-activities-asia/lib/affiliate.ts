// ─── Affiliate Configuration for Kids Activities Asia ───────────
// Centralized affiliate IDs — one place to update all affiliate links.
// Uses same format as sister sites for universal inject script.

export const AFFILIATE = {
  // Klook: https://affiliate.klook.com/
  klookId: '119991',  // ⚠️ REPLACE with real ID

  // Booking.com: https://partners.booking.com/
  bookingId: '2875669', // ⚠️ REPLACE with real ID

  // Viator: https://partners.viator.com/
  viatorPid: 'P00299136', // ⚠️ REPLACE with real ID
  viatorMcid: '42383',

  // GetYourGuide: https://partner.getyourguide.com/
  getYourGuideId: 'YOUR_GYG_ID', // ⚠️ REPLACE with real ID

  // Amazon: https://affiliate-program.amazon.com/
  amazonTag: 'YOUR_AMAZON_TAG', // ⚠️ REPLACE with real ID
};

/**
 * Build an affiliate-tracked Klook search URL for kids activities.
 */
export function klookUrl(keyword: string): string {
  return `https://www.klook.com/search/?keyword=${encodeURIComponent(keyword)}&aid=${AFFILIATE.klookId}`;
}

/**
 * Build a Booking.com URL with affiliate tracking for family-friendly hotels.
 */
export function bookingUrl(location: string): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}&aid=${AFFILIATE.bookingId}`;
}

/**
 * Build a Viator search URL for kids' tours and activities.
 */
export function viatorUrl(location: string): string {
  const clean = location.replace(/[^a-zA-Z]/g, '');
  return `https://www.viator.com/${clean}/things-to-do?aid=${AFFILIATE.viatorPid}`;
}

/**
 * Build an affiliate deep link for a specific Klook activity.
 */
export function klookActivityUrl(activitySlug: string): string {
  return `https://www.klook.com/activity/${activitySlug}/?aid=${AFFILIATE.klookId}`;
}
