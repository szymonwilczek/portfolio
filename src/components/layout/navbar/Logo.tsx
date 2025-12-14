"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

interface LogoProps {
  isNavItemHovered?: boolean;
}

export const Logo = ({ isNavItemHovered = false }: LogoProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const getImageSrc = useCallback(() => {
    if (isLogoHovered) {
      return "/images/navbar/navbar_hover_hoodie.png";
    }
    if (isNavItemHovered) {
      return "/images/navbar/navbar_coffee.png";
    }
    return "/images/navbar/navbar_main_hoodie.png";
  }, [isLogoHovered, isNavItemHovered]);

  return (
    <div
      className="flex items-center gap-2 font-bold text-xl"
      onMouseEnter={() => setIsLogoHovered(true)}
      onMouseLeave={() => setIsLogoHovered(false)}
    >
      <div className="relative h-8 w-8 overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:scale-105">
        <Image
          src={getImageSrc()}
          alt="Wolfie Logo"
          fill
          className="object-cover transition-opacity duration-200 ease-in-out"
          sizes="32px"
          priority
        />
      </div>
      <span className="font-outfit tracking-wide">
        Wolfie
      </span>
    </div>
  );
};
