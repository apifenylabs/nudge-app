'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BusinessListingCard from '@/components/BusinessListingCard';
import { 
  Search, MapPin, Sparkles, Shield, Globe, Users, Star, TrendingUp, 
  Filter, SlidersHorizontal, ChevronDown, ChevronRight, Clock, 
  Compass, TreePine, Palmtree, Landmark, Utensils, Hotel, ShoppingBag
} from 'lucide-react';

// Sample data
const destinations = [
  {
    id: 1,
    name: "Tokyo Disneyland & DisneySea",
    description: "The ultimate family destination with two incredible parks. Disneyland offers classic Disney magic perfect for younger children.",
    location: "1-1 Maihama, Urayasu, Chiba 279-0031",
    city: "Tokyo",
    country: "Japan",
    ageRange: "3-17",
    safetyRating: 4.9,
    amenities: ["Stroller Rental", "Baby Care Centers", "Family Restrooms", "Child Swap"],
    category: "Theme Park",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    priceRange: "$$$",
    bestTime: "Weekdays, September-November",
    popularity: 98,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/135-tokyo-disneyland-tickets/?aid=OURCODE",
      viator: "https://www.viator.com/tours/Tokyo/Tokyo-Disneyland-1-Day-Pass/d334-2142TYO_TDL1?pid=OURCODE"
    },
    commissionRate: "8%"
  },
  {
    id: 2,
    name: "Ueno Zoo & Museums",
    description: "Japan's oldest zoo located in beautiful Ueno Park. Perfect for younger children with pandas, gorillas, and a children's zoo.",
    location: "9-83 Uenokoen, Taito City, Tokyo 110-8711",
    city: "Tokyo",
    country: "Japan",
    ageRange: "2-12",
    safetyRating: 4.7,
    amenities: ["Stroller Accessible", "Nursing Rooms", "Play Areas", "Educational Programs"],
    category: "Zoo",
    imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
    priceRange: "$",
    bestTime: "Spring and Fall, Weekdays",
    popularity: 85,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/456-ueno-zoo-tickets/?aid=OURCODE"
    },
    commissionRate: "6%"
  },
  {
    id: 3,
    name: "KidZania Tokyo",
    description: "Educational theme park where children can role-play adult jobs in a kid-sized city. Highly interactive and educational.",
    location: "3-1-3 Toyosu, Koto City, Tokyo 135-8614",
    city: "Tokyo",
    country: "Japan",
    ageRange: "4-14",
    safetyRating: 4.8,
    amenities: ["Educational Activities", "Role-Playing", "Safety Monitors", "Parent Lounges"],
    category: "Theme Park",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    priceRange: "$$",
    bestTime: "Weekdays, Reservations Recommended",
    popularity: 92,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/789-kidzania-tokyo/?aid=OURCODE"
    },
    commissionRate: "7%"
  },
  {
    id: 4,
    name: "Universal Studios Japan",
    description: "World-class theme park with Super Nintendo World, Wizarding World of Harry Potter, and family-friendly attractions.",
    location: "2-1-33 Sakurajima, Konohana-ku, Osaka 554-0031",
    city: "Osaka",
    country: "Japan",
    ageRange: "5-17",
    safetyRating: 4.8,
    amenities: ["Express Pass", "Baby Swap", "Stroller Rental", "Nursing Rooms"],
    category: "Theme Park",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e",
    priceRange: "$$$",
    bestTime: "Weekdays, January-February",
    popularity: 96,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/321-usj-tickets/?aid=OURCODE"
    },
    commissionRate: "8%"
  },
  {
    id: 5,
    name: "Osaka Aquarium Kaiyukan",
    description: "One of the world's largest aquariums with a giant Pacific octopus, whale sharks, and interactive exhibits for children.",
    location: "1-1-10 Kaigandori, Minato-ku, Osaka 552-0022",
    city: "Osaka",
    country: "Japan",
    ageRange: "2-16",
    safetyRating: 4.9,
    amenities: ["Interactive Exhibits", "Nursing Rooms", "Wheelchair Accessible"],
    category: "Museum",
    imageUrl: "https://images.unsplash.com/photo-1560275619-4cc5fa59b127",
    priceRange: "$$",
    bestTime: "Weekdays, Afternoons",
    popularity: 88,
    affiliateLinks: {
      viator: "https://www.viator.com/tours/Osaka/Osaka-Aquarium-Kaiyukan/d334-12345?pid=OURCODE"
    },
    commissionRate: "6%"
  },
  {
    id: 6,
    name: "Nara Deer Park",
    description: "A magical park where over 1,000 friendly deer roam freely. Children can feed and interact with the deer in a safe environment.",
    location: "Nara Park, Nara 630-8211",
    city: "Nara",
    country: "Japan",
    ageRange: "2-14",
    safetyRating: 4.6,
    amenities: ["Open Space", "Picnic Areas", "Walking Paths", "Deer Crackers"],
    category: "Park",
    imageUrl: "https://images.unsplash.com/photo-1567186937675-a5131c8a89ea",
    priceRange: "$",
    bestTime: "Early Morning, Weekdays",
    popularity: 82,
    affiliateLinks: {},
    commissionRate: "0%"
  },
  {
    id: 7,
    name: "Marina Bay Sands SkyPark",
    description: "Iconic infinity pool and observation deck with breathtaking views of Singapore's skyline. Family-friendly pools and restaurants.",
    location: "10 Bayfront Ave, Singapore 018956",
    city: "Singapore",
    country: "Singapore",
    ageRange: "5-17",
    safetyRating: 4.7,
    amenities: ["Infinity Pool", "Restaurants", "Observation Deck", "Kids Club"],
    category: "Hotel",
    imageUrl: "https://images.unsplash.com/photo-1519996529932-28371d4f5f24",
    priceRange: "$$$",
    bestTime: "Evening sunset, Avoid weekends",
    popularity: 94,
    affiliateLinks: {
      booking: "https://www.booking.com/hotel/sg/marina-bay-sands.html?aid=OURCODE"
    },
    commissionRate: "10%"
  },
  {
    id: 8,
    name: "Gardens by the Bay",
    description: "A futuristic garden with Supertree Grove, Cloud Forest, and Flower Dome. Nightly light and sound show for all ages.",
    location: "18 Marina Gardens Dr, Singapore 018953",
    city: "Singapore",
    country: "Singapore",
    ageRange: "2-16",
    safetyRating: 4.9,
    amenities: ["Stroller Accessible", "Nursing Rooms", "Shaded Walkways", "Light Show"],
    category: "Park",
    imageUrl: "https://images.unsplash.com/photo-1512921960060-7eb38a2d2fcb",
    priceRange: "$$",
    bestTime: "Late afternoon to evening",
    popularity: 91,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/567-gardens-by-the-bay/?aid=OURCODE"
    },
    commissionRate: "7%"
  },
  {
    id: 9,
    name: "Singapore Zoo & Night Safari",
    description: "World-renowned open-concept zoo with incredible animal encounters. The Night Safari offers a unique nocturnal experience.",
    location: "80 Mandai Lake Rd, Singapore 729826",
    city: "Singapore",
    country: "Singapore",
    ageRange: "3-17",
    safetyRating: 4.8,
    amenities: ["Tram Rides", "Animal Shows", "Playgrounds", "Restaurants"],
    category: "Zoo",
    imageUrl: "https://images.unsplash.com/photo-1559482921-5b04d8f0b2f8",
    priceRange: "$$",
    bestTime: "Morning for Zoo, Evening for Night Safari",
    popularity: 87,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/890-singapore-zoo/?aid=OURCODE"
    },
    commissionRate: "6%"
  }
];

