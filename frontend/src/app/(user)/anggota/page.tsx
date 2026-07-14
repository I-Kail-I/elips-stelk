'use client';

import { useMemo } from 'react';
import { ErrorState } from './_components/error-state';
import { HeaderSection } from './_components/header-section';
import { LoadingGrid } from './_components/loading-grid';
import { useMembers } from './_hooks/hooks.client';
import { AlumniKetuaSection } from './_sections/alumni-ketua-section';
import { AlumniSection } from './_sections/alumni-section';
import { AnggotaAktifSection } from './_sections/anggota-aktif-section';
import { KetuaSection } from './_sections/ketua-section';

export default function AnggotaPage() {
  const { data, error, isError, isLoading } = useMembers();

  const { currentKetua, anggotaAktif, alumniKetua, alumni } = useMemo(() => {
    if (!data) return { currentKetua: undefined, anggotaAktif: [], alumniKetua: [], alumni: [] };

    const currentKetua = data.find((m) => m.is_leader_active && m.role === 'ketua');
    const anggotaAktif = data.filter(
      (m) => !m.is_tamat && !(m.is_leader_active && m.role === 'ketua'),
    );
    const alumniKetua = data.filter((m) => m.is_tamat && m.role === 'ketua');
    const alumni = data.filter((m) => m.is_tamat && m.role !== 'ketua');

    return { currentKetua, anggotaAktif, alumniKetua, alumni };
  }, [data]);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <HeaderSection />
          <LoadingGrid />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <HeaderSection />
          <ErrorState message={error?.message} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="bg-primary/5 absolute top-0 -right-24 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-accent/5 absolute bottom-0 -left-24 h-96 w-96 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
        </div>
        <div className="mx-auto max-w-6xl">
          <HeaderSection />
        </div>
      </section>

      {currentKetua && <KetuaSection ketua={currentKetua} />}
      <AnggotaAktifSection anggota={anggotaAktif} />
      <AlumniKetuaSection alumni={alumniKetua} />
      <AlumniSection alumni={alumni} />
    </>
  );
}
