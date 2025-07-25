import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ToastProvider';
import OptimizedImage from '../components/OptimizedImage';
import Wishlist from '../components/Wishlist';
import LiveChatSimple from '../components/LiveChatSimple';
import ArtisanShowcase from '../components/ArtisanShowcase';
import ProcessAnimation from '../components/ProcessAnimation';
import ArtisanJourneyAnimation from '../components/ArtisanJourneyAnimation';
import NepaliProcessAnimation from '../components/NepaliProcessAnimation';
import { useScrollToTop } from '../hooks/useScrollToTop';

const LandingPage = () => {
  useScrollToTop();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const categories = [
    { name: 'Handmade Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=jewelry' },
    { name: 'Vintage Treasures', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=vintage' },
    { name: 'Artisan Home Decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', fallback: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80', path: '/products?category=home-decor' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mixed Media Hero Section with Nepali Cultural Vibes */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900">
        {/* Nepali Cultural Background */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, #8B4513 0%, #CD853F 25%, #DAA520 50%, #B8860B 75%, #8B4513 100%)',
            filter: 'saturate(1.3) contrast(1.2)'
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Nepali Cultural Process Animation */}
        <NepaliProcessAnimation />

        {/* Traditional Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Nepali Colors Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-orange-500/20 to-yellow-400/25 mix-blend-overlay" />

        {/* Vector Graphics Layer - Interactive Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Interactive Blob 1 - Responds to cursor */}
          <motion.div
            className="absolute -top-20 -left-20 w-96 h-96 cursor-pointer group"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            whileHover={{
              scale: 1.2,
              rotate: 45,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity duration-300">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#ff6b6b', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#4ecdc4', stopOpacity: 0.4}} />
                </linearGradient>
                <filter id="glow1">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                className="group-hover:filter group-hover:drop-shadow-2xl transition-all duration-300"
                d="M47.1,-57.1C59.9,-45.6,68.3,-29.2,73.2,-10.8C78.1,7.6,79.5,27.9,72.4,44.8C65.3,61.7,49.7,75.2,31.8,79.9C13.9,84.6,-6.3,80.5,-24.8,73.1C-43.3,65.7,-60.1,54.9,-69.8,39.2C-79.5,23.5,-82.1,2.9,-78.9,-16.5C-75.7,-35.9,-66.7,-54.1,-51.9,-64.9C-37.1,-75.7,-18.6,-79.1,-0.5,-78.4C17.6,-77.7,35.3,-72.9,47.1,-57.1Z"
                fill="url(#grad1)"
                filter="url(#glow1)"
              />
            </svg>
            
            {/* Hover tooltip */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm">
                ✨ Interactive Art
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Blob 2 - Morphs on hover */}
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 cursor-pointer group"
            animate={{
              x: [-50, 50, -50],
              y: [0, 100, 0],
              rotate: [360, 180, 0],
            }}
            whileHover={{
              scale: 1.3,
              y: -20,
              transition: { duration: 0.4, ease: "backOut" }
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-15 group-hover:opacity-30 transition-all duration-500">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#a8edea', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#fed6e3', stopOpacity: 0.6}} />
                </linearGradient>
                <filter id="turbulence">
                  <feTurbulence baseFrequency="0.1" numOctaves="3" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20"/>
                </filter>
              </defs>
              <motion.path
                d="M37.8,-52.7C48.4,-42.3,55.7,-28.9,60.1,-14.2C64.5,0.5,66,16.5,61.2,30C56.4,43.5,45.3,54.5,31.8,62.1C18.3,69.7,2.4,74,-14.7,73.2C-31.8,72.4,-50.1,66.5,-63.2,54.3C-76.3,42.1,-84.2,23.6,-85.3,4.5C-86.4,-14.6,-80.7,-34.3,-69.2,-47.4C-57.7,-60.5,-40.4,-67,-23.9,-69.8C-7.4,-72.6,8.3,-71.7,22.4,-65.9C36.5,-60.1,49,-49.4,37.8,-52.7Z"
                fill="url(#grad2)"
                whileHover={{
                  d: "M45.2,-60.3C55.8,-48.7,60.5,-31.2,65.4,-12.8C70.3,5.6,75.4,25,72.1,42.1C68.8,59.2,57.1,74,41.2,78.5C25.3,83,5.2,77.2,-15.8,73.8C-36.8,70.4,-58.7,69.4,-71.4,58.2C-84.1,47,-87.6,25.6,-86.2,4.8C-84.8,-16,-78.5,-36.2,-66.7,-48.4C-54.9,-60.6,-37.6,-64.8,-20.1,-67.2C-2.6,-69.6,15.1,-70.2,31.4,-64.1C47.7,-58,62.6,-44.2,45.2,-60.3Z"
                }}
                transition={{ duration: 0.3, ease: "backOut" }}
              />
            </svg>
            
            {/* Hover particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-pink-400 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + i * 8}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Interactive Sketch-like Elements */}
          <motion.div
            className="absolute bottom-20 left-10 w-64 h-64 cursor-crosshair group"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            whileHover={{ 
              opacity: 0.8, 
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <filter id="roughPaper">
                  <feTurbulence baseFrequency="0.04" numOctaves="5" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1"/>
                </filter>
              </defs>
              <motion.path
                d="M10,150 Q25,120 50,140 T100,130 Q120,140 140,120 T180,130"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                filter="url(#roughPaper)"
                className="group-hover:stroke-pink-300 transition-colors duration-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                whileHover={{ strokeWidth: 4 }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              />
              
              {/* Interactive dots that appear on hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={30 + i * 35}
                    cy={135 + Math.sin(i) * 15}
                    r="3"
                    fill="#fff"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.5 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </g>
            </svg>
            
            {/* Sketch tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              initial={{ y: 10, scale: 0.8 }}
              whileHover={{ y: 0, scale: 1 }}
            >
              <div className="bg-black/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm border border-white/20">
                🎨 Hand-drawn vibes
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Interactive Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-40 cursor-pointer group"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              whileHover={{
                scale: 3,
                backgroundColor: '#ff6b6b',
                opacity: 1,
                transition: { duration: 0.2 }
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {/* Ripple effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 2, 3],
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Content Layer */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">

            {/* Enhanced Subtitle with Advanced Animations */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mb-12"
            >
              <div className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto leading-tight mb-6">
                <h2 
                  className="text-gray-800"
                  style={{
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                  }}
                >
                  Discover Unique Handmade Treasures
                </h2>
              </div>
              
              {/* Enhanced Description with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                className="relative"
              >
                <motion.p
                  className="text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10"
                  style={{
                    background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Shop handcrafted, artisan-made, and one-of-a-kind treasures from talented creators around the world
                  
                  {/* Animated emoji */}
                  <motion.span
                    className="inline-block ml-2 text-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.span>
                </motion.p>
                
                {/* Background highlight effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg -z-10"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced CTA Button with Sophisticated Hover Magic */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 3
              }}
              className="relative group"
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full overflow-hidden transform transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                  backgroundSize: '200% 200%'
                }}
              >
                {/* Dynamic background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  whileHover={{
                    backgroundPosition: ['0% 50%', '200% 50%'],
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Hover ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{
                    scale: [0, 1.2, 0],
                    transition: { duration: 0.8, ease: "easeOut" }
                  }}
                />
                
                <span className="relative z-10 mr-2 group-hover:tracking-wider transition-all duration-300">Shop Now</span>
                <motion.span
                  className="relative z-10 text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  whileHover={{ 
                    x: 8, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
                
                {/* Enhanced button particles with color variety */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][i % 5]
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Cursor trail effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                      'radial-gradient(circle at 100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                      'radial-gradient(circle at 0% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
                      'radial-gradient(circle at 100% 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)'
                    ],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                />
              </Link>
              
              {/* Button glow aura on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Interactive Decorative Elements with Hover Magic */}
            <motion.div
              className="absolute top-1/4 left-10 hidden lg:block cursor-pointer group"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 0.6, rotate: 0 }}
              whileHover={{
                scale: 1.8,
                rotate: 360,
                opacity: 1,
                transition: { duration: 0.6, ease: "backOut" }
              }}
              whileTap={{ scale: 2.2 }}
              transition={{ duration: 2, delay: 3.5 }}
            >
              <div className="text-6xl group-hover:animate-bounce relative">
                🎨
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 -z-10"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/3 right-20 hidden lg:block cursor-pointer group"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              whileHover={{
                scale: 2,
                rotate: [0, -10, 10, 0],
                opacity: 1,
                transition: { duration: 0.8, ease: "elasticOut" }
              }}
              whileTap={{ scale: 2.5 }}
              transition={{ duration: 1.5, delay: 4 }}
            >
              <div className="text-5xl relative group-hover:animate-pulse">
                ✨
                <div className="absolute inset-0 animate-ping bg-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 left-1/4 hidden lg:block cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.5, y: 0 }}
              whileHover={{
                scale: 1.6,
                y: -20,
                opacity: 1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 2 }}
              transition={{ duration: 2, delay: 4.5 }}
            >
              <div className="text-4xl relative">
                💎
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-md opacity-0 group-hover:opacity-40"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* SVGator-style Process Animation */}
      <ProcessAnimation />

{/* Modern Promo Section with Enhanced Typography */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left Card - Text with Button */}
          <div className="flex-1 card-modern bg-gradient-to-br from-wowktm-secondary/10 to-amber-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h2 className="font-display text-3xl font-bold text-wowktm-dark">Handicraft Highlights</h2>
            <p className="font-body text-lg text-gray-700 mt-2">Shop unique self-made products and affordable handicrafts</p>
            <Link
              to="/products?category=handicrafts"
              className="btn-secondary mt-4 inline-block"
            >
              Shop Now
            </Link>
          </div>

          {/* Middle Card - Image */}
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

          {/* Right Card - Small Product Card */}
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

      {/* Artisan Showcase Section */}
      <ArtisanShowcase />

      {/* SVGator-style Artisan Journey Animation */}
      <ArtisanJourneyAnimation />

      {/* Featured Categories with Smooth 3D Hover Effects */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6" style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
            }}>
              Explore Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handcrafted treasures across our curated collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.slice(0, 3).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
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
                        <motion.span
                          className="ml-1"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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

      {/* Live Chat */}
      <LiveChatSimple />
    </div>
  );
};

export default LandingPage;



