import React, { useState } from 'react';
import {
  OrderConfirmationEmail,
  ShippingNotificationEmail,
  PasswordResetEmail,
  EmailVerificationEmail,
  PromotionalEmail,
} from './EmailTemplates';

// Email preview and testing component
const EmailPreview: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('order-confirmation');

  // Mock data for testing
  const mockOrderData = {
    orderNumber: 'WKT-2024-001234',
    customerName: 'John Smith',
    orderDate: 'December 15, 2024',
    items: [
      {
        name: 'Premium Wireless Headphones',
        quantity: 1,
        price: 199.99,
        image: 'https://via.placeholder.com/60x60/667eea/ffffff?text=HP'
      },
      {
        name: 'Bluetooth Speaker',
        quantity: 2,
        price: 79.99,
        image: 'https://via.placeholder.com/60x60/10b981/ffffff?text=SP'
      }
    ],
    subtotal: 359.97,
    shipping: 15.00,
    tax: 28.80,
    total: 403.77,
    shippingAddress: {
      name: 'John Smith',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    estimatedDelivery: 'December 22, 2024'
  };

  const mockShippingData = {
    orderNumber: 'WKT-2024-001234',
    customerName: 'John Smith',
    trackingNumber: '1Z999AA1234567890',
    carrier: 'UPS',
    estimatedDelivery: 'December 22, 2024',
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1 },
      { name: 'Bluetooth Speaker', quantity: 2 }
    ]
  };

  const mockPasswordResetData = {
    customerName: 'John Smith',
    resetLink: 'https://wowktm.com/reset-password?token=abc123xyz789',
    expirationTime: '24 hours'
  };

  const mockVerificationData = {
    customerName: 'John Smith',
    verificationLink: 'https://wowktm.com/verify-email?token=xyz789abc123'
  };

  const mockPromotionalData = {
    customerName: 'John Smith',
    title: 'Black Friday Sale',
    subtitle: 'Up to 70% Off Everything',
    offerText: 'SAVE BIG TODAY',
    ctaText: 'Shop Now',
    ctaLink: 'https://wowktm.com/sale',
    products: [
      {
        name: 'Wireless Headphones',
        originalPrice: 199.99,
        salePrice: 99.99,
        image: 'https://via.placeholder.com/120x120/667eea/ffffff?text=HP',
        link: 'https://wowktm.com/product/headphones'
      },
      {
        name: 'Smart Watch',
        originalPrice: 299.99,
        salePrice: 149.99,
        image: 'https://via.placeholder.com/120x120/10b981/ffffff?text=SW',
        link: 'https://wowktm.com/product/smartwatch'
      },
      {
        name: 'Bluetooth Speaker',
        originalPrice: 79.99,
        salePrice: 39.99,
        image: 'https://via.placeholder.com/120x120/f59e0b/ffffff?text=SP',
        link: 'https://wowktm.com/product/speaker'
      }
    ],
    expirationDate: 'December 25, 2024'
  };

  const templates = {
    'order-confirmation': {
      label: 'Order Confirmation',
      component: <OrderConfirmationEmail {...mockOrderData} />
    },
    'shipping-notification': {
      label: 'Shipping Notification',
      component: <ShippingNotificationEmail {...mockShippingData} />
    },
    'password-reset': {
      label: 'Password Reset',
      component: <PasswordResetEmail {...mockPasswordResetData} />
    },
    'email-verification': {
      label: 'Email Verification',
      component: <EmailVerificationEmail {...mockVerificationData} />
    },
    'promotional': {
      label: 'Promotional Email',
      component: <PromotionalEmail {...mockPromotionalData} />
    }
  };

  const exportHTML = () => {
    const emailContent = document.getElementById('email-preview');
    if (emailContent) {
      const html = emailContent.innerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTemplate}-email.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const copyHTML = async () => {
    const emailContent = document.getElementById('email-preview');
    if (emailContent) {
      try {
        await navigator.clipboard.writeText(emailContent.innerHTML);
        alert('HTML copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Template Preview</h1>
          <p className="text-gray-600">Preview and test email templates with mock data</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-wowktm-primary focus:border-transparent"
              >
                {Object.entries(templates).map(([key, template]) => (
                  <option key={key} value={key}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={copyHTML}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                📋 Copy HTML
              </button>
              <button
                onClick={exportHTML}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
              >
                📁 Export HTML
              </button>
            </div>
          </div>

          {/* Template Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-gray-700 mb-1">Template Type</div>
              <div className="text-gray-600">{templates[selectedTemplate as keyof typeof templates].label}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-gray-700 mb-1">Responsive</div>
              <div className="text-green-600">✓ Mobile Optimized</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-gray-700 mb-1">Client Support</div>
              <div className="text-green-600">✓ High Compatibility</div>
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Preview: {templates[selectedTemplate as keyof typeof templates].label}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Live Preview
            </div>
          </div>

          {/* Device Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-wowktm-primary text-wowktm-primary py-2 px-1 text-sm font-medium">
                🖥️ Desktop
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 text-sm font-medium">
                📱 Mobile
              </button>
            </nav>
          </div>

          {/* Email Content */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-medium">From:</span>
                <span>WOWKTM &lt;noreply@wowktm.com&gt;</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium">Subject:</span>
                <span>
                  {selectedTemplate === 'order-confirmation' && 'Order Confirmation - Thank you for your purchase!'}
                  {selectedTemplate === 'shipping-notification' && 'Your order has shipped!'}
                  {selectedTemplate === 'password-reset' && 'Reset your WOWKTM password'}
                  {selectedTemplate === 'email-verification' && 'Verify your WOWKTM email address'}
                  {selectedTemplate === 'promotional' && 'Black Friday Sale - Up to 70% Off Everything'}
                </span>
              </div>
            </div>
            
            <div 
              id="email-preview" 
              className="max-h-[600px] overflow-auto"
              style={{ backgroundColor: '#f8fafc' }}
            >
              {templates[selectedTemplate as keyof typeof templates].component}
            </div>
          </div>
        </div>

        {/* Testing Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📧 Email Testing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Before Sending</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Test across different email clients</li>
                <li>• Check mobile responsiveness</li>
                <li>• Verify all links work correctly</li>
                <li>• Test with real data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Common Issues</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Image blocking in some clients</li>
                <li>• CSS support variations</li>
                <li>• Font fallbacks needed</li>
                <li>• Dark mode considerations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Development Notes */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🛠️ Development Notes</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Integration:</strong> These templates can be integrated with your backend email service (SendGrid, Mailgun, AWS SES, etc.)
            </p>
            <p>
              <strong>Customization:</strong> Colors, fonts, and layout can be customized by modifying the inline styles in each template
            </p>
            <p>
              <strong>Data Binding:</strong> Replace mock data with real data from your application's database
            </p>
            <p>
              <strong>Localization:</strong> Add support for multiple languages by passing language props to templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
