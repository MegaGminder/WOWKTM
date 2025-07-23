import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  product: Product;
  onQuickView: (p: Product) => void;
}

export default function ProductCard3D({ product, onQuickView }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative group rounded-2xl bg-white/80 shadow-xl overflow-hidden cursor-pointer
                 border border-white/10 hover:scale-[1.03] transition duration-200"
      initial={{ opacity: 0, y: 30, rotateY: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      whileHover={{ rotateY: 8, scale: 1.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 1000 }}
      onClick={() => onQuickView(product)}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-2xl transition group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <span className="bg-white/90 px-3 py-1 rounded-full font-semibold text-primary shadow">★ {product.rating}</span>
        {product.isFeatured && <span className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-3 py-1 rounded-full font-bold shadow">Featured</span>}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-lg truncate">{product.name}</h3>
        <span className="text-gray-600 text-xs">{product.category}</span>
        <span className="font-bold text-primary text-2xl">${product.price}</span>
        <div className="flex items-center gap-2 mt-2">
          <img src={product.seller.avatarUrl} alt={product.seller.shopName} className="w-7 h-7 rounded-full border-2 border-primary" />
          <span className="text-sm">{product.seller.shopName}</span>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        initial={false}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
      >
        <button className="px-6 py-2 rounded-xl bg-primary text-white font-bold shadow hover:bg-secondary transition"
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}>
          Quick View
        </button>
      </motion.div>
    </motion.div>
  );
}
