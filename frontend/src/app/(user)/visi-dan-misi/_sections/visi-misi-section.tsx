'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SkeletonHeader } from '../_components/skeleton';
import { VisiMisiCard, VisiMisiCardSkeleton } from '../_components/visi-misi-card';
import { useVisiDanMisi } from '../_hooks/hook.client';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function VisiMisiSection() {
  const { data, error, isError, isLoading } = useVisiDanMisi();

  if (isLoading) {
    return (
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SkeletonHeader />
          <VisiMisiCardSkeleton />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SkeletonHeader />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            Gagal memuat visi dan misi: {error?.message}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Ambient background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-primary/5 absolute top-0 -right-24 -z-10 h-96 w-96 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="bg-accent/5 absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full blur-3xl"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-14 border-b pb-6 md:mb-18">
            <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
              Tentang Kami
            </p>
            <h1 className="font-heading text-3xl font-bold md:text-4xl">Visi & Misi</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              Visi dan misi yang menuntun setiap langkah Elips Robotics Club
            </p>
          </motion.div>

          {/* Visi */}
          <motion.div variants={itemVariants}>
            <VisiMisiCard
              visi={data!.visi}
              misi={data!.misi}
              tahunMulai={data!.tahun_mulai}
              tahunAkhir={data!.tahun_akhir}
            />
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-14 flex justify-center md:mt-18">
            <Link href="/anggota">
              <Button size="lg" variant="outline" className="group gap-2">
                Temui Tim Kami
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
