import { NextRequest, NextResponse } from 'next/server';

// In-memory store — in production use a database or KV store
// For this project tips persist per session/reload of the server
interface Tip {
  id: string;
  stationId: string;
  author: string;
  text: string;
  category: 'family' | 'luxury' | 'wellness' | 'charging' | 'general';
  rating?: number;
  createdAt: string;
  helpful: number;
}

const tips: Tip[] = [
  // Seed tips for popular stations
  {
    id: 'seed-1',
    stationId: 'bangkok-1',
    author: 'Sarah L.',
    text: 'Great for families — there\'s a playground right next to the charging area. Grab coffee at Starbucks while the kids play.',
    category: 'family',
    rating: 5,
    createdAt: '2025-12-15T10:30:00Z',
    helpful: 12,
  },
  {
    id: 'seed-2',
    stationId: 'bangkok-2',
    author: 'Mike C.',
    text: 'Very reliable 250kW charger. The mall has a food court with kid-friendly options on the 3rd floor.',
    category: 'charging',
    rating: 4,
    createdAt: '2025-11-20T08:15:00Z',
    helpful: 8,
  },
  {
    id: 'seed-3',
    stationId: 'singapore-1',
    author: 'Amanda K.',
    text: 'Luxury experience. The Conrad hotel valet parks and charges your EV. Perfect for a weekend getaway.',
    category: 'luxury',
    rating: 5,
    createdAt: '2025-10-05T14:00:00Z',
    helpful: 15,
  },
  {
    id: 'seed-4',
    stationId: 'kl-1',
    author: 'David T.',
    text: 'Easy to find, well-lit at night. Has a 7-Eleven next door for snacks. Toilets are clean.',
    category: 'wellness',
    rating: 4,
    createdAt: '2025-09-28T16:45:00Z',
    helpful: 6,
  },
  {
    id: 'seed-5',
    stationId: 'chiang-mai-1',
    author: 'Emily R.',
    text: 'Beautiful mountain drive to get here. Charger works perfectly. Try the nearby café for organic coffee.',
    category: 'wellness',
    rating: 5,
    createdAt: '2025-08-12T09:20:00Z',
    helpful: 22,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('stationId');

  let result = tips;
  if (stationId) {
    result = tips.filter(t => t.stationId === stationId);
  }

  return NextResponse.json({
    tips: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    total: result.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stationId, author, text, category, rating } = body;

    // Validation
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

    const newTip: Tip = {
      id: `tip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      stationId,
      author: author?.trim() || 'Anonymous',
      text: text.trim(),
      category: category || 'general',
      rating: rating || undefined,
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    tips.push(newTip);

    return NextResponse.json({ success: true, tip: newTip }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
