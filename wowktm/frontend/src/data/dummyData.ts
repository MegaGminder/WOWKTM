// Dummy data for frontend-only deployment
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  createdAt: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    location: string;
    avatar?: string;
    bio?: string;
    totalSales?: number;
    responseTime?: string;
    joinedDate?: string;
  };
  delivery?: {
    standardDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    expressDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    overnightDelivery: {
      available: boolean;
      cost: number;
      estimatedDays: string;
    };
    pickupLocation?: string;
    freeShippingThreshold?: number;
  };
  materials?: string[];
  dimensions?: string;
  weight?: string;
  policies?: {
    returns: string;
    exchanges: string;
    customization: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  subcategories: {
    id: string;
    name: string;
    productCount: number;
  }[];
}

// Dummy Products Data
export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Nepali Dhaka Topi',
    description: 'Traditional Nepali cap made from finest Dhaka fabric. Perfect for cultural occasions and daily wear.',
    price: 25.99,
    originalPrice: 35.99,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'
    ],
    category: 'Clothing',
    subcategory: 'Traditional Wear',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockQuantity: 15,
    tags: ['traditional', 'handmade', 'nepali', 'cap'],
    createdAt: '2024-01-15T10:00:00Z',
    seller: {
      id: 'seller1',
      name: 'Kathmandu Crafts',
      rating: 4.9,
      location: 'Kathmandu, Nepal',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      bio: 'Traditional Nepali craft makers with 3 generations of experience',
      totalSales: 1250,
      responseTime: 'Usually responds within 2 hours',
      joinedDate: '2019'
    },
    delivery: {
      standardDelivery: {
        available: true,
        cost: 5.99,
        estimatedDays: '5-7 business days'
      },
      expressDelivery: {
        available: true,
        cost: 12.99,
        estimatedDays: '2-3 business days'
      },
      overnightDelivery: {
        available: false,
        cost: 0,
        estimatedDays: 'Not available'
      },
      freeShippingThreshold: 50,
      pickupLocation: 'Kathmandu Valley'
    },
    materials: ['Pure Dhaka Fabric', 'Cotton Lining', 'Traditional Dyes'],
    dimensions: '22-24 inches circumference, adjustable',
    weight: '150g',
    policies: {
      returns: '30-day return policy for unused items',
      exchanges: 'Free size exchanges within 14 days',
      customization: 'Custom colors and sizing available on request'
    }
  },
  {
    id: '2',
    name: 'Singing Bowl - Meditation Set',
    description: 'Authentic Tibetan singing bowl handcrafted by local artisans. Includes wooden striker and cushion.',
    price: 89.99,
    originalPrice: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600'
    ],
    category: 'Spiritual',
    subcategory: 'Meditation',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 8,
    tags: ['meditation', 'spiritual', 'handcrafted', 'tibetan'],
    createdAt: '2024-01-20T14:30:00Z',
    seller: {
      id: 'seller2',
      name: 'Himalayan Sounds',
      rating: 4.8,
      location: 'Pokhara, Nepal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      bio: 'Specializing in authentic Tibetan singing bowls and meditation instruments',
      totalSales: 890,
      responseTime: 'Usually responds within 4 hours',
      joinedDate: '2020'
    },
    delivery: {
      standardDelivery: {
        available: true,
        cost: 8.99,
        estimatedDays: '7-10 business days'
      },
      expressDelivery: {
        available: true,
        cost: 18.99,
        estimatedDays: '3-5 business days'
      },
      overnightDelivery: {
        available: true,
        cost: 35.99,
        estimatedDays: '1-2 business days'
      },
      freeShippingThreshold: 100,
      pickupLocation: 'Pokhara Region'
    },
    materials: ['Brass Alloy', 'Natural Wood', 'Cotton Cushion'],
    dimensions: '6 inches diameter, 3 inches height',
    weight: '800g',
    policies: {
      returns: 'Sound quality guarantee - 30 day returns',
      exchanges: 'Different sizes available for exchange',
      customization: 'Custom engravings and tuning available'
    }
  },
  {
    id: '3',
    name: 'Pashmina Shawl - Royal Blue',
    description: 'Luxurious cashmere pashmina shawl woven from the finest goat wool. Soft, warm, and elegant.',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'
    ],
    category: 'Accessories',
    subcategory: 'Accessories',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 12,
    tags: ['pashmina', 'cashmere', 'luxury', 'shawl'],
    createdAt: '2024-01-25T09:15:00Z',
    seller: {
      id: 'seller3',
      name: 'Mountain Weavers',
      rating: 4.6,
      location: 'Bhaktapur, Nepal'
    }
  },
  {
    id: '4',
    name: 'Wooden Prayer Wheel',
    description: 'Traditional Tibetan prayer wheel made from aged wood with intricate carvings and mantras.',
    price: 45.50,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    ],
    category: 'Spiritual',
    subcategory: 'Prayer Items',
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 20,
    tags: ['prayer', 'tibetan', 'wooden', 'spiritual'],
    createdAt: '2024-02-01T11:45:00Z',
    seller: {
      id: 'seller4',
      name: 'Sacred Crafts',
      rating: 4.7,
      location: 'Lumbini, Nepal'
    }
  },
  {
    id: '5',
    name: 'Handwoven Dhurrie Rug',
    description: 'Beautiful geometric pattern dhurrie rug handwoven by skilled artisans. Perfect for modern homes.',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
      'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=500'
    ],
    category: 'Home & Living',
    subcategory: 'Rugs',
    rating: 4.5,
    reviewCount: 43,
    inStock: true,
    stockQuantity: 6,
    tags: ['rug', 'handwoven', 'geometric', 'home-decor'],
    createdAt: '2024-02-10T16:20:00Z',
    seller: {
      id: 'seller5',
      name: 'Himalayan Textiles',
      rating: 4.5,
      location: 'Patan, Nepal'
    }
  },
  {
    id: '6',
    name: 'Kukri Knife - Ceremonial',
    description: 'Traditional Nepali kukri knife with ornate handle. Perfect for collectors and cultural enthusiasts.',
    price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=500',
    images: [
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=500'
    ],
    category: 'Art & Collectibles',
    subcategory: 'Traditional Weapons',
    rating: 4.8,
    reviewCount: 91,
    inStock: true,
    stockQuantity: 10,
    tags: ['kukri', 'traditional', 'ceremonial', 'collectible'],
    createdAt: '2024-02-15T13:10:00Z',
    seller: {
      id: 'seller6',
      name: 'Nepal Steel Works',
      rating: 4.9,
      location: 'Dharan, Nepal'
    }
  },
  {
    id: '7',
    name: 'Handmade Pottery Vase',
    description: 'Beautiful terracotta vase with traditional Nepali patterns. Perfect for home decoration.',
    price: 42.99,
    originalPrice: 55.99,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500'
    ],
    category: 'Home & Living',
    subcategory: 'Pottery',
    rating: 4.6,
    reviewCount: 73,
    inStock: true,
    stockQuantity: 18,
    tags: ['pottery', 'vase', 'handmade', 'terracotta'],
    createdAt: '2024-02-20T10:30:00Z',
    seller: {
      id: 'seller7',
      name: 'Bhaktapur Pottery',
      rating: 4.7,
      location: 'Bhaktapur, Nepal'
    }
  },
  {
    id: '8',
    name: 'Silver Filigree Earrings',
    description: 'Intricate silver filigree earrings crafted by master artisans. Lightweight and elegant.',
    price: 68.50,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500'
    ],
    category: 'Jewelry',
    subcategory: 'Earrings',
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 25,
    tags: ['silver', 'filigree', 'earrings', 'handcrafted'],
    createdAt: '2024-02-25T15:45:00Z',
    seller: {
      id: 'seller8',
      name: 'Newari Silversmiths',
      rating: 4.8,
      location: 'Patan, Nepal'
    }
  },
  {
    id: '9',
    name: 'Thangka Painting - Buddha',
    description: 'Traditional Tibetan thangka painting of Buddha. Hand-painted on canvas with natural pigments.',
    price: 299.99,
    originalPrice: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    ],
    category: 'Art & Collectibles',
    subcategory: 'Paintings',
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    stockQuantity: 5,
    tags: ['thangka', 'buddha', 'painting', 'tibetan'],
    createdAt: '2024-03-01T12:15:00Z',
    seller: {
      id: 'seller9',
      name: 'Himalayan Art Studio',
      rating: 4.9,
      location: 'Kathmandu, Nepal'
    }
  },
  {
    id: '10',
    name: 'Lokta Paper Journal',
    description: 'Handmade journal with traditional Lokta paper cover. Perfect for writing and sketching.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'
    ],
    category: 'Paper & Party Supplies',
    subcategory: 'Journals',
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 30,
    tags: ['lokta', 'paper', 'journal', 'handmade'],
    createdAt: '2024-03-05T09:20:00Z',
    seller: {
      id: 'seller10',
      name: 'Paper Craft Nepal',
      rating: 4.6,
      location: 'Kathmandu, Nepal'
    }
  },
  {
    id: '11',
    name: 'Handwoven Wool Blanket',
    description: 'Soft and warm wool blanket handwoven with traditional patterns. Perfect for cold nights.',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'
    ],
    category: 'Home & Living',
    subcategory: 'Blankets',
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    stockQuantity: 12,
    tags: ['wool', 'blanket', 'handwoven', 'warm'],
    createdAt: '2024-03-10T14:30:00Z',
    seller: {
      id: 'seller11',
      name: 'Mountain Textiles',
      rating: 4.8,
      location: 'Pokhara, Nepal'
    }
  },
  {
    id: '12',
    name: 'Brass Incense Holder',
    description: 'Ornate brass incense holder with traditional engravings. Includes wooden base.',
    price: 35.50,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'
    ],
    category: 'Bath & Beauty',
    subcategory: 'Incense',
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    stockQuantity: 22,
    tags: ['brass', 'incense', 'holder', 'spiritual'],
    createdAt: '2024-03-12T11:45:00Z',
    seller: {
      id: 'seller12',
      name: 'Sacred Metals',
      rating: 4.7,
      location: 'Bhaktapur, Nepal'
    }
  },
  {
    id: '13',
    name: 'Bamboo Wind Chimes',
    description: 'Natural bamboo wind chimes with soothing sounds. Handcrafted for outdoor decoration.',
    price: 28.99,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500'
    ],
    category: 'Home Decor',
    subcategory: 'Garden',
    rating: 4.4,
    reviewCount: 45,
    inStock: true,
    stockQuantity: 16,
    tags: ['bamboo', 'wind-chimes', 'outdoor', 'decoration'],
    createdAt: '2024-03-15T16:20:00Z',
    seller: {
      id: 'seller13',
      name: 'Eco Craft Nepal',
      rating: 4.5,
      location: 'Chitwan, Nepal'
    }
  },
  {
    id: '14',
    name: 'Handcarved Wooden Mask',
    description: 'Traditional Nepali wooden mask with intricate carvings. Perfect for wall decoration.',
    price: 89.99,
    originalPrice: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0403e6e7e44?w=500',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0403e6e7e44?w=500'
    ],
    category: 'Art',
    subcategory: 'Sculptures',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 8,
    tags: ['wooden', 'mask', 'carving', 'traditional'],
    createdAt: '2024-03-18T13:10:00Z',
    seller: {
      id: 'seller14',
      name: 'Wood Artisans Guild',
      rating: 4.9,
      location: 'Patan, Nepal'
    }
  },
  {
    id: '15',
    name: 'Yak Wool Scarf',
    description: 'Luxurious scarf made from authentic yak wool. Incredibly soft and warm.',
    price: 95.00,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'
    ],
    category: 'Fashion',
    subcategory: 'Accessories',
    rating: 4.9,
    reviewCount: 101,
    inStock: true,
    stockQuantity: 14,
    tags: ['yak-wool', 'scarf', 'luxury', 'warm'],
    createdAt: '2024-03-20T10:45:00Z',
    seller: {
      id: 'seller15',
      name: 'Highland Fibers',
      rating: 4.8,
      location: 'Mustang, Nepal'
    }
  },
  {
    id: '16',
    name: 'Stone Buddha Statue',
    description: 'Hand-carved stone Buddha statue for meditation spaces. Made from local Himalayan stone.',
    price: 185.00,
    originalPrice: 225.00,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    ],
    category: 'Spiritual',
    subcategory: 'Statues',
    rating: 4.9,
    reviewCount: 83,
    inStock: true,
    stockQuantity: 6,
    tags: ['buddha', 'statue', 'stone', 'meditation'],
    createdAt: '2024-03-22T15:30:00Z',
    seller: {
      id: 'seller16',
      name: 'Stone Sculptors',
      rating: 4.9,
      location: 'Kathmandu, Nepal'
    }
  },
  {
    id: '17',
    name: 'Copper Water Vessel',
    description: 'Traditional copper water vessel with health benefits. Handcrafted with beautiful engravings.',
    price: 55.99,
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500',
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500'
    ],
    category: 'Kitchenware',
    subcategory: 'Vessels',
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    stockQuantity: 20,
    tags: ['copper', 'water', 'vessel', 'health'],
    createdAt: '2024-03-25T12:15:00Z',
    seller: {
      id: 'seller17',
      name: 'Copper Craft Co.',
      rating: 4.6,
      location: 'Lalitpur, Nepal'
    }
  },
  {
    id: '18',
    name: 'Hemp Backpack',
    description: 'Eco-friendly backpack made from natural hemp fibers. Durable and sustainable.',
    price: 78.50,
    originalPrice: 95.00,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    category: 'Fashion',
    subcategory: 'Bags',
    rating: 4.5,
    reviewCount: 72,
    inStock: true,
    stockQuantity: 15,
    tags: ['hemp', 'backpack', 'eco-friendly', 'sustainable'],
    createdAt: '2024-03-28T09:45:00Z',
    seller: {
      id: 'seller18',
      name: 'Eco Fashion Nepal',
      rating: 4.7,
      location: 'Kathmandu, Nepal'
    }
  },
  {
    id: '19',
    name: 'Traditional Prayer Beads',
    description: 'Authentic 108-bead mala made from rudraksha seeds. Perfect for meditation and prayer.',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    category: 'Spiritual',
    subcategory: 'Prayer Items',
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 35,
    tags: ['mala', 'prayer-beads', 'rudraksha', 'meditation'],
    createdAt: '2024-04-01T14:20:00Z',
    seller: {
      id: 'seller19',
      name: 'Sacred Seeds',
      rating: 4.8,
      location: 'Lumbini, Nepal'
    }
  },
  {
    id: '20',
    name: 'Felt Wool Slippers',
    description: 'Comfortable felt slippers made from pure wool. Perfect for indoor wear.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500'
    ],
    category: 'Fashion',
    subcategory: 'Footwear',
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 40,
    tags: ['felt', 'wool', 'slippers', 'comfortable'],
    createdAt: '2024-04-03T11:30:00Z',
    seller: {
      id: 'seller20',
      name: 'Felt Works Nepal',
      rating: 4.5,
      location: 'Pokhara, Nepal'
    }
  },
  {
    id: '21',
    name: 'Handmade Soap Set',
    description: 'Natural soap set made with organic ingredients and essential oils. Chemical-free and gentle.',
    price: 36.50,
    originalPrice: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1556909075-f3e24e28255d?w=500',
    images: [
      'https://images.unsplash.com/photo-1556909075-f3e24e28255d?w=500'
    ],
    category: 'Beauty',
    subcategory: 'Skincare',
    rating: 4.7,
    reviewCount: 124,
    inStock: true,
    stockQuantity: 28,
    tags: ['soap', 'natural', 'organic', 'essential-oils'],
    createdAt: '2024-04-05T16:45:00Z',
    seller: {
      id: 'seller21',
      name: 'Natural Beauty Nepal',
      rating: 4.6,
      location: 'Kathmandu, Nepal'
    }
  },
  {
    id: '22',
    name: 'Metallic Wall Art',
    description: 'Contemporary wall art piece made from recycled metal. Modern design with traditional elements.',
    price: 145.00,
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0403e6e7e44?w=500',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0403e6e7e44?w=500'
    ],
    category: 'Art',
    subcategory: 'Wall Art',
    rating: 4.5,
    reviewCount: 39,
    inStock: true,
    stockQuantity: 7,
    tags: ['metal', 'wall-art', 'contemporary', 'recycled'],
    createdAt: '2024-04-08T13:20:00Z',
    seller: {
      id: 'seller22',
      name: 'Modern Metal Arts',
      rating: 4.7,
      location: 'Bhaktapur, Nepal'
    }
  },
  {
    id: '23',
    name: 'Tibetan Carpet Runner',
    description: 'Authentic Tibetan carpet runner with traditional motifs. Hand-knotted with pure wool.',
    price: 289.99,
    originalPrice: 349.99,
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500'
    ],
    category: 'Home Decor',
    subcategory: 'Carpets',
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    stockQuantity: 4,
    tags: ['tibetan', 'carpet', 'runner', 'hand-knotted'],
    createdAt: '2024-04-10T10:15:00Z',
    seller: {
      id: 'seller23',
      name: 'Tibetan Weavers',
      rating: 4.9,
      location: 'Pokhara, Nepal'
    }
  },
  {
    id: '24',
    name: 'Herbal Tea Blend',
    description: 'Premium herbal tea blend with Himalayan herbs. Refreshing and medicinal properties.',
    price: 22.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    category: 'Food & Beverage',
    subcategory: 'Tea',
    rating: 4.6,
    reviewCount: 167,
    inStock: true,
    stockQuantity: 50,
    tags: ['herbal', 'tea', 'himalayan', 'medicinal'],
    createdAt: '2024-04-12T15:30:00Z',
    seller: {
      id: 'seller24',
      name: 'Mountain Tea Gardens',
      rating: 4.7,
      location: 'Ilam, Nepal'
    }
  }
];

