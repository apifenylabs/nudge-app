'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface Business {
  id: number;
  name: string;
  location: string;
  ageRange: string;
  category: string;
}

interface SimpleMapContainerProps {
  businesses: Business[];
}

export default function SimpleMapContainer({ businesses }: SimpleMapContainerProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('Paris, France');

  const locationCoordinates: Record<string, { lat: number; lng: number }> = {
    'Paris, France': { lat: 48.8566, lng: 2.3522 },
    'London, UK': { lat: 51.5072, lng: -0.1276 },
    'Barcelona, Spain': { lat: 41.3851, lng: 2.1734 },
    'Rome, Italy': { lat: 41.9028, lng: 12.4964 }
  };

  const businessesByLocation = businesses.reduce((acc, business) => {
    if (!acc[business.location]) {
      acc[business.location] = [];
    }
    acc[business.location].push(business);
    return acc;
  }, {} as Record<string, Business[]>);

  return (
    <div>
      {/* Location selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(locationCoordinates).map(location => (
          <button
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedLocation === location
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Map visualization (simplified) */}
      <div className="bg-gray-100 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <MapPin size={24} className="text-blue-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Family-Friendly Locations in {selectedLocation}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessesByLocation[selectedLocation]?.map(business => (
            <div key={business.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{business.name}</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {business.ageRange}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{business.category}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                {business.location}
              </div>
            </div>
          )) || (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No businesses found for {selectedLocation}. Try another location.
            </div>
          )}
        </div>
      </div>

      {/* Location statistics */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Location Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(businessesByLocation).map(([location, locBusinesses]) => (
            <div key={location} className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{locBusinesses.length}</div>
              <div className="text-sm text-gray-600">{location}</div>
              <div className="text-xs text-gray-500 mt-1">
                {locBusinesses.filter(b => b.ageRange === '0-2' || b.ageRange === '3-5').length} toddler-friendly
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          <span>Family-Friendly Location</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span>Parks & Gardens</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
          <span>Theme Parks</span>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Interactive map coming soon. Currently showing simplified location view.</p>
        <p className="mt-1">Mapbox integration requires API key for full functionality.</p>
      </div>
    </div>
  );
}