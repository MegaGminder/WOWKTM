import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';
import OptimizedImage from '../components/OptimizedImage';
import { PerformantMotion, fadeInUp, fadeIn, useReducedMotion } from '../utils/optimizedMotion';
import { preloadCriticalImages } from '../utils/imageOptimization';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Lazy load heavy components
const Wishlist = lazy(() => import('../components/Wishlist'));
const LiveChatSimple = lazy(() => import('../components/LiveChatSimple'));
const ArtisanShowcase = lazy(() => import('../components/ArtisanShowcase'));
import ProcessAnimation from '../components/ProcessAnimation';
import ArtisanJourneyAnimation from '../components/ArtisanJourneyAnimation';
const NepaliProcessAnimation = lazy(() => import('../components/NepaliProcessAnimation'));
const FlashSales = lazy(() => import('../components/FlashSales'));
const ProductListing = lazy(() => import('../components/ProductListing'));
const InteractiveProductShowcase = lazy(() => import('../components/InteractiveProductShowcase'));
const Footer = lazy(() => import('../components/Footer'));

const LandingPage = () => {
  useScrollToTop();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();

  // Preload critical images
  useEffect(() => {
    preloadCriticalImages();
  }, []);

  const categories = [
    { name: 'Handmade Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=jewelry' },
    { name: 'Vintage Treasures', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=vintage' },
    { name: 'Artisan Home Decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=home-decor' },
  ];

  const whyChooseUsFeatures = [
    {
      icon: "🎨",
      title: "Unique Handmade Items",
      description: "Every piece is carefully crafted by skilled artisans with attention to detail and quality."
    },
    {
      icon: "🌍",
      title: "Global Artisan Network",
      description: "Supporting talented creators from around the world and bringing their stories to you."
    },
    {
      icon: "💎",
      title: "Premium Quality Guarantee",
      description: "We ensure every item meets our high standards before it reaches your doorstep."
    },
    {
      icon: "🚚",
      title: "Fast & Secure Shipping",
      description: "Quick delivery with careful packaging to ensure your treasures arrive safely."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely love the handmade jewelry I bought! The quality is exceptional and the design is so unique.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "The vintage pieces I purchased exceeded my expectations. Great customer service and fast shipping!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "WowKTM has become my go-to place for unique gifts. The artisan stories make each purchase special.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Simplified without problematic motion components */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900" style={{ minHeight: '100vh' }}>
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DAA520 50%, #B8860B 75%, #8B4513 100%)',
            filter: 'saturate(1.3) contrast(1.2)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 opacity-50" />
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto leading-tight mb-4 sm:mb-6 text-gray-800"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                  }}>
                Discover Unique Handmade Treasures
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto px-4 text-white"
                 style={{
                   textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                   filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))'
                 }}>
                Shop handcrafted, artisan-made, and one-of-a-kind treasures from talented creators around the world
                <span className="inline-block ml-2 text-lg sm:text-xl md:text-2xl">✨</span>
              </p>
            </div>

            <div className="relative group px-4">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 text-sm sm:text-lg lg:text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
                }}
              >
                <span className="mr-2">Shop Now</span>
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Process Animation */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProcessAnimation />
      </Suspense>

      {/* Flash Sales Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <FlashSales />
      </Suspense>

      {/* Best Sellers Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Best Sellers in Handicrafts & Home
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Top-rated products loved by our customers
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="bestsellers" />
          </Suspense>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked collection of authentic Nepalese crafts and treasures
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-wowktm-primary to-purple-600 text-white font-semibold rounded-lg hover:from-wowktm-secondary hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-red-800 font-bold rounded-full mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Flash Sale - Limited Time!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Up to 50% Off Selected Items
            </h2>
            <p className="text-lg text-red-100 max-w-2xl mx-auto">
              Don't miss out on these incredible deals on authentic handcrafted items
            </p>
            <div className="mt-6 flex justify-center items-center space-x-4 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-2xl font-bold">34</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-2xl font-bold">56</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/flash-deals"
              className="inline-flex items-center px-8 py-3 bg-yellow-400 text-red-800 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Shop All Flash Deals
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Our Current Obsessions */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Our current obsessions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/products?category=beauty" className="group">
                  <div className="bg-purple-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Beauty products"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Beauty</p>
                  </div>
                </Link>
                <Link to="/products?category=fashion" className="group">
                  <div className="bg-purple-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Fashion accessories"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Fashion</p>
                  </div>
                </Link>
                <Link to="/products?category=home" className="group">
                  <div className="bg-green-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Home decor"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Home</p>
                  </div>
                </Link>
                <Link to="/products?category=electronics" className="group">
                  <div className="bg-pink-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Electronics"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Electronics</p>
                  </div>
                </Link>
              </div>
              <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Shop now →
              </Link>
            </div>

            {/* Decorations for your room */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Decorations for your room</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/products?category=wall-art" className="group">
                  <div className="bg-yellow-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Wall art"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Wall art</p>
                  </div>
                </Link>
                <Link to="/products?category=mirrors" className="group">
                  <div className="bg-yellow-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Mirrors & clocks"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Mirrors & clocks</p>
                  </div>
                </Link>
                <Link to="/products?category=rugs" className="group">
                  <div className="bg-green-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Rugs"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Rugs</p>
                  </div>
                </Link>
                <Link to="/products?category=lighting" className="group">
                  <div className="bg-green-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Lights"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Lights</p>
                  </div>
                </Link>
              </div>
              <Link to="/products?category=home-decor" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Shop Off to College →
              </Link>
            </div>

            {/* Explore artisan crafts */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Explore artisan crafts</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/products?category=pottery" className="group">
                  <div className="bg-cyan-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Pottery & ceramics"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Pottery & ceramics</p>
                  </div>
                </Link>
                <Link to="/products?category=accessories" className="group">
                  <div className="bg-cyan-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Handmade accessories"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Accessories</p>
                  </div>
                </Link>
                <Link to="/products?category=textiles" className="group">
                  <div className="bg-pink-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Traditional textiles"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Textiles</p>
                  </div>
                </Link>
                <Link to="/products?category=jewelry" className="group">
                  <div className="bg-pink-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Handmade jewelry"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Jewelry</p>
                  </div>
                </Link>
              </div>
              <Link to="/products?category=handicrafts" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Shop Artisan Collection →
              </Link>
            </div>

            {/* Shop by grade */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Shop by price range</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/products?price=under-25" className="group">
                  <div className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Under $25"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">Under $25</p>
                  </div>
                </Link>
                <Link to="/products?price=25-50" className="group">
                  <div className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="$25-$50"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">$25 - $50</p>
                  </div>
                </Link>
                <Link to="/products?price=50-100" className="group">
                  <div className="bg-blue-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="$50-$100"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">$50 - $100</p>
                  </div>
                </Link>
                <Link to="/products?price=over-100" className="group">
                  <div className="bg-teal-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80"
                      alt="Over $100"
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">$100+</p>
                  </div>
                </Link>
              </div>
              <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Shop All Price Ranges →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Promo Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-gradient-to-br from-wowktm-secondary/10 to-amber-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-wowktm-dark">Handicraft Highlights</h2>
            <p className="text-lg text-gray-700 mt-2">Shop unique self-made products and affordable handicrafts</p>
            <Link
              to="/products?category=handicrafts"
              className="btn-secondary mt-4 inline-block"
            >
              Shop Now
            </Link>
          </div>

          <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Handmade Pottery Collection"
                className="w-full h-48 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-lg">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <h3 className="text-white font-bold text-lg mb-2">Handmade Pottery</h3>
                  <p className="text-white text-sm">Unique ceramic pieces</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-2">
              <img
                src="https://images.unsplash.com/photo-1587034336269-afce1f5f4d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Personalized Wooden Crafts"
                className="w-full h-32 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Under $30
              </div>
            </div>
            <h3 className="text-xl font-semibold text-black group-hover:text-wowktm-primary transition-colors duration-300">Personalized Wooden Crafts</h3>
            <p className="text-sm text-gray-600 mt-1">Custom engraved items starting at $15</p>
            <Link
              to="/products?category=self-made"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Artisan Showcase */}
      <Suspense fallback={<div>Loading...</div>}>
        <ArtisanShowcase />
      </Suspense>

      {/* Artisan Journey Animation */}
      <Suspense fallback={<div>Loading...</div>}>
        <ArtisanJourneyAnimation />
      </Suspense>

      {/* Featured Categories */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              Explore Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handcrafted treasures across our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="group">
                <Link to={category.path} className="block">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <OptimizedImage
                        src={category.image}
                        alt={category.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={256}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="inline-flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors duration-300">
                        Shop Now 
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              Why Choose <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">WowKTM</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the finest handmade treasures with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUsFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest additions to our collection of authentic handcrafted items
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Art" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=art"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Art Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Jewelry Collection Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Handcrafted Jewelry
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Exquisite jewelry pieces crafted by master artisans using traditional techniques
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Jewelry" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=jewelry"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Jewelry Collection
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Spiritual & Meditation Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Spiritual & Meditation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find peace and tranquility with our collection of spiritual and meditation items
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Spiritual" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=spiritual"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Discover Spiritual Items
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Home Decor Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Home Decor
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your living space with our beautiful handcrafted home decor items
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Home Decor" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=home-decor"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Home Decor
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Traditional Fashion Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Traditional Fashion
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Authentic traditional clothing and accessories that celebrate cultural heritage
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Fashion" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=fashion"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Shop Fashion Items
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Beauty & Wellness Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beauty & Wellness
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Natural and organic beauty products crafted with traditional ingredients
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <ProductListing category="Beauty" />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              to="/products?category=beauty"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Beauty Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              What Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from our community of treasure hunters and art lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected with WowKTM
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new products, special offers, and discover unique treasures from makers around the world.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-wowktm-secondary text-white py-6 text-center">
        <p className="text-lg font-semibold">
          Free Shipping on Orders Over $50! Shop Today.
        </p>
        <Link
          to="/products"
          className="mt-2 inline-block text-white underline hover:text-yellow-300"
        >
          Start Shopping
        </Link>
      </div>

      {/* Footer */}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>

      {/* Live Chat */}
      <Suspense fallback={<div>Loading...</div>}>
        <LiveChatSimple />
      </Suspense>
    </div>
  );
};

export default LandingPage;
