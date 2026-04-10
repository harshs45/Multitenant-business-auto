import { create } from 'zustand';
import {
  loginUser,
  registerUser,
  getMe,
  setToken,
  setRefreshToken,
  clearToken,
  getToken,
} from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await loginUser(email, password);
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      set({
        user: res.data.user,
        token: res.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await registerUser(name, email, password);
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      set({
        user: res.data.user,
        token: res.data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    clearToken();
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const token = getToken();
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }
    try {
      const res = await getMe();
      set({ user: res.data.user, isAuthenticated: true, token });
    } catch {
      clearToken();
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  clearError: () => set({ error: null }),
}));
