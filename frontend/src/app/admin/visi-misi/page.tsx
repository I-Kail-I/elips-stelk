'use client';

import { ArrowUpDown, CheckCircle2, Loader2, Pencil, Plus, Trash2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminTable } from '../_components/admin-table';
import { useAdminVisiMisiList, useDeleteVisiMisi } from '../_lib/hooks';

export default function VisiMisiPage() {
  const { data, isLoading, error } = useAdminVisiMisiList();
  const deleteMutation = useDeleteVisiMisi();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'id' | 'tahun_mulai'>('tahun_mulai');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus entri Visi & Misi ini?')) return;
    setDeletingId(id);
    deleteMutation.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = [...data];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((v) => v.visi.toLowerCase().includes(q));
    }
    items.sort((a, b) => {
      const aVal = a[sortField] ?? 0;
      const bVal = b[sortField] ?? 0;
      const cmp = Number(aVal) - Number(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return items;
  }, [data, search, sortField, sortDir]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Visi & Misi</h1>
          <p className="text-muted-foreground mt-1 text-sm">Atur entri visi & misi</p>
        </div>
        <Link href="/admin/visi-misi/create">
          <Button className="cursor-pointer gap-2 shadow-sm">
            <Plus size={16} />
            Tambah Visi & Misi
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari entri..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <AdminTable
        columns={[
          {
            header: (
              <button onClick={() => toggleSort('id')} className="flex items-center gap-1 cursor-pointer">
                ID <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (v: any) => <span className="font-mono text-xs">#{v.id}</span>,
          },
          {
            header: 'Visi',
            accessor: (v: any) => (
              <div className="max-w-xs">
                <p className="line-clamp-2 text-sm">{v.visi}</p>
              </div>
            ),
          },
          {
            header: 'Misi',
            accessor: (v: any) => (
              <div className="max-w-xs">
                <p className="line-clamp-2 text-xs text-muted-foreground">{v.misi}</p>
              </div>
            ),
          },
          {
            header: (
              <button onClick={() => toggleSort('tahun_mulai')} className="flex items-center gap-1 cursor-pointer">
                Tahun <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (v: any) => (
              <span className="text-xs">{v.tahun_mulai} - {v.tahun_akhir}</span>
            ),
          },
          {
            header: 'Aktif',
            accessor: (v: any) => (
              v.is_active ? (
                <CheckCircle2 size={16} className="text-primary" />
              ) : (
                <XCircle size={16} className="text-muted-foreground" />
              )
            ),
          },
          {
            header: 'Aksi',
            accessor: (v: any) => (
              <div className="flex items-center justify-end gap-1">
                <Link href={`/admin/visi-misi/${v.id}/edit`}>
                  <Button variant="ghost" size="icon-xs" className="cursor-pointer">
                    <Pencil size={14} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => handleDelete(v.id)}
                  disabled={deletingId === v.id}
                >
                  {deletingId === v.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                </Button>
              </div>
            ),
            className: 'w-24 text-right',
          },
        ]}
        data={filtered}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
