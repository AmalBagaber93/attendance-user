import jsCookie from 'js-cookie';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { User } from '@/@types/user';
import { queryClient } from '../lib/query-client';

type AuthState = {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  token: string | null;
  logout: () => void;
  storeLogin: ({ user, token }: { user: User | null; token: string }) => void;
  hydrated: boolean;
};

type PersistedState = {
  token: string | null;
};

const cookiesStorage: PersistStorage<PersistedState> = {
  getItem: (name: string) => {
    const value = jsCookie.get(name);
    let parsedValue;
    try {
      parsedValue = value ? JSON.parse(value) : null;
    } catch {
      parsedValue = null;
    }
    return parsedValue;
  },
  setItem: (name: string, value) => {
    jsCookie.set(name, JSON.stringify(value), { expires: 3, path: '/' });
  },
  removeItem: (name: string) => {
    jsCookie.remove(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      token: null,
      verifyIdentity: null,
      hydrated: false,
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        queryClient.clear();
        // Explicitly remove the auth-token cookie
        jsCookie.remove('token', { path: '/' });
      },
      storeLogin: ({ user, token }) => {
        set({ isAuthenticated: true, user, token });
      },
    }),
    {
      name: 'auth-token',
      storage: cookiesStorage,
      partialize: state => ({ token: state.token }),
      onRehydrateStorage: () => state => {
        // Set isAuthenticated to true if token exists after rehydration
        if (state?.token) {
          state.isAuthenticated = true;
        }
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
