import fs from 'fs';
import path from 'path';
import { Station } from './scoring';

export interface MetaData {
  totalStations: number;
  cities: string[];
  countries: string[];
}

export function getMeta(): MetaData {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const all: Station[] = JSON.parse(raw);

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

export function getAllStations(): Station[] {
  const filePath = path.join(process.cwd(), 'data', 'stations.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

export function getStationById(id: string): Station | null {
  const stations = getAllStations();
  return stations.find(s => s.id === id) || null;
}
