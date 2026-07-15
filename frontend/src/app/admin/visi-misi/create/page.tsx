'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisiMisiForm } from '../../_components/visi-misi-form';
import { useCreateVisiMisi } from '../../_lib/hooks';

export default function CreateVisiMisiPage() {
  const router = useRouter();
  const mutation = useCreateVisiMisi();

  const handleSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
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
        <h1 className="font-heading text-3xl font-bold">Buat Visi & Misi</h1>
        <p className="text-muted-foreground mt-1 text-sm">Tambah entri baru</p>
      </div>
      <VisiMisiForm onSubmit={handleSubmit} isPending={mutation.isPending} />
    </div>
  );
}