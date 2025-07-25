import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/ToastProvider';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { showToast } = useToast();
  const { items: cartItems, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);

  const moveToWishlist = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    removeItem(id);
    showToast(`${item?.name} moved to wishlist`, 'success');
  };

  const applyPromoCode = () => {
    const validCodes = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'FIRST15': 15
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes]
      });
      showToast(`Promo code ${promoCode} applied!`, 'success');
    } else {
      showToast('Invalid promo code', 'error');
    }
    setPromoCode('');
  };

  const subtotal = getTotalPrice();
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08; // 8% tax
  const total = subtotal - promoDiscount + shipping + tax;

  const outOfStockItems = cartItems.filter(item => !item.inStock);
  const availableItems = cartItems.filter(item => item.inStock);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-wowktm-primary">Home</Link>
            <span className="mx-2">/</span>
            <span>Cart ({cartItems.length} items)</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover unique handmade and vintage items from creators worldwide.</p>
            <Link
              to="/products"
              className="inline-block bg-wowktm-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-wowktm-secondary transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Out of Stock Items */}
              {outOfStockItems.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="text-red-800 font-semibold mb-2">Items currently unavailable</h3>
                  <p className="text-red-600 text-sm">These items are out of stock and won't be included in your order.</p>
                </div>
              )}

              {/* Available Items */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Items ({availableItems.length} available)
                    </h2>
                    <button className="text-wowktm-primary hover:underline text-sm font-medium">
                      Save for later
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-6 ${!item.inStock ? 'bg-gray-50 opacity-60' : ''}`}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            {!item.inStock && (
                              <div className="mt-2 text-xs text-red-600 font-medium">Out of stock</div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 pr-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Sold by <span className="font-medium text-gray-900">{item.seller}</span></span>
                                  <span className="text-green-600 font-medium">{item.shipping}</span>
                                </div>
                                
                                {/* Price */}
                                <div className="mt-3 flex items-center space-x-2">
                                  <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                                  {item.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col items-end space-y-2">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Quantity and Actions */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1 || !item.inStock}
                                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                    </svg>
                                  </button>
                                  <span className="px-4 py-2 text-sm font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={!item.inStock}
                                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </button>
                                </div>

                                <span className="text-sm text-gray-500">|</span>

                                {/* Action Buttons */}
                                <button
                                  onClick={() => moveToWishlist(item.id)}
                                  className="text-sm text-wowktm-primary hover:underline font-medium"
                                >
                                  Save for later
                                </button>
                                <button className="text-sm text-wowktm-primary hover:underline font-medium">
                                  Share
                                </button>
                              </div>

                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)} each
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-4">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Promo Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedPromo && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                        <span className="font-medium">{appliedPromo.code}</span> applied - {appliedPromo.discount}% off
                      </div>
                    )}
                  </div>

                  {/* Order Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({availableItems.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Promo discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        {shipping === 0 
                          ? "You qualify for FREE shipping!" 
                          : `Add $${(50 - subtotal).toFixed(2)} more for FREE shipping`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    disabled={availableItems.length === 0}
                    className="w-full bg-wowktm-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-wowktm-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <Link
                    to="/products"
                    className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>

                  {/* Security Badge */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure checkout powered by SSL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
