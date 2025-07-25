import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Categories', href: '/products' },
      { name: 'Handmade Goods', href: '/products?category=handmade' },
      { name: 'Vintage Finds', href: '/products?category=vintage' },
      { name: 'Craft Supplies', href: '/products?category=craft' },
      { name: 'Jewelry', href: '/products?category=jewelry' },
      { name: 'Home & Garden', href: '/products?category=home' },
    ],
    sell: [
      { name: 'Start Selling', href: '/sell' },
      { name: 'Seller Handbook', href: '/seller-guide' },
      { name: 'Fees & Payments', href: '/fees' },
      { name: 'Shop Manager', href: '/shop-manager' },
      { name: 'Marketing Tools', href: '/marketing' },
      { name: 'Success Stories', href: '/success-stories' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Track Your Order', href: '/track-order' },
    ],
    company: [
      { name: 'About WoWKTM', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Impact', href: '/impact' },
      { name: 'Investors', href: '/investors' },
      { name: 'Blog', href: '/blog' },
    ],
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/wowktm',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/wowktm',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/wowktm',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com/wowktm',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/wowktm',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-wowktm-primary">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Stay Connected with WoWKTM
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Get the latest updates on new products, special offers, and discover unique treasures from makers around the world.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="bg-wowktm-secondary hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section - Takes full width on mobile, spans 2 cols on lg+ */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group transition-all duration-300 hover:scale-105">
              <div className="relative">
                {/* Modern Logo Icon */}
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
              
              {/* Brand Text */}
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold bg-gradient-to-r from-wowktm-primary via-wowktm-accent to-wowktm-secondary bg-clip-text text-transparent group-hover:from-wowktm-accent group-hover:via-wowktm-primary group-hover:to-wowktm-secondary transition-all duration-500">
                  WoWKTM
                </span>
                <span className="font-body text-xs text-gray-400 -mt-1 tracking-wider">
                  MARKETPLACE
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-4 leading-relaxed text-sm">
              Discover unique handmade, vintage, and creative goods from talented makers worldwide. Support small businesses and find treasures you won't find anywhere else.
            </p>
            
            {/* Social Links with better mobile spacing */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-wowktm-primary transition-all duration-300 group hover:scale-110 shadow-lg hover:shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={social.name}
                >
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display text-base font-semibold text-white border-b border-gray-700 pb-2">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-wowktm-secondary transition-all duration-300 flex items-center group text-sm hover:translate-x-1"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                    <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sell Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display text-base font-semibold text-white border-b border-gray-700 pb-2">Sell</h3>
            <ul className="space-y-2">
              {footerLinks.sell.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-wowktm-secondary transition-all duration-300 flex items-center group text-sm hover:translate-x-1"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                    <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display text-base font-semibold text-white border-b border-gray-700 pb-2">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-wowktm-secondary transition-all duration-300 flex items-center group text-sm hover:translate-x-1"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                    <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-wowktm-secondary transition-colors flex items-center group text-sm"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup Section */}
        <motion.div
          variants={itemVariants}
          className="mt-10 p-5 bg-gradient-to-r from-wowktm-primary/10 to-wowktm-accent/10 rounded-xl border border-wowktm-primary/20"
        >
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-3 md:mb-0">
              <h4 className="font-display text-lg font-bold text-white mb-2">Stay in the Loop</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on new products, exclusive deals, and artisan spotlights.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-wowktm-primary focus:ring-1 focus:ring-wowktm-primary transition-colors text-sm"
              />
              <button className="bg-gradient-to-r from-wowktm-primary to-wowktm-accent text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-gray-700"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
            <div className="mb-4 lg:mb-0 text-center lg:text-left">
              <h4 className="font-display text-white font-semibold mb-3 text-base">Shop with Confidence</h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                  <div className="bg-green-500 p-1 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs font-medium">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                  <div className="bg-blue-500 p-1 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs font-medium">Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                  <div className="bg-purple-500 p-1 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-xs font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="text-center lg:text-right">
              <h5 className="text-white font-semibold mb-3 text-sm">Accepted Payments</h5>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                <div className="bg-gray-800 p-2 rounded-lg min-w-[60px] text-center">
                  <span className="text-blue-400 font-bold text-xs">VISA</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg min-w-[60px] text-center">
                  <span className="text-red-400 font-bold text-xs">MC</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg min-w-[60px] text-center">
                  <span className="text-blue-600 font-bold text-xs">PayPal</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg min-w-[60px] text-center">
                  <span className="text-gray-300 font-bold text-xs">Apple</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg min-w-[60px] text-center">
                  <span className="text-green-400 font-bold text-xs">GPay</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} <span className="font-display font-semibold text-gradient-primary">WoWKTM</span> Marketplace. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-wowktm-secondary transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-wowktm-secondary transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-wowktm-secondary transition-colors hover:underline">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-wowktm-secondary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
