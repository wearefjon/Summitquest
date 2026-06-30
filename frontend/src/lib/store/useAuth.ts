import { create } from 'zustand';
import { supabase } from '../supabase';

// We map Supabase user to our internal User structure
interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  initialize: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  initialize: () => {
    // Listen to auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Import authApi here to avoid circular dependencies if any
          const { authApi } = await import('../api');
          
          // Fetch the real DB user status
          const dbUser = await authApi.getMe();
          
          set({
            user: {
              id: dbUser.id,
              email: dbUser.email,
              full_name: dbUser.full_name,
              role: dbUser.role,
              status: dbUser.status
            },
            loading: false,
          });
        } catch (error) {
          console.error("Failed to fetch user from DB:", error);
          // Fallback to Supabase metadata if backend is unreachable
          const role = session.user.user_metadata?.role || 'traveller';
          const full_name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User';
          
          set({
            user: {
              id: session.user.id,
              email: session.user.email || '',
              full_name,
              role,
              status: 'pending' // Default fallback
            } as any,
            loading: false,
          });
        }
      } else {
        set({ user: null, loading: false });
      }
    });
  },
}));
