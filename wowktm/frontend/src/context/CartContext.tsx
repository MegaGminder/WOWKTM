import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  seller: string;
  shipping: string;
  inStock: boolean;
  category: string;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    // Mock initial data - remove this in production
    {
      id: 1,
      name: 'Handmade Sterling Silver Necklace with Turquoise Stone',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80',
      quantity: 1,
      seller: 'ArtisanJewelry Co.',
      shipping: 'FREE shipping',
      inStock: true,
      category: 'Jewelry',
      description: 'Beautiful handcrafted necklace perfect for any occasion'
    },
    {
      id: 2,
      name: 'Vintage Leather Crossbody Bag - Brown',
      price: 145.00,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80',
      quantity: 2,
      seller: 'Vintage Treasures',
      shipping: 'Ships in 2-3 days',
      inStock: true,
      category: 'Bags & Purses',
      description: 'Authentic vintage leather bag in excellent condition'
    },
    {
      id: 3,
      name: 'Custom Portrait Digital Art Commission',
      price: 75.00,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80',
      quantity: 1,
      seller: 'Digital Art Studio',
      shipping: 'Digital delivery',
      inStock: false,
      category: 'Art',
      description: 'Personalized digital portrait from your photo'
    }
  ]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('wowktm-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('wowktm-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export type { CartItem };
