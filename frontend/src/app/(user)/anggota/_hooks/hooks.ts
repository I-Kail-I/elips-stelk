import type { MemberType } from '../member.dto';
import { axiosInstance } from '@/lib/axios';
import { MemberSchema } from '../member.dto';

export async function fetchMembers(): Promise<MemberType[]> {
  try {
    const response = await axiosInstance.get('/member');
    const data = response.data;
    if (Array.isArray(data)) {
      return data.map((item: unknown) => MemberSchema.parse(item));
    }
    return [MemberSchema.parse(data)];
  } catch (error) {
    console.error('Failed to fetch members:', error);
    throw error;
  }
}

export async function fetchMemberById(id: number): Promise<MemberType> {
  try {
    const response = await axiosInstance.get(`/member/${id}`);
    return MemberSchema.parse(response.data);
  } catch (error) {
    console.error('Failed to fetch member:', error);
    throw error;
  }
}
