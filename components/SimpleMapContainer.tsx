'use client';

import { useState, useMemo } from 'react';
import { MapPin, Star, ExternalLink, Compass, Info } from 'lucide-react';
import Link from 'next/link';

interface MapDestination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  safetyRating: number;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
}

interface SimpleMapContainerProps {
  destinations?: MapDestination[];
  height?: string;
  businesses?: Array<{ id: number; name: string; location: string; ageRange: string; category: string }>;
}

// ─── City → approximate lat/lng map (for map display without Mapbox) ──
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Kyoto': { lat: 35.0116, lng: 135.7681 },
  'Osaka': { lat: 34.6937, lng: 135.5023 },
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  'Seoul': { lat: 37.5665, lng: 126.9780 },
  'Bali': { lat: -8.3405, lng: 115.0920 },
  'Phuket': { lat: 7.8804, lng: 98.3923 },
  'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
  'Hanoi': { lat: 21.0278, lng: 105.8342 },
  'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297 },
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'Barcelona': { lat: 41.3874, lng: 2.1686 },
  'Rome': { lat: 41.9028, lng: 12.4964 },
  'Istanbul': { lat: 41.0082, lng: 28.9784 },
  'Dubai': { lat: 25.2048, lng: 55.2708 },
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'San Francisco': { lat: 37.7749, lng: -122.4194 },
  'Taipei': { lat: 25.0330, lng: 121.5654 },
  'Shanghai': { lat: 31.2304, lng: 121.4737 },
  'Beijing': { lat: 39.9042, lng: 116.4074 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
};

// Category colors
const CAT_COLORS: Record<string, string> = {
  'Theme Parks & Attractions': '#3B82F6',
  'Nature & Outdoor Adventures': '#10B981',
  'Cultural & Historical Sites': '#F59E0B',
};

