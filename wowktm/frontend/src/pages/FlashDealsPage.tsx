import React from 'react';
import FlashSales from '../components/FlashSales';
import { useScrollToTop } from '../hooks/useScrollToTop';

const FlashDealsPage: React.FC = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ⚡ Flash Deals
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Limited time offers with incredible discounts! Grab these amazing deals before they're gone.
          </p>
        </div>

        {/* Flash Sales Component */}
        <FlashSales />
        
        {/* Additional Content */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About Flash Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Deals update every few hours with new incredible offers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Huge Savings</h3>
              <p className="text-gray-600">Save up to 80% off regular prices on selected items</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All flash deal products maintain our high quality standards</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Don't Miss Out!</h3>
            <p className="mb-4">New flash deals are added regularly. Check back often for the best deals.</p>
            <button className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Set Deal Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashDealsPage;
