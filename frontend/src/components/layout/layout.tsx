import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
