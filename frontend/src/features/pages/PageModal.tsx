import { useState } from 'react';
import api from '../../lib/api';
import Modal from '../../components/ui/Modal';

type Page = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  page: Page;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: (id: number) => void;
  onUpdated: (page: Page) => void;
};

export default function PageModal({ page, isOpen, onClose, onDeleted, onUpdated }: Props) {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/pages/${page.id}`, { title, content, userId: page.id });
      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update page');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this page?')) return;
    try {
      await api.delete(`/pages/${page.id}`);
      onDeleted(page.id);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to delete page');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <input
          className="w-full text-2xl font-semibold border-b border-gray-200 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border-none focus:outline-none text-gray-700 min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
        />
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
            disabled={loading}
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
