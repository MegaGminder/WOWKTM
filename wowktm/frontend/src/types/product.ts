export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Multiple product images
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  originalPrice?: number;
  discount?: number;
  
  // Etsy-specific fields
  seller: string;
  sellerLocation?: string;
  badge?: string; // "Handmade", "Vintage", "Custom Order", "Bestseller", etc.
  isHandmade?: boolean;
  isVintage?: boolean;
  isCustomizable?: boolean;
  materials?: string[]; // e.g., ["Sterling Silver", "Natural Gemstone"]
  dimensions?: string; // e.g., "5" x 3" x 2""
  weight?: string; // e.g., "0.5 oz"
  processedIn?: string; // e.g., "1-2 business days"
  shipsFrom?: string; // e.g., "Portland, OR"
  personalizable?: boolean;
  giftWrapping?: boolean;
  storyBehind?: string; // Artisan's story about the product
  tags?: string[]; // e.g., ["boho", "minimalist", "anniversary gift"]
  occasion?: string[]; // e.g., ["Wedding", "Birthday", "Housewarming"]
  
  delivery?: {
    processingTime?: string; // e.g., "1-3 business days"
    shippingTime?: string; // e.g., "3-5 business days"
    expeditedShipping?: boolean;
    freeShipping?: boolean;
    internationalShipping?: boolean;
  };
}