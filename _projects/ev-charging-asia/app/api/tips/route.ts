import { NextRequest, NextResponse } from 'next/server';
import { getTipsByStation, getTipsByStationPaginated, addTip } from '@/lib/tip-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('stationId');
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  if (stationId) {
    if (page > 1) {
      // Paginated response
      const result = getTipsByStationPaginated(stationId, page);
      return NextResponse.json({
        tips: result.tips,
        total: result.total,
        page,
        hasMore: result.hasMore,
      });
    }
    // Full response for backward compatibility
    const result = getTipsByStation(stationId);
    const all = getTipsByStationPaginated(stationId, 999);
    return NextResponse.json({
      tips: result,
      total: result.length,
      page: 1,
      hasMore: all.hasMore,
    });
  }

  return NextResponse.json({ tips: [], total: 0, page: 1, hasMore: false });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stationId, author, text, category, rating, photoUrl } = body;

    if (!stationId || !text) {
      return NextResponse.json(
        { error: 'stationId and text are required' },
        { status: 400 }
      );
    }

    if (text.length < 10 || text.length > 500) {
      return NextResponse.json(
        { error: 'Tip must be between 10 and 500 characters' },
        { status: 400 }
      );
    }

    const newTip = addTip({
      stationId,
      author: author?.trim() || 'Anonymous',
      text: text.trim(),
      category: category || 'general',
      rating: rating || undefined,
      photoUrl: photoUrl || undefined,
    });

    return NextResponse.json({ success: true, tip: newTip }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
