import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonHeader() {
  return (
    <div className="mb-14 border-b pb-6 md:mb-18">
      <div className="bg-primary/20 mb-2 h-3 w-24 rounded" />
      <div className="bg-foreground/10 h-8 w-48 rounded md:h-10" />
      <div className="bg-muted mt-2 h-4 w-72 rounded" />
    </div>
  );
}

export function TimelineCardSkeleton() {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="bg-primary/20 ring-background h-3 w-3 rounded-full ring-4" />
        <div className="bg-muted mt-2 h-full min-h-24 w-0.5" />
      </div>
      <div className="flex-1 space-y-3 pb-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-3/4 md:h-6" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function SejarahSectionSkeleton() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SkeletonHeader />
        <div className="space-y-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <TimelineCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
