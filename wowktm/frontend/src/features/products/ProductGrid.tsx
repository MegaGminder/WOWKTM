import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../../api/productApi";
import ProductCard3D from "../../components/ProductCard3D";
import { Product } from "../../types/product";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import ProductQuickViewModal from "./ProductQuickViewModal";


export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    fetchProducts(page, 20).then(newProducts => {
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length === 20);
      setPage(prev => prev + 1);
    });
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

  const { setBottomRef } = useInfiniteScroll(() => {
    if (hasMore) loadMore();
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7" id="featured-products">
        {products.map((product) => (
          <ProductCard3D key={product.id} product={product} onQuickView={setShowQuickView} />
        ))}
      </div>
      <div ref={setBottomRef} className="py-10" />
      {showQuickView && (
        <ProductQuickViewModal
          product={showQuickView}
          onClose={() => setShowQuickView(null)}
        />
      )}
    </>
  );
}
