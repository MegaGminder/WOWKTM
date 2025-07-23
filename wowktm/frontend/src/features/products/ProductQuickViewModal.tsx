import { Product } from "../../types/product";
import { motion } from "framer-motion";


interface Props {
  product: Product;
  onClose: () => void;
}
export default function ProductQuickViewModal({ product, onClose }: Props) {
  return (
    <motion.div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden flex flex-col md:flex-row">
        <button className="absolute top-4 right-4 z-10 text-2xl" onClick={onClose}>×</button>
        <img src={product.images[0]} alt={product.name} className="w-full md:w-2/5 h-64 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none" />
        <div className="flex-1 p-8 flex flex-col gap-3">
          <h2 className="font-extrabold text-2xl">{product.name}</h2>
          <div className="flex items-center gap-2">
            <img src={product.seller.avatarUrl} className="w-8 h-8 rounded-full" />
            <span className="text-primary font-bold">{product.seller.shopName}</span>
            <span className="text-gray-400 ml-2">({product.seller.rating}★)</span>
          </div>
          <div className="text-xl font-bold text-primary">${product.price}</div>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-4 flex gap-3">
            <button className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition">Add to Cart</button>
            <button className="px-5 py-2 rounded-xl bg-white border font-bold hover:bg-gray-50 transition">Wishlist</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
