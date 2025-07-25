import React from 'react';
import { Link } from 'react-router-dom';

interface ArtisanProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  sellerLocation: string;
  rating: number;
  reviews: number;
  badge?: string;
  materials: string[];
  isHandmade: boolean;
  isCustomizable: boolean;
  processedIn: string;
  tags: string[];
}

const ArtisanShowcase: React.FC = () => {
  const featuredArtisans: ArtisanProduct[] = [
    {
      id: "1",
      name: "Hand-Forged Sterling Silver Moon Phase Ring",
      description: "Unique handcrafted ring featuring all phases of the moon, perfect for celestial lovers",
      price: 78.00,
      originalPrice: 95.00,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "MoonlightMetalworks",
      sellerLocation: "Portland, OR",
      rating: 4.9,
      reviews: 234,
      badge: "Bestseller",
      materials: ["Sterling Silver", "Recycled Silver"],
      isHandmade: true,
      isCustomizable: true,
      processedIn: "3-5 business days",
      tags: ["celestial", "moon", "minimalist", "boho"]
    },
    {
      id: "2",
      name: "Vintage-Inspired Leather Bound Journal",
      description: "Hand-stitched leather journal with aged parchment paper, perfect for writers and dreamers",
      price: 42.00,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "ArtisanBindery",
      sellerLocation: "Asheville, NC",
      rating: 4.8,
      reviews: 156,
      badge: "Editor's Choice",
      materials: ["Genuine Leather", "Handmade Paper"],
      isHandmade: true,
      isCustomizable: true,
      processedIn: "1-2 business days",
      tags: ["vintage", "writing", "journal", "leather"]
    },
    {
      id: "3",
      name: "Custom Pet Portrait - Watercolor Style",
      description: "Beautiful custom watercolor portrait of your beloved pet, painted by hand from your photo",
      price: 65.00,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "PawsAndBrushes",
      sellerLocation: "Santa Fe, NM",
      rating: 5.0,
      reviews: 89,
      badge: "Custom Order",
      materials: ["Watercolor Paint", "Canvas Paper"],
      isHandmade: true,
      isCustomizable: true,
      processedIn: "5-7 business days",
      tags: ["custom", "pet portrait", "watercolor", "gift"]
    },
    {
      id: "4",
      name: "Macrame Wall Hanging - Desert Sunset",
      description: "Handwoven macrame art piece in warm sunset colors, perfect for bohemian home decor",
      price: 89.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "DesertDreamsMacrame",
      sellerLocation: "Sedona, AZ",
      rating: 4.7,
      reviews: 67,
      badge: "Trending",
      materials: ["Cotton Cord", "Wooden Dowel"],
      isHandmade: true,
      isCustomizable: false,
      processedIn: "2-4 business days",
      tags: ["macrame", "wall art", "boho", "desert"]
    },
    {
      id: "5",
      name: "Artisan Ceramic Coffee Mug - Speckled Blue",
      description: "Hand-thrown ceramic mug with unique speckled glaze, microwave and dishwasher safe",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "ClayAndGlaze",
      sellerLocation: "Burlington, VT",
      rating: 4.9,
      reviews: 123,
      badge: "Eco-Friendly",
      materials: ["Stoneware Clay", "Non-Toxic Glaze"],
      isHandmade: true,
      isCustomizable: true,
      processedIn: "1-3 business days",
      tags: ["ceramic", "coffee", "handmade", "kitchen"]
    },
    {
      id: "6",
      name: "Hand-Embroidered Linen Tea Towels",
      description: "Set of 3 linen tea towels with delicate hand-embroidered botanical designs",
      price: 36.00,
      originalPrice: 48.00,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      seller: "LinenAndThread",
      sellerLocation: "Nashville, TN",
      rating: 4.6,
      reviews: 91,
      badge: "Sale",
      materials: ["Pure Linen", "Cotton Thread"],
      isHandmade: true,
      isCustomizable: false,
      processedIn: "2-3 business days",
      tags: ["linen", "embroidery", "kitchen", "botanical"]
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ✨ Featured Artisan Creations
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover unique, handmade treasures crafted with love by talented artisans from around the world. 
            Each piece tells a story and brings authentic craftsmanship to your life.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtisans.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-wowktm-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </div>
                )}
                
                {/* Handmade Badge */}
                {product.isHandmade && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <span>🤲</span>
                    <span>Handmade</span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-wowktm-primary text-white px-4 py-2 rounded-full hover:bg-wowktm-accent transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Seller Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-wowktm-accent to-wowktm-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {product.seller.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{product.seller}</p>
                    <p className="text-xs text-gray-500">{product.sellerLocation}</p>
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Materials:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.materials.slice(0, 2).map((material, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {material}
                      </span>
                    ))}
                    {product.materials.length > 2 && (
                      <span className="text-xs text-gray-500">+{product.materials.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Processing Time */}
                <div className="flex items-center space-x-1 mb-4">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">Ready in {product.processedIn}</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-wowktm-primary text-white px-4 py-2 rounded-lg hover:bg-wowktm-accent transition-colors flex items-center space-x-1 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2M7 13l2.5 2M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Customizable Notice */}
                {product.isCustomizable && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                      <span>Customization available</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-wowktm-accent to-wowktm-primary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            <span>Explore All Artisan Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtisanShowcase;
