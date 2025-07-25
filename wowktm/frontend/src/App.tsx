import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header_new';
import ResponsiveHeader from './components/ResponsiveHeader';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import SellerRegistrationPage from './pages/SellerRegistrationPage';
import OrderManagementPage from './pages/OrderManagementPage';
import SellerProductsPage from './pages/SellerProductsPage';
import SellerProductUploadPage from './pages/SellerProductUploadPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import ProfilePage from './pages/ProfilePage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FlashDealsPage from './pages/FlashDealsPage';
import MobileShowcasePage from './pages/MobileShowcasePage';
import Wishlist from './components/Wishlist';
import EmailPreview from './components/EmailPreview';
import ProtectedRoute, { AdminRoute, SellerRoute, BuyerRoute } from './components/ProtectedRoute';
import { PermissionDenied } from './contexts/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { initPerformanceMonitoring } from './utils/performance';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initPerformanceMonitoring();
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              {isMobile ? <ResponsiveHeader /> : <Header />}
              <main className={`flex-1 ${isMobile ? 'pb-16' : ''}`}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/flash-deals" element={<FlashDealsPage />} />
                  <Route path="/mobile-showcase" element={<MobileShowcasePage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/sell" element={<SellerRegistrationPage />} />
                  <Route path="/seller-registration" element={<SellerRegistrationPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/verify-email" element={<EmailVerificationPage />} />
                  <Route path="/unauthorized" element={<PermissionDenied />} />
                  
                  {/* Protected Routes - Require Authentication */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Buyer Routes */}
                  <Route path="/orders" element={
                    <BuyerRoute>
                      <OrderManagementPage />
                    </BuyerRoute>
                  } />
                  <Route path="/my-items" element={
                    <BuyerRoute>
                      <div>My Items Page</div>
                    </BuyerRoute>
                  } />
                  <Route path="/reorder" element={
                    <BuyerRoute>
                      <div>Reorder Page</div>
                    </BuyerRoute>
                  } />
                  
                  {/* Seller Routes */}
                  <Route path="/seller/dashboard" element={
                    <SellerRoute>
                      <SellerDashboardPage />
                    </SellerRoute>
                  } />
                  <Route path="/seller/products" element={
                    <SellerRoute>
                      <SellerProductsPage />
                    </SellerRoute>
                  } />
                  <Route path="/seller/upload" element={
                    <SellerRoute>
                      <SellerProductUploadPage />
                    </SellerRoute>
                  } />
                  <Route path="/seller/orders" element={
                    <SellerRoute>
                      <OrderManagementPage />
                    </SellerRoute>
                  } />
                  <Route path="/upload-product" element={
                    <ProtectedRoute>
                      <SellerProductUploadPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/seller-dashboard" element={
                    <ProtectedRoute>
                      <SellerDashboardPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <AdminRoute>
                      <div>Admin Dashboard</div>
                    </AdminRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminRoute>
                      <div>User Management</div>
                    </AdminRoute>
                  } />
                  <Route path="/admin/products" element={
                    <AdminRoute>
                      <SellerProductsPage />
                    </AdminRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminRoute>
                      <OrderManagementPage />
                    </AdminRoute>
                  } />
                  
                  {/* Development Routes */}
                  <Route path="/dev/email-preview" element={
                    <ProtectedRoute requiredPermission="admin.access" showDenied>
                      <EmailPreview />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              {isMobile && <MobileBottomNav />}
            </div>
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
