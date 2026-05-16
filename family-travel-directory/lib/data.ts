/**
 * Shared data loader for family-travel-directory.
 * Imports JSON directly (bundled by Next.js at build time) instead of
 * using fs.readFile which fails on Vercel serverless.
 */

import destinationsData from '@/data/destinations.json';

export interface Destination {
  id: string;
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
  parentStory: {
    title: string;
    excerpt: string;
    author: string;
    fullStory: string;
  };
  itineraryComparison: {
    halfDay: string;
    fullDay: string;
    bestFor: string;
  };
  commissionRate: string;
  seoKeywords: string[];
  slug?: string;
  revenue_engine?: {
    klook_product_id?: string | null;
    viator_product_id?: string | null;
    current_price_usd?: number | null;
    last_price_check?: string | null;
  };
  affiliateLinks?: Record<string, string>;
}

// Cast and export — single source of truth for all pages/APIs
export const allDestinations: Destination[] = destinationsData as Destination[];

/**
 * Get a destination by ID (primary key field in family-travel-directory data)
 */
export function getDestinationById(id: string): Destination | undefined {
  return allDestinations.find(d => d.id === id);
}

/**
 * Get a destination by slug (fallback for SEO-friendly URLs)
 */
export function getDestinationBySlug(slug: string): Destination | undefined {
  return allDestinations.find(d => d.slug === slug) || allDestinations.find(d => d.id === slug);
}

/**
 * Get all unique cities
 */
export function getAllCities(): string[] {
  return [...new Set(allDestinations.map(d => d.city))].sort();
}

/**
 * Get all unique countries
 */
export function getAllCountries(): string[] {
  return [...new Set(allDestinations.map(d => d.country))].sort();
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return [...new Set(allDestinations.map(d => d.category))].sort();
}
