import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePages } from '../../hooks/usePages';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPageById } = usePages();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getPageById(id);
        setPage(data);
      } catch (error) {
        console.error('Error loading page:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading page...</p>;
  if (!page) return <p className="text-gray-500">Page not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={() => navigate('/pages')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
      >
        <ArrowLeft size={16} /> Back to Pages
      </button>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{page.title}</h1>
        <p className="whitespace-pre-wrap text-gray-700">{page.content || 'No content yet.'}</p>
      </div>
    </motion.div>
  );
}
