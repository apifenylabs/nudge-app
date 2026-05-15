'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  MapPin, Star, Heart, Compass, Crown,
  ArrowLeft, Calendar, Clock, Users,
  School, Baby,
  Utensils, Bed, Bus, ExternalLink, DollarSign, Shield,
  Share2, Building2
} from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import BookmarkButton from '@/components/BookmarkButton';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import { bookingUrl, viatorUrl } from '@/lib/affiliate';
import BookingCTA from '@/components/BookingCTA';
import PriceComparisonWidget from '@/components/PriceComparisonWidget';
import StickyBookBar from '@/components/StickyBookBar';
import ContextualRecommendations from '@/components/ContextualRecommendations';
import type { ReviewData } from '@/components/ReviewCard';

// ─── Types ──────────────────────────────────────────────
interface Destination {
  id: string; name: string; city: string; country: string;
  category: string; ageRange: string; safetyRating: number;
  priceRange: string; popularity: number; description: string;
  location: string; bestTime: string; imageUrl: string;
  amenities: string[]; safetyFeatures: string[]; tipsAndTricks: string[];
  parentStory: { title: string; excerpt: string; author: string; fullStory: string; };
  itineraryComparison: { halfDay: string; fullDay: string; bestFor: string; };
  commissionRate: string; seoKeywords: string[];
  affiliateLinks?: { booking: { url: string; text: string }; klook: { url: string; text: string }; viator: { url: string; text: string }; };
}
interface DestinationPageProps { initialData: Destination; slug: string; }

// ─── Glassmorphism Card ─────────────────────────────────
function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 sm:p-6 ${className}`}>{children}</div>;
}

function SectionTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-100 text-sky-600 font-bold text-sm flex-shrink-0 shadow-sm">{n}</div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
      ))}
    </div>
  );
}

function PriceIndicator({ range }: { range: string }) {
  const count = range.length;
  const colors = ['text-emerald-500', 'text-amber-500', 'text-rose-500'];
  return (
    <div className="text-center">
      <div className="text-2xl font-bold mb-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={i < count ? (colors[i] || 'text-gray-900') : 'text-gray-300'}>¥</span>
        ))}
      </div>
      <div className="text-xs text-gray-500">Price Range</div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-sky-600" />
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="text-sm text-gray-600">{children}</div>
    </GlassCard>
  );
}

interface PhotoCredit {
  url: string;
  source: string;
  sourceUrl: string;
  license: 'official' | 'press' | 'ugc_verified' | 'editorial';
}

interface DestinationImageMap {
  [destinationId: string]: {
    hero: PhotoCredit;
    gallery: PhotoCredit[];
  };
}

const licenseLabels: Record<string, string> = {
  official: 'Official',
  press: 'Press Kit',
  ugc_verified: 'Verified Guest',
  editorial: 'Editorial'
};

function DestinationImage({ src, alt, className, credit }: { src: string; alt: string; className?: string; credit?: PhotoCredit | null }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src || src.includes('placeholder')) {
    const colors = ['from-sky-400 to-blue-600', 'from-emerald-400 to-teal-600', 'from-amber-400 to-orange-600', 'from-rose-400 to-pink-600'];
    return (
      <div className={`bg-gradient-to-br ${colors[alt.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length]} flex items-center justify-center ${className || ''}`}>
        <Compass size={40} className="text-white/60" />
      </div>
    );
  }
  return (
    <div className="relative group">
      <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
      {credit && (
        <a
          href={credit.sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white/80 text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-black/70"
        >
          📷 {credit.source}
        </a>
      )}
    </div>
  );
}

function generateAgeBreakdown(d: Destination) {
  const nums = d.ageRange.replace('+', '').split(/[-–&,]/).map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  const min = Math.min(...nums), max = Math.max(...nums);
  const sections: { age: string; icon: any; color: string; iconBg: string; iconColor: string; suitability: number; content: string }[] = [];
  if (min <= 3) sections.push({ age: 'Toddlers (0–3)', icon: Baby, color: 'bg-pink-50/80 border-pink-200 backdrop-blur-md shadow-sm', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', suitability: 85, content: `${d.name} is toddler-friendly${d.safetyRating >= 4 ? ' with high safety standards' : ''}. Visit during morning hours for the calmest experience.` });
  if (min <= 9 && max >= 4) sections.push({ age: 'Young Kids (4–9)', icon: School, color: 'bg-sky-50/80 border-sky-200 backdrop-blur-md shadow-sm', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', suitability: 95, content: `This age group loves ${d.name}. The interactive elements are perfect for curious minds. ${d.safetyRating >= 4 ? 'Safety measures are excellent.' : ''} Plan for 2–3 hours.` });
  if (max >= 10) sections.push({ age: 'Tweens & Teens (10+)', icon: Users, color: 'bg-emerald-50/80 border-emerald-200 backdrop-blur-md shadow-sm', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', suitability: 75, content: `Older kids appreciate the deeper experiences here. ${d.itineraryComparison?.fullDay ? 'A full-day visit works great: ' + d.itineraryComparison.fullDay : ''}` });
  return sections;
}

function generateAttractions(d: Destination) {
  return [
    { name: d.name, desc: d.description.substring(0, 120) + '...' },
    { name: `${d.city} Family Walking Route`, desc: `A parent-tested route through ${d.city} connecting ${d.name} with playgrounds, kid-friendly cafes, and rest stops.` },
    { name: `${d.ageRange} Experience Package`, desc: `Tailored ${d.ageRange}-year-old experience featuring activities matched to energy levels and attention spans.` },
  ];
}

function generatePracticalInfo(d: Destination) {
  return [
    { icon: Clock, label: 'Best Time to Visit', value: d.bestTime },
    { icon: Bus, label: 'Getting Around', value: `${d.city} has solid family-friendly transport. For stroller users, check for elevator access at metro stations.` },
    { icon: Bed, label: 'Family Accommodation', value: `Hotels near ${d.name} range from budget to luxury. Look for family rooms, kid's clubs, and early dinner service.` },
    { icon: Utensils, label: 'Kid-Friendly Dining', value: `${d.city} has excellent child-friendly dining near ${d.name} — kids' menus, high chairs, and quick service.` },
  ];
}

