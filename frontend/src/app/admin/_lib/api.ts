import type { ActivityType } from '@/app/(user)/aktivitas/activity.dto';
import type { MemberType } from '@/app/(user)/anggota/member.dto';
import type { SejarahType } from '@/app/(user)/sejarah/sejarah.dto';
import type { VisiDanMisiType } from '@/app/(user)/visi-dan-misi/visi-dan-misi.dto';
import { ActivitySchema } from '@/app/(user)/aktivitas/activity.dto';
import { MemberSchema } from '@/app/(user)/anggota/member.dto';
import { SejarahSchema } from '@/app/(user)/sejarah/sejarah.dto';
import { VisiDanMisiSchema } from '@/app/(user)/visi-dan-misi/visi-dan-misi.dto';
import { axiosInstance } from '@/lib/axios';

/* ─── Activity ─── */

export async function fetchActivities(): Promise<ActivityType[]> {
  const res = await axiosInstance.get('/activity');
  const data = res.data;
  if (Array.isArray(data)) return data.map((item: unknown) => ActivitySchema.parse(item));
  return [ActivitySchema.parse(data)];
}

export async function fetchActivityById(id: number): Promise<ActivityType> {
  const res = await axiosInstance.get(`/activity/${id}`);
  return ActivitySchema.parse(res.data);
}

export async function createActivity(data: FormData): Promise<ActivityType> {
  const res = await axiosInstance.post('/activity', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return ActivitySchema.parse(res.data);
}

export async function updateActivity(id: number, data: FormData): Promise<ActivityType> {
  data.append('_method', 'PUT');
  const res = await axiosInstance.post(`/activity/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return ActivitySchema.parse(res.data);
}

export async function deleteActivity(id: number): Promise<void> {
  await axiosInstance.delete(`/activity/${id}`);
}

/* ─── Member ─── */

export async function fetchMembers(): Promise<MemberType[]> {
  const res = await axiosInstance.get('/member');
  const data = res.data;
  if (Array.isArray(data)) return data.map((item: unknown) => MemberSchema.parse(item));
  return [MemberSchema.parse(data)];
}

export async function fetchMemberById(id: number): Promise<MemberType> {
  const res = await axiosInstance.get(`/member/${id}`);
  return MemberSchema.parse(res.data);
}

export async function createMember(data: FormData): Promise<MemberType> {
  const res = await axiosInstance.post('/member', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return MemberSchema.parse(res.data);
}

export async function updateMember(id: number, data: FormData): Promise<MemberType> {
  data.append('_method', 'PUT');
  const res = await axiosInstance.post(`/member/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return MemberSchema.parse(res.data);
}

export async function deleteMember(id: number): Promise<void> {
  await axiosInstance.delete(`/member/${id}`);
}

/* ─── Sejarah ─── */

export async function fetchSejarahList(): Promise<SejarahType[]> {
  const res = await axiosInstance.get('/sejarah');
  const data = res.data;
  if (Array.isArray(data)) return data.map((item: unknown) => SejarahSchema.parse(item));
  return [SejarahSchema.parse(data)];
}

export async function fetchSejarahById(id: number): Promise<SejarahType> {
  const res = await axiosInstance.get(`/sejarah/${id}`);
  return SejarahSchema.parse(res.data);
}

export async function createSejarah(data: FormData): Promise<SejarahType> {
  const res = await axiosInstance.post('/sejarah', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return SejarahSchema.parse(res.data);
}

export async function updateSejarah(id: number, data: FormData): Promise<SejarahType> {
  data.append('_method', 'PUT');
  const res = await axiosInstance.post(`/sejarah/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return SejarahSchema.parse(res.data);
}

export async function deleteSejarah(id: number): Promise<void> {
  await axiosInstance.delete(`/sejarah/${id}`);
}

/* ─── Visi & Misi ─── */

export async function fetchVisiMisiList(): Promise<VisiDanMisiType[]> {
  const res = await axiosInstance.get('/visi-dan-misi');
  const data = res.data;
  if (Array.isArray(data)) return data.map((item: unknown) => VisiDanMisiSchema.parse(item));
  return [VisiDanMisiSchema.parse(data)];
}

export async function fetchVisiMisiById(id: number): Promise<VisiDanMisiType> {
  const res = await axiosInstance.get(`/visi-dan-misi/${id}`);
  return VisiDanMisiSchema.parse(res.data);
}

export async function createVisiMisi(data: FormData): Promise<VisiDanMisiType> {
  const res = await axiosInstance.post('/visi-dan-misi', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return VisiDanMisiSchema.parse(res.data);
}

export async function updateVisiMisi(id: number, data: FormData): Promise<VisiDanMisiType> {
  data.append('_method', 'PUT');
  const res = await axiosInstance.post(`/visi-dan-misi/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return VisiDanMisiSchema.parse(res.data);
}

export async function deleteVisiMisi(id: number): Promise<void> {
  await axiosInstance.delete(`/visi-dan-misi/${id}`);
}
