'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import PageTransition from './page-transition';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = usePathname();

  if (route.startsWith('/admin')) {
    return (
      <>
        <div className="">{children}</div>
      </>
    );
  } else {
    return (
      <>
        <PageTransition>
          <Navbar />
          <div className="mt-20">{children}</div>
          <Footer />
        </PageTransition>
      </>
    );
  }
}
