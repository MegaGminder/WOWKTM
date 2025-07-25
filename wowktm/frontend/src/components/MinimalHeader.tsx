import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FluidText, Spacer } from './FluidLayout';

const MinimalHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="relative bg-white border-b border-gray-100">
      {/* Subtle fluid background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with generous spacing */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <FluidText size="lg" weight="bold" className="text-white">
                  W
                </FluidText>
              </div>
              {/* Subtle accent dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full opacity-80"></div>
            </div>
            <FluidText size="xl" weight="bold" spacing="tight" className="text-gray-900">
              WOWKTM
            </FluidText>
          </Link>

          {/* Minimal navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/products" className="group relative">
              <FluidText size="md" weight="medium" className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                Discover
              </FluidText>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            <Link to="/categories" className="group relative">
              <FluidText size="md" weight="medium" className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                Categories
              </FluidText>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            <Link to="/sell" className="group relative">
              <FluidText size="md" weight="medium" className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                Sell
              </FluidText>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Right section with breathing room */}
          <div className="flex items-center space-x-8">
            
            {/* Minimal search */}
            <form onSubmit={handleSearch} className="relative">
              <div className={`flex items-center transition-all duration-300 ${
                isSearchFocused ? 'w-80' : 'w-64'
              }`}>
                <input
                  type="text"
                  placeholder="Search unique finds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
                />
                <svg 
                  className="absolute left-4 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Minimal account section */}
            <div className="flex items-center space-x-6">
              
              {/* Login */}
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <FluidText size="md" weight="medium">
                  Sign In
                </FluidText>
              </Link>

              {/* Cart with minimal indicator */}
              <Link to="/cart" className="relative group">
                <div className="relative p-2">
                  <svg 
                    className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                  </svg>
                  
                  {/* Clean cart count indicator */}
                  {getTotalItems() > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      <FluidText size="sm" weight="medium" className="text-xs">
                        {getTotalItems()}
                      </FluidText>
                    </div>
                  )}
                </div>
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* Spacer for intentional negative space */}
      <Spacer size="xs" />
    </header>
  );
};

export default MinimalHeader;
