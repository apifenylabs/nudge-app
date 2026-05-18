import type { AffiliateLink } from "./types";

// ───── Affiliate Link Presets ──────────────────────────────────────────────

interface AffiliatePreset {
  provider: "booking" | "klook" | "viator";
  label: string;
  baseUrl: string;
  placeholder: string;
}

const AFFILIATE_PRESETS: AffiliatePreset[] = [
  {
    provider: "booking",
    label: "Booking.com",
    baseUrl: "https://www.booking.com/search.html?ss=",
    placeholder: "Search Booking.com for hotels",
  },
  {
    provider: "klook",
    label: "Klook",
    baseUrl: "https://www.klook.com/search?keyword=",
    placeholder: "Search Klook for activities",
  },
  {
    provider: "viator",
    label: "Viator",
    baseUrl: "https://www.viator.com/search?query=",
    placeholder: "Search Viator for tours",
  },
];

export function getAffiliatePresets(): AffiliatePreset[] {
  return AFFILIATE_PRESETS;
}

export function generateAffiliateLink(
  provider: AffiliateLink["provider"],
  query: string
): AffiliateLink {
  const preset = AFFILIATE_PRESETS.find((p) => p.provider === provider);
  const url = preset
    ? `${preset.baseUrl}${encodeURIComponent(query)}`
    : "#";

  return {
    provider,
    url,
    label: `Check ${preset?.label || provider} for deals`,
  };
}
