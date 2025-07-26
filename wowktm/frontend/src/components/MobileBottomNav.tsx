import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileBottomNavProps {
  className?: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ className = '' }) => {
  const location = useLocation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const CATEGORIES = [
    'Accessories', 'Art & Collectibles', 'Bags & Purses', 'Bath & Beauty',
    'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories',
    'Home & Living', 'Jewelry', 'Paper & Party Supplies', 'Pet Supplies',
    'Shoes', 'Toys & Games', 'Weddings', 'Baby & Kids', 'Gifts'
  ];

  const navItems: any[] = [
    { path: '/', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, label: 'Home' },
    { onClick: () => setIsCategoriesOpen(true), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>, label: 'Categories' },
    { path: '/sell', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>, label: 'Sell' },
    { path: '/messages', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, label: 'Messages', badge: 3 },
    { path: '/profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, label: 'Profile' }
  ];

  return (
    <>
      <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 ${className}`}>
        <div className="flex justify-around py-2">
          {navItems.map((item, idx) => {
            const isActive = item.path === location.pathname;
            const Tag: any = item.onClick ? 'button' : Link;
            const tagProps: any = item.onClick
              ? { onClick: item.onClick, key: idx, className: 'relative flex flex-col items-center justify-center py-2 px-3 min-w-0' }
              : { to: item.path, key: idx, className: 'relative flex flex-col items-center justify-center py-2 px-3 min-w-0' };
            return (
              <Tag {...tagProps}>
                <div className={`relative p-1 rounded-lg transition-colors duration-200 ${isActive ? 'text-wowktm-primary bg-wowktm-primary/10' : 'text-gray-600 hover:text-wowktm-primary'}`}>
                  {item.icon}
                  {item.badge != null && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-wowktm-primary' : 'text-gray-600'}`}>{item.label}</span>
                {isActive && (
                  <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-wowktm-primary rounded-full" />
                )}
              </Tag>
            );
          })}
        </div>
      </nav>

      {isCategoriesOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <button onClick={() => setIsCategoriesOpen(false)} className="p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => setIsCategoriesOpen(false)}
                className="text-lg text-gray-800 hover:text-wowktm-primary p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;
