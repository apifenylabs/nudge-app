import activitiesData from '../data/activities.json';

export interface KidActivity {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  ageRange: string;
  ageBuckets: string[];
  safetyRating: number;
  description: string;
  city: string;
  country: string;
  region: string;
  location: string;
  bestTime: string;
  priceRange: string;
  sessionDuration: string;
  amenities: string[];
  safetyFeatures: string[];
  seoKeywords: string[];
  imageUrl: string;
  popularity: number;
  rating: number;
  reviewCount: number;
  affiliateLinks: {
    klook: string | null;
    tripcom: string | null;
  };
}

export type AgeBucket = 'baby' | 'toddler' | 'preschool' | 'elementary' | 'teen';
export type PriceRange = '$' | '$$' | '$$$';

const AGE_BUCKET_LABELS: Record<AgeBucket, string> = {
  baby: '0-1 yrs',
  toddler: '2-3 yrs',
  preschool: '4-6 yrs',
  elementary: '7-12 yrs',
  teen: '13-17 yrs',
};

const AGE_BUCKET_ORDER: AgeBucket[] = ['baby', 'toddler', 'preschool', 'elementary', 'teen'];

export function getAllActivities(): KidActivity[] {
  return activitiesData as KidActivity[];
}

export function getActivityById(id: string): KidActivity | undefined {
  return activitiesData.find((a: any) => a.id === id) as KidActivity | undefined;
}

export function getActivitiesByCity(city: string): KidActivity[] {
  return activitiesData.filter((a: any) => a.city.toLowerCase() === city.toLowerCase()) as KidActivity[];
}

export function getActivitiesByAgeBucket(bucket: AgeBucket): KidActivity[] {
  return activitiesData.filter((a: any) => a.ageBuckets.includes(bucket)) as KidActivity[];
}

export function getActivitiesByCategory(category: string): KidActivity[] {
  return activitiesData.filter((a: any) => a.category.toLowerCase() === category.toLowerCase()) as KidActivity[];
}

export function getCategories(): string[] {
  const cats = new Set(activitiesData.map((a: any) => a.category));
  return Array.from(cats).sort();
}

export function getSubCategories(): string[] {
  const cats = new Set(activitiesData.map((a: any) => a.subCategory));
  return Array.from(cats).sort();
}

export function getCities(): { city: string; country: string; count: number }[] {
  const cityMap = new Map<string, { city: string; country: string; count: number }>();
  activitiesData.forEach((a: any) => {
    const key = a.city;
    if (cityMap.has(key)) {
      cityMap.get(key)!.count++;
    } else {
      cityMap.set(key, { city: a.city, country: a.country, count: 1 });
    }
  });
  return Array.from(cityMap.values()).sort((a, b) => b.count - a.count);
}

export function getRegions(): string[] {
  const regions = new Set(activitiesData.map((a: any) => a.region));
  return Array.from(regions).sort();
}

export function getTopActivities(limit: number = 10): KidActivity[] {
  return [...activitiesData]
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, limit) as KidActivity[];
}

export function filterActivities(params: {
  ageBucket?: string;
  category?: string;
  city?: string;
  priceRange?: string;
  region?: string;
  maxPrice?: string;
  sortBy?: 'popularity' | 'rating' | 'name';
}): KidActivity[] {
  let results = activitiesData as KidActivity[];

  if (params.ageBucket) {
    results = results.filter(a => a.ageBuckets.includes(params.ageBucket!));
  }
  if (params.category) {
    results = results.filter(a => a.category === params.category);
  }
  if (params.city) {
    results = results.filter(a => a.city.toLowerCase() === params.city.toLowerCase());
  }
  if (params.region) {
    results = results.filter(a => a.region === params.region);
  }
  if (params.priceRange) {
    results = results.filter(a => a.priceRange === params.priceRange);
  }

  if (params.sortBy === 'popularity') {
    results.sort((a, b) => b.popularity - a.popularity);
  } else if (params.sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (params.sortBy === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

export { AGE_BUCKET_LABELS, AGE_BUCKET_ORDER };
export type { AgeBucket as AgeBucketType };
