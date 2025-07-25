import React from 'react';

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
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full animate-spin opacity-50"
          style={{ animationDuration: '20s' }}
        />
        
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-green-300/20 rounded-full animate-pulse opacity-30"
          style={{ animationDuration: '15s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            How <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">WowKTM</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovery to delivery, we make shopping for handmade treasures simple and secure
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative group transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${step.delay}s` }}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${step.color.includes('blue') ? '3B82F6' : step.color.includes('green') ? '10B981' : step.color.includes('purple') ? '8B5CF6' : 'F97316'}' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }}
              />

              <div className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-gray-800 shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {step.icon}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 -z-10 transition-all duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {step.title}
                </h3>
                
                <p className="text-white/90 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>

                {/* Connection arrow */}
                {index < processSteps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-20">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg text-gray-600 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            
            <span className="text-lg font-semibold relative z-10">Start Your Journey</span>
            <span className="text-2xl relative z-10 transition-transform duration-300 group-hover:translate-x-1">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessAnimation;