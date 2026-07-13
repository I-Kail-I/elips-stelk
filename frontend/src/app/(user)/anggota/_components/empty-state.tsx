'use client';

import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export function EmptyState({
  icon,
  title = "Belum ada anggota terdaftar",
  description = "Anggota akan muncul di sini setelah ditambahkan",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-16"
    >
      <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border">
        {icon || <UserPlus className="text-muted-foreground h-7 w-7" strokeWidth={1.5} />}
      </div>
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
      <p className="text-muted-foreground/60 mt-1 text-xs">{description}</p>
    </motion.div>
  );
}
