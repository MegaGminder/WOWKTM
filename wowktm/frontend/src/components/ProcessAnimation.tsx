import React from 'react';
import { motion } from 'framer-motion';

const ProcessAnimation = () => {
  const processSteps = [
    {
      id: 1,
      title: "Browse & Discover",
      description: "Explore unique handmade treasures from artisans worldwide",
      icon: "🔍",
      color: "from-blue-400 to-blue-600",
      delay: 0
    },
    {
      id: 2,
      title: "Connect with Artisans",
      description: "Chat directly with creators and customize your perfect piece",
      icon: "💬",
      color: "from-green-400 to-green-600",
      delay: 0.3
    },
    {
      id: 3,
      title: "Secure Purchase",
      description: "Safe payment processing with buyer protection guarantee",
      icon: "🛡️",
      color: "from-purple-400 to-purple-600",
      delay: 0.6
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Carefully packaged and shipped directly to your doorstep",
      icon: "🚚",
      color: "from-orange-400 to-orange-600",
      delay: 0.9
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-green-300/20 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            How It <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From discovery to delivery, we make finding unique treasures simple and secure
          </p>
        </motion.div>

        {/* Process Steps with SVGator-style animations */}
        <div className="relative">
          {/* Animated connection line */}
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden lg:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 10"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,5 Q250,2 500,5 T1000,5"
                stroke="url(#processGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              />
              <defs>
                <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="33%" stopColor="#10B981" />
                  <stop offset="66%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: step.delay,
                  ease: "backOut"
                }}
                className="relative group"
              >
                {/* Card Background with Gradient */}
                <div className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl shadow-xl relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Cpath d='M30 0L60 30L30 60L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }}
                  />

                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-gray-800 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: step.delay + 0.3, 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 10 
                    }}
                  >
                    {step.id}
                  </motion.div>

                  {/* Icon with Physics Animation */}
                  <motion.div
                    className="text-6xl mb-4 relative z-10"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.2,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ 
                      delay: step.delay + 0.2, 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 8 
                    }}
                  >
                    {step.icon}
                    
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
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

                  {/* Title with Typewriter Effect */}
                  <motion.h3
                    className="text-xl font-bold text-white mb-3 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.4, duration: 0.5 }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description with Stagger Animation */}
                  <motion.p
                    className="text-white/90 text-sm leading-relaxed relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.6, duration: 0.5 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${30 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: step.delay + i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Hover Arrow Animation */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.8 }}
                  >
                    <motion.svg
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full cursor-pointer group overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="text-lg font-semibold relative z-10">Start Your Journey</span>
            <motion.span
              className="text-2xl relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessAnimation;
