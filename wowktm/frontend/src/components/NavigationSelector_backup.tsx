import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationOptions = [
    {
      name: 'Standard',
      path: '/',
      description: 'Classic e-commerce layout',
      color: 'from-gray-500 to-gray-700',
      icon: '🏠'
    },
    {
      name: 'Experimental',
      path: '/experimental-nav',
      description: '3D orbital navigation with mouse tracking',
      color: 'from-purple-500 to-pink-600',
      icon: '🌌'
    },
    {
      name: 'Immersive',
      path: '/immersive',
      description: 'Immersive scrolling with parallax effects',
      color: 'from-blue-500 to-cyan-600',
      icon: '🌊'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ⚡
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Navigation Experience</h3>
              <p className="text-sm text-gray-600">Choose your interface style</p>
            </div>

            <div className="space-y-3">
              {navigationOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={option.path}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-lg bg-gradient-to-r hover:shadow-lg transition-all duration-300 group"
                    style={{
                      background: `linear-gradient(135deg, ${option.color.replace('from-', '').replace(' to-', ', ')})`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-gray-100">
                          {option.name}
                        </h4>
                        <p className="text-sm text-white/80 group-hover:text-white/90">
                          {option.description}
                        </p>
                      </div>
                      <motion.div
                        className="text-white/60 group-hover:text-white"
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Experience next-generation navigation patterns
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationSelector;
