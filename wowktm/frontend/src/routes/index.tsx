import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import SellerRegistrationPage from '../pages/SellerRegistrationPage';
import ProfilePage from '../pages/ProfilePage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import OrderManagementPage from '../pages/OrderManagementPage';
import Wishlist from '../components/Wishlist';

export const routes: RouteObject[] = [
  { path: '/', element: <LandingPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/product/:id', element: <ProductDetailsPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/verify-email', element: <EmailVerificationPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/orders', element: <OrderManagementPage /> },
  { path: '/sell', element: <SellerRegistrationPage /> },
  { path: '/seller-registration', element: <SellerRegistrationPage /> },
  { path: '/wishlist', element: <Wishlist /> },
  { path: '/reorder', element: <div>Reorder Page</div> }, // Placeholder
  { path: '/my-items', element: <div>My Items Page</div> }, // Placeholder
  { path: '/cart', element: <CartPage /> },
];