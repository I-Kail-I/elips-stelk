'use client';

import type { MemberType } from '../member.dto';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getPaginatedItems, Pagination, usePagination } from '@/components/pagination';
import { MemberCard } from '../_components/member-card';

export function MemberListSection({ members }: { members: MemberType[] }) {
  const [page, setPage] = useState(1);
  const { totalPages } = usePagination(members, 6);
  const paginated = getPaginatedItems(members, page, 6);

  if (members.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">Anggota</p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Semua Anggota</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            {members.length} anggota Elips Robotics Club
          </p>
        </motion.div>

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
