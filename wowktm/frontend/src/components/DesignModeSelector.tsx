import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FluidText } from './FluidLayout';

const DesignModeSelector: React.FC = () => {
  const location = useLocation();

  const designModes = [
    {
      path: '/',
      name: 'Original',
      description: 'Feature-rich marketplace',
      color: 'from-blue-500 to-purple-600'
    },
    {
      path: '/minimal',
      name: 'Minimal',
      description: 'Negative space focused',
      color: 'from-gray-600 to-gray-800'
    },
    {
      path: '/experimental-nav',
      name: 'Experimental',
      description: 'Advanced interactions',
      color: 'from-pink-500 to-red-600'
    },
    {
      path: '/immersive',
      name: 'Immersive',
      description: 'Full experience',
      color: 'from-indigo-500 to-cyan-600'
    }
  ];

  const currentMode = designModes.find(mode => mode.path === location.pathname) || designModes[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="group">
        {/* Current Mode Indicator */}
        <div className={`bg-gradient-to-r ${currentMode.color} text-white px-4 py-2 rounded-full shadow-lg cursor-pointer group-hover:shadow-xl transition-all duration-300`}>
          <FluidText size="sm" weight="medium" className="text-white">
            {currentMode.name}
          </FluidText>
        </div>

        {/* Mode Options (appears on hover) */}
        <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="p-2 space-y-1">
            {designModes.map((mode) => (
              <Link
                key={mode.path}
                to={mode.path}
                className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === mode.path
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${mode.color}`}></div>
                  <div>
                    <FluidText size="sm" weight="medium" className="text-gray-900">
                      {mode.name}
                    </FluidText>
                    <FluidText size="sm" className="text-gray-500">
                      {mode.description}
                    </FluidText>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModeSelector;
