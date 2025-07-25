import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import OptimizedImage from './OptimizedImage';
import DeliveryBadge from './DeliveryBadge';
import { useToast } from './ToastProvider';

interface WishlistItem extends Product {
  addedDate: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
}

const Wishlist: React.FC = () => {
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'price' | 'name'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock wishlist data
  useEffect(() => {
    const mockWishlist: WishlistItem[] = [
      {
        id: "1",
        name: 'Handmade Ceramic Vase',
        description: 'Beautiful handcrafted ceramic vase perfect for your home decor',
        price: 45.99,
        originalPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
        category: 'handmade',
        rating: 4.8,
        reviews: 127,
        inStock: true,
        discount: 23,
        addedDate: '2025-01-20',
        priceHistory: [
          { date: '2025-01-20', price: 45.99 },
          { date: '2025-01-15', price: 49.99 },
          { date: '2025-01-10', price: 52.99 }
        ],
        delivery: {
          freeShipping: true,
          expeditedShipping: true,
          shippingTime: '2-3 hours',
          processingTime: 'Same day pickup available'
        },
        seller: 'Ceramic Arts Studio'
      },
      {
        id: "2",
        name: 'Vintage Leather Journal',
        description: 'Authentic vintage leather-bound journal with aged pages',
        price: 32.50,
        originalPrice: 45.00,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
        category: 'vintage',
        rating: 4.6,
        reviews: 89,
        inStock: true,
        discount: 28,
        addedDate: '2025-01-18',
        priceHistory: [
          { date: '2025-01-18', price: 32.50 },
          { date: '2025-01-12', price: 35.00 }
        ],
        delivery: {
          freeShipping: false,
          expeditedShipping: true,
          shippingTime: '1-2 days',
          processingTime: '1 business day'
        },
        seller: 'Vintage Books & More'
      }
    ];
    setWishlistItems(mockWishlist);
  }, []);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from wishlist', 'success');
  };

  const addToCart = (product: WishlistItem) => {
    // Add to cart logic here
    showToast(`${product.name} added to cart!`, 'success');
  };

  const moveAllToCart = () => {
    // Move all items to cart logic
    showToast(`${wishlistItems.length} items moved to cart!`, 'success');
  };

  const shareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My WoWKTM Wishlist',
        text: 'Check out my wishlist on WoWKTM!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Wishlist link copied to clipboard!', 'success');
    }
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const getPriceChange = (item: WishlistItem) => {
    if (item.priceHistory.length < 2) return null;
    const currentPrice = item.priceHistory[0].price;
    const previousPrice = item.priceHistory[1].price;
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    return { change, percentage };
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and purchase them later</p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-wowktm-primary text-white px-6 py-3 rounded-lg hover:bg-wowktm-secondary transition-colors"
          >
            <span>Start Shopping</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{wishlistItems.length} items saved</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={shareWishlist}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          
          <button
            onClick={moveAllToCart}
            className="flex items-center space-x-2 bg-wowktm-primary text-white px-6 py-2 rounded-lg hover:bg-wowktm-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
            >
              <option value="recent">Recently Added</option>
              <option value="price">Price: Low to High</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-wowktm-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-wowktm-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
        <AnimatePresence>
          {sortedItems.map((item) => {
            const priceChange = getPriceChange(item);
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    className={`object-cover ${viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'}`}
                    width={200}
                    height={200}
                  />
                  
                  {/* Delivery Badge */}
                  <div className="absolute top-2 left-2">
                    <DeliveryBadge product={item} size="small" />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-wowktm-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-wowktm-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {item.discount && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                    
                    {priceChange && (
                      <div className={`text-xs mt-1 ${priceChange.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {priceChange.change < 0 ? '↓' : '↑'} ${Math.abs(priceChange.change).toFixed(2)} 
                        ({priceChange.percentage > 0 ? '+' : ''}{priceChange.percentage.toFixed(1)}%)
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(item.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500">
                      Added {new Date(item.addedDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-wowktm-primary text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-wowktm-secondary transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
