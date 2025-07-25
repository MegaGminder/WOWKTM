import { Product, dummyProducts } from '../data/dummyData';

// In a real application, this would be handled by the backend
// For now, we'll use localStorage to simulate a persistent store

class ProductService {
  private static STORAGE_KEY = 'wowktm_products';

  // Get all products (dummy + user-uploaded)
  static getAllProducts(): Product[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const uploadedProducts = stored ? JSON.parse(stored) : [];
    
    return [...dummyProducts, ...uploadedProducts];
  }

  // Get a specific product by ID
  static getProduct(id: string): Product | undefined {
    const allProducts = this.getAllProducts();
    return allProducts.find(product => product.id === id);
  }

  // Add a new product
  static addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Product {
    const allProducts = this.getAllProducts();
    // Generate a unique ID that won't conflict with existing IDs
    let newId: string;
    let idExists = true;
    let counter = allProducts.length + 1;
    
    // Keep incrementing until we find a unique ID
    while (idExists) {
      newId = counter.toString();
      idExists = allProducts.some(product => product.id === newId);
      if (idExists) counter++;
    }
    
    const newProduct: Product = {
      ...productData,
      id: newId!,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      inStock: true,
    };

    // Get existing uploaded products
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const uploadedProducts = stored ? JSON.parse(stored) : [];
    
    // Add new product to uploaded products
    uploadedProducts.push(newProduct);
    
    // Save back to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(uploadedProducts));
    
    return newProduct;
  }

  // Update a product
  static updateProduct(id: string, updates: Partial<Product>): Product | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const uploadedProducts = stored ? JSON.parse(stored) : [];
    
    const productIndex = uploadedProducts.findIndex((p: Product) => p.id === id);
    
    if (productIndex === -1) {
      console.error('Product not found or cannot be modified');
      return null;
    }

    uploadedProducts[productIndex] = { ...uploadedProducts[productIndex], ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(uploadedProducts));
    
    return uploadedProducts[productIndex];
  }

  // Delete a product
  static deleteProduct(id: string): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const uploadedProducts = stored ? JSON.parse(stored) : [];
    
    const filteredProducts = uploadedProducts.filter((p: Product) => p.id !== id);
    
    if (filteredProducts.length === uploadedProducts.length) {
      console.error('Product not found or cannot be deleted');
      return false;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProducts));
    return true;
  }

  // Get products by category
  static getProductsByCategory(category: string): Product[] {
    return this.getAllProducts().filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get products by seller
  static getProductsBySeller(sellerId: string): Product[] {
    return this.getAllProducts().filter(product => product.seller.id === sellerId);
  }

  // Search products
  static searchProducts(query: string): Product[] {
    const allProducts = this.getAllProducts();
    const searchTerm = query.toLowerCase();
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Clear all user-uploaded products (for testing)
  static clearUploadedProducts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Get statistics
  static getStats() {
    const allProducts = this.getAllProducts();
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const uploadedProducts = stored ? JSON.parse(stored) : [];
    
    return {
      totalProducts: allProducts.length,
      uploadedProducts: uploadedProducts.length,
      categories: [...new Set(allProducts.map(p => p.category))],
      totalValue: allProducts.reduce((sum, p) => sum + p.price, 0)
    };
  }
}

export default ProductService;
