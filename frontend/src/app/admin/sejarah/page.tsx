'use client';

import { ArrowUpDown, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminTable } from '../_components/admin-table';
import { useAdminSejarahList, useDeleteSejarah } from '../_lib/hooks';

export default function SejarahPage() {
  const { data, isLoading, error } = useAdminSejarahList();
  const deleteMutation = useDeleteSejarah();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'id' | 'title' | 'created_at'>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus entri sejarah ini?')) return;
    setDeletingId(id);
    deleteMutation.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = [...data];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q),
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
          <h1 className="font-heading text-3xl font-bold">Sejarah</h1>
          <p className="text-muted-foreground mt-1 text-sm">Atur entri sejarah</p>
        </div>
        <Link href="/admin/sejarah/create">
          <Button className="cursor-pointer gap-2 shadow-sm">
            <Plus size={16} />
            Tambah Sejarah
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari sejarah..."
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
            accessor: (s: any) => <span className="font-mono text-xs">#{s.id}</span>,
          },
          {
            header: (
              <button onClick={() => toggleSort('title')} className="flex items-center gap-1 cursor-pointer">
                Judul <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (s: any) => (
              <div className="max-w-sm">
                <p className="truncate font-medium">{s.title}</p>
                {s.description && (
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">{s.description}</p>
                )}
              </div>
            ),
          },
          {
            header: (
              <button onClick={() => toggleSort('created_at')} className="flex items-center gap-1 cursor-pointer">
                Dibuat <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (s: any) => (
              <span className="text-muted-foreground whitespace-nowrap text-xs">
                {new Date(s.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            ),
          },
          {
            header: 'Aksi',
            accessor: (s: any) => (
              <div className="flex items-center justify-end gap-1">
                <Link href={`/admin/sejarah/${s.id}/edit`}>
                  <Button variant="ghost" size="icon-xs" className="cursor-pointer">
                    <Pencil size={14} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => handleDelete(s.id)}
                  disabled={deletingId === s.id}
                >
                  {deletingId === s.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
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
