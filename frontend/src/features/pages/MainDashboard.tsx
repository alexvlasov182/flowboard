import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePages } from '../../hooks/usePages';
import { useAuthStore } from '../../store/authStore';

export default function MainDashboard() {
  const { data: response } = usePages();
  const user = useAuthStore((s) => s.user);

  const pages = response?.data || [];
  const userPages = pages.filter((p: any) => p.userId === user?.id);

  return (
    <div className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome back, {user?.name}!</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Pages</h2>
        <Link
          to="/page/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600"
        >
          <Plus size={16} /> New Page
        </Link>
      </div>

      {userPages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userPages.map((page: any) => (
            <Link
              to={`/page/${page.id}`}
              key={page.id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{page.title || 'Untitled'}</h3>
              <p className="text-gray-500 line-clamp-2">
                {page.content?.slice(0, 100) || 'No content yet'}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">
          You don’t have any pages yet.{' '}
          <Link to="/page/new" className="text-brand-600 hover:underline">
            Create your first page →
          </Link>
        </p>
      )}
    </div>
  );
}
