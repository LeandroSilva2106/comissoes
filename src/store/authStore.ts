import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      if (user) {
        // Fetch additional user data from our users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        set({ 
          isAuthenticated: true, 
          currentUser: userData,
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        isLoading: false,
        error: 'Credenciais inválidas. Por favor, verifique seu email e senha.' 
      });
    }
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ 
      isAuthenticated: false,
      currentUser: null 
    });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));