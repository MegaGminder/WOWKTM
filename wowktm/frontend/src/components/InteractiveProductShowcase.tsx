import React from 'react';

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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 opacity-5 animate-spin"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            animationDuration: '20s'
          }}
        />
        
        <div
          className="absolute bottom-20 right-10 w-24 h-24 opacity-5 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #a8e6cf, #ffd3a5)',
            animationDuration: '15s'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Treasures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted masterpieces that tell unique stories
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-4 hover:scale-105"
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}
                />

                {/* Product Image Section */}
                <div className="relative p-8 text-center">
                  {/* Main Product Icon */}
                  <div className="text-8xl mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {product.image}
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 -z-10 transition-all duration-300" />
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-110">
                    {product.price}
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-8 pb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-6 bg-gradient-to-r ${product.color} text-white font-semibold rounded-xl shadow-lg relative overflow-hidden group/btn transform transition-all duration-300 hover:scale-105`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Add to Cart
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </span>
                  </button>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300/50 rounded-3xl transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-4 rounded-full cursor-pointer group relative overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
            <span className="text-lg font-semibold relative z-10">View All Products</span>
            <span className="text-2xl relative z-10 animate-pulse">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveProductShowcase;
