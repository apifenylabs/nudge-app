import { NextRequest, NextResponse } from 'next/server';
import { allDestinations } from '@/lib/data';

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  imageUrl: string;
  tipsAndTricks?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const all = allDestinations as Destination[];
    const { query, category, ageRange, priceRange, minSafety, country, sort } = await request.json();
    let filtered = [...all];

    if (query && typeof query === 'string' && query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((d) => d.category === category);
    }

    if (ageRange && ageRange !== 'All') {
      filtered = filtered.filter((d) => {
        const parts = d.ageRange.split('-');
        const destMin = parseInt(parts[0]);
        const destMax = parts[1] ? parseInt(parts[1]) : destMin;
        if (isNaN(destMin)) return false;
        if (ageRange === '0-3') return destMin <= 3;
        if (ageRange === '4-9') return destMin <= 9 && destMax >= 4;
        if (ageRange === '10+') return destMax >= 10;
        return true;
      });
    }

    if (priceRange && priceRange !== 'All') {
      const priceLen = priceRange.replace(/[^$]/g, '').length || 1;
      filtered = filtered.filter((d) => {
        const destLen = d.priceRange.replace(/[^$]/g, '').length || 1;
        return destLen === priceLen;
      });
    }

    if (minSafety && minSafety > 0) {
      filtered = filtered.filter((d) => d.safetyRating >= minSafety);
    }

    if (country && country !== 'All') {
      filtered = filtered.filter((d) => d.country === country);
    }

    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'popularity') return b.popularity - a.popularity;
        if (sort === 'safety') return b.safetyRating - a.safetyRating;
        if (sort === 'price') {
          const aLen = a.priceRange.replace(/[^$]/g, '').length || 1;
          const bLen = b.priceRange.replace(/[^$]/g, '').length || 1;
          return aLen - bLen;
        }
        return 0;
      });
    }

    return NextResponse.json({ results: filtered, total: filtered.length });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search destinations' }, { status: 500 });
  }
}
