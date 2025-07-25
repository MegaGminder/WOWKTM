import React from 'react';
import { Link } from 'react-router-dom';
import FluidLayout, { FluidText, FluidSeparator, Spacer } from '../components/FluidLayout';
import MinimalHeader from '../components/MinimalHeader';
import MinimalProductCard from '../components/MinimalProductCard';
import { useCart } from '../context/CartContext';

const MinimalLandingPage: React.FC = () => {
  const { addItem } = useCart();

  // Curated featured products with breathing room
  const featuredProducts = [
    {
      id: 1,
      name: "Handmade Sterling Silver Moon Necklace",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "MoonCraft Studio",
      rating: 4.9,
      reviews: 127,
      badge: "Bestseller",
      inStock: true,
      category: "Jewelry",
      description: "Delicate sterling silver necklace featuring a crescent moon pendant"
    },
    {
      id: 2,
      name: "Vintage Leather Journal",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "Vintage Finds",
      rating: 4.8,
      reviews: 89,
      badge: "Limited",
      inStock: true,
      category: "Vintage",
      description: "Authentic vintage leather journal perfect for writers"
    },
    {
      id: 3,
      name: "Custom Pet Portrait",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "PixelPaws Art",
      rating: 5.0,
      reviews: 234,
      badge: "Custom",
      inStock: true,
      category: "Art",
      description: "Personalized digital pet portrait from your favorite photo"
    },
    {
      id: 4,
      name: "Handwoven Macrame Wall Hanging",
      price: 67.50,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "Boho Home",
      rating: 4.7,
      reviews: 56,
      badge: "Sale",
      inStock: true,
      category: "Home Decor",
      description: "Beautiful macrame wall hanging for bohemian charm"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader />
      
      {/* Hero Section with Generous Negative Space */}
      <FluidLayout variant="hero">
        <div className="text-center max-w-4xl mx-auto">
          <Spacer size="xl" />
          
          <FluidText size="2xl" weight="light" spacing="tight" className="text-gray-900 leading-tight mb-8">
            Discover
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Unique </span>
            Handmade Treasures
          </FluidText>
          
          <Spacer size="md" />
          
          <FluidText size="lg" weight="normal" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A carefully curated marketplace where artisans and creators share their passion through exceptional handmade goods.
          </FluidText>
          
          <Spacer size="xl" />
          
          {/* Minimal CTA */}
          <div className="flex items-center justify-center space-x-6">
            <Link 
              to="/products" 
              className="group relative bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/sell" 
              className="text-gray-600 hover:text-gray-900 font-medium px-8 py-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm"
            >
              Start Selling
            </Link>
          </div>
          
          <Spacer size="2xl" />
        </div>
      </FluidLayout>

      {/* Fluid Separator */}
      <FluidSeparator variant="organic" color="rgba(99, 102, 241, 0.05)" height="80px" />

      {/* Featured Products with Spacious Layout */}
      <FluidLayout variant="section">
        <div className="text-center mb-16">
          <FluidText size="2xl" weight="semibold" spacing="tight" className="text-gray-900 mb-4">
            Featured Creations
          </FluidText>
          <FluidText size="lg" className="text-gray-600 max-w-2xl mx-auto">
            Handpicked items from our most talented artisans
          </FluidText>
        </div>

        <Spacer size="lg" />

        {/* Product Grid with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product) => (
            <MinimalProductCard
              key={product.id}
              {...product}
              variant="elevated"
            />
          ))}
        </div>

        <Spacer size="xl" />

        {/* Centered View More Link */}
        <div className="text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <span>View All Products</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </FluidLayout>

      {/* Another Fluid Separator */}
      <FluidSeparator variant="wave" color="rgba(168, 85, 247, 0.05)" height="100px" flip />

      {/* Values Section with Minimal Design */}
      <FluidLayout variant="minimal">
        <div className="text-center mb-20">
          <FluidText size="2xl" weight="semibold" className="text-gray-900 mb-6">
            Why Choose WOWKTM
          </FluidText>
          <FluidText size="lg" className="text-gray-600 max-w-3xl mx-auto">
            We believe in the power of human creativity and the stories behind every handmade piece
          </FluidText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              icon: "🎨",
              title: "Unique Artistry",
              description: "Every item tells a story, crafted with passion and attention to detail"
            },
            {
              icon: "🤝",
              title: "Direct from Makers",
              description: "Connect directly with artisans and support independent creators"
            },
            {
              icon: "🌟",
              title: "Quality Assured",
              description: "Carefully curated collection ensuring exceptional quality and authenticity"
            }
          ].map((value, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl mb-6">{value.icon}</div>
              <FluidText size="xl" weight="semibold" className="text-gray-900 mb-4">
                {value.title}
              </FluidText>
              <FluidText size="md" className="text-gray-600 leading-relaxed">
                {value.description}
              </FluidText>
            </div>
          ))}
        </div>

        <Spacer size="2xl" />
      </FluidLayout>

      {/* Minimal Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <FluidLayout variant="minimal">
          <div className="text-center py-12">
            <FluidText size="md" className="text-gray-500">
              © 2025 WOWKTM. Crafted with care for creators and collectors.
            </FluidText>
            
            <Spacer size="md" />
            
            <div className="flex items-center justify-center space-x-8">
              <Link to="/about" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <FluidText size="sm">About</FluidText>
              </Link>
              <Link to="/help" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <FluidText size="sm">Help</FluidText>
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <FluidText size="sm">Privacy</FluidText>
              </Link>
            </div>
          </div>
        </FluidLayout>
      </footer>
    </div>
  );
};

export default MinimalLandingPage;
