import { NextRequest, NextResponse } from 'next/server';
import { getTipsByStation, addTip } from '@/lib/tip-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('stationId');

  if (stationId) {
    const result = getTipsByStation(stationId);
    return NextResponse.json({ tips: result, total: result.length });
  }

  return NextResponse.json({ tips: [], total: 0 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stationId, author, text, category, rating } = body;

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
    });

    return NextResponse.json({ success: true, tip: newTip }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
