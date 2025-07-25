// API Base Configuration
const API_BASE_URL = (window as any).process?.env?.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'buyer' | 'seller' | 'admin';
    emailVerified: boolean;
  };
  token: string;
  refreshToken: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  stock: number;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  featured: boolean;
  tags: string[];
  specifications: { [key: string]: string };
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  stock: number;
  images: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  tags: string[];
  specifications: { [key: string]: string };
}

export interface ProductSearchParams extends PaginationParams {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  status?: string;
  featured?: boolean;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal' | 'stripe';
  last4?: string;
  brand?: string;
}

export interface OrderSearchParams extends PaginationParams {
  search?: string;
  status?: string;
  dateStart?: string;
  dateEnd?: string;
  priceMin?: number;
  priceMax?: number;
}

// User Profile Types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  addresses: Address[];
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: Address[];
  notifications?: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// HTTP Client Class
class ApiClient {
  private baseURL: string;
  private timeout: number;
  private token: string | null = null;

  constructor(baseURL: string, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    
    // Get token from localStorage
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.message || 'Request failed', errorData.errors);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error?.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      
      throw new ApiError(0, error?.message || 'Network error');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Custom error class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Authentication API
export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    apiClient.setToken(null);
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password });
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  },

  async resendVerification(email: string): Promise<void> {
    await apiClient.post('/auth/resend-verification', { email });
  },
};

// Products API
export const productsApi = {
  async getProducts(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', params);
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData: ProductCreateRequest): Promise<Product> {
    const response = await apiClient.post<Product>('/products', productData);
    return response.data;
  },

  async updateProduct(id: string, productData: Partial<ProductCreateRequest>): Promise<Product> {
    const response = await apiClient.put<Product>(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async uploadProductImage(productId: string, image: File): Promise<string> {
    const response = await apiClient.uploadFile<{ imageUrl: string }>(`/products/${productId}/images`, image);
    return response.data.imageUrl;
  },

  async deleteProductImage(productId: string, imageUrl: string): Promise<void> {
    await apiClient.post(`/products/${productId}/images/delete`, { imageUrl });
  },

  async getSellerProducts(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/seller/products', params);
    return response.data;
  },

  async bulkUpdateProducts(productIds: string[], updates: Partial<Product>): Promise<void> {
    await apiClient.patch('/products/bulk', { productIds, updates });
  },
};

// Orders API
export const ordersApi = {
  async getOrders(params?: OrderSearchParams): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>('/orders', params);
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async createOrder(orderData: {
    items: { productId: string; quantity: number }[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: PaymentMethod;
  }): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', orderData);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await apiClient.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    const response = await apiClient.patch<Order>(`/orders/${id}/cancel`, { reason });
    return response.data;
  },

  async trackOrder(trackingNumber: string): Promise<{
    status: string;
    location: string;
    estimatedDelivery: string;
    history: Array<{ status: string; location: string; timestamp: string }>;
  }> {
    const response = await apiClient.get<{
      status: string;
      location: string;
      estimatedDelivery: string;
      history: Array<{ status: string; location: string; timestamp: string }>;
    }>(`/orders/track/${trackingNumber}`);
    return response.data;
  },
};

// User Profile API
export const userApi = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/user/profile');
    return response.data;
  },

  async updateProfile(updates: UpdateProfileRequest): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>('/user/profile', updates);
    return response.data;
  },

  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    await apiClient.post('/user/change-password', passwordData);
  },

  async uploadAvatar(avatar: File): Promise<string> {
    const response = await apiClient.uploadFile<{ avatarUrl: string }>('/user/avatar', avatar);
    return response.data.avatarUrl;
  },

  async deleteAccount(): Promise<void> {
    await apiClient.delete('/user/account');
  },
};

// Cart API
export const cartApi = {
  async getCart(): Promise<{
    items: Array<{
      id: string;
      product: Product;
      quantity: number;
      price: number;
    }>;
    total: number;
    itemCount: number;
  }> {
    const response = await apiClient.get<{
      items: Array<{
        id: string;
        product: Product;
        quantity: number;
        price: number;
      }>;
      total: number;
      itemCount: number;
    }>('/cart');
    return response.data;
  },

  async addToCart(productId: string, quantity: number): Promise<void> {
    await apiClient.post('/cart/items', { productId, quantity });
  },

  async updateCartItem(itemId: string, quantity: number): Promise<void> {
    await apiClient.put(`/cart/items/${itemId}`, { quantity });
  },

  async removeFromCart(itemId: string): Promise<void> {
    await apiClient.delete(`/cart/items/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart');
  },
};

// Wishlist API
export const wishlistApi = {
  async getWishlist(): Promise<{
    items: Product[];
    count: number;
  }> {
    const response = await apiClient.get<{
      items: Product[];
      count: number;
    }>('/wishlist');
    return response.data;
  },

  async addToWishlist(productId: string): Promise<void> {
    await apiClient.post('/wishlist/items', { productId });
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await apiClient.delete(`/wishlist/items/${productId}`);
  },

  async clearWishlist(): Promise<void> {
    await apiClient.delete('/wishlist');
  },
};

// Categories API
export const categoriesApi = {
  async getCategories(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    subcategories: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  }>> {
    const response = await apiClient.get<Array<{
      id: string;
      name: string;
      slug: string;
      subcategories: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
    }>>('/categories');
    return response.data;
  },
};

// Analytics API (for sellers)
export const analyticsApi = {
  async getDashboardStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    recentOrders: Order[];
    topProducts: Array<{
      product: Product;
      sales: number;
      revenue: number;
    }>;
  }> {
    const response = await apiClient.get<{
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
      pendingOrders: number;
      recentOrders: Order[];
      topProducts: Array<{
        product: Product;
        sales: number;
        revenue: number;
      }>;
    }>('/seller/analytics/dashboard');
    return response.data;
  },

  async getSalesData(period: 'week' | 'month' | 'year'): Promise<Array<{
    date: string;
    sales: number;
    revenue: number;
  }>> {
    const response = await apiClient.get<Array<{
      date: string;
      sales: number;
      revenue: number;
    }>>(`/seller/analytics/sales?period=${period}`);
    return response.data;
  },
};

// Error Handler Hook
export const useApiError = () => {
  const handleError = (error: any): string => {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        // Handle unauthorized - redirect to login
        apiClient.setToken(null);
        window.location.href = '/login';
        return 'Session expired. Please log in again.';
      }
      
      if (error.status === 403) {
        return 'You don\'t have permission to perform this action.';
      }
      
      if (error.status === 404) {
        return 'The requested resource was not found.';
      }
      
      if (error.status === 422) {
        return error.errors?.join(', ') || error.message;
      }
      
      if (error.status >= 500) {
        return 'Server error. Please try again later.';
      }
      
      return error.message;
    }
    
    return 'An unexpected error occurred. Please try again.';
  };

  return { handleError };
};

// Export the API client for direct use if needed
export { apiClient };

export default {
  auth: authApi,
  products: productsApi,
  orders: ordersApi,
  user: userApi,
  cart: cartApi,
  wishlist: wishlistApi,
  categories: categoriesApi,
  analytics: analyticsApi,
};
