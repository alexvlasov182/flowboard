import { usePages } from '../../hooks/usePages';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authSotre';
import { Plus } from 'lucide-react'; // Notion-like icon
import { motion } from 'framer-motion';

export default function PageList() {
  const { data: response, isLoading, isError } = usePages();
  const user = useAuthStore((s) => s.user);

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading pages...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading pages</div>;

  const pages = response?.data || [];
  const userPages = pages.filter((p: { userId: number }) => p.userId === user?.id);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-50 py-16 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Your Pages</h1>
          <Link
            to="/page/new"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Plus size={18} /> New Page
          </Link>
        </div>

        {/* Pages Grid */}
        {userPages.length > 0 ? (
          <div className="space-y-3">
            {userPages.map((page: { id: number; title: string; content: string }) => (
              <motion.div
                key={page.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  to={`/page/${page.id}`}
                  className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {page.title || 'Untitled'}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {page.content?.slice(0, 120) || 'No content yet...'}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-500">
            <p className="mb-3">You don’t have any pages yet.</p>
            <Link to="/page/new" className="text-brand-600 hover:underline">
              Create your first page →
            </Link>
          </div>
        )}
      </div>

      {/* Floating “+” button for quick add */}
      <Link
        to="/page/new"
        className="fixed bottom-8 right-8 bg-brand-500 hover:bg-brand-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
