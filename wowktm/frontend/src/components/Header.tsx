import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AdvancedSearch from './AdvancedSearch';

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

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const { items: cartItems, removeItem, updateQuantity } = useCart();
  const cartItemsCount = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

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
        setShowAdvancedSearch(false);
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
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-wowktm-primary hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative">
                {/* Modern Logo Icon */}
                <div className="w-10 h-10 bg-gradient-to-br from-wowktm-primary via-wowktm-accent to-wowktm-secondary rounded-xl rotate-12 hover:rotate-0 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-wowktm-primary hover:text-wowktm-accent transition-colors duration-300"
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
              
              {/* Brand Text */}
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-lg font-bold bg-gradient-to-r from-wowktm-primary via-wowktm-accent to-wowktm-secondary bg-clip-text text-transparent hover:from-wowktm-accent hover:via-wowktm-primary hover:to-wowktm-secondary transition-all duration-500">
                  WoWKTM
                </span>
                <span className="font-body text-xs text-gray-400 -mt-1 tracking-wider">
                  MARKETPLACE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-wowktm-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-wowktm-primary transition-colors font-medium">
                Products
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-wowktm-primary transition-colors font-medium">
                Categories
              </Link>
              <Link to="/deals" className="text-gray-600 hover:text-wowktm-primary transition-colors font-medium">
                Deals
              </Link>
              <Link to="/seller-registration" className="text-gray-600 hover:text-wowktm-primary transition-colors font-medium">
                Sell
              </Link>
            </nav>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-md sm:max-w-xl lg:max-w-2xl mx-2 sm:mx-4 relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for products, brands, and more..."
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 pl-8 sm:pl-10 pr-16 sm:pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wowktm-primary focus:border-transparent text-sm"
                  />
                  <svg className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                      className="p-1 text-gray-400 hover:text-wowktm-primary transition-colors hidden sm:block"
                      title="Advanced Search"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </button>
                    <button
                      type="submit"
                      className="bg-wowktm-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-wowktm-secondary transition-colors text-xs sm:text-sm font-medium"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>

              {/* Advanced Search Dropdown */}
              {showAdvancedSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50 animate-fadeIn">
                  <AdvancedSearch onClose={() => setShowAdvancedSearch(false)} />
                </div>
              )}

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

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchFocused(!isSearchFocused)}
                className="sm:hidden p-2 text-gray-600 hover:text-wowktm-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 text-gray-600 hover:text-wowktm-primary transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              {/* Cart */}
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                  className="relative p-2 text-gray-600 hover:text-wowktm-primary transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-wowktm-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
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
                      {cartItems.length === 0 ? (
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
                        cartItems.map((item) => (
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
                    {cartItems.length > 0 && (
                      <div className="p-3 border-t bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">Total:</span>
                          <span className="text-base font-bold text-wowktm-primary">
                            ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
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

              {/* Account Menu */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-wowktm-primary transition-colors"
                >
                  {isLoggedIn ? (
                    <div className="w-8 h-8 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      JD
                    </div>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Account Dropdown */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 animate-fadeIn">
                    {isLoggedIn ? (
                      <>
                        <div className="p-4 border-b bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-full flex items-center justify-center text-white font-semibold">
                              JD
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">John Doe</h3>
                              <p className="text-sm text-gray-600">john.doe@email.com</p>
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
                            onClick={() => setIsLoggedIn(false)}
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
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchFocused && (
        <div className="sm:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center p-4 border-b">
            <button
              onClick={() => setIsSearchFocused(false)}
              className="p-2 mr-2 text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wowktm-primary"
                  autoFocus
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>
          {/* Search suggestions for mobile */}
          {searchQuery.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h4>
              <div className="space-y-2">
                <div className="px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  🔍 {searchQuery} in Electronics
                </div>
                <div className="px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  🔍 {searchQuery} in Fashion
                </div>
                <div className="px-3 py-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  🔍 {searchQuery} in Home & Garden
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 md:hidden shadow-xl animate-slideInLeft">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-wowktm-primary via-wowktm-accent to-wowktm-secondary rounded-xl flex items-center justify-center">
                  <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-wowktm-primary"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">WoWKTM</span>
                  <span className="text-xs text-gray-500 -mt-1 tracking-wider">MARKETPLACE</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-wowktm-primary hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Products
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Categories
              </Link>
              <Link
                to="/deals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Deals
              </Link>
              <Link
                to="/seller-registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-wowktm-primary hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                </svg>
                Sell on WoWKTM
              </Link>

              <div className="mt-8 pt-6 border-t border-gray-200">
                {isLoggedIn ? (
                  <div className="px-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-wowktm-primary to-wowktm-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-600">john.doe@email.com</p>
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
                      onClick={() => setIsLoggedIn(false)}
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
