'use client';

import { LayoutDashboard, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Aktivitas', href: '/admin/aktivitas' },
  { label: 'Anggota', href: '/admin/anggota' },
  { label: 'Sejarah', href: '/admin/sejarah' },
  { label: 'Visi & Misi', href: '/admin/visi-misi' },
  { label: 'Home', href: '/' },
];

export default function AdminNavbar() {
  const [screenIsMoving, setScreenIsMoving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const route = usePathname();

  useEffect(() => {
    if (window.scrollY >= 5) {
      // eslint-disable-next-line react/set-state-in-effect
      setScreenIsMoving(true);
    }
    const handleScroll = () => {
      setScreenIsMoving(window.scrollY >= 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [route]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={`fixed z-99 flex items-center justify-between px-4 transition-all duration-400 md:px-10 ${
          screenIsMoving
            ? 'bg-primary/40 dark:bg-primary/30 top-5 right-5 left-5 h-20 rounded-full backdrop-blur-2xl dark:backdrop-blur-2xl'
            : 'bg-primary dark:bg-primary/80 top-0 right-0 left-0 h-20'
        } ${isMobileMenuOpen ? 'pointer-events-none -translate-y-full opacity-0' : 'opacity-100'}`}
        style={{
          width: screenIsMoving ? 'calc(100% - 40px)' : '100%',
        }}
      >
        <Link className="flex w-full max-w-50 items-center justify-start gap-3" href="/admin">
          <Image src="/ELIPS.jpeg" width={40} height={40} alt="ELIPS Logo" priority />
          <span className="text-foreground font-serif text-lg md:text-xl">Panel Admin</span>
        </Link>

        <div className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? route === '/admin'
                : route === item.href || route.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`hover:border-b-foreground cursor-pointer border-b-2 border-transparent transition-all duration-200 hover:bg-transparent ${
                    isActive ? 'border-b-foreground border-b-2 bg-transparent' : ''
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer hover:bg-transparent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="bg-background animate-slide-in-right absolute top-0 right-0 h-full w-64 shadow-lg">
            <div className="flex flex-col space-y-4 p-6 pt-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 cursor-pointer"
              >
                <X size={24} />
              </Button>

              {navItems.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? route === '/admin'
                    : route === item.href || route.startsWith(`${item.href}/`);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-lg transition-all duration-200 ${
                        isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
