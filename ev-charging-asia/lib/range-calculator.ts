/**
 * EV Range Calculator — pure function logic.
 *
 * Given a car, origin/destination, and battery %, calculates:
 *  - Total route distance (km)
 *  - Charging stops needed
 *  - Estimated charging time
 *  - Cost estimate
 *
 * Uses stations.json data for nearby charging locations.
 */

import type { Station } from '@/lib/scoring';
import type { EvCarModel } from '@/data/car-models';
import { getChargingCost } from '@/lib/affiliate-links';

// ─── Public Types ───────────────────────────────────────────────

export interface ChargingStop {
  station: Station;
  distanceFromStartKm: number;
  chargeAddedKwh: number;
  chargeTimeMin: number;
  batteryBeforePct: number;
  batteryAfterPct: number;
  lat: number;
  lng: number;
}

export interface RangeResult {
  car: EvCarModel;
  origin: string;
  destination: string;
  batteryPct: number;
  /** Total route distance in km (great-circle with overland factor) */
  totalDistanceKm: number;
  /** Estimated driving range with current battery (km) */
  drivingRangeKm: number;
  /** Charging stops along the route */
  stops: ChargingStop[];
  /** Total estimated charging time in minutes */
  estimatedChargingTimeMin: number;
  /** Total kWh added at all stops */
  totalEnergyAddedKwh: number;
  /** Estimated total cost in USD */
  costEstimateUsd: number;
  /** Number of charging stops */
  stopCount: number;
  /** Whether the trip is feasible (has stations along route) */
  isFeasible: boolean;
  /** Error message if calculation failed */
  error?: string;
  /** Average cost per kWh used (USD) */
  avgCostPerKwh: number;
  /** Charging stops simplified for map display */
  stopLocations: Array<{ lat: number; lng: number; name: string; city: string }>;
}

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Simple Haversine distance between two lat/lng points (km).
 */
function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find city coordinates from station data.
 * Returns a rough lat/lng for any known city.
 */
const cityCoordsCache = new Map<string, { lat: number; lng: number }>();

function getCityCoordinates(city: string, stations: Station[]): { lat: number; lng: number } | null {
  const key = city.toLowerCase();
  if (cityCoordsCache.has(key)) return cityCoordsCache.get(key)!;

  // Find stations in this city
  const cityStations = stations.filter(s => s.city.toLowerCase() === key);
  if (cityStations.length > 0) {
    const avgLat = cityStations.reduce((sum, s) => sum + s.latitude, 0) / cityStations.length;
    const avgLng = cityStations.reduce((sum, s) => sum + s.longitude, 0) / cityStations.length;
    const coord = { lat: avgLat, lng: avgLng };
    cityCoordsCache.set(key, coord);
    return coord;
  }

  // Try partial match
  const partialStations = stations.filter(s => s.city.toLowerCase().includes(key));
  if (partialStations.length > 0) {
    const avgLat = partialStations.reduce((sum, s) => sum + s.latitude, 0) / partialStations.length;
    const avgLng = partialStations.reduce((sum, s) => sum + s.longitude, 0) / partialStations.length;
    const coord = { lat: avgLat, lng: avgLng };
    cityCoordsCache.set(key, coord);
    return coord;
  }

  return null;
}

/**
 * Overland distance factor. For short trips it's ~1.0 (straight roads),
 * for longer trips roads meander so we apply ~1.3x.
 */
function overlandFactor(distanceKm: number): number {
  if (distanceKm < 50) return 1.15;
  if (distanceKm < 200) return 1.25;
  if (distanceKm < 500) return 1.30;
  return 1.35;
}

/**
 * Find the best charging station near a point, from stations in a general corridor.
 */
function findNearestStation(
  lat: number,
  lng: number,
  stations: Station[],
  corridorKm = 30,
): Station | null {
  let best: Station | null = null;
  let bestDist = Infinity;

  for (const s of stations) {
    const dist = haversineKm(lat, lng, s.latitude, s.longitude);
    if (dist < corridorKm && dist < bestDist && s.isOperational) {
      bestDist = dist;
      best = s;
    }
  }

  return best;
}

// ─── Main Calculator ────────────────────────────────────────────

export interface CalculateRangeInput {
  car: EvCarModel;
  origin: string;
  destination: string;
  batteryPct: number;
  stations: Station[];
  /** Optionally set the target charge-after-stop % (default 80%) */
  targetChargePct?: number;
  /** Optionally set minimum arrival buffer % (default 10%) */
  arrivalBufferPct?: number;
}

/**
 * Calculate the full range/trip estimate.
 */
