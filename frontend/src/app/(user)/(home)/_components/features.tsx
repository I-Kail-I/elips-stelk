import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeaturesProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Features({ icon: Icon, title, description }: FeaturesProps) {
  return (
    <div className="group bg-background flex min-h-80 flex-col rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md">
      <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
        <Icon size={28} className="text-primary" />
      </div>

      <h3 className="font-heading text-xl font-bold">{title}</h3>

      <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
    </div>
  );
}
