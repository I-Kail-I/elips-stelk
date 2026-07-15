/* eslint-disable react/no-leaked-conditional-rendering */
'use client';

import type { ActivityType } from '@/app/(user)/aktivitas/activity.dto';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MarkdownEditor } from '@/components/markdown-editor';
import { axiosInstance } from '@/lib/axios';

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  isPending: boolean;
  defaultValues?: ActivityType;
}

export function ActivityForm({ onSubmit, isPending, defaultValues }: Props) {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const coverImageUrl = defaultValues?.cover_image;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);

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
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Judul</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Masukin judul aktivitas"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Deskripsi</label>
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          placeholder="Ceritain aktivitasnya..."
        />
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
          {defaultValues ? 'Simpan Aktivitas' : 'Buat Aktivitas'}
        </Button>
      </div>
    </form>
  );
}