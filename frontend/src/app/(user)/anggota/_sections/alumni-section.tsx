'use client';

import type { MemberType } from '../member.dto';
import { useState } from 'react';
import { getPaginatedItems, Pagination, usePagination } from '@/components/pagination';
import { MemberCard } from '../_components/member-card';

const ITEMS_PER_PAGE = 3;

interface AlumniSectionProps {
  alumni: MemberType[];
}

export function AlumniSection({ alumni }: AlumniSectionProps) {
  const [page, setPage] = useState(1);
  const { totalPages } = usePagination(alumni, ITEMS_PER_PAGE);
  const paginated = getPaginatedItems(alumni, page, ITEMS_PER_PAGE);

  if (alumni.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="text-primary mb-2 block text-xs font-bold tracking-[0.2em] uppercase">
            Alumni
          </span>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Alumni</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Mantan anggota Elips yang telah menyelesaikan perjalanan mereka
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {paginated.map((member, i) => (
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

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  );
}
