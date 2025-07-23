import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";

// More pages as you add

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* More routes */}
    </Routes>
    
  );
  
}
