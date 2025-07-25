import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'brand' | 'trend';
  category?: string;
  image?: string;
  price?: number;
}

interface SearchFilter {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  brand: string;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest';
}

interface AdvancedSearchProps {
  onClose?: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState<string[]>([
    'handmade jewelry',
    'vintage furniture',
    'ceramic pottery',
    'artisan crafts',
    'sustainable fashion'
  ]);
  const [filters, setFilters] = useState<SearchFilter>({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    brand: '',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for suggestions - Extensive Etsy-style products
  const mockSuggestions: SearchSuggestion[] = [
    // Jewelry & Accessories
    {
      id: '1',
      text: 'Handmade Sterling Silver Moon Necklace',
      type: 'product',
      category: 'Jewelry & Accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 89.99
    },
    {
      id: '2',
      text: 'Vintage Art Deco Emerald Ring',
      type: 'product',
      category: 'Jewelry & Accessories',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 345.00
    },
    {
      id: '3',
      text: 'Custom Wire Wrapped Crystal Pendant',
      type: 'product',
      category: 'Jewelry & Accessories',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 125.50
    },
    {
      id: '4',
      text: 'Handcrafted Leather Bracelet with Compass',
      type: 'product',
      category: 'Jewelry & Accessories',
      image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 45.99
    },
    // Clothing & Shoes
    {
      id: '5',
      text: 'Vintage 1970s Bohemian Maxi Dress',
      type: 'product',
      category: 'Clothing & Shoes',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 78.99
    },
    {
      id: '6',
      text: 'Handmade Alpaca Wool Sweater',
      type: 'product',
      category: 'Clothing & Shoes',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 165.00
    },
    {
      id: '7',
      text: 'Custom Embroidered Denim Jacket',
      type: 'product',
      category: 'Clothing & Shoes',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 89.50
    },
    {
      id: '8',
      text: 'Handcrafted Leather Ankle Boots',
      type: 'product',
      category: 'Clothing & Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 220.00
    },
    // Home & Living
    {
      id: '9',
      text: 'Handmade Ceramic Vase Collection',
      type: 'product',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 125.99
    },
    {
      id: '10',
      text: 'Macrame Wall Hanging with Crystals',
      type: 'product',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 65.00
    },
    {
      id: '11',
      text: 'Vintage Mid-Century Coffee Table',
      type: 'product',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 450.00
    },
    {
      id: '12',
      text: 'Hand-Carved Wooden Serving Board',
      type: 'product',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 85.50
    },
    // Art & Collectibles
    {
      id: '13',
      text: 'Original Watercolor Landscape Painting',
      type: 'product',
      category: 'Art & Collectibles',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 275.00
    },
    {
      id: '14',
      text: 'Vintage 1960s Record Collection',
      type: 'product',
      category: 'Art & Collectibles',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 189.99
    },
    {
      id: '15',
      text: 'Hand-Blown Glass Sculpture',
      type: 'product',
      category: 'Art & Collectibles',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 320.00
    },
    // Craft Supplies & Tools
    {
      id: '16',
      text: 'Premium Yarn Bundle - Merino Wool',
      type: 'product',
      category: 'Craft Supplies & Tools',
      image: 'https://images.unsplash.com/photo-1452509133926-2b180c6d6245?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 45.99
    },
    {
      id: '17',
      text: 'Vintage Fabric Bundle - 1940s Prints',
      type: 'product',
      category: 'Craft Supplies & Tools',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 32.50
    },
    {
      id: '18',
      text: 'Professional Jewelry Making Tools Set',
      type: 'product',
      category: 'Craft Supplies & Tools',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 120.00
    },
    // Wedding & Party
    {
      id: '19',
      text: 'Custom Wedding Invitation Suite',
      type: 'product',
      category: 'Wedding & Party',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 150.00
    },
    {
      id: '20',
      text: 'Rustic Wedding Centerpieces Set of 6',
      type: 'product',
      category: 'Wedding & Party',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 89.99
    },
    // Toys & Games
    {
      id: '21',
      text: 'Handcrafted Wooden Train Set',
      type: 'product',
      category: 'Toys & Games',
      image: 'https://images.unsplash.com/photo-1558877385-161e9d35d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 125.50
    },
    {
      id: '22',
      text: 'Vintage Board Game Collection',
      type: 'product',
      category: 'Toys & Games',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 75.00
    },
    // Pet Supplies
    {
      id: '23',
      text: 'Custom Pet Portrait Oil Painting',
      type: 'product',
      category: 'Pet Supplies',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 180.00
    },
    {
      id: '24',
      text: 'Handmade Leather Dog Collar',
      type: 'product',
      category: 'Pet Supplies',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      price: 35.99
    },
    // Category suggestions
    {
      id: '25',
      text: 'Jewelry & Accessories',
      type: 'category',
      category: 'Browse All'
    },
    {
      id: '26',
      text: 'Handmade Pottery',
      type: 'category',
      category: 'Home & Living'
    },
    {
      id: '27',
      text: 'Vintage Fashion',
      type: 'category',
      category: 'Clothing & Shoes'
    },
    // Trending terms
    {
      id: '28',
      text: 'Sustainable Crafts',
      type: 'trend',
      category: 'Eco-Friendly'
    },
    {
      id: '29',
      text: 'Bohemian Decor',
      type: 'trend',
      category: 'Home Styling'
    },
    {
      id: '30',
      text: 'Artisan Made',
      type: 'trend',
      category: 'Quality Crafts'
    }
  ];

  const categories = [
    'All Categories',
    'Jewelry & Accessories',
    'Clothing & Shoes',
    'Home & Living',
    'Wedding & Party',
    'Toys & Entertainment',
    'Art & Collectibles',
    'Craft Supplies & Tools',
    'Vintage',
    'Pet Supplies',
    'Electronics & Accessories',
    'Books, Movies & Music'
  ];

  const brands = [
    'All Sellers',
    'Featured Artisans',
    'Local Makers',
    'Vintage Specialists',
    'Custom Orders Available',
    'Eco-Friendly Shops',
    'Award-Winning Sellers',
    'New & Rising Talent'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== query);
      return [query, ...filtered].slice(0, 5);
    });

