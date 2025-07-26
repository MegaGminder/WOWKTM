import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductListing from '../components/ProductListing';
import AdvancedSearch from '../components/AdvancedSearch';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface Filters {
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  sortBy: string;
  materials: string[];
  shipsFrom: string;
  isHandmade: boolean;
  isVintage: boolean;
  isCustomizable: boolean;
  categories: string[];
}

const ProductsPage: React.FC = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    sortBy: 'relevance',
    materials: [],
    shipsFrom: '',
    isHandmade: false,
    isVintage: false,
    isCustomizable: false,
    categories: []
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <AdvancedSearch />
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="px-4 py-4 sm:hidden">
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="w-full bg-wowktm-primary text-white py-2 rounded-lg font-medium"
        >
          Filters
        </button>
      </div>

      {/* Filter Drawer (mobile) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="relative bg-white w-3/4 max-w-xs h-full shadow-xl p-6 overflow-y-auto">
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>

            {/* Filters Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="space-y-2">
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    'Accessories',
                    'Art & Collectibles', 
                    'Bags & Purses',
                    'Bath & Beauty',
                    'Books, Movies & Music',
                    'Clothing',
                    'Craft Supplies & Tools',
                    'Electronics & Accessories',
                    'Home & Living',
                    'Jewelry',
                    'Paper & Party Supplies',
                    'Pet Supplies',
                    'Shoes',
                    'Toys & Games',
                    'Weddings',
                    'Baby & Kids',
                    'Gifts'
                  ].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ 
                              ...prev, 
                              categories: [...prev.categories, category] 
                            }));
                          } else {
                            setFilters(prev => ({ 
                              ...prev, 
                              categories: prev.categories.filter(c => c !== category) 
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                      className={`w-6 h-6 ${
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

              {/* Special Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isHandmade}
                      onChange={(e) => setFilters(prev => ({ ...prev, isHandmade: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Handmade</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isVintage}
                      onChange={(e) => setFilters(prev => ({ ...prev, isVintage: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Vintage</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isCustomizable}
                      onChange={(e) => setFilters(prev => ({ ...prev, isCustomizable: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Customizable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => setFilters({
                  priceRange: [0, 1000],
                  rating: 0,
                  inStock: false,
                  sortBy: 'relevance',
                  materials: [],
                  shipsFrom: '',
                  isHandmade: false,
                  isVintage: false,
                  isCustomizable: false,
                  categories: []
                })}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>

              {/* Apply Filters Button */}
              <div className="mt-4">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-wowktm-primary text-white py-2 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Sidebar & Products */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar visible on lg+ */}
          <div className="hidden sm:block w-full lg:w-1/4 xl:w-1/5">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="space-y-2">
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    'Accessories',
                    'Art & Collectibles', 
                    'Bags & Purses',
                    'Bath & Beauty',
                    'Books, Movies & Music',
                    'Clothing',
                    'Craft Supplies & Tools',
                    'Electronics & Accessories',
                    'Home & Living',
                    'Jewelry',
                    'Paper & Party Supplies',
                    'Pet Supplies',
                    'Shoes',
                    'Toys & Games',
                    'Weddings',
                    'Baby & Kids',
                    'Gifts'
                  ].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ 
                              ...prev, 
                              categories: [...prev.categories, category] 
                            }));
                          } else {
                            setFilters(prev => ({ 
                              ...prev, 
                              categories: prev.categories.filter(c => c !== category) 
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFilters(prev => ({ ...prev, rating: star }))}
                      className={`w-6 h-6 ${
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

              {/* Special Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isHandmade}
                      onChange={(e) => setFilters(prev => ({ ...prev, isHandmade: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Handmade</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isVintage}
                      onChange={(e) => setFilters(prev => ({ ...prev, isVintage: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Vintage</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isCustomizable}
                      onChange={(e) => setFilters(prev => ({ ...prev, isCustomizable: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Customizable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => setFilters({
                  priceRange: [0, 1000],
                  rating: 0,
                  inStock: false,
                  sortBy: 'relevance',
                  materials: [],
                  shipsFrom: '',
                  isHandmade: false,
                  isVintage: false,
                  isCustomizable: false,
                  categories: []
                })}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <ProductListing 
              category={category || undefined}
              searchQuery={searchQuery || undefined}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;