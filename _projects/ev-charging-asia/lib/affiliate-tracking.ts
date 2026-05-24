/**
 * Affiliate Click Tracking Utility
 *
 * Records affiliate link clicks to localStorage for the
 * affiliate commission tracking dashboard at /affiliate.
 *
 * The dashboard reads from the same localStorage key.
 * Data is never sent to a server — purely client-side
 * until Supabase env vars become available.
 */

const STORAGE_KEY = 'evca_affiliate_clicks';

export interface ClickRecord {
  linkId: string;
  timestamp: number;
  page: string;
}

/**
 * Track an affiliate link click by recording it to localStorage.
 * Call this from the onClick handler of any affiliate link.
 *
 * @param linkId - The id from the AffiliateLink entry in affiliate-links.ts
 * @param page - The current page path (e.g. window.location.pathname)
 */
export function trackAffiliateClick(linkId: string, page?: string): void {
  if (typeof window === 'undefined') return;

  const record: ClickRecord = {
    linkId,
    timestamp: Date.now(),
    page: page || (window.location.pathname + window.location.search),
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
    // localStorage quota exceeded or unavailable — silently fail
    // In production, this could fire a beacon to an API endpoint
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Clear old records and retry once
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
