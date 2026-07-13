'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Cari anggota berdasarkan nama atau peran...',
  delay = 0.4,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative mb-8"
    >
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 w-full rounded-xl border-2 py-3.5 pr-4 pl-11 text-sm font-medium shadow-sm transition-all outline-none focus:shadow-sm"
      />
    </motion.div>
  );
}
