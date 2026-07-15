'use client';

import type { MemberType } from '@/app/(user)/anggota/member.dto';
import { ImagePlus, Loader2 } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { MarkdownEditor } from '@/components/markdown-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axiosInstance } from '@/lib/axios';

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  isPending: boolean;
  defaultValues?: MemberType;
}

export function MemberForm({ onSubmit, isPending, defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name ?? '');
  const [role, setRole] = useState(defaultValues?.role ?? '');
  const [message, setMessage] = useState(defaultValues?.message ?? '');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [isLeaderActive, setIsLeaderActive] = useState(defaultValues?.is_leader_active ?? false);
  const [isTamat, setIsTamat] = useState(defaultValues?.is_tamat ?? false);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const coverImageUrl = defaultValues?.cover_image;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('role', role);
    fd.append('message', message);
    fd.append('is_leader_active', String(isLeaderActive));
    fd.append('is_tamat', String(isTamat));

    if (coverImage) {
      setUploadingCover(true);
      try {
        const coverFd = new FormData();
        coverFd.append('file', coverImage);
        const res = await axiosInstance.post('/files/upload', coverFd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        fd.append('cover_image', `/api/uploads/${res.data.filename}`);
      } finally {
        setUploadingCover(false);
      }
    }

    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="border-border bg-card max-w-2xl space-y-6 rounded-xl border-2 p-6">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Nama</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Masukin nama anggota"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Jabatan</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="border-border focus-visible:border-ring bg-background w-full rounded-xl border-2 px-3 py-2 text-sm outline-none transition-colors"
        >
          <option value="" disabled>Pilih jabatan</option>
          <option value="Ketua">Ketua</option>
          <option value="Anggota">Anggota</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Pesan</label>
        <MarkdownEditor
          value={message}
          onChange={setMessage}
          placeholder="Pesan atau kutipan (opsional)"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isLeaderActive}
            onChange={(e) => setIsLeaderActive(e.target.checked)}
            className="border-border size-4 accent-current"
          />
          <span className="font-medium">Ketua Aktif</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isTamat}
            onChange={(e) => setIsTamat(e.target.checked)}
            className="border-border size-4 accent-current"
          />
          <span className="font-medium">Alumni</span>
        </label>
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Cover</label>
        <label className="border-border hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm transition-colors">
          <ImagePlus size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">{coverImage ? coverImage.name : 'Pilih cover'}</span>
          <input
            ref={coverFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
          />
        </label>
        {uploadingCover && (
          <div className="mt-2 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            <span className="text-muted-foreground text-xs">Uploading cover...</span>
          </div>
        )}
        {coverImageUrl && !coverImage && (
          <div className="mt-2 flex items-center gap-2">
            <img
              src={coverImageUrl}
              alt="Cover"
              className="border-border h-16 w-32 rounded-lg border object-cover"
            />
            <span className="text-muted-foreground text-xs">Cover sekarang</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t pt-4">
        <Button type="submit" disabled={isPending || uploadingCover} className="cursor-pointer gap-2 shadow-sm">
          {isPending && <Loader2 className="animate-spin" size={16} />}
          {defaultValues ? 'Simpan Anggota' : 'Buat Anggota'}
        </Button>
      </div>
    </form>
  );
}
