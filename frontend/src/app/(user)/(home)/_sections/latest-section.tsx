import React from 'react';
import { LatestActivity } from '../_components/latest-activity';

export default function LatestSection() {
  return (
    <div className="mt-25 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Latest Activity</h1>
        <p className="text-muted-foreground mt-1">See our latest Activity with elips</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
        <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
        <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
        <LatestActivity title="test" date="2020" link="test" image="/home/IMG_4252.JPG" />
      </div>
    </div>
  );
}
