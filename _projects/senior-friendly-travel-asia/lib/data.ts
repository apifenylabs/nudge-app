/**
 * Senior-Friendly Travel Asia — Data Layer
 *
 * Loads destination data from public/data/ JSON files.
 */

export interface TopSpot {
  name: string;
  notes: string;
  accessibility: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  slug: string;
  score: number;
  tier: number;
  description: string;
  topSpots: TopSpot[];
  bestTime: string;
  accessibility: number;
  transport: string;
  healthcare: string;
  highlights: string[];
  practicalTips: string[];
  seoKeywords: string[];
  galleryImages?: { src: string; alt: string; caption?: string }[];
}

// Static import from public/data — works at build time and client-side
import rawData from '@/public/data/destinations.json';

const ALL_DESTINATIONS: Destination[] = rawData as Destination[];

export function getAllDestinations(): Destination[] {
  return ALL_DESTINATIONS;
}

export function getDestinationBySlug(slug: string): Destination | null {
  return ALL_DESTINATIONS.find((d) => d.slug === slug) ?? null;
}

export function getFeaturedDestinations(count: number = 6): Destination[] {
  return ALL_DESTINATIONS
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

export function filterByAccessibility(minScore: number): Destination[] {
  return ALL_DESTINATIONS.filter((d) => d.accessibility >= minScore);
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  imageUrl?: string;
}
