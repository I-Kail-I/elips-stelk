import { axiosInstance } from '@/lib/axios';

import { SejarahSchema, SejarahType } from '../sejarah.dto';

export async function fetchSejarah(): Promise<SejarahType> {
  try {
    const response = await axiosInstance.get('/sejarah');

    const validateResponse = SejarahSchema.parse(response.data);

    return validateResponse;
  } catch (error) {
    console.error('Failed to fetch or validate sejarah:', error);
    throw error;
  }
}
