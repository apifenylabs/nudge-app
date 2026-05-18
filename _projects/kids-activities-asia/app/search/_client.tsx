'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { filterActivities, getCategories, getCities, AGE_BUCKET_LABELS, AGE_BUCKET_ORDER } from '@/lib/getData';
import type { KidActivity } from '@/lib/getData';

function ActivityCard({ activity }: { activity: KidActivity }) {
  const icon = activity.category === 'Theme Park' ? '🎢' : 
    activity.category === 'Educational' ? '📚' : 
    activity.category === 'Sports & Fitness' ? '⚽' : 
    activity.category === 'Zoo & Animals' ? '🦁' : 
    activity.category === 'Outdoors & Nature' ? '🌿' : '🎪';

  return (
    <Link
      href={`/activity/${activity.id}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="h-32 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center text-4xl">
        {icon}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{activity.category}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{activity.ageRange} yrs</span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">{activity.name}</h3>
        <p className="text-sm text-gray-500">{activity.city}, {activity.country}</p>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <span>⭐ {activity.rating}</span>
          <span>•</span>
          <span>{activity.priceRange}</span>
          <span>•</span>
          <span>{activity.sessionDuration}</span>
        </div>
      </div>
    </Link>
  );
}

export default function SearchPageClient() {
  const [results, setResults] = useState<KidActivity[]>([]);
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getCategories();
  const cities = getCities();

  const doFilter = useCallback(() => {
    let filtered = filterActivities({
      ageBucket: selectedAge || undefined,
      category: selectedCategory || undefined,
      city: selectedCity || undefined,
      sortBy: sortBy as 'popularity' | 'rating' | 'name',
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }

    setResults(filtered);
  }, [selectedAge, selectedCategory, selectedCity, sortBy, searchQuery]);

  useEffect(() => { doFilter(); }, [doFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Activities</h1>
        <p className="text-gray-500 mt-1">{results.length} activities found</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search activities, cities, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="">All Ages</option>
          {AGE_BUCKET_ORDER.map(b => (
            <option key={b} value={b}>{AGE_BUCKET_LABELS[b]}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="">All Cities</option>
          {cities.map(c => (
            <option key={c.city} value={c.city}>{c.city}, {c.country}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <option value="popularity">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Alphabetical</option>
        </select>

        {(selectedAge || selectedCategory || selectedCity || searchQuery) && (
          <button
            onClick={() => { setSelectedAge(''); setSelectedCategory(''); setSelectedCity(''); setSearchQuery(''); setSortBy('popularity'); }}
            className="text-sm text-red-500 hover:text-red-600 px-3 py-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No activities match your filters. Try adjusting your search.
        </div>
      )}
    </div>
  );
}
