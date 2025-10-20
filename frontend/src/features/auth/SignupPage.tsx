import { useState } from 'react';
import api from '../../lib/api';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post('/api/auth/signup', { name, email, password });
      // after signup redirect to login
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
        />
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
          onClick={handleSignup}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded"
        >
          Sign up
        </button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link className="text-brand-600" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
