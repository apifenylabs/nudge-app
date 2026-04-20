// Mock Supabase client for development
// Replace with real Supabase client when credentials available

export interface Business {
  id: string;
  name: string;
  description: string;
  location: string;
  age_range: string;
  safety_rating: number;
  amenities: string[];
  category: string;
  image_url: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// Mock data
const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Disneyland Paris',
    description: 'Magical theme park perfect for all ages with family-friendly rides and shows.',
    location: 'Paris, France',
    age_range: '3+',
    safety_rating: 5,
    amenities: ['Changing rooms', 'Stroller rental', 'Kid menus', 'First aid', 'Baby care centers'],
    category: 'Theme Park',
    image_url: 'https://images.unsplash.com/photo-1545580492-8859ba8323f0?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '2',
    name: 'Natural History Museum London',
    description: 'Interactive exhibits and dinosaur skeletons that captivate children of all ages.',
    location: 'London, UK',
    age_range: 'All ages',
    safety_rating: 5,
    amenities: ['Baby changing', 'Family bathrooms', 'Café', 'Gift shop', 'Cloakroom'],
    category: 'Museum',
    image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '3',
    name: 'Jardin du Luxembourg',
    description: 'Beautiful gardens with playgrounds, puppet shows, and pony rides for young children.',
    location: 'Paris, France',
    age_range: '0-12',
    safety_rating: 4,
    amenities: ['Playground', 'Pony rides', 'Puppet theater', 'Picnic areas', 'Boat rental'],
    category: 'Park',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '4',
    name: 'London Zoo',
    description: 'World-class zoo with interactive animal experiences and family-friendly facilities.',
    location: 'London, UK',
    age_range: 'All ages',
    safety_rating: 5,
    amenities: ['Baby changing', 'Stroller access', 'Feeding rooms', 'First aid', 'Animal encounters'],
    category: 'Zoo',
    image_url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '5',
    name: 'Eiffel Tower',
    description: 'Iconic landmark with family-friendly tours and breathtaking views of Paris.',
    location: 'Paris, France',
    age_range: '6+',
    safety_rating: 5,
    amenities: ['Elevators', 'Guided tours', 'Souvenir shop', 'Restaurant', 'Viewing decks'],
    category: 'Landmark',
    image_url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '6',
    name: 'Tower of London',
    description: 'Historic castle with Crown Jewels and engaging tours for families.',
    location: 'London, UK',
    age_range: '8+',
    safety_rating: 4,
    amenities: ['Audio guides', 'Family tours', 'Gift shop', 'Café', 'Historic exhibits'],
    category: 'Historic Site',
    image_url: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '7',
    name: 'Parc de la Villette',
    description: 'Large cultural park with science museum, concert halls, and playgrounds.',
    location: 'Paris, France',
    age_range: 'All ages',
    safety_rating: 4,
    amenities: ['Playgrounds', 'Science museum', 'Concert halls', 'Picnic areas', 'Bike rental'],
    category: 'Park',
    image_url: 'https://images.unsplash.com/photo-1575373263475-8e61d7daee4c?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '8',
    name: 'Science Museum London',
    description: 'Interactive science exhibits and hands-on activities for curious minds.',
    location: 'London, UK',
    age_range: '5+',
    safety_rating: 5,
    amenities: ['Interactive exhibits', 'Workshops', 'Café', 'Gift shop', 'IMAX cinema'],
    category: 'Museum',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '9',
    name: 'Aquarium de Paris',
    description: 'Underwater world with sharks, jellyfish, and interactive touch pools.',
    location: 'Paris, France',
    age_range: 'All ages',
    safety_rating: 5,
    amenities: ['Touch pools', 'Feeding shows', 'Gift shop', 'Café', 'Educational programs'],
    category: 'Aquarium',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  },
  {
    id: '10',
    name: 'Madame Tussauds London',
    description: 'Wax museum with celebrity figures and interactive experiences.',
    location: 'London, UK',
    age_range: '6+',
    safety_rating: 4,
    amenities: ['Photo opportunities', 'Interactive exhibits', 'Gift shop', 'Café', 'Marvel zone'],
    category: 'Museum',
    image_url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop',
    created_at: '2026-04-18T10:00:00Z'
  }
];

