import Header from '@/components/Header';
import BusinessListingCard from '@/components/BusinessListingCard';
import { Sparkles, Shield, Globe, Users, Star, TrendingUp, MapPin, Building2 } from 'lucide-react';

// Load data from files
const fs = require('fs');
const path = require('path');

function loadActivities() {
  const activities = [];
  const dataDir = path.join(process.cwd(), 'data');
  
  // Load Tokyo
  try {
    const tokyoData = JSON.parse(fs.readFileSync(path.join(dataDir, 'tokyo-family-activities.json'), 'utf8'));
    tokyoData.activities.forEach((activity: any, index: number) => {
      activities.push({
        ...activity,
        id: index + 1,
        city: 'Tokyo',
        country: 'Japan'
      });
    });
  } catch (error) {
    console.error('Error loading Tokyo data:', error);
  }
  
  // Load Bangkok
  try {
    const bangkokData = JSON.parse(fs.readFileSync(path.join(dataDir, 'bangkok-family-activities.json'), 'utf8'));
    const startId = activities.length + 1;
    bangkokData.activities.forEach((activity: any, index: number) => {
      activities.push({
        ...activity,
        id: startId + index,
        city: 'Bangkok',
        country: 'Thailand'
      });
    });
  } catch (error) {
    console.error('Error loading Bangkok data:', error);
  }
  
  // Load Singapore
  try {
    const singaporeData = JSON.parse(fs.readFileSync(path.join(dataDir, 'singapore-family-activities.json'), 'utf8'));
    const startId = activities.length + 1;
    singaporeData.activities.forEach((activity: any, index: number) => {
      activities.push({
        ...activity,
        id: startId + index,
        city: 'Singapore',
        country: 'Singapore'
      });
    });
  } catch (error) {
    console.error('Error loading Singapore data:', error);
  }
  
  return activities;
}

const activities = loadActivities();

// Calculate stats
const totalActivities = activities.length;
const cities = Array.from(new Set(activities.map(a => a.city).filter(Boolean)));
const countries = Array.from(new Set(activities.map(a => a.country).filter(Boolean)));
const totalCommission = activities.reduce((sum, activity) => {
  if (activity.commissionRate) {
    const rate = parseFloat(activity.commissionRate);
    return sum + (isNaN(rate) ? 0 : rate);
  }
  return sum;
}, 0);
const avgCommission = totalActivities > 0 ? (totalCommission / totalActivities).toFixed(1) + '%' : '0%';

// Stats for display
const stats = [
  { label: 'Activities', value: totalActivities.toString(), icon: Building2, color: 'text-sky-500' },
  { label: 'Cities', value: cities.length.toString(), icon: MapPin, color: 'text-emerald-500' },
  { label: 'Countries', value: countries.length.toString(), icon: Globe, color: 'text-amber-500' },
  { label: 'Avg Commission', value: avgCommission, icon: Star, color: 'text-rose-500' },
];

