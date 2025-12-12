"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const LightboxContent = () => (
    <Carousel
      className="w-full h-full"
      opts={{
        loop: true,
        startIndex: selectedIndex ?? 0,
      }}
    >
      <CarouselContent className="h-full ml-0">
        {images.map((imageSrc, index) => (
          <CarouselItem key={index} className="pl-0 flex items-center justify-center h-[55vh]">
            <div className="relative w-[100vw] h-full rounded-lg">
              <Image
                src={imageSrc}
                alt={`${title} screenshot ${index + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority={index === selectedIndex}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );

  return (
    <>
      <div className="w-full">
        <Carousel
          className="w-full"
          opts={{ loop: true, dragFree: true }}
          plugins={[autoplayPlugin.current]}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((imageSrc, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-4/5">
                <button
                  onClick={() => openLightbox(index)}
                  className="w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <div className="aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted/30">
                    <Image
                      src={imageSrc}
                      alt={`${title} screenshot ${index + 1}`}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:-left-12" />
          <CarouselNext className="right-2 md:-right-12" />
        </Carousel>
      </div>

      {isDesktop ? (
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[75vw] sm:max-w-none w-[75vw] h-auto max-h-[90vh] p-0 bg-background/95 backdrop-blur-sm border-border/50 flex flex-col"
          >
            <VisuallyHidden>
              <DialogTitle>{title} Gallery</DialogTitle>
            </VisuallyHidden>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-50 rounded-full bg-background/80 hover:bg-background"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="flex-1 flex items-center justify-center p-4 min-h-[60vh]">
              <LightboxContent />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={selectedIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DrawerContent className="max-h-[60vh] p-4 bg-background/95 backdrop-blur-sm">
            <VisuallyHidden>
              <DrawerTitle>{title} Gallery</DrawerTitle>
            </VisuallyHidden>

            <div className="flex items-center justify-center w-full h-full py-4">
              {selectedIndex !== null && (
                <div className="relative w-full max-h-[50vh] flex items-center justify-center">
                  <Image
                    src={images[selectedIndex]}
                    alt={`${title} screenshot ${selectedIndex + 1}`}
                    width={1280}
                    height={720}
                    className="max-w-full max-h-[50vh] w-auto h-auto object-contain rounded-lg"
                    priority
                  />
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
