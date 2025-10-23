import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function usePages() {
  const query = useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const res = await api.get('/pages');
      return res.data; // backend returns { success, data }
    },
  });

  const getPageById = async (id: string) => {
    const res = await api.get(`/pages/${id}`);
    return res.data.data;
  };

  return { ...query, getPageById };
}
