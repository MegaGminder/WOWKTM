import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  discount?: number;
  category: string;
  seller: string;
}

interface ResponsiveProductGridProps {
  products: Product[];
  title?: string;
  showAsList?: boolean;
  enableMobileSwiper?: boolean;
  className?: string;
  cardVariant?: 'default' | 'minimal' | 'detailed';
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const ResponsiveProductGrid: React.FC<ResponsiveProductGridProps> = ({
  products,
  title,
  showAsList = false,
  enableMobileSwiper = true,
  className = '',
  cardVariant = 'default',
  columns = { mobile: 2, tablet: 3, desktop: 4 },
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300
        ${viewMode === 'list' ? 'flex items-center space-x-4 p-4' : 'block overflow-hidden'}
      `}
    >
      {/* Product Image */}
      <div className={`
        relative overflow-hidden bg-gray-100
        ${viewMode === 'list' ? 'w-20 h-20 flex-shrink-0' : 'aspect-square'}
        rounded-lg
      `}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        {/* Quick Action Buttons (Desktop Only) */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
        <h3 className={`font-medium text-gray-900 line-clamp-2 ${viewMode === 'list' ? 'text-base' : 'text-sm'}`}>
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center mt-2">
          <span className={`font-bold text-wowktm-primary ${viewMode === 'list' ? 'text-lg' : 'text-base'}`}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className={`
          w-full bg-wowktm-primary text-white font-medium rounded-lg hover:bg-wowktm-secondary transition-colors
          ${viewMode === 'list' ? 'py-2 px-4 text-sm mt-2' : 'py-2 text-sm mt-3'}
        `}>
          Add to Cart
        </button>
      </div>
    </motion.article>
  );

  const GridView = () => {
    const gridCols = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
    
    return (
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    );
  };

  const SwiperView = () => (
    <Swiper
      modules={[FreeMode, Pagination]}
      spaceBetween={16}
      slidesPerView={2.2}
      freeMode={true}
      pagination={{ clickable: true }}
      className="mobile-product-swiper"
      breakpoints={{
        480: {
          slidesPerView: 2.5,
        },
        640: {
          slidesPerView: 3.2,
        },
      }}
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className={`responsive-product-grid ${className}`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* View Toggle (Desktop) */}
          {showAsList && !isMobile && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-wowktm-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-wowktm-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products */}
      {isMobile && enableMobileSwiper ? <SwiperView /> : <GridView />}

      {/* Load More Button */}
      {products.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ResponsiveProductGrid;
