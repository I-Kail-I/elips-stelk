'use client';

import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface MemberCardProps {
  name: string;
  role: string;
  cover_image: string | null;
  created_at: string;
  index?: number;
}

export function MemberCard({ name, role, cover_image, created_at, index = 0 }: MemberCardProps) {
  const imageUrl = cover_image ?? '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-card border-border relative flex w-full flex-col overflow-hidden rounded-xl border-2 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="bg-primary relative h-2 w-full" />

      <div className="relative aspect-4/3 w-full overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute right-3 bottom-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="bg-primary/90 text-primary-foreground inline-block rounded-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                {role}
              </span>
            </div>
          </>
        ) : (
          <div className="bg-muted text-muted-foreground flex aspect-4/3 w-full flex-col items-center justify-center gap-2">
            <Users className="h-12 w-12 opacity-30" strokeWidth={1.25} />
            <span className="text-xs font-medium opacity-30">No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
          <Calendar className="h-3 w-3" />
          <time dateTime={created_at}>{new Date(created_at).getFullYear()}</time>
        </div>

        <h3 className="font-heading text-lg leading-tight font-bold">{name}</h3>
        <p className="text-primary mb-1 text-[11px] font-bold tracking-[0.2em] uppercase">{role}</p>
      </div>
    </motion.article>
  );
}

export function MemberCardSkeleton() {
  return (
    <div className="bg-card border-border flex w-full flex-col overflow-hidden rounded-xl border-2 shadow-sm">
      <div className="bg-primary h-2 w-full" />
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
