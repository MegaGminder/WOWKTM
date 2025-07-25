import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FlashProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  discount: number;
  timeLeft: string;
  sold: number;
  available: number;
}

const FlashSales: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts: FlashProduct[] = [
    {
      id: 1,
      name: "Hand-Painted Ceramic Vase",
      price: 29.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "CeramicArt Studio",
      rating: 4.8,
      reviews: 124,
      discount: 40,
      timeLeft: "23:45:32",
      sold: 87,
      available: 150
    },
    {
      id: 2,
      name: "Vintage Leather Messenger Bag",
      price: 59.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Heritage Crafts",
      rating: 4.9,
      reviews: 203,
      discount: 33,
      timeLeft: "23:45:32",
      sold: 156,
      available: 200
    },
    {
      id: 3,
      name: "Sterling Silver Moon Phase Necklace",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Lunar Jewelry Co",
      rating: 4.7,
      reviews: 89,
      discount: 38,
      timeLeft: "23:45:32",
      sold: 63,
      available: 100
    },
    {
      id: 4,
      name: "Handwoven Macrame Wall Hanging",
      price: 22.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Boho Home Decor",
      rating: 4.6,
      reviews: 156,
      discount: 34,
      timeLeft: "23:45:32",
      sold: 234,
      available: 300
    },
    {
      id: 5,
      name: "Artisan Soap Gift Set (6 Bars)",
      price: 19.99,
      originalPrice: 32.99,
      image: "https://images.unsplash.com/photo-1556909088-18e8e9cd65e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Natural Bath Co",
      rating: 4.8,
      reviews: 312,
      discount: 39,
      timeLeft: "23:45:32",
      sold: 445,
      available: 500
    },
    {
      id: 6,
      name: "Custom Pet Portrait Canvas",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Pet Art Studio",
      rating: 4.9,
      reviews: 78,
      discount: 33,
      timeLeft: "23:45:32",
      sold: 34,
      available: 75
    },
    {
      id: 7,
      name: "Handcrafted Wooden Cutting Board",
      price: 27.99,
      originalPrice: 42.99,
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Wood & Grain Co",
      rating: 4.7,
      reviews: 167,
      discount: 35,
      timeLeft: "23:45:32",
      sold: 123,
      available: 180
    },
    {
      id: 8,
      name: "Bohemian Dreamcatcher Set",
      price: 21.99,
      originalPrice: 35.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      seller: "Mystic Dreams",
      rating: 4.5,
      reviews: 94,
      discount: 39,
      timeLeft: "23:45:32",
      sold: 78,
      available: 120
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">⚡ Flash Sales</h2>
          <p className="text-gray-600 mb-4">Limited time offers - Don't miss out!</p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs">Minutes</div>
            </div>
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => {
            const progressPercentage = (product.sold / (product.sold + product.available)) * 100;
            
            return (
              <Link
                key={product.id}
                to="/products"
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-red-100 hover:border-red-300"
              >
                {/* Image */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    Flash Sale
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {'★'.repeat(Math.floor(product.rating))}
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-red-600">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-2">by {product.seller}</div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Sold: {product.sold}</span>
                      <span>Available: {product.available}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-xs text-red-600 font-semibold text-center">
                    Ends in {product.timeLeft}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-block"
          >
            View All Flash Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSales;