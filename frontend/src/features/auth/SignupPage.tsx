import { useState } from 'react';
import api from '../../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import heroImage from '../../assets/page-1.jpg';
import { useAuthStore } from '../../store/authStore';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 👈 added
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(''); // reset previous errors

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post('/auth/signup', { name, email, password });
      const { user, token } = res.data.data ?? res.data;

      if (user && token) {
        setAuth(user, token);
        console.log('✅ Signup successful, user logged in:', user);
        navigate('/pages');
      } else {
        setError('Signup succeeded but no user/token returned');
      }
    } catch (err: any) {
      console.error('❌ Signup error:', err);
      const message =
        err.response?.data?.message ||
        (err.response?.status === 409
          ? 'Email already in use'
          : 'Signup failed. Please try again.');
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-1 justify-center items-center px-6 py-12">
        <div className="bg-white flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
          {/* Illustration */}
          <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center p-10">
            <img src={heroImage} alt="Workspace illustration" className="rounded-2xl" />
          </div>

          {/* Signup Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Create Account</h2>

            <label className="block mb-4">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              />
            </label>

            {/* 👇 Inline error message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{' '}
              <Link className="text-brand-600 font-medium hover:underline" to="/login">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
