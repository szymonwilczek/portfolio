"use client";

import { usePathname } from "next/navigation";
import { Scene } from "@/components/3d/Scene";
import { useMemo, useState, useCallback } from "react";
import { SeasonalWrapper } from "@/components/seasonal/SeasonalWrapper";

export function SceneWrapper() {
  const pathname = usePathname();
  const [isModelReady, setIsModelReady] = useState(false);

  const isVisible = useMemo(() => {
    if (pathname === "/") return true;
    if (pathname === "/projects") return true;
    if (pathname === "/feed") return true;

    return false;
  }, [pathname]);

  const handleSceneReady = useCallback(() => {
    setIsModelReady(true);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {pathname === "/" && <SeasonalWrapper isModelReady={isModelReady} />}
      <div className="w-full flex justify-center items-center bg-background transition-colors duration-300">
        <div className="w-full max-w-3xl h-[420px] max-sm:h-[425px] relative overflow-hidden flex justify-center items-center">
          <div className="w-full max-w-5xl h-full cursor-grab active:cursor-grabbing">
            <Scene onReady={handleSceneReady} />
          </div>
        </div>
      </div>
    </>
  );
}

