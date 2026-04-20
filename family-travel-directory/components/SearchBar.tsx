'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Will integrate with Supabase search
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <Search className="absolute left-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search destinations, activities, or places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Cities</option>
            <option value="paris">Paris</option>
            <option value="london">London</option>
            <option value="barcelona">Barcelona</option>
            <option value="rome">Rome</option>
          </select>
          
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="theme-park">Theme Parks</option>
            <option value="museum">Museums</option>
            <option value="park">Parks & Gardens</option>
            <option value="zoo">Zoos & Aquariums</option>
            <option value="restaurant">Family Restaurants</option>
            <option value="hotel">Family Hotels</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          Search Family-Friendly Places
        </button>
      </form>
    </div>
  );
}