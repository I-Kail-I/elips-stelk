'use client';

import { useActivities } from './_hooks/hooks.client';
import {
  ActivityListSection,
  ActivityListSectionSkeleton,
} from './_sections/activity-list-section';

function ErrorSection({ message }: { message?: string }) {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-border mb-12 border-b pb-6 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
            Aktivitas
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Daftar Aktivitas</h2>
        </div>

        <div className="flex flex-col items-center rounded-xl border-2 border-red-400/50 bg-red-50/50 p-8 text-center dark:bg-red-950/20">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Gagal memuat data aktivitas
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{message}</p>
        </div>
      </div>
    </section>
  );
}

export default function AktivitasPage() {
  const { data, error, isError, isLoading } = useActivities();

  if (isLoading) return <ActivityListSectionSkeleton />;
  if (isError) return <ErrorSection message={error?.message} />;

  return <ActivityListSection activities={data ?? []} />;
}
