'use client';

import type { VisiDanMisiType } from '@/app/(user)/visi-dan-misi/visi-dan-misi.dto';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  isPending: boolean;
  defaultValues?: VisiDanMisiType;
}

export function VisiMisiForm({ onSubmit, isPending, defaultValues }: Props) {
  const [visi, setVisi] = useState(defaultValues?.visi ?? '');
  const [misi, setMisi] = useState(defaultValues?.misi ?? '');
  const [tahunMulai, setTahunMulai] = useState(() => defaultValues?.tahun_mulai ?? new Date().getFullYear());
  const [tahunAkhir, setTahunAkhir] = useState(() => defaultValues?.tahun_akhir ?? new Date().getFullYear() + 1);
  const [isActive, setIsActive] = useState(defaultValues?.is_active ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('visi', visi);
    fd.append('misi', misi);
    fd.append('tahun_mulai', String(tahunMulai));
    fd.append('tahun_akhir', String(tahunAkhir));
    fd.append('is_active', String(isActive));
    await onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="border-border bg-card max-w-2xl space-y-6 rounded-xl border-2 p-6">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Visi</label>
        <textarea
          value={visi}
          onChange={(e) => setVisi(e.target.value)}
          required
          rows={3}
          placeholder="Masukin pernyataan visi..."
          className="border-border focus-visible:border-ring bg-background w-full resize-y rounded-xl border-2 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-bold tracking-wider uppercase">Misi</label>
        <textarea
          value={misi}
          onChange={(e) => setMisi(e.target.value)}
          required
          rows={3}
          placeholder="Masukin pernyataan misi..."
          className="border-border focus-visible:border-ring bg-background w-full resize-y rounded-xl border-2 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-1.5">
          <label className="text-foreground text-xs font-bold tracking-wider uppercase">Tahun Mulai</label>
          <Input type="number" value={tahunMulai} onChange={(e) => setTahunMulai(Number(e.target.value))} required />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="text-foreground text-xs font-bold tracking-wider uppercase">Tahun Akhir</label>
          <Input type="number" value={tahunAkhir} onChange={(e) => setTahunAkhir(Number(e.target.value))} required />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="border-border size-4 accent-current"
        />
        <span className="font-medium">Aktif</span>
      </label>

      <div className="flex items-center gap-3 border-t pt-4">
        <Button type="submit" disabled={isPending} className="cursor-pointer gap-2 shadow-sm">
          {isPending && <Loader2 className="animate-spin" size={16} />}
          {defaultValues ? 'Simpan Entri' : 'Buat Entri'}
        </Button>
      </div>
    </form>
  );
}