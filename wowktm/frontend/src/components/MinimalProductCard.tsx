import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';
import OptimizedImage from './OptimizedImage';
import { FluidText, Spacer } from './FluidLayout';

interface MinimalProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock: boolean;
  category: string;
  description: string;
  variant?: 'minimal' | 'spacious' | 'elevated';
}

const MinimalProductCard: React.FC<MinimalProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  seller,
  rating,
  reviews,
  badge,
  inStock,
  category,
  description,
  variant = 'minimal'
}) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      originalPrice,
      image,
      seller,
      shipping: 'Free shipping',
      inStock,
      category,
      description
    });
    
    showToast('Added to cart', 'success');
  };

  const getCardStyles = () => {
    switch (variant) {
      case 'spacious':
        return {
          container: 'group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl p-8',
          imageContainer: 'relative overflow-hidden rounded-xl mb-8',
          contentSpacing: 'space-y-6'
        };
      case 'elevated':
        return {
          container: 'group relative bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 p-6',
          imageContainer: 'relative overflow-hidden rounded-2xl mb-6',
          contentSpacing: 'space-y-4'
        };
      default: // minimal
        return {
          container: 'group relative bg-white transition-all duration-300 hover:bg-gray-50 p-4',
          imageContainer: 'relative overflow-hidden rounded-lg mb-4',
          contentSpacing: 'space-y-3'
        };
    }
  };

  const styles = getCardStyles();

  return (
    <Link to={`/product/${id}`} className="block">
      <div className={styles.container}>
        {/* Subtle background accent */}
        {variant !== 'minimal' && (
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-50 via-purple-25 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Badge with negative space design */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm border border-gray-200">
              {badge}
            </span>
          </div>
        )}

        {/* Image with generous spacing */}
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Floating add to cart - appears on hover with fluid motion */}
          <button
            onClick={handleAddToCart}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Add to Cart
            </span>
          </button>
        </div>

        {/* Content with breathing room */}
        <div className={styles.contentSpacing}>
          {/* Seller with minimal emphasis */}
          <FluidText size="sm" weight="medium" className="text-gray-500 uppercase tracking-wider">
            {seller}
          </FluidText>

          {/* Product name with optimal spacing */}
          <FluidText size="lg" weight="medium" spacing="tight" className="text-gray-900 leading-relaxed">
            {name}
          </FluidText>

          {/* Price section with clean alignment */}
          <div className="flex items-baseline space-x-3">
            <FluidText size="xl" weight="semibold" className="text-gray-900">
              ${price.toFixed(2)}
            </FluidText>
            {originalPrice && (
              <FluidText size="md" className="text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </FluidText>
            )}
          </div>

          {/* Rating with subtle presentation */}
          {rating && reviews && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <FluidText size="sm" className="text-gray-500">
                ({reviews})
              </FluidText>
            </div>
          )}

          {/* Stock status with minimal indicator */}
          {!inStock && (
            <FluidText size="sm" className="text-red-500 font-medium">
              Out of Stock
            </FluidText>
          )}
        </div>

        {/* Spacer for intentional negative space */}
        {variant === 'spacious' && <Spacer size="sm" />}
      </div>
    </Link>
  );
};

export default MinimalProductCard;
