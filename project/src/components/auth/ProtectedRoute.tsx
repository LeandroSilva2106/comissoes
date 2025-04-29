import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // For the prototype, we'll auto-authenticate if not authenticated
  // In a real app, this would redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;