export default function SimpleMapContainer({
  destinations: searchDestinations,
  height = '600px',
  businesses,
}: SimpleMapContainerProps) {
  const [selectedDest, setSelectedDest] = useState<MapDestination | null>(null);
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);

  // Convert businesses prop to map destinations if needed (backwards compat)
  const destinations = useMemo(() => {
    if (searchDestinations) return searchDestinations;
    if (businesses) {
      return businesses.map(b => ({
        id: String(b.id),
        name: b.name,
        city: b.location.split(',')[0]?.trim() || b.location,
        country: b.location.split(',')[1]?.trim() || '',
        category: b.category,
        safetyRating: 4,
        imageUrl: '',
      }));
    }
    return [];
  }, [searchDestinations, businesses]);

  // Derive approximate coordinates from city name
  const pins = useMemo(() => {
    const map = new Map<string, { dest: MapDestination; lat: number; lng: number }[]>();
    destinations.forEach(d => {
      const coord = CITY_COORDS[d.city] || { lat: 20 + Math.random() * 20, lng: 100 + Math.random() * 30 };
      const key = `${coord.lat.toFixed(2)},${coord.lng.toFixed(2)}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ dest: d, ...coord });
    });
    return Array.from(map.values());
  }, [destinations]);

  // Group pins by city for cluster display
  const cityClusters = useMemo(() => {
    const map = new Map<string, MapDestination[]>();
    destinations.forEach(d => {
      const key = `${d.city}, ${d.country}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [destinations]);

  // Map bounds (approximate Asia focus for travel directory)
  const mapStyle = {
    position: 'relative' as const,
    width: '100%',
    height,
    background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E5F7 30%, #C8DCE8 60%, #B5CDD9 100%)',
    borderRadius: '1rem',
    overflow: 'hidden' as const,
  };

  // Grid lines (rough longitude/latitude approximation)
  const gridLines = [
    { top: '20%', label: 'Northern' },
    { top: '50%', label: 'Equator' },
    { top: '80%', label: 'Southern' },
  ];

  return (
    <div className="relative" style={mapStyle}>
      {/* Grid lines */}
      {gridLines.map((g, i) => (
        <div key={i} className="absolute left-0 right-0 border-t border-white/30" style={{ top: g.top }}>
          <span className="absolute -top-3 left-2 text-[10px] text-white/50 font-medium">{g.label}</span>
        </div>
      ))}

      {/* Land mass hint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />

      {/* Pin clusters */}
      {cityClusters.map(([city, dests]) => {
        const d = dests[0];
        const coord = CITY_COORDS[d.city] || { lat: 20, lng: 100 };
        // Normalize coords to % positions (rough Asia view: lat 40 to -10, lng 70 to 150)
        const left = ((coord.lng - 70) / 80) * 100;
        const top = ((40 - coord.lat) / 50) * 100;
        const isHovered = hoveredDest === city;
        const isSelected = selectedDest && dests.some(sd => sd.id === selectedDest.id);

        return (
          <div
            key={city}
            className="absolute transition-all duration-200"
            style={{ left: `${Math.max(2, Math.min(90, left))}%`, top: `${Math.max(2, Math.min(90, top))}%`, transform: 'translate(-50%, -50%)', zIndex: isSelected ? 20 : isHovered ? 10 : 1 }}
            onMouseEnter={() => setHoveredDest(city)}
            onMouseLeave={() => setHoveredDest(null)}
          >
            {/* Pin */}
            <button
              onClick={() => setSelectedDest(selectedDest?.id === dests[0].id ? null : dests[0])}
              className={`flex items-center justify-center transition-all rounded-full shadow-lg cursor-pointer ${
                isHovered || isSelected ? 'scale-125' : ''
              }`}
              style={{
                width: dests.length > 1 ? `${28 + Math.min(dests.length, 5) * 4}px` : '32px',
                height: dests.length > 1 ? `${28 + Math.min(dests.length, 5) * 4}px` : '32px',
                background: isHovered ? '#3B82F6' : (CAT_COLORS[dests[0].category] || '#6B7280'),
              }}
            >
              <span className="text-white font-bold text-xs">
                {dests.length > 1 ? dests.length : <MapPin size={14} />}
              </span>
            </button>

            {/* Pin label */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-medium text-white drop-shadow-lg bg-gray-900/60 px-1.5 py-0.5 rounded">
                {dests.length > 1 ? `${city} (${dests.length})` : dests[0].name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Selected destination popup */}
      {selectedDest && (
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-72 z-30">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {selectedDest.imageUrl ? (
                <img src={selectedDest.imageUrl} alt={selectedDest.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin size={18} className="text-gray-400" />
                </div>
              )}
            </div>
            <button onClick={() => setSelectedDest(null)} className="text-gray-400 hover:text-gray-600 ml-2">
              <span className="text-lg leading-none">&times;</span>
            </button>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{selectedDest.name}</h3>
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <MapPin size={10} />
            {selectedDest.city}, {selectedDest.country}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">{selectedDest.category}</span>
            <span className="text-xs text-amber-600 flex items-center gap-0.5">
              <Star size={10} className="fill-amber-400" /> {selectedDest.safetyRating.toFixed(1)}
            </span>
          </div>
          <Link
            href={`/destination/${selectedDest.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
          >
            View details <ExternalLink size={10} />
          </Link>

          {/* City cluster */}
          {cityClusters
            .filter(([city]) => city === `${selectedDest.city}, ${selectedDest.country}`)
            .map(([city, dests]) =>
              dests.length > 1 && (
                <div key={city} className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 font-medium mb-1.5">Also in {selectedDest.city}:</p>
                  <div className="space-y-1">
                    {dests.slice(0, 4).map(d => (
                      <Link
                        key={d.id}
                        href={`/destination/${d.id}`}
                        className={`block text-xs py-1 px-2 rounded hover:bg-gray-50 transition-colors ${
                          d.id === selectedDest.id ? 'text-sky-600 font-medium' : 'text-gray-600'
                        }`}
                      >
                        {d.name}
                      </Link>
                    ))}
                    {dests.length > 4 && (
                      <p className="text-[10px] text-gray-400">+{dests.length - 4} more</p>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-3 shadow-sm">
        <p className="text-[10px] font-medium text-gray-500 mb-2">Legend</p>
        <div className="space-y-1.5">
          {Object.entries(CAT_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              <span className="text-[10px] text-gray-600">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map info */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 px-2.5 py-1.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <Info size={10} />
          <span>{destinations.length} destinations shown · Click pins for details</span>
        </div>
      </div>
    </div>
  );
}
