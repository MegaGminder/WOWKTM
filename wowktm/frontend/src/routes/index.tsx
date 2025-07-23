import { RouteObject } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
];
}
