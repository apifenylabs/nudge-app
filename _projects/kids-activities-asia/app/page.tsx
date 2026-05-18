import Link from 'next/link';
import { getTopActivities, getCategories, getCities, AGE_BUCKET_LABELS, AGE_BUCKET_ORDER } from '@/lib/getData';

export const dynamic = 'force-static';

export default function HomePage() {
  const topActivities = getTopActivities(6);
  const categories = getCategories();
  const cities = getCities();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Best Kids&apos; Activities in Asia
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Curated, parent-approved activities, classes, and attractions for kids of all ages across Asia. 
          Filter by age, city, or activity type — everything in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/search" className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
            Browse All Activities
          </Link>
          <Link href="/search?sortBy=rating" className="bg-white text-orange-500 border-2 border-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
            Top Rated
          </Link>
        </div>
      </section>

      {/* Age Buckets */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find by Age</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {AGE_BUCKET_ORDER.map(bucket => (
            <Link
              key={bucket}
              href={`/search?ageBucket=${bucket}`}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow group"
            >
              <span className="text-3xl block mb-1">
                {bucket === 'baby' ? '👶' : bucket === 'toddler' ? '🧒' : bucket === 'preschool' ? '🎨' : bucket === 'elementary' ? '🎮' : '🎯'}
              </span>
              <span className="font-semibold text-gray-800 group-hover:text-orange-500">
                {AGE_BUCKET_LABELS[bucket]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Activities */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Activities</h2>
          <Link href="/search" className="text-orange-500 hover:text-orange-600 font-medium text-sm">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topActivities.map(activity => (
            <Link
              key={activity.id}
              href={`/activity/${activity.id}`}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-40 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center text-5xl">
                {activity.category === 'Theme Park' ? '🎢' : 
                 activity.category === 'Educational' ? '📚' : 
                 activity.category === 'Sports & Fitness' ? '⚽' : 
                 activity.category === 'Zoo & Animals' ? '🦁' : 
                 activity.category === 'Outdoors & Nature' ? '🌿' : '🎪'}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{activity.category}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{activity.ageRange} yrs</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">{activity.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{activity.city}, {activity.country}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">⭐ {activity.rating}</span>
                  <span>•</span>
                  <span>{activity.priceRange}</span>
                  <span>•</span>
                  <span>{activity.sessionDuration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => (
            <Link
              key={category}
              href={`/search?category=${encodeURIComponent(category)}`}
              className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-orange-50 hover:border-orange-200 transition-colors text-center"
            >
              <span className="font-medium text-gray-800">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by City */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by City</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cities.map(city => (
            <Link
              key={city.city}
              href={`/search?city=${encodeURIComponent(city.city)}`}
              className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <span className="font-medium text-gray-800">{city.city}, {city.country}</span>
              <span className="text-sm text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{city.count} activities</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
