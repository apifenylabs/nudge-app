/**
 * Route-to-station mappings for each itinerary.
 * Maps station IDs from stations.json to each itinerary city/location.
 * Used by itinerary pages to show real charging station data.
 */

import type { Station } from '@/lib/scoring';

/**
 * Get stations matching a city name (case-insensitive, partial match).
 */
export function getStationsForCity(stations: Station[], cityName: string): Station[] {
  const q = cityName.toLowerCase();
  return stations.filter(s => s.city.toLowerCase().includes(q));
}

/**
 * Get stations along a specific itinerary route.
 * Returns a map of city -> Station[] with the best stations listed first.
 */
export function getRouteStations(stations: Station[], routeSlug: string): Map<string, Station[]> {
  const routeCities = routeCityMap[routeSlug] || [];
  const result = new Map<string, Station[]>();
  
  for (const city of routeCities) {
    const matches = getStationsForCity(stations, city);
    if (matches.length > 0) {
      // Sort by combined score: reliability * 0.4 + speed (normalized) * 0.3 + amenity count * 0.3
      const sorted = [...matches].sort((a, b) => {
        const scoreA = a.reliability * 0.4 + Math.min(a.chargerSpeed / 350, 1) * 0.3 + 
          ([a.hasRestroomNearby, a.hasFoodNearby, a.hasCoveredParking, a.has24by7Access, a.isMallParking].filter(Boolean).length / 5) * 0.3;
        const scoreB = b.reliability * 0.4 + Math.min(b.chargerSpeed / 350, 1) * 0.3 + 
          ([b.hasRestroomNearby, b.hasFoodNearby, b.hasCoveredParking, b.has24by7Access, b.isMallParking].filter(Boolean).length / 5) * 0.3;
        return scoreB - scoreA;
      });
      result.set(city, sorted);
    }
  }
  
  return result;
}

/**
 * Get recommended charging stops for an itinerary (top 2-3 per city).
 */
export function getRecommendedStops(stations: Station[], routeSlug: string): Station[] {
  const routeStations = getRouteStations(stations, routeSlug);
  const recommended: Station[] = [];
  
  for (const [, cityStations] of routeStations) {
    // Take top 2 stations per city
    recommended.push(...cityStations.slice(0, 2));
  }
  
  return recommended;
}

/**
 * Count total charging stops needed (stations across all route cities).
 */
export function countRouteChargingStops(stations: Station[], routeSlug: string): number {
  const routeStations = getRouteStations(stations, routeSlug);
  let total = 0;
  for (const [, cityStations] of routeStations) {
    total += cityStations.length;
  }
  return total;
}

/**
 * Get kid-friendly stations (have restroom + food + covered parking or mall parking).
 */
export function getKidFriendlyStations(stations: Station[], routeSlug: string): Station[] {
  const recommended = getRecommendedStops(stations, routeSlug);
  return recommended.filter(s => 
    s.hasRestroomNearby && s.hasFoodNearby && (s.hasCoveredParking || s.isMallParking)
  );
}

/**
 * Get luxury stations along a route (high reliability + high speed + good amenities).
 */
export function getLuxuryStations(stations: Station[], routeSlug: string): Station[] {
  const recommended = getRecommendedStops(stations, routeSlug);
  return recommended.filter(s => {
    const amenityCount = [s.hasRestroomNearby, s.hasFoodNearby, s.hasCoveredParking, s.has24by7Access].filter(Boolean).length;
    return s.reliability >= 4.0 && s.chargerSpeed >= 100 && amenityCount >= 2;
  });
}

// City mappings for each route slug
const routeCityMap: Record<string, string[]> = {
  'bangkok-to-phuket-road-trip': ['Bangkok', 'Surat Thani', 'Phuket'],
  'bangkok-to-chiang-mai-road-trip': ['Bangkok', 'Chiang Mai'],
  'singapore-to-kuala-lumpur-road-trip': ['Singapore', 'Johor Bahru', 'Melaka', 'Kuala Lumpur'],
  'bali-ev-road-trip-loop': ['Denpasar'],
  'hong-kong-to-macau-road-trip': ['Hong Kong', 'Zhuhai', 'Macau'],
  'hanoi-to-ha-long-bay-road-trip': ['Hanoi', 'Haiphong'],
  'osaka-to-tokyo-road-trip': ['Osaka', 'Kyoto', 'Nagoya', 'Tokyo'],
  'kuala-lumpur-to-penang-road-trip': ['Kuala Lumpur', 'Ipoh', 'George Town'],
  'mumbai-to-pune-road-trip': ['Mumbai', 'Pune'],
  'tokyo-to-hakone-fuji-road-trip': ['Tokyo', 'Hakone'],
  'delhi-to-jaipur-agra-road-trip': ['Delhi', 'Jaipur', 'Agra'],
  'chiang-mai-to-pai-mae-hong-son-road-trip': ['Chiang Mai', 'Pai'],
};

// Also map the shorter slug format used in app/itinerary
const shortRouteSlugMap: Record<string, string[]> = {
  'bangkok-phuket': ['Bangkok', 'Surat Thani', 'Phuket'],
  'bangkok-chiang-mai': ['Bangkok', 'Chiang Mai'],
  'singapore-kuala-lumpur': ['Singapore', 'Johor Bahru', 'Melaka', 'Kuala Lumpur'],
  'bali-loop': ['Denpasar'],
  'hong-kong-macau': ['Hong Kong', 'Zhuhai', 'Macau'],
  'hanoi-ha-long': ['Hanoi', 'Haiphong'],
  'osaka-tokyo': ['Osaka', 'Kyoto', 'Nagoya', 'Tokyo'],
  'kuala-lumpur-penang': ['Kuala Lumpur', 'Ipoh', 'George Town'],
  'mumbai-pune': ['Mumbai', 'Pune'],
  'tokyo-hakone-fuji': ['Tokyo', 'Hakone'],
  'delhi-jaipur-agra': ['Delhi', 'Jaipur', 'Agra'],
  'chiang-mai-pai-mae-hong-son': ['Chiang Mai', 'Pai'],
};

export function getRouteCities(routeSlug: string): string[] {
  return shortRouteSlugMap[routeSlug] || routeCityMap[routeSlug] || [];
}
