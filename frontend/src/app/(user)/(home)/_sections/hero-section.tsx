'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Rocket, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { HeroSlider } from '../_components/hero-slider';

const stats = [
  { label: 'Members', value: '50+', icon: Users },
  { label: 'Projects', value: '10+', icon: Rocket },
  { label: 'Years Active', value: '3+', icon: Calendar },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden py-16 md:py-24">
      {/* Animated background blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-primary/5 absolute top-0 right-0 -z-10 h-96 w-96 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="bg-accent/5 absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full blur-3xl"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-16"
        >
          <div className="max-w-2xl text-center md:text-left">
            <motion.span
              variants={itemVariants}
              className="text-primary mb-4 inline-block text-xs font-bold tracking-[0.2em] uppercase"
            >
              Elips Robotics Club
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl leading-tight font-bold md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.1]"
            >
              Discover your{' '}
              <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
                love and potential
              </span>{' '}
              with robots
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              {['Arduino', 'ESP32', 'Smart Home', 'Automation'].map((tag) => (
                <span
                  key={tag}
                  className="border-border/50 bg-muted/50 text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-md flex-col items-center gap-6 md:mt-6 md:items-start"
          >
            <p className="text-muted-foreground text-center text-base leading-relaxed md:text-left md:text-lg">
              Eskul IoT kami menjadi wadah bagi siswa untuk mengeksplorasi sensor, mikrokontroler,
              dan otomasi cerdas guna membangun inovasi nyata.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/aktivitas">
                <Button size="lg" className="cursor-pointer" variant="default">
                  Explore more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/anggota">
                <Button size="lg" className="cursor-pointer" variant="outline">
                  Meet the team
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-border/30 mt-16 grid grid-cols-3 gap-8 border-y py-8 md:gap-16"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center md:flex-row md:gap-3 md:text-left"
            >
              <s.icon className="text-primary/60 hidden h-8 w-8 md:block" strokeWidth={1.5} />
              <div>
                <p className="font-heading text-2xl font-bold md:text-3xl">{s.value}</p>
                <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <HeroSlider />
    </section>
  );
}
