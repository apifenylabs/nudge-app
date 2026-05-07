'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, MapPin, ChevronLeft, ChevronRight, X, ExternalLink, Zap } from 'lucide-react';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';
import { affiliateLinks, getAffiliatesForLocation } from '@/lib/affiliate-links';

interface FeaturedFamilyStopsProps {
  stations: Station[];
}

/**
 * "Featured Family EV Stops" carousel — sponsored section for homepage and search results.
 * Shows top-rated stations with affiliate booking links.
 */
const FeaturedFamilyStops: FC<FeaturedFamilyStopsProps> = ({ stations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Select top family-friendly stations (2+ family amenities)
  const familyFriendlyStations = stations
    .filter(s => {
      const amenities = [s.hasRestroomNearby, s.hasFoodNearby, s.hasCoveredParking, s.isMallParking];
      return amenities.filter(Boolean).length >= 2;
    })
    .sort((a, b) => computeStationScore(b) - computeStationScore(a))
    .slice(0, 10);

  if (familyFriendlyStations.length === 0) return null;

  const displayed = familyFriendlyStations.slice(currentIndex, currentIndex + 3);
  const showNav = familyFriendlyStations.length > 3;

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(familyFriendlyStations.length - 3, prev + 1));
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/70 mb-6 text-sm font-semibold text-gray-900 hover:from-amber-100 hover:to-orange-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Star size={16} className="text-amber-500 fill-amber-500" />
          Featured Family EV Stops
        </span>
        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">{familyFriendlyStations.length} stops</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/70 p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-amber-500 fill-amber-500" />
          <h3 className="text-sm font-bold text-gray-900">Featured Family EV Stops</h3>
          <span className="text-[10px] bg-amber-200/60 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">
            Sponsored
          </span>
        </div>
        <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600 p-1">
          <X size={14} />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative">
        {showNav && currentIndex > 0 && (
          <button onClick={prevSlide} className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow border border-gray-200 p-1.5 hover:bg-gray-50">
            <ChevronLeft size={14} className="text-gray-600" />
          </button>
        )}
        {showNav && currentIndex < familyFriendlyStations.length - 3 && (
          <button onClick={nextSlide} className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow border border-gray-200 p-1.5 hover:bg-gray-50">
            <ChevronRight size={14} className="text-gray-600" />
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayed.map((station) => {
            const score = computeStationScore(station);
            const tier = scoreTier(score);
            const stationLinks = getAffiliatesForLocation(station.country, station.city);
            const hotelLink = stationLinks.find(l => l.type === 'hotel');
            const tourLink = stationLinks.find(l => l.type === 'tour' || l.type === 'experience');

            return (
              <div key={station.id} className="bg-white rounded-lg border border-amber-100 p-3 hover:shadow-md transition-shadow">
                <Link href={`/station/${station.id}`} className="block mb-2">
                  <div className="text-xs font-semibold text-gray-900 truncate">{station.name}</div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <MapPin size={10} /> {station.city}, {station.country}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${tier.color}`}>{tier.label}</span>
                    <span className="text-[10px] text-gray-400">{station.chargerSpeed}kW</span>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {[station.hasRestroomNearby, station.hasFoodNearby, station.hasCoveredParking, station.isMallParking].filter(Boolean).length} amenities
                    </span>
                  </div>
                </Link>

                {/* Affiliate actions */}
                <div className="flex gap-1.5">
                  {hotelLink && (
                    <a
                      href={hotelLink.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-1 text-center px-2 py-1.5 bg-purple-50 text-purple-700 rounded-md text-[10px] font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                    >
                      🏨 Book Hotel
                    </a>
                  )}
                  {tourLink && (
                    <a
                      href={tourLink.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-1 text-center px-2 py-1.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      🎫 Book Tour
                    </a>
                  )}
                  {!hotelLink && !tourLink && (
                    <Link
                      href={`/station/${station.id}`}
                      className="flex-1 text-center px-2 py-1.5 bg-gray-50 text-gray-600 rounded-md text-[10px] font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      🔍 View Station
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      {showNav && (
        <div className="flex items-center justify-center gap-1 mt-3">
          {Array.from({ length: Math.ceil(familyFriendlyStations.length / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 3)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === Math.floor(currentIndex / 3) ? 'bg-amber-500 w-3' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedFamilyStops;
