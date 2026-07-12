import Image from 'next/image';
import React from 'react';

const stats = [
  { label: 'Active Members', value: '50+' },
  { label: 'IoT Projects', value: '12' },
  { label: 'Competitions', value: '8' },
];

export default function AboutSection() {
  return (
    <section className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            About
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Membuka Potensi Siswa Bersama Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src="/home/iot-maskot.jpg"
                alt="Students interacting and collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center md:col-span-5">
            <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
              Kami menawarkan lingkungan yang dinamis dan suportif untuk membuka potensi setiap
              siswa. Pendekatan pendidikan inovatif kami mendorong eksplorasi, kreativitas, dan
              pembelajaran langsung untuk mempersiapkan masa depan.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
              Dari merakit sirkuit pertama hingga membangun sistem IoT mandiri — setiap anggota
              mendapatkan bimbingan langsung dan kesempatan untuk mewujudkan ide mereka menjadi
              kenyataan.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-2xl font-bold">{s.value}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="text-foreground w-fit cursor-pointer border-b border-dotted pb-0.5 text-base font-medium transition-colors hover:border-primary hover:text-primary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