const categories = [
  { name: "Theme Parks", icon: Sparkles, color: "bg-amber-50 text-amber-600 border-amber-200", hoverColor: "hover:bg-amber-100" },
  { name: "Parks & Nature", icon: TreePine, color: "bg-emerald-50 text-emerald-600 border-emerald-200", hoverColor: "hover:bg-emerald-100" },
  { name: "Zoos & Aquariums", icon: Palmtree, color: "bg-sky-50 text-sky-600 border-sky-200", hoverColor: "hover:bg-sky-100" },
  { name: "Museums", icon: Landmark, color: "bg-violet-50 text-violet-600 border-violet-200", hoverColor: "hover:bg-violet-100" },
  { name: "Restaurants", icon: Utensils, color: "bg-rose-50 text-rose-600 border-rose-200", hoverColor: "hover:bg-rose-100" },
  { name: "Hotels", icon: Hotel, color: "bg-indigo-50 text-indigo-600 border-indigo-200", hoverColor: "hover:bg-indigo-100" },
];

const cities = ["Tokyo", "Osaka", "Singapore", "Nara", "Bangkok"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"popularity" | "safety" | "price">("popularity");

  // Filter logic
  let filtered = [...destinations];
  
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.description.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q)
    );
  }
  if (selectedCity !== "All") {
    filtered = filtered.filter(d => d.city === selectedCity);
  }
  if (selectedCategory !== "All") {
    filtered = filtered.filter(d => d.category === selectedCategory);
  }

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === "popularity") return (b.popularity || 0) - (a.popularity || 0);
    if (sortBy === "safety") return b.safetyRating - a.safetyRating;
    return (a.priceRange?.length || 0) - (b.priceRange?.length || 0);
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* === HERO SECTION - Nomad List inspired === */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <Sparkles size={14} className="text-amber-400" />
              Curated for families · 50+ destinations worldwide
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Family Travel, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> Done Right</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Discover safe, engaging, and unforgettable destinations 
              for the whole family — all verified and reviewed by parents.
            </p>

            {/* Search bar - Apple inspired */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                <div className="flex-1 flex items-center px-5">
                  <Search size={20} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search destinations, cities, or activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none text-base bg-transparent"
                  />
                </div>
                <button className="px-6 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors text-sm">
                  Search
                </button>
              </div>
            </div>

            {/* Quick filters - pills */}
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
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* === CATEGORY GRID - MonksTrip inspired === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name === selectedCategory ? "All" : cat.name)}
              className={`flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20 scale-[1.02]"
                  : `${cat.color} ${cat.hoverColor} hover:shadow-md`
              }`}
            >
              <cat.icon size={24} />
              <span className="text-xs font-semibold">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* === MAIN CONTENT === */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Toolbar - Nomad List inspired */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : "Top Destinations"}
            </h2>
            <p className="text-gray-500 mt-1">
              {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'} found
              {selectedCity !== "All" && ` in ${selectedCity}`}
              {selectedCategory !== "All" && ` · ${selectedCategory}`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 cursor-pointer"
              >
                <option value="popularity">Most Popular</option>
                <option value="safety">Highest Safety</option>
                <option value="price">Lowest Price</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showFilters 
                  ? "bg-gray-900 text-white border-gray-900" 
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                  <option>All Categories</option>
                  {categories.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-2">City</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10">
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
                <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Business listings grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((business) => (
            <BusinessListingCard key={business.id} business={business} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
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
      </main>

      {/* === STATS SECTION === */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-500">Verified Destinations</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4.8</div>
              <div className="text-sm text-gray-500">Avg Safety Rating</div>
              <div className="mt-2 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto w-12" />
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-sm text-gray-500">Family Approved</div>
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

      {/* === CTA SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          </div>
          
          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <Star size={14} className="text-amber-400" />
              Join 10,000+ happy families
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Plan Your Family Adventure?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of families who trust our verified recommendations for safe, 
              engaging, and memorable travel experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]">
                Explore All Destinations
                <ChevronRight size={18} className="inline-block ml-1" />
              </button>
              <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-sm">Family Travel Directory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-400">© 2026 Family Travel Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}