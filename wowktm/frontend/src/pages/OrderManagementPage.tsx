import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'WOW-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 299.99,
          items: [
            {
              id: '1',
              name: 'Premium Wireless Headphones',
              image: '/images/headphones.jpg',
              price: 199.99,
              quantity: 1,
              sku: 'WH-PRE-001'
            },
            {
              id: '2',
              name: 'Phone Case',
              image: '/images/case.jpg',
              price: 49.99,
              quantity: 2,
              sku: 'PC-BLK-002'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          trackingNumber: 'TRK123456789',
          estimatedDelivery: '2024-01-20'
        },
        {
          id: '2',
          orderNumber: 'WOW-2024-002',
          date: '2024-01-18',
          status: 'shipped',
          total: 149.99,
          items: [
            {
              id: '3',
              name: 'Smart Watch',
              image: '/images/watch.jpg',
              price: 149.99,
              quantity: 1,
              sku: 'SW-BLU-003'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          trackingNumber: 'TRK987654321',
          estimatedDelivery: '2024-01-25'
        },
        {
          id: '3',
          orderNumber: 'WOW-2024-003',
          date: '2024-01-20',
          status: 'processing',
          total: 79.99,
          items: [
            {
              id: '4',
              name: 'Bluetooth Speaker',
              image: '/images/speaker.jpg',
              price: 79.99,
              quantity: 1,
              sku: 'BS-RED-004'
            }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          estimatedDelivery: '2024-01-28'
        },
        {
          id: '4',
          orderNumber: 'WOW-2024-004',
          date: '2024-01-22',
          status: 'pending',
          total: 459.99,
          items: [
            {
              id: '5',
              name: 'Gaming Laptop',
              image: '/images/laptop.jpg',
              price: 459.99,
              quantity: 1,
              sku: 'GL-BLK-005'
            }
          ],
          shippingAddress: {
            name: 'Jane Smith',
            address: '456 Oak Avenue',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            country: 'USA'
          },
          estimatedDelivery: '2024-01-30'
        },
        {
          id: '5',
          orderNumber: 'WOW-2024-005',
          date: '2024-01-25',
          status: 'cancelled',
          total: 99.99,
          items: [
            {
              id: '6',
              name: 'Wireless Mouse',
              image: '/images/mouse.jpg',
              price: 99.99,
              quantity: 1,
              sku: 'WM-SIL-006'
            }
          ],
          shippingAddress: {
            name: 'Bob Johnson',
            address: '789 Pine Street',
            city: 'Chicago',
            state: 'IL',
            zipCode: '60601',
            country: 'USA'
          }
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      showToast('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Filter orders with advanced search
  const filteredAndSortedOrders = (() => {
    let filtered = orders.filter(order => {
      const matchesSearch = !searchQuery || 
                           order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.items.some(item => 
                             item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.sku.toLowerCase().includes(searchQuery.toLowerCase())
                           );
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      const matchesDateRange = !dateRange.start || !dateRange.end ||
                              (new Date(order.date) >= new Date(dateRange.start) &&
                               new Date(order.date) <= new Date(dateRange.end));
      
      const matchesPriceRange = (!priceRange.min || order.total >= parseFloat(priceRange.min)) &&
                               (!priceRange.max || order.total <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesStatus && matchesDateRange && matchesPriceRange;
    });

    // Sort orders
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  })();

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredAndSortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredAndSortedOrders.length / ordersPerPage);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateRange({ start: '', end: '' });
    setPriceRange({ min: '', max: '' });
    setSortBy('date');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wowktm-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Advanced Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Search & Filters</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-wowktm-primary hover:text-wowktm-accent font-medium text-sm flex items-center space-x-1"
              >
                <svg className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
              </button>
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 font-medium text-sm"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order number, customer name, product name, or SKU..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'total' | 'status')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                >
                  <option value="date">Date</option>
                  <option value="total">Total</option>
                  <option value="status">Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  <svg className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                      placeholder="Start date"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                      placeholder="End date"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      step="0.01"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      placeholder="Min price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      placeholder="Max price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const today = new Date();
                        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        setDateRange({
                          start: lastWeek.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0]
                        });
                      }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      Last 7 days
                    </button>
                    <button
                      onClick={() => {
                        const today = new Date();
                        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                        setDateRange({
                          start: lastMonth.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0]
                        });
                      }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      Last 30 days
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: '100', max: '500' })}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      $100 - $500
                    </button>
                    <button
                      onClick={() => setStatusFilter('delivered')}
                      className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-sm transition-colors"
                    >
                      Delivered Only
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {currentOrders.length} of {filteredAndSortedOrders.length} orders
              {searchQuery && (
                <span className="ml-2 px-2 py-1 bg-wowktm-primary/10 text-wowktm-primary rounded-full text-xs">
                  Search: "{searchQuery}"
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">
                  Status: {statusFilter}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Orders', count: orders.length },
                { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
                { key: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
                { key: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
                { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    statusFilter === tab.key
                      ? 'border-wowktm-primary text-wowktm-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        {filteredAndSortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {statusFilter === 'all' && !searchQuery && !dateRange.start && !priceRange.min
                ? 'You haven\'t placed any orders yet.'
                : 'No orders match your current filters.'}
            </p>
            {(searchQuery || statusFilter !== 'all' || dateRange.start || priceRange.min) && (
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-wowktm-primary to-wowktm-accent hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-wowktm-primary to-wowktm-accent hover:shadow-lg transition-all duration-300"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {currentOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                          <p className="text-sm text-gray-600">{order.trackingNumber}</p>
                        </div>
                        {order.estimatedDelivery && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-wowktm-primary hover:text-wowktm-accent font-medium text-sm"
                      >
                        View Details
                      </button>
                      {order.trackingNumber && (
                        <button className="text-wowktm-primary hover:text-wowktm-accent font-medium text-sm">
                          Track Package
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="text-wowktm-primary hover:text-wowktm-accent font-medium text-sm">
                          Leave Review
                        </button>
                      )}
                    </div>
                    {order.status === 'pending' && (
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-wowktm-primary text-white border-wowktm-primary'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Details - #{selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Status */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Order Status</h3>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="ml-2 capitalize">{selectedOrder.status}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Order placed on {new Date(selectedOrder.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
