import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Leaderboard API — returns sorted route popularity entries
 * with names and metadata from the itinerary data.
 * 
 * GET /api/vote/leaderboard
 */
export async function GET(_request: NextRequest) {
  // Dynamic import to avoid circular deps
  const { getAllItineraries } = await import('@/data/itineraries');
  const allRoutes = getAllItineraries();

  // Build a map of routeId -> route info
  const routeMap = new Map(allRoutes.map(r => [r.id, r]));

  // Try to fetch from the vote store (same module as the vote API)
  const origin = _request.nextUrl.origin;
  const voteResponse = await fetch(`${origin}/api/vote`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const entries: Array<{
    slug: string;
    title: string;
    displayName: string;
    averageRating: number;
    totalVotes: number;
    difficulty: string;
    duration: string;
    countries: string[];
  }> = [];

  if (voteResponse.ok) {
    const voteData = await voteResponse.json();
    const scores = voteData.scores || [];

    for (const score of scores) {
      const route = routeMap.get(score.routeId);
      if (!route) continue;

      entries.push({
        slug: route.slug,
        title: route.title,
        displayName: route.title.split(':')[0] || route.title,
        averageRating: score.averageRating,
        totalVotes: score.totalVotes,
        difficulty: route.difficulty,
        duration: route.duration,
        countries: route.countries,
      });
    }
  }

  return NextResponse.json({ entries });
}
