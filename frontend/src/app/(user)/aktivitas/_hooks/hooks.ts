import type { ActivityType } from '../activity.dto';
import { axiosInstance } from '@/lib/axios';
import { ActivitySchema } from '../activity.dto';

export async function fetchActivities(): Promise<ActivityType[]> {
  try {
    const response = await axiosInstance.get('/activity');
    const data = response.data;
    if (Array.isArray(data)) {
      return data.map((item: unknown) => ActivitySchema.parse(item));
    }
    return [ActivitySchema.parse(data)];
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    throw error;
  }
}
