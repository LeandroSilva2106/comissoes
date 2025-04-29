import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuthStore();
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        useAuthStore.setState({ isAuthenticated: false, currentUser: null });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;