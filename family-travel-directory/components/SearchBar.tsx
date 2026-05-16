'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700/50 p-6 mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <Search className="absolute left-3 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search destinations, activities, or places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <select className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 h-12 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Cities</option>
            <option value="paris">Paris</option>
            <option value="london">London</option>
            <option value="barcelona">Barcelona</option>
            <option value="rome">Rome</option>
          </select>
          
          <select className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 h-12 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
          className="w-full mt-4 bg-sky-500 text-white h-12 rounded-xl hover:bg-sky-600 font-medium transition-colors active:scale-[0.97]"
        >
          Search Family-Friendly Places
        </button>
      </form>
    </div>
  );
}
