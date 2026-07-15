'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { SejarahForm } from '../../../_components/sejarah-form';
import { useAdminSejarah, useUpdateSejarah } from '../../../_lib/hooks';

export default function EditSejarahPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const numId = Number(id);
  const { data, isLoading } = useAdminSejarah(numId);
  const mutation = useUpdateSejarah(numId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="border-border bg-card mx-auto max-w-lg rounded-xl border-2 p-8 text-center">
        <p className="text-muted-foreground text-sm">Entri sejarah gak ditemukan</p>
        <Link href="/admin/sejarah">
          <Button variant="link" className="mt-2 cursor-pointer">Kembali ke Sejarah</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    await mutation.mutateAsync(formData);
    router.push('/admin/sejarah');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/sejarah"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Sejarah
        </Link>
        <h1 className="font-heading text-3xl font-bold">Edit Sejarah</h1>
        <p className="text-muted-foreground mt-1 text-sm">Perbarui entri sejarah</p>
      </div>
      <SejarahForm onSubmit={handleSubmit} isPending={mutation.isPending} defaultValues={data} />
    </div>
  );
}
