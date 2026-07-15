'use client';

import { ArrowUpDown, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminTable } from '../_components/admin-table';
import { useAdminMembers, useDeleteMember } from '../_lib/hooks';

export default function AnggotaPage() {
  const { data, isLoading, error } = useAdminMembers();
  const deleteMutation = useDeleteMember();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'role'>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleDelete = (id: number) => {
    if (!window.confirm('Hapus anggota ini?')) return;
    setDeletingId(id);
    deleteMutation.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = [...data];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role?.toLowerCase().includes(q),
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
          <h1 className="font-heading text-3xl font-bold">Anggota</h1>
          <p className="text-muted-foreground mt-1 text-sm">Atur entri anggota</p>
        </div>
        <Link href="/admin/anggota/create">
          <Button className="cursor-pointer gap-2 shadow-sm">
            <Plus size={16} />
            Tambah Anggota
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari anggota..."
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
            accessor: (m: any) => <span className="font-mono text-xs">#{m.id}</span>,
          },
          {
            header: (
              <button onClick={() => toggleSort('name')} className="flex items-center gap-1 cursor-pointer">
                Nama <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (m: any) => (
              <div className="flex items-center gap-3">
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="border-border h-8 w-8 rounded-full border object-cover"
                  />
                )}
                <span className="font-medium">{m.name}</span>
              </div>
            ),
          },
          {
            header: (
              <button onClick={() => toggleSort('role')} className="flex items-center gap-1 cursor-pointer">
                Jabatan <ArrowUpDown size={12} />
              </button>
            ),
            accessor: (m: any) => <span className="text-xs">{m.role}</span>,
          },
          {
            header: 'Status',
            accessor: (m: any) => (
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                  m.is_leader_active
                    ? 'bg-primary/10 text-primary'
                    : m.is_tamat
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-secondary/20 text-secondary-foreground'
                }`}
              >
                {m.is_leader_active ? 'Ketua' : m.is_tamat ? 'Alumni' : 'Anggota'}
              </span>
            ),
          },
          {
            header: 'Aksi',
            accessor: (m: any) => (
              <div className="flex items-center justify-end gap-1">
                <Link href={`/admin/anggota/${m.id}/edit`}>
                  <Button variant="ghost" size="icon-xs" className="cursor-pointer">
                    <Pencil size={14} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => handleDelete(m.id)}
                  disabled={deletingId === m.id}
                >
                  {deletingId === m.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
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
