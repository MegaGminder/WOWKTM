import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';
import ProductService from '../services/ProductService';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  seller: {
    name: string;
    location: string;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  description: string;
  tags: string[];
}

const InteractiveProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const categories = [
    { id: 'all', name: 'All Products', color: 'from-gray-500 to-gray-600' },
    { id: 'Art', name: 'Art & Crafts', color: 'from-blue-500 to-indigo-600' },
    { id: 'Jewelry', name: 'Jewelry', color: 'from-pink-500 to-purple-600' },
    { id: 'Home Decor', name: 'Home Decor', color: 'from-green-500 to-emerald-600' },
    { id: 'Fashion', name: 'Fashion', color: 'from-red-500 to-pink-600' },
    { id: 'Spiritual', name: 'Spiritual', color: 'from-indigo-500 to-purple-600' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Get products from our service
        let allProducts = ProductService.getAllProducts();
        
        // Filter by category if not 'all'
        if (currentCategory !== 'all') {
          allProducts = ProductService.getProductsByCategory(currentCategory);
        }
        
        // Take first 12 products for showcase
        const showcaseProducts = allProducts.slice(0, 12).map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          imageUrl: p.imageUrl,
          images: p.images,
          seller: p.seller,
          rating: p.rating,
          reviewCount: p.reviewCount,
          inStock: p.inStock,
          category: p.category,
          description: p.description,
          tags: p.tags
        }));
        
        setProducts(showcaseProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    loadProducts();
  }, [currentCategory]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 10000),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.imageUrl,
      seller: product.seller.name,
      shipping: "FREE shipping",
      inStock: product.inStock,
      category: product.category,
      description: product.description,
      quantity: 1
    });
    showToast(`${product.name} added to cart!`, 'success');
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
      <div className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Product Showcase</h2>
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg animate-pulse">
              <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Interactive Product Showcase
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Explore our curated collection by category and discover unique handcrafted treasures
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                currentCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
              {/* Product Image */}
              <div className="relative w-full h-48">
                <Link to={`/product/${product.id}`}>
                  <OptimizedImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={224}
                  />
                </Link>
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-wowktm-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-xs text-gray-600 mb-2">{product.seller.name}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      product.inStock
                        ? 'bg-wowktm-primary text-white hover:bg-wowktm-secondary transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* View More Button */}
      <div className="text-center mt-12">
        <Link
          to={`/products${currentCategory !== 'all' ? `?category=${currentCategory.toLowerCase()}` : ''}`}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-wowktm-primary to-purple-600 text-white font-semibold rounded-lg hover:from-wowktm-secondary hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          View All {currentCategory !== 'all' ? categories.find(c => c.id === currentCategory)?.name : 'Products'}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default InteractiveProductShowcase;
