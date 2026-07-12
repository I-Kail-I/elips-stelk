import { ArrowRight, Calendar, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityProps {
  image: string;
  title: string;
  link: string;
  date: string;
}

export function LatestActivity({ image, title, link, date }: ActivityProps) {
  return (
    <article className="group bg-card flex w-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex aspect-4/3 w-full flex-col items-center justify-center">
            <ImageIcon className="mb-2 h-12 w-12 opacity-40" strokeWidth={1.25} />
            <span className="text-xs font-medium opacity-40">No Image Available</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          <Calendar className="h-3 w-3" />
          <time dateTime={date}>{date}</time>
        </div>

        <h3 className="line-clamp-2 text-sm leading-snug font-bold">{title}</h3>

        <Link
          href={link}
          className="hover:text-primary mt-auto flex items-center gap-1 text-xs font-semibold transition-colors"
        >
          Read More
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function LatestActivitySkeleton() {
  return (
    <div className="bg-card flex w-full flex-col overflow-hidden rounded-xl border shadow-sm">
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
