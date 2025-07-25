import React from 'react';
import { motion } from 'framer-motion';

const ArtisanJourneyAnimation = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden">
      {/* Animated        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >ound Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 85,50 50,90 15,50"
                fill="url(#shapeGradient)"
                className="drop-shadow-lg"
              />
              <defs>
                <linearGradient id="shapeGradient">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            The Artisan's 
            <motion.span
              className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Journey
            </motion.span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Witness the magic of creation from concept to your doorstep
          </p>
        </motion.div>

        {/* SVG Journey Path */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Journey Path */}
          <svg
            className="w-full h-64"
            viewBox="0 0 1200 300"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Animated Journey Path */}
            <motion.path
              d="M100,150 Q300,75 500,150 T900,150 Q1000,112 1100,150"
              stroke="url(#journeyGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="20,10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Animated traveling dot */}
            <motion.circle
              r="8"
              fill="#fbbf24"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3.5 
              }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin="3.5s"
              >
                <mpath href="#journeyPath" />
              </animateMotion>
            </motion.circle>
            
            <defs>
              <path id="journeyPath" d="M100,200 Q300,100 500,200 T900,200 Q1000,150 1100,200" />
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="25%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Journey Steps */}
          <div className="absolute inset-0 flex items-center justify-between px-8">
            {[
              { 
                title: "Inspiration", 
                icon: "💡", 
                description: "Ideas spark creativity",
                position: "left-[5%]",
                delay: 1
              },
              { 
                title: "Creation", 
                icon: "🎨", 
                description: "Hands craft with passion",
                position: "left-[25%]",
                delay: 1.5
              },
              { 
                title: "Quality Check", 
                icon: "✨", 
                description: "Perfection in every detail",
                position: "left-[50%]",
                delay: 2
              },
              { 
                title: "Packaging", 
                icon: "📦", 
                description: "Wrapped with love",
                position: "left-[75%]",
                delay: 2.5
              },
              { 
                title: "Delivery", 
                icon: "🏠", 
                description: "Your doorstep awaits",
                position: "right-[5%]",
                delay: 3
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`absolute ${step.position} top-1/2 -translate-y-1/2 -translate-x-1/2`}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                transition={{ 
                  delay: step.delay, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <div className="relative group">
                  {/* Step Circle */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-xl cursor-pointer relative overflow-hidden"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <span className="relative z-10">{step.icon}</span>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 border-4 border-white/30 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>

                  {/* Step Info Card */}
                  <motion.div
                    className="absolute top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    initial={{ y: 10, scale: 0.9 }}
                    whileHover={{ y: 0, scale: 1 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-center border border-white/20 shadow-xl">
                      <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-white/80 whitespace-nowrap">{step.description}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Connection Lines */}
                {index < 4 && (
                  <motion.div
                    className="absolute left-full top-1/2 w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent -translate-y-1/2 hidden lg:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.3, duration: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 4, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "10K+", label: "Artisans Worldwide", icon: "👥" },
            { number: "50K+", label: "Unique Creations", icon: "🎨" },
            { number: "98%", label: "Happy Customers", icon: "😊" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="text-6xl mb-4 group-hover:animate-bounce"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-4xl font-black text-yellow-400 mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4.5 + index * 0.2, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-white/80 text-lg">{stat.label}</p>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ArtisanJourneyAnimation;
