'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  title?: string;
  icon?: React.ReactNode;
}

export function ErrorState({
  message = 'Terjadi kesalahan',
  title = 'Gagal memuat data anggota',
  icon,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-xl border-2 border-red-400/50 bg-red-50/50 p-8 text-center dark:bg-red-950/20"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-300 bg-red-100 dark:border-red-700">
        {icon || <Users className="h-6 w-6 text-red-500" strokeWidth={1.5} />}
      </div>
      <p className="text-sm font-semibold text-red-600 dark:text-red-400">{title}</p>
      <p className="text-muted-foreground mt-1 text-xs">{message}</p>
    </motion.div>
  );
}
