import type { ActivityType } from '../activity.dto';
import { axiosInstance } from '@/lib/axios';
import { ActivitySchema } from '../activity.dto';

export async function fetchActivity(): Promise<ActivityType> {
  try {
    const activity = await axiosInstance.get('/activity', {
      params: {
        limit: 6,
        sort: 'created_at',
        order: 'desc',
      },
    });

    const validateActivity = ActivitySchema.parse(activity.data);

    return validateActivity;
  } catch (error) {
    console.error('Failed to fetch or validate user:', error);
    throw error;
  }
}
