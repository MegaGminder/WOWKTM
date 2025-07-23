import { useEffect, useState } from 'react';
import ProductCard3D from '../components/ProductCard3D';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Product } from '../types/product';
import { getProducts } from '../api/productApi';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { isFetching } = useInfiniteScroll(() => setPage((prev) => prev + 1));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(page);
        setProducts((prev) => [...prev, ...response]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold text-wowktm-primary mb-6">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard3D key={product.id} product={product} />
        ))}
      </div>
      {loading || isFetching ? (
        <div className="text-center mt-6">
          <span className="text-wowktm-primary">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProductsPage;