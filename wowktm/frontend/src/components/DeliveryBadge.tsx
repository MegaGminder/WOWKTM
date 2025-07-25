import React from 'react';
import { Product } from '../types/product';

interface DeliveryBadgeProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
  showAll?: boolean;
}

const DeliveryBadge: React.FC<DeliveryBadgeProps> = ({ 
  product, 
  size = 'medium', 
  showAll = false 
}) => {
  const { delivery } = product;
  
  if (!delivery) return null;

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4', 
    large: 'w-5 h-5'
  };

  const badges = [];

  // Same Day Pickup Badge
  if (delivery.sameDayPickup) {
    badges.push(
      <div
        key="pickup"
        className={`inline-flex items-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${sizeClasses[size]}`}
      >
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Same Day Pickup</span>
      </div>
    );
  }

  // Fast Delivery Badge
  if (delivery.fastDelivery) {
    badges.push(
      <div
        key="delivery"
        className={`inline-flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${sizeClasses[size]}`}
      >
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Fast Delivery</span>
      </div>
    );
  }

  // Estimated Time Badge
  if (showAll && delivery.estimatedDelivery) {
    badges.push(
      <div
        key="time"
        className={`inline-flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${sizeClasses[size]}`}
      >
        <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{delivery.estimatedDelivery}</span>
      </div>
    );
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {showAll ? badges : badges.slice(0, 1)}
    </div>
  );
};

// Delivery Options component for product details
export const DeliveryOptions: React.FC<{ product: Product }> = ({ product }) => {
  const { delivery } = product;
  
  if (!delivery) return null;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2 text-wowktm-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        Delivery Options
      </h3>
      
      <div className="space-y-3">
        {/* Same Day Pickup */}
        {delivery.sameDayPickup && (
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-green-200 shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Same Day Pickup</h4>
              <p className="text-sm text-gray-600">Available for pickup today</p>
              {delivery.pickupLocation && (
                <p className="text-sm text-green-600 font-medium">📍 {delivery.pickupLocation}</p>
              )}
            </div>
            <div className="ml-auto">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">FREE</span>
            </div>
          </div>
        )}

        {/* Fast Delivery */}
        {delivery.fastDelivery && (
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800">Fast Delivery</h4>
              <p className="text-sm text-gray-600">
                Get it in {delivery.estimatedDelivery || '2-4 hours'}
              </p>
              <p className="text-sm text-blue-600 font-medium">🚚 Express shipping available</p>
            </div>
            <div className="ml-auto">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">$4.99</span>
            </div>
          </div>
        )}

        {/* Standard Delivery */}
        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Standard Delivery</h4>
            <p className="text-sm text-gray-600">3-5 business days</p>
            <p className="text-sm text-gray-600">📦 Free shipping on orders over $50</p>
          </div>
          <div className="ml-auto">
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">$2.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBadge;
