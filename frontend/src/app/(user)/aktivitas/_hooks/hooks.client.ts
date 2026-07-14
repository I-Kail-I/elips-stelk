import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from './hooks';

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5,
  });
}
