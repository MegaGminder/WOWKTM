export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'admin';
  permissions: string[];
  emailVerified: boolean;
  isActive: boolean;
  businessName?: string; // For sellers
  businessAddress?: string; // For sellers
  subscribeNewsletter?: boolean;
  createdAt: string;
  lastLogin: string | null;
  avatar?: string;
  bio?: string;
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  userType: 'buyer' | 'seller';
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
  businessName?: string; // For sellers
  businessAddress?: string; // For sellers
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  strength?: number; // For password validation
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  errors?: AuthError[];
  message?: string;
}

export type FieldValidation = {
  [key: string]: ValidationResult;
};
