import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeaturesProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Features({ icon: Icon, title, description }: FeaturesProps) {
  return (
    <div className="bg-accent rounded-xl p-6 md:p-10">
      <div>
        <div className="border-muted-foreground/60 bg-background w-fit rounded-full border p-3">
          <Icon size={40} className="text-muted-foreground" />
        </div>

        <h3 className="text-foreground mt-4 max-w-xs font-serif text-2xl font-bold">{title}</h3>

        <p className="text-muted-foreground mt-2 max-w-sm text-base">{description}</p>
      </div>
    </div>
  );
}
