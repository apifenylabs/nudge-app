'use client';

import { useEffect, useRef, useState } from 'react';

// Only import mapbox-gl on client side
const loadMapbox = async () => {
  const mapboxgl = (await import('mapbox-gl')).default;
  return mapboxgl;
};

interface Business {
  id: number;
  name: string;
  location: string;
  ageRange: string;
  category: string;
}

interface MapContainerProps {
  businesses: Business[];
}

// Mock coordinates for demo
const locationCoordinates: Record<string, [number, number]> = {
  'Paris, France': [2.3522, 48.8566],
  'London, UK': [-0.1276, 51.5072],
  'Barcelona, Spain': [2.1734, 41.3851],
  'Rome, Italy': [12.4964, 41.9028]
};

export default function MapContainer({ businesses }: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('Paris, France');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapLoaded) return;

    const initializeMap = async () => {
      const mapboxgl = await loadMapbox();
      
      // Set your Mapbox token here (will move to env)
      mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbHZ6cGZ0b3UwMG5tMmpxcG5qZ2VqN2JtIn0.1234567890'; // Replace with real token

      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: locationCoordinates['Paris, France'],
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

      // Wait for map to load
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add markers for businesses
        businesses.forEach(business => {
          const coords = locationCoordinates[business.location] || locationCoordinates['Paris, France'];
          
          // Create marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'business-marker';
          markerEl.innerHTML = `
            <div class="relative">
              <div class="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span class="text-white text-xs font-bold">👶</span>
              </div>
              <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-600"></div>
            </div>
          `;

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-gray-900 mb-1">${business.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${business.location}</p>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${business.ageRange}</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${business.category}</span>
              </div>
              <button class="mt-3 w-full px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          `);

          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map.current);
        });
      });
    };

    initializeMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [businesses, mapLoaded]);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    if (map.current && locationCoordinates[location]) {
      map.current.flyTo({
        center: locationCoordinates[location],
        zoom: 11,
        essential: true
      });
    }
  };

  return (
    <div>
      {/* Location selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(locationCoordinates).map(location => (
          <button
            key={location}
            onClick={() => handleLocationChange(location)}
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

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-96 rounded-lg overflow-hidden bg-gray-100" />

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
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

      <style jsx global>{`
        .business-marker {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .business-marker:hover {
          transform: scale(1.1);
        }
        .mapboxgl-popup-content {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .mapboxgl-popup-close-button {
          font-size: 16px;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  );
}