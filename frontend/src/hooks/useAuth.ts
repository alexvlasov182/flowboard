import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authSotre';

export function useAuthPersist() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('flow_token');
    const user = localStorage.getItem('flow_user');
    if (token && user) {
      try {
        setAuth(token, JSON.parse(user));
      } catch (error) {}
    }
    setLoading(false);
  }, [setAuth]);

  return isLoading;
}
