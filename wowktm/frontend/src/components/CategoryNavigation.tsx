import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: {
    id: string;
    name: string;
    items: string[];
  }[];
}

const CategoryNavigation: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'jewelry',
      name: 'Jewelry & Accessories',
      icon: '�',
      subcategories: [
        {
          id: 'handmade-jewelry',
          name: 'Handmade Jewelry',
          items: ['Sterling Silver', 'Gold Filled', 'Gemstone', 'Pearl', 'Wire Wrapped']
        },
        {
          id: 'vintage-jewelry',
          name: 'Vintage Jewelry',
          items: ['Art Deco', 'Victorian', 'Mid-Century', 'Estate Pieces']
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: ['Bags & Purses', 'Scarves', 'Hair Accessories', 'Watches']
        }
      ]
    },
    {
      id: 'clothing',
      name: 'Clothing & Shoes',
      icon: '�',
      subcategories: [
        {
          id: 'womens-clothing',
          name: "Women's Clothing",
          items: ['Dresses', 'Tops & Blouses', 'Vintage', 'Boho', 'Plus Size']
        },
        {
          id: 'mens-clothing',
          name: "Men's Clothing",
          items: ['T-Shirts', 'Button-Down Shirts', 'Vintage', 'Accessories']
        },
        {
          id: 'shoes',
          name: 'Shoes',
          items: ['Handmade Shoes', 'Vintage Boots', 'Sandals', 'Custom Orders']
        }
      ]
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      icon: '�',
      subcategories: [
        {
          id: 'home-decor',
          name: 'Home Decor',
          items: ['Wall Art', 'Macrame', 'Ceramics & Pottery', 'Candles', 'Plants & Planters']
        },
        {
          id: 'furniture',
          name: 'Furniture',
          items: ['Handmade Wood', 'Vintage', 'Rustic', 'Custom Pieces']
        },
        {
          id: 'kitchen-dining',
          name: 'Kitchen & Dining',
          items: ['Handmade Pottery', 'Wooden Utensils', 'Vintage Dishes', 'Tea Towels']
        }
      ]
    },
    {
      id: 'art-collectibles',
      name: 'Art & Collectibles',
      icon: '🎨',
      subcategories: [
        {
          id: 'original-art',
          name: 'Original Art',
          items: ['Paintings', 'Drawings', 'Mixed Media', 'Digital Art']
        },
        {
          id: 'photography',
          name: 'Photography',
          items: ['Fine Art Prints', 'Vintage Photos', 'Digital Downloads']
        },
        {
          id: 'collectibles',
          name: 'Collectibles',
          items: ['Vintage Items', 'Antiques', 'Memorabilia', 'Coins & Stamps']
        }
      ]
    },
    {
      id: 'craft-supplies',
      name: 'Craft Supplies & Tools',
      icon: '✂️',
      subcategories: [
        {
          id: 'fabric-fiber',
          name: 'Fabric & Fiber',
          items: ['Cotton Fabric', 'Wool', 'Yarn', 'Vintage Textiles']
        },
        {
          id: 'beading-jewelry',
          name: 'Beading & Jewelry Making',
          items: ['Beads', 'Wire', 'Findings', 'Tools']
        },
        {
          id: 'scrapbooking',
          name: 'Scrapbooking & Paper',
          items: ['Paper', 'Stickers', 'Albums', 'Embellishments']
        }
      ]
    },
    {
      id: 'wedding-party',
      name: 'Weddings & Party',
      icon: '💒',
      subcategories: [
        {
          id: 'wedding-decor',
          name: 'Wedding Decorations',
          items: ['Custom Signs', 'Centerpieces', 'Favors', 'Invitations']
        },
        {
          id: 'party-supplies',
          name: 'Party Supplies',
          items: ['Custom Banners', 'Cake Toppers', 'Photo Props', 'Decorations']
        }
      ]
    },
    {
      id: 'toys-games',
      name: 'Toys & Games',
      icon: '🧸',
      subcategories: [
        {
          id: 'handmade-toys',
          name: 'Handmade Toys',
          items: ['Wooden Toys', 'Stuffed Animals', 'Educational Toys', 'Baby Toys']
        },
        {
          id: 'vintage-games',
          name: 'Vintage Games',
          items: ['Board Games', 'Card Games', 'Puzzles', 'Classic Toys']
        }
      ]
    },
    {
      id: 'pet-supplies',
      name: 'Pet Supplies',
      icon: '�',
      subcategories: [
        {
          id: 'pet-accessories',
          name: 'Pet Accessories',
          items: ['Collars & Leashes', 'Pet Beds', 'Custom Pet Items', 'Pet Clothing']
        },
        {
          id: 'pet-toys',
          name: 'Pet Toys',
          items: ['Handmade Toys', 'Natural Treats', 'Training Supplies']
        }
      ]
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={`/category/${category.id}`}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap group"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-wowktm-primary">
                  {category.name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-wowktm-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega Menu */}
              <AnimatePresence>
                {hoveredCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-screen max-w-4xl bg-white border border-gray-200 shadow-xl rounded-lg mt-1 z-50"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-8">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id}>
                            <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                              {subcategory.name}
                            </h3>
                            <ul className="space-y-2">
                              {subcategory.items.map((item, index) => (
                                <li key={index}>
                                  <Link
                                    to={`/category/${category.id}/${subcategory.id}?item=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-600 hover:text-wowktm-primary transition-colors text-sm block py-1"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Brands or Promotions */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Featured in {category.name}:</span>
                            <div className="flex items-center space-x-3">
                              <span className="px-3 py-1 bg-wowktm-primary bg-opacity-10 text-wowktm-primary rounded-full text-xs font-medium">
                                Best Sellers
                              </span>
                              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                On Sale
                              </span>
                              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                New Arrivals
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/category/${category.id}`}
                            className="text-wowktm-primary text-sm font-medium hover:underline"
                          >
                            View All →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Special Categories */}
          <div className="flex items-center space-x-6 border-l border-gray-200 pl-8">
            <Link
              to="/deals"
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <span className="text-lg">🔥</span>
              <span className="font-medium">Today's Deals</span>
            </Link>
            <Link
              to="/flash-deals"
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <span className="text-lg">⚡</span>
              <span className="font-medium">Flash Sale</span>
            </Link>
            <Link
              to="/new-arrivals"
              className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-lg">✨</span>
              <span className="font-medium">New Arrivals</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
