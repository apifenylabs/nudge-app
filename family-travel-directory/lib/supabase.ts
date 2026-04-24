import { createClient } from '@supabase/supabase-js';

// ─── Client Setup ──────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars not set. Expected NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Falling back to demo defaults.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://llnflvnjinavbtqadgyu.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbmZsdm5qaW5hdmJ0cWFkZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2OTM4MTUsImV4cCI6MjA5MjI2OTgxNX0.xnn7-x8rV2cluETN-3eDI2yhuxMzcnTraBKmwbW1qJw'
);

// ─── Types ──────────────────────────────────────────────────────
export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  description: string;
  age_range: string;
  safety_rating: number;
  price_range: string;
  popularity: number;
  location: string;
  best_time: string;
  image_url: string | null;
  amenities: string[];
  safety_features: string[];
  tips_and_tricks: string[];
  gallery: string[];
  commission_rate: string;
  seo_keywords: string[];
  metadata: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

// ─── Query Functions ────────────────────────────────────────────

/**
 * Fetch all destinations with optional filters.
 * Mirrors the JSON-based filtering in page.tsx but runs server-side via Supabase.
 */
export async function getAllDestinations(filters?: {
  city?: string;
  category?: string;
  search?: string;
  sortBy?: 'popularity' | 'safety' | 'price';
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('destinations')
    .select('*');

  if (filters?.city && filters.city !== 'All') {
    query = query.ilike('city', filters.city);
  }

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  if (filters?.search) {
    const q = filters.search;
    query = query.or(
      `name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`
    );
  }

  // Sort
  if (filters?.sortBy === 'safety') {
    query = query.order('safety_rating', { ascending: false });
  } else if (filters?.sortBy === 'price') {
    query = query.order('price_range', { ascending: true });
  } else {
    query = query.order('popularity', { ascending: false });
  }

  // Pagination
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    const to = filters.offset + (filters.limit || 20) - 1;
    query = query.range(filters.offset, to);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }

  return data as Destination[];
}

/**
 * Fetch a single destination by its ID (e.g. "tokyo-001").
 */
export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', slug)
    .single();

  if (error) {
    console.error(`Error fetching destination "${slug}":`, error);
    return null;
  }

  return data as Destination;
}

/**
 * Fetch distinct cities from the destinations table.
 */
export async function getCities() {
  const { data, error } = await supabase
    .from('destinations')
    .select('city', { count: 'exact', head: false })
    .order('city');

  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

  // Deduplicate cities (Supabase returns all rows, not distinct)
  const cities = new Set<string>();
  for (const row of data) {
    if (row.city) cities.add(row.city);
  }

  return Array.from(cities).sort();
}

/**
 * Fetch distinct categories from the destinations table.
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('destinations')
    .select('category', { count: 'exact', head: false })
    .order('category');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = new Set<string>();
  for (const row of data) {
    if (row.category) categories.add(row.category);
  }

  return Array.from(categories).sort();
}

/**
 * Get total count of destinations (for stats).
 */
export async function getDestinationCount() {
  const { count, error } = await supabase
    .from('destinations')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting destinations:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Check if Supabase is configured (has valid env vars).
 */
export function isSupabaseConfigured() {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('mock')
  );
}
