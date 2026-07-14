import { useQuery } from '@tanstack/react-query';
import { fetchVisiDanMisi } from './hook';

export function useVisiDanMisi() {
  return useQuery({
    queryKey: ['visi-dan-misi'],
    queryFn: fetchVisiDanMisi,
    staleTime: 1000 * 60 * 5,
  });
}
