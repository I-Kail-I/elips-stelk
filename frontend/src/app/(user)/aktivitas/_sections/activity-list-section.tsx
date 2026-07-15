'use client';

import type { ActivityType } from '../activity.dto';
import { motion } from 'framer-motion';
import { ActivityCard, ActivityCardSkeleton } from '../_components/activity-card';

export function ActivityListSection({ activities }: { activities: ActivityType[] }) {
  if (activities.length === 0) {
    return (
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
              Aktivitas
            </p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Daftar Aktivitas</h2>
          </motion.div>
          <div className="bg-card border-border mx-auto flex max-w-md flex-col items-center rounded-xl border-2 p-8 text-center">
            <p className="text-muted-foreground text-sm">Belum ada aktivitas tersedia.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/5 absolute top-0 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute bottom-0 -left-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
            Aktivitas
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Daftar Aktivitas</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
            Berbagai kegiatan dan acara Elips Robotics Club
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6"
        >
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <ActivityCard
                title={activity.title}
                description={activity.description}
                cover_image={activity.cover_image}
                created_at={activity.created_at}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ActivityListSectionSkeleton() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="border-border mb-12 border-b pb-6 text-center">
          <div className="bg-primary/20 mx-auto mb-2 h-3 w-24 rounded" />
          <div className="bg-foreground/10 mx-auto h-8 w-56 rounded md:h-10" />
          <div className="bg-muted mx-auto mt-2 h-4 w-64 rounded" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
