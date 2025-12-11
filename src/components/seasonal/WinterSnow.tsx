"use client";

import { useEffect, useState } from "react";

const VoxelSnowflakeSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" shapeRendering="crispEdges">
    <path d="M11 2h2v20h-2z M2 11h20v2h-20z" />
    <path d="M8 8h2v2h-2z M14 8h2v2h-2z M8 14h2v2h-2z M14 14h2v2h-2z" />
    <path d="M5 5h2v2h-2z M17 5h2v2h-2z M5 17h2v2h-2z M17 17h2v2h-2z" />
  </svg>
);

type Snowflake = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  swayDuration: number;
};

export function WinterSnow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 10,
      opacity: 0.4 + Math.random() * 0.4,
      swayDuration: 3 + Math.random() * 2,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 gpu-particle"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: 0,
            animation: `seasonal-fall ${flake.duration}s linear ${flake.delay}s infinite`,
            "--particle-opacity": flake.opacity,
          } as React.CSSProperties}
        >
          <div
            className="w-full h-full text-white/90"
            style={{
              animation: `seasonal-sway ${flake.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            <VoxelSnowflakeSVG />
          </div>
        </div>
      ))}
    </div>
  );
}
