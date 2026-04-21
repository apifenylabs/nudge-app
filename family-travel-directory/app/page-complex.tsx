import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import BusinessListingCard from '@/components/BusinessListingCard';
import SimpleMapContainer from '@/components/SimpleMapContainer';
import { Sparkles, Shield, Globe, Users, Star, TrendingUp } from 'lucide-react';

// Load Tokyo data from JSON file
async function fetchTokyoData() {
  try {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'data', 'tokyo-family-activities.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data.activities.slice(0, 12); // Show first 12 for MVP
  } catch (error) {
    console.error('Error loading Tokyo data:', error);
    return [];
  }
}

// Mock categories for MVP
async function fetchCategories() {
  return [
    { id: 1, name: 'Theme Park', count: 8 },
    { id: 2, name: 'Museum', count: 12 },
    { id: 3, name: 'Zoo', count: 5 },
    { id: 4, name: 'Park', count: 9 },
    { id: 5, name: 'Educational', count: 7 },
    { id: 6, name: 'Shopping', count: 6 },
  ];
}

// Top Asia destinations data
const topDestinations = [
  { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop', count: 89 },
  { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop', count: 76 },
  { name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop', count: 92 },
  { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop', count: 68 },
  { name: 'Hong Kong', country: 'China', image: 'https://images.unsplash.com/photo-1518599807935-37015b9cefcb?w=800&auto=format&fit=crop', count: 81 },
  { name: 'Seoul', country: 'South Korea', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop', count: 74 },
];

// Stats data
const stats = [
  { label: 'Destinations', value: '245+', icon: Globe, color: 'text-sky-500' },
  { label: 'Family Activities', value: '1,200+', icon: Users, color: 'text-emerald-500' },
  { label: 'Safety Rated', value: '100%', icon: Shield, color: 'text-amber-500' },
  { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-rose-500' },
];

export default async function Home() {
  const tokyoActivities = await fetchTokyoData();
  const categories = await fetchCategories();
  
  // Define activity type
  interface TokyoActivity {
    name: string;
    description: string;
    location: string;
    ageRange: string;
    safetyRating: number;
    amenities?: string[];
    category: string;
    imageUrl: string;
    priceRange?: string;
    bestTime?: string;
    popularity?: number;
    affiliateLinks?: {
      klook?: string;
      viator?: string;
      getYourGuide?: string;
    };
    commissionRate?: string;
  }

  // Transform for BusinessListingCard component
  const transformedBusinesses = tokyoActivities.map((activity: TokyoActivity, index: number) => ({
    id: index + 1,
    name: activity.name,
    description: activity.description,
    location: activity.location,
    ageRange: activity.ageRange,
    safetyRating: activity.safetyRating,
    amenities: activity.amenities || [],
    category: activity.category,
    imageUrl: activity.imageUrl,
    priceRange: activity.priceRange || '$$',
    bestTime: activity.bestTime || 'Morning',
    popularity: activity.popularity || 80,
    affiliateLinks: activity.affiliateLinks,
    commissionRate: activity.commissionRate
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section - SetSail inspired */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
        <div className="container relative mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles size={14} />
              <span className="text-sm font-medium">Asia's #1 Family Travel Directory</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Discover <span className="text-sky-300">Kid-Safe</span> Adventures
              <br />
              Across <span className="text-amber-300">Asia</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl">
              Curated, safety-rated destinations for families. From Tokyo's theme parks to Bali's beaches—find perfect experiences for every age.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
                <Sparkles size={20} />
                Explore Destinations
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                How It Works
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats bar - Nomad List inspired */}
        <div className="container relative mx-auto px-4 md:px-8 -mb-10">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-8 py-12">
        {/* Top Destinations - MonksTrip inspired */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Asia Destinations</h2>
              <p className="text-gray-600">Most visited family-friendly cities</p>
            </div>
            <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
              View all
              <TrendingUp size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent z-10" />
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-white font-bold text-lg">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{destination.country}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                      {destination.count} places
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Directory Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Perfect Places</h3>
                <SearchBar />
              </div>
              <FilterSidebar />
              
              {/* Quick stats */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Directory Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Listings</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Updated Today</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Safety</span>
                    <span className="font-medium text-emerald-600">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Results header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Family-Friendly Places</h2>
                <p className="text-gray-600">{transformedBusinesses.length} results • Sorted by popularity</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium">
                  <option>Sort by: Popularity</option>
                  <option>Sort by: Safety Rating</option>
                  <option>Sort by: Price</option>
                </select>
                <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Business listings grid - Nomad List card layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {transformedBusinesses.map((business: any) => (
                <BusinessListingCard key={business.id} business={business} />
              ))}
            </div>

            {/* Map section */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Explore on Map</h2>
                <p className="text-gray-600">Find family-friendly locations across Asia</p>
              </div>
              <div className="h-96">
                <SimpleMapContainer businesses={transformedBusinesses} />
              </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Ready for Your Family Adventure?</h2>
                <p className="text-gray-300 mb-8">
                  Join thousands of families who trust our curated directory for safe, memorable travel experiences across Asia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Start Planning
                  </button>
                  <button className="px-8 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    Download Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Family Travel</h3>
                  <p className="text-sm text-gray-400">Kid-safe directory</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                The most beautiful, modern directory of family-friendly travel destinations across Asia.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tokyo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bangkok</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Singapore</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bali</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hong Kong</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Safety Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trip Planner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Age Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Packing Lists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Family Travel Directory. All rights reserved.</p>
            <p className="mt-2">Making family travel planning safe and simple across Asia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}