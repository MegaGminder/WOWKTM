import React from 'react';
import { motion } from 'framer-motion';

interface FluidLayoutProps {
  children: React.ReactNode;
  variant?: 'hero' | 'section' | 'card' | 'minimal';
  className?: string;
}

const FluidLayout: React.FC<FluidLayoutProps> = ({ 
  children, 
  variant = 'section',
  className = '' 
}) => {
  const getLayoutStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'relative min-h-screen flex items-center justify-center overflow-hidden',
          content: 'relative z-10 max-w-4xl mx-auto px-8 py-24',
          background: (
            <>
              {/* Organic fluid shapes */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fluidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,200 C200,100 400,300 600,200 C800,100 1000,300 1200,200 L1200,0 L0,0 Z"
                    fill="url(#fluidGradient1)"
                  />
                </svg>
                <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fluidGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(236, 72, 153, 0.08)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M1200,600 C1000,700 800,500 600,600 C400,700 200,500 0,600 L0,800 L1200,800 Z"
                    fill="url(#fluidGradient2)"
                  />
                </svg>
              </div>
            </>
          )
        };
      
      case 'section':
        return {
          container: 'relative py-24 overflow-hidden',
          content: 'relative z-10 max-w-6xl mx-auto px-6',
          background: (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full opacity-40 blur-2xl"></div>
            </div>
          )
        };

      case 'card':
        return {
          container: 'relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden',
          content: 'relative z-10 p-8',
          background: (
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full opacity-80"></div>
          )
        };

      case 'minimal':
        return {
          container: 'relative',
          content: 'max-w-5xl mx-auto px-6 py-16',
          background: null
        };

      default:
        return {
          container: 'relative',
          content: 'container mx-auto px-4 py-8',
          background: null
        };
    }
  };

  const layout = getLayoutStyles();

  return (
    <div className={`${layout.container} ${className} animate-fade-in-fluid`}>
      {layout.background}
      <div className={layout.content}>
        {children}
      </div>
    </div>
  );
};

// Negative space text component with fluid emphasis
export const FluidText: React.FC<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  spacing?: 'tight' | 'normal' | 'wide' | 'wider';
  className?: string;
}> = ({ 
  children, 
  size = 'md', 
  weight = 'normal', 
  spacing = 'normal',
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl md:text-3xl lg:text-4xl';
      default: return 'text-base';
    }
  };

  const getWeightClass = () => {
    switch (weight) {
      case 'light': return 'font-light';
      case 'normal': return 'font-normal';
      case 'medium': return 'font-medium';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-normal';
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case 'tight': return 'tracking-tight';
      case 'normal': return 'tracking-normal';
      case 'wide': return 'tracking-wide';
      case 'wider': return 'tracking-wider';
      default: return 'tracking-normal';
    }
  };

  return (
    <div className={`${getSizeClass()} ${getWeightClass()} ${getSpacingClass()} ${className}`}>
      {children}
    </div>
  );
};

// Fluid shape separator component
export const FluidSeparator: React.FC<{
  variant?: 'wave' | 'curve' | 'organic';
  color?: string;
  height?: string;
  flip?: boolean;
}> = ({ 
  variant = 'wave', 
  color = 'rgba(99, 102, 241, 0.1)', 
  height = '100px',
  flip = false 
}) => {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        return "M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 L0,100 Z";
      case 'curve':
        return "M0,100 C200,0 400,0 600,50 C800,100 1000,50 1200,0 L1200,100 Z";
      case 'organic':
        return "M0,60 C120,20 180,80 300,40 C420,0 480,60 600,40 C720,20 780,80 900,60 C1020,40 1080,100 1200,80 L1200,100 L0,100 Z";
      default:
        return "M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 L0,100 Z";
    }
  };

  return (
    <div className={`w-full ${flip ? 'transform rotate-180' : ''}`} style={{ height }}>
      <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d={getPath()} fill={color} />
      </svg>
    </div>
  );
};

// Spacer component for intentional negative space
export const Spacer: React.FC<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  responsive?: boolean;
}> = ({ size = 'md', responsive = true }) => {
  const getSizeClass = () => {
    const baseClass = (() => {
      switch (size) {
        case 'xs': return 'h-4';
        case 'sm': return 'h-8';
        case 'md': return 'h-16';
        case 'lg': return 'h-24';
        case 'xl': return 'h-32';
        case '2xl': return 'h-48';
        default: return 'h-16';
      }
    })();
    
    if (responsive) {
      return `${baseClass} md:h-${parseInt(baseClass.split('-')[1]) * 1.5} lg:h-${parseInt(baseClass.split('-')[1]) * 2}`;
    }
    
    return baseClass;
  };

  return <div className={getSizeClass()} />;
};

export default FluidLayout;
