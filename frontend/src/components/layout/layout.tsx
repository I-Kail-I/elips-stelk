import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import PageTransition from './page-transition';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageTransition>
        <Navbar />
        <div className="mt-20">{children}</div>
      </PageTransition>
      <Footer />
    </>
  );
}
