'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Star, Clock, Lightbulb, Heart, Sun, Moon,
  Shield, Sparkles, Compass, ChevronDown, ChevronUp,
  ArrowLeft, Clock3, Calendar, Users,
  ChevronLeft, ChevronRight, School, Baby,
  Utensils, Bed, Bus, TreePine, Info
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

interface DestinationPageProps {
  initialData: Destination;
  slug: string;
}

// ─── Helpers ────────────────────────────────────────────────────

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
        <span key={i} className={`text-sm font-bold ${i < count ? 'text-gray-900' : 'text-gray-300'}`}>$</span>
      ))}
    </div>
  );
}

function ExpandableSection({
  title, icon: Icon, defaultOpen = false, children,
}: {
  title: string; icon: any; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-sky-500" />
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-sky-500" />
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
}

// ─── Image fallback ──────────────────────────────────────────────
function DestinationImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src || src.includes('placeholder')) {
    // Generate a color-coded placeholder based on destination name
    const colors = ['from-sky-400 to-blue-500', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500', 'from-violet-400 to-purple-500'];
    const colorIdx = alt.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
    return (
      <div className={`bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center ${className || ''}`}>
        <div className="text-center p-6">
          <Compass size={48} className="mx-auto text-white/80 mb-2" />
          <p className="text-white font-semibold text-lg">{alt}</p>
          <p className="text-white/60 text-xs mt-1">Photo coming soon</p>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

// ─── Age breakdown generator ────────────────────────────────────
function generateAgeBreakdown(d: Destination) {
  const range = d.ageRange;
  const safety = d.safetyRating;
  const sections = [];
  if (range.includes('0') || range.includes('1') || range.includes('2') || range.includes('3')) {
    sections.push({
      age: 'Toddlers (0-3)',
      icon: Baby,
      content: `${d.name} is suitable for toddlers${safety >= 4 ? ' with excellent safety features including stroller access and baby facilities' : ''}. ${d.amenities.includes('Stroller access') || d.amenities.includes('Stroller Friendly') || d.amenities.includes('Stroller') ? 'Stroller-friendly throughout. ' : ''}Parent tip: visit during off-peak hours for the calmest experience.`,
    });
  }
  if (range.includes('4') || range.includes('5') || range.includes('6') || range.includes('7') || range.includes('8') || range.includes('9')) {
    sections.push({
      age: 'Young Kids (4-9)',
      icon: School,
      content: `Perfect age range for exploring ${d.name}. Kids will love the interactive elements${d.category.includes('Theme') || d.category.includes('Zoo') ? ' and hands-on activities' : ''}. ${d.safetyFeatures.length > 0 ? 'Safety features include: ' + d.safetyFeatures.slice(0, 2).join(', ') + '.' : ''}`,
    });
  }
  if (range.includes('10') || range.includes('11') || range.includes('12') || range.includes('13') || range.includes('14') || range.includes('15') || range.includes('teen')) {
    sections.push({
      age: 'Tweens & Teens (10+)',
      icon: Users,
      content: `Older kids and teens will appreciate ${d.name}. ${d.itineraryComparison?.fullDay ? 'A full-day visit (' + d.itineraryComparison.fullDay + ') works well for this age group.' : ''} ${d.popularity >= 80 ? 'Rated highly by parents of teens.' : ''}`,
    });
  }
  return sections;
}

function generateAttractions(d: Destination) {
  const name = d.name;
  const city = d.city;
  const attractions = [
    { name, desc: d.description.length > 100 ? d.description.substring(0, 120) + '...' : d.description },
    { name: `${city} Family Walking Tour`, desc: `Explore ${city} with a kid-friendly walking route that passes the best sights, playgrounds, and ice cream stops.` },
    { name: `${d.category} Experience`, desc: `Immerse in ${d.category.toLowerCase()} activities designed for families at this top-rated ${city} attraction.` },
  ];
  if (d.itineraryComparison?.halfDay) {
    attractions.push({ name: `${name} - Half Day Plan`, desc: d.itineraryComparison.halfDay });
  }
  return attractions;
}

function generatePracticalInfo(d: Destination) {
  return [
    { icon: Clock, label: 'Best Time', value: d.bestTime },
    { icon: Bus, label: 'Getting Around', value: `${d.city} has family-friendly transport options. Taxis and ride-sharing are readily available near ${d.name}.` },
    { icon: Bed, label: 'Family Hotels', value: `Several family-friendly hotels near ${d.name} offer kid's clubs, pools, and family suites. Book in advance during peak season.` },
    { icon: Utensils, label: 'Kid-Friendly Food', value: `${d.city} offers plenty of child-friendly dining options near ${d.name}, from quick bites to sit-down restaurants with kids' menus.` },
  ];
}

function generateRelatedDestinations(d: Destination, allDests: any[]) {
  // Find destinations in same city or same country
  const sameCity = allDests.filter(x => x.city === d.city && x.id !== d.id).slice(0, 2);
  const sameCountry = allDests.filter(x => x.country === d.country && x.id !== d.id && x.city !== d.city).slice(0, 2);
  const sameCategory = allDests.filter(x => x.category === d.category && x.id !== d.id && x.city !== d.city && x.country !== d.country).slice(0, 2);
  const related = [...sameCity, ...sameCountry, ...sameCategory].slice(0, 4);
  // Remove duplicates by id
  const seen = new Set<string>();
  return related.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; });
}

// ─── Main component ──────────────────────────────────────────────
export default function ClientDestinationPage({ initialData }: DestinationPageProps) {
  const d = initialData;

  // Load all destinations for related links
  const [related, setRelated] = useState<any[]>([]);
  useState(() => {
    fetch('/data/destinations.json').then(r => r.json()).then(data => {
      setRelated(generateRelatedDestinations(d, data));
    }).catch(() => {});
  });

  const ageBreakdown = generateAgeBreakdown(d);
  const attractions = generateAttractions(d);
  const practicalInfo = generatePracticalInfo(d);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ 1. HEADER ═══ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to destinations</span>
          </Link>
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-sky-600" />
            <span className="font-semibold text-gray-900 text-sm">Family Travel Asia</span>
          </div>
        </div>
      </header>

      {/* ═══ 2. HERO ═══ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <DestinationImage src={d.imageUrl} alt={d.name} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full font-medium border border-sky-500/30">{d.category}</span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700">{d.ageRange} yrs</span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700">{d.priceRange}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">{d.name}</h1>
          <p className="text-sm text-gray-300 mb-4 flex items-center gap-2">
            <MapPin size={14} />
            <span>{d.location} &middot; {d.city}, {d.country}</span>
          </p>
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
              <Heart size={14} />
              <span>{d.popularity}% parent-approved</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ═══ 3. QUICK OVERVIEW ═══ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        {/* Stats bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-10 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 mb-0.5">
                {d.safetyRating.toFixed(1)} <Star size={14} className="text-amber-400 fill-amber-400" />
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

        {/* Why This Destination */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-sky-500" />
            Why Families Love {d.name}
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-base text-gray-700 leading-relaxed">{d.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {d.amenities.slice(0, 5).map((a, i) => (
                <span key={i} className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full font-medium border border-sky-100">{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. AGE-SPECIFIC BREAKDOWN ═══ */}
        {ageBreakdown.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users size={18} className="text-sky-500" />
              Age-Specific Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ageBreakdown.map((ab, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ab.icon size={16} className="text-sky-500" />
                    <h3 className="font-semibold text-gray-900 text-sm">{ab.age}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{ab.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ 5. TOP ATTRACTIONS ═══ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Compass size={18} className="text-sky-500" />
            Top Attractions & Activities
          </h2>
          <div className="space-y-3">
            {attractions.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{a.name}</h3>
                  <p className="text-sm text-gray-600">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. TIPS & TRICKS ═══ */}
        <section className="mb-10">
          <ExpandableSection title="Tips & Tricks from Real Parents" icon={Lightbulb} defaultOpen={true}>
            <ul className="space-y-3">
              {d.tipsAndTricks.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5 text-sm">★</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </ExpandableSection>
        </section>

        {/* ═══ 7. PRACTICAL INFO ═══ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info size={18} className="text-sky-500" />
            Practical Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practicalInfo.map((p, i) => (
              <InfoCard key={i} icon={p.icon} title={p.label}>{p.value}</InfoCard>
            ))}
          </div>
        </section>

        {/* ═══ 8. PARENT STORY ═══ */}
        {d.parentStory && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart size={18} className="text-rose-500" />
              Real Parent Review
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart size={14} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{d.parentStory.author}</p>
                  <StarRating rating={d.safetyRating} />
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">&ldquo;{d.parentStory.title}&rdquo;</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{d.parentStory.fullStory}</p>
            </div>
          </section>
        )}

        {/* ═══ 9. GALLERY — Removed. Users upload from reviews with moderation ═══ */}

        {/* ═══ 10. RELATED DESTINATIONS ═══ */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <TreePine size={18} className="text-sky-500" />
              Plan Your Next Trip
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/destination/${r.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3 group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <DestinationImage src={r.imageUrl} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors truncate">{r.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{r.city}, {r.country}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-amber-600 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400" /> {r.safetyRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">{r.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══ 11. CLEAR CTA ═══ */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-100 p-6 mb-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Ready to visit {d.name}?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Bookmark this page, share it with your travel group, and start planning your family adventure in {d.city}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              <ArrowLeft size={14} />
              Browse all destinations
            </Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
              <Compass size={14} />
              Back to top
            </button>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
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
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Family Travel Asia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
