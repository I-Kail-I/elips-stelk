import { MemberCardSkeleton } from "./member-card";

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <MemberCardSkeleton key={i} />
      ))}
    </div>
  );
}
