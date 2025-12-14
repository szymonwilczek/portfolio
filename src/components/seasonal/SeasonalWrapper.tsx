"use client";

import { useEffect, useState } from "react";
import { getBonsaiSeason } from "@/config/events";
import { WinterSnow } from "./WinterSnow";
import { SpringSakura } from "./SpringSakura";
import { AutumnLeaves } from "./AutumnLeaves";
// import { SummerSun } from "./SummerSun";

interface SeasonalWrapperProps {
  isModelReady?: boolean;
}

export function SeasonalWrapper({ isModelReady = false }: SeasonalWrapperProps) {
  const [season, setSeason] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  // const [isDayTime, setIsDayTime] = useState(false);

  useEffect(() => {
    const now = new Date();
    const currentSeason = getBonsaiSeason(now);
    setSeason(currentSeason);
  }, []);

  useEffect(() => {
    if (isModelReady && !shouldShow) {
      const startTimer = setTimeout(() => {
        setShouldShow(true);
      }, 500);
      return () => clearTimeout(startTimer);
    }
  }, [isModelReady, shouldShow]);

  useEffect(() => {
    if (!shouldShow || !season) return;

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, season === "SUMMER" ? 6000 : 10000);

    return () => clearTimeout(fadeTimer);
  }, [shouldShow, season]);

  if (!season || !shouldShow) return null;

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
