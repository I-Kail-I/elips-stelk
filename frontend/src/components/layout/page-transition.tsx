'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  color?: string;
  duration?: number;
}

export default function PageTransition({ children, color = '#0f0f0f', duration = 0.8 }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* SSR-Friendly Content Container */}
      <motion.div
        initial={{ opacity: 0, visibility: 'hidden' }}
        animate={{ opacity: 1, visibility: 'visible' }}
        transition={{
          delay: duration,
          duration: 0.3,
          ease: 'easeOut',
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        exit={{ y: '0%' }}
        transition={{
          duration,
          ease: [0.83, 0, 0.17, 1],
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: color,
          zIndex: 50,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
