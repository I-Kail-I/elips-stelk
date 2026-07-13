'use client';

import type { MemberType } from '../member.dto';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import Image from 'next/image';

interface AlumniKetuaSectionProps {
  alumni: MemberType[];
}

export function AlumniKetuaSection({ alumni }: AlumniKetuaSectionProps) {
  if (alumni.length === 0) return null;

  return (
    <section className="bg-muted/50 relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            Legacy
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Mantan Ketua</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Mereka yang pernah memimpin Elips di masa sebelumnya
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {alumni.map((member, i) => {
            const imageUrl = member.image?.[0] ?? '';

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border-border group relative flex w-full flex-col overflow-hidden rounded-xl border-2 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="bg-accent h-2 w-full" />
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute right-3 bottom-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="bg-accent text-accent-foreground inline-block rounded-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                          {member.role}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="bg-muted text-muted-foreground flex aspect-4/3 w-full flex-col items-center justify-center gap-2">
                      <History className="h-12 w-12 opacity-30" strokeWidth={1.25} />
                      <span className="text-xs font-medium opacity-30">Mantan Ketua</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
                    <History className="h-3 w-3" />
                    <span>Alumni</span>
                  </div>
                  <h3 className="font-heading text-lg leading-tight font-bold">{member.name}</h3>
                  <p className="text-primary mb-1 text-[11px] font-bold tracking-[0.2em] uppercase">
                    {member.role}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
