import type { VisiDanMisiType } from '../visi-dan-misi.dto';
import { axiosInstance } from '@/lib/axios';
import { VisiDanMisiSchema } from '../visi-dan-misi.dto';

export async function fetchVisiDanMisi(): Promise<VisiDanMisiType> {
  try {
    const response = await axiosInstance.get('/visi-dan-misi/active');

    const validated = VisiDanMisiSchema.parse(response.data);

    return validated;
  } catch (error) {
    console.error('Failed to fetch or validate visi dan misi:', error);
    throw error;
  }
}
