// Country Directory — auto-discovered from app/ai-tools-* directories
// Used for cross-linking between blog posts and country pages.
// Kept in sync with actual directory structure at build time.

import fs from 'fs';
import path from 'path';

const COUNTRY_DIR = path.join(process.cwd(), 'app');

export interface CountryEntry {
  slug: string;       // e.g. 'ai-tools-singapore'
  name: string;       // e.g. 'Singapore'
  keywords: string[];  // Match tokens for auto-linking
  region: string;     // 'asia' | 'europe' | 'americas' | 'africa' | 'oceania' | 'middle-east'
}

// Region classification for known countries
const REGIONS: Record<string, string> = {
  // Asia (28)
  singapore: 'asia', malaysia: 'asia', 'hong-kong': 'asia', vietnam: 'asia',
  philippines: 'asia', indonesia: 'asia', thailand: 'asia', cambodia: 'asia',
  myanmar: 'asia', japan: 'asia', 'south-korea': 'asia', taiwan: 'asia',
  india: 'asia', bangladesh: 'asia', 'sri-lanka': 'asia', nepal: 'asia',
  china: 'asia', pakistan: 'asia', russia: 'asia',
  // Europe (24)
  uk: 'europe', france: 'europe', germany: 'europe', italy: 'europe', spain: 'europe',
  netherlands: 'europe', switzerland: 'europe', sweden: 'europe', norway: 'europe',
  denmark: 'europe', finland: 'europe', austria: 'europe', belgium: 'europe',
  ireland: 'europe', poland: 'europe', portugal: 'europe', greece: 'europe',
  'czech-republic': 'europe', hungary: 'europe', romania: 'europe', bulgaria: 'europe',
  croatia: 'europe', slovakia: 'europe', slovenia: 'europe', serbia: 'europe',
  estonia: 'europe', latvia: 'europe', lithuania: 'europe', ukraine: 'europe',
  iceland: 'europe', luxembourg: 'europe',
  // Americas (11)
  usa: 'americas', canada: 'americas', mexico: 'americas', brazil: 'americas',
  argentina: 'americas', chile: 'americas', colombia: 'americas', peru: 'americas',
  'costa-rica': 'americas', uruguay: 'americas', panama: 'americas',
  // Africa (5)
  nigeria: 'africa', kenya: 'africa', ghana: 'africa', 'south-africa': 'africa',
  morocco: 'africa', egypt: 'africa',
  // Oceania (2)
  australia: 'oceania', 'new-zealand': 'oceania',
  // Middle East (8)
  uae: 'middle-east', 'saudi-arabia': 'middle-east', qatar: 'middle-east',
  kuwait: 'middle-east', oman: 'middle-east', jordan: 'middle-east',
  israel: 'middle-east', turkey: 'middle-east',
};

// Friendly display names
const DISPLAY_NAMES: Record<string, string> = {
  uae: 'UAE', uk: 'UK', usa: 'USA',
  'hong-kong': 'Hong Kong', 'south-korea': 'South Korea', 'sri-lanka': 'Sri Lanka',
  'costa-rica': 'Costa Rica', 'czech-republic': 'Czech Republic', 'new-zealand': 'New Zealand',
  'saudi-arabia': 'Saudi Arabia', 'south-africa': 'South Africa',
};

function toTitle(slug: string): string {
  return DISPLAY_NAMES[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildKeywords(name: string): string[] {
  const lower = name.toLowerCase();
  const parts = lower.split(/[\s-]+/);
  // Common aliases
  const aliases: Record<string, string[]> = {
    uae: ['uae', 'united-arab-emirates', 'dubai', 'abu-dhabi', 'emirates'],
    uk: ['uk', 'united-kingdom', 'britain', 'england', 'london', 'scotland', 'wales'],
    usa: ['usa', 'united-states', 'america', 'us', 'new-york', 'california', 'silicon-valley'],
    'hong-kong': ['hong-kong', 'hong kong', 'hk'],
    'south-korea': ['south-korea', 'korea', 'seoul'],
    'sri-lanka': ['sri-lanka', 'colombo'],
    'new-zealand': ['new-zealand', 'auckland', 'wellington'],
    'saudi-arabia': ['saudi-arabia', 'saudi', 'riyadh'],
    'south-africa': ['south-africa', 'cape-town', 'johannesburg'],
  };
  return aliases[lower] || [lower, ...parts];
}

/**
 * Discover country pages from directory listing.
 * Cached after first call within a build.
 */
let _cache: CountryEntry[] | null = null;

export function getAllCountries(): CountryEntry[] {
  if (_cache) return _cache;

  const entries: CountryEntry[] = [];
  try {
    const items = fs.readdirSync(COUNTRY_DIR, { withFileTypes: true });
    for (const item of items) {
      if (!item.isDirectory()) continue;
      const match = item.name.match(/^ai-tools-(.+)$/);
      if (!match) continue;
      const slug = match[1];
      const name = toTitle(slug);
      entries.push({
        slug: `ai-tools-${slug}`,
        name,
        keywords: buildKeywords(name),
        region: REGIONS[slug] || 'asia',
      });
    }
  } catch {
    // Fallback: return empty rather than crash
  }

  _cache = entries;
  return entries;
}

/**
 * Get countries by region.
 */
export function getCountriesByRegion(region: string): CountryEntry[] {
  return getAllCountries().filter(c => c.region === region);
}

/**
 * Get countries that match a blog post's tags/slug for cross-linking.
 */
export function getMatchingCountries(
  slug: string,
  tags: string[],
  region?: string
): CountryEntry[] {
  const all = region ? getCountriesByRegion(region) : getAllCountries();
  const lowerTags = tags.map(t => t.toLowerCase());
  const lowerSlug = slug.toLowerCase();

  return all.filter(country => {
    const tagMatch = country.keywords.some(kw =>
      lowerTags.some(t => t.includes(kw))
    );
    const slugMatch = country.keywords.some(kw => lowerSlug.includes(kw));
    return tagMatch || slugMatch;
  });
}
