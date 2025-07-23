import { motion } from 'framer-motion';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard3D = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:animate-card-hover"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-wowktm-primary">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-wowktm-secondary font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
        <button className="mt-4 bg-wowktm-primary text-white px-4 py-2 rounded-xl hover:bg-wowktm-secondary">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard3D;