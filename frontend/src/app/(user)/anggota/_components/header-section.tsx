'use client';

import { motion } from 'framer-motion';

interface HeaderSectionProps {
  subtitle?: string;
  title?: React.ReactNode;
  description?: string;
}

export function HeaderSection({
  subtitle = 'Anggota Kami',
  title = (
    <>
      Anggota <span className="text-primary">ELIPS</span>
    </>
  ),
  description = 'Kenali orang-orang di balik robot dan inovasi kami — setiap anggota membawa semangat dan keahlian unik.',
}: HeaderSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-border relative mb-12 border-b-2 pb-8 md:mb-16 md:pb-10"
    >
      <div className="bg-secondary absolute -top-6 -left-6 -z-1 h-12 w-12 rounded-full" />
      <div className="bg-accent/30 absolute -right-4 -bottom-4 h-8 w-8 rounded-full" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-primary mb-3 text-xs font-bold tracking-[0.2em] uppercase"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="font-heading text-4xl font-bold tracking-tight md:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
