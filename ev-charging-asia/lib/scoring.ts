export interface Station {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  chargerTypes: string[];
  chargerCount: number;
  chargerSpeed: number;
  reliability: number;
  locationConvenience: number;
  isOperational: boolean;
  hasRestroomNearby: boolean;
  hasFoodNearby: boolean;
  hasCoveredParking: boolean;
  has24by7Access: boolean;
  isMallParking: boolean;
  paymentMethods: string[];
  operator: string;
  description: string;
  seoKeywords: string[];
  phone: string | null;
  website: string | null;
}

export function computeStationScore(station: Station): number {
  const speedScore = Math.min(station.chargerSpeed / 250, 1) * 0.3;
  const reliabilityScore = (station.reliability / 5) * 0.3;
  const locationScore = (station.locationConvenience / 5) * 0.2;
  const amenityScore = computeAmenityScore(station) * 0.2;
  return Math.round((speedScore + reliabilityScore + locationScore + amenityScore) * 100);
}

function computeAmenityScore(station: Station): number {
  let score = 0;
  if (station.hasRestroomNearby) score += 0.25;
  if (station.hasFoodNearby) score += 0.25;
  if (station.hasCoveredParking) score += 0.2;
  if (station.has24by7Access) score += 0.15;
  if (station.isMallParking) score += 0.15;
  return score;
}

export function scoreTier(overall: number): { label: string; color: string } {
  if (overall >= 85) return { label: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (overall >= 70) return { label: 'Great', color: 'text-sky-600 bg-sky-50 border-sky-200' };
  if (overall >= 55) return { label: 'Good', color: 'text-amber-600 bg-amber-50 border-amber-200' };
  return { label: 'Average', color: 'text-gray-600 bg-gray-50 border-gray-200' };
}

export function computeSimpleScore(
  reliability: number,
  chargerSpeed: number,
  amenitiesCount: number
): number {
  const relPart = (reliability / 5) * 40;
  const speedPart = Math.min(chargerSpeed / 250, 1) * 35;
  const amenPart = Math.min(amenitiesCount / 5, 1) * 25;
  return Math.round(relPart + speedPart + amenPart);
}
