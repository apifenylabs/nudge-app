import { NextRequest, NextResponse } from 'next/server';
import { getAllItineraries } from '@/data/itineraries';
import { getSimilarRoutes } from '@/lib/route-suggestions';

/**
 * GET /api/suggest?route=bangkok-to-phuket-road-trip&count=3
 *
 * Returns similar routes based on weighted similarity scoring.
 * Used by the compare page for "You might also like" suggestions
 * and by the route planning AI widget.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const routeSlug = searchParams.get('route');
  const countParam = searchParams.get('count');
  const count = Math.min(Math.max(parseInt(countParam || '3', 10) || 3, 1), 6);

  if (!routeSlug) {
    // No route specified — return the top route pairs for quick start
    const all = getAllItineraries();
    const starterPairs = all.slice(0, Math.min(6, all.length)).map(r => ({
      slug: r.slug,
      id: r.id,
      title: r.title.split(':')[0] || r.title,
      distance: r.totalDistanceKm,
      duration: r.duration,
      difficulty: r.difficulty,
      countries: r.countries,
      tags: r.tags.slice(0, 4),
      cities: r.cities,
    }));

    return NextResponse.json({
      suggestions: starterPairs,
      total: all.length,
      note: 'Pass ?route=SLUG to get similarity-based suggestions',
    });
  }

  const similar = getSimilarRoutes(routeSlug, count);

  const suggestions = similar.map(s => ({
    slug: s.itinerary.slug,
    id: s.itinerary.id,
    title: s.itinerary.title.split(':')[0] || s.itinerary.title,
    distance: s.itinerary.totalDistanceKm,
    duration: s.itinerary.duration,
    difficulty: s.itinerary.difficulty,
    countries: s.itinerary.countries,
    tags: s.itinerary.tags.slice(0, 4),
    cities: s.itinerary.cities,
    similarity: s.similarity,
    similarityPercent: Math.round(s.similarity * 100),
  }));

  return NextResponse.json({
    source: routeSlug,
    suggestions,
    total: suggestions.length,
  });
}
