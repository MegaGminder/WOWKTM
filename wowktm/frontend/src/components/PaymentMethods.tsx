import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'digital' | 'bank' | 'cash';
  icon: string;
  description: string;
  fees?: string;
  isPopular?: boolean;
}

interface PaymentMethodsProps {
  // Display-only component - no selection functionality needed
}

const PaymentMethods: React.FC<PaymentMethodsProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'card' | 'digital' | 'bank' | 'cash'>('all');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      type: 'cash',
      icon: '💵',
      description: 'Pay when your order is delivered',
      isPopular: true
    },
    {
      id: 'visa',
      name: 'Visa Card',
      type: 'card',
      icon: '💳',
      description: 'Credit/Debit cards accepted',
      fees: 'Processing fee may apply'
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      type: 'card',
      icon: '💳',
      description: 'All Mastercard variants accepted',
      fees: 'Processing fee may apply'
    },
    {
      id: 'esewa',
      name: 'eSewa',
      type: 'digital',
      icon: '📱',
      description: 'Digital wallet payment',
      isPopular: true
    },
    {
      id: 'khalti',
      name: 'Khalti',
      type: 'digital',
      icon: '📱',
      description: 'Quick digital payment solution'
    },
    {
      id: 'ime-pay',
      name: 'IME Pay',
      type: 'digital',
      icon: '📱',
      description: 'Secure mobile payment'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      type: 'bank',
      icon: '🏦',
      description: 'Direct bank account transfer',
      fees: 'Bank charges may apply'
    },
    {
      id: 'connect-ips',
      name: 'ConnectIPS',
      type: 'bank',
      icon: '🏦',
      description: 'Interbank payment system'
    }
  ];

  const filteredMethods = activeTab === 'all' 
    ? paymentMethods 
    : paymentMethods.filter(method => method.type === activeTab);

  const tabs = [
    { id: 'all' as const, name: 'All Methods', icon: '💳' },
    { id: 'cash' as const, name: 'Cash', icon: '💵' },
    { id: 'card' as const, name: 'Cards', icon: '💳' },
    { id: 'digital' as const, name: 'Digital', icon: '📱' },
    { id: 'bank' as const, name: 'Banking', icon: '🏦' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Available Payment Methods</h2>
        <p className="text-sm text-gray-600">Various secure payment options for your convenience</p>
      </div>

      {/* Payment Method Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-lg whitespace-nowrap transition-all text-sm ${
              activeTab === tab.id
                ? 'bg-wowktm-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-xs">{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Payment Methods Grid - Compact Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredMethods.map((method) => (
          <div
            key={method.id}
            className="relative p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
          >
            {/* Popular Badge */}
            {method.isPopular && (
              <div className="absolute -top-1 -right-1 bg-wowktm-secondary text-white text-xs px-1 py-0.5 rounded-full font-bold">
                ⭐
              </div>
            )}

            <div className="text-center">
              <div className="text-lg mb-2">{method.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{method.name}</h3>
              <p className="text-xs text-gray-600 leading-tight">{method.description}</p>
              {method.fees && (
                <p className="text-xs text-gray-500 mt-1">{method.fees}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Security Features */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
            🔒
          </div>
          <p className="text-xs text-gray-600">SSL Encrypted</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
            ✅
          </div>
          <p className="text-xs text-gray-600">Buyer Protection</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-1">
            💸
          </div>
          <p className="text-xs text-gray-600">Easy Refunds</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