export function calculateRange(input: CalculateRangeInput): RangeResult {
  const { car, origin, destination, batteryPct, stations } = input;
  const targetChargePct = input.targetChargePct ?? 80;
  const arrivalBufferPct = input.arrivalBufferPct ?? 10;

  // 1. Find origin/destination coordinates
  const originCoord = getCityCoordinates(origin, stations);
  const destCoord = getCityCoordinates(destination, stations);

  if (!originCoord) {
    return {
      car,
      origin,
      destination,
      batteryPct,
      totalDistanceKm: 0,
      drivingRangeKm: 0,
      stops: [],
      estimatedChargingTimeMin: 0,
      totalEnergyAddedKwh: 0,
      costEstimateUsd: 0,
      stopCount: 0,
      isFeasible: false,
      error: `City "${origin}" not found in our station database. Try nearby major cities.`,
      avgCostPerKwh: 0,
      stopLocations: [],
    };
  }

  if (!destCoord) {
    return {
      car,
      origin,
      destination,
      batteryPct,
      totalDistanceKm: 0,
      drivingRangeKm: 0,
      stops: [],
      estimatedChargingTimeMin: 0,
      totalEnergyAddedKwh: 0,
      costEstimateUsd: 0,
      stopCount: 0,
      isFeasible: false,
      error: `City "${destination}" not found in our station database. Try nearby major cities.`,
      avgCostPerKwh: 0,
      stopLocations: [],
    };
  }

  // 2. Calculate total route distance (great-circle × overland factor)
  const greatCircleKm = haversineKm(
    originCoord.lat,
    originCoord.lng,
    destCoord.lat,
    destCoord.lng,
  );
  const totalDistanceKm = Math.round(greatCircleKm * overlandFactor(greatCircleKm));

  // 3. Calculate effective driving range
  // The car's usable battery capacity * efficiency = range at 100%
  const fullRangeKm = car.batteryKwh / (car.efficiencyWhKm / 1000);
  const currentUsableKwh = car.batteryKwh * (batteryPct / 100);
  const drivingRangeKm = Math.round(currentUsableKwh / (car.efficiencyWhKm / 1000));

  // 4. Determine if charging is needed
  if (drivingRangeKm >= totalDistanceKm) {
    // No charging stops needed!
    const avgCost = getChargingCostForCountry(stations, [origin, destination]);
    return {
      car,
      origin,
      destination,
      batteryPct,
      totalDistanceKm,
      drivingRangeKm,
      stops: [],
      estimatedChargingTimeMin: 0,
      totalEnergyAddedKwh: 0,
      costEstimateUsd: 0,
      stopCount: 0,
      isFeasible: true,
      avgCostPerKwh: avgCost,
      stopLocations: [],
    };
  }

  // 5. Need charging stops — plan them along the route
  // We simulate driving segments and finding stations along the way
  const stops: ChargingStop[] = [];
  let remainingDist = totalDistanceKm;
  let currentRange = drivingRangeKm;

  // Number of interpolation points along the route
  const numSegments = Math.max(10, Math.ceil(greatCircleKm / 50));
  let currentLat = originCoord.lat;
  let currentLng = originCoord.lng;
  let distanceTravelled = 0;

  // We need to figure out how many full charge cycles are needed
  // Each full charge from targetChargePct% (down to buffer) gives us:
  // range_per_charge = fullRangeKm * (targetChargePct - arrivalBufferPct) / 100
  const usableRangePerFullCharge = fullRangeKm * ((targetChargePct - arrivalBufferPct) / 100);

  // Start with initial battery
  let currentSegmentRange = drivingRangeKm;
  let chargeCyclesNeeded = 0;

  if (drivingRangeKm < totalDistanceKm) {
    const remainingAfterFirst = totalDistanceKm - drivingRangeKm;
    chargeCyclesNeeded = Math.ceil(remainingAfterFirst / usableRangePerFullCharge);
  }

  // Simulate the trip segment by segment, placing charging stops
  const latStep = (destCoord.lat - originCoord.lat) / numSegments;
  const lngStep = (destCoord.lng - originCoord.lng) / numSegments;

  let segmentRemainingRange = currentRange;
  let stopIndex = 0;

  // Collect stations that could be used along the route corridor
  const corridorStations = stations.filter(s => {
    if (!s.isOperational) return false;
    // Check if station is within the corridor between origin and destination
    const distToRoute = pointToLineDistance(
      s.latitude,
      s.longitude,
      originCoord.lat,
      originCoord.lng,
      destCoord.lat,
      destCoord.lng,
    );
    return distToRoute < 40; // within 40km of the route
  }).sort((a, b) => {
    const distA = haversineKm(originCoord.lat, originCoord.lng, a.latitude, a.longitude);
    const distB = haversineKm(originCoord.lat, originCoord.lng, b.latitude, b.longitude);
    return distA - distB;
  });

  // Distribution: place stops at roughly equal intervals
  if (chargeCyclesNeeded > 0 && corridorStations.length > 0) {
    const intervalKm = totalDistanceKm / (chargeCyclesNeeded + 1);
    const usedStationIds = new Set<string>();

    for (let i = 1; i <= chargeCyclesNeeded; i++) {
      const targetDistFromStart = intervalKm * i;
      const fraction = targetDistFromStart / totalDistanceKm;
      const pointLat = originCoord.lat + (destCoord.lat - originCoord.lat) * fraction;
      const pointLng = originCoord.lng + (destCoord.lng - originCoord.lng) * fraction;

      // Find nearest unused station to this point
      const station = corridorStations.find(s => {
        if (usedStationIds.has(s.id)) return false;
        const dist = haversineKm(pointLat, pointLng, s.latitude, s.longitude);
        return dist < 30;
      }) || corridorStations.find(s => {
        if (usedStationIds.has(s.id)) return false;
        return true;
      });

      if (station) {
        usedStationIds.add(station.id);
        const distFromStart = haversineKm(
          originCoord.lat,
          originCoord.lng,
          station.latitude,
          station.longitude,
        );
        const roundedDist = Math.round(distFromStart * overlandFactor(distFromStart));

        // Calculate charging stats
        const batteryBefore = arrivalBufferPct; // Assume we arrive near buffer
        const chargeAdded = car.batteryKwh * ((targetChargePct - batteryBefore) / 100);
        const effectiveChargeRate = Math.min(car.maxChargeKw, station.chargerSpeed);
        // Charging curve: average rate from batteryBefore% to targetChargePct%
        // Simplify: assume ~80% of peak rate for this curve portion
        const avgChargeRate = effectiveChargeRate * 0.8;
        const chargeTimeMin = Math.round((chargeAdded / avgChargeRate) * 60);

        stops.push({
          station,
          distanceFromStartKm: roundedDist,
          chargeAddedKwh: Math.round(chargeAdded * 10) / 10,
          chargeTimeMin,
          batteryBeforePct: Math.round(batteryBefore),
          batteryAfterPct: targetChargePct,
          lat: station.latitude,
          lng: station.longitude,
        });
      }
    }
  }

  // Calculate total energy added and time
  const totalEnergyAddedKwh = stops.reduce((sum, s) => sum + s.chargeAddedKwh, 0);
  const totalChargeTimeMin = stops.reduce((sum, s) => sum + s.chargeTimeMin, 0);

  // Cost estimate: use average of origin/destination country cost
  const avgCostPerKwh = getChargingCostForCountry(stations, [origin, destination]);
  const costEstimateUsd = Math.round(totalEnergyAddedKwh * avgCostPerKwh * 100) / 100;

  const stopLocations = stops.map(s => ({
    lat: s.lat,
    lng: s.lng,
    name: s.station.name,
    city: s.station.city,
  }));

  return {
    car,
    origin,
    destination,
    batteryPct,
    totalDistanceKm,
    drivingRangeKm,
    stops,
    estimatedChargingTimeMin: totalChargeTimeMin,
    totalEnergyAddedKwh,
    costEstimateUsd,
    stopCount: stops.length,
    isFeasible: true,
    avgCostPerKwh,
    stopLocations,
  };
}

