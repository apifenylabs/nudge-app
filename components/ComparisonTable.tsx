'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Star, Shield, DollarSign, Users, Lightbulb, Trophy, ChevronRight, ExternalLink } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────
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
  location: string;
  bestTime: string;
  imageUrl: string;
  amenities: string[];
  safetyFeatures: string[];
  tipsAndTricks: string[];
  parentStory?: { title: string; excerpt: string; author: string; fullStory: string };
  itineraryComparison?: { halfDay: string; fullDay: string; bestFor: string };
  commissionRate?: string;
  seoKeywords?: string[];
  affiliateLinks?: Record<string, { url: string; text: string }>;
  slug?: string;
}

interface ComparisonTableProps {
  destination: Destination;
}

// ─── Helpers ────────────────────────────────────────────────────

/** Normalise a category string into one of the known buckets */
function normaliseCategory(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('theme') || c.includes('amusement') || c.includes('attraction')) return 'Theme Parks & Attractions';
  if (c.includes('nature') || c.includes('outdoor') || c.includes('beach') || c.includes('coastal')) return 'Nature & Outdoor Adventures';
  if (c.includes('cultural') || c.includes('heritage') || c.includes('historical') || c.includes('museum')) return 'Cultural & Historical Sites';
  if (c.includes('education') || c.includes('science')) return 'Education & Science';
  if (c.includes('food') || c.includes('dining')) return 'Food & Dining';
  if (c.includes('shopping')) return 'Shopping';
  return cat; // fall through
}

/** Parse age range into a numeric range for comparison */
function parseAgeRange(range: string): { min: number; max: number } {
  const cleaned = range.replace('+', '-99');
  const parts = cleaned.split(/[-–&,]/).map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  return { min: Math.min(...parts, 0), max: Math.max(...parts, 0) };
}

/** Quick composite score (mirrors computeSimpleScore from lib/scoring) */
function simpleScore(d: Destination): number {
  const safetyPart = (d.safetyRating / 5) * 40;
  const popPart = (d.popularity / 100) * 30;
  const tipPart = Math.min((d.tipsAndTricks?.length || 0) / 10, 1) * 20;
  const storyPart = d.parentStory?.fullStory ? 10 : 0;
  return Math.round(safetyPart + popPart + tipPart + storyPart);
}

/** Generate a price label from dollar signs */
function priceLabel(range: string): string {
  const count = range.replace(/[^$]/g, '').length || 1;
  if (count === 1) return '$ — Budget-friendly';
  if (count === 2) return '$$ — Mid-range';
  return '$$$ — Premium';
}

/** Condensed tip: pick the best single tip */
function condensedTip(tips: string[]): string | null {
  if (!tips || tips.length === 0) return null;
  // Pick the most useful-looking tip
  const ranked = tips.sort((a, b) => b.length - a.length);
  const best = ranked[0];
  return best.length > 120 ? best.slice(0, 117) + '...' : best;
}

/** Generate a recommendation paragraph based on real data */
function generateRecommendation(d: Destination): string {
  const parts: string[] = [];

  // Age
  const age = parseAgeRange(d.ageRange);
  if (age.max <= 6) parts.push('Perfect for families with toddlers and preschoolers');
  else if (age.min >= 10) parts.push('Best suited for tweens and teens');
  else parts.push('Great for families with kids of all ages');

  // Safety
  if (d.safetyRating >= 4.5) parts.push('— safety is top-notch');
  else if (d.safetyRating >= 3.5) parts.push('— safety standards are solid');

  // Tips
  if ((d.tipsAndTricks?.length || 0) >= 3) parts.push(`with ${d.tipsAndTricks!.length} parent-proven tips to help you plan`);

  // Popularity
  if (d.popularity >= 90) parts.push('. Highly recommended by our community');
  else if (d.popularity >= 75) parts.push('. A popular choice among families');

  return parts.join(' ') + '.';
}

