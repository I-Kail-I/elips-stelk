import { axiosInstance } from '@/lib/axios';

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export async function login(input: LoginInput): Promise<UserProfile> {
  const res = await axiosInstance.post('/auth/login/email-password', input);
  return res.data.user as UserProfile;
}

export async function logout(): Promise<void> {
  await axiosInstance.post('/auth/logout');
}

export async function getProfile(): Promise<UserProfile> {
  const res = await axiosInstance.get('/user');
  return res.data as UserProfile;
}
