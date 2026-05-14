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

export function getDestinationBySlug(slug: string): Destination | undefined {
  return allDestinations.find((d) => d.slug === slug) || allDestinations.find((d) => d.id === slug);
}

export function getDestinationById(id: string): Destination | undefined {
  return allDestinations.find((d) => d.id === id);
}
