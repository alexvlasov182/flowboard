import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const res = await api.get('/pages');
      return res.data; // backend returns { success, data }
    },
  });
}
