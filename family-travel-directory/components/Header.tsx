import { Search, Menu, User, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <span className="text-xl">👨‍👩‍👧‍👦</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Family Travel
              </h1>
              <p className="text-xs text-gray-500 font-medium">Curated Family Destinations</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a 
              href="#" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Home
            </a>
            <a 
              href="#" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Destinations
            </a>
            <a 
              href="#" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Activities
            </a>
            <a 
              href="#" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Planning
            </a>
            <a 
              href="#" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <Search size={18} />
            </button>
            
            {/* Add Listing */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-95">
              <Plus size={16} />
              Add Listing
            </button>
            
            {/* Sign In */}
            <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-gray-900 font-medium text-sm rounded-xl hover:bg-gray-50 transition-all duration-200">
              <User size={16} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
            
            {/* Mobile Menu */}
            <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}