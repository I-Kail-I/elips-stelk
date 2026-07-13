import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <div className="flex flex-col items-center gap-4">
        <span className="text-primary font-heading text-6xl font-bold md:text-8xl">404</span>
        <h1 className="text-muted-foreground text-center text-lg md:text-xl">
          Halaman yang dicari tidak ada
        </h1>
      </div>

      <div className="relative h-48 w-48 md:h-72 md:w-72">
        <Image
          src="/iot-maskot.jpg"
          alt="maskot iot"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 192px, 288px"
        />
      </div>

      <Link href="/">
        <Button variant="default" size="lg" className="cursor-pointer gap-2">
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
