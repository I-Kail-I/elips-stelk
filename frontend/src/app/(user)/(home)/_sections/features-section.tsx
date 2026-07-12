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
    <section className="bg-accent flex flex-col justify-center p-10 md:h-80 md:flex-row">
      {iotFeatures.map((feature, key) => (
        <Features
          key={key}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}
