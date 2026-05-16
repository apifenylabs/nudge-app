/**
 * Shared data loader for luxury-family-travel.
 * Imports JSON directly (bundled by Next.js at build time) instead of
 * using fs.readFile which fails on Vercel serverless.
 */

import destinationsData from '@/data/destinations.json';

export interface Destination {
  id: string;
  slug?: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  location: string;
  bestTime: string;
  imageUrl: string;
  amenities: string[];
  safetyFeatures: string[];
  tipsAndTricks: string[];
  gallery?: string[];
  parentStory: { title: string; excerpt: string; author: string; fullStory: string };
  itineraryComparison: { halfDay: string; fullDay: string; bestFor: string };
  commissionRate: string;
  seoKeywords: string[];
}

// Cast and export — single source of truth for all pages/APIs
export const allDestinations: Destination[] = destinationsData as Destination[];

/**
 * Slug alias map — maps legacy IDs used in editorial pages (top10, compare)
 * to actual destination slugs. Prevents 404s from hardcoded references.
 */
export const slugAliases: Record<string, string> = {};

// Build alias map lazily
function buildAliases(): Record<string, string> {
  const aliases: Record<string, string> = {};
  
  // First pass: set all direct id->slug mappings
  for (const d of allDestinations) {
    if (d.id && d.slug) {
      // Don't overwrite if alias already set — first id wins
      if (!aliases[d.id]) {
        aliases[d.id] = d.slug;
      }
    }
  }
  
  // Second pass: set city-001 aliases, preferring premium entries
  for (const d of allDestinations) {
    if (!d.slug) continue;
    const city = (d.city || '').toLowerCase().replace(/\s+/g, '-');
    const cityKey = `${city}-001`;
    
    // Prefer known luxury brand over generic "aquarium" or "park" entries
    const isPremium = /(aman|four seasons|mandarin|soneva|velaa|trisara|ritz|peninsula|st. regis|six senses)/i.test(d.name);
    if (!aliases[cityKey] || isPremium) {
      aliases[cityKey] = d.slug;
    }
  }
  
  // Third pass: set bare city name -> premium slug for that city
  // This enables /destination/tokyo to resolve to "tokyo-family-activity-001"
  for (const d of allDestinations) {
    if (!d.slug) continue;
    const city = (d.city || '').toLowerCase().replace(/\s+/g, '-');
    if (!city) continue;
    // Prefer premium or higher safety-rating for bare city alias
    const isPremium = /(aman|four seasons|mandarin|soneva|velaa|trisara|ritz|peninsula|st. regis|six senses)/i.test(d.name);
    if (!aliases[city] || isPremium) {
      aliases[city] = d.slug;
    }
  }
  
  return aliases;
}

// Cache the alias map
const aliasMap: Record<string, string> = buildAliases();

export function resolveSlug(input: string): string {
  // Check alias map first
  if (aliasMap[input]) return aliasMap[input];
  return input;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  const resolved = resolveSlug(slug);
  return allDestinations.find((d) => d.slug === resolved) || allDestinations.find((d) => d.id === slug);
}

export function getDestinationById(id: string): Destination | undefined {
  return allDestinations.find((d) => d.id === id);
}
