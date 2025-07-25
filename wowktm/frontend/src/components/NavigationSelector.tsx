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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <div 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          ⚡
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 animate-fadeIn">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Navigation Experience</h3>
            <p className="text-sm text-gray-600">Choose your interface style</p>
          </div>

          <div className="space-y-3">
            {navigationOptions.map((option, index) => (
              <div
                key={option.name}
                className="animate-slideInLeft"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                    <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Experience next-generation navigation patterns
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationSelector;
