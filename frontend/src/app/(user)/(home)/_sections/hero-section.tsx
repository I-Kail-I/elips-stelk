import React from 'react';
import { Button } from '@/components/ui/button';
import { HeroSlider } from '../_components/hero-slider';

export default function HeroSection() {
  return (
    <section className="flex min-h-screen w-full flex-col py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
        {/* Left side */}
        <div className="max-w-xl text-center font-serif text-3xl leading-9 md:text-left md:text-6xl md:leading-18">
          Discover your <span className="font-semibold">love and potential</span> with robots
        </div>

        {/* Right side */}
        <div className="flex w-full max-w-xl flex-col items-center gap-5 md:mt-9 md:items-start">
          <p className="text-muted-foreground text-center text-base font-medium md:text-left md:text-lg">
            Eskul IoT kami menjadi wadah bagi siswa untuk mengeksplorasi sensor, mikrokontroler, dan
            otomasi cerdas guna membangun inovasi nyata.
          </p>

          <Button size="lg" className="w-fit cursor-pointer" variant="default">
            Explore more
          </Button>
        </div>
      </div>

      <HeroSlider />
    </section>
  );
}
