import { useState } from 'react';
import { usePages } from '../../hooks/usePages';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import PageModal from './PageModal';

import NewPageModal from './NewPageModal';

export default function PageList() {
  const { data: response, isLoading, isError, refetch } = usePages();
  const user = useAuthStore((s) => s.user);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading pages...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error loading pages</div>;

  const pages = response?.data || [];
  const userPages = pages.filter((p: any) => p.userId === user?.id);

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
              <Plus size={18} /> New Page
            </button>
          </div>
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
    </div>
  );
}
