import React, { useState, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ScrollAnimation,
  MorphingShape,
  ScrollProgress,
  TextReveal,
  NumberCounter
} from './ScrollAnimations';
import OptimizedImage from './OptimizedImage';

const ImmersiveLandingPage: React.FC = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY, scrollYProgress } = useViewportScroll();
  
  // Background parallax layers (keep these for other sections)
  const bgLayer1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const bgLayer2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const bgLayer3 = useTransform(scrollY, [0, 1000], [0, -75]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const stats = [
    { label: 'Happy Customers', value: 15000, suffix: '+' },
    { label: 'Unique Products', value: 50000, suffix: '+' },
    { label: 'Artisan Partners', value: 2500, suffix: '+' },
    { label: 'Countries Served', value: 25, suffix: '' }
  ];

  const features = [
    {
      title: 'Handcrafted Excellence',
      description: 'Every item is carefully selected and crafted by skilled artisans',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Sustainable Future',
      description: 'Supporting eco-friendly practices and sustainable commerce',
      icon: '🌱',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Global Community',
      description: 'Connecting creators and collectors from around the world',
      icon: '🌍',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <ScrollProgress />

      {/* Dynamic Background Layers */}
      <div className="fixed inset-0 -z-20">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: bgLayer1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20" />
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: bgLayer2 }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-amber-900/20 via-orange-900/20 to-red-900/20" />
        </motion.div>
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y: bgLayer3 }}
        >
          <div className="w-full h-full bg-gradient-to-bl from-teal-900/20 via-blue-900/20 to-purple-900/20" />
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <MorphingShape className="top-20 left-10" color="#8B5CF6" />
      <MorphingShape className="top-40 right-20" color="#EC4899" />
      <MorphingShape className="bottom-40 left-1/4" color="#F59E0B" />
      <MorphingShape className="bottom-20 right-1/3" color="#10B981" />

      {/* Hero Section with Static Background */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Static overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-5"></div>
        
        <div
          className="relative z-10 text-center text-white px-4 -mt-20"
        >
          <div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold shadow-2xl"
          >
            W
          </div>

          <TextReveal
            text="Welcome to WoWKTM"
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
            stagger={0.1}
          />

          <TextReveal
            text="Where Unique Treasures Find Their Perfect Home"
            className="text-xl md:text-2xl mb-12 opacity-90 font-light"
            delay={0.5}
            stagger={0.03}
          />

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/products">
              <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:scale-105 transition-transform">
                Explore Marketplace
              </button>
            </Link>
            
            <button className="px-12 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Remove Interactive Cursor Trail */}
      </section>

      {/* Stats Section with Counter Animation */}
      <ScrollAnimation animation="slide-up" className="py-24 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <NumberCounter
                  from={0}
                  to={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block mb-2"
                  duration={2}
                />
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* Features Section with 3D Cards */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade" className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
              Why Choose WoWKTM?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of marketplace shopping with our innovative platform
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation
                key={feature.title}
                animation="scale"
                delay={index * 0.2}
                className="h-full"
              >
                <motion.div
                  className="bg-white rounded-3xl p-8 h-full shadow-lg border border-gray-100 relative overflow-hidden group"
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div
                    className="text-6xl mb-6 inline-block"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -10, 0],
                      filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Product Showcase */}
      <ParallaxSection
        className="py-24 relative"
        bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        overlay={true}
        speed={0.3}
      >
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="slide-up" className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Featured Collections
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover handpicked items from our most talented artisans
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <ScrollAnimation
                key={item}
                animation="slide-up"
                delay={index * 0.2}
              >
                <motion.div
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <OptimizedImage
                      src={`https://images.unsplash.com/photo-${1540558776 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80`}
                      alt={`Featured Product ${item}`}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      width={600}
                      height={400}
                    />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-2">Artisan Collection {item}</h3>
                        <p className="text-white/80">Premium handcrafted items</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Call to Action with Interactive Elements */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-amber-600 relative overflow-hidden">
        <FloatingElement amplitude={10} frequency={4} className="absolute top-10 left-10">
          <div className="w-20 h-20 bg-white/10 rounded-full" />
        </FloatingElement>
        <FloatingElement amplitude={15} frequency={3} className="absolute bottom-10 right-10">
          <div className="w-16 h-16 bg-white/10 rounded-full" />
        </FloatingElement>

        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation animation="scale">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect treasures
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/products">
                <motion.button
                  className="px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </Link>
              
              <Link to="/sell">
                <motion.button
                  className="px-12 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Become a Seller
                </motion.button>
              </Link>
            </motion.div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default ImmersiveLandingPage;
