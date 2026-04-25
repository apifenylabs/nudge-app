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

  // Parse age range to determine which groups to show
  const nums = range.replace('+', '').split(/[-–&,]/).map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  const minAge = Math.min(...nums);
  const maxAge = Math.max(...nums);

  if (minAge <= 3) {
    sections.push({
      age: 'Toddlers (0-3)',
      icon: Baby,
      color: 'bg-pink-50 border-pink-100',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      content: `${d.name} is toddler-friendly${safety >= 4 ? ' with high safety standards' : ''}. ${d.amenities.some(a => a.toLowerCase().includes('stroller')) ? 'Stroller-friendly access throughout. ' : 'Parent tip: bring a baby carrier for easier navigation. '}Visit during morning hours for the calmest experience with little ones.`,
    });
  }
  if (minAge <= 9 && maxAge >= 4) {
    sections.push({
      age: 'Young Kids (4-9)',
      icon: School,
      color: 'bg-sky-50 border-sky-100',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-600',
      content: `This age group absolutely loves ${d.name}. The interactive elements and sensory experiences are perfect for curious young minds. ${safety >= 4 ? 'Safety measures are excellent, giving parents peace of mind. ' : ''}Plan for 2-3 hours before attention spans start to wane.`,
    });
  }
  if (maxAge >= 10) {
    sections.push({
      age: 'Tweens & Teens (10+)',
      icon: Users,
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      content: `Older kids will appreciate the deeper experiences ${d.name} offers. ${d.itineraryComparison?.fullDay ? 'A full-day visit works great here: ' + d.itineraryComparison.fullDay + '. ' : ''}${d.popularity >= 80 ? 'Highly rated by parents of teens for keeping them engaged. ' : ''}Let teens take photos for the family album — they will appreciate the ownership.`,
    });
  }
  return sections;
}

function generateAttractions(d: Destination) {
  const name = d.name;
  const city = d.city;
  const category = d.category;

  // Build category-specific attraction descriptions
  let catDesc = '';
  if (category.includes('Theme')) catDesc = ' spectacular rides, character meet-and-greets, and themed zones';
  else if (category.includes('Nature')) catDesc = ' wildlife encounters, nature trails, and outdoor discovery zones';
  else if (category.includes('Cultural')) catDesc = ' interactive exhibits, hands-on workshops, and cultural demonstrations';
  else catDesc = ' family-friendly activities and engaging experiences';

  const attractions = [
    { name, desc: d.description.length > 100 ? d.description.substring(0, 120) + '...' : d.description },
    { name: `${city} Family Walking Route`, desc: `A parent-tested walking route through ${city} connecting ${name} with nearby playgrounds, kid-friendly cafes, and rest stops. Perfect for a full day of exploration.` },
    { name: `${d.ageRange} Experience Package`, desc: `Tailored ${d.ageRange}-year-old experience at ${name} featuring${catDesc}. Designed to match energy levels and attention spans.` },
  ];
  if (d.itineraryComparison?.halfDay) {
    attractions.push({ name: `Half-Day Itinerary`, desc: d.itineraryComparison.halfDay });
  }
  return attractions;
}

function generatePracticalInfo(d: Destination) {
  return [
    { icon: Clock, label: 'Best Time to Visit', value: d.bestTime },
    { icon: Bus, label: 'Getting Around', value: `${d.city} has solid family-friendly transport. Taxis and ride-sharing are easy to find near ${d.name}. For stroller users, check for elevator access at metro stations.` },
    { icon: Bed, label: 'Family Accommodation', value: `Hotels near ${d.name} range from budget-friendly to luxury. Look for places with family rooms, kid's clubs, and early dinner service. Booking 2-4 weeks ahead is recommended.` },
    { icon: Utensils, label: 'Kid-Friendly Dining', value: `${d.city} has excellent child-friendly dining near ${d.name}. Look for places with kids' menus, high chairs, and quick service. Street food is always a hit with adventurous young eaters.` },
  ];
}

function generateRelatedDestinations(d: Destination, allDests: any[]) {
  const sameCity = allDests.filter(x => x.city === d.city && x.id !== d.id).slice(0, 2);
  const sameCountry = allDests.filter(x => x.country === d.country && x.id !== d.id && x.city !== d.city).slice(0, 2);
  const sameCategory = allDests.filter(x => x.category === d.category && x.id !== d.id && x.city !== d.city && x.country !== d.country).slice(0, 2);
  const related = [...sameCity, ...sameCountry, ...sameCategory].slice(0, 4);
  const seen = new Set<string>();
  return related.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; });
}

