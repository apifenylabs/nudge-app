import Header from '@/components/Header';
import BusinessListingCard from '@/components/BusinessListingCard';
import { Sparkles, Shield, Globe, Users, Star, TrendingUp } from 'lucide-react';

// Sample Tokyo data for MVP
const tokyoActivities = [
  {
    id: 1,
    name: "Tokyo Disneyland & DisneySea",
    description: "The ultimate family destination with two incredible parks. Disneyland offers classic Disney magic perfect for younger children.",
    location: "1-1 Maihama, Urayasu, Chiba 279-0031",
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
    ageRange: "0-12",
    safetyRating: 4.7,
    amenities: ["Stroller Access", "Nursing Rooms", "Play Areas", "Educational Programs"],
    category: "Zoo",
    imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
    priceRange: "$",
    bestTime: "Morning, Spring/Fall",
    popularity: 87,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/5765-ueno-zoo-tokyo/?aid=OURCODE"
    },
    commissionRate: "6%"
  },
  {
    id: 3,
    name: "KidZania Tokyo",
    description: "Interactive educational park where children can role-play various professions in a kid-sized city. Safe, educational, and incredibly fun.",
    location: "3-1-3 Toyosu, Koto City, Tokyo 135-8614",
    ageRange: "4-14",
    safetyRating: 4.8,
    amenities: ["Educational", "Role-Playing", "Supervised Activities", "English Support"],
    category: "Educational",
    imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
    priceRange: "$$",
    bestTime: "Weekdays",
    popularity: 92,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/5766-kidzania-tokyo/?aid=OURCODE"
    },
    commissionRate: "7%"
  },
  {
    id: 4,
    name: "Tokyo Skytree & Sumida Aquarium",
    description: "Combine breathtaking city views with an amazing aquarium experience. The Skytree observation decks offer panoramic views of Tokyo.",
    location: "1-1-2 Oshiage, Sumida City, Tokyo 131-0045",
    ageRange: "5-17",
    safetyRating: 4.9,
    amenities: ["Elevator Access", "Stroller Friendly", "Restaurants", "Gift Shops"],
    category: "Observation",
    imageUrl: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3",
    priceRange: "$$",
    bestTime: "Morning or Evening",
    popularity: 94,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/5767-tokyo-skytree-tickets/?aid=OURCODE",
      viator: "https://www.viator.com/tours/Tokyo/Tokyo-Skytree-Tembo-Deck-Ticket/d334-2142TYO_SKYTREE?pid=OURCODE"
    },
    commissionRate: "8%"
  }
];

// Stats data
const stats = [
  { label: 'Destinations', value: '245+', icon: Globe, color: 'text-sky-500' },
  { label: 'Family Activities', value: '1,200+', icon: Users, color: 'text-emerald-500' },
  { label: 'Safety Rated', value: '100%', icon: Shield, color: 'text-amber-500' },
  { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-rose-500' },
];

// Top destinations
const topDestinations = [
  { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop', count: 89 },
  { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop', count: 76 },
  { name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop', count: 92 },
  { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&auto=format&fit=crop', count: 68 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="container relative mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
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
        
        {/* Stats bar */}
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
        {/* Top Destinations */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDestinations.map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{destination.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{destination.count} family activities</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tokyo Activities */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tokyo Family Activities</h2>
              <p className="text-gray-600">{tokyoActivities.length} results • Sorted by popularity</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium">
                <option>Sort by: Popularity</option>
                <option>Sort by: Safety Rating</option>
                <option>Sort by: Price</option>
              </select>
            </div>
          </div>

          {/* Business listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {tokyoActivities.map((business) => (
              <BusinessListingCard key={business.id} business={business} />
            ))}
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
        </section>
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
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Safety Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trip Planner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Age Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partnerships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate Program</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2026 Family Travel Directory. All rights reserved.</p>
            <p className="mt-2">Affiliate links earn commission. We only recommend trusted partners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}