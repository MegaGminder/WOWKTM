import React from 'react';

const ArtisanJourneyAnimation = () => {
  const journeySteps = [
    {
      id: 1,
      title: "Discover",
      description: "Browse through handcrafted treasures from skilled artisans",
      icon: "🎨",
      position: "left-[10%]",
      delay: 0
    },
    {
      id: 2,
      title: "Connect",
      description: "Chat directly with creators about customizations",
      icon: "💬",
      position: "left-[30%]",
      delay: 0.3
    },
    {
      id: 3,
      title: "Create",
      description: "Watch your vision come to life through skilled craftsmanship",
      icon: "🔨",
      position: "left-[50%]",
      delay: 0.6
    },
    {
      id: 4,
      title: "Deliver",
      description: "Receive your unique treasure, crafted with love",
      icon: "📦",
      position: "left-[70%]",
      delay: 0.9
    },
    {
      id: 5,
      title: "Enjoy",
      description: "Cherish your one-of-a-kind handmade masterpiece",
      icon: "❤️",
      position: "left-[90%]",
      delay: 1.2
    }
  ];

  const artisanCategories = [
    {
      emoji: "🏺",
      title: "Pottery Masters",
      description: "Traditional ceramic artisans creating timeless pieces"
    },
    {
      emoji: "🧵",
      title: "Textile Weavers", 
      description: "Skilled craftspeople weaving stories into fabric"
    },
    {
      emoji: "🔨",
      title: "Metal Smiths",
      description: "Expert metalworkers forging unique jewelry & décor"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
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
          </div>
        ))}

        {/* Particle effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            The Artisan{" "}
            <span 
              className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient"
              style={{ 
                backgroundSize: '200% 200%'
              }}
            >
              Journey
            </span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Experience the magical transformation from raw materials to treasured masterpieces
          </p>
        </div>

        {/* Interactive Journey Path */}
        <div className="relative max-w-6xl mx-auto">
          {/* Journey Timeline */}
          <div className="relative">
            {/* Base path line */}
            <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden lg:block">
              <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full opacity-30" />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full animate-progressBar" 
                style={{ animationDelay: '1s', animationDuration: '3s', animationFillMode: 'forwards' }}
              />
            </div>

            {/* Journey Steps */}
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 py-12">
              {journeySteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute ${step.position} top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 animate-fadeInScale`}
                  style={{ 
                    animationDelay: `${1.5 + step.delay}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {/* Step Icon Container */}
                  <div className="relative group cursor-pointer">
                    {/* Main Icon Circle */}
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-xl cursor-pointer relative overflow-hidden transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                      
                      {/* Icon */}
                      <span className="relative z-10 filter drop-shadow-sm">{step.icon}</span>
                      
                      {/* Animated ring */}
                      <div className="absolute inset-0 border-4 border-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-black text-gray-800 shadow-lg">
                      {step.id}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 max-w-xs">
                        <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line to Next Step */}
                  {index < journeySteps.length - 1 && (
                    <div 
                      className="absolute left-full top-1/2 w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent -translate-y-1/2 hidden lg:block opacity-0 animate-scaleX"
                      style={{ 
                        animationDelay: `${2 + step.delay}s`,
                        animationFillMode: 'forwards'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artisan Categories Showcase */}
        <div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-fadeInUp"
          style={{ 
            animationDelay: '4s',
            animationFillMode: 'forwards'
          }}
        >
          {artisanCategories.map((category, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              {/* Category Icon */}
              <div 
                className="text-6xl mb-4 group-hover:animate-bounce transform transition-transform duration-300"
                style={{ 
                  animationDelay: `${4.2 + index * 0.2}s`
                }}
              >
                {category.emoji}
              </div>
              
              {/* Category Title */}
              <h3 
                className="text-4xl font-black text-yellow-400 mb-2 opacity-0 animate-fadeInScale"
                style={{ 
                  animationDelay: `${4.4 + index * 0.2}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {category.title}
              </h3>
              
              {/* Category Description */}
              <p className="text-purple-100 text-lg">{category.description}</p>

              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .animate-scaleX {
          animation: scaleX 0.8s ease-out;
          transform-origin: left;
        }
        
        .animate-progressBar {
          animation: progressBar 3s ease-out;
        }
        
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ArtisanJourneyAnimation;
