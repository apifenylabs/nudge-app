'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BusinessListingCard from '@/components/BusinessListingCard';
import {
  Search, MapPin, Sparkles, Shield, Globe, Users, Star, TrendingUp,
  Filter, SlidersHorizontal, ChevronDown, ChevronRight, Clock,
  Compass, TreePine, Palmtree, Landmark, Utensils, Hotel, ShoppingBag,
  ArrowRight, BookOpen, Heart, Quote
} from 'lucide-react';

// -- DATA --
type Activity = {
  id: string;
  name: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  description: string;
  location: string;
  city: string;
  country: string;
  bestTime: string;
  priceRange: string;
  amenities: string[];
  safetyFeatures?: string[];
  seoKeywords?: string[];
  imageUrl: string;
  popularity: number;
  source?: string;
  affiliateLinks?: Record<string, string>;
  commissionRate?: string;
};

const categories = [
  { name: "Theme Parks", icon: Sparkles, desc: "Where memories are made" },
  { name: "Parks & Nature", icon: TreePine, desc: "Fresh air, open spaces" },
  { name: "Zoos & Aquariums", icon: Palmtree, desc: "Wild encounters up close" },
  { name: "Museums", icon: Landmark, desc: "Learn while having fun" },
  { name: "Restaurants", icon: Utensils, desc: "Kid-approved dining" },
  { name: "Hotels", icon: Hotel, desc: "Stay where families love" },
];

