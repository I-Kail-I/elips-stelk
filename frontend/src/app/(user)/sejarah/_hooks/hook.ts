import type { SejarahType } from '../sejarah.dto';
import { axiosInstance } from '@/lib/axios';
import { SejarahSchema } from '../sejarah.dto';

export async function fetchSejarah(): Promise<SejarahType[]> {
  try {
    const response = await axiosInstance.get('/sejarah');
    const data = response.data;
    if (Array.isArray(data)) {
      return data.map((item: unknown) => SejarahSchema.parse(item));
    }
    return [SejarahSchema.parse(data)];
  } catch (error) {
    console.error('Failed to fetch or validate sejarah:', error);
    throw error;
  }
}
