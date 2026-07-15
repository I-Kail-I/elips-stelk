'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { VisiMisiForm } from '../../../_components/visi-misi-form';
import { useAdminVisiMisi, useUpdateVisiMisi } from '../../../_lib/hooks';

export default function EditVisiMisiPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const numId = Number(id);
  const { data, isLoading } = useAdminVisiMisi(numId);
  const mutation = useUpdateVisiMisi(numId);

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
        <p className="text-muted-foreground text-sm">Entri gak ditemukan</p>
        <Link href="/admin/visi-misi">
          <Button variant="link" className="mt-2 cursor-pointer">Kembali ke Visi & Misi</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    await mutation.mutateAsync(formData);
    router.push('/admin/visi-misi');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/visi-misi"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Visi & Misi
        </Link>
        <h1 className="font-heading text-3xl font-bold">Edit Visi & Misi</h1>
        <p className="text-muted-foreground mt-1 text-sm">Perbarui entri</p>
      </div>
      <VisiMisiForm onSubmit={handleSubmit} isPending={mutation.isPending} defaultValues={data} />
    </div>
  );
}
