import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useToast } from './ToastProvider';
import OptimizedImage from './OptimizedImage';
import DeliveryBadge from './DeliveryBadge';

interface ProductCardProps {
  product: Product;
}

const ProductCard3D = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: 'Unknown Seller',
      shipping: 'Standard shipping',
      inStock: product.inStock || true,
      category: product.category || 'General',
      description: product.description,
      quantity: 1
    });
    
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <Link to={`/product/${product.id}`} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        whileHover={{ scale: 1.05, rotateX: 5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:animate-card-hover cursor-pointer mobile-friendly-card"
      >
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover product-image transition-transform duration-500 hover:scale-110"
            width={300}
            height={300}
          />
          
          {/* Delivery badges overlay */}
          <div className="absolute top-2 left-2 z-10">
            <DeliveryBadge product={product} size="small" />
          </div>
          
          {/* Mobile-friendly overlay buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="bg-wowktm-primary text-white px-4 py-2 rounded-lg font-semibold transform translate-y-4 hover:translate-y-0 transition-all duration-300 hover:bg-wowktm-accent focus:outline-none focus:ring-2 focus:ring-wowktm-primary focus:ring-offset-2"
              aria-label={`Add ${product.name} to cart`}
            >
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-wowktm-primary">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          
          {/* Delivery options below description */}
          <div className="mt-2">
            <DeliveryBadge product={product} size="small" showAll />
          </div>
          
          {/* Rating and Reviews */}
          {product.rating && product.reviews && (
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold text-wowktm-secondary">
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-wowktm-primary text-white px-3 py-1.5 rounded-lg hover:bg-wowktm-secondary transition-colors text-sm font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard3D;