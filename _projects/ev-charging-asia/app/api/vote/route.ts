import { NextRequest, NextResponse } from 'next/server';

// In-memory vote store for route popularity
// In production, use a database
interface VoteRecord {
  routeId: string;
  ip: string;
  rating: number; // 1-5 stars
  votedAt: string;
}

const votes: VoteRecord[] = [];

// Aggregated scores
const routeScores: Record<string, { totalVotes: number; averageRating: number; starDistribution: number[] }> = {};

function recalculate(routeId: string) {
  const routeVotes = votes.filter(v => v.routeId === routeId);
  const total = routeVotes.length;
  if (total === 0) {
    delete routeScores[routeId];
    return;
  }
  const sum = routeVotes.reduce((a, v) => a + v.rating, 0);
  const distribution = [0, 0, 0, 0, 0]; // 1-5
  routeVotes.forEach(v => { distribution[v.rating - 1]++; });
  routeScores[routeId] = {
    totalVotes: total,
    averageRating: Math.round((sum / total) * 10) / 10,
    starDistribution: distribution,
  };
}

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

    // Get client IP for dedup
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';

    // Check if this IP already voted for this route
    const existingVoteIndex = votes.findIndex(v => v.routeId === routeId && v.ip === ip);
    if (existingVoteIndex >= 0) {
      // Update existing vote
      votes[existingVoteIndex] = { routeId, ip, rating, votedAt: new Date().toISOString() };
    } else {
      votes.push({ routeId, ip, rating, votedAt: new Date().toISOString() });
    }

    recalculate(routeId);

    return NextResponse.json({
      success: true,
      routeId,
      score: routeScores[routeId],
      updated: existingVoteIndex >= 0,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const routeId = searchParams.get('routeId');

  if (routeId) {
    const score = routeScores[routeId] || { totalVotes: 0, averageRating: 0, starDistribution: [0, 0, 0, 0, 0] };
    // Get user's vote if available
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    const userVote = votes.find(v => v.routeId === routeId && v.ip === ip);
    return NextResponse.json({ routeId, score, userVote: userVote?.rating || 0 });
  }

  // Return all scores sorted by popularity
  const allScores = Object.entries(routeScores)
    .map(([id, score]) => ({ routeId: id, ...score }))
    .sort((a, b) => b.totalVotes - a.totalVotes || b.averageRating - a.averageRating);

  return NextResponse.json({ scores: allScores });
}
