import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

interface Product {
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
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  stock: string;
  images: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  tags: string[];
  specifications: { [key: string]: string };
}

const SellerProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    brand: '',
    sku: '',
    stock: '',
    images: [],
    status: 'active',
    featured: false,
    tags: [],
    specifications: {}
  });

  const categories = [
    { value: 'electronics', label: 'Electronics', subcategories: ['Smartphones', 'Laptops', 'Accessories'] },
    { value: 'fashion', label: 'Fashion', subcategories: ['Men', 'Women', 'Kids'] },
    { value: 'home', label: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Appliances'] },
    { value: 'sports', label: 'Sports & Fitness', subcategories: ['Equipment', 'Apparel', 'Supplements'] }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'High-quality noise-canceling wireless headphones with premium sound quality.',
          price: 199.99,
          category: 'electronics',
          subcategory: 'Accessories',
          brand: 'AudioTech',
          sku: 'AT-WH-001',
          stock: 25,
          images: ['/images/headphones-1.jpg', '/images/headphones-2.jpg'],
          status: 'active',
          featured: true,
          tags: ['wireless', 'noise-canceling', 'premium'],
          specifications: {
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0',
            'Weight': '250g'
          },
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Advanced fitness tracking watch with heart rate monitoring and GPS.',
          price: 299.99,
          category: 'electronics',
          subcategory: 'Accessories',
          brand: 'FitTech',
          sku: 'FT-SW-002',
          stock: 15,
          images: ['/images/watch-1.jpg'],
          status: 'active',
          featured: false,
          tags: ['fitness', 'smart', 'gps'],
          specifications: {
            'Display': '1.4" AMOLED',
            'Battery': '7 days',
            'Water Resistance': '5ATM'
          },
          createdAt: '2024-01-18T09:15:00Z',
          updatedAt: '2024-01-22T11:45:00Z'
        },
        {
          id: '3',
          name: 'Bluetooth Speaker',
          description: 'Portable wireless speaker with powerful bass and long battery life.',
          price: 79.99,
          category: 'electronics',
          subcategory: 'Accessories',
          brand: 'SoundWave',
          sku: 'SW-BS-003',
          stock: 0,
          images: ['/images/speaker-1.jpg'],
          status: 'out_of_stock',
          featured: false,
          tags: ['bluetooth', 'portable', 'bass'],
          specifications: {
            'Power': '20W',
            'Connectivity': 'Bluetooth 5.0',
            'Battery': '12 hours'
          },
          createdAt: '2024-01-20T16:20:00Z',
          updatedAt: '2024-01-25T13:10:00Z'
        }
      ];
      
      setProducts(mockProducts);
    } catch (error) {
      showToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const handleAddSpecification = () => {
    const key = prompt('Enter specification name:');
    if (key && key.trim()) {
      handleSpecificationChange(key.trim(), '');
    }
  };

  const handleRemoveSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      brand: '',
      sku: '',
      stock: '',
      images: [],
      status: 'active',
      featured: false,
      tags: [],
      specifications: {}
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? {
                ...editingProduct,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                updatedAt: new Date().toISOString()
              }
            : p
        ));
        showToast('Product updated successfully!', 'success');
        setEditingProduct(null);
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProducts(prev => [newProduct, ...prev]);
        showToast('Product added successfully!', 'success');
      }
      
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      showToast('Failed to save product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      sku: product.sku,
      stock: product.stock.toString(),
      images: product.images,
      status: product.status === 'out_of_stock' ? 'inactive' : product.status,
      featured: product.featured,
      tags: product.tags,
      specifications: product.specifications
    });
    setShowAddModal(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast('Product deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedProducts.length === 0) return;
    
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (bulkAction === 'delete') {
        setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
        showToast(`${selectedProducts.length} products deleted successfully!`, 'success');
      } else if (bulkAction === 'activate') {
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'active' as const } : p
        ));
        showToast(`${selectedProducts.length} products activated successfully!`, 'success');
      } else if (bulkAction === 'deactivate') {
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'inactive' as const } : p
        ));
        showToast(`${selectedProducts.length} products deactivated successfully!`, 'success');
      }
      
      setSelectedProducts([]);
      setBulkAction('');
    } catch (error) {
      showToast('Failed to perform bulk action', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingProduct(null);
                setShowAddModal(true);
              }}
              className="bg-gradient-to-r from-wowktm-primary to-wowktm-accent text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, SKU, or brand..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Actions</label>
              <div className="flex space-x-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                  disabled={selectedProducts.length === 0}
                >
                  <option value="">Select Action</option>
                  <option value="activate">Activate</option>
                  <option value="deactivate">Deactivate</option>
                  <option value="delete">Delete</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedProducts.length === 0}
                  className="px-4 py-2 bg-wowktm-primary text-white rounded-lg hover:bg-wowktm-secondary disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wowktm-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-wowktm-primary text-white px-4 py-2 rounded-lg hover:bg-wowktm-secondary transition-colors"
              >
                Add Product
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === currentProducts.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts(currentProducts.map(p => p.id));
                            } else {
                              setSelectedProducts([]);
                            }
                          }}
                          className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProducts(prev => [...prev, product.id]);
                              } else {
                                setSelectedProducts(prev => prev.filter(id => id !== product.id));
                              }
                            }}
                            className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                          {product.category} - {product.subcategory}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-wowktm-primary hover:text-wowktm-accent"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded text-sm ${
                          currentPage === page
                            ? 'bg-wowktm-primary text-white border-wowktm-primary'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleFormChange('brand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleFormChange('sku', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleFormChange('price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleFormChange('stock', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        handleFormChange('category', e.target.value);
                        handleFormChange('subcategory', '');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => handleFormChange('subcategory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      disabled={!formData.category}
                    >
                      <option value="">Select Subcategory</option>
                      {formData.category && categories
                        .find(cat => cat.value === formData.category)?.subcategories
                        .map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="bg-wowktm-primary/10 text-wowktm-primary px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="text-wowktm-primary hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                />
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
                  <button
                    type="button"
                    onClick={handleAddSpecification}
                    className="text-wowktm-primary hover:text-wowktm-accent text-sm"
                  >
                    + Add Specification
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(formData.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={key}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpecificationChange(key, e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecification(key)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleFormChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-wowktm-primary focus:ring-wowktm-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Feature this product</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-wowktm-primary to-wowktm-accent text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage;
