import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  bgImage?: string;
}

const ExperimentalNavigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  const springConfig = { damping: 15, stiffness: 300 };
  const x = useSpring(rotateX, springConfig);
  const y = useSpring(rotateY, springConfig);

  const navItems: NavItem[] = [
    {
      id: 'handmade',
      title: 'Handmade',
      subtitle: 'Artisan Crafts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      path: '/products?category=handmade',
      color: 'from-purple-500 to-pink-500',
      bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 'vintage',
      title: 'Vintage',
      subtitle: 'Timeless Finds',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/products?category=vintage',
      color: 'from-amber-500 to-orange-500',
      bgImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 'jewelry',
      title: 'Jewelry',
      subtitle: 'Precious Pieces',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 22 12 18.27 5.82 22 7 13.87 2 9l6.91-.74L12 2z" />
        </svg>
      ),
      path: '/products?category=jewelry',
      color: 'from-emerald-500 to-teal-500',
      bgImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 'art',
      title: 'Art',
      subtitle: 'Creative Works',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      path: '/products?category=art',
      color: 'from-indigo-500 to-purple-500',
      bgImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    },
    {
      id: 'home',
      title: 'Home & Garden',
      subtitle: 'Living Spaces',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/products?category=home',
      color: 'from-green-500 to-emerald-500',
      bgImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
        
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgb(120, 119, 198, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgb(255, 119, 198, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 40% 80%, rgb(120, 219, 255, 0.3) 0%, transparent 50%)`,
          backgroundSize: '400% 400%'
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Main Navigation Container */}
      <motion.div
        ref={containerRef}
        className="flex items-center justify-center h-full perspective-1000"
        style={{
          rotateX: x,
          rotateY: y,
        }}
      >
        {/* Central Hub */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* WoWKTM Logo in Center */}
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative z-10"
            whileHover={{ 
              boxShadow: '0 0 50px rgba(168, 85, 247, 0.8)',
              scale: 1.1
            }}
            animate={{
              boxShadow: isExpanded 
                ? '0 0 100px rgba(168, 85, 247, 0.6)' 
                : '0 0 30px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Link to="/" className="text-white font-bold text-xl">
              WoWKTM
            </Link>
          </motion.div>

          {/* Orbiting Navigation Items */}
          <AnimatePresence>
            {navItems.map((item, index) => {
              const angle = (index * 72) * (Math.PI / 180); // 72 degrees apart for 5 items
              const radius = isExpanded ? 200 : 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ 
                    x, 
                    y, 
                    scale: 1, 
                    opacity: 1,
                    rotate: isExpanded ? 360 : 0
                  }}
                  exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  onHoverStart={() => setActiveItem(item.id)}
                  onHoverEnd={() => setActiveItem(null)}
                >
                  <Link to={item.path}>
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer relative overflow-hidden group`}
                      whileHover={{ 
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {/* Background Image */}
                      {item.bgImage && (
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                          style={{
                            backgroundImage: `url(${item.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      )}
                      
                      {/* Icon */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full"
                        initial={{ scale: 0, opacity: 0.8 }}
                        whileHover={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </Link>

                  {/* Item Label */}
                  <AnimatePresence>
                    {(activeItem === item.id || isExpanded) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center"
                      >
                        <div className="bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                          <div className="font-semibold text-sm">{item.title}</div>
                          <div className="text-xs opacity-80">{item.subtitle}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Connection Lines */}
          <AnimatePresence>
            {isExpanded && navItems.map((item, index) => {
              const angle = (index * 72) * (Math.PI / 180);
              const length = 120;
              
              return (
                <motion.div
                  key={`line-${item.id}`}
                  className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-gradient-to-r from-purple-400 to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: length, opacity: 0.6 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{
                    transform: `rotate(${angle * (180 / Math.PI)}deg) translate(-50%, -50%)`,
                    transformOrigin: 'left center'
                  }}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed pointer-events-none z-50 w-4 h-4 bg-white rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Instructions */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-lg font-light mb-2">Hover to explore categories</p>
        <p className="text-sm opacity-70">Move your mouse to experience 3D navigation</p>
      </motion.div>
    </div>
  );
};

export default ExperimentalNavigation;
