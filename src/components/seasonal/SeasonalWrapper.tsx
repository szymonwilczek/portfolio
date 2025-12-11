"use client";

import { useEffect, useState } from "react";
import { getBonsaiSeason } from "@/config/events";
import { WinterSnow } from "./WinterSnow";
import { SpringSakura } from "./SpringSakura";
import { AutumnLeaves } from "./AutumnLeaves";
// import { SummerSun } from "./SummerSun";

export function SeasonalWrapper() {
  const [season, setSeason] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  // const [isDayTime, setIsDayTime] = useState(false);

  useEffect(() => {
    const now = new Date("2025-12-11");

    const currentSeason = getBonsaiSeason(now);
    setSeason(currentSeason);

    // const hour = now.getHours();
    // if (hour >= 6 && hour < 19) {
    //   setIsDayTime(true);
    // } else {
    //   setIsDayTime(true); // false
    // }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, currentSeason === "SUMMER" ? 6000 : 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!season) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-[2000ms] ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {season === "WINTER" && <WinterSnow />}
      {season === "SPRING" && <SpringSakura />}
      {season === "AUTUMN" && <AutumnLeaves />}
      {/* {season === "SUMMER" && isDayTime && <SummerSun />} */}
    </div>
  );
}
