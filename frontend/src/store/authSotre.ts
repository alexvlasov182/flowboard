import { create } from 'zustand';

type AuthState = {
  token: string | null;
  user: { id: number; name: string; email: string } | null;
  setAuth: (token: string, user: AuthState['user']) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem('flow_token', token);
    localStorage.setItem('flow_user', JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('flow_token');
    localStorage.removeItem('flow_user');
    set({ token: null, user: null });
  },
}));

// Easy global getter for axios interceptor (without React)
export function getToken() {
  try {
    return localStorage.getItem('flow_token');
  } catch (error) {
    return null;
  }
}
