// Production Supabase client for Directory Beast
// This will use real credentials when deployed

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Types for TypeScript
export type Business = Database['public']['Tables']['businesses']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Business queries
export async function getBusinesses(filters?: {
  location?: string;
  category?: string;
  ageRange?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.location) {
    query = query.eq('location', filters.location);
  }

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.ageRange && filters.ageRange !== 'all-ages') {
    query = query.eq('age_range', filters.ageRange);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  return await query;
}

export async function getBusinessById(id: string) {
  return await supabase
    .from('businesses')
    .select('*, reviews(*)')
    .eq('id', id)
    .single();
}

export async function getBusinessesByLocation(location: string) {
  return await supabase
    .from('businesses')
    .select('*')
    .eq('location', location)
    .order('safety_rating', { ascending: false });
}

export async function getCategories() {
  return await supabase
    .from('categories')
    .select('*')
    .order('name');
}

export async function getBusinessCount() {
  const { count, error } = await supabase
    .from('businesses')
    .select('*', { count: 'exact', head: true });
  
  return { count, error };
}

export async function addBusinessReview(businessId: string, review: {
  rating: number;
  comment: string;
  userId?: string;
}) {
  // Mock implementation for now
  console.log('Mock review added:', { businessId, review });
  return { data: { id: Date.now().toString(), ...review }, error: null };
}

export async function getBusinessReviews(businessId: string) {
  return await supabase
    .from('reviews')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
}

// Search with multiple criteria
export async function searchBusinesses(options: {
  query?: string;
  location?: string;
  category?: string;
  ageRange?: string;
  minSafetyRating?: number;
  amenities?: string[];
}) {
  let query = supabase.from('businesses').select('*');

  if (options.query) {
    query = query.or(`name.ilike.%${options.query}%,description.ilike.%${options.query}%`);
  }

  if (options.location) {
    query = query.eq('location', options.location);
  }

  if (options.category) {
    query = query.eq('category', options.category);
  }

  if (options.ageRange && options.ageRange !== 'all-ages') {
    query = query.eq('age_range', options.ageRange);
  }

  if (options.minSafetyRating) {
    query = query.gte('safety_rating', options.minSafetyRating);
  }

  if (options.amenities && options.amenities.length > 0) {
    // Supabase array contains
    query = query.contains('amenities', options.amenities);
  }

  return await query.order('safety_rating', { ascending: false });
}

// Statistics
export async function getLocationStats() {
  // Mock implementation for now
  const mockStats = {
    'Paris, France': 5,
    'London, UK': 5
  };
  return { data: mockStats, error: null };
}

export async function getCategoryStats() {
  // Mock implementation for now
  const mockStats = {
    'Theme Park': 1,
    'Museum': 3,
    'Park': 2,
    'Zoo': 1,
    'Landmark': 1,
    'Historic Site': 1,
    'Aquarium': 1
  };
  return { data: mockStats, error: null };
}

// Fallback to mock data if Supabase not configured
export function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
         !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock');
}