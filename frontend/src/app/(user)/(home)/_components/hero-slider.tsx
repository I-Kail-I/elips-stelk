'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function HeroSlider() {
  const images = ['/home/IMG_4252.JPG', '/home/IMG_4253.JPG', '/home/IMG_4254.JPG', '/home/IMG_4255.JPG'];

  return (
    <div>
      {/* Carousel Section */}
      <div className="relative mt-10 w-full flex-1">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="mx-auto h-full w-full max-w-7xl px-12 md:px-0"
        >
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem key={index} className="relative h-full w-full">
                {/* Changed to arbitrary Tailwind values for guaranteed rendering */}
                <div className="relative h-full min-h-75 w-full md:min-h-112.5">
                  <Image
                    src={src}
                    alt={`Slider image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden md:flex" />
          <CarouselNext className="right-4 hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
}
