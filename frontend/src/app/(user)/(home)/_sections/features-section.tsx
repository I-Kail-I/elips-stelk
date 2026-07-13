'use client';

import { motion } from 'framer-motion';
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
      step: '01',
    },
    {
      icon: Code,
      title: 'Coding & Otomasi',
      description:
        'Asah logika pemrograman untuk mengontrol perangkat fisik secara otomatis dan menghubungkannya ke jaringan internet.',
      step: '02',
    },
    {
      icon: Lightbulb,
      title: 'Proyek Inovatif Nyata',
      description:
        'Buat solusi nyata untuk kehidupan sehari-hari, mulai dari sistem Smart Home hingga alat otomasi lainnya.',
      step: '03',
    },
  ];

  return (
    <section className="bg-muted relative overflow-hidden py-16 md:py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 max-w-xl"
        >
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            Program
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Apa yang akan kamu pelajari
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Dari nol hingga mahir — setiap anggota melewati tiga pilar utama pembelajaran IoT
            bersama kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {iotFeatures.map((feature, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: key * 0.12 }}
              className="relative"
            >
              <span className="font-heading text-foreground/5 absolute -top-6 -right-2 text-6xl font-bold select-none">
                {feature.step}
              </span>
              <Features
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
