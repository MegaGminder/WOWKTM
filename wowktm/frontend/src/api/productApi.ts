import axiosClient from './axiosClient';
import { Product } from '../types/product';

// Mock data for when backend is not available
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Handmade Ceramic Vase',
    description: 'Beautiful handcrafted ceramic vase perfect for your home decor',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'handmade',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    originalPrice: 59.99,
    discount: 23,
    delivery: {
      sameDayPickup: true,
      fastDelivery: true,
      estimatedDelivery: '2-3 hours',
      pickupLocation: 'Downtown Studio'
    }
  },
  {
    id: 2,
    name: 'Vintage Leather Journal',
    description: 'Authentic vintage leather-bound journal with aged pages',
    price: 32.50,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'vintage',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    originalPrice: 45.00,
    discount: 28,
    delivery: {
      sameDayPickup: false,
      fastDelivery: true,
      estimatedDelivery: '1-2 days',
      pickupLocation: undefined
    }
  },
  {
    id: 3,
    name: 'Artisan Wood Carving Tools',
    description: 'Professional craft supplies for wood carving enthusiasts',
    price: 78.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'craft',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    originalPrice: 95.99,
    discount: 18,
    delivery: {
      sameDayPickup: true,
      fastDelivery: false,
      estimatedDelivery: '3-5 days',
      pickupLocation: 'Craft Workshop'
    }
  },
  {
    id: 4,
    name: 'Handwoven Silk Scarf',
    description: 'Luxurious handwoven silk scarf with intricate patterns',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'handmade',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    originalPrice: 120.00,
    discount: 25,
    delivery: {
      sameDayPickup: true,
      fastDelivery: true,
      estimatedDelivery: '1-3 hours',
      pickupLocation: 'Textile Gallery'
    }
  },
  {
    id: 5,
    name: 'Vintage Brass Compass',
    description: 'Antique-style brass compass perfect for collectors',
    price: 67.50,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'vintage',
    rating: 4.5,
    reviews: 74,
    inStock: true,
    originalPrice: 85.00,
    discount: 21,
    delivery: {
      sameDayPickup: false,
      fastDelivery: true,
      estimatedDelivery: '2-4 hours',
      pickupLocation: undefined
    }
  },
  {
    id: 6,
    name: 'Premium Craft Paint Set',
    description: 'High-quality acrylic paints for all your crafting projects',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'craft',
    rating: 4.4,
    reviews: 298,
    inStock: true,
    originalPrice: 42.99,
    discount: 19,
    delivery: {
      sameDayPickup: true,
      fastDelivery: true,
      estimatedDelivery: '1-2 hours',
      pickupLocation: 'Art Supply Store'
    }
  },
  {
    id: 7,
    name: 'Handmade Pottery Bowl',
    description: 'Rustic handmade pottery bowl perfect for serving',
    price: 28.75,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'handmade',
    rating: 4.6,
    reviews: 142,
    inStock: true,
    originalPrice: 35.00,
    discount: 18,
    delivery: {
      sameDayPickup: true,
      fastDelivery: false,
      estimatedDelivery: '2-3 days',
      pickupLocation: 'Pottery Studio'
    }
  },
  {
    id: 8,
    name: 'Vintage Camera Collection',
    description: 'Rare vintage camera perfect for photography enthusiasts',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=75&fm=webp',
    category: 'vintage',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    originalPrice: 320.00,
    discount: 23,
    delivery: {
      sameDayPickup: false,
      fastDelivery: true,
      estimatedDelivery: '4-6 hours',
      pickupLocation: undefined
    }
  }
];

export const getProducts = async (page: number): Promise<Product[]> => {
  try {
    const response = await axiosClient.get(`/products?page=${page}&size=8`);
    return response.data;
  } catch (error) {
    // Return mock data when backend is not available
    console.log('Backend not available, using mock data');
    
    // Simulate pagination
    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;
    return mockProducts.slice(startIndex, endIndex);
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    // Return mock data when backend is not available
    console.log('Backend not available, using mock data for product', id);
    
    // Find product in mock data
    const product = mockProducts.find(p => p.id === id);
    return product || null;
  }
};