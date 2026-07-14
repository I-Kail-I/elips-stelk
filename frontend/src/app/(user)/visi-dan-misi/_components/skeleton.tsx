import React from 'react';

export function SkeletonHeader() {
  return (
    <div className="mb-14 border-b pb-6 md:mb-18">
      <div className="bg-primary/20 mb-2 h-3 w-24 rounded" />
      <div className="bg-foreground/10 h-8 w-48 rounded md:h-10" />
      <div className="bg-muted mt-2 h-4 w-72 rounded" />
    </div>
  );
}
