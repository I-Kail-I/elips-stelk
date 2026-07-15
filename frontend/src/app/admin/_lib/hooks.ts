'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createActivity,
  createMember,
  createSejarah,
  createVisiMisi,
  deleteActivity,
  deleteMember,
  deleteSejarah,
  deleteVisiMisi,
  fetchActivities,
  fetchActivityById,
  fetchMemberById,
  fetchMembers,
  fetchSejarahById,
  fetchSejarahList,
  fetchVisiMisiById,
  fetchVisiMisiList,
  updateActivity,
  updateMember,
  updateSejarah,
  updateVisiMisi,
} from './api';

/* ─── Activity ─── */

export function useAdminActivities() {
  return useQuery({ queryKey: ['admin', 'activities'], queryFn: fetchActivities });
}

export function useAdminActivity(id: number) {
  return useQuery({ queryKey: ['admin', 'activity', id], queryFn: async () => fetchActivityById(id) });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => createActivity(data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'activities'] }),
  });
}

export function useUpdateActivity(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => updateActivity(id, data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'activities'] }),
  });
}

export function useDeleteActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteActivity(id),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'activities'] }),
  });
}

/* ─── Member ─── */

export function useAdminMembers() {
  return useQuery({ queryKey: ['admin', 'members'], queryFn: fetchMembers });
}

export function useAdminMember(id: number) {
  return useQuery({ queryKey: ['admin', 'member', id], queryFn: async () => fetchMemberById(id) });
}

export function useCreateMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => createMember(data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'members'] }),
  });
}

export function useUpdateMember(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => updateMember(id, data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'members'] }),
  });
}

export function useDeleteMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteMember(id),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'members'] }),
  });
}

/* ─── Sejarah ─── */

export function useAdminSejarahList() {
  return useQuery({ queryKey: ['admin', 'sejarah'], queryFn: fetchSejarahList });
}

export function useAdminSejarah(id: number) {
  return useQuery({ queryKey: ['admin', 'sejarah', id], queryFn: async () => fetchSejarahById(id) });
}

export function useCreateSejarah() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => createSejarah(data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'sejarah'] }),
  });
}

export function useUpdateSejarah(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => updateSejarah(id, data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'sejarah'] }),
  });
}

export function useDeleteSejarah() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteSejarah(id),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'sejarah'] }),
  });
}

/* ─── Visi & Misi ─── */

export function useAdminVisiMisiList() {
  return useQuery({ queryKey: ['admin', 'visi-misi'], queryFn: fetchVisiMisiList });
}

export function useAdminVisiMisi(id: number) {
  return useQuery({
    queryKey: ['admin', 'visi-misi', id],
    queryFn: async () => fetchVisiMisiById(id),
  });
}

export function useCreateVisiMisi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => createVisiMisi(data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'visi-misi'] }),
  });
}

export function useUpdateVisiMisi(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => updateVisiMisi(id, data),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'visi-misi'] }),
  });
}

export function useDeleteVisiMisi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteVisiMisi(id),
    onSuccess: async () => qc.invalidateQueries({ queryKey: ['admin', 'visi-misi'] }),
  });
}
