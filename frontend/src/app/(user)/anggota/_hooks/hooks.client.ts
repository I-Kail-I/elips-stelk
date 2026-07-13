import { useQuery } from '@tanstack/react-query';
import { fetchMembers } from './hooks';

export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
    staleTime: 1000 * 60 * 5,
  });
}