const stories = [
  { id: 1, title: "When our 4-year-old met a panda", excerpt: "She pressed her face against the glass for 15 minutes, completely still. I don't think she blinked once. Ueno Zoo isn't fancy, but it's the most honest, wonderful zoo we've ever been to.", author: "Sarah, mom of 2", destination: "Ueno Zoo, Tokyo", emoji: "\u{1F43C}" },
  { id: 2, title: "The night we almost lost our son at Gardens by the Bay", excerpt: "He ran toward the light show and we panicked for 30 seconds. The staff were incredible -- within 2 minutes they had him safe. The show? Magical. The staff? Even better.", author: "Mike, dad of 3", destination: "Gardens by the Bay, Singapore", emoji: "\u{1F333}" },
  { id: 3, title: "Universal Studios with a 5-year-old: a survival guide", excerpt: "We bought the Express Pass and it saved our trip. She rode the flying dinosaur 4 times. She's 5. I don't know where she gets the energy, but I know where she gets the courage -- Super Nintendo World.", author: "Lisa, mom of 1", destination: "Universal Studios Japan, Osaka", emoji: "\u2B50" },
  { id: 4, title: "KidZania changed how my son thinks about work", excerpt: "He was a firefighter for 45 minutes. Then a pilot. Then a surgeon. He came home and asked if he could do ALL of them when he grows up. We said yes, buddy. You can do anything.", author: "James, dad of 2", destination: "KidZania, Tokyo", emoji: "\u{1F692}" },
  { id: 5, title: "The cheap trick that made Nara Deer Park our favorite day", excerpt: "Buy the deer crackers. Hide half of them in your pocket. The deer will bow for treats -- your kids will lose their minds. Pro tip: go early, the deer are hungrier and more enthusiastic.", author: "Emma, mom of 3", destination: "Nara Deer Park, Nara", emoji: "\u{1F986}" },
  { id: 6, title: "Marina Bay Sands with kids: is it worth the hype?", excerpt: "Yes. But skip the main pool and head to the family pool -- way more room, way less Instagram crowd, and your kids can actually swim instead of posing.", author: "Tom, dad of 2", destination: "Marina Bay Sands, Singapore", emoji: "\u{1F3CA}" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [destinations, setDestinations] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Load data from JSON files
  useEffect(() => {
    async function loadData() {
      try {
        const cities = ['tokyo', 'bangkok', 'singapore'];
        let all: Activity[] = [];
        let count = 0;

        for (const city of cities) {
          const res = await fetch(`/data/${city}-family-activities.json`);
          if (res.ok) {
            const json = await res.json();
            if (json.activities) {
              const withCity = json.activities.map((a: Activity) => ({
                ...a,
                city: json.city,
                country: json.country,
              }));
              all = [...all, ...withCity];
              count += json.totalListings || withCity.length;
            }
          }
        }

        setDestinations(all);
        setTotalCount(count);
        setLoading(false);
      } catch (e) {
        console.error('Failed to load data:', e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Get unique cities from data
  const cities = [...new Set(destinations.map(d => d.city))];

  // Filter and sort
  let filtered = [...destinations];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q)
    );
  }
  if (selectedCity !== "All") filtered = filtered.filter(d => d.city === selectedCity);
  if (selectedCategory !== "All") filtered = filtered.filter(d => d.category === selectedCategory);
  filtered.sort((a, b) => {
    if (sortBy === "popularity") return (b.popularity || 0) - (a.popularity || 0);
    if (sortBy === "safety") return b.safetyRating - a.safetyRating;
    return (a.priceRange?.length || 0) - (b.priceRange?.length || 0);
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <BookOpen size={14} className="text-amber-400" />
              Curated by parents who've been there -- {totalCount || '100+'} destinations
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
              We found the places
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                your kids will remember forever
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              No generic lists. No paid placements. Every destination here was
              <span className="text-white/90 font-medium"> hand-picked by parents</span> who brought their own kids --
              tested for safety, rated for fun, and shared with the honest, unfiltered
              advice you'd get from a friend.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                <div className="flex-1 flex items-center px-5">
                  <Search size={20} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Where are you taking the family?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-base bg-transparent"
                  />
                </div>
                <button 
                  onClick={() => {
                    // Search is already handled by searchQuery state + filtered array
                    // This button provides visual feedback
                    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                    if (searchInput) searchInput.blur();
                  }}
                  className="px-6 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  Search
                </button>
              </div>
            </div>

            {/* City pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city === selectedCity ? "All" : city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCity === city
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                      : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  <MapPin size={14} className="inline-block mr-1.5" />
                  {city}
                </button>
              ))}
              <button
                onClick={() => { setSelectedCity("All"); setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all"
              >
                <Sparkles size={14} className="inline-block mr-1.5" />
                All Cities
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name)}
              className={`flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl border transition-all duration-300 group ${
                selectedCategory === cat.name
                  ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20 scale-[1.02]"
                  : "bg-white text-gray-700 border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-colors ${
                selectedCategory === cat.name ? "bg-white/10" : "bg-gray-50 group-hover:bg-gray-100"
              }`}>
                <cat.icon size={22} className={selectedCategory === cat.name ? "text-amber-400" : "text-gray-600"} />
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
              <span className={`text-[10px] ${selectedCategory === cat.name ? "text-white/60" : "text-gray-400"}`}>
                {cat.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* TAB: Explore / Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "explore" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Compass size={16} className="inline-block mr-1.5" />
            Explore
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "stories" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <BookOpen size={16} className="inline-block mr-1.5" />
            Parent Stories
          </button>
        </div>
      </div>

      {/* STORIES TAB */}
      {activeTab === "stories" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map(story => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  selectedStory === story.id
                    ? "border-amber-200 bg-amber-50 shadow-lg shadow-amber-100/50"
                    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{story.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-400">3 min read</span>
                      <span className="text-gray-300">&middot;</span>
                      <span className="text-xs font-medium text-amber-600">{story.destination}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">{story.title}</h3>
                    <p className={`text-sm text-gray-600 leading-relaxed ${
                      selectedStory === story.id ? "" : "line-clamp-2"
                    }`}>
                      {story.excerpt}
                    </p>
                    {selectedStory === story.id && (
                      <div className="mt-4 pt-4 border-t border-amber-200">
                        <div className="flex items-center gap-2">
                          <Quote size={14} className="text-amber-400" />
                          <span className="text-sm text-gray-500">{story.author}</span>
                        </div>
                        <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700">
                          Read full story <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-3">Have a story to share?</p>
            <button 
              onClick={() => alert('Story submission coming soon! Share your family travel story at stories@familytravel.asia')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <BookOpen size={16} />
              Write Your Family Story
            </button>
          </div>
        </div>
      )}

      {/* EXPLORE TAB */}
      {activeTab === "explore" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : "Destinations hand-picked for your family"}
              </h2>
              <p className="text-gray-500 mt-1">
                {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? 'destination' : 'destinations'} found`}
                {selectedCity !== "All" && !loading && ` in ${selectedCity}`}
                {selectedCategory !== "All" && !loading && ` - ${selectedCategory}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 cursor-pointer"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="safety">Highest Safety</option>
                  <option value="price">Lowest Price</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  showFilters ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <SlidersHorizontal size={16} />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option>All Categories</option>
                    {categories.map(c => <option key={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-gray-500 mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option>All Cities</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Price Range</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                    <option>Any Price</option>
                    <option>$ Budget</option>
                    <option>$$ Mid</option>
                    <option>$$$ Premium</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4" />
              <p className="text-gray-500">Loading destinations...</p>
            </div>
          )}

          {/* Destination grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((business) => (
                <BusinessListingCard key={business.id} business={business} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <Compass size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCity("All"); setSelectedCategory("All"); }}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* STATS */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{totalCount || '100'}+</div>
              <div className="text-sm text-gray-500">Verified Destinations</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4.8</div>
              <div className="text-sm text-gray-500">Avg Safety Rating</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{cities.length}</div>
              <div className="text-sm text-gray-500">Cities Covered</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-500">Parent Support</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mx-auto w-12" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <Star size={14} className="text-amber-400" />
              Join 10,000+ families who trust us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to plan your next family adventure?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Every destination here was tested by real parents.
              We share the good, the bad, and the "bring extra snacks."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('All');
                  setSelectedCategory('All');
                  setActiveTab('explore');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]"
              >
                Explore All Destinations
                <ChevronRight size={18} className="inline-block ml-1" />
              </button>
              <button 
                onClick={() => {
                  setActiveTab('stories');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                Read Parent Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-sm">Asia Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="/contact" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">&copy; 2026 Asia Family Travel Directory. Curated by parents, for parents.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
