import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import BusinessListingCard from '@/components/BusinessListingCard';
import SimpleMapContainer from '@/components/SimpleMapContainer';
import { getBusinesses, getCategories } from '@/lib/supabase';

// Fetch businesses from Supabase (mock for now)
async function fetchBusinesses() {
  const { data: businesses, error } = await getBusinesses();
  if (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
  return businesses;
}

async function fetchCategories() {
  const { data: categories, error } = await getCategories();
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return categories;
}

export default async function Home() {
  const businesses = await fetchBusinesses();
  const categories = await fetchCategories();
  
  // Transform for BusinessListingCard component
  const transformedBusinesses = businesses.map(business => ({
    id: parseInt(business.id),
    name: business.name,
    description: business.description,
    location: business.location,
    ageRange: business.age_range,
    safetyRating: business.safety_rating,
    amenities: business.amenities,
    category: business.category,
    imageUrl: business.image_url
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Family-Friendly Places
          </h1>
          <p className="text-gray-600">
            Discover safe, age-appropriate activities and destinations for your family
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Filters */}
          <div className="lg:w-1/4">
            <SearchBar />
            <FilterSidebar />
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {transformedBusinesses.map((business) => (
                <BusinessListingCard key={business.id} business={business} />
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Family-Friendly Locations</h2>
              <SimpleMapContainer businesses={transformedBusinesses} />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Family Travel Directory?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">👶</div>
              <h3 className="font-bold text-lg mb-2">Age-Appropriate</h3>
              <p className="text-gray-600">Filter by age range to find perfect activities for your children</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-bold text-lg mb-2">Safety Rated</h3>
              <p className="text-gray-600">All locations reviewed for family safety and amenities</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-bold text-lg mb-2">Easy Planning</h3>
              <p className="text-gray-600">Plan your family trips with integrated maps and schedules</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Family Travel Directory &copy; {new Date().getFullYear()}</p>
          <p className="text-gray-400">Making family travel planning safe and simple</p>
        </div>
      </footer>
    </div>
  );
}