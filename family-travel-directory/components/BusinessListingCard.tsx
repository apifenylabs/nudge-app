import { Star, MapPin, Users, CheckCircle, Heart, Share2, ChevronRight } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  description: string;
  location: string;
  ageRange: string;
  safetyRating: number;
  amenities: string[];
  category: string;
  imageUrl: string;
}

interface BusinessListingCardProps {
  business: Business;
}

export default function BusinessListingCard({ business }: BusinessListingCardProps) {
  const getAgeRangeColor = (ageRange: string) => {
    switch (ageRange) {
      case '0-2': return 'bg-rose-50 text-rose-700 border-rose-200';
      case '3-5': return 'bg-violet-50 text-violet-700 border-violet-200';
      case '6-12': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '13-17': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'theme park': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'museum': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'park': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'zoo': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image with gradient overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(business.category)} backdrop-blur-sm bg-white/90`}>
            {business.category}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getAgeRangeColor(business.ageRange)} backdrop-blur-sm bg-white/90`}>
            👶 Ages {business.ageRange}
          </span>
        </div>
        
        {/* Favorite button */}
        <button className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
          <Heart size={18} className="text-gray-600 hover:text-rose-500 transition-colors" />
        </button>
        
        {/* Safety rating */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
          <Star size={16} className="text-amber-500 fill-current" />
          <span className="font-bold text-gray-900 text-sm">{business.safetyRating}.0</span>
          <span className="text-xs text-gray-500 ml-1">Safety</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{business.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{business.description}</p>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-700 mb-5">
          <MapPin size={16} className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-sm truncate">{business.location}</span>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <Users size={16} className="text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">Family Amenities</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {business.amenities.slice(0, 4).map((amenity, index) => (
              <span 
                key={index} 
                className="inline-flex items-center text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-100"
              >
                <CheckCircle size={12} className="mr-1.5 text-emerald-500 flex-shrink-0" />
                {amenity}
              </span>
            ))}
            {business.amenities.length > 4 && (
              <span className="text-xs text-gray-500 px-3 py-1.5">
                +{business.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-5 border-t border-gray-100">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-medium text-sm transition-all duration-200 active:scale-95">
            View Details
            <ChevronRight size={16} />
          </button>
          <div className="flex gap-2">
            <button 
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95"
              title="Save"
            >
              <Heart size={18} />
            </button>
            <button 
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95"
              title="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}