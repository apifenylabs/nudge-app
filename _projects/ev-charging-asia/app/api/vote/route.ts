import { NextRequest, NextResponse } from 'next/server';
import {
  addOrUpdateVote,
  getVotesForRoute,
  getAllScores,
} from '@/lib/vote-store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { routeId, rating } = body;

    if (!routeId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'routeId and rating (1-5) are required' },
        { status: 400 }
      );
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    const { updated } = addOrUpdateVote(routeId, ip, rating);

    const routeScore = getVotesForRoute(routeId);

    return NextResponse.json({
      success: true,
      routeId,
      score: routeScore?.score,
      updated,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const routeId = searchParams.get('routeId');

  if (routeId) {
    const result = getVotesForRoute(routeId);
    if (result) {
      return NextResponse.json({ routeId, score: result.score, userVote: result.userVote });
    }
    return NextResponse.json({
      routeId,
      score: { totalVotes: 0, averageRating: 0, starDistribution: [0, 0, 0, 0, 0] },
      userVote: 0,
    });
  }

  const allScores = getAllScores();
  return NextResponse.json({ scores: allScores });
}
