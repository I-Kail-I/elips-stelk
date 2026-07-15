'use client';

import AdminNavbar from '@/components/layout/admin-navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AdminNavbar />
      <main className="bg-background mt-20 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}