// Top destinations for display
const topDestinations = [
  { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop', count: activities.filter(a => a.city === 'Tokyo').length },
  { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w-800&auto=format&fit=crop', count: activities.filter(a => a.city === 'Bangkok').length },
  { name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop', count: activities.filter(a => a.city === 'Singapore').length },
  { name: 'Coming Soon', country: 'Hong Kong', image: 'https://images.unsplash.com/photo-1518599807935-37015b9cefcb?w=800&auto=format&fit=crop', count: 0 },
];
  // Tokyo Activities
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
  
  // Bangkok Activities
  {
    id: 4,
    name: "Safari World Bangkok",
    description: "Massive open zoo and marine park with drive-through safari, animal shows, and feeding experiences. Perfect for animal-loving families.",
    location: "99 Panya Intra Rd, Sam Wa Tawan Tok, Khlong Sam Wa, Bangkok 10510",
    ageRange: "2-15",
    safetyRating: 4.7,
    amenities: ["Safari Drive", "Animal Shows", "Feeding Experiences", "Stroller Rental"],
    category: "Zoo",
    imageUrl: "https://images.unsplash.com/photo-1550358864-518f202c02ba",
    priceRange: "$$",
    bestTime: "Morning, Dry season (Nov-Feb)",
    popularity: 88,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/1183-safari-world-bangkok/?aid=OURCODE",
      viator: "https://www.viator.com/tours/Bangkok/Safari-World-Bangkok-Ticket/d343-50170P1?pid=OURCODE"
    },
    commissionRate: "7%"
  },
  {
    id: 5,
    name: "Sea Life Bangkok Ocean World",
    description: "Southeast Asia's largest aquarium located under Siam Paragon mall. Walk-through tunnels, touch pools, and penguin feeding shows.",
    location: "Siam Paragon, 991 Rama I Rd, Pathum Wan, Bangkok 10330",
    ageRange: "3-14",
    safetyRating: 4.8,
    amenities: ["Underwater Tunnel", "Touch Pools", "Penguin Feeding", "Stroller Access"],
    category: "Aquarium",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    priceRange: "$$",
    bestTime: "Weekdays, Morning",
    popularity: 92,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/1184-sea-life-bangkok-ocean-world/?aid=OURCODE",
      getYourGuide: "https://www.getyourguide.com/bangkok-l169/bangkok-sea-life-ocean-world-ticket-t395175/?partner_id=OURCODE"
    },
    commissionRate: "8%"
  },
  {
    id: 6,
    name: "Dream World Bangkok",
    description: "Thailand's answer to Disneyland with themed zones, gentle rides for young children, and thrilling rides for teens. Good mix of attractions.",
    location: "62 Moo 1, Rangsit-Nakornnayok Rd, Thanyaburi, Pathum Thani 12130",
    ageRange: "5-17",
    safetyRating: 4.6,
    amenities: ["Theme Zones", "Gentle Rides", "Thrill Rides", "Shows", "Restaurants"],
    category: "Theme Park",
    imageUrl: "https://images.unsplash.com/photo-1567602901358-5ba17615aaeb",
    priceRange: "$$",
    bestTime: "Weekdays, Dry season",
    popularity: 85,
    affiliateLinks: {
      klook: "https://www.klook.com/activity/1186-dream-world-bangkok/?aid=OURCODE",
      viator: "https://www.viator.com/tours/Bangkok/Dream-World-Bangkok-Ticket/d343-50170P2?pid=OURCODE"
    },
    commissionRate: "6%"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Destinations Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Asia Destinations</h2>
              <p className="text-gray-600">Most visited family-friendly cities</p>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              View all cities
              <TrendingUp size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topDestinations.map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{destination.country}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{destination.count} activities</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                      {destination.count > 0 ? 'Explore' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Family Travel Directory
            <Sparkles className="inline-block w-8 h-8 ml-3 text-amber-500" />
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Curated family-friendly destinations with Apple-level UI design. 
            Find safe, engaging activities for children of all ages.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">Safety Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-700">Family Focused</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-700">Global Destinations</span>
            </div>
          </div>
        </div>

        {/* Business Listings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Family Destinations in Asia
              <TrendingUp className="inline-block w-6 h-6 ml-2 text-green-500" />
            </h2>
            <div className="text-sm text-gray-500">
              Showing {activities.length} verified locations across {cities.length} cities
            </div>
          </div>

          {/* Business listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((business) => (
              <BusinessListingCard key={business.id} business={business} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Plan Your Family Adventure?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of families who trust our verified recommendations for safe, 
            engaging, and memorable travel experiences.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
            Explore All Destinations
          </button>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 Family Travel Directory. All rights reserved.</p>
          <p className="mt-2 text-sm">Beautiful UI inspired by Apple design principles.</p>
        </div>
      </footer>
    </div>
  );
}