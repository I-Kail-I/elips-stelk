'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useMemo } from 'react';
import { RoleBadge } from './role-badge';

interface StatsBarProps {
  totalMembers: number;
  roles: string[];
  label?: string;
  rolesLabel?: string;
}

export function StatsBar({
  totalMembers,
  roles,
  label = 'Anggota',
  rolesLabel = 'Peran',
}: StatsBarProps) {
  const uniqueRoles = useMemo(() => [...new Set(roles)], [roles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="bg-card border-border mb-8 flex flex-wrap items-center gap-4 rounded-xl border-2 p-4 shadow-sm md:gap-6 md:p-5"
    >
      <div className="flex items-center gap-2.5">
        <div className="bg-primary/10 border-border/30 flex h-9 w-9 items-center justify-center rounded-lg border">
          <Users className="text-primary h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <p className="font-heading text-xl leading-none font-bold">{totalMembers}</p>
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            {label}
          </p>
        </div>
      </div>

      <div className="bg-border h-8 w-px" />

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-muted-foreground mr-1 text-[10px] font-medium tracking-wider uppercase">
          {rolesLabel}
        </span>
        {uniqueRoles.map((role) => (
          <RoleBadge key={role} role={role} />
        ))}
      </div>
    </motion.div>
  );
}
