// Geo Pages Data — auto-generated from country-directory.ts
// Static data for client-side consumption (no fs dependency).
// All 79 country pages auto-discovered from app/ai-tools-* directories.
// Keep in sync with country-directory.ts when adding new countries.

export interface GeoPageEntry {
  slug: string;
  name: string;
  keywords: string[];
  region: string;
}

// Region classification for known countries
const REGIONS: Record<string, string> = {
  singapore: 'asia', malaysia: 'asia', 'hong-kong': 'asia', vietnam: 'asia',
  philippines: 'asia', indonesia: 'asia', thailand: 'asia', cambodia: 'asia',
  myanmar: 'asia', japan: 'asia', 'south-korea': 'asia', taiwan: 'asia',
  india: 'asia', bangladesh: 'asia', 'sri-lanka': 'asia', nepal: 'asia',
  china: 'asia', pakistan: 'asia', russia: 'asia',
  uk: 'europe', france: 'europe', germany: 'europe', italy: 'europe', spain: 'europe',
  netherlands: 'europe', switzerland: 'europe', sweden: 'europe', norway: 'europe',
  denmark: 'europe', finland: 'europe', austria: 'europe', belgium: 'europe',
  ireland: 'europe', poland: 'europe', portugal: 'europe', greece: 'europe',
  'czech-republic': 'europe', hungary: 'europe', romania: 'europe', bulgaria: 'europe',
  croatia: 'europe', slovakia: 'europe', slovenia: 'europe', serbia: 'europe',
  estonia: 'europe', latvia: 'europe', lithuania: 'europe', ukraine: 'europe',
  iceland: 'europe', luxembourg: 'europe',
  usa: 'americas', canada: 'americas', mexico: 'americas', brazil: 'americas',
  argentina: 'americas', chile: 'americas', colombia: 'americas', peru: 'americas',
  'costa-rica': 'americas', uruguay: 'americas', panama: 'americas',
  nigeria: 'africa', kenya: 'africa', ghana: 'africa', 'south-africa': 'africa',
  morocco: 'africa', egypt: 'africa',
  australia: 'oceania', 'new-zealand': 'oceania',
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

// Build the full 79-country list at module load time
function buildAllCountries(): GeoPageEntry[] {
  return Object.keys(REGIONS).map(slug => {
    const name = toTitle(slug);
    return {
      slug: `ai-tools-${slug}`,
      name,
      keywords: buildKeywords(name),
      region: REGIONS[slug],
    };
  });
}

export const ALL_GEO_PAGES: GeoPageEntry[] = buildAllCountries();

export const ASIA_KEYWORDS = ['asia', 'southeast-asia', 'sea', 'apac', 'asian'];

/**
 * Get countries by region.
 */
export function getGeoPagesByRegion(region: string): GeoPageEntry[] {
  return ALL_GEO_PAGES.filter(c => c.region === region);
}

/**
 * Get countries that match a blog post's slug/tags for cross-linking.
 */
export function getMatchingGeoPages(
  slug: string,
  tags: string[],
  region?: string
): GeoPageEntry[] {
  const all = region ? getGeoPagesByRegion(region) : ALL_GEO_PAGES;
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
