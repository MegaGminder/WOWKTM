import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';
import { getDummyProducts, Product as DummyProduct } from '../data/dummyData';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  seller: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  isHandmade: boolean;
  isVintage: boolean;
  isCustomizable: boolean;
  materials: string[];
  shipsFrom: string;
  processedIn: string;
  freeShipping: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  featured?: boolean;
}

interface ProductListingProps {
  category?: string;
  searchQuery?: string;
  filters?: {
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
    sortBy: string;
    materials: string[];
    shipsFrom: string;
    isHandmade: boolean;
    isVintage: boolean;
    isCustomizable: boolean;
  };
}

const ProductListing: React.FC<ProductListingProps> = ({ category, searchQuery, filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const productsPerPage = 24;

  const { addItem } = useCart();
  const { showToast } = useToast();

  // Comprehensive Etsy-style product database
  // Using dummy data from external file

  useEffect(() => {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const loadProducts = async () => {
      setLoading(true);
      
      try {
        const result = await getDummyProducts({
          category,
          search: searchQuery
        });
        
        // Convert dummy data to component format
        let convertedProducts: Product[] = result.data.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.imageUrl,
          images: p.images,
          seller: p.seller.name,
          rating: p.rating,
          reviews: p.reviewCount,
          inStock: p.inStock,
          category: p.category,
          subcategory: p.subcategory || '',
          description: p.description,
          tags: p.tags,
          isHandmade: true,
          isVintage: false,
          isCustomizable: false,
          materials: ['Traditional Materials'],
          shipsFrom: p.seller.location,
          processedIn: '1-3 business days',
          freeShipping: true,
          bestseller: p.rating > 4.7,
          newArrival: false,
          onSale: !!p.originalPrice,
          featured: p.rating > 4.8
        }));

        // Apply additional filters
        if (filters) {
          if (filters.priceRange) {
            convertedProducts = convertedProducts.filter(product =>
              product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
            );
          }

          if (filters.rating > 0) {
            convertedProducts = convertedProducts.filter(product =>
              product.rating >= filters.rating
            );
          }

          if (filters.inStock) {
            convertedProducts = convertedProducts.filter(product => product.inStock);
          }

          if (filters.isHandmade) {
            convertedProducts = convertedProducts.filter(product => product.isHandmade);
          }

          if (filters.isVintage) {
            convertedProducts = convertedProducts.filter(product => product.isVintage);
          }

          if (filters.isCustomizable) {
            convertedProducts = convertedProducts.filter(product => product.isCustomizable);
          }

          // Sort products
          switch (filters.sortBy) {
            case 'price_low':
              convertedProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price_high':
              convertedProducts.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              convertedProducts.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              convertedProducts.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
              break;
            default: // relevance
              convertedProducts.sort((a, b) => {
                let scoreA = 0, scoreB = 0;
                if (a.featured) scoreA += 3;
                if (a.bestseller) scoreA += 2;
                if (a.newArrival) scoreA += 1;
                if (b.featured) scoreB += 3;
                if (b.bestseller) scoreB += 2;
                if (b.newArrival) scoreB += 1;
                return scoreB - scoreA;
              });
          }
        }
        
        setProducts(convertedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      }
      
      setLoading(false);
    };
    
    loadProducts();
  }, [category, searchQuery, filters]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 10000),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: product.seller,
      shipping: product.freeShipping ? "FREE shipping" : "Standard shipping",
      inStock: product.inStock,
      category: product.category,
      description: product.description,
      quantity: 1
    });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wowktm-primary"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {category || 'All Products'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6' : 'space-y-4'}>
        <AnimatePresence>
          {displayedProducts.map((product, index) => (
            <div key={product.id} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col ${
                  viewMode === 'list' ? 'flex-row h-auto' : ''
                }`}>
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full h-48'}`}>
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={224}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  {product.badge && (
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      product.badge === 'Bestseller' ? 'bg-orange-100 text-orange-800' :
                      product.badge === 'Vintage' ? 'bg-purple-100 text-purple-800' :
                      product.badge === 'Handmade' ? 'bg-green-100 text-green-800' :
                      product.badge === 'Custom' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Sale badge */}
                {product.onSale && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                      SALE
                    </span>
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <svg
                    className={`w-5 h-5 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick shop overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-wowktm-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-wowktm-secondary transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className={`p-4 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-wowktm-primary min-h-[2.5rem] overflow-hidden" 
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.25rem'
                        }}>
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">by {product.seller}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 min-h-[1.5rem]">
                    {product.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex items-center space-x-2 mb-3 text-xs min-h-[1.5rem]">
                    {product.isHandmade && (
                      <span className="flex items-center text-green-600">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Handmade
                      </span>
                    )}
                    {product.freeShipping && (
                      <span className="flex items-center text-blue-600">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" />
                        </svg>
                        Free shipping
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom section - Price and shipping info */}
                <div className="mt-auto">
                  {/* Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {viewMode === 'list' && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-wowktm-primary text-white px-4 py-2 rounded-lg hover:bg-wowktm-secondary transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Ships from */}
                  <p className="text-xs text-gray-500">
                    Ships from {product.shipsFrom} • {product.processedIn}
                  </p>
                </div>
                </div>
              </div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-wowktm-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* No results */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 3H9a2 2 0 00-2 2v1.293A7.962 7.962 0 0012 4a7.962 7.962 0 005 1.293V5a2 2 0 00-2-2z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
