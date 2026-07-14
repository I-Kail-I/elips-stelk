import { Dot } from 'lucide-react';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface VisiMisiCardProps {
  visi: string;
  misi: string;
  tahunMulai: number;
  tahunAkhir: number;
}

function parseMisiItems(misi: string): string[] {
  const items = misi
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length > 1 ? items : [misi];
}

export function VisiMisiCard({ visi, misi, tahunMulai, tahunAkhir }: VisiMisiCardProps) {
  const misiItems = parseMisiItems(misi);

  return (
    <div className="flex flex-col">
      {/* Visi */}
      <div className="text-center">
        <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">Visi</p>
        <blockquote className="font-heading text-foreground mx-auto max-w-2xl text-2xl leading-snug font-bold md:text-3xl md:leading-tight">
          &ldquo;{visi}&rdquo;
        </blockquote>
      </div>

      {/* Timeline milestone — signature element */}
      <div className="my-14 md:my-18">
        <div className="relative flex items-center justify-between">
          <div className="bg-primary z-10 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-primary-foreground text-xs font-bold">
              {String(tahunMulai).slice(2)}
            </span>
          </div>
          <div className="bg-primary/20 absolute right-4 left-4 h-0.5" />
          <div className="bg-primary z-10 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-primary-foreground text-xs font-bold">
              {String(tahunAkhir).slice(2)}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground/60 mt-2 text-center text-xs font-medium tracking-wider uppercase">
          {tahunMulai} — {tahunAkhir}
        </p>
      </div>

      {/* Misi */}
      <div>
        <p className="text-primary mb-6 text-center text-xs font-bold tracking-[0.2em] uppercase">
          Misi
        </p>
        <ul className="mx-auto max-w-2xl space-y-4">
          {misiItems.map((item, i) => (
            <li key={i} className="text-muted-foreground flex items-start gap-3 leading-relaxed">
              <Dot className="text-primary mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function VisiMisiCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="mb-2 h-3 w-12" />
      <Skeleton className="h-8 w-3/4 md:h-10" />
      <Skeleton className="mt-2 h-8 w-2/3 md:h-10" />

      <div className="my-14 flex w-full items-center justify-between md:my-18">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="mx-4 h-0.5 flex-1" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <Skeleton className="mb-6 h-3 w-12" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="mb-3 flex w-full max-w-2xl items-start gap-3">
          <Skeleton className="mt-1 h-4 w-4 shrink-0 rounded-full" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}
