'use client';

import { motion } from 'framer-motion';

interface SejarahTimelineCardProps {
  title: string;
  description: string;
  index: number;
}

export function SejarahTimelineCard({ title, description, index }: SejarahTimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-3 md:flex-row md:gap-6"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center md:items-end">
        <div className="bg-primary ring-background h-3 w-3 rounded-full ring-4" />
        <div className="bg-primary/20 mt-2 h-full w-0.5" />
      </div>

      {/* Content */}
      <div className="bg-card border-border flex-1 overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md md:mb-10">
        <div className="flex flex-col gap-2 p-5 md:p-6">
          <h3 className="font-heading text-xl leading-tight font-bold md:text-2xl">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
