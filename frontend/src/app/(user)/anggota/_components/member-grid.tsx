'use client';

import type { MemberType } from '../member.dto';
import { EmptyState } from './empty-state';
import { MemberCard } from './member-card';

interface MemberGridProps {
  members: MemberType[];
  emptyStateProps?: {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
  };
}

export function MemberGrid({ members, emptyStateProps }: MemberGridProps) {
  if (members.length === 0) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      {members.map((member: MemberType, i: number) => (
        <MemberCard
          key={member.id}
          name={member.name}
          role={member.role}
          cover_image={member.cover_image}
          created_at={member.created_at}
          index={i}
        />
      ))}
    </div>
  );
}
