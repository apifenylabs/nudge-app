import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://llnflvnjinavbtqadgyu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbmZsdm5qaW5hdmJ0cWFkZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2OTM4MTUsImV4cCI6MjA5MjI2OTgxNX0.xnn7-x8rV2cluETN-3eDI2yhuxMzcnTraBKmwbW1qJw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface DatabaseBusiness {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  family_friendly_score: number;
  created_at: string;
  updated_at: string;
  age_range?: string;
  amenities?: string[];
  price_range?: string;
  best_time?: string;
  popularity?: number;
  image_url?: string;
  affiliate_links?: Record<string, string>;
  commission_rate?: string;
}

// Convert database business to frontend business
export function dbToBusiness(db: DatabaseBusiness): any {
  return {
    id: parseInt(db.id.split('-')[0], 16) || 0, // Simple hash for demo
    name: db.name,
    description: db.description,
    location: db.location,
    ageRange: db.age_range || 'All ages',
    safetyRating: db.family_friendly_score,
    amenities: db.amenities || [],
    category: db.category,
    imageUrl: db.image_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    priceRange: db.price_range || '$$',
    bestTime: db.best_time || 'Year-round',
    popularity: db.popularity || 50,
    affiliateLinks: db.affiliate_links || {},
    commissionRate: db.commission_rate || '5%'
  };
}

// Fetch businesses from Supabase
export async function fetchBusinesses() {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('family_friendly_score', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }

    return data.map(dbToBusiness);
  } catch (error) {
    console.error('Error in fetchBusinesses:', error);
    return [];
  }
}

// Insert a new business
export async function insertBusiness(business: Omit<DatabaseBusiness, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .insert([business])
      .select()
      .single();

    if (error) {
      console.error('Error inserting business:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in insertBusiness:', error);
    return null;
  }
}