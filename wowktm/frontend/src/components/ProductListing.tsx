import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  seller: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  isHandmade: boolean;
  isVintage: boolean;
  isCustomizable: boolean;
  materials: string[];
  shipsFrom: string;
  processedIn: string;
  freeShipping: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  featured?: boolean;
}

interface ProductListingProps {
  category?: string;
  searchQuery?: string;
  filters?: {
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
    sortBy: string;
    materials: string[];
    shipsFrom: string;
    isHandmade: boolean;
    isVintage: boolean;
    isCustomizable: boolean;
  };
}

const ProductListing: React.FC<ProductListingProps> = ({ category, searchQuery, filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const productsPerPage = 24;

  const { addItem } = useCart();
  const { showToast } = useToast();

  // Comprehensive Etsy-style product database
  const allProducts: Product[] = [
    // Jewelry & Accessories
    {
      id: 'j001',
      name: 'Handmade Sterling Silver Moon Phase Necklace',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'MoonCraftStudio',
      rating: 4.9,
      reviews: 847,
      badge: 'Bestseller',
      inStock: true,
      category: 'Jewelry & Accessories',
      subcategory: 'Necklaces',
      description: 'Handcrafted sterling silver necklace featuring detailed moon phases. Each piece is unique and made to order.',
      tags: ['handmade', 'sterling silver', 'moon', 'celestial', 'bohemian'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Sterling Silver', 'Chain'],
      shipsFrom: 'Portland, OR',
      processedIn: '1-3 business days',
      freeShipping: true,
      bestseller: true,
      onSale: true
    },
    {
      id: 'j002',
      name: 'Vintage Art Deco Emerald Ring',
      price: 345.00,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'VintageGemsCollective',
      rating: 4.8,
      reviews: 234,
      badge: 'Vintage',
      inStock: true,
      category: 'Jewelry & Accessories',
      subcategory: 'Rings',
      description: 'Stunning 1920s Art Deco emerald ring with intricate platinum setting. Authenticated vintage piece.',
      tags: ['vintage', '1920s', 'art deco', 'emerald', 'platinum'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Platinum', 'Emerald', 'Diamond Accents'],
      shipsFrom: 'New York, NY',
      processedIn: '1-2 business days',
      freeShipping: true,
      featured: true
    },
    {
      id: 'j003',
      name: 'Custom Wire Wrapped Crystal Pendant',
      price: 125.50,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'CrystalHealingCraft',
      rating: 4.7,
      reviews: 456,
      inStock: true,
      category: 'Jewelry & Accessories',
      subcategory: 'Pendants',
      description: 'Beautiful wire-wrapped crystal pendant. Choose your crystal for personalized healing properties.',
      tags: ['crystal', 'wire wrapped', 'healing', 'custom', 'spiritual'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Copper Wire', 'Natural Crystals'],
      shipsFrom: 'Boulder, CO',
      processedIn: '3-5 business days',
      freeShipping: false,
      newArrival: true
    },
    {
      id: 'j004',
      name: 'Handcrafted Leather Bracelet with Compass',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'AdventureLeatherCo',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      category: 'Jewelry & Accessories',
      subcategory: 'Bracelets',
      description: 'Rugged leather bracelet with working compass charm. Perfect for outdoor enthusiasts.',
      tags: ['leather', 'compass', 'adventure', 'outdoor', 'rustic'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Genuine Leather', 'Brass Compass', 'Stainless Steel'],
      shipsFrom: 'Montana',
      processedIn: '1-3 business days',
      freeShipping: false
    },

    // Clothing & Shoes
    {
      id: 'c001',
      name: 'Vintage 1970s Bohemian Maxi Dress',
      price: 78.99,
      originalPrice: 95.00,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'VintageBohoCloset',
      rating: 4.8,
      reviews: 123,
      badge: 'Vintage',
      inStock: true,
      category: 'Clothing & Shoes',
      subcategory: 'Dresses',
      description: 'Authentic 1970s bohemian maxi dress with bell sleeves and paisley print. Size Medium.',
      tags: ['vintage', '1970s', 'bohemian', 'maxi dress', 'bell sleeves'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Cotton', 'Polyester Blend'],
      shipsFrom: 'San Francisco, CA',
      processedIn: '1-2 business days',
      freeShipping: true,
      onSale: true
    },
    {
      id: 'c002',
      name: 'Handmade Alpaca Wool Sweater',
      price: 165.00,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'AndesMountainKnits',
      rating: 4.9,
      reviews: 67,
      badge: 'Handmade',
      inStock: true,
      category: 'Clothing & Shoes',
      subcategory: 'Sweaters',
      description: 'Luxuriously soft alpaca wool sweater, hand-knitted by artisans in Peru. Custom sizing available.',
      tags: ['alpaca wool', 'handmade', 'peru', 'luxury', 'warm'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['100% Alpaca Wool'],
      shipsFrom: 'Lima, Peru',
      processedIn: '2-4 weeks',
      freeShipping: true,
      featured: true
    },
    {
      id: 'c003',
      name: 'Custom Embroidered Denim Jacket',
      price: 89.50,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'CustomStitchStudio',
      rating: 4.7,
      reviews: 298,
      inStock: true,
      category: 'Clothing & Shoes',
      subcategory: 'Jackets',
      description: 'Vintage denim jacket with custom embroidery. Choose your design or send us your own artwork.',
      tags: ['denim', 'embroidery', 'custom', 'vintage', 'personalized'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Denim', 'Embroidery Thread'],
      shipsFrom: 'Austin, TX',
      processedIn: '1-2 weeks',
      freeShipping: false,
      bestseller: true
    },
    {
      id: 'c004',
      name: 'Handcrafted Leather Ankle Boots',
      price: 220.00,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'ArtisanLeatherworks',
      rating: 4.8,
      reviews: 156,
      badge: 'Handmade',
      inStock: true,
      category: 'Clothing & Shoes',
      subcategory: 'Shoes',
      description: 'Hand-stitched leather ankle boots made from premium Italian leather. Built to last a lifetime.',
      tags: ['leather', 'handmade', 'boots', 'italian leather', 'durable'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Italian Leather', 'Vibram Sole'],
      shipsFrom: 'Florence, Italy',
      processedIn: '3-4 weeks',
      freeShipping: true,
      featured: true
    },

    // Home & Living
    {
      id: 'h001',
      name: 'Handmade Ceramic Vase Collection',
      price: 125.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'ClayArtStudio',
      rating: 4.9,
      reviews: 234,
      badge: 'Handmade',
      inStock: true,
      category: 'Home & Living',
      subcategory: 'Vases',
      description: 'Set of 3 handmade ceramic vases with unique glazing. Each piece is one-of-a-kind.',
      tags: ['ceramic', 'handmade', 'vases', 'home decor', 'pottery'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Ceramic', 'Glaze'],
      shipsFrom: 'Portland, OR',
      processedIn: '1-2 weeks',
      freeShipping: true,
      bestseller: true
    },
    {
      id: 'h002',
      name: 'Macrame Wall Hanging with Crystals',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'BohoHomeDesigns',
      rating: 4.7,
      reviews: 189,
      inStock: true,
      category: 'Home & Living',
      subcategory: 'Wall Decor',
      description: 'Beautiful macrame wall hanging featuring natural crystals and driftwood. Bohemian style.',
      tags: ['macrame', 'crystals', 'bohemian', 'wall hanging', 'natural'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Cotton Cord', 'Natural Crystals', 'Driftwood'],
      shipsFrom: 'Santa Fe, NM',
      processedIn: '3-5 business days',
      freeShipping: false,
      newArrival: true
    },
    {
      id: 'h003',
      name: 'Vintage Mid-Century Coffee Table',
      price: 450.00,
      originalPrice: 650.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'ModCenturyFinds',
      rating: 4.8,
      reviews: 67,
      badge: 'Vintage',
      inStock: true,
      category: 'Home & Living',
      subcategory: 'Furniture',
      description: 'Authentic 1960s walnut coffee table with hairpin legs. Professionally restored.',
      tags: ['vintage', 'mid-century', 'walnut', 'coffee table', '1960s'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Walnut Wood', 'Steel Legs'],
      shipsFrom: 'Los Angeles, CA',
      processedIn: '3-5 business days',
      freeShipping: true,
      onSale: true,
      featured: true
    },
    {
      id: 'h004',
      name: 'Hand-Carved Wooden Serving Board',
      price: 85.50,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'WoodcraftArtisans',
      rating: 4.9,
      reviews: 456,
      badge: 'Handmade',
      inStock: true,
      category: 'Home & Living',
      subcategory: 'Kitchen & Dining',
      description: 'Large serving board hand-carved from sustainable hardwood. Perfect for entertaining.',
      tags: ['wood', 'handmade', 'serving board', 'sustainable', 'kitchen'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Hardwood', 'Food-Safe Oil'],
      shipsFrom: 'Vermont',
      processedIn: '1-2 weeks',
      freeShipping: false,
      bestseller: true
    },

    // Art & Collectibles
    {
      id: 'a001',
      name: 'Original Watercolor Landscape Painting',
      price: 275.00,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'NatureArtStudio',
      rating: 4.9,
      reviews: 89,
      badge: 'Original Art',
      inStock: true,
      category: 'Art & Collectibles',
      subcategory: 'Paintings',
      description: 'Original watercolor painting of mountain landscape. Signed and dated by the artist.',
      tags: ['watercolor', 'landscape', 'original', 'mountain', 'nature'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: false,
      materials: ['Watercolor Paint', 'Watercolor Paper'],
      shipsFrom: 'Asheville, NC',
      processedIn: '1-3 business days',
      freeShipping: true,
      featured: true
    },
    {
      id: 'a002',
      name: 'Vintage 1960s Record Collection',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'VinylVaultCollector',
      rating: 4.7,
      reviews: 234,
      badge: 'Vintage',
      inStock: true,
      category: 'Art & Collectibles',
      subcategory: 'Music',
      description: 'Curated collection of 1960s vinyl records including The Beatles, Bob Dylan, and more classics.',
      tags: ['vinyl', '1960s', 'beatles', 'bob dylan', 'vintage music'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Vinyl Records'],
      shipsFrom: 'Detroit, MI',
      processedIn: '1-2 business days',
      freeShipping: true,
      bestseller: true
    },
    {
      id: 'a003',
      name: 'Hand-Blown Glass Sculpture',
      price: 320.00,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'GlassArtMasters',
      rating: 4.8,
      reviews: 67,
      badge: 'Handmade',
      inStock: true,
      category: 'Art & Collectibles',
      subcategory: 'Sculpture',
      description: 'Unique hand-blown glass sculpture with swirling colors. Each piece is completely unique.',
      tags: ['glass', 'sculpture', 'handmade', 'art', 'unique'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: false,
      materials: ['Borosilicate Glass'],
      shipsFrom: 'Venice, Italy',
      processedIn: '2-3 weeks',
      freeShipping: true,
      featured: true
    },

    // Wedding & Party
    {
      id: 'w001',
      name: 'Custom Wedding Invitation Suite',
      price: 150.00,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'ElegantPaperDesigns',
      rating: 4.9,
      reviews: 345,
      badge: 'Custom',
      inStock: true,
      category: 'Wedding & Party',
      subcategory: 'Invitations',
      description: 'Beautiful custom wedding invitation suite with RSVP cards and envelopes. Fully customizable.',
      tags: ['wedding', 'invitations', 'custom', 'elegant', 'paper'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Premium Paper', 'Gold Foil'],
      shipsFrom: 'Boston, MA',
      processedIn: '1-2 weeks',
      freeShipping: false,
      bestseller: true
    },
    {
      id: 'w002',
      name: 'Rustic Wedding Centerpieces Set of 6',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'RusticWeddingDecor',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      category: 'Wedding & Party',
      subcategory: 'Decorations',
      description: 'Set of 6 rustic centerpieces with mason jars, burlap, and dried flowers. Perfect for country weddings.',
      tags: ['rustic', 'centerpieces', 'mason jars', 'burlap', 'country'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Mason Jars', 'Burlap', 'Dried Flowers'],
      shipsFrom: 'Nashville, TN',
      processedIn: '3-5 business days',
      freeShipping: true,
      newArrival: true
    },

    // Toys & Games
    {
      id: 't001',
      name: 'Handcrafted Wooden Train Set',
      price: 125.50,
      image: 'https://images.unsplash.com/photo-1558877385-161e9d35d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1558877385-161e9d35d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'WoodenToyCrafters',
      rating: 4.8,
      reviews: 234,
      badge: 'Handmade',
      inStock: true,
      category: 'Toys & Entertainment',
      subcategory: 'Toys',
      description: 'Beautiful handcrafted wooden train set with locomotive and 5 cars. Safe for children 3+.',
      tags: ['wooden', 'train', 'handmade', 'children', 'educational'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Solid Wood', 'Non-toxic Paint'],
      shipsFrom: 'Vermont',
      processedIn: '1-2 weeks',
      freeShipping: false,
      bestseller: true
    },
    {
      id: 't002',
      name: 'Vintage Board Game Collection',
      price: 75.00,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'RetroGameCollector',
      rating: 4.6,
      reviews: 89,
      badge: 'Vintage',
      inStock: true,
      category: 'Toys & Entertainment',
      subcategory: 'Games',
      description: 'Collection of classic board games from the 1970s-80s including Monopoly, Scrabble, and Risk.',
      tags: ['vintage', 'board games', '1970s', '1980s', 'classic'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Cardboard', 'Plastic Pieces'],
      shipsFrom: 'Chicago, IL',
      processedIn: '1-2 business days',
      freeShipping: false
    },

    // Pet Supplies
    {
      id: 'p001',
      name: 'Custom Pet Portrait Oil Painting',
      price: 180.00,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'PetPortraitArtist',
      rating: 4.9,
      reviews: 456,
      badge: 'Custom',
      inStock: true,
      category: 'Pet Supplies',
      subcategory: 'Art',
      description: 'Custom oil painting portrait of your beloved pet. Send us a photo and well create a masterpiece.',
      tags: ['custom', 'pet portrait', 'oil painting', 'personalized', 'art'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Oil Paint', 'Canvas'],
      shipsFrom: 'Philadelphia, PA',
      processedIn: '2-4 weeks',
      freeShipping: true,
      featured: true
    },
    {
      id: 'p002',
      name: 'Handmade Leather Dog Collar',
      price: 35.99,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
      ],
      seller: 'PetLeatherGoods',
      rating: 4.7,
      reviews: 234,
      badge: 'Handmade',
      inStock: true,
      category: 'Pet Supplies',
      subcategory: 'Accessories',
      description: 'Premium leather dog collar with brass hardware. Available in multiple sizes and colors.',
      tags: ['leather', 'dog collar', 'handmade', 'brass', 'premium'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: true,
      materials: ['Genuine Leather', 'Brass Hardware'],
      shipsFrom: 'Denver, CO',
      processedIn: '3-5 business days',
      freeShipping: false,
      bestseller: true
    },

    // Additional products for better filtering and pagination
    {
      id: 'j005',
      name: 'Vintage Pearl Drop Earrings',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'],
      seller: 'ClassicPearlCo',
      rating: 4.8,
      reviews: 123,
      badge: 'Vintage',
      inStock: true,
      category: 'Jewelry & Accessories',
      subcategory: 'Earrings',
      description: '1950s vintage pearl drop earrings with gold-filled posts. Elegant and timeless.',
      tags: ['vintage', 'pearl', 'earrings', '1950s', 'elegant'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Natural Pearls', 'Gold-Filled Posts'],
      shipsFrom: 'Charleston, SC',
      processedIn: '1-2 business days',
      freeShipping: false
    },
    {
      id: 'h005',
      name: 'Handwoven Moroccan Rug',
      price: 380.00,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'],
      seller: 'MoroccanRugCo',
      rating: 4.9,
      reviews: 89,
      badge: 'Handmade',
      inStock: true,
      category: 'Home & Living',
      subcategory: 'Rugs',
      description: 'Authentic Moroccan rug handwoven by Berber artisans. Natural wool with traditional patterns.',
      tags: ['moroccan', 'rug', 'handwoven', 'berber', 'wool'],
      isHandmade: true,
      isVintage: false,
      isCustomizable: false,
      materials: ['100% Wool'],
      shipsFrom: 'Marrakech, Morocco',
      processedIn: '2-3 weeks',
      freeShipping: true,
      featured: true
    },
    {
      id: 'c005',
      name: 'Vintage Band T-Shirt Collection',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'],
      seller: 'VintageRockTees',
      rating: 4.6,
      reviews: 345,
      badge: 'Vintage',
      inStock: true,
      category: 'Clothing & Shoes',
      subcategory: 'T-Shirts',
      description: 'Authentic vintage band t-shirts from the 80s and 90s. Various sizes and bands available.',
      tags: ['vintage', 'band tshirt', '1980s', '1990s', 'rock'],
      isHandmade: false,
      isVintage: true,
      isCustomizable: false,
      materials: ['Cotton'],
      shipsFrom: 'Seattle, WA',
      processedIn: '1-2 business days',
      freeShipping: false,
      bestseller: true
    }
    // Add more products as needed...
  ];

  useEffect(() => {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = [...allProducts];

      // Apply category filter
      if (category && category !== 'All Categories') {
        filteredProducts = filteredProducts.filter(product => 
          product.category === category
        );
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query)) ||
          product.seller.toLowerCase().includes(query)
        );
      }

      // Apply additional filters
      if (filters) {
        if (filters.priceRange) {
          filteredProducts = filteredProducts.filter(product =>
            product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
          );
        }

        if (filters.rating > 0) {
          filteredProducts = filteredProducts.filter(product =>
            product.rating >= filters.rating
          );
        }

        if (filters.inStock) {
          filteredProducts = filteredProducts.filter(product => product.inStock);
        }

        if (filters.isHandmade) {
          filteredProducts = filteredProducts.filter(product => product.isHandmade);
        }

        if (filters.isVintage) {
          filteredProducts = filteredProducts.filter(product => product.isVintage);
        }

        if (filters.isCustomizable) {
          filteredProducts = filteredProducts.filter(product => product.isCustomizable);
        }

        // Sort products
        switch (filters.sortBy) {
          case 'price_low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
            break;
          default: // relevance
            filteredProducts.sort((a, b) => {
              let scoreA = 0, scoreB = 0;
              if (a.featured) scoreA += 3;
              if (a.bestseller) scoreA += 2;
              if (a.newArrival) scoreA += 1;
              if (b.featured) scoreB += 3;
              if (b.bestseller) scoreB += 2;
              if (b.newArrival) scoreB += 1;
              return scoreB - scoreA;
            });
        }
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category, searchQuery, filters]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: parseInt(product.id.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 10000),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: product.seller,
      shipping: product.freeShipping ? "FREE shipping" : "Standard shipping",
      inStock: product.inStock,
      category: product.category,
      description: product.description,
      quantity: 1
    });
    showToast(`${product.name} added to cart!`, 'success');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wowktm-primary"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {category || 'All Products'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6' : 'space-y-4'}>
        <AnimatePresence>
          {displayedProducts.map((product, index) => (
            <div key={product.id} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col ${
                  viewMode === 'list' ? 'flex-row h-auto' : ''
                }`}>
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'w-full h-48'}`}>
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={224}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  {product.badge && (
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      product.badge === 'Bestseller' ? 'bg-orange-100 text-orange-800' :
                      product.badge === 'Vintage' ? 'bg-purple-100 text-purple-800' :
                      product.badge === 'Handmade' ? 'bg-green-100 text-green-800' :
                      product.badge === 'Custom' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Sale badge */}
                {product.onSale && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                      SALE
                    </span>
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <svg
                    className={`w-5 h-5 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick shop overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-wowktm-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-wowktm-secondary transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className={`p-4 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-wowktm-primary min-h-[2.5rem] overflow-hidden" 
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.25rem'
                        }}>
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">by {product.seller}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 min-h-[1.5rem]">
                    {product.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex items-center space-x-2 mb-3 text-xs min-h-[1.5rem]">
                    {product.isHandmade && (
                      <span className="flex items-center text-green-600">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Handmade
                      </span>
                    )}
                    {product.freeShipping && (
                      <span className="flex items-center text-blue-600">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" />
                        </svg>
                        Free shipping
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom section - Price and shipping info */}
                <div className="mt-auto">
                  {/* Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {viewMode === 'list' && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-wowktm-primary text-white px-4 py-2 rounded-lg hover:bg-wowktm-secondary transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Ships from */}
                  <p className="text-xs text-gray-500">
                    Ships from {product.shipsFrom} • {product.processedIn}
                  </p>
                </div>
                </div>
              </div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-wowktm-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* No results */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 3H9a2 2 0 00-2 2v1.293A7.962 7.962 0 0012 4a7.962 7.962 0 005 1.293V5a2 2 0 00-2-2z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
