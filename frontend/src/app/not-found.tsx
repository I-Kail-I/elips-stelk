import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <span className="text-3xl text-orange-700">404 HALAMAN YANG DICARI TIDAK ADA...</span>
      <Image src="/iot-maskot.jpg" alt="maskot iot" width="1000" height="1000" />
    </div>
  );
}
