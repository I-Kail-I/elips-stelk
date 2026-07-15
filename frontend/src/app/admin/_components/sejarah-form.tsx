'use client';

import type { SejarahType } from '@/app/(user)/sejarah/sejarah.dto';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  isPending: boolean;
  defaultValues?: SejarahType;
}

export function SejarahForm({ onSubmit, isPending, defaultValues }: Props) {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
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
          placeholder="Masukin judul sejarah"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
          placeholder="Ceritain peristiwanya..."
          className="border-border focus-visible:border-ring bg-background w-full resize-y rounded-xl border-2 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex items-center gap-3 border-t pt-4">
        <Button type="submit" disabled={isPending} className="cursor-pointer gap-2 shadow-sm">
          {isPending && <Loader2 className="animate-spin" size={16} />}
          {defaultValues ? 'Simpan Sejarah' : 'Buat Sejarah'}
        </Button>
      </div>
    </form>
  );
}
