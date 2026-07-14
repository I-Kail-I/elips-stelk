'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityCardProps {
  title: string;
  description: string;
  image: string[];
  created_at: string;
  index?: number;
}

export function ActivityCard({
  title,
  description,
  image,
  created_at,
  index = 0,
}: ActivityCardProps) {
  const raw = image?.[0] ?? '';
  const imageUrl = raw ? raw.replace(/^uploads_folder\//, '/api/uploads/') : '';

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
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="bg-muted text-muted-foreground flex aspect-4/3 w-full flex-col items-center justify-center gap-2">
            <span className="text-xs font-medium opacity-30">No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
          <Calendar className="h-3 w-3" />
          <time dateTime={created_at}>
            {new Date(created_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h3 className="font-heading text-lg leading-tight font-bold">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="bg-card border-border flex w-full flex-col overflow-hidden rounded-xl border-2 shadow-sm">
      <div className="bg-primary h-2 w-full" />
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-5">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
