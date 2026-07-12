import React from 'react';
import AboutSection from './_sections/about-section';
import FeaturesSection from './_sections/features-section';
import HeroSection from './_sections/hero-section';
import LatestSection from './_sections/latest-section';

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <LatestSection />
    </>
  );
}