const mockCategories: Category[] = [
  { id: '1', name: 'Theme Parks', icon: '🎢', description: 'Amusement and theme parks' },
  { id: '2', name: 'Museums', icon: '🏛️', description: 'Educational and cultural museums' },
  { id: '3', name: 'Parks', icon: '🌳', description: 'Public parks and gardens' },
  { id: '4', name: 'Zoos', icon: '🦁', description: 'Zoos and aquariums' },
  { id: '5', name: 'Restaurants', icon: '🍽️', description: 'Family-friendly dining' },
  { id: '6', name: 'Hotels', icon: '🏨', description: 'Family accommodation' },
  { id: '7', name: 'Activities', icon: '🎨', description: 'Classes and workshops' },
  { id: '8', name: 'Landmarks', icon: '🗼', description: 'Iconic tourist sites' }
];

// Mock Supabase client
export const supabase = {
  from: (table: string) => {
    return {
      select: (columns = '*') => {
        return {
          eq: (column: string, value: any) => {
            return {
              data: table === 'businesses' 
                ? mockBusinesses.filter(b => (b as any)[column] === value)
                : table === 'categories'
                ? mockCategories.filter(c => (c as any)[column] === value)
                : [],
              error: null
            };
          },
          in: (column: string, values: any[]) => {
            return {
              data: table === 'businesses'
                ? mockBusinesses.filter(b => values.includes((b as any)[column]))
                : [],
              error: null
            };
          },
          ilike: (column: string, pattern: string) => {
            const searchTerm = pattern.replace('%', '').toLowerCase();
            return {
              data: table === 'businesses'
                ? mockBusinesses.filter(b => 
                    b.name.toLowerCase().includes(searchTerm) ||
                    b.description.toLowerCase().includes(searchTerm) ||
                    b.location.toLowerCase().includes(searchTerm)
                  )
                : [],
              error: null
            };
          },
          data: table === 'businesses' ? mockBusinesses : 
                table === 'categories' ? mockCategories : [],
          error: null
        };
      },
      insert: (data: any) => {
        console.log('Mock insert:', data);
        return { data: [{ id: Date.now().toString(), ...data }], error: null };
      },
      update: (data: any) => {
        console.log('Mock update:', data);
        return { data: [data], error: null };
      },
      delete: () => {
        console.log('Mock delete');
        return { data: [], error: null };
      }
    };
  },
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null })
  }
};

// Helper functions
export async function getBusinesses(filters?: {
  location?: string;
  category?: string;
  ageRange?: string;
  search?: string;
}) {
  let businesses = mockBusinesses;
  
  if (filters?.location) {
    businesses = businesses.filter(b => b.location === filters.location);
  }
  
  if (filters?.category) {
    businesses = businesses.filter(b => b.category === filters.category);
  }
  
  if (filters?.ageRange) {
    businesses = businesses.filter(b => {
      if (filters.ageRange === 'all-ages') return true;
      if (filters.ageRange === '0-2') return b.age_range === '0-2' || b.age_range === 'All ages';
      if (filters.ageRange === '3-5') return b.age_range === '3-5' || b.age_range === 'All ages';
      if (filters.ageRange === '6-12') return b.age_range === '6-12' || b.age_range === 'All ages';
      if (filters.ageRange === '13-17') return b.age_range === '13-17' || b.age_range === 'All ages';
      return b.age_range === filters.ageRange;
    });
  }
  
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    businesses = businesses.filter(b => 
      b.name.toLowerCase().includes(searchTerm) ||
      b.description.toLowerCase().includes(searchTerm) ||
      b.location.toLowerCase().includes(searchTerm)
    );
  }
  
  return { data: businesses, error: null };
}

export async function getBusinessById(id: string) {
  const business = mockBusinesses.find(b => b.id === id);
  return { data: business, error: business ? null : new Error('Business not found') };
}

export async function getCategories() {
  return { data: mockCategories, error: null };
}

export async function addBusinessReview(businessId: string, review: {
  rating: number;
  comment: string;
  userId: string;
}) {
  console.log('Mock review added:', { businessId, review });
  return { data: { id: Date.now().toString(), ...review }, error: null };
}