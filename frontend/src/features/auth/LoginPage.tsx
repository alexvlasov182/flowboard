import { useState } from 'react';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authSotre';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/auth/login', { email, password });

      const payload = res.data?.data ?? res.data;
      const token = payload.token || payload?.token;
      const user = payload.user || payload?.user;
      if (token && user) {
        setAuth(token, user);
        navigate('/pages');
      } else {
        console.error('Login unexpected response', res.data);
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link className="text-brand-600" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
