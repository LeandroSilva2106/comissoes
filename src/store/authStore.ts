import { create } from 'zustand';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

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
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would validate against the backend
      // For the prototype, we'll check against mockUsers
      const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === '123456') { // Simple check for prototype
        set({ 
          isAuthenticated: true, 
          currentUser: user,
          isLoading: false 
        });
      } else {
        set({ 
          isLoading: false,
          error: 'Credenciais inválidas. Por favor, verifique seu email e senha.' 
        });
      }
    } catch (error) {
      set({ 
        isLoading: false,
        error: 'Ocorreu um erro durante o login. Por favor, tente novamente.' 
      });
    }
  },
  
  logout: () => {
    set({ 
      isAuthenticated: false,
      currentUser: null 
    });
  },
  
  clearError: () => {
    set({ error: null });
  }
}));