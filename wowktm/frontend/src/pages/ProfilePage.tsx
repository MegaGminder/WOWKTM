import React, { useState, useEffect } from 'react';
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
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: string;
  totalSpent: number;
  totalOrders: number;
}

const ProfilePage = () => {
  useScrollToTop();
  
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  
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
      const storedUserData = JSON.parse(userDataRaw);
      
      // Mock enhanced user data
      const enhancedUserData: UserData = {
        ...storedUserData,
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
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
              <div className="text-2xl font-bold">5</div>
              <div className="text-purple-100">Wishlist Items</div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            {editMode && (
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Save Changes</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Basic Details</h3>
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
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;