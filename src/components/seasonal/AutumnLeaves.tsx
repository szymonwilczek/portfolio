"use client";

import { useEffect, useState } from "react";

const VoxelLeafSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" shapeRendering="crispEdges">
    <path d="M11 2h2v2h2v2h2v2h2v6h-2v2h-2v2h-2v2h-2v4h-2v-4h-2v-2h-2v-2h-2v-2h-2v-6h2v-2h2v-2h2v-2h2v-2z" />
  </svg>
);

const LEAF_COLORS = [
  "text-amber-700/70 dark:text-amber-500/60",
  "text-orange-700/80 dark:text-orange-600/70",
  "text-red-700/80 dark:text-red-500/70",
  "text-yellow-600/70 dark:text-yellow-500/60",
  "text-orange-800/80 dark:text-orange-700/70",
];

type Leaf = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  colorClass: string;
  swayDuration: number;
  opacity: number;
};

export function AutumnLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 6,
      delay: Math.random() * 10,
      size: 10 + Math.random() * 15,
      colorClass: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      swayDuration: 4 + Math.random() * 4,
      opacity: 0.7 + Math.random() * 0.3,
    }));
    setLeaves(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute top-0 gpu-particle"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: 0,
            animation: `seasonal-fall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            "--particle-opacity": leaf.opacity,
          } as React.CSSProperties}
        >
          <div
            className={`w-full h-full ${leaf.colorClass}`}
            style={{
              animation: `seasonal-sway ${leaf.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            <VoxelLeafSVG />
          </div>
        </div>
      ))}
    </div>
  );
}
