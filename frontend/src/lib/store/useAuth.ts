import { create } from 'zustand';
import { supabase } from '../supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

// We map Supabase user to our internal User structure
interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
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
        // Here we parse user metadata. When they sign up via Google, they might have full_name.
        const role = session.user.user_metadata?.role || 'traveller';
        const full_name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User';
        
        set({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            full_name,
            role,
          },
          loading: false,
        });
      } else {
        set({ user: null, loading: false });
      }
    });
  },
}));
