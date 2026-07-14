'use client';

import { Users } from 'lucide-react';
import { useMemo } from 'react';
import { useMembers } from './_hooks/hooks.client';
import { CurrentAnggotaSection } from './_sections/current-anggota-section';
import { KetuaListSection } from './_sections/ketua-list-section';
import { MemberListSection } from './_sections/member-list-section';

function LoadingSkeleton() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-border mb-12 border-b pb-6 text-center">
          <div className="bg-primary/20 mx-auto mb-2 h-3 w-24 rounded" />
          <div className="bg-foreground/10 mx-auto h-8 w-56 rounded md:h-10" />
          <div className="bg-muted mx-auto mt-2 h-4 w-64 rounded" />
        </div>
        <div className="mx-auto mb-8 max-w-xs">
          <div className="bg-card border-border overflow-hidden rounded-2xl border-2">
            <div className="bg-muted aspect-4/3 w-full animate-pulse" />
            <div className="flex flex-col items-center gap-2 p-6">
              <div className="bg-foreground/10 h-5 w-32 animate-pulse rounded" />
              <div className="bg-muted h-4 w-48 animate-pulse rounded" />
            </div>
          </div>
        </div>
        <div className="bg-primary/20 mx-auto mb-6 h-8 w-0.5" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card border-border overflow-hidden rounded-xl border-2">
              <div className="bg-muted aspect-4/3 w-full animate-pulse" />
              <div className="flex flex-col gap-2 p-5">
                <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                <div className="bg-foreground/10 h-5 w-40 animate-pulse rounded" />
                <div className="bg-muted h-3 w-24 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ErrorSection({ message }: { message?: string }) {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-border mb-12 border-b pb-6 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
            Anggota Kami
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Data Anggota</h2>
        </div>

        <div className="flex flex-col items-center rounded-xl border-2 border-red-400/50 bg-red-50/50 p-8 text-center dark:bg-red-950/20">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-300 bg-red-100 dark:border-red-700">
            <Users className="h-6 w-6 text-red-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Gagal memuat data anggota
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{message}</p>
        </div>
      </div>
    </section>
  );
}

export default function AnggotaPage() {
  const { data, error, isError, isLoading } = useMembers();

  const derived = useMemo(() => {
    if (!data)
      return { currentKetua: undefined, anggotaAktif: [], alumniKetua: [], allMembers: [] };

    const currentKetua = data.find((m) => m.is_leader_active && m.role === 'ketua');
    const anggotaAktif = data.filter(
      (m) => !m.is_tamat && !(m.is_leader_active && m.role === 'ketua'),
    );
    const alumniKetua = data.filter((m) => m.is_tamat && m.role === 'ketua');
    const allMembers = data.filter((m) => !(m.is_leader_active && m.role === 'ketua'));

    return { currentKetua, anggotaAktif, alumniKetua, allMembers };
  }, [data]);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorSection message={error?.message} />;

  return (
    <>
      {derived.currentKetua && derived.anggotaAktif.length > 0 && (
        <CurrentAnggotaSection ketua={derived.currentKetua} anggota={derived.anggotaAktif} />
      )}
      <KetuaListSection alumni={derived.alumniKetua} />
      <MemberListSection members={derived.allMembers} />
    </>
  );
}
