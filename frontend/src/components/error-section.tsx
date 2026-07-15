'use client';

import { motion } from 'framer-motion';

interface ErrorSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  message?: string;
}

export function ErrorSection({
  subtitle = 'Error',
  title = 'Terjadi Kesalahan',
  description,
  message = 'Gagal memuat data. Silakan coba lagi nanti.',
}: ErrorSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-border mb-12 border-b pb-6 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
            {subtitle}
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center rounded-xl border-2 border-red-400/50 bg-red-50/50 p-8 text-center dark:bg-red-950/20"
        >
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{message}</p>
        </motion.div>
      </div>
    </section>
  );
}
