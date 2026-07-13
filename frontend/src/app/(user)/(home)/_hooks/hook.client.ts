import { useQuery } from '@tanstack/react-query';
import { fetchActivity } from './hook';

export function useMember() {
  return useQuery({
    queryKey: ['member'],
    queryFn: fetchActivity,
    staleTime: 1000 * 60 * 5,
  });
}
