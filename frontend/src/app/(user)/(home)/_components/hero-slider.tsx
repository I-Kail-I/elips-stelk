'use client';

import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
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
  const images = [
    '/home/IMG_4252.JPG',
    '/home/IMG_4253.JPG',
    '/home/IMG_4254.JPG',
    '/home/IMG_4255.JPG',
  ];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, type: "tween" }}
    >
      {/* Carousel Section */}
      <div className="relative mt-10 w-full">
        <Carousel
          opts={{
            loop: true,
            watchDrag: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          className="mx-auto h-full w-full max-w-7xl px-12 md:px-0"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative min-h-75 w-full md:min-h-112.5">
                  <Image
                    src={src}
                    alt={`Slider image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 z-10" />
          <CarouselNext className="right-4 z-10" />
        </Carousel>
      </div>
    </motion.div>
  );
}