function AffiliateButton({ url, label }: { url: string; label: string }) {
  const isKlook = label.toLowerCase().includes('klook');
  const isBooking = label.toLowerCase().includes('booking');
  const isViator = label.toLowerCase().includes('viator');
  let brandClass = 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700';
  let iconColor = 'text-sky-500';
  let BrandIcon = ExternalLink;
  if (isKlook) {
    brandClass = 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700';
    iconColor = 'text-orange-500';
  } else if (isBooking) {
    brandClass = 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700';
    iconColor = 'text-blue-500';
  }
  return (
    <a href={url} target="_blank" rel="nofollow sponsored noopener"
      className={`flex items-center gap-2 ${brandClass} border rounded-xl px-4 min-h-[44px] text-sm font-medium transition-all group hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]`}>
      <BrandIcon size={14} className={`${iconColor} flex-shrink-0`} />
      <span>{label}</span>
      <span className="text-[10px] text-gray-400 ml-auto uppercase tracking-wider">Affiliate</span>
    </a>
  );
}

function ShareButton({ name }: { name: string }) {
  const [shared, setShared] = useState(false);
  return (
    <button onClick={async () => {
      if (navigator.share) { await navigator.share({ title: `${name} - Family Travel Asia`, url: window.location.href }).catch(() => {}); }
      else { await navigator.clipboard.writeText(window.location.href); setShared(true); setTimeout(() => setShared(false), 2000); }
    }} className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all active:scale-95">
      <Share2 size={15} />
      {shared ? 'Copied!' : 'Share'}
    </button>
  );
}