/**
 * Get the average charging cost per kWh for the countries involved.
 */
function getChargingCostForCountry(stations: Station[], cities: string[]): number {
  // Find countries for given cities
  const countries = new Set<string>();
  for (const city of cities) {
    const q = city.toLowerCase();
    for (const s of stations) {
      if (s.city.toLowerCase().includes(q) || s.city.toLowerCase() === q) {
        countries.add(s.country);
        break;
      }
    }
  }

  if (countries.size === 0) return 0.15; // default fallback

  let totalCost = 0;
  let count = 0;
  for (const country of countries) {
    const cost = getChargingCost(country);
    if (cost) {
      totalCost += cost.costPerKwh;
      count++;
    }
  }

  return count > 0 ? totalCost / count : 0.15;
}

/**
 * Distance from a point to a line segment (great-circle simplification).
 */
function pointToLineDistance(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) return haversineKm(px, py, ax, ay);

  let t = ((px - ax) * dx + (py - ay) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));

  const closestX = ax + t * dx;
  const closestY = ay + t * dy;

  // Convert back to lat/lng distance (approximate)
  const latDist = (closestX - px) * 111.32; // deg to km
  const lngDist = (closestY - py) * 111.32 * Math.cos(((px + closestX) / 2) * Math.PI / 180);

  return Math.sqrt(latDist * latDist + lngDist * lngDist);
}

/**
 * Extract unique city names from station data, sorted alphabetically.
 */
export function getCityNamesFromStations(stations: Station[]): string[] {
  const cities = new Set<string>();
  for (const s of stations) {
    cities.add(s.city);
  }
  return Array.from(cities).sort();
}

/**
 * Search cities by prefix for autocomplete.
 */
export function searchCities(query: string, stations: Station[]): string[] {
  const q = query.toLowerCase();
  const seen = new Set<string>();
  const results: string[] = [];

  for (const s of stations) {
    const city = s.city;
    if (seen.has(city)) continue;
    if (city.toLowerCase().includes(q)) {
      results.push(city);
      seen.add(city);
    }
  }

  return results.slice(0, 20);
}
