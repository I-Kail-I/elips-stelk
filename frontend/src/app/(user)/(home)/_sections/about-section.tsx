'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Trophy, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const stats = [
  { label: 'Active Members', value: '50+', icon: Zap },
  { label: 'IoT Projects', value: '12', icon: Cpu },
  { label: 'Competitions', value: '8', icon: Trophy },
];

export default function AboutSection() {
  return (
    <section className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            About
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Membuka Potensi Siswa Bersama Kami
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative md:col-span-7"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                src="/home/iot-maskot.jpg"
                alt="Students interacting and collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="from-primary/20 absolute inset-0 bg-linear-to-tr via-transparent to-transparent" />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card absolute -bottom-5 -left-5 hidden rounded-xl border-2 p-4 shadow-lg md:block"
            >
              <p className="font-heading text-primary text-2xl font-bold">3+ Years</p>
              <p className="text-muted-foreground text-xs">of innovation</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center md:col-span-5"
          >
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

            <div className="border-border/30 mt-8 grid grid-cols-3 gap-6 border-t pt-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <s.icon className="text-primary h-5 w-5" strokeWidth={1.5} />
                  <p className="font-heading text-2xl font-bold">{s.value}</p>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/visi-dan-misi">
                <button className="text-foreground hover:border-primary hover:text-primary group inline-flex w-fit cursor-pointer items-center gap-1.5 border-b border-dotted pb-0.5 text-base font-medium transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
