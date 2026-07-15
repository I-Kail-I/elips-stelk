'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MemberForm } from '../../_components/member-form';
import { useCreateMember } from '../../_lib/hooks';

export default function CreateMemberPage() {
  const router = useRouter();
  const mutation = useCreateMember();

  const handleSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
    router.push('/admin/anggota');
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/anggota"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Anggota
        </Link>
        <h1 className="font-heading text-3xl font-bold">Buat Anggota</h1>
        <p className="text-muted-foreground mt-1 text-sm">Tambah anggota baru</p>
      </div>
      <MemberForm onSubmit={handleSubmit} isPending={mutation.isPending} />
    </div>
  );
}