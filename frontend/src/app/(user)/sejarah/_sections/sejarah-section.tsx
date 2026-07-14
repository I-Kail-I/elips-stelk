'use client';

import { motion } from 'framer-motion';
import { SejarahTimelineCard } from '../_components/sejarah-timeline-card';

const timelineData = [
  {
    id: 1,
    title: 'Berdirinya Elips Robotics Club',
    description:
      'Elips Robotics Club resmi didirikan sebagai wadah pengembangan minat dan bakat di bidang robotika.',
  },
  {
    id: 2,
    title: 'Juara 1 Kontes Robot Indonesia',
    description: 'Tim berhasil meraih juara pertama dalam Kontes Robot Indonesia tingkat nasional.',
  },
  {
    id: 3,
    title: 'Workshop Robotika Nasional',
    description:
      'Menyelenggarakan workshop robotika yang diikuti oleh puluhan peserta dari berbagai daerah.',
  },
  {
    id: 4,
    title: 'Peluncuran Program Robot Edukasi',
    description:
      'Meluncurkan program edukasi robotika untuk siswa sekolah menengah sebagai bentuk pengabdian masyarakat.',
  },
];

export default function SejarahSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-primary/5 absolute top-0 -right-24 -z-10 h-96 w-96 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="bg-accent/5 absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full blur-3xl"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 border-b pb-6 md:mb-18"
        >
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">Sejarah</p>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Perjalanan Kami</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Jejak langkah dan pencapaian Elips Robotics Club dari waktu ke waktu
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {timelineData.map((item, i) => (
            <SejarahTimelineCard
              key={item.id}
              title={item.title}
              description={item.description}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
