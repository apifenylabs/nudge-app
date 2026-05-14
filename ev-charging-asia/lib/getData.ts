/**
 * Data loader for EV Charging Asia.
 * Imports JSON directly (bundled by Next.js at build time) instead of
 * using fs.readFile which fails on Vercel serverless.
 */
import stationsData from '@/data/stations.json';
import type { Station } from './scoring';

export interface MetaData {
  totalStations: number;
  cities: string[];
  countries: string[];
}

/** All stations — direct import, no fs */
export function getAllStations(): Station[] {
  return stationsData as Station[];
}

export function getStationById(id: string): Station | null {
  return (stationsData as Station[]).find(s => s.id === id) || null;
}

export function getMeta(): MetaData {
  const all = stationsData as Station[];

  const seenCities = new Set<string>();
  const cities = all.filter(d => {
    const key = d.city?.toLowerCase();
    if (!key || seenCities.has(key)) return false;
    seenCities.add(key);
    return true;
  }).map(d => d.city);

  const seenCountries = new Set<string>();
  const countries = all.filter(d => {
    const key = d.country?.toLowerCase();
    if (!key || seenCountries.has(key)) return false;
    seenCountries.add(key);
    return true;
  }).map(d => d.country);

  return { totalStations: all.length, cities, countries };
}

/** Lightweight station subset for homepage (avoids serializing 1,125 stations to client) */
export function getHomepageData() {
  const all = stationsData as Station[];
  return {
    totalStations: all.length,
    totalCities: new Set(all.map(s => s.city)).size,
    totalCountries: new Set(all.map(s => s.country)).size,
    // Just return top stations by popularity/city count for featured display
    featuredStations: all
      .filter(s => s.popularity && s.popularity > 60)
      .slice(0, 12)
      .map(s => ({
        id: s.id,
        name: s.name,
        city: s.city,
        country: s.country,
        rating: s.rating,
        popularity: s.popularity,
        ratingCount: s.ratingCount,
        chargerTypes: s.chargerTypes?.slice(0, 3) || [],
        connectorTypes: s.connectorTypes?.slice(0, 3) || [],
      })),
    popularCities: [...new Set(all.filter(s => s.popularity && s.popularity > 50).map(s => s.city))].slice(0, 20),
  };
}
