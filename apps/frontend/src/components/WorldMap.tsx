import React from "react";

interface WorldMapProps {
  className?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(126, 31, 255, 0.2)" />
          <stop offset="50%" stopColor="rgba(0, 255, 213, 0.15)" />
          <stop offset="100%" stopColor="rgba(255, 31, 112, 0.2)" />
        </linearGradient>
      </defs>

      {/* North America */}
      <path
        d="M 100 80 Q 150 60 200 80 L 220 100 Q 240 90 260 100 L 280 120 Q 270 140 260 160 L 240 180 Q 220 200 200 220 L 180 240 Q 160 250 140 240 L 120 220 Q 100 200 90 180 L 80 160 Q 70 140 80 120 Z"
        fill="url(#mapGradient)"
        stroke="rgba(126, 31, 255, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* South America */}
      <path
        d="M 200 280 Q 220 270 240 280 L 250 300 Q 260 320 250 340 L 240 360 Q 230 380 210 390 L 190 400 Q 180 410 170 400 L 160 380 Q 150 360 160 340 L 170 320 Q 180 300 190 290 Z"
        fill="url(#mapGradient)"
        stroke="rgba(126, 31, 255, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Europe */}
      <path
        d="M 450 100 Q 470 90 490 100 L 510 110 Q 520 120 515 135 L 505 150 Q 495 160 480 155 L 465 150 Q 450 140 445 125 Z"
        fill="url(#mapGradient)"
        stroke="rgba(0, 255, 213, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Africa */}
      <path
        d="M 480 180 Q 500 170 520 180 L 535 200 Q 545 220 540 240 L 530 260 Q 520 280 500 290 L 480 300 Q 470 310 460 300 L 450 280 Q 440 260 445 240 L 455 220 Q 465 200 475 190 Z"
        fill="url(#mapGradient)"
        stroke="rgba(255, 31, 112, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Asia */}
      <path
        d="M 600 80 Q 650 70 700 80 L 750 90 Q 780 100 800 120 L 810 140 Q 820 160 810 180 L 790 200 Q 770 210 750 205 L 720 200 Q 690 190 660 185 L 630 180 Q 610 170 600 150 L 590 130 Q 585 110 595 90 Z"
        fill="url(#mapGradient)"
        stroke="rgba(0, 255, 213, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Australia */}
      <path
        d="M 750 350 Q 780 345 810 355 L 830 370 Q 840 385 835 400 L 820 415 Q 800 425 780 420 L 760 410 Q 745 395 745 375 Z"
        fill="url(#mapGradient)"
        stroke="rgba(255, 31, 112, 0.3)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Decorative dots for cities/points of interest */}
      <circle cx="150" cy="150" r="2" fill="rgba(126, 31, 255, 0.4)" />
      <circle cx="750" cy="150" r="2" fill="rgba(0, 255, 213, 0.4)" />
      <circle cx="480" cy="120" r="2" fill="rgba(0, 255, 213, 0.4)" />
      <circle cx="220" cy="340" r="2" fill="rgba(255, 31, 112, 0.4)" />
      <circle cx="800" cy="380" r="2" fill="rgba(255, 31, 112, 0.4)" />

      {/* Connection lines between major regions */}
      <line
        x1="200"
        y1="150"
        x2="450"
        y2="120"
        stroke="rgba(126, 31, 255, 0.1)"
        strokeWidth="1"
        strokeDasharray="5,5"
        opacity="0.3"
      />
      <line
        x1="490"
        y1="125"
        x2="620"
        y2="120"
        stroke="rgba(0, 255, 213, 0.1)"
        strokeWidth="1"
        strokeDasharray="5,5"
        opacity="0.3"
      />
      <line
        x1="500"
        y1="190"
        x2="230"
        y2="300"
        stroke="rgba(255, 31, 112, 0.1)"
        strokeWidth="1"
        strokeDasharray="5,5"
        opacity="0.3"
      />
    </svg>
  );
};
