'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SejarahForm } from '../../_components/sejarah-form';
import { useCreateSejarah } from '../../_lib/hooks';

export default function CreateSejarahPage() {
  const router = useRouter();
  const mutation = useCreateSejarah();

  const handleSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
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
        <h1 className="font-heading text-3xl font-bold">Buat Sejarah</h1>
        <p className="text-muted-foreground mt-1 text-sm">Tambah entri sejarah baru</p>
      </div>
      <SejarahForm onSubmit={handleSubmit} isPending={mutation.isPending} />
    </div>
  );
}
