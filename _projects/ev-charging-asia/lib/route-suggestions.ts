/**
 * Route Suggestion Engine for EV Charging Asia
 *
 * Suggests comparable routes based on similarity scoring.
 * Used by the compare page to recommend routes and show "You might also like" suggestions.
 * Uses pre-computed similarity matrices for instant results (no API calls).
 */

import { getAllItineraries, itineraries, Itinerary } from '@/data/itineraries';

const allItineraries = getAllItineraries();

/** How each factor contributes to similarity (higher = more important) */
const WEIGHTS = {
  region: 4,         // Same country/region = very similar
  difficulty: 3,     // Same difficulty level
  distance: 2,       // Similar total distance
  duration: 2,       // Similar trip duration
  tags: 1.5,         // Tag overlap
  luxury: 1,         // Luxury highlights overlap
  family: 1,         // Family highlights overlap
} as const;

/** Normalized distance delta (0-1, 0 = identical distance) */
function distanceDelta(a: Itinerary, b: Itinerary): number {
  const maxDist = Math.max(a.totalDistanceKm, b.totalDistanceKm);
  if (maxDist === 0) return 0;
  return Math.abs(a.totalDistanceKm - b.totalDistanceKm) / maxDist;
}

/** Normalized duration delta (0-1) */
function durationDelta(a: Itinerary, b: Itinerary): number {
  const aDays = parseInt(a.duration) || 3;
  const bDays = parseInt(b.duration) || 3;
  const max = Math.max(aDays, bDays);
  if (max === 0) return 0;
  return Math.abs(aDays - bDays) / max;
}

/** Jaccard similarity for tag/lists */
function tagOverlap(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/** Region similarity — same countries or nearby regions */
function regionScore(a: Itinerary, b: Itinerary): number {
  const countryOverlap = a.countries.some(c => b.countries.includes(c));
  return countryOverlap ? 1 : 0;
}

/** Difficulty match */
function difficultyScore(a: Itinerary, b: Itinerary): number {
  return a.difficulty === b.difficulty ? 1 : 0;
}

/**
 * Compute similarity score between two itineraries (0-1, higher = more similar).
 */
export function computeSimilarity(a: Itinerary, b: Itinerary): number {
  if (a.id === b.id) return 1; // Identical

  const score =
    WEIGHTS.region * regionScore(a, b) +
    WEIGHTS.difficulty * difficultyScore(a, b) +
    WEIGHTS.distance * (1 - distanceDelta(a, b)) +
    WEIGHTS.duration * (1 - durationDelta(a, b)) +
    WEIGHTS.tags * tagOverlap(a.tags, b.tags) +
    WEIGHTS.luxury * tagOverlap(a.luxuryHighlights, b.luxuryHighlights) +
    WEIGHTS.family * tagOverlap(a.familyHighlights, b.familyHighlights);

  const maxScore = Object.values(WEIGHTS).reduce((s, w) => s + w, 0);
  return Math.round((score / maxScore) * 100) / 100;
}

/**
 * Get top-N similar routes to a given itinerary.
 * Filter out the source route by default.
 */
export function getSimilarRoutes(
  sourceSlugOrId: string,
  count: number = 4
): Array<{ itinerary: Itinerary; similarity: number }> {
  const source = allItineraries.find(
    i => i.slug === sourceSlugOrId || i.id === sourceSlugOrId
  );
  if (!source) return [];

  const scored = allItineraries
    .filter(i => i.id !== source.id)
    .map(i => ({
      itinerary: i,
      similarity: computeSimilarity(source, i),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count);

  return scored;
}

/**
 * Get recommended pairings for the compare page.
 * Shows similar routes that are worth comparing.
 */
export function getCompareSuggestions(
  selectedSlug?: string
): Array<{ slug: string; title: string; subtitle: string }> {
  if (!selectedSlug) {
    // Default suggestions: most popular starting pairs
    return [
      { slug: 'singapore-to-kuala-lumpur-road-trip', title: 'Singapore → KL vs Bangkok → Chiang Mai', subtitle: 'Compare city-to-city drives' },
      { slug: 'bangkok-to-phuket-road-trip', title: 'Bangkok → Phuket vs KL → Penang', subtitle: 'Compare beach destination routes' },
      { slug: 'tokyo-to-hakone-fuji-road-trip', title: 'Tokyo → Hakone vs Seoul → Busan', subtitle: 'Compare mountain vs coastal drives' },
    ];
  }

  const source = allItineraries.find(i => i.slug === selectedSlug || i.id === selectedSlug);
  if (!source) return [];

  const similar = getSimilarRoutes(source.slug, 3);
  return similar.map(s => ({
    slug: s.itinerary.slug,
    title: `${source.title.split(':')[0]} vs ${s.itinerary.title.split(':')[0]}`,
    subtitle: `Similar difficulty (${s.itinerary.difficulty}), ${s.itinerary.totalDistanceKm}km — ${Math.round(s.similarity * 100)}% match`,
  }));
}

/**
 * Get "nearby" alternative — same country/region, different difficulty or style.
 */
export function getAlternatives(country: string, excludeSlug: string): Itinerary[] {
  return allItineraries
    .filter(i => i.countries.includes(country) && i.slug !== excludeSlug)
    .slice(0, 3);
}

export type CompareSuggestion = ReturnType<typeof getCompareSuggestions>[number];

/**
 * Pre-computed all pairs for instant leaderboard and recommendations.
 */
export function getAllSimilarityPairs(): Map<string, Array<{ slug: string; similarity: number }>> {
  const map = new Map<string, Array<{ slug: string; similarity: number }>>();

  for (const a of allItineraries) {
    const pairs = allItineraries
      .filter(b => b.id !== a.id)
      .map(b => ({ slug: b.slug, similarity: computeSimilarity(a, b) }))
      .sort((x, y) => y.similarity - x.similarity);

    map.set(a.slug, pairs);
    map.set(a.id, pairs);
  }

  return map;
}
