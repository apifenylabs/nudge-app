import { NextRequest, NextResponse } from 'next/server';
import { allDestinations } from '@/lib/data';
import { computeScore, scoreTier } from '@/lib/scoring';

interface RawDest {
  id: string;
  name: string;
  safetyRating: number;
  popularity: number;
  ageRange: string;
  tipsAndTricks: string[];
  gallery: string[];
  amenities: string[];
  [key: string]: unknown;
}

/** GET /api/score — score all destinations or a specific one */
export async function GET(req: NextRequest) {
  try {
    const all: RawDest[] = allDestinations as unknown as RawDest[];
    const destId = req.nextUrl.searchParams.get('id');

    const scored = all.map((d) => {
      const result = computeScore({
        safetyRating: d.safetyRating || 3,
        popularity: d.popularity || 50,
        ageRange: d.ageRange || 'All',
        tipsAndTricks: (d.tipsAndTricks || []).length,
        galleryLength: (d.gallery || []).length,
        reviewRating: null,
        reviewCount: 0,
        amenities: (d.amenities || []).length,
      });
      const tier = scoreTier(result.overall);
      return {
        id: d.id,
        name: d.name,
        score: result,
        tier,
      };
    });

    scored.sort((a, b) => b.score.overall - a.score.overall);

    if (destId) {
      const match = scored.find((s) => s.id === destId);
      if (!match) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }
      return NextResponse.json(match);
    }

    return NextResponse.json({
      scores: scored,
      total: scored.length,
      topScore: scored[0]?.score.overall || 0,
      avgScore: scored.length > 0 ? Math.round(scored.reduce((s, x) => s + x.score.overall, 0) / scored.length) : 0,
    });
  } catch (err) {
    console.error('Score API error:', err);
    return NextResponse.json({ error: 'Failed to compute scores' }, { status: 500 });
  }
}
