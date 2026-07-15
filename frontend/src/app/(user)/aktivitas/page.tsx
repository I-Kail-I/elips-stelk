'use client';

import { ErrorSection } from '@/components/error-section';
import { useActivities } from './_hooks/hooks.client';
import {
  ActivityListSection,
  ActivityListSectionSkeleton,
} from './_sections/activity-list-section';

export default function AktivitasPage() {
  const { data, error, isError, isLoading } = useActivities();

  if (isLoading) return <ActivityListSectionSkeleton />;
  if (isError) {
    return (
      <ErrorSection
        subtitle="Aktivitas"
        title="Daftar Aktivitas"
        message={error?.message ?? 'Gagal memuat data aktivitas'}
      />
    );
  }

  return <ActivityListSection activities={data ?? []} />;
}
