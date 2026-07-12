import React from 'react';
import { LatestActivity } from '../_components/latest-activity';

export default function LatestSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b pb-6 md:mb-16">
          <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
            Updates
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Latest Activity</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            See our latest activity with Elips
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
          <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
        </div>
      </div>
    </section>
  );
}
