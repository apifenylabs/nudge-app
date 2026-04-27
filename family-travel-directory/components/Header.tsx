'use client';

import { MapPin, Search, Globe, Menu, X, User, Sparkles, ChevronDown, Heart, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState('Asia');
  
  const regions = [
    { code: 'asia', name: 'Asia', count: 245 },
    { code: 'europe', name: 'Europe', count: 189 },
    { code: 'north-america', name: 'North America', count: 167 },
    { code: 'oceania', name: 'Oceania', count: 89 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Nomad List inspired */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">FT</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Family Travel<span className="text-sky-500">.</span>
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                Kid-safe directory • Updated daily
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Premium spacing */}
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Destinations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Activities
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Safety Guide
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Trip Planner
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/blog" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="group text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors relative">
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right side actions - Premium UI */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <Search size={18} />
            </button>
            
            {/* Region selector - MonksTrip inspired */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer group">
              <Globe className="w-4 h-4 text-gray-500 group-hover:text-sky-500 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{activeRegion}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            
            {/* Favorites */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors group">
              <Heart className="w-4 h-4 text-gray-500 group-hover:text-rose-500 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Saved</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">12</span>
            </button>
            
            {/* Add Listing */}
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 active:scale-95">
              <Plus size={16} />
              Add Listing
            </button>
            
            {/* Sign In - SetSail inspired */}
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 font-medium hover:border-gray-300 transition-colors">
              <User size={16} />
              Sign In
            </button>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Premium design */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
            <div className="flex flex-col gap-1">
              {['Destinations', 'Activities', 'Safety Guide', 'Trip Planner', 'Blog', 'Community'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="px-4 py-3.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
              
              <div className="mt-4 pt-6 border-t border-gray-100 space-y-3">
                {/* Region selector */}
                <div className="px-4">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Regions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        onClick={() => setActiveRegion(region.name)}
                        className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          activeRegion === region.name
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{region.name}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {region.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="px-4 space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <Search className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Search</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Saved Places</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-sky-200 transition-all">
                    <Plus className="w-4 h-4" />
                    Add Listing
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 font-medium hover:border-gray-300 transition-colors">
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}