// ─── Section decorator ────────────────────────────────────────────
function SectionNumber({ num }: { num: number }) {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold text-xs mr-0 flex-shrink-0">
      {num}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────
export default function ClientDestinationPage({ initialData }: DestinationPageProps) {
  const d = initialData;

  const [related, setRelated] = useState<any[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  useState(() => {
    fetch('/data/destinations.json').then(r => r.json()).then(data => {
      setRelated(generateRelatedDestinations(d, data));
      setAllLoaded(true);
    }).catch(() => {});
  });

  const ageBreakdown = generateAgeBreakdown(d);
  const attractions = generateAttractions(d);
  const practicalInfo = generatePracticalInfo(d);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 1. HEADER ═══ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to destinations</span>
          </Link>
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-sky-600" />
            <span className="font-semibold text-gray-900 text-sm">Family Travel Asia</span>
          </div>
        </div>
      </header>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <DestinationImage src={d.imageUrl} alt={d.name} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-gray-900/85" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full font-medium border border-sky-500/30 backdrop-blur-sm">{d.category}</span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700 backdrop-blur-sm">{d.ageRange} yrs</span>
            <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700 backdrop-blur-sm">{d.priceRange}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {d.name}
          </h1>
          <p className="text-lg text-gray-300/90 max-w-2xl mb-6 leading-relaxed">
            {d.description.length > 200 ? d.description.substring(0, 200) + '...' : d.description}
          </p>
          <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            <MapPin size={14} />
            <span>{d.location} &middot; {d.city}, {d.country}</span>
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <StarRating rating={d.safetyRating} />
              <span className="text-gray-400 text-xs ml-1">{d.safetyRating.toFixed(1)} / 5 Safety</span>
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20">
        {/* ═══ SECTION 2: QUICK OVERVIEW ═══ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-12 shadow-sm">
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
              <div className="text-xs text-gray-500">Parent Approval</div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber num={2} />
            <h2 className="text-xl font-bold text-gray-900">Why Families Love {d.name}</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-base text-gray-700 leading-relaxed">{d.description}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {d.amenities.slice(0, 6).map((a, i) => (
                <span key={i} className="text-xs bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full font-medium border border-sky-100">{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: AGE-SPECIFIC BREAKDOWN ═══ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber num={3} />
            <h2 className="text-xl font-bold text-gray-900">Age-Specific Guide</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">{d.name} suits ages {d.ageRange}. Here is what each age group will love:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ageBreakdown.map((ab, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${ab.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${ab.iconBg} flex items-center justify-center`}>
                    <ab.icon size={18} className={ab.iconColor} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{ab.age}</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ab.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 4: TOP ATTRACTIONS ═══ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber num={4} />
            <h2 className="text-xl font-bold text-gray-900">Top Attractions & Activities</h2>
          </div>
          <div className="space-y-3">
            {attractions.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 hover:border-gray-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-600 font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{a.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 5: TIPS & TRICKS ═══ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber num={5} />
            <h2 className="text-xl font-bold text-gray-900">Tips & Tricks from Real Parents</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {d.tipsAndTricks.length > 0 ? (
                d.tipsAndTricks.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-4 sm:p-5">
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 font-bold text-xs">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))
              ) : (
                <div className="p-5 text-sm text-gray-500">No parent tips yet. Be the first to share your experience!</div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6: PRACTICAL INFO ═══ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber num={6} />
            <h2 className="text-xl font-bold text-gray-900">Practical Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practicalInfo.map((p, i) => (
              <InfoCard key={i} icon={p.icon} title={p.label}>{p.value}</InfoCard>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 7: PARENT REVIEWS ═══ */}
        {d.parentStory && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <SectionNumber num={7} />
              <h2 className="text-xl font-bold text-gray-900">Parent Reviews & Stories</h2>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart size={16} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{d.parentStory.author}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={d.safetyRating} />
                    <span className="text-xs text-gray-400">Verified Parent</span>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-3 text-base">&ldquo;{d.parentStory.title}&rdquo;</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{d.parentStory.fullStory}</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 italic leading-relaxed">
                  &ldquo;{d.parentStory.excerpt}&rdquo;
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ═══ SECTION 8: RELATED DESTINATIONS ═══ */}
        {related.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <SectionNumber num={8} />
              <h2 className="text-xl font-bold text-gray-900">Plan Your Next Trip</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/destination/${r.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-4 group">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <DestinationImage src={r.imageUrl} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-600 transition-colors truncate">{r.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{r.city}, {r.country}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-amber-600 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400" /> {r.safetyRating.toFixed(1)}
                      </span>
                      <span className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">{r.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══ SECTION 9: CLEAR CTA ═══ */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100 p-8 mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-sky-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to visit {d.name}?</h2>
          <p className="text-sm text-gray-600 mb-5 max-w-md mx-auto">
            Bookmark this page, share it with your travel group, and start planning your family adventure in {d.city}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              <ArrowLeft size={14} />
              Browse all destinations
            </Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
              <Compass size={14} />
              Back to top
            </button>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-200 bg-white mt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-500">
              <Compass size={16} className="text-sky-600" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Asia Family Travel Directory</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