// Dummy Categories Data
export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    description: 'Traditional and modern clothing, accessories, and jewelry',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300',
    productCount: 345,
    subcategories: [
      { id: '1a', name: 'Traditional Wear', productCount: 87 },
      { id: '1b', name: 'Accessories', productCount: 128 },
      { id: '1c', name: 'Bags', productCount: 65 },
      { id: '1d', name: 'Footwear', productCount: 65 }
    ]
  },
  {
    id: '2',
    name: 'Spiritual',
    description: 'Meditation items, prayer wheels, and spiritual artifacts',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
    productCount: 189,
    subcategories: [
      { id: '2a', name: 'Meditation', productCount: 64 },
      { id: '2b', name: 'Prayer Items', productCount: 85 },
      { id: '2c', name: 'Statues', productCount: 40 }
    ]
  },
  {
    id: '3',
    name: 'Home Decor',
    description: 'Handcrafted items to beautify your living space',
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300',
    productCount: 434,
    subcategories: [
      { id: '3a', name: 'Rugs', productCount: 85 },
      { id: '3b', name: 'Pottery', productCount: 129 },
      { id: '3c', name: 'Carpets', productCount: 76 },
      { id: '3d', name: 'Garden', productCount: 144 }
    ]
  },
  {
    id: '4',
    name: 'Collectibles',
    description: 'Unique items for collectors and enthusiasts',
    imageUrl: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=300',
    productCount: 167,
    subcategories: [
      { id: '4a', name: 'Traditional Weapons', productCount: 43 },
      { id: '4b', name: 'Antiques', productCount: 124 }
    ]
  },
  {
    id: '5',
    name: 'Art',
    description: 'Traditional and contemporary artworks',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
    productCount: 89,
    subcategories: [
      { id: '5a', name: 'Paintings', productCount: 34 },
      { id: '5b', name: 'Sculptures', productCount: 28 },
      { id: '5c', name: 'Wall Art', productCount: 27 }
    ]
  },
  {
    id: '6',
    name: 'Jewelry',
    description: 'Handcrafted jewelry and accessories',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300',
    productCount: 156,
    subcategories: [
      { id: '6a', name: 'Earrings', productCount: 67 },
      { id: '6b', name: 'Necklaces', productCount: 45 },
      { id: '6c', name: 'Bracelets', productCount: 44 }
    ]
  },
  {
    id: '7',
    name: 'Textiles',
    description: 'Traditional fabrics and woven items',
    imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300',
    productCount: 123,
    subcategories: [
      { id: '7a', name: 'Blankets', productCount: 56 },
      { id: '7b', name: 'Fabrics', productCount: 67 }
    ]
  },
  {
    id: '8',
    name: 'Kitchenware',
    description: 'Traditional cooking and serving items',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300',
    productCount: 78,
    subcategories: [
      { id: '8a', name: 'Vessels', productCount: 45 },
      { id: '8b', name: 'Utensils', productCount: 33 }
    ]
  },
  {
    id: '9',
    name: 'Beauty',
    description: 'Natural skincare and beauty products',
    imageUrl: 'https://images.unsplash.com/photo-1556909075-f3e24e28255d?w=300',
    productCount: 67,
    subcategories: [
      { id: '9a', name: 'Skincare', productCount: 45 },
      { id: '9b', name: 'Cosmetics', productCount: 22 }
    ]
  },
  {
    id: '10',
    name: 'Stationery',
    description: 'Handmade papers and writing materials',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
    productCount: 45,
    subcategories: [
      { id: '10a', name: 'Journals', productCount: 28 },
      { id: '10b', name: 'Papers', productCount: 17 }
    ]
  },
  {
    id: '11',
    name: 'Food & Beverage',
    description: 'Traditional foods and beverages',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    productCount: 89,
    subcategories: [
      { id: '11a', name: 'Tea', productCount: 56 },
      { id: '11b', name: 'Spices', productCount: 33 }
    ]
  }
];

// Mock API functions
export const mockApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const getDummyProducts = async (filters?: any) => {
  await mockApiDelay();
  let products = [...dummyProducts];
  
  if (filters?.category) {
    products = products.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
  }
  
  if (filters?.search) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
    );
  }
  
  return {
    data: products,
    pagination: {
      page: 1,
      limit: products.length,
      total: products.length,
      totalPages: 1
    }
  };
};

export const getDummyProduct = async (id: string) => {
  await mockApiDelay();
  const product = dummyProducts.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return { data: product };
};

export const getDummyCategories = async () => {
  await mockApiDelay();
  return { data: dummyCategories };
};
