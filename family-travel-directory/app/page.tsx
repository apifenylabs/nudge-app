'use client';

import { useState, useEffect } from 'react';
import {
  Search, MapPin, Sparkles, Shield, Globe, Users, Star,
  ChevronDown, ChevronRight, Clock, Compass, TreePine,
  Landmark, Utensils, Hotel, ArrowRight, BookOpen, Quote,
  Lightbulb, Heart, Clock3, Sun, Moon, Filter
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

const categories = [
  { name: "Theme Parks", icon: Sparkles, desc: "Where memories are made" },
  { name: "Parks & Nature", icon: TreePine, desc: "Fresh air, open spaces" },
  { name: "Zoos & Aquariums", icon: Globe, desc: "Wild encounters up close" },
  { name: "Museums", icon: Landmark, desc: "Learn while having fun" },
  { name: "Restaurants", icon: Utensils, desc: "Kid-approved dining" },
  { name: "Hotels", icon: Hotel, desc: "Stay where families love" },
];

const cities = ["Tokyo", "Hong Kong", "Bangkok", "Phuket", "Singapore", "Bali", "Hanoi", "Seoul"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/destinations.json');
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
        }
        setLoading(false);
      } catch (e) {
        console.error('Failed to load data:', e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter & sort
  let filtered = [...destinations];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.tipsAndTricks.some(t => t.toLowerCase().includes(q))
    );
  }
  if (selectedCity !== "All") filtered = filtered.filter(d => d.city === selectedCity);
  if (selectedCategory !== "All") filtered = filtered.filter(d => d.category === selectedCategory);
  if (selectedAge !== "All") {
    filtered = filtered.filter(d => {
      const range = d.ageRange.split('-').map(Number);
      const [ageMin] = range;
      if (selectedAge === "0-3") return ageMin <= 3;
      if (selectedAge === "4-6") return ageMin <= 6;
      if (selectedAge === "7-12") return ageMin <= 12;
      if (selectedAge === "13+") return ageMin >= 13 || d.ageRange.includes('17') || d.ageRange.includes('99');
      return true;
    });
  }
  filtered.sort((a, b) => {
    if (sortBy === "popularity") return b.popularity - a.popularity;
    if (sortBy === "safety") return b.safetyRating - a.safetyRating;
    if (sortBy === "price") return a.priceRange.length - b.priceRange.length;
    return 0;
  });

  const selected = destinations.find(d => d.id === selectedDest);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass size={20} className="text-sage-600" />
            <span className="font-semibold text-stone-800 text-sm tracking-tight">Family Travel Asia</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span className="hidden sm:block">{destinations.length} destinations</span>
            <span className="hidden sm:block">&middot;</span>
            <span className="hidden sm:block">{cities.length} cities</span>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-b from-sage-900 via-sage-800 to-sage-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <BookOpen size={14} className="text-sage-300" />
              Real parent advice. No fluff. {destinations.length} hand-picked destinations.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              We took our kids so you don't have to guess
            </h1>
            <p className="text-lg text-sage-100/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Honest, unfiltered tips from parents who've actually been there.
              Every destination has real advice — the good, the bad, and the
              &ldquo;bring extra snacks.&rdquo;
            </p>
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-sage-900/20 overflow-hidden">
                <div className="flex-1 flex items-center px-5">
                  <Search size={20} className="text-sage-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search destinations, tips, or cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 px-3 text-stone-900 placeholder:text-stone-400 focus:outline-none text-base bg-transparent"
                  />
                </div>
                <button
                  onClick={() => {
                    const el = document.querySelector('input');
                    if (el) el.blur();
                  }}
                  className="px-6 py-4 bg-sage-700 text-white font-medium hover:bg-sage-600 transition-colors text-sm"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city === selectedCity ? "All" : city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCity === city
                      ? "bg-sage-500 text-white shadow-lg shadow-sage-500/30"
                      : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  <MapPin size={14} className="inline-block mr-1.5" />
                  {city}
                </button>
              ))}
              <button
                onClick={() => { setSelectedCity("All"); setSelectedCategory("All"); setSelectedAge("All"); setSearchQuery(""); }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* ─── CATEGORY GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all group ${
                selectedCategory === cat.name
                  ? "bg-sage-700 text-white border-sage-700 shadow-lg"
                  : "bg-white text-stone-700 border-stone-100 hover:border-sage-200 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${
                selectedCategory === cat.name ? "bg-white/10" : "bg-sage-50 group-hover:bg-sage-100"
              }`}>
                <cat.icon size={20} className={selectedCategory === cat.name ? "text-sage-200" : "text-sage-600"} />
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-stone-800">
              {searchQuery ? `"${searchQuery}"` : "Destinations"}
            </h2>
            {!loading && (
              <span className="text-sm text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
                {filtered.length} {filtered.length === 1 ? 'place' : 'places'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="bg-white border border-stone-200 text-stone-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              <option value="All">All ages</option>
              <option value="0-3">Babies & Toddlers (0-3)</option>
              <option value="4-6">Preschool (4-6)</option>
              <option value="7-12">School Age (7-12)</option>
              <option value="13+">Teens (13+)</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-200 text-stone-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300"
            >
              <option value="popularity">Popular</option>
              <option value="safety">Safest</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── DESTINATION CARDS ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-stone-200 border-t-sage-600 rounded-full animate-spin mb-4" />
            <p className="text-stone-500 text-sm">Finding the best destinations...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
            <Compass size={40} className="mx-auto text-stone-300 mb-3" />
            <h3 className="text-lg font-semibold text-stone-800 mb-1">No destinations match your filters</h3>
            <p className="text-stone-500 text-sm mb-4">Try a different city, age range, or search term</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCity("All"); setSelectedCategory("All"); setSelectedAge("All"); }}
              className="px-5 py-2 bg-sage-600 text-white rounded-xl text-sm font-medium hover:bg-sage-500 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((dest) => (
              <div
                key={dest.id}
                onClick={() => setSelectedDest(selectedDest === dest.id ? null : dest.id)}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 bg-sage-100 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <MapPin size={12} />
                      <span>{dest.city}, {dest.country}</span>
                      <span className="ml-auto flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        {dest.safetyRating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-800 leading-snug">{dest.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full font-medium">{dest.category}</span>
                        <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{dest.ageRange} yrs</span>
                        <span className="text-xs text-stone-400">{dest.priceRange}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">{dest.description}</p>

                  {/* Quick Tips Preview */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-sage-600 font-medium">
                    <Lightbulb size={12} />
                    <span>{dest.tipsAndTricks.length} parent tips</span>
                    <span className="text-stone-300">&middot;</span>
                    <BookOpen size={12} />
                    <span>Read story</span>
                  </div>

                  {/* Expanded Details */}
                  {selectedDest === dest.id && (
                    <div className="mt-5 pt-5 border-t border-stone-100 space-y-5 animate-fadeIn">
                      {/* Gallery */}
                      {'gallery' in dest && dest.gallery && dest.gallery.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {dest.gallery.slice(0, 3).map((img: string, i: number) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${dest.name} photo ${i + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      )}

                      {/* Tips & Tricks */}
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 mb-2">
                          <Lightbulb size={14} />
                          Tips & Tricks from Parents
                        </div>
                        <ul className="space-y-2">
                          {dest.tipsAndTricks.map((tip, i) => (
                            <li key={i} className="flex gap-2 text-sm text-stone-600">
                              <span className="text-sage-500 font-bold flex-shrink-0 mt-0.5">*</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Parent Story */}
                      <div className="bg-sage-50 rounded-xl p-4">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 mb-1">
                          <Heart size={14} className="fill-sage-300" />
                          {dest.parentStory.title}
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed italic mb-2">
                          &ldquo;{dest.parentStory.excerpt}&rdquo;
                        </p>
                        <p className="text-xs text-sage-600 font-medium">&mdash; {dest.parentStory.author}</p>
                      </div>

                      {/* Itinerary Comparison */}
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 mb-2">
                          <Clock3 size={14} />
                          Plan Your Visit
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-stone-50 rounded-xl p-3">
                            <div className="flex items-center gap-1 text-xs font-semibold text-stone-500 mb-1">
                              <Sun size={12} /> Half Day
                            </div>
                            <p className="text-xs text-stone-600">{dest.itineraryComparison.halfDay}</p>
                          </div>
                          <div className="bg-stone-50 rounded-xl p-3">
                            <div className="flex items-center gap-1 text-xs font-semibold text-stone-500 mb-1">
                              <Moon size={12} /> Full Day
                            </div>
                            <p className="text-xs text-stone-600">{dest.itineraryComparison.fullDay}</p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-stone-400">
                          <span className="font-medium">Best for:</span> {dest.itineraryComparison.bestFor}
                        </div>
                      </div>

                      {/* Safety & Amenities */}
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-500 mb-1.5">Safety Features</div>
                          <div className="flex flex-wrap gap-1">
                            {dest.safetyFeatures.slice(0, 3).map((f, i) => (
                              <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{f}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-500 mb-1.5">Amenities</div>
                          <div className="flex flex-wrap gap-1">
                            {dest.amenities.slice(0, 3).map((a, i) => (
                              <span key={i} className="text-xs bg-sage-50 text-sage-600 px-2 py-0.5 rounded-full">{a}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Best Time */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <Clock size={12} />
                        <span className="font-medium">Best time:</span> {dest.bestTime}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── STATS ─── */}
      <section className="bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sage-700 mb-1">{destinations.length}+</div>
              <div className="text-sm text-stone-500">Verified Destinations</div>
              <div className="mt-2 h-0.5 bg-sage-200 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sage-700 mb-1">4.7</div>
              <div className="text-sm text-stone-500">Avg Safety Rating</div>
              <div className="mt-2 h-0.5 bg-sage-200 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sage-700 mb-1">{cities.length}</div>
              <div className="text-sm text-stone-500">Cities Covered</div>
              <div className="mt-2 h-0.5 bg-sage-200 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sage-700 mb-1">120+</div>
              <div className="text-sm text-stone-500">Parent Tips</div>
              <div className="mt-2 h-0.5 bg-sage-200 rounded-full mx-auto w-12" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="relative bg-gradient-to-br from-sage-800 via-sage-700 to-sage-600 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <Star size={14} className="text-sage-200" />
              Every tip comes from real parents
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to plan a trip your kids will actually remember?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              We've done the research, read the Reddit threads, and talked to
              hundreds of parents. Now you get the shortcut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3.5 bg-white text-sage-700 font-semibold rounded-xl hover:bg-sage-50 transition-all shadow-lg active:scale-[0.98]"
              >
                Browse All Destinations
                <ChevronRight size={18} className="inline-block ml-1" />
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'tips' ? 'explore' : 'tips')}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                Read Parent Tips
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Compass size={16} className="text-sage-600" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <a href="/about" className="hover:text-stone-800 transition-colors">About</a>
              <a href="/privacy" className="hover:text-stone-800 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-stone-800 transition-colors">Terms</a>
              <a href="/contact" className="hover:text-stone-800 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-stone-400">&copy; 2026 Family Travel Asia. Curated by parents, for parents.</p>
          </div>
        </div>
      </footer>

      {/* ─── Tailwind Animation ─── */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
