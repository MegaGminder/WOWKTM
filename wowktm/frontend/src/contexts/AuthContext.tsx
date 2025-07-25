import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Permission types
export type Permission = 
  // Product permissions
  | 'products.view'
  | 'products.create'
  | 'products.edit'
  | 'products.delete'
  | 'products.publish'
  | 'products.feature'
  
  // Order permissions
  | 'orders.view'
  | 'orders.view_all'
  | 'orders.edit'
  | 'orders.cancel'
  | 'orders.fulfill'
  | 'orders.refund'
  
  // User permissions
  | 'users.view'
  | 'users.edit'
  | 'users.delete'
  | 'users.manage_roles'
  
  // Analytics permissions
  | 'analytics.view'
  | 'analytics.export'
  
  // Admin permissions
  | 'admin.access'
  | 'admin.settings'
  | 'admin.logs'
  
  // Seller permissions
  | 'seller.dashboard'
  | 'seller.reports'
  | 'seller.settings';

export type Role = 'buyer' | 'seller' | 'admin';

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  buyer: [
    'orders.view',
    'orders.cancel',
  ],
  seller: [
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.publish',
    'orders.view',
    'orders.edit',
    'orders.fulfill',
    'analytics.view',
    'seller.dashboard',
    'seller.reports',
    'seller.settings',
  ],
  admin: [
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.publish',
    'products.feature',
    'orders.view',
    'orders.view_all',
    'orders.edit',
    'orders.cancel',
    'orders.fulfill',
    'orders.refund',
    'users.view',
    'users.edit',
    'users.delete',
    'users.manage_roles',
    'analytics.view',
    'analytics.export',
    'admin.access',
    'admin.settings',
    'admin.logs',
    'seller.dashboard',
    'seller.reports',
    'seller.settings',
  ],
};

// Feature flags for different roles
export interface FeatureFlags {
  canCreateProducts: boolean;
  canEditProducts: boolean;
  canDeleteProducts: boolean;
  canViewAllOrders: boolean;
  canManageUsers: boolean;
  canAccessAnalytics: boolean;
  canAccessAdminPanel: boolean;
  canFeatureProducts: boolean;
  canExportData: boolean;
  canManageSettings: boolean;
  canViewLogs: boolean;
  maxProductsAllowed?: number;
  maxImageUploadsPerProduct?: number;
  canUseBulkOperations: boolean;
  canScheduleProducts: boolean;
  canUseAdvancedFilters: boolean;
}

// User context type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  permissions: Permission[];
  emailVerified: boolean;
  isActive: boolean;
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  getFeatureFlags: () => FeatureFlags;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserRole: (userId: string, newRole: Role) => Promise<void>;
  checkRoleAccess: (requiredRole: Role) => boolean;
  isFeatureEnabled: (feature: keyof FeatureFlags) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Permission checker component
