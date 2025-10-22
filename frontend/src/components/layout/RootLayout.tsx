import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, FileText, Home } from 'lucide-react';
import React from 'react';

type RootLayoutProps = {
  children?: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const location = useLocation();

  if (!user) return <>{children || <Outlet />}</>;

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/pages', label: 'Pages', icon: <FileText size={18} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white/80 text-gray-800">
      {/* Sidebar - Fixed */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r bg-gray-50 backdrop-blur-md p-6 flex-shrink-0">
        {/* Top section */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">FlowBoard</h1>
            <span className="text-sm text-gray-500">Hi, {user.name || user.email}</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${isActive ? 'bg-gray-100' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout button pinned at bottom */}
        <div>
          <button
            onClick={clearAuth}
            className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">{children || <Outlet />}</div>
      </main>
    </div>
  );
}
