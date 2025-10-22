import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePages } from '../../hooks/usePages';
import { useAuthStore } from '../../store/authStore';
import NewPageModal from '../pages/NewPageModal';
import PageModal from '../pages/PageModal';

export default function MainDashboard() {
  const { data: response, isLoading, isError, refetch } = usePages();
  const user = useAuthStore((s) => s.user);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const pages = response?.data || [];
  const userPages = pages.filter((p: any) => p.userId === user?.id);
  const totalPages = userPages.length;
  const recentPages = userPages.slice(-3).reverse(); // last 3 pages

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading data</div>;

  return (
    <div className="relative flex flex-col items-center min-h-screen py-16 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.name} 👋</h1>
            <p className="text-gray-500 mt-2">
              You have <span className="font-semibold text-brand-600">{totalPages}</span>{' '}
              {totalPages === 1 ? 'page' : 'pages'} in your workspace.
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Plus size={18} /> New Page
          </button>
        </div>

        {/* Recent Pages */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Pages</h2>

        {recentPages.length > 0 ? (
          <div className="space-y-3">
            {recentPages.map((page: any) => (
              <motion.div
                key={page.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedPage(page)}
                className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {page.title || 'Untitled'}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {page.content?.slice(0, 120) || 'No content yet...'}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-500">
            <p className="mb-3">You don’t have any pages yet.</p>
            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
            >
              <Plus size={18} /> Create Your First Page
            </button>
          </div>
        )}

        {totalPages > 3 && (
          <div className="text-center mt-8">
            <Link to="/pages" className="inline-block text-brand-600 hover:underline font-medium">
              View all pages →
            </Link>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPage && (
        <PageModal
          page={selectedPage}
          isOpen={!!selectedPage}
          onClose={() => setSelectedPage(null)}
          onDeleted={() => {
            setSelectedPage(null);
            refetch();
          }}
          onUpdated={() => refetch()}
        />
      )}

      {showNewModal && (
        <NewPageModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          onCreated={() => refetch()}
        />
      )}
    </div>
  );
}
