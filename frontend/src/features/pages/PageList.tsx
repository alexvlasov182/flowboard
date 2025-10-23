import { useState } from 'react';
import { usePages } from '../../hooks/usePages';
import { Plus, FileText, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import PageModal from './PageModal';
import NewPageModal from './NewPageModal';
import DeletePageModal from '../../components/ui/DeletePageModal';
import api from '../../lib/api';

export default function PageList() {
  const { data: response, isLoading, isError, refetch } = usePages();
  const user = useAuthStore((s) => s.user);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [deletePage, setDeletePage] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading pages...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading pages</div>;

  const pages = response?.data || [];
  const userPages = pages.filter((p: any) => p.userId === user?.id);

  const handleDeleteConfirm = async () => {
    if (!deletePage || isDeleting) return;

    try {
      setIsDeleting(true);
      await api.delete(`/pages/${deletePage.id}`);
      setDeletePage(null);
      refetch();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(
        `Failed to delete page: ${err.response?.data?.message || err.message || 'Unknown error'}`
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen py-16 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Your Pages</h1>

          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            <Plus size={18} /> New Page
          </button>
        </div>

        {userPages.length > 0 ? (
          <div className="space-y-3">
            {userPages.map((page: any) => (
              <motion.div
                key={page.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Clickable area for navigation */}
                <div onClick={() => navigate(`/pages/${page.id}`)} className="cursor-pointer pr-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {page.title || 'Untitled'}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {page.content?.slice(0, 120) || 'No content yet...'}
                  </p>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletePage(page);
                  }}
                  className="absolute top-5 right-5 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                  title="Delete page"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mt-20 py-16 px-8"
          >
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50"></div>
              <div className="relative p-6 rounded-2xl">
                <FileText size={48} className="text-gray-400" strokeWidth={1.5} />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No pages yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-2">
              Get started by creating your first page. Organize your thoughts, ideas, and projects
              all in one place.
            </p>
          </motion.div>
        )}
      </div>

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

      <DeletePageModal
        isOpen={!!deletePage}
        onClose={() => setDeletePage(null)}
        onConfirm={handleDeleteConfirm}
        pageTitle={deletePage?.title}
      />
    </div>
  );
}
