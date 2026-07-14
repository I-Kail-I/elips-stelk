'use client';

import type { MemberType } from '../member.dto';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import Image from 'next/image';
import { MemberCard } from '../_components/member-card';

function KetuaHero({ ketua }: { ketua: MemberType }) {
  const imageUrl = ketua.image?.[0] ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-xs"
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
  );
}

function TreeConnector() {
  return (
    <div className="flex flex-col items-center py-6" aria-hidden>
      <div className="bg-primary/30 h-8 w-0.5" />
      <div className="bg-primary/30 h-0.5 w-16" />
    </div>
  );
}

export function CurrentAnggotaSection({
  ketua,
  anggota,
}: {
  ketua: MemberType;
  anggota: MemberType[];
}) {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/5 absolute top-0 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute bottom-0 -left-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">Saat Ini</p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Current Anggota</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
            Struktur kepengurusan Elips Robotics Club saat ini
          </p>
        </motion.div>

        <KetuaHero ketua={ketua} />
        <TreeConnector />

        {anggota.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6"
          >
            {anggota.map((member) => (
              <motion.div
                key={member.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <MemberCard
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  created_at={member.created_at}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
