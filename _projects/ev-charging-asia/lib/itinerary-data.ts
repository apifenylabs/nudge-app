/**
 * Itinerary companion data loader.
 * Loads JSON station/route data files from data/itinerary/ directory.
 * These provide supplemental details shown alongside the main itinerary data.
 */

import fs from 'fs';
import path from 'path';

export interface CompanionRouteDay {
  day: number;
  from: string;
  to: string;
  distance: string;
  drivingTime: string;
  charger: string;
  kidActivities: string;
}

export interface CompanionRouteData {
  slug: string;
  title: string;
  subtitle: string;
  route: CompanionRouteDay[];
  totalDistance: string;
  totalChargingCost: string;
  bestFor: string;
  carRecommendations: string[];
  tips: string[];
  chargerTypes: string[];
  seasonal: string;
}

const COMPANION_DIR = path.join(process.cwd(), 'data', 'itinerary');

/** Get companion data for a route slug — returns null if file doesn't exist */
export function getCompanionData(slug: string): CompanionRouteData | null {
  try {
    const filePath = path.join(COMPANION_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as CompanionRouteData;
  } catch {
    return null;
  }
}

/** Get all available companion data */
export function getAllCompanionData(): CompanionRouteData[] {
  try {
    if (!fs.existsSync(COMPANION_DIR)) return [];
    const files = fs.readdirSync(COMPANION_DIR).filter(f => f.endsWith('.json'));
    return files
      .map(f => {
        try {
          const raw = fs.readFileSync(path.join(COMPANION_DIR, f), 'utf-8');
          return JSON.parse(raw) as CompanionRouteData;
        } catch {
          return null;
        }
      })
      .filter((d): d is CompanionRouteData => d !== null);
  } catch {
    return [];
  }
}

/** Get car recommendations for a given slug */
export function getCarRecommendations(slug: string): string[] {
  const data = getCompanionData(slug);
  return data?.carRecommendations ?? [];
}
