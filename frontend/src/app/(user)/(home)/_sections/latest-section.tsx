'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { LatestActivity, LatestActivitySkeleton } from '../_components/latest-activity';
import { useMember } from '../_hooks/hook.client';

function SectionHeader() {
  return (
    <div className="mb-12 border-b pb-6 md:mb-16">
      <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">Updates</p>
      <h2 className="font-heading text-3xl font-bold md:text-4xl">Latest Activity</h2>
      <p className="text-muted-foreground mt-2 max-w-md">See our latest activity with Elips</p>
    </div>
  );
}

export default function LatestSection() {
  const { data, error, isError, isLoading } = useMember();

  // Loading state
  if (isLoading) {
    return (
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <LatestActivitySkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            Failed to load activities: {error?.message}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeader />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((activity, i) => {
              const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
              const imagePath = activity.image?.[0];

              const imageUrl = imagePath
                ? imagePath.startsWith('http')
                  ? imagePath
                  : `${API_BASE_URL}/${imagePath}`
                : '';

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <LatestActivity
                    title={activity.title}
                    date={new Date(activity.created_at).getFullYear().toString()}
                    link={activity.markdown_file}
                    image={imageUrl}
                  />
                </motion.div>
              );
            })
          ) : (
            <p className="text-muted-foreground col-span-full py-8 text-center">
              No activities found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
