import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityProps {
  image: string;
  title: string;
  link: string;
  date: string;
}

export function LatestActivity({ image, title, link, date }: ActivityProps) {
  return (
    <Card className="flex w-full max-w-xs flex-col gap-5 rounded-xl border border-gray-100 bg-white p-6 shadow-md sm:max-w-sm sm:min-w-sm md:max-w-2xl md:min-w-2xl">
      {/* Image Container */}
      <div className="bg-accent relative flex aspect-4/1.5 w-full flex-col items-center justify-center overflow-hidden text-gray-400">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" loading="lazy" />
        ) : (
          <>
            <ImageIcon className="mb-2 h-16 w-16 opacity-60" strokeWidth={1.25} />
            <span className="text-sm font-medium opacity-60">No Image Available</span>
          </>
        )}
      </div>

      {/* Content Container */}
      <CardContent className="flex flex-col gap-6 p-0">
        <CardTitle className="text-accent-foreground line-clamp-2 max-h-15 overflow-hidden text-xl leading-snug font-bold text-ellipsis md:text-2xl">
          {title}
        </CardTitle>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-base font-medium">{date}</span>
          <Link href={link}>
            <Button
              variant="link"
              className="text-foreground flex cursor-pointer items-center gap-2 text-base font-semibold transition-colors hover:text-gray-900"
            >
              Read More
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function LatestActivitySkeleton() {
  return (
    <Card className="flex w-full max-w-xs flex-col gap-5 rounded-xl border border-gray-100 bg-white p-6 shadow-md sm:max-w-sm sm:min-w-sm md:max-w-2xl md:min-w-2xl">
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/1.5 w-full rounded-2xl" />

      {/* Content Skeleton */}
      <CardContent className="flex flex-col gap-6 p-0">
        {/* Title Skeleton */}
        <div className="mt-1 space-y-2">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-4/5" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
