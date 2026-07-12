import React from 'react';
import { Button } from '@/components/ui/button';
import { HeroSlider } from '../_components/hero-slider';

const stats = [
  { label: 'Members', value: '50+' },
  { label: 'Projects', value: '10+' },
  { label: 'Years Active', value: '3+' },
];

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden py-16 md:py-24">
      <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-accent/5 absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-primary mb-4 inline-block text-xs font-bold tracking-[0.2em] uppercase">
              Elips Robotics Club
            </span>
            <h1 className="font-heading text-4xl leading-tight font-bold md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.1]">
              Discover your <span className="text-primary">love and potential</span> with robots
            </h1>
          </div>

          <div className="flex w-full max-w-md flex-col items-center gap-6 md:mt-6 md:items-start">
            <p className="text-muted-foreground text-center text-base leading-relaxed md:text-left md:text-lg">
              Eskul IoT kami menjadi wadah bagi siswa untuk mengeksplorasi sensor, mikrokontroler, dan
              otomasi cerdas guna membangun inovasi nyata.
            </p>

            <Button size="lg" className="w-fit cursor-pointer" variant="default">
              Explore more
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 border-y py-8 md:gap-16">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-2xl font-bold md:text-3xl">{s.value}</p>
              <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <HeroSlider />
    </section>
  );
}
