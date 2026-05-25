/**
 * Affiliate Click Tracking Utility
 *
 * Records affiliate link clicks to localStorage AND fires a server-side
 * beacon to the central affiliate-tracking dashboard for cross-site
 * commission tracking.
 *
 * Privacy: IP is hashed by the server. No PII collected.
 */

const STORAGE_KEY = 'evca_affiliate_clicks';
const TRACKING_API = process.env.NEXT_PUBLIC_AFFILIATE_TRACKING_URL || 'https://affiliate-tracking.vercel.app';

export interface ClickRecord {
  linkId: string;
  timestamp: number;
  page: string;
}

/**
 * Fire a server-side click beacon to the central affiliate tracking API.
 * Uses sendBeacon for reliability — it survives page navigation.
 */
function fireTrackingBeacon(linkId: string, page: string): void {
  if (typeof window === 'undefined') return;
  
  // Build redirect URL from the link ID lookup (done on the server side)
  const beaconUrl = `${TRACKING_API}/api/track-click` +
    `?linkId=${encodeURIComponent('evca_' + linkId)}` +
    `&redirectUrl=${encodeURIComponent(window.location.href)}`;
  
  // sendBeacon is the most reliable way to fire-and-forget before navigation
  try {
    navigator.sendBeacon(beaconUrl);
  } catch {
    // Fallback: use fetch (may be cancelled on navigation)
    fetch(beaconUrl, { method: 'GET', keepalive: true }).catch(() => {});
  }
}

/**
 * Track an affiliate link click by recording it to localStorage
 * AND firing a server-side beacon.
 * Call this from the onClick handler of any affiliate link.
 *
 * @param linkId - The id from the AffiliateLink entry in affiliate-links.ts
 * @param page - The current page path (e.g. window.location.pathname)
 */
export function trackAffiliateClick(linkId: string, page?: string): void {
  if (typeof window === 'undefined') return;

  const resolvedPage = page || (window.location.pathname + window.location.search);

  // Server-side beacon (fire-and-forget)
  fireTrackingBeacon(linkId, resolvedPage);

  // Client-side localStorage record
  const record: ClickRecord = {
    linkId,
    timestamp: Date.now(),
    page: resolvedPage,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const records: ClickRecord[] = raw ? JSON.parse(raw) : [];
    records.push(record);

    // Keep only last 50,000 records to avoid quota issues
    if (records.length > 50000) {
      records.splice(0, records.length - 50000);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }
}

/**
 * React onClick handler factory for affiliate links.
 * Returns a handler that tracks the click then navigates.
 *
 * Usage: <a href={url} onClick={handleAffiliateClick(linkId)} ...>
 */
export function handleAffiliateClick(linkId: string, page?: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackAffiliateClick(linkId, page);
    // Let the default navigation happen — no preventDefault
  };
}
