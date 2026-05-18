'use client';

import { useState } from 'react';
import { Filter, Star, Baby, Utensils, Wifi } from 'lucide-react';

interface FilterState {
  ageRanges: string[];
  safetyRating: number;
  amenities: string[];
  priceRange: [number, number];
}

export default function FilterSidebar() {
  const [filters, setFilters] = useState<FilterState>({
    ageRanges: [],
    safetyRating: 0,
    amenities: [],
    priceRange: [0, 100]
  });

  const ageRangeOptions = [
    { value: '0-2', label: 'Infants (0-2)' },
    { value: '3-5', label: 'Toddlers (3-5)' },
    { value: '6-12', label: 'Children (6-12)' },
    { value: '13-17', label: 'Teens (13-17)' },
    { value: 'all-ages', label: 'All Ages' }
  ];

  const amenityOptions = [
    { value: 'changing-rooms', label: 'Changing Rooms', icon: <Baby size={16} /> },
    { value: 'stroller-access', label: 'Stroller Access', icon: <Baby size={16} /> },
    { value: 'kid-menus', label: 'Kid Menus', icon: <Utensils size={16} /> },
    { value: 'wifi', label: 'Free WiFi', icon: <Wifi size={16} /> },
    { value: 'first-aid', label: 'First Aid Available' },
    { value: 'breastfeeding', label: 'Breastfeeding Areas' },
    { value: 'playground', label: 'Playground' },
    { value: 'family-bathrooms', label: 'Family Bathrooms' }
  ];

  const toggleAgeRange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      ageRanges: prev.ageRanges.includes(range)
        ? prev.ageRanges.filter(r => r !== range)
        : [...prev.ageRanges, range]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      ageRanges: [],
      safetyRating: 0,
      amenities: [],
      priceRange: [0, 100]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Age Ranges */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-3">Age Range</h3>
        <div className="space-y-2">
          {ageRangeOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ageRanges.includes(option.value)}
                onChange={() => toggleAgeRange(option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Safety Rating */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-3">Minimum Safety Rating</h3>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters(prev => ({ ...prev, safetyRating: rating }))}
              className={`p-2 rounded-lg ${filters.safetyRating >= rating ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}
            >
              <Star size={20} fill={filters.safetyRating >= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {filters.safetyRating === 0 ? 'Any rating' : `${filters.safetyRating}+ stars`}
        </p>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-3">Amenities</h3>
        <div className="space-y-2">
          {amenityOptions.map(amenity => (
            <label key={amenity.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity.value)}
                onChange={() => toggleAmenity(amenity.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                {amenity.icon && <span className="text-gray-500">{amenity.icon}</span>}
                <span className="text-gray-700">{amenity.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>€{filters.priceRange[0]}</span>
            <span>€{filters.priceRange[1]}+</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-500">
            {filters.priceRange[1] === 0 ? 'Free options' : `Up to €${filters.priceRange[1]}`}
          </div>
        </div>
      </div>

      <button
        onClick={() => console.log('Applying filters:', filters)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
      >
        Apply Filters
      </button>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>{filters.ageRanges.length}</strong> age ranges selected
          <br />
          <strong>{filters.amenities.length}</strong> amenities selected
          <br />
          Safety: {filters.safetyRating === 0 ? 'Any' : `${filters.safetyRating}+ stars`}
        </p>
      </div>
    </div>
  );
}