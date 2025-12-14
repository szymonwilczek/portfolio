"use client";

import { useState, useEffect } from "react";

export interface PerformanceSettings {
  isLowEnd: boolean;
  shadows: boolean;
  shadowMapSize: number;
}

export function useDevicePerformance(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isLowEnd: true,
    shadows: false,
    shadowMapSize: 512,
  });

  useEffect(() => {
    const detectPerformance = () => {
      // browser
      if (typeof window === "undefined") return;

      const hasTouchScreen = navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024;

      const isIOS =
        /iPhone|iPad|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const isAndroid = /Android/i.test(navigator.userAgent);

      const isMobile = isIOS || isAndroid || (hasTouchScreen && isSmallScreen);

      // memory check
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;

      // CPU check
      const lowCores =
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 4;

      // GPU check
      let lowGPU = false;
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension(
            "WEBGL_debug_renderer_info",
          );
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(
              debugInfo.UNMASKED_RENDERER_WEBGL,
            );
            lowGPU = /Intel|Mali|Adreno|PowerVR|SwiftShader|Apple GPU/i.test(
              renderer,
            );
          }
        }
      } catch {
        lowGPU = true;
      }

      const isLowEnd = isMobile || lowMemory || lowCores || lowGPU;

      // Only UPGRADE to high-end if confident its NOT a mobile/low-end device
      if (!isLowEnd) {
        setSettings({
          isLowEnd: false,
          shadows: true,
          shadowMapSize: 1024,
        });
      }
    };

    detectPerformance();
  }, []);

  return settings;
}
