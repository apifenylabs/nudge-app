// ─── Affiliate Configuration for Kids Activities Asia ───────────
// Centralized affiliate IDs — one place to update all affiliate links.
// Uses same format as sister sites for universal inject script.

const envAid = (key: string, fallback: string): string =>
  (typeof process !== 'undefined' && process.env?.[key]) || fallback;

export const AFFILIATE = {
  // Klook: https://affiliate.klook.com/
  klookId: envAid('NEXT_PUBLIC_KLOOK_AFFILIATE_ID', '119991'),

  // Booking.com: https://partners.booking.com/
  bookingId: envAid('NEXT_PUBLIC_BOOKING_AFFILIATE_ID', '2875669'),

  // Viator: https://partners.viator.com/
  viatorPid: envAid('NEXT_PUBLIC_VIATOR_AFFILIATE_ID', 'P00299136'),
  viatorMcid: envAid('NEXT_PUBLIC_VIATOR_MCID', '42383'),

  // GetYourGuide: https://partner.getyourguide.com/
  getYourGuideId: envAid('NEXT_PUBLIC_GYG_AFFILIATE_ID', ''),

  // Amazon: https://affiliate-program.amazon.com/
  amazonTag: envAid('NEXT_PUBLIC_AMAZON_AFFILIATE_TAG', ''),
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

// ─── Central Tracking Beacon ──────────────────────────────────
// Fires a server-side tracking event to the central affiliate-tracking API.
// Call from onClick handlers alongside the navigation.

const TRACKING_API = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AFFILIATE_TRACKING_URL)
  || 'https://affiliate-tracking.vercel.app';

/**
 * Fire a tracking beacon to the central affiliate tracking API.
 * Uses sendBeacon for reliable fire-and-forget delivery.
 * Call this before navigating to an affiliate link.
 *
 * @param linkId - A unique identifier for this link
 * @param redirectUrl - The actual URL the user is being redirected to
 */
export function fireAffiliateBeacon(linkId: string, redirectUrl: string): void {
  if (typeof window === 'undefined') return;
  
  const beaconUrl = `${TRACKING_API}/api/track-click` +
    `?linkId=${encodeURIComponent('kids-activities-asia_' + linkId)}` +
    `&redirectUrl=${encodeURIComponent(redirectUrl)}`;
  
  try {
    navigator.sendBeacon(beaconUrl);
  } catch {
    fetch(beaconUrl, { method: 'GET', keepalive: true }).catch(() => {});
  }
}
