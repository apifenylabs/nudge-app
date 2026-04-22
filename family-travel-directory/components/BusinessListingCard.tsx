'use client';

import { Star, MapPin, Users, CheckCircle, Heart, Share2, ChevronRight, Clock, DollarSign, Shield, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Business {
  id: string | number;
  name: string;
  description: string;
  location: string;
  ageRange: string;
  safetyRating: number;
  amenities: string[];
  category: string;
  imageUrl: string;
  priceRange?: string;
  bestTime?: string;
  popularity?: number;
  affiliateLinks?: {
    klook?: string;
    viator?: string;
    getYourGuide?: string;
    booking?: string;
  };
  commissionRate?: string;
  city?: string;
  country?: string;
}

interface BusinessListingCardProps {
  business: Business;
}

export default function BusinessListingCard({ business }: BusinessListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Color system based on category - Monochromatic with accent
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Theme Park': 'bg-amber-50 text-amber-700 border-amber-200',
      'Museum': 'bg-violet-50 text-violet-700 border-violet-200',
      'Park': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Zoo': 'bg-orange-50 text-orange-700 border-orange-200',
      'Beach': 'bg-sky-50 text-sky-700 border-sky-200',
      'Restaurant': 'bg-rose-50 text-rose-700 border-rose-200',
      'Hotel': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Shopping': 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Age range styling
  const getAgeRangeStyle = (ageRange: string) => {
    return 'bg-gray-900/80 text-white border-gray-700';
  };

  // Safety rating color
  const getSafetyColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-500';
    if (rating >= 4.0) return 'text-amber-500';
    return 'text-rose-500';
  };

  // Price range indicator
  const renderPriceRange = (range?: string) => {
    if (!range) return null;
    const levels = range === '$' ? 1 : range === '$$' ? 2 : range === '$$$' ? 3 : 0;
    return (
      <div className="flex items-center gap-1">
        <DollarSign className="w-3 h-3 text-gray-400" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < levels ? 'bg-gray-900' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-white/0 to-sky-50/0 group-hover:from-gray-50/50 group-hover:via-white/30 group-hover:to-sky-50/50 transition-all duration-500" />
      
      {/* Image container with Nomad List inspired overlay */}
      <div className="relative h-64 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent z-10" />
        
        {/* Image with parallax effect */}
        <img
          src={business.imageUrl}
          alt={business.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Top badges - SetSail inspired */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(business.category)}`}>
            {business.category}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getAgeRangeStyle(business.ageRange)}`}>
            👶 Ages {business.ageRange}
          </span>
        </div>
        
        {/* Favorite button with animation */}
        <button 
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={18} 
            className={`transition-all duration-300 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600 hover:text-rose-500'}`}
          />
        </button>
        
        {/* Safety rating - Premium display */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-white/20">
            <Shield size={16} className={`${getSafetyColor(business.safetyRating)}`} />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-gray-900 text-sm">{business.safetyRating}</span>
              <span className="text-xs text-gray-500">/5.0</span>
            </div>
            <span className="text-xs text-gray-500 ml-1">Safety</span>
          </div>
        </div>
        
        {/* Popularity badge */}
        {business.popularity && business.popularity > 80 && (
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold">
              <Sparkles size={12} />
              Top {business.popularity}%
            </div>
          </div>
        )}
      </div>

      {/* Content area - Generous whitespace */}
      <div className="p-6 relative z-10">
        {/* Title and location */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
              {business.name}
            </h3>
            {business.city && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                <MapPin size={12} className="mr-1" />
                {business.city}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="text-gray-400 mr-2 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm truncate">{business.location}</span>
              {business.country && (
                <span className="text-xs text-gray-500 mt-0.5">{business.country}</span>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {business.description}
          </p>
        </div>

        {/* Stats row - Nomad List inspired */}
        <div className="flex items-center justify-between mb-6 py-3 border-y border-gray-100">
          {/* Price range */}
          <div className="flex items-center gap-2">
            {renderPriceRange(business.priceRange)}
            <span className="text-xs text-gray-500">{business.priceRange || '$$'}</span>
          </div>
          
          {/* Best time to visit */}
          {business.bestTime && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">{business.bestTime}</span>
            </div>
          )}
          
          {/* Age range */}
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">Family</span>
          </div>
        </div>

        {/* Amenities - MonksTrip inspired chips */}
        <div className="mb-6">
          <div className="flex items-center text-gray-700 mb-3">
            <CheckCircle size={16} className="text-emerald-500 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">Family Amenities</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {business.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="inline-flex items-center text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                {amenity}
              </span>
            ))}
            {business.amenities.length > 3 && (
              <span className="text-xs text-gray-500 px-3 py-1.5">
                +{business.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions - Affiliate Booking */}
        <div className="pt-5 border-t border-gray-100">
          <div className="mb-3">
            <div className="flex items-center text-gray-700 mb-2">
              <Sparkles size={16} className="text-amber-500 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium">Book & Save</span>
              {business.commissionRate && (
                <span className="ml-2 text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                  {business.commissionRate} commission
                </span>
              )}
            </div>
            
            {/* Affiliate buttons */}
            <div className="grid grid-cols-2 gap-2">
              {business.affiliateLinks?.klook && (
                <a 
                  href={business.affiliateLinks.klook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 font-medium text-sm transition-all duration-300 active:scale-95 group/btn"
                >
                  <span className="font-bold">Klook</span>
                  <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              )}
              
              {business.affiliateLinks?.viator && (
                <a 
                  href={business.affiliateLinks.viator}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 font-medium text-sm transition-all duration-300 active:scale-95 group/btn"
                >
                  <span className="font-bold">Viator</span>
                  <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              )}
              
              {(!business.affiliateLinks?.klook && !business.affiliateLinks?.viator) && (
                <button className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-medium text-sm transition-all duration-300 active:scale-95 group/btn">
                  View Details
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Partner links earn commission
            </div>
            <div className="flex gap-2">
              <button 
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 active:scale-95"
                title="Save"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart size={18} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
              <button 
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 active:scale-95"
                title="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-transparent group-hover:border-sky-100 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] transition-all duration-500" />
    </div>
  );
}