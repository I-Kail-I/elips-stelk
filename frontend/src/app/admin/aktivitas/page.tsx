'use client';

import { ArrowUpDown, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminTable } from '../_components/admin-table';
import { useAdminActivities, useDeleteActivity } from '../_lib/hooks';

export default function AktivitasPage() {
  const { data, isLoading, error } = useAdminActivities();
  const deleteMutation = useDeleteActivity();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'id' | 'title' | 'created_at'>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus aktivitas ini?')) return;
    setDeletingId(id);
    deleteMutation.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = [...data];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q),
      );
    }
    items.sort((a, b) => {
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(String(bVal)) : Number(aVal) - Number(bVal);
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
          <h1 className="font-heading text-3xl font-bold">Aktivitas</h1>
          <p className="text-muted-foreground mt-1 text-sm">Atur entri aktivitas</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/aktivitas/create">
            <Button className="cursor-pointer gap-2 shadow-sm">
              <Plus size={16} />
              Tambah Aktivitas
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari aktivitas..."
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
            accessor: (a: any) => <span className="font-mono text-xs">#{a.id}</span>,
          },
          {
            header: (
              <button onClick={() => toggleSort('title')} className="flex items-center gap-1 cursor-pointer">
                Judul <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (a: any) => (
              <div className="max-w-xs">
                <p className="truncate font-medium">{a.title}</p>
                {a.description && (
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">{a.description}</p>
                )}
              </div>
            ),
          },
          {
            header: (
              <button onClick={() => toggleSort('created_at')} className="flex items-center gap-1 cursor-pointer">
                Tanggal <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (a: any) => (
              <span className="text-muted-foreground whitespace-nowrap text-xs">
                {new Date(a.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            ),
          },
          {
            header: 'Pratinjau',
            accessor: (a: any) =>
              a.image ? (
                <img
                  src={a.image}
                  alt={a.title}
                  className="border-border h-10 w-14 rounded-md border object-cover"
                />
              ) : (
                <span className="text-muted-foreground text-xs">—</span>
              ),
          },
          {
            header: 'Aksi',
            accessor: (a: any) => (
              <div className="flex items-center justify-end gap-1">
                <Link href={`/admin/aktivitas/${a.id}/edit`}>
                  <Button variant="ghost" size="icon-xs" className="cursor-pointer">
                    <Pencil size={14} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                >
                  {deletingId === a.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
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
