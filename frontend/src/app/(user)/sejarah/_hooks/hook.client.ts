import { useQuery } from '@tanstack/react-query';
import { fetchSejarah } from './hook';

export function useSejarah() {
  return useQuery({
    queryKey: ['sejarah'],
    queryFn: fetchSejarah,
    staleTime: 1000 * 60 * 5,
  });
}
