export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Carousel
  seller: {
    id: string;
    shopName: string;
    avatarUrl: string;
    rating: number;
  };
  category: string;
  tags: string[];
  rating: number;
  numReviews: number;
  stock: number;
  createdAt: string;
  isFeatured: boolean;
}


