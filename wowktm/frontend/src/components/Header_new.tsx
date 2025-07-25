import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, RoleBadge, PermissionGate } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const { items, removeItem, updateQuantity } = useCart();
  const cartItemsCount = items.reduce((total: number, item: any) => total + item.quantity, 0);

  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Etsy-style categories
  const categories = [
    {
      id: 'jewelry',
      name: 'Jewelry & Accessories',
      icon: '💎',
      subcategories: [
        'Handmade Jewelry',
        'Vintage Jewelry', 
        'Accessories'
      ]
    },
    {
      id: 'clothing',
      name: 'Clothing & Shoes',
      icon: '👗',
      subcategories: [
        "Women's Clothing",
        "Men's Clothing",
        'Shoes'
      ]
    },
    {
      id: 'home-living',
      name: 'Home & Living',
      icon: '🏠',
      subcategories: [
        'Home Decor',
        'Furniture',
        'Kitchen & Dining'
      ]
    },
    {
      id: 'art-collectibles',
      name: 'Art & Collectibles',
      icon: '🎨',
      subcategories: [
        'Original Art',
        'Photography',
        'Collectibles'
      ]
    },
    {
      id: 'craft-supplies',
      name: 'Craft Supplies & Tools',
      icon: '✂️',
      subcategories: [
        'Fabric & Fiber',
        'Beading & Jewelry Making',
        'Scrapbooking'
      ]
    },
    {
      id: 'wedding-party',
      name: 'Weddings & Party',
      icon: '💒',
      subcategories: [
        'Wedding Decorations',
        'Party Supplies'
      ]
    },
    {
      id: 'toys-games',
      name: 'Toys & Games',
      icon: '🧸',
      subcategories: [
        'Handmade Toys',
        'Vintage Games'
      ]
    },
    {
      id: 'pet-supplies',
      name: 'Pet Supplies',
      icon: '🐾',
      subcategories: [
        'Pet Accessories',
        'Pet Toys'
      ]
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100">
        {/* Curved bottom design */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wowktm-primary via-wowktm-accent to-wowktm-secondary"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-wowktm-primary hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo - Using Footer Reference with Modern Curves */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group transition-all duration-300 hover:scale-105">
              <div className="relative">
                {/* Modern Logo Icon from Footer */}
                <div className="w-10 h-10 bg-gradient-to-br from-wowktm-primary via-wowktm-accent to-wowktm-secondary rounded-xl rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-wowktm-primary group-hover:text-wowktm-accent transition-colors duration-300"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-wowktm-secondary rounded-full flex items-center justify-center text-[6px] font-bold text-white shadow-md animate-pulse-slow">
                  ✓
                </div>
              </div>
              
              {/* Brand Text from Footer */}
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-lg font-bold bg-gradient-to-r from-wowktm-primary via-wowktm-accent to-wowktm-secondary bg-clip-text text-transparent group-hover:from-wowktm-accent group-hover:via-wowktm-primary group-hover:to-wowktm-secondary transition-all duration-500">
                  WoWKTM
                </span>
                <span className="font-body text-xs text-gray-400 -mt-1 tracking-wider">
                  MARKETPLACE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Modern Curved Design */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* All Categories Dropdown */}
              <div 
                ref={categoryRef}
                className="relative group"
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-wowktm-primary transition-colors duration-300 font-medium text-sm px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-wowktm-primary/10 hover:to-wowktm-accent/10">
                  <span>All Categories</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Categories Mega Menu */}
                <AnimatePresence>
                  {isCategoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute top-full left-0 w-96 bg-white border border-gray-200 shadow-xl rounded-lg mt-2 z-50 overflow-hidden">
                        <div className="p-4">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900 text-sm">Shop by Category</h3>
                            <Link
                              to="/products"
                            className="text-wowktm-primary text-xs font-medium hover:underline"
                          >
                            View All →
                          </Link>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/products?category=${category.id}`}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <span className="text-base">{category.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-xs group-hover:text-wowktm-primary">
                                  {category.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {category.subcategories.length} subcategories
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Featured Categories */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-700">Popular:</span>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-wowktm-primary bg-opacity-10 text-wowktm-primary rounded-full text-xs font-medium">
                                Handmade
                              </span>
                              <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                Vintage
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                Custom
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Search Bar - Modern Curved Design */}
            <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for products, brands, and more..."
                    className="w-full px-4 py-3 pl-12 pr-20 border border-gray-200 rounded-full bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-wowktm-primary/30 focus:border-wowktm-primary transition-all duration-300 text-sm shadow-inner hover:shadow-md"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-wowktm-primary text-white px-3 py-1.5 rounded-full hover:bg-wowktm-accent transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Search Suggestions */}
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50 animate-fadeIn">
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Searches</h4>
                    <div className="space-y-1">
                      <div className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm text-gray-600">
                        🔍 {searchQuery} in Electronics
                      </div>
                      <div className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm text-gray-600">
                        🔍 {searchQuery} in Fashion
                      </div>
                      <div className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm text-gray-600">
                        🔍 {searchQuery} in Home & Garden
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side icons - Clean Text Style */}
            <div className="flex items-center space-x-6">
              {/* Cart - Clean Text Style */}
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                  className="relative flex items-center space-x-1 p-2 text-gray-700 hover:text-wowktm-primary transition-colors duration-200 text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-wowktm-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 animate-fadeIn">
                    <div className="p-3 border-b">
                      <h3 className="text-sm font-semibold text-gray-800">Shopping Cart ({cartItemsCount})</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="p-8 text-center">
                          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                          </svg>
                          <p className="text-sm text-gray-500 mb-3">Your cart is empty</p>
                          <Link
                            to="/products"
                            onClick={() => setIsCartDropdownOpen(false)}
                            className="inline-block bg-wowktm-primary text-white px-4 py-2 rounded-lg hover:bg-wowktm-secondary transition-colors text-sm"
                          >
                            Start Shopping
                          </Link>
                        </div>
                      ) : (
                        items.map((item: any) => (
                          <div key={item.id} className="p-3 border-b hover:bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                  <p className="text-sm font-semibold text-wowktm-primary">${item.price}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                                title="Remove item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {items.length > 0 && (
                      <div className="p-3 border-t bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">Total:</span>
                          <span className="text-base font-bold text-wowktm-primary">
                            ${items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <Link
                          to="/cart"
                          onClick={() => setIsCartDropdownOpen(false)}
                          className="w-full bg-wowktm-primary text-white py-2 px-4 rounded-lg hover:bg-wowktm-secondary transition-colors text-center text-sm font-medium block"
                        >
                          View Cart & Checkout
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Account Menu - Clean Text Style */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center space-x-1 p-2 text-gray-700 hover:text-wowktm-primary transition-colors duration-200 text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Account</span>
                </button>

                {/* Account Dropdown */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 animate-fadeIn">
                    {user ? (
                      <>
                        <div className="p-4 border-b bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-full flex items-center justify-center text-white font-semibold">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                                <RoleBadge role={user.role} size="sm" />
                              </div>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>My Profile</span>
                          </Link>
                          <Link to="/orders" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                            </svg>
                            <span>My Orders</span>
                          </Link>
                          <Link to="/wishlist" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>Wishlist</span>
                          </Link>
                          <Link to="/settings" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                          </Link>
                        </div>
                        <div className="border-t py-2">
                          <button
                            onClick={() => logout()}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 w-full text-left text-red-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="block px-4 py-3 text-center bg-wowktm-primary text-white hover:bg-wowktm-secondary transition-colors"
                        >
                          Sign In
                        </Link>
                        <div className="px-4 py-2 text-center text-sm text-gray-600">
                          New customer?{' '}
                          <Link to="/signup" className="text-wowktm-primary hover:underline">
                            Create account
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Become a Seller */}
              <Link 
                to="/seller-registration" 
                className="flex items-center space-x-1 p-2 text-gray-700 hover:text-wowktm-primary transition-colors duration-200 text-sm font-medium group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs">Become a Seller</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 md:hidden shadow-xl animate-slideInLeft">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">WoWKTM</span>
                  <span className="block text-xs text-gray-500 font-medium -mt-1 tracking-wide">MARKETPLACE</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-wowktm-primary hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                All Categories
              </Link>
              <Link
                to="/seller-registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Become a Seller
              </Link>

              <div className="mt-8 pt-6 border-t border-gray-200">
                {user ? (
                  <div className="px-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" className="flex items-center py-2 text-gray-600 hover:text-wowktm-primary">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <Link to="/orders" className="flex items-center py-2 text-gray-600 hover:text-wowktm-primary">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                      </svg>
                      My Orders
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex items-center py-2 text-red-600 hover:text-red-700"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="px-6">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-wowktm-primary text-white text-center py-3 rounded-lg hover:bg-wowktm-secondary transition-colors font-medium mb-3"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center text-wowktm-primary hover:underline"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
