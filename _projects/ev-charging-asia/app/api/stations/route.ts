import { NextResponse } from 'next/server';
import stationsData from '@/data/stations.json';

/** GET /api/stations — returns all stations for client-side use */
export async function GET() {
  return NextResponse.json({ stations: stationsData }, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