interface PermissionGateProps {
  permission?: Permission;
  permissions?: Permission[];
  role?: Role;
  requireAll?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  permissions,
  role,
  requireAll = false,
  fallback = null,
  children,
}) => {
  const auth = useAuth();

  if (!auth.user) {
    return <>{fallback}</>;
  }

  // Check role-based access
  if (role && auth.user.role !== role && auth.user.role !== 'admin') {
    return <>{fallback}</>;
  }

  // Check single permission
  if (permission && !auth.hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check multiple permissions
  if (permissions) {
    const hasAccess = requireAll
      ? auth.hasAllPermissions(permissions)
      : auth.hasAnyPermission(permissions);
    
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

// Role-based component wrapper
interface RoleGuardProps {
  allowedRoles: Role[];
  fallback?: ReactNode;
  children: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  fallback = null,
  children,
}) => {
  const auth = useAuth();

  if (!auth.user || !allowedRoles.includes(auth.user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Feature flag component
interface FeatureFlagProps {
  feature: keyof FeatureFlags;
  fallback?: ReactNode;
  children: ReactNode;
}

export const FeatureFlag: React.FC<FeatureFlagProps> = ({
  feature,
  fallback = null,
  children,
}) => {
  const auth = useAuth();

  if (!auth.isFeatureEnabled(feature)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage or API
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Mock user data - in real app, fetch from API
          const mockUser: User = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'seller', // This would come from API
            permissions: ROLE_PERMISSIONS.seller,
            emailVerified: true,
            isActive: true,
            subscriptionTier: 'premium',
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  };

  const checkRoleAccess = (requiredRole: Role): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Otherwise, exact role match required
    return user.role === requiredRole;
  };

  const getFeatureFlags = (): FeatureFlags => {
    if (!user) {
      return {
        canCreateProducts: false,
        canEditProducts: false,
        canDeleteProducts: false,
        canViewAllOrders: false,
        canManageUsers: false,
        canAccessAnalytics: false,
        canAccessAdminPanel: false,
        canFeatureProducts: false,
        canExportData: false,
        canManageSettings: false,
        canViewLogs: false,
        canUseBulkOperations: false,
        canScheduleProducts: false,
        canUseAdvancedFilters: false,
      };
    }

    const baseFlags: FeatureFlags = {
      canCreateProducts: hasPermission('products.create'),
      canEditProducts: hasPermission('products.edit'),
      canDeleteProducts: hasPermission('products.delete'),
      canViewAllOrders: hasPermission('orders.view_all'),
      canManageUsers: hasPermission('users.manage_roles'),
      canAccessAnalytics: hasPermission('analytics.view'),
      canAccessAdminPanel: hasPermission('admin.access'),
      canFeatureProducts: hasPermission('products.feature'),
      canExportData: hasPermission('analytics.export'),
      canManageSettings: hasPermission('admin.settings'),
      canViewLogs: hasPermission('admin.logs'),
      canUseBulkOperations: true,
      canScheduleProducts: user.role === 'seller' || user.role === 'admin',
      canUseAdvancedFilters: true,
    };

    // Role-specific feature limits
    switch (user.role) {
      case 'buyer':
        return {
          ...baseFlags,
          canUseBulkOperations: false,
          canScheduleProducts: false,
        };
      
      case 'seller':
        return {
          ...baseFlags,
          maxProductsAllowed: user.subscriptionTier === 'basic' ? 10 : 
                             user.subscriptionTier === 'premium' ? 100 : 1000,
          maxImageUploadsPerProduct: user.subscriptionTier === 'basic' ? 3 : 
                                   user.subscriptionTier === 'premium' ? 10 : 20,
        };
      
      case 'admin':
        return {
          ...baseFlags,
          maxProductsAllowed: undefined, // Unlimited
          maxImageUploadsPerProduct: undefined, // Unlimited
        };
      
      default:
        return baseFlags;
    }
  };

  const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
    const flags = getFeatureFlags();
    return Boolean(flags[feature]);
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Mock login - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        role: email.includes('admin') ? 'admin' : 
              email.includes('seller') ? 'seller' : 'buyer',
        permissions: [],
        emailVerified: true,
        isActive: true,
        subscriptionTier: 'premium',
      };
      
      // Set permissions based on role
      mockUser.permissions = ROLE_PERMISSIONS[mockUser.role];
      
      setUser(mockUser);
      localStorage.setItem('auth_token', 'mock-token');
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const updateUserRole = async (userId: string, newRole: Role): Promise<void> => {
    if (!hasPermission('users.manage_roles')) {
      throw new Error('Insufficient permissions to manage user roles');
    }

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update user role if it's the current user
    if (user && user.id === userId) {
      setUser({
        ...user,
        role: newRole,
        permissions: ROLE_PERMISSIONS[newRole],
      });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getFeatureFlags,
    login,
    logout,
    updateUserRole,
    checkRoleAccess,
    isFeatureEnabled,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hooks for specific permission checks
export const usePermissions = () => {
  const auth = useAuth();
  
  return {
    canCreateProducts: auth.hasPermission('products.create'),
    canEditProducts: auth.hasPermission('products.edit'),
    canDeleteProducts: auth.hasPermission('products.delete'),
    canViewAllOrders: auth.hasPermission('orders.view_all'),
    canManageUsers: auth.hasPermission('users.manage_roles'),
    canAccessAnalytics: auth.hasPermission('analytics.view'),
    canAccessAdminPanel: auth.hasPermission('admin.access'),
    
    // Combined permissions
    canManageProducts: auth.hasAnyPermission(['products.create', 'products.edit', 'products.delete']),
    canManageOrders: auth.hasAnyPermission(['orders.edit', 'orders.cancel', 'orders.fulfill']),
    
    // Role checks
    isBuyer: auth.user?.role === 'buyer',
    isSeller: auth.user?.role === 'seller',
    isAdmin: auth.user?.role === 'admin',
    
    // Feature flags
    features: auth.getFeatureFlags(),
  };
};

// Role badge component
interface RoleBadgeProps {
  role: Role;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  size = 'md',
  showIcon = true 
}) => {
  const getRoleConfig = (role: Role) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Admin',
          className: 'bg-purple-100 text-purple-800',
          icon: '👑'
        };
      case 'seller':
        return {
          label: 'Seller',
          className: 'bg-green-100 text-green-800',
          icon: '🏪'
        };
      case 'buyer':
        return {
          label: 'Buyer',
          className: 'bg-blue-100 text-blue-800',
          icon: '🛒'
        };
      default:
        return {
          label: 'User',
          className: 'bg-gray-100 text-gray-800',
          icon: '👤'
        };
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-1 text-sm';
      default:
        return 'px-2.5 py-0.5 text-xs';
    }
  };

  const config = getRoleConfig(role);
  const sizeClasses = getSizeClasses(size);

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.className} ${sizeClasses}`}>
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </span>
  );
};

// Permission denied component
interface PermissionDeniedProps {
  message?: string;
  showContact?: boolean;
}

export const PermissionDenied: React.FC<PermissionDeniedProps> = ({
  message = "You don't have permission to access this feature.",
  showContact = true,
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {showContact && (
        <p className="text-sm text-gray-500">
          Need access? Contact your administrator or{' '}
          <a href="/support" className="text-wowktm-primary hover:text-wowktm-accent font-medium">
            get support
          </a>
        </p>
      )}
    </div>
  );
};

export default {
  AuthProvider,
  PermissionGate,
  RoleGuard,
  FeatureFlag,
  RoleBadge,
  PermissionDenied,
  useAuth,
  usePermissions,
};
