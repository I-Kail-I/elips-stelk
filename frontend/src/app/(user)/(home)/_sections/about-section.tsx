import Image from 'next/image';
import React from 'react';
import { Card } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Left Side */}
        <Card className="relative flex flex-col justify-between overflow-hidden rounded-none bg-slate-900 p-8 text-white md:col-span-7 md:p-12 lg:min-h-125">
          {/* Text Content */}
          <div className="z-10">
            <span className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
              About
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">
              Membuka Potensi Siswa Bersama Kami
            </h2>
          </div>

          <div className="relative mt-8 h-48 w-full overflow-hidden rounded-2xl md:h-64 lg:h-72">
            <Image
              src="/home/iot-maskot.jpg"
              alt="Students interacting and collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Card>

        {/* Right side */}
        <div className="flex flex-col gap-8 md:col-span-5">
          <div className="relative h-56 w-full overflow-hidden rounded-3xl md:h-64 lg:h-72">
            <Image
              src="/home/fotbar.jpg"
              alt="Student with backpack holding books"
              fill
              className="object-cover object-[center_65%]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          {/* Text and Button */}
          <div className="flex flex-1 flex-col justify-center gap-6">
            <p className="text-muted-foreground text-base font-medium md:text-lg">
              Kami menawarkan lingkungan yang dinamis dan suportif untuk membuka potensi setiap
              siswa. Pendekatan pendidikan inovatif kami mendorong eksplorasi, kreativitas, dan
              pembelajaran langsung untuk mempersiapkan masa depan.{' '}
            </p>

            <div>
              <button className="border-accent-foreground w-fit cursor-pointer border-b border-dotted text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
