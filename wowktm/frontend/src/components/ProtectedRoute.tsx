import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, Permission, Role, PermissionDenied } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requiredRole?: Role;
  allowedRoles?: Role[];
  requireAll?: boolean;
  redirectTo?: string;
  showDenied?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredPermissions,
  requiredRole,
  allowedRoles,
  requireAll = false,
  redirectTo = '/login',
  showDenied = false,
}) => {
  const { user, hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return showDenied ? <PermissionDenied /> : <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role) && user.role !== 'admin') {
    return showDenied ? <PermissionDenied /> : <Navigate to="/unauthorized" replace />;
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return showDenied ? <PermissionDenied /> : <Navigate to="/unauthorized" replace />;
  }

  if (requiredPermissions) {
    const hasAccess = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);
    
    if (!hasAccess) {
      return showDenied ? <PermissionDenied /> : <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

// Specific route guards for common use cases
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="admin" showDenied>
    {children}
  </ProtectedRoute>
);

export const SellerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['seller', 'admin']} showDenied>
    {children}
  </ProtectedRoute>
);

export const BuyerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['buyer', 'seller', 'admin']} showDenied>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
