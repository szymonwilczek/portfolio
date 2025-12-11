"use client";

import { useEffect, useState } from "react";

const VoxelPetalSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" shapeRendering="crispEdges">
    <path d="M9 2h2v1h2v-1h2v3h-1v2h-1v2h-1v2h-2v-2h-1v-2h-1v-2h-1v-3z" />
  </svg>
);

type Petal = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  swayDuration: number;
};

export function SpringSakura() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 6,
      delay: Math.random() * 8,
      size: 25 + Math.random() * 10,
      swayDuration: 4 + Math.random() * 3,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 gpu-particle"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            opacity: 0,
            animation: `seasonal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            "--particle-opacity": 0.7,
          } as React.CSSProperties}
        >
          <div
            className="w-full h-full text-pink-300/80 dark:text-pink-400/60"
            style={{
              animation: `seasonal-sway ${petal.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            <VoxelPetalSVG />
          </div>
        </div>
      ))}
    </div>
  );
}