    // Perform search (navigate to results page)
    console.log('Searching for:', query, 'with filters:', filters);
    setIsOpen(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      // Navigate to product page
      console.log('Navigate to product:', suggestion.id);
    } else {
      setSearchQuery(suggestion.text);
      handleSearch(suggestion.text);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      brand: '',
      sortBy: 'relevance'
    });
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'category':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'brand':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'trend':
        return (
          <svg className="w-4 h-4 text-wowktm-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          placeholder="Search for handmade items, vintage finds, or anything unique..."
          className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-wowktm-primary focus:border-transparent bg-white shadow-sm"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full transition-colors ${
              showFilters ? 'bg-wowktm-primary text-white' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
          
          <button
            onClick={() => handleSearch(searchQuery)}
            className="bg-wowktm-primary text-white px-4 py-2 rounded-full hover:bg-wowktm-secondary transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <div className="border-b border-gray-200 overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Filters</h3>
                      <button
                        onClick={resetFilters}
                        className="text-sm text-wowktm-primary hover:text-wowktm-secondary"
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={filters.category}
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category} value={category === 'All Categories' ? '' : category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                        <select
                          value={filters.brand}
                          onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                        >
                          {brands.map(brand => (
                            <option key={brand} value={brand === 'All Brands' ? '' : brand}>
                              {brand}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sort By */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                        <select
                          value={filters.sortBy}
                          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                        >
                          <option value="relevance">Relevance</option>
                          <option value="price_low">Price: Low to High</option>
                          <option value="price_high">Price: High to Low</option>
                          <option value="rating">Customer Rating</option>
                          <option value="newest">Newest First</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={filters.priceRange[0]}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              priceRange: [parseInt(e.target.value), prev.priceRange[1]] 
                            }))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                            }))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Rating & Stock */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="inStock"
                            checked={filters.inStock}
                            onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                            className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                          />
                          <label htmlFor="inStock" className="text-sm text-gray-700">In Stock Only</label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                                className={`w-4 h-4 ${
                                  star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            <div className="max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-wowktm-primary"></div>
                  <p className="text-sm text-gray-500 mt-2">Searching...</p>
                </div>
              ) : searchQuery ? (
                suggestions.length > 0 ? (
                  <div className="py-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                      >
                        {suggestion.image ? (
                          <OptimizedImage
                            src={suggestion.image}
                            alt={suggestion.text}
                            className="w-10 h-10 rounded-lg object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getSuggestionIcon(suggestion.type)}
                          </div>
                        )}
                        
                        <div className="flex-1 text-left">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{suggestion.text}</span>
                            {suggestion.type === 'trend' && (
                              <span className="text-xs bg-wowktm-primary text-white px-2 py-1 rounded-full">
                                Trending
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{suggestion.category}</span>
                            {suggestion.price && (
                              <>
                                <span>•</span>
                                <span className="font-medium">${suggestion.price}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                  </div>
                )
              ) : (
                <div className="py-2">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="px-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Recent Searches</h4>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-sm text-gray-600 flex items-center space-x-2"
                        >
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div className="px-4 py-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Trending Searches</h4>
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-sm text-gray-600 flex items-center space-x-2"
                      >
                        <svg className="w-3 h-3 text-wowktm-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
