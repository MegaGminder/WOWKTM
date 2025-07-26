import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderHistory: Order[];
  wishlist: Product[];
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    smsUpdates: boolean;
    language: string;
    currency: string;
  };
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: string;
  totalSpent: number;
  totalOrders: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

type TabType = 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings' | 'notifications';

const ProfilePage = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<UserData>>({});

  // Check authentication and load user data
  useEffect(() => {
    const session = localStorage.getItem('wowktm_session');
    const userDataRaw = localStorage.getItem('wowktm_user');
    
    if (!session || !userDataRaw) {
      showToast('Please log in to access your profile', 'error');
      navigate('/login', { state: { returnUrl: '/profile' } });
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      const storedUserData = JSON.parse(userDataRaw);
      
      // Mock enhanced user data
      const enhancedUserData: UserData = {
        ...storedUserData,
        orderHistory: [
          {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 2500,
            items: 3,
            trackingNumber: 'TRK123456789'
          },
          {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            total: 1200,
            items: 1,
            trackingNumber: 'TRK987654321'
          }
        ],
        wishlist: [
          {
            id: 'PROD-001',
            name: 'Traditional Nepali Dhaka Topi',
            price: 850,
            image: '/images/products/dhaka-topi.jpg',
            category: 'Traditional Wear'
          },
          {
            id: 'PROD-002',
            name: 'Handwoven Pashmina Shawl',
            price: 3500,
            image: '/images/products/pashmina.jpg',
            category: 'Accessories'
          }
        ],
        preferences: {
          notifications: true,
          newsletter: true,
          smsUpdates: false,
          language: 'English',
          currency: 'NPR'
        },
        membershipTier: 'Silver',
        joinDate: '2023-12-01',
        totalSpent: 15750,
        totalOrders: 8
      };

      setUserData(enhancedUserData);
      setEditData(enhancedUserData);
    } catch (error) {
      showToast('Error loading profile data', 'error');
    } finally {
      setIsLoading(false);
    }

    // Show welcome message if coming from login
    const state = location.state as any;
    if (state?.message) {
      showToast(state.message, 'success');
    }
  }, [navigate, showToast, location.state]);

  const handleLogout = () => {
    localStorage.removeItem('wowktm_session');
    showToast('You have been logged out successfully', 'success');
    navigate('/login');
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update localStorage
      localStorage.setItem('wowktm_user', JSON.stringify(editData));
      setUserData(editData as UserData);
      setEditMode(false);
      
      showToast('Profile updated successfully! 🎉', 'success');
    } catch (error) {
      showToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userData.firstName[0]}{userData.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-600">{userData.email}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMembershipColor(userData.membershipTier)}`}>
                    {userData.membershipTier} Member
                  </span>
                  <span className="text-sm text-gray-500">
                    Member since {new Date(userData.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
              >
                <span>{editMode ? '✏️' : '📝'}</span>
                <span>{editMode ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl">
              <div className="text-2xl font-bold">₹{userData.totalSpent.toLocaleString()}</div>
              <div className="text-green-100">Total Spent</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl">
              <div className="text-2xl font-bold">{userData.totalOrders}</div>
              <div className="text-blue-100">Total Orders</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl">
              <div className="text-2xl font-bold">{userData.wishlist?.length || 0}</div>
              <div className="text-purple-100">Wishlist Items</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 py-4 text-sm font-medium transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Overview</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">First Name</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={editData.firstName || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800">{userData.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Last Name</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={editData.lastName || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800">{userData.lastName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Email</label>
                          <p className="mt-1 text-gray-800">{userData.email}</p>
                          <p className="text-xs text-gray-500">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Phone</label>
                          {editMode ? (
                            <input
                              type="tel"
                              value={editData.phone || ''}
                              onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800">{userData.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">Primary Address</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Street Address</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={editData.address?.street || ''}
                              onChange={(e) => setEditData(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, street: e.target.value } as any
                              }))}
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800">{userData.address?.street}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600">City</label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.address?.city || ''}
                                onChange={(e) => setEditData(prev => ({ 
                                  ...prev, 
                                  address: { ...prev.address, city: e.target.value } as any
                                }))}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="mt-1 text-gray-800">{userData.address?.city}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-600">ZIP Code</label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.address?.zipCode || ''}
                                onChange={(e) => setEditData(prev => ({ 
                                  ...prev, 
                                  address: { ...prev.address, zipCode: e.target.value } as any
                                }))}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="mt-1 text-gray-800">{userData.address?.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
                      >
                        <span>💾</span>
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                  
                  <div className="space-y-4">
                    {userData.orderHistory?.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-6">
                            <div>
                              <span className="text-sm text-gray-600">Total Amount</span>
                              <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Items</span>
                              <p className="font-semibold">{order.items}</p>
                            </div>
                            {order.trackingNumber && (
                              <div>
                                <span className="text-sm text-gray-600">Tracking</span>
                                <p className="font-semibold text-blue-600">{order.trackingNumber}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                              View Details
                            </button>
                            {order.status === 'Delivered' && (
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.wishlist?.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">🛍️</span>
                        </div>
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              🗑️
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Additional tabs content would go here */}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
