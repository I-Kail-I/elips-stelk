'use client';

import type { MemberType } from '../member.dto';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import Image from 'next/image';

interface KetuaSectionProps {
  ketua: MemberType;
}

export function KetuaSection({ ketua }: KetuaSectionProps) {
  const imageUrl = ketua.image?.[0] ?? '';

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            Leadership
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Ketua Elips</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-sm"
        >
          <div className="bg-card border-border group relative flex flex-col items-center overflow-hidden rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-lg">
            <div className="bg-primary/20 relative flex aspect-4/3 w-full items-center justify-center overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={ketua.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
              ) : (
                <Crown className="text-primary h-16 w-16 opacity-40" strokeWidth={1.25} />
              )}
              <div className="absolute top-3 right-3">
                <span className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  <Crown className="h-3 w-3" />
                  Ketua
                </span>
              </div>
            </div>
            <div className="w-full p-6 text-center">
              <h3 className="font-heading text-2xl font-bold">{ketua.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{ketua.message}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
