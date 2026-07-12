import { Code, Cpu, Lightbulb } from 'lucide-react';
import React from 'react';
import { Features } from '../_components/features';

export default function FeaturesCard() {
  const iotFeatures = [
    {
      icon: Cpu,
      title: 'Eksplorasi Hardware',
      description:
        'Pelajari dasar merakit mikrokontroler seperti Arduino dan ESP32, serta mengintegrasikan berbagai jenis sensor pintar.',
    },
    {
      icon: Code,
      title: 'Coding & Otomasi',
      description:
        'Asah logika pemrograman untuk mengontrol perangkat fisik secara otomatis dan menghubungkannya ke jaringan internet.',
    },
    {
      icon: Lightbulb,
      title: 'Proyek Inovatif Nyata',
      description:
        'Buat solusi nyata untuk kehidupan sehari-hari, mulai dari sistem Smart Home hingga alat otomasi lainnya.',
    },
  ];

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            Program
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Apa yang akan kamu pelajari</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Dari nol hingga mahir — setiap anggota melewati tiga pilar utama pembelajaran IoT
            bersama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {iotFeatures.map((feature, key) => (
            <Features
              key={key}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
