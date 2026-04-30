"use client" 

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 
import Image from "next/image"


type Photo = {
  src: string;
  alt: string;
};

export function PhotoCarousel({ 
    photos, 
    delay = 2000 
    }: { 
    photos: Photo[], 
    delay?: number 
    }) {

const plugins = delay && delay > 0 ? [
    Autoplay({
      delay: delay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ] : [];

  return (
    <div className="w-full relative px-12"> 
       <Carousel 
        plugins={plugins}
        className="w-full"
        >
        <CarouselContent>
            {photos.map((photo, index) => (
            <CarouselItem key={index}>
                <div className="relative aspect-square">
                    <Image 
                        src={photo.src} 
                        alt={photo.alt} 
                        fill 
                        className="object-cover rounded-xl"
                    />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0 " />
        </Carousel>
    </div>
)
}