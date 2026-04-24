'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Star, Clock, Lightbulb, Heart, Sun, Moon,
  Shield, Sparkles, Compass, ChevronDown, ChevronUp,
  ArrowLeft, Clock3, Share2, Calendar, Users,
  ChevronLeft, ChevronRight
} from 'lucide-react';

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
  gallery?: string[];
  parentStory: {
    title: string;
    excerpt: string;
    author: string;
    fullStory: string;
  };
  itineraryComparison: {
    halfDay: string;
    fullDay: string;
    bestFor: string;
  };
  commissionRate: string;
  seoKeywords: string[];
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={14} className="text-amber-400 fill-amber-400" />;
        if (i === full && half) return <Star key={i} size={14} className="text-amber-400 fill-amber-400/50" />;
        return <Star key={i} size={14} className="text-gray-300" />;
      })}
    </div>
  );
}

function PriceIndicator({ range }: { range: string }) {
  const count = range.length;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm font-bold ${i < count ? 'text-gray-900' : 'text-gray-300'}`}
        >
          $
        </span>
      ))}
    </div>
  );
}

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrentIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-200">
      <img
        src={images[currentIdx]}
        alt={`${name} gallery image ${currentIdx + 1}`}
        className="w-full h-64 sm:h-80 object-cover transition-opacity duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIdx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ExpandableSection({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: any;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-sky-500" />
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

interface DestinationPageProps {
  initialData: Destination;
  slug: string;
}

export default function ClientDestinationPage({ initialData }: DestinationPageProps) {
  const d = initialData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">All destinations</span>
          </Link>
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-sky-600" />
            <span className="font-semibold text-gray-900 text-sm">Family Travel Asia</span>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={d.imageUrl}
            alt={d.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80" />
        </div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full font-medium border border-sky-500/30">
              {d.category}
            </span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700">
              {d.ageRange} yrs
            </span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700">
              {d.priceRange}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
            {d.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <MapPin size={14} />
            <span>{d.location}</span>
            <span className="text-gray-600">&middot;</span>
            <span>{d.city}, {d.country}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <StarRating rating={d.safetyRating} />
              <span className="text-gray-400 text-xs ml-1">{d.safetyRating.toFixed(1)} Safety</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar size={14} />
              <span>{d.bestTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Users size={14} />
              <span>Popularity {d.popularity}/100</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        {/* ─── QUICK STATS BAR ─── */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-0.5">
                {d.safetyRating.toFixed(1)}
                <Star size={14} className="text-amber-400 fill-amber-400" />
              </div>
              <div className="text-xs text-gray-500">Safety Rating</div>
            </div>
            <div className="text-center">
              <PriceIndicator range={d.priceRange} />
              <div className="text-xs text-gray-500 mt-0.5">Price Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{d.ageRange}</div>
              <div className="text-xs text-gray-500">Recommended Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{d.popularity}%</div>
              <div className="text-xs text-gray-500">Parent Rating</div>
            </div>
          </div>
        </div>

        {/* ─── DESCRIPTION ─── */}
        <section className="mb-8">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl">
            {d.description}
          </p>
        </section>

        {/* ─── GALLERY ─── */}
        {d.gallery && d.gallery.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-sky-500" />
              Photo Gallery
            </h2>
            <ImageGallery images={d.gallery} name={d.name} />
          </section>
        )}

        {/* ─── TWO-COLUMN LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tips & Tricks */}
            <ExpandableSection title="Tips & Tricks from Parents" icon={Lightbulb} defaultOpen={true}>
              <ul className="space-y-3">
                {d.tipsAndTricks.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sky-500 font-bold flex-shrink-0 mt-0.5 text-sm">*</span>
                    <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </ExpandableSection>

            {/* Parent Story - Full Text */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-rose-500" />
                  <h2 className="font-semibold text-gray-900 text-sm">Parent Story</h2>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">&ldquo;{d.parentStory.title}&rdquo;</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {d.parentStory.fullStory}
                </p>
                <p className="text-xs text-gray-500 font-medium">&mdash; {d.parentStory.author}</p>
              </div>
            </div>

            {/* Itinerary Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-sky-500" />
                  <h2 className="font-semibold text-gray-900 text-sm">Plan Your Visit</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <Sun size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-0.5">Half Day</div>
                    <p className="text-xs text-gray-600">{d.itineraryComparison.halfDay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-lg border border-sky-100">
                  <Moon size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700 mb-0.5">Full Day</div>
                    <p className="text-xs text-gray-600">{d.itineraryComparison.fullDay}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                  <span className="font-medium text-gray-700">Best for:</span> {d.itineraryComparison.bestFor}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Safety Features */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-500" />
                  <h2 className="font-semibold text-gray-900 text-sm">Safety First</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={d.safetyRating} />
                  <span className="text-sm font-semibold text-gray-900">{d.safetyRating.toFixed(1)}</span>
                </div>
                <ul className="space-y-2">
                  {d.safetyFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-sky-500" />
                  <h2 className="font-semibold text-gray-900 text-sm">Amenities</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {d.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full font-medium border border-sky-100"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-purple-500" />
                  <h2 className="font-semibold text-gray-900 text-sm">Best Time to Visit</h2>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 font-medium">{d.bestTime}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Plan around peak seasons for the best experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BACK LINK ─── */}
        <div className="text-center pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            <ArrowLeft size={14} />
            Back to all destinations
          </Link>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Compass size={16} className="text-sky-600" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Family Travel Asia. Curated by parents, for parents.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
