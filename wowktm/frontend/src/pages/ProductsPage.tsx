import ProductGrid from "../features/products/ProductGrid";


export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-8">All Products</h1>
      <ProductGrid />
    </main>
  );
}
