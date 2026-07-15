'use client';

import { Activity, History, Lightbulb, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { useAdminActivities, useAdminMembers, useAdminSejarahList, useAdminVisiMisiList } from './_lib/hooks';

const cards = [
  { label: 'Aktivitas', href: '/admin/aktivitas', icon: Activity, hook: useAdminActivities, desc: 'Atur entri aktivitas' },
  { label: 'Anggota', href: '/admin/anggota', icon: Users, hook: useAdminMembers, desc: 'Atur entri anggota' },
  { label: 'Sejarah', href: '/admin/sejarah', icon: History, hook: useAdminSejarahList, desc: 'Atur entri sejarah' },
  { label: 'Visi & Misi', href: '/admin/visi-misi', icon: Lightbulb, hook: useAdminVisiMisiList, desc: 'Atur visi & misi' },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-2">
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Pantau konten CMS lo di sini</p>
      </div>

      <div className="border-border bg-card mb-8 rounded-xl border-2 p-5">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Halo! Selamat datang di panel CMS ELIPS. Pakai navigasi di atas buat ngatur konten
          Aktivitas, Anggota, Sejarah, sama Visi & Misi. Bagian Home nunjukin gimana konten
          tampil di halaman utama.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {cards.map((card) => {
          return <StatCard key={card.label} {...card} />;
        })}
      </div>
    </div>
  );
}

function StatCard({ label, href, desc, icon: Icon, hook: useHook }: typeof cards[0]) {
  const { data, isLoading } = useHook();
  return (
    <Link href={href}>
      <div className="border-border bg-card hover:bg-muted group rounded-xl border-2 p-6 transition-all hover:-translate-y-0.5">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary rounded-lg p-3">
            <Icon size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-2xl font-bold">
              {isLoading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                (data?.length ?? 0)
              )}
            </p>
            <p className="text-foreground text-base font-semibold">{label}</p>
            <p className="text-muted-foreground mt-0.5 text-xs">{desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
