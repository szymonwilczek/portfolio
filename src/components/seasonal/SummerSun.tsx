// currently this is unused, i might use it later, 
// but i dont like it that much for now

"use client";

import { useEffect, useState } from "react";

export function SummerSun() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        maskImage: "radial-gradient(circle at 0% 0%, black 0%, transparent 40%)",
        WebkitMaskImage: "radial-gradient(circle at 0% 0%, black 0%, transparent 40%)"
      }}
    >
      <div
        className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vh] origin-top-left bg-gradient-to-b from-amber-100/20 via-amber-200/5 to-transparent blur-[60px] mix-blend-screen"
        style={{
          opacity: mounted ? "var(--ray-opacity)" : 0,
          transition: "opacity 3s ease-out",
          transitionDelay: "0s",
          animation: "sun-ray-swing 25s ease-in-out infinite",
          "--ray-opacity": 0.4,
        } as React.CSSProperties}
      />

      <div
        className="absolute top-[-5%] left-[-5%] w-[60vw] h-[100vh] origin-top-left bg-gradient-to-b from-white/30 via-orange-100/10 to-transparent blur-[40px] mix-blend-screen"
        style={{
          opacity: mounted ? "var(--ray-opacity)" : 0,
          transition: "opacity 3s ease-out",
          transitionDelay: "0.4s",

          animation: "sun-ray-swing 18s ease-in-out infinite reverse",
          "--ray-opacity": 0.5,
        } as React.CSSProperties}
      />

      <div
        className="absolute top-0 left-0 w-[50vw] h-[80vh] origin-top-left bg-gradient-to-b from-amber-50/20 via-transparent to-transparent blur-[30px] mix-blend-screen"
        style={{
          opacity: mounted ? "var(--ray-opacity)" : 0,
          transition: "opacity 4s ease-out",
          transitionDelay: "1s",

          animation: "sun-ray-swing 22s ease-in-out 2s infinite",
          "--ray-opacity": 0.3,
        } as React.CSSProperties}
      />

      <div
        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-amber-100/30 blur-[80px] rounded-full mix-blend-screen"
        style={{
          opacity: mounted ? "var(--ray-opacity)" : 0,
          transition: "opacity 2s ease-out",
          transitionDelay: "0s",

          "--ray-opacity": 0.7
        } as React.CSSProperties}
      />

    </div>
  );
}
