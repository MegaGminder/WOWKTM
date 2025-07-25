import React from 'react';
import { motion } from 'framer-motion';

const InteractiveProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Handwoven Ceramic Bowl",
      price: "$45",
      image: "🏺",
      description: "Artisan crafted with love",
      color: "from-amber-400 to-orange-500"
    },
    {
      id: 2,
      name: "Silver Moon Pendant",
      price: "$89",
      image: "🌙",
      description: "Sterling silver elegance",
      color: "from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      name: "Vintage Leather Journal",
      price: "$32",
      image: "📖",
      description: "Stories waiting to be told",
      color: "from-green-400 to-teal-500"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 opacity-5"
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            borderRadius: ["50%", "20%", "50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(135deg, #a8e6cf, #ffd3a5)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Treasures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted masterpieces that tell unique stories
          </p>
        </motion.div>

        {/* Interactive Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -20,
                rotateY: 5,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }
              }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                ease: "backOut"
              }}
              className="group cursor-pointer perspective-1000"
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform-gpu">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Product Image Section */}
                <div className="relative p-8 text-center">
                  {/* Floating particles around product */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-60"
                      style={{
                        left: `${20 + (i % 3) * 30}%`,
                        top: `${30 + Math.floor(i / 3) * 40}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.6, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Main Product Icon */}
                  <motion.div
                    className="text-8xl mb-6 relative z-10"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {product.image}
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 -z-10"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Price Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.5, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {product.price}
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="px-8 pb-8">
                  <motion.h3
                    className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {product.name}
                  </motion.h3>
                  
                  <motion.p
                    className="text-gray-600 text-sm mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {product.description}
                  </motion.p>

                  {/* Interactive CTA Button */}
                  <motion.button
                    className={`w-full py-3 px-6 bg-gradient-to-r ${product.color} text-white font-semibold rounded-xl shadow-lg relative overflow-hidden group/btn`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {/* Button background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Add to Cart
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </div>

                {/* Interactive border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300/50 rounded-3xl transition-all duration-300"
                  animate={{
                    borderColor: [
                      'rgba(168, 85, 247, 0)',
                      'rgba(168, 85, 247, 0.2)',
                      'rgba(168, 85, 247, 0)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-4 rounded-full cursor-pointer group relative overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            {/* Animated particles in button */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <span className="text-lg font-semibold relative z-10">View All Products</span>
            <motion.span
              className="text-2xl relative z-10"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveProductShowcase;