/** Star bar rendering */
function StarBar({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}<span className="text-gray-400 font-normal text-xs">/5</span></span>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────

export default function ComparisonTable({ destination }: ComparisonTableProps) {
  const d = destination;

  // ── Find competitor ──
  const [competitor, setCompetitor] = useState<Destination | null>(null);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (allLoaded) return;
    (async () => {
      try {
        const res = await fetch('/data/destinations.json');
        if (!res.ok) return;
        const all: Destination[] = await res.json();

        const cat = normaliseCategory(d.category);
        const currAge = parseAgeRange(d.ageRange);

        // Find the best competitor in the same category with a similar age range
        const candidates = all
          .filter((x: Destination) => x.id !== d.id && normaliseCategory(x.category) === cat)
          .map((x: Destination) => {
            const age = parseAgeRange(x.ageRange);
            const ageDiff = Math.abs(age.min - currAge.min) + Math.abs(age.max - currAge.max);
            return { dest: x, ageDiff, score: simpleScore(x) };
          })
          .filter(c => c.score > 0);

        if (candidates.length === 0) {
          // Try broader category match
          const broader = all
            .filter((x: Destination) => x.id !== d.id)
            .map((x: Destination) => {
              const age = parseAgeRange(x.ageRange);
              const ageDiff = Math.abs(age.min - currAge.min) + Math.abs(age.max - currAge.max);
              return { dest: x, ageDiff, score: simpleScore(x) };
            })
            .filter(c => c.score > 0)
            .sort((a, b) => a.ageDiff - b.ageDiff || b.score - a.score);

          if (broader.length > 0) setCompetitor(broader[0].dest);
          setAllLoaded(true);
          return;
        }

        // Sort: closest age range first, then highest score
        candidates.sort((a, b) => a.ageDiff - b.ageDiff || b.score - a.score);
        setCompetitor(candidates[0].dest);
        setAllLoaded(true);
      } catch {
        setAllLoaded(true);
      }
    })();
  }, [d, allLoaded]);

  const tip = condensedTip(d.tipsAndTricks);

  const rows: { label: string; content: React.ReactNode }[] = [
    {
      label: 'Category',
      content: (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
          {normaliseCategory(d.category)}
        </span>
      ),
    },
    {
      label: 'Our Recommendation',
      content: (
        <p className="text-sm text-gray-700 leading-relaxed">{generateRecommendation(d)}</p>
      ),
    },
    {
      label: 'Age Suitability',
      content: (
        <div className="flex items-center gap-2">
          <Users size={15} className="text-sky-500" />
          <span className="text-sm font-medium text-gray-800">{d.ageRange} years old</span>
        </div>
      ),
    },
    {
      label: 'Safety Score',
      content: <StarBar rating={d.safetyRating} />,
    },
    {
      label: 'Estimated Family Cost',
      content: (
        <div className="flex items-center gap-2">
          <DollarSign size={15} className="text-emerald-500" />
          <span className="text-sm text-gray-700">{priceLabel(d.priceRange)}</span>
        </div>
      ),
    },
    {
      label: 'Parent Tips',
      content: tip ? (
        <div className="flex items-start gap-2">
          <Lightbulb size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
        </div>
      ) : (
        <Link
          href={`/destination/${d.id}/add-tip`}
          className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
        >
          <Lightbulb size={14} />
          No parent tips yet — be the first!
          <ChevronRight size={14} />
        </Link>
      ),
    },
    {
      label: 'Vs Top Competitor',
      content: competitor ? (
        <ComparisonRow current={d} competitor={competitor} />
      ) : (
        <p className="text-sm text-gray-500 italic">Finding best competitor…</p>
      ),
    },
  ];

  if (allLoaded && !competitor) {
    // Replace the last row
    rows[rows.length - 1] = {
      label: 'Vs Top Competitor',
      content: (
        <p className="text-sm text-gray-500 italic">No direct competitor in this category</p>
      ),
    };
  }

  return (
    <section className="mb-12">
      {/* Why We Recommend */}
      <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-200/60 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Trophy size={18} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Why we recommend this</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {d.description.length > 180
                ? d.description.slice(0, d.description.lastIndexOf(' ', 177)) + '…'
                : d.description}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-gray-100 ${
                  i % 2 === 0 ? 'bg-gray-50/60' : 'bg-white/80'
                }`}
              >
                <td className="px-5 py-4 align-top w-[140px] sm:w-[160px]">
                  <span className="font-semibold text-gray-800 text-xs sm:text-sm">{row.label}</span>
                </td>
                <td className="px-5 py-4">{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Competitor Comparison Row ──────────────────────────────────

function ComparisonRow({ current, competitor }: { current: Destination; competitor: Destination }) {
  const currScore = simpleScore(current);
  const compScore = simpleScore(competitor);
  const diff = currScore - compScore;

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 leading-relaxed">
        <span className="font-medium text-gray-900">{competitor.name}</span> in {competitor.city}, {competitor.country} is a comparable{' '}
        {normaliseCategory(competitor.category).toLowerCase()} option for similar age groups.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Current destination */}
        <div className="bg-amber-50/60 border border-amber-200/50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-medium">Current</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm truncate">{current.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Shield size={12} className="text-sky-500" />
            <span className="text-xs text-gray-600">Safety {current.safetyRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <DollarSign size={12} className="text-emerald-500" />
            <span className="text-xs text-gray-600">{current.priceRange}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Users size={12} className="text-purple-500" />
            <span className="text-xs text-gray-600">Age {current.ageRange}</span>
          </div>
          <div className="mt-1.5">
            <span className={`text-xs font-semibold ${
              diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-rose-600' : 'text-gray-500'
            }`}>
              Score: {currScore}
            </span>
          </div>
        </div>

        {/* Competitor */}
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">Competitor</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm truncate">{competitor.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Shield size={12} className="text-sky-500" />
            <span className="text-xs text-gray-600">Safety {competitor.safetyRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <DollarSign size={12} className="text-emerald-500" />
            <span className="text-xs text-gray-600">{competitor.priceRange}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Users size={12} className="text-purple-500" />
            <span className="text-xs text-gray-600">Age {competitor.ageRange}</span>
          </div>
          <div className="mt-1.5">
            <Link
              href={`/destination/${competitor.id}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
            >
              Compare <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>

      {diff !== 0 && (
        <p className={`text-xs ${diff > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {diff > 0
            ? `We recommend ${current.name} — it scores ${diff} points higher overall for families.`
            : `${competitor.name} scores ${Math.abs(diff)} points higher — consider both before deciding.`}
        </p>
      )}
    </div>
  );
}