function AnimatedBookmarkButton({ destinationId }: { destinationId: string }) {
  const [animating, setAnimating] = useState(false);
  return (
    <div onClick={() => { setAnimating(true); setTimeout(() => setAnimating(false), 500); }} className={animating ? 'animate-heart-beat' : ''}>
      <BookmarkButton destinationId={destinationId} size="md" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
export default function ClientDestinationPage({ initialData }: DestinationPageProps) {
  const d = initialData;

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [imageMap, setImageMap] = useState<DestinationImageMap | null>(null);
  const [imageMapLoading, setImageMapLoading] = useState(true);

  // Load photo credits from image-map.json
  useEffect(() => {
    fetch('/data/image-map.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.photos) setImageMap(data.photos);
      })
      .catch(() => {});
  }, []);

  const destPhoto = imageMap?.[d.id];
  const heroCredit = destPhoto?.hero || null;
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

  const fetchReviews = useCallback(async () => {
    setReviewsLoading(true);
    try { const r = await fetch(`/api/reviews?destination_id=${d.id}&status=approved&limit=50`); const data = await r.json(); setReviews(data.reviews || []); }
    catch { setReviews([]); }
    finally { setReviewsLoading(false); }
  }, [d.id]);

  useEffect(() => { fetchReviews(); }, [fetchReviews, reviewRefreshKey]);

  const scoreColor = d.safetyRating >= 4.5 ? 'bg-emerald-500' : d.safetyRating >= 3.5 ? 'bg-sky-500' : d.safetyRating >= 2.5 ? 'bg-amber-500' : 'bg-gray-400';

  const categoryPills: { label: string; color: string }[] = [];
  if (d.category.includes('Theme')) categoryPills.push({ label: 'Theme Parks', color: 'bg-amber-50/80 text-amber-700 border-amber-200' });
  if (d.category.includes('Nature')) categoryPills.push({ label: 'Nature', color: 'bg-emerald-50/80 text-emerald-700 border-emerald-200' });
  if (d.category.includes('Cultural')) categoryPills.push({ label: 'Culture', color: 'bg-purple-50/80 text-purple-700 border-purple-200' });
  if (d.category.includes('Park')) categoryPills.push({ label: 'Parks', color: 'bg-sky-50/80 text-sky-700 border-sky-200' });
  if (categoryPills.length === 0) categoryPills.push({ label: d.category, color: 'bg-gray-50/80 text-gray-700 border-gray-200' });

  return (
    <div className="min-h-screen bg-gray-50 mb-16 md:mb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/search" className="hover:text-gray-900 transition-colors">Destinations</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[120px]">{d.name}</span>
          </nav>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/search" className="text-gray-500 hover:text-gray-900 transition-colors">Search</Link>
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-gold text-sm">✦</span>
            <span className="font-semibold text-gray-900 text-sm hidden sm:inline">Luxury Family Travel</span>
          </div>
        </div>
      </header>

      {/* Hero — full-bleed image + gradient overlay */}
      <section className="relative h-[45vh] sm:h-[60vh] min-h-[300px] sm:min-h-[360px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <DestinationImage src={heroCredit?.url || d.imageUrl} alt={d.name} className="w-full h-full object-cover" credit={heroCredit} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />

        {/* Curated Collection badge — top-left */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-sm text-navy text-[10px] font-bold uppercase tracking-wider shadow-lg border border-gold-light/30">
            <Crown size={12} />
            Curated Collection
          </div>
        </div>

        {/* Score badge — top-right */}
        <div className={`absolute top-4 sm:top-6 right-4 sm:right-8 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full text-sm sm:text-base font-bold text-white shadow-xl ring-2 ring-white/30 ${scoreColor}`}>
          {d.safetyRating.toFixed(1)}
          <Star size={10} className="text-white fill-white mt-0.5" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {categoryPills.map((p, i) => (
              <span key={i} className={`text-xs px-3 py-0.5 rounded-full font-medium border backdrop-blur-sm ${p.color}`}>{p.label}</span>
            ))}
            <span className="text-xs bg-white/10 text-gray-300 px-3 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">{d.ageRange} yrs</span>
            <span className="text-xs bg-white/10 text-gray-300 px-3 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">{d.priceRange}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight drop-shadow-lg">{d.name}</h1>
          <p className="text-base sm:text-lg text-gray-200/90 max-w-2xl mb-4 leading-relaxed drop-shadow">
            {d.description.length > 200 ? d.description.substring(0, 200) + '...' : d.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <p className="text-gray-300/80 flex items-center gap-2 drop-shadow">
              <MapPin size={14} /> <span>{d.location} · {d.city}, {d.country}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <StarRating rating={d.safetyRating} />
              <span className="text-gray-300 text-xs ml-1">{d.safetyRating.toFixed(1)} / 5</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Calendar size={14} /> <span>{d.bestTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Heart size={14} /> <span>{d.popularity}% parent-approved</span>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <AnimatedBookmarkButton destinationId={d.id} />
            <span className="text-sm text-gray-300">Bookmark</span>
            <div className="ml-auto"><ShareButton name={d.name} /></div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16 md:pb-20">
        {/* Quick Overview */}
        <GlassCard className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-0.5">{d.safetyRating.toFixed(1)} <Star size={14} className="text-amber-400 fill-amber-400" /></div>
              <div className="text-xs text-gray-500">Safety Rating</div>
            </div>
            <div className="text-center"><PriceIndicator range={d.priceRange} /></div>
            <div className="text-center"><div className="text-2xl font-bold text-gray-900">{d.ageRange}</div><div className="text-xs text-gray-500">Recommended Age</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gray-900">{d.popularity}%</div><div className="text-xs text-gray-500">Parent Approval</div></div>
          </div>
        </GlassCard>

        {/* Photo Gallery — Real images from the property */}
        {destPhoto?.gallery && destPhoto.gallery.length > 0 && (
          <section className="mb-12">
            <SectionTitle n={1} title={`Photos of ${d.name}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {destPhoto.gallery.map((photo, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3]">
                  <DestinationImage
                    src={photo.url}
                    alt={`${d.name} - photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    credit={photo}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why Families Love It */}
        <section className="mb-12">
          <SectionTitle n={1} title={`Why Families Love ${d.name}`} />
          <GlassCard>
            <p className="text-base text-gray-700 leading-relaxed">{d.description}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {d.amenities.slice(0, 8).map((a, i) => (
                <span key={i} className="text-xs bg-sky-50/80 text-sky-700 px-3 py-1.5 rounded-full font-medium border border-sky-100/50 backdrop-blur-sm">{a}</span>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Age-Specific Guide */}
        <section className="mb-12">
          <SectionTitle n={2} title="Age-Specific Guide" />
          <p className="text-sm text-gray-500 mb-6">{d.name} suits ages {d.ageRange}. Here&apos;s what each age group will love:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {generateAgeBreakdown(d).map((ab, i) => (
              <div key={i} className={`rounded-2xl border p-6 ${ab.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${ab.iconBg} flex items-center justify-center`}><ab.icon size={18} className={ab.iconColor} /></div>
                  <h3 className="font-semibold text-gray-900 text-sm">{ab.age}</h3>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1"><span className="text-gray-500">Suitability</span><span className="font-semibold text-gray-700">{ab.suitability}%</span></div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${ab.suitability >= 90 ? 'bg-emerald-500' : ab.suitability >= 75 ? 'bg-sky-500' : 'bg-amber-500'}`} style={{ width: `${ab.suitability}%` }} />
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ab.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Attractions */}
        <section className="mb-12">
          <SectionTitle n={3} title="Top Attractions & Activities" />
          <div className="space-y-4">
            {generateAttractions(d).map((a, i) => (
              <GlassCard key={i} className="flex gap-4 hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0"><span className="text-sky-600 font-bold text-sm">{i + 1}</span></div>
                <div><h3 className="font-semibold text-gray-900 text-sm mb-1.5">{a.name}</h3><p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p></div>
              </GlassCard>
            ))}
          </div>
        </section>

        <AdUnit slot="1234567890" className="mb-12" />

        {/* Tips & Tricks */}
        <section className="mb-12">
          <SectionTitle n={4} title="Tips & Tricks from Real Parents" />
          <GlassCard className="overflow-hidden">
            {d.tipsAndTricks.length > 0 ? (
              <div className="divide-y divide-gray-100/50">
                {d.tipsAndTricks.map((tip, i) => (
                  <div key={i} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-amber-600 font-bold text-xs">{i + 1}</span></div>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">No parent tips yet. Be the first to share!</p>}
          </GlassCard>
        </section>

        {/* Safety */}
        <section className="mb-12">
          <SectionTitle n={5} title="Safety Assessment" />
          <GlassCard>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 w-full max-w-xs">
                <div className="flex flex-col items-center gap-1">
                  <div className="relative w-full max-w-[140px] h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.safetyRating >= 4 ? 'bg-emerald-500' : d.safetyRating >= 3 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${(d.safetyRating / 5) * 100}%` }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-sky-600" />
                    <span className="text-xs font-semibold text-gray-700">{d.safetyRating.toFixed(1)} / 5</span>
                    <span className="text-[10px] text-gray-500">({d.safetyRating >= 4 ? 'Excellent' : d.safetyRating >= 3 ? 'Good' : 'Moderate'})</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Safety Features</h4>
                <div className="flex flex-wrap gap-2">
                  {d.safetyFeatures.length > 0 ? d.safetyFeatures.map((f, i) => (
                    <span key={i} className="text-xs bg-emerald-50/80 text-emerald-700 px-3 py-1.5 rounded-full font-medium border border-emerald-100/50 backdrop-blur-sm">{f}</span>
                  )) : <p className="text-sm text-gray-500">No features listed.</p>}
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Practical Info */}
        <section className="mb-12">
          <SectionTitle n={6} title="Practical Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {generatePracticalInfo(d).map((p, i) => <InfoCard key={i} icon={p.icon} title={p.label}>{p.value}</InfoCard>)}
          </div>
        </section>

        <AdUnit slot="1234567891" className="mb-12" />

        {/* Where to Stay — Hotel Recommendations */}
        <section className="mb-12">
          <SectionTitle n={7} title="Where to Stay" />
          <p className="text-sm text-gray-500 mb-6">Recommended family-friendly hotels near {d.name}. Book directly through our partner, Booking.com.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={bookingUrl(`${d.city} family hotels budget`)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Building2 size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors">Budget-Friendly</h4>
                  <p className="text-[10px] text-gray-400">Under $80/night</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">Clean, safe, and well-rated family rooms with kitchenettes. Great for cost-conscious families.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                Search on Booking.com →
              </span>
            </a>
            <a
              href={bookingUrl(`${d.city} family hotels mid-range`)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Building2 size={18} className="text-sky-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors">Mid-Range</h4>
                  <p className="text-[10px] text-gray-400">$80–$150/night</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">Kid-friendly hotels with pools, kids clubs, and family suites. Best value for most families.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-sky-600 group-hover:text-sky-700 transition-colors">
                Search on Booking.com →
              </span>
            </a>
            <a
              href={bookingUrl(`${d.city} luxury family hotels`)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Building2 size={18} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors">Luxury</h4>
                  <p className="text-[10px] text-gray-400">$150+/night</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">Premium family resorts with kids programs, multiple pools, and exceptional family service.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-amber-600 group-hover:text-amber-700 transition-colors">
                Search on Booking.com →
              </span>
            </a>
          </div>
        </section>

        {/* Top Tours & Experiences on Viator */}
        <section className="mb-12">
          <SectionTitle n={8} title="Top Tours & Experiences" />
          <p className="text-sm text-gray-500 mb-6">Popular family-friendly tours, attractions, and day trips in {d.city}. Book directly on Viator.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: `${d.city} Family Guided Tour`, desc: 'Private family-friendly tour with kid-focused guide', price: 'From $45/person', emoji: '👨‍👩‍👧‍👦' },
              { name: `${d.name} Skip-the-Line Entry`, desc: 'Priority access with family queue pass', price: 'From $22/person', emoji: '🎟️' },
              { name: `${d.city} Day Trip Highlights`, desc: 'Full-day excursion covering top family attractions', price: 'From $79/person', emoji: '🚌' },
            ].map((tour, i) => (
              <a
                key={i}
                href={viatorUrl(`${d.city} ${tour.name}`)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="text-3xl mb-3">{tour.emoji}</div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors">{tour.name}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tour.desc}</p>
                <span className="inline-block text-xs font-semibold text-emerald-600 mt-3">{tour.price}</span>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 group-hover:text-rose-700 transition-colors">
                    Book on Viator →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Price Comparison Widget */}
        <section className="mb-12">
          <PriceComparisonWidget
            destinationName={d.name}
            city={d.city}
            country={d.country}
            category={d.category}
            priceRange={d.priceRange}
            destinationId={d.id}
          />
        </section>

        {/* Affiliate Booking */}
        <section className="mb-12">
          <BookingCTA hotelName={d.name} destinationId={d.id} priceRange={d.priceRange} className="mb-4" />
          <GlassCard className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 border-amber-200/50">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={16} className="text-amber-600" />
              <h3 className="font-semibold text-gray-900 text-base">More Booking Options</h3>
              <span className="text-[10px] text-gray-400 ml-auto uppercase tracking-wider">Affiliate</span>
            </div>
            <p className="text-sm text-gray-600 mb-5">We earn a small commission at no extra cost when you book through these trusted partners.</p>
            <div className="space-y-3">
              {d.affiliateLinks?.booking && <AffiliateButton url={d.affiliateLinks.booking.url} label={d.affiliateLinks.booking.text} />}
              {d.affiliateLinks?.klook && <AffiliateButton url={d.affiliateLinks.klook.url} label={d.affiliateLinks.klook.text} />}
              {d.affiliateLinks?.viator && <AffiliateButton url={d.affiliateLinks.viator.url} label={d.affiliateLinks.viator.text} />}
              {!d.affiliateLinks?.booking && !d.affiliateLinks?.klook && !d.affiliateLinks?.viator && (
                <div className="flex flex-col gap-3">
                  <AffiliateButton
                    url={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(d.name)}%20${encodeURIComponent(d.city)}&aid=2875669`}
                    label={`Book ${d.name} on Booking.com`}
                  />
                  <AffiliateButton
                    url={`https://www.klook.com/search/?keyword=${encodeURIComponent(d.name)}%20${encodeURIComponent(d.city)}&aid=119991`}
                    label={`Find tours for ${d.name} on Klook`}
                  />
                  <AffiliateButton
                    url={`https://www.viator.com/${encodeURIComponent(d.city).replace(/%20/g, '')}/things-to-do?aid=P00299136`}
                    label={`Discover ${d.city} on Viator`}
                  />
                </div>
              )}
            </div>
          </GlassCard>
        </section>

        {/* Contextual Recommendations */}
        <section className="mb-12">
          <ContextualRecommendations
            destinationName={d.name}
            city={d.city}
            country={d.country}
            category={d.category}
          />
        </section>

        {/* Parent Story */}
        {d.parentStory?.fullStory && (
          <section className="mb-12">
            <SectionTitle n={9} title="A Real Parent's Story" />
            <GlassCard className="bg-gradient-to-br from-sky-50/80 to-white border-sky-200/50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <h3 className="font-semibold text-gray-900 text-sm">{d.parentStory.title}</h3>
              </div>
              <p className="text-sm text-gray-600 italic mb-3">&ldquo;{d.parentStory.excerpt}&rdquo;</p>
              <details className="group">
                <summary className="text-xs text-sky-600 font-medium cursor-pointer hover:text-sky-700 transition-colors select-none list-none flex items-center gap-1">
                  Read full story
                  <svg className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-3 pt-3 border-t border-sky-100">{d.parentStory.fullStory}</p>
                <p className="text-xs text-gray-400 mt-2">&mdash; {d.parentStory.author}</p>
              </details>
            </GlassCard>
          </section>
        )}

        {/* Reviews Section — 2-col grid on desktop */}
        <section className="mb-12">
          <SectionTitle n={10} title="Parent Reviews" />
          <GlassCard className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="text-lg font-bold text-gray-900">
                  {(reviews.length > 0 ? reviews.reduce((a, r) => a + r.overall_rating, 0) / reviews.length : 0).toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
              </div>
              <button onClick={() => setReviewFormOpen(!reviewFormOpen)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors active:scale-95">
                Write a Review
              </button>
            </div>

            {reviewFormOpen && (
              <div className="mb-6 p-5 bg-sky-50/80 backdrop-blur-sm border border-sky-200 rounded-xl">
                <ReviewForm destinationId={d.id} destinationName={d.name} isOpen={reviewFormOpen} onClose={() => setReviewFormOpen(false)} onSubmitSuccess={() => { setReviewFormOpen(false); setReviewRefreshKey(k => k + 1); }} />
              </div>
            )}

            {/* 2-col grid on desktop for reviews */}
            {reviewsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                          <span className="text-xs font-semibold text-sky-600">
                            {review.author_name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{review.author_name || 'Anonymous'}</p>
                          <p className="text-[10px] text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className={i < Math.round(review.overall_rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{review.content}</p>
                    {review.tips && <p className="text-xs text-amber-700 mt-2 italic line-clamp-2">💡 {review.tips}</p>}
                    {review.would_recommend && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        Recommends
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </GlassCard>
        </section>
        {/* After all sections — mobile sticky booking bar */}
        <StickyBookBar
          destinationName={d.name}
          city={d.city}
          priceRange={d.priceRange}
          destinationId={d.id}
        />
      </main>
    </div>
  );
}
