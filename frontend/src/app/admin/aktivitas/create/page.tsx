'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActivityForm } from '../../_components/activity-form';
import { useCreateActivity } from '../../_lib/hooks';

export default function CreateActivityPage() {
  const router = useRouter();
  const mutation = useCreateActivity();

  const handleSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
    router.push('/admin/aktivitas');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/aktivitas"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Aktivitas
        </Link>
        <h1 className="font-heading text-3xl font-bold">Buat Aktivitas</h1>
        <p className="text-muted-foreground mt-1 text-sm">Tambah entri aktivitas baru</p>
      </div>
      <ActivityForm onSubmit={handleSubmit} isPending={mutation.isPending} />
    </div>
  );
}
