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
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'
    ],
    category: 'Fashion',
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
      location: 'Kathmandu, Nepal'
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
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
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
      location: 'Pokhara, Nepal'
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
    category: 'Fashion',
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
    category: 'Home Decor',
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
    category: 'Collectibles',
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
  }
];

// Dummy Categories Data
export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    description: 'Traditional and modern clothing, accessories, and jewelry',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300',
    productCount: 145,
    subcategories: [
      { id: '1a', name: 'Traditional Wear', productCount: 67 },
      { id: '1b', name: 'Accessories', productCount: 78 }
    ]
  },
  {
    id: '2',
    name: 'Spiritual',
    description: 'Meditation items, prayer wheels, and spiritual artifacts',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
    productCount: 89,
    subcategories: [
      { id: '2a', name: 'Meditation', productCount: 34 },
      { id: '2b', name: 'Prayer Items', productCount: 55 }
    ]
  },
  {
    id: '3',
    name: 'Home Decor',
    description: 'Handcrafted items to beautify your living space',
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300',
    productCount: 234,
    subcategories: [
      { id: '3a', name: 'Rugs', productCount: 45 },
      { id: '3b', name: 'Artifacts', productCount: 189 }
    ]
  },
  {
    id: '4',
    name: 'Collectibles',
    description: 'Unique items for collectors and enthusiasts',
    imageUrl: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=300',
    productCount: 67,
    subcategories: [
      { id: '4a', name: 'Traditional Weapons', productCount: 23 },
      { id: '4b', name: 'Antiques', productCount: 44 }
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
