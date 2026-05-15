import { NextRequest, NextResponse } from 'next/server';
import { recordVote, getTipStats } from '@/lib/tip-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipId, stationId } = body;

    if (!tipId) {
      return NextResponse.json(
        { error: 'tipId is required' },
        { status: 400 }
      );
    }

    // Record vote with a composite key (stationId + tipId) to allow per-session counting
    const voteKey = `${stationId || 'global'}:${tipId}`;
    recordVote(voteKey);

    const stats = getTipStats(tipId);

    return NextResponse.json({
      success: true,
      tipId,
      totalVotes: stats.totalVotes